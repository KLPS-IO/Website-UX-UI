import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sliders,
  Package,
  TrendingUp,
  Receipt,
  Users,
  Landmark,
  Waves,
  LineChart,
  GitBranch,
  Gauge,
  FileText,
  ShieldCheck,
  FolderOpen,
  Sparkles,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/finance/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/finance/assumptions", label: "Assumptions", icon: Sliders },
  { to: "/finance/products", label: "Products", icon: Package },
  { to: "/finance/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/finance/expenses", label: "Expenses", icon: Receipt },
  { to: "/finance/hiring", label: "Hiring", icon: Users },
  { to: "/finance/funding", label: "Funding", icon: Landmark },
  { to: "/finance/cash-flow", label: "Cash Flow", icon: Waves },
  { to: "/finance/forecasts", label: "Forecasts", icon: LineChart },
  { to: "/finance/scenarios", label: "Scenarios", icon: GitBranch },
  { to: "/finance/kpis", label: "KPIs", icon: Gauge },
  { to: "/finance/reports", label: "Reports", icon: FileText },
  { to: "/finance/evidence", label: "Evidence", icon: ShieldCheck },
  { to: "/finance/decision-log", label: "Decision Log", icon: ClipboardCheck },
  { to: "/finance/risk-register", label: "Risk Register", icon: AlertTriangle },
  { to: "/finance/documents", label: "Documents", icon: FolderOpen },
  { to: "/finance/ai-insights", label: "AI Insights", icon: Sparkles },
] as const;

export function FinanceSidebar() {
  const { pathname } = useLocation();
  const inDataRoom = pathname.startsWith("/data-room/finance");
  const basePath = inDataRoom ? "/data-room/finance" : "/finance";
  const path = pathname.replace(/^\/data-room/, "") || "/finance/dashboard";
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-coral text-primary-foreground shadow-lg shadow-brand-orange/20">
          <span className="text-sm font-bold">K</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight text-sidebar-foreground">
            KLPS Data Room
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Finance OS
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Finance
        </div>
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={`${basePath}${item.to.replace("/finance", "")}`}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-white/[0.03] hover:text-sidebar-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-brand-orange" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_var(--brand-orange)]" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-xs font-medium text-foreground">Live model</div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            All calculations flow from the Assumptions ledger.
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-sage">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-sage" />
            Sync healthy
          </div>
        </div>
      </div>
    </aside>
  );
}
