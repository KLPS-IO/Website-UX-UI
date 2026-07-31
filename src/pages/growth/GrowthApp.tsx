import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { GrowthLayout } from "@/components/growth/GrowthLayout";
import {
  CommunityPage,
  IntelligencePage,
  MissionControlPage,
  SettingsPage,
  StrategyPage,
  StudioPage,
} from "./GrowthPages";
import { ApiError } from "@/lib/authenticated-api";
import { rdLabService } from "@/services/rd-lab/rd-lab.service";

export default function GrowthApp() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    rdLabService
      .session()
      .catch((reason: unknown) => {
        if (
          reason instanceof ApiError &&
          (reason.status === 401 || reason.status === 403)
        ) {
          navigate("/innovation-lab/funnel/login", { replace: true });
          return;
        }
        setError("Funnel OS could not verify the founder session.");
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4f8] text-sm text-[#756a7a]">
        Checking secure founder session…
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4f8] px-5 text-[#251d29]">
        <div className="max-w-md rounded-2xl border border-[#3a2a41]/15 bg-white p-6 text-center">
          <p>{error}</p>
          <button
            className="mt-4 rounded-xl bg-[#945c8c] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <GrowthLayout>
      <Routes>
        <Route index element={<Navigate to="mission-control" replace />} />
        <Route path="mission-control" element={<MissionControlPage />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="studio" element={<StudioPage />} />
        <Route path="intelligence" element={<IntelligencePage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="overview"
          element={
            <Navigate to="/innovation-lab/funnel/mission-control" replace />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to="/innovation-lab/funnel/mission-control" replace />
          }
        />
      </Routes>
    </GrowthLayout>
  );
}
