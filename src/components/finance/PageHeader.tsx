import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlossaryText } from "./GlossaryTooltip";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between"
    >
      <div>
        {eyebrow && (
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-orange/80">
            <GlossaryText>{eyebrow}</GlossaryText>
          </div>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground"><GlossaryText>{description}</GlossaryText></p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </motion.div>
  );
}

export function Surface({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "finance-pdf-block relative overflow-hidden rounded-2xl border border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <GlossaryText>{title}</GlossaryText>
      </h2>
      {hint && <span className="text-xs text-muted-foreground/70"><GlossaryText>{hint}</GlossaryText></span>}
    </div>
  );
}
