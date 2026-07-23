import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GrowthPanel({ title, eyebrow, action, children, className }: { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.9)] backdrop-blur-sm md:p-6", className)}>
    <div className="mb-5 flex items-start justify-between gap-4"><div>{eyebrow && <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#087f7a]">{eyebrow}</div>}<h2 className="mt-1.5 text-base font-semibold text-white">{title}</h2></div>{action}</div>{children}
  </section>;
}

export function GrowthKpiCard({ label, value, detail, icon: Icon, tone = "magenta" }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: "magenta" | "turquoise" | "purple" }) {
  const tones = { magenta: "text-[#f15bbe] bg-[#df3fae]/10 border-[#df3fae]/20", turquoise: "text-[#35d3c8] bg-[#35d3c8]/10 border-[#35d3c8]/20", purple: "text-[#b989e8] bg-[#945c8c]/15 border-[#945c8c]/25" };
  return <article className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
    <div className="flex items-start justify-between gap-3"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/60">{label}</div><div className={cn("rounded-xl border p-2", tones[tone])}><Icon className="h-4 w-4" /></div></div>
    <div className="mt-6 text-2xl font-semibold tracking-tight text-white">{value}</div><p className="mt-2 text-xs leading-5 text-white/45">{detail}</p>
  </article>;
}

export function GrowthEmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 text-center"><div className="rounded-2xl border border-[#35d3c8]/20 bg-[#35d3c8]/10 p-3 text-[#35d3c8]"><Icon className="h-6 w-6" /></div><h2 className="mt-4 text-lg font-semibold text-white">{title}</h2><p className="mt-2 max-w-md text-sm leading-6 text-white/45">{description}</p><span className="mt-5 rounded-full border border-[#df3fae]/25 bg-[#df3fae]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f15bbe]">Phase 1 placeholder</span></div>;
}
