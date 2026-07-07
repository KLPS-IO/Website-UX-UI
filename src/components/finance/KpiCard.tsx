import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: number; // e.g. 0.12 = +12%
  hint?: string;
  icon?: LucideIcon;
  accent?: "orange" | "coral" | "sage" | "purple" | "teal" | "navy";
  index?: number;
}

const accentMap: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  orange: "from-brand-orange/25 to-transparent text-brand-orange",
  coral: "from-brand-coral/25 to-transparent text-brand-coral",
  sage: "from-brand-sage/25 to-transparent text-brand-sage",
  purple: "from-brand-purple/25 to-transparent text-brand-purple",
  teal: "from-brand-teal/40 to-transparent text-brand-sage",
  navy: "from-brand-navy/40 to-transparent text-[color:var(--chart-6)]",
};

export function KpiCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  accent = "orange",
  index = 0,
}: KpiCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className="card-gradient group relative overflow-hidden rounded-2xl border border-white/5 p-5 transition-colors hover:border-white/10"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          accentMap[accent],
        )}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          {Icon && (
            <span className={cn("rounded-lg bg-white/5 p-1.5", accentMap[accent].split(" ").pop())}>
              <Icon className="h-7 w-7" />
            </span>
          )}
        </div>
        <div className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {value}
        </div>
        <div className="mt-2 flex items-center gap-2 text-lg">
          {typeof delta === "number" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                positive ? "bg-brand-sage/15 text-brand-sage" : "bg-brand-coral/15 text-brand-coral",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {(delta * 100).toFixed(1)}%
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      </div>
    </motion.div>
  );
}
