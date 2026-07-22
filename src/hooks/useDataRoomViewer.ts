import { API_BASE } from "@/config/api";
import { useEffect, useState } from "react";

type Viewer = {
  name: string;
  initials: string;
  role: string | null;
  canWriteFinance: boolean;
};

const sessionPaths = [
  "/api/data-room/session",
  "/api/session",
  "/api/data-room/auth/session",
];

const text = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const initialsFor = (name: string) => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length > 1) return `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const readableEmailName = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const parseViewer = (payload: unknown): Viewer | null => {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  const user = root.user && typeof root.user === "object"
    ? root.user as Record<string, unknown>
    : root;
  const firstName = text(user.firstName) || text(user.first_name);
  const lastName = text(user.lastName) || text(user.last_name);
  const fullName =
    text(user.name) ||
    text(user.fullName) ||
    text(user.full_name) ||
    [firstName, lastName].filter(Boolean).join(" ") ||
    (text(user.email) ? readableEmailName(text(user.email)!) : undefined);

  const role = text(user.role) ?? null;
  const isFounder = user.isFounder === true || user.is_founder === true;
  const isAdmin = user.isAdmin === true || user.is_admin === true;
  const canWriteFinance = isFounder || isAdmin || role === "founder" || role === "admin" || role === "founder_admin";
  return fullName ? { name: fullName, initials: initialsFor(fullName), role, canWriteFinance } : null;
};

export function useDataRoomViewer() {
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const token = sessionStorage.getItem("klps.dataRoom.sessionToken") ?? sessionStorage.getItem("klps.founderDashboard.sessionToken");

    const load = async () => {
      for (const path of sessionPaths) {
        try {
          const response = await fetch(`${API_BASE}${path}`, {
            credentials: "include",
            signal: controller.signal,
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          if (response.status === 404) continue;
          if (!response.ok) return;
          const nextViewer = parseViewer(await response.json());
          if (nextViewer) setViewer(nextViewer);
          return;
        } catch (error) {
          if (controller.signal.aborted) return;
          console.error("Could not load the current Finance OS viewer", error);
          return;
        }
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return viewer;
}
