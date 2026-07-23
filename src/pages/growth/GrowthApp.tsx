import { Navigate, Route, Routes } from "react-router-dom";
import { GrowthLayout } from "@/components/growth/GrowthLayout";
import { CommunityPage, IntelligencePage, MissionControlPage, SettingsPage, StrategyPage, StudioPage } from "./GrowthPages";

export default function GrowthApp() {
  return <GrowthLayout><Routes>
    <Route index element={<Navigate to="mission-control" replace />} />
    <Route path="mission-control" element={<MissionControlPage />} />
    <Route path="strategy" element={<StrategyPage />} />
    <Route path="studio" element={<StudioPage />} />
    <Route path="intelligence" element={<IntelligencePage />} />
    <Route path="community" element={<CommunityPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="overview" element={<Navigate to="/innovation-lab/growth/mission-control" replace />} />
    <Route path="*" element={<Navigate to="/innovation-lab/growth/mission-control" replace />} />
  </Routes></GrowthLayout>;
}
