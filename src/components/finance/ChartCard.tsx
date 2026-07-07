import type { ReactNode } from "react";
import { Surface, SectionTitle } from "./PageHeader";

export function ChartCard({
  title,
  hint,
  children,
  className,
  height = 280,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <Surface className={className}>
      <SectionTitle title={title} hint={hint} />
      <div style={{ width: "100%", height }}>{children}</div>
    </Surface>
  );
}

export const chartTheme = {
  grid: "rgba(36,49,59,0.10)",
  axis: "rgba(36,49,59,0.48)",
  tooltip: {
    contentStyle: {
      background: "#fffaf3",
      border: "1px solid rgba(36,49,59,0.14)",
      borderRadius: 12,
      fontSize: 12,
      color: "#24313b",
    },
    labelStyle: { color: "#687580", fontSize: 11 },
    itemStyle: { color: "#24313b" },
  },
  colors: ["#ef9f32", "#ec7769", "#945c8c", "#b6d0ac", "#365c63", "#4a90c9"],
};
