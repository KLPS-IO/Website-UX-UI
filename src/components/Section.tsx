import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-24 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-1 rounded-full bg-accent" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 text-3xl font-light tracking-tight text-foreground italic">
        {value}
      </div>
      {hint && <div className="mt-2 text-xs text-accent">{hint}</div>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </div>
        <h1 className="max-w-3xl text-4xl font-light tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
