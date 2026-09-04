import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import FounderRoute from "@/components/FounderRoute";

const NotFound = lazy(() => import("./pages/NotFound"));
const BetaLogin = lazy(() => import("./pages/BetaLogin"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const BetaDashboard = lazy(() => import("./pages/BetaDashboard"));
const DashboardLayout = lazy(() => import("./components/DasboardLayout").then((module) => ({ default: module.DashboardLayout })));
const BodyScanPage = lazy(() => import("./components/BodyScanPage").then((module) => ({ default: module.BodyScanPage })));
const ChatLema = lazy(() => import("./pages/ChatLema"));
const StatsPage = lazy(() => import("./components/StatsPage").then((module) => ({ default: module.StatsPage })));
const Summary = lazy(() => import("@/pages/Summary"));
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const Goals = lazy(() => import("@/pages/Goals"));
const Progress = lazy(() => import("@/pages/Progress"));
const Streaks = lazy(() => import("@/pages/Streaks"));
const Rewards = lazy(() => import("@/pages/Rewards"));
const Avatar = lazy(() => import("@/pages/Avatar"));
const Profile = lazy(() => import("@/pages/Profile"));
const FounderDashboard = lazy(() => import("@/pages/FounderDashboard"));
const InvestorDashboard = lazy(() => import("@/pages/InvestorDashboard"));
const DataRoom = lazy(() => import("@/pages/DataRoom"));
const InnovationLab = lazy(() => import("@/pages/InnovationLab"));
const SlideDeck = lazy(() => import("./components/SlideDeck").then((module) => ({ default: module.SlideDeck })));
const SlideDeckPdfExport = lazy(() => import("./components/SlideDeckPdfExport").then((module) => ({ default: module.SlideDeckPdfExport })));
const BodyDiscoverySurvey = lazy(() => import("@/pages/BodyDiscoverySurvey"));
const FinanceRoute = lazy(() => import("@/routes/FinanceRoute"));
const DataRoomGuidePage = lazy(() => import("@/pages/DataRoomGuide"));
const DataRoomTechnologyBlueprint = lazy(() => import("@/pages/DataRoomTechnologyBlueprint"));
const GrowthApp = lazy(() => import("@/pages/growth/GrowthApp"));
const GrowthLogin = lazy(() => import("@/pages/growth/GrowthLogin"));
const RdLabOverview = lazy(() => import("@/pages/rd-lab/RdLabOverview"));
const RdLabLogin = lazy(() => import("@/pages/rd-lab/RdLabLogin"));
const RdLabWorkspace = lazy(() => import("@/pages/rd-lab/RdLabWorkspace"));
const PrivacyPolicy = lazy(() => import("@/pages/LegalPages").then((module) => ({ default: module.PrivacyPolicy })));
const DataDeletionInstructions = lazy(() => import("@/pages/LegalPages").then((module) => ({ default: module.DataDeletionInstructions })));
const TermsOfService = lazy(() => import("@/pages/LegalPages").then((module) => ({ default: module.TermsOfService })));

const queryClient = new QueryClient();

function LegacyGrowthRouteRedirect() {
  const { pathname, search, hash } = useLocation();
  const funnelPath = pathname.replace(
    /^\/innovation-lab\/growth(?=\/|$)/,
    "/innovation-lab/funnel",
  );

  return <Navigate to={`${funnelPath}${search}${hash}`} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading page" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletionInstructions />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/body-discovery" element={<BodyDiscoverySurvey />} />
          <Route path="/innovation-lab" element={<InnovationLab />} />
          <Route
            path="/innovation-lab/funnel/login"
            element={<GrowthLogin />}
          />
          <Route path="/innovation-lab/funnel/*" element={<GrowthApp />} />
          <Route
            path="/innovation-lab/growth/*"
            element={<LegacyGrowthRouteRedirect />}
          />
          <Route path="/rd-lab" element={<RdLabOverview />} />
          <Route path="/rd-lab/login" element={<RdLabLogin />} />
          <Route
            path="/rd-lab/work-packages/wp1-textile-sensing"
            element={<RdLabWorkspace />}
          />
          <Route path="/pitch-deck-preview" element={<SlideDeck />} />
          <Route path="/pitch-deck-export" element={<SlideDeckPdfExport />} />
          <Route path="/pitchdeck-preview" element={<SlideDeck />} />
          <Route path="/mentor-deck" element={<SlideDeck />} />
          <Route
            path="/finance/*"
            element={
              <FinanceRoute />
            }
          />
          <Route
            path="/data-room/finance/*"
            element={
              <FinanceRoute />
            }
          />{" "}
          <Route
            path="/pitch-deck"
            element={
              <FounderRoute>
                <SlideDeck />
              </FounderRoute>
            }
          />
          <Route path="/data-room" element={<DataRoom />} />
          <Route path="/data-room/guide" element={<DataRoomGuidePage />} />
          <Route path="/data-room/technology/mvp1-blueprint" element={<DataRoomTechnologyBlueprint />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/beta-login" element={<BetaLogin />} />
          <Route path="/beta-dashboard" element={<DashboardLayout />}>
            <Route index element={<BetaDashboard />} />
            <Route path="bodyscan" element={<BodyScanPage />} />
            <Route path="chat" element={<ChatLema />} />
            <Route path="stats" element={<StatsPage />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
