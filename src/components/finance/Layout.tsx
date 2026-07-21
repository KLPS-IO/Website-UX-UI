import type { ReactNode } from "react";
import { FinanceSidebar } from "./Sidebar";
import { Bell, Search } from "lucide-react";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";
import { FinancePageExportActions } from "./PageExportActions";
import { useLocation } from "react-router-dom";

export function FinanceLayout({ children }: { children: ReactNode }) {
  const viewer = useDataRoomViewer();
  const { pathname } = useLocation();
  const isDashboard = pathname.endsWith("/dashboard");

  return (
    <div className="finance-theme surface-glow flex min-h-screen w-full text-foreground">
        <FinanceSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
            <div className="flex flex-1 items-center gap-2">
              <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-lg border border-border bg-white/70 px-3 py-1.5 text-sm text-muted-foreground md:flex">
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search assumptions, docs, KPIs…</span>
                <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
              </div>
            </div>
            <button className="rounded-lg border border-border bg-white/70 p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            {!isDashboard && <FinancePageExportActions />}
            <div className="flex items-center gap-2 rounded-lg border border-border bg-white/70 px-2 py-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-purple to-brand-coral text-[10px] font-bold text-white">
                {viewer?.initials ?? "…"}
              </div>
              <span className="hidden text-xs text-muted-foreground md:inline">
                {viewer?.name ?? "Loading account…"}
              </span>
            </div>
          </header>
          <main data-finance-page-content className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
    </div>
  );
}
