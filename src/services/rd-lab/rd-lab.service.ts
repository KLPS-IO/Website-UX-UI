import { authenticatedApi } from "@/lib/authenticated-api";
import type {
  ProcurementProgress,
  RdRecord,
  RdResource,
  RdSummary,
  RdWorkPackage,
} from "@/types/rd-lab";

export const rdLabService = {
  login: (email: string, password: string, remember_device: boolean) =>
    authenticatedApi<{
      status: "success";
      user: { id: string; email: string; role: string };
    }>("/api/rd-lab/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, remember_device }),
    }),
  session: () =>
    authenticatedApi<{
      status: "success";
      user: { id: string; email: string; role: string };
    }>("/api/rd-lab/auth/session"),
  logout: () =>
    authenticatedApi<{ status: "success" }>("/api/rd-lab/auth/logout", {
      method: "POST",
    }),
  workPackage: () =>
    authenticatedApi<{ status: "success"; work_package: RdWorkPackage }>(
      "/api/rd-lab/work-packages/wp1",
    ),
  summary: () =>
    authenticatedApi<{ status: "success"; summary: RdSummary }>(
      "/api/rd-lab/work-packages/wp1/summary",
    ),
  procurementProgress: (workPackageId: string) =>
    authenticatedApi<{
      status: "success";
      procurement_progress: ProcurementProgress;
    }>(`/api/rd-lab/work-packages/${workPackageId}/procurement-progress`),
  list: async (resource: RdResource) =>
    (
      await authenticatedApi<
        { status: "success" } & Record<RdResource, RdRecord[]>
      >(`/api/rd-lab/${resource}`)
    )[resource],
  create: (resource: RdResource, payload: Record<string, unknown>) =>
    authenticatedApi<{ status: "success"; record: RdRecord }>(
      `/api/rd-lab/${resource}`,
      { method: "POST", body: JSON.stringify(payload) },
    ),
  update: (
    resource: RdResource,
    id: string,
    payload: Record<string, unknown>,
  ) =>
    authenticatedApi<{ status: "success"; record: RdRecord }>(
      `/api/rd-lab/${resource}/${id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    ),
};
