import {
  BrainCircuit,
  ChevronLeft,
  Clapperboard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";
import { cn } from "@/lib/utils";
import { rdLabService } from "@/services/rd-lab/rd-lab.service";

const growthNav = [
  ["mission-control", "Mission Control", LayoutDashboard],
  ["strategy", "Strategy", Target],
  ["studio", "Studio", Clapperboard],
  ["intelligence", "Intelligence", BrainCircuit],
  ["community", "Community", MessageCircle],
  ["settings", "Settings", Settings],
] as const;

export function GrowthLayout({ children, reviewerMode = false }: { children: ReactNode; reviewerMode?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const viewer = useDataRoomViewer();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page =
    growthNav.find(([slug]) => pathname.endsWith(`/${slug}`))?.[1] ??
    "Mission Control";
  const visibleNav = reviewerMode
    ? growthNav.filter(([slug]) => slug === "settings")
    : growthNav;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.title = `${page} | Funnel OS | KLPS`;
  }, [page, pathname]);

  const sidebar = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-5">
        <Link
          to="/innovation-lab/funnel/mission-control"
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#df3fae] to-[#945c8c] text-sm font-bold text-white shadow-[0_0_25px_-5px_rgba(223,63,174,0.7)]">
            F
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">
              Funnel OS
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Phase 1
            </span>
          </span>
        </Link>
        <button
          className="text-white/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close Funnel navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="px-3 pb-2 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          Workspace
        </div>
        <ul className="space-y-1">
          {visibleNav.map(([slug, label, Icon]) => (
            <li key={slug}>
              <NavLink
                onClick={() => setMobileOpen(false)}
                to={`/innovation-lab/funnel/${slug}`}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    isActive
                      ? "bg-[#df3fae]/12 text-white ring-1 ring-inset ring-[#df3fae]/20"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                  )
                }
              >
                <Icon className="h-4 w-4 group-[.active]:text-[#f15bbe]" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-white/[0.08] p-4">
        <Link
          to="/innovation-lab"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" /> Innovation Lab
        </Link>
      </div>
    </>
  );

  return (
    <div className="growth-theme min-h-screen bg-[#09070d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(223,63,174,0.08),transparent_34%),radial-gradient(circle_at_45%_100%,rgba(53,211,200,0.06),transparent_35%)]" />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.08] bg-[#0d0a12]/95 backdrop-blur-xl lg:flex">
        {sidebar}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="relative flex h-full w-72 flex-col border-r border-white/[0.08] bg-[#0d0a12]">
            {sidebar}
          </aside>
        </div>
      )}
      <div className="relative lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/[0.08] bg-[#09070d]/85 px-4 backdrop-blur-xl md:px-8">
          <button
            className="rounded-lg border border-white/10 p-2 text-white/60 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Funnel navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">
              {page}
            </div>
            <div className="text-[10px] text-white/35">
              KLPS Innovation Lab · Funnel
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#945c8c]/25 bg-[#945c8c]/10 px-3 py-1.5 text-xs text-[#c8a6eb] sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            {reviewerMode ? "Meta reviewer" : viewer?.name ?? "Founder workspace"}
          </div>
          <button
            type="button"
            aria-label="Sign out of Funnel OS"
            title="Sign out"
            className="rounded-lg border border-white/10 p-2 text-white/55 transition hover:text-white"
            onClick={async () => {
              await rdLabService.logout();
              navigate("/innovation-lab/funnel/login", { replace: true });
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-7 md:px-8 md:py-10">
          {reviewerMode && (
            <aside className="mb-6 rounded-xl border border-[#35d3c8]/25 bg-[#35d3c8]/[0.07] px-4 py-3" aria-label="Meta App Review Workspace">
              <div className="text-sm font-bold text-[#087f7a]">Meta App Review Workspace</div>
              <p className="mt-1 text-xs leading-5 text-white/60">
                This isolated workspace is provided for Meta&apos;s review of the Facebook connection flow.
              </p>
            </aside>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
