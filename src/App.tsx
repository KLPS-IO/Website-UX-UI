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
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/beta-login" element={<BetaLogin />} />
          <Route path="/beta-dashboard" element={<DashboardLayout />}>
            <Route index element={<BetaDashboard />} />
            <Route path="bodyscan" element={<BodyScanPage />} />
            <Route path="chat" element={< ChatLema />} />
            <Route path="stats" element={< StatsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
