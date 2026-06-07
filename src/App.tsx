import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BetaLogin from "./pages/BetaLogin";
import BetaDashboard from "./pages/BetaDashboard";
import { DashboardLayout } from "./components/DasboardLayout";
import { BodyScanPage } from "./components/BodyScanPage";
import ChatLema from "./pages/ChatLema";
import { StatsPage } from "./components/StatsPage";
import { ProfilePage } from "./components/ProfilePage";
import Summary from '@/pages/Summary';
import CheckIn from '@/pages/CheckIn';
import Goals from '@/pages/Goals';
import Progress from '@/pages/Progress';
import Streaks from '@/pages/Streaks';
import Rewards from '@/pages/Rewards';
import Avatar from '@/pages/Avatar';
import Profile from '@/pages/Profile';
import FounderDashboard from '@/pages/FounderDashboard';
import InvestorDashboard from '@/pages/InvestorDashboard';
import FounderRoute from '@/components/FounderRoute';
import DataRoom from '@/pages/DataRoom';
import InnovationLab from '@/pages/InnovationLab';
import BodyDiscoverySurvey from '@/pages/BodyDiscoverySurvey';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/body-discovery" element={<BodyDiscoverySurvey />} />
          <Route path="/innovation-lab" element={<InnovationLab />} />
          <Route path="/data-room" element={<DataRoom />} />
          <Route path="/beta-login" element={<BetaLogin />} />
          <Route path="/beta-dashboard" element={<DashboardLayout />}>
            <Route index element={<BetaDashboard />} />
            <Route path="bodyscan" element={<BodyScanPage />} />
            <Route path="chat" element={< ChatLema />} />
            <Route path="stats" element={< StatsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="summary" element={<Summary />} />
            <Route path="check-in" element={<CheckIn />} />
            <Route path="goals" element={<Goals />} />
            <Route path="progress" element={<Progress />} />
            <Route path="streaks" element={<Streaks />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="avatar" element={<Avatar />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="founder"
              element={
                <FounderRoute>
                  <FounderDashboard />
                </FounderRoute>
              }
            />
            <Route
              path="investor"
              element={
                <FounderRoute>
                  <InvestorDashboard />
                </FounderRoute>
              }
            />

          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
