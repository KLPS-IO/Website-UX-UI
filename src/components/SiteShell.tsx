import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/founder", label: "Founder" },
  { to: "/data-room", label: "Data Room" },
  { to: "/lab", label: "R&D Lab" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/funding", label: "Funding" },
  { to: "/vault", label: "Vault" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteShell() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-foreground">
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-10%] top-[40%] -z-10 size-[40rem] rounded-full opacity-20 blur-3xl animate-drift"
        style={{ background: "color-mix(in oklab, var(--accent) 40%, transparent)" }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled ? "border-border bg-obsidian/80 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              <span className="text-sm font-semibold tracking-[0.3em] text-foreground">KPLS</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((item) => {
                const active =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                      active
                        ? "bg-white/5 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:inline-flex">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              Series A — Open
            </span>
            <Link
              to="/data-room"
              className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Access Vault
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-[0.3em]">KPLS</div>
            <p className="mt-2 max-w-md text-xs text-muted-foreground">
              Confidential investor data room. All materials subject to NDA.
              © {new Date().getFullYear()} KPLS Technology Ltd.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <a className="hover:text-foreground" href="#">NDA Terms</a>
            <a className="hover:text-foreground" href="#">Privacy</a>
            <a className="hover:text-foreground" href="#">Security</a>
            <a className="hover:text-foreground" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
