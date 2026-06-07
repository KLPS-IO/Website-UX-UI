import { useState } from "react";
import { BODY_AREAS, type BodyArea, concernsFor } from "@/lib/survey-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type ConcernsMap = Partial<Record<BodyArea, string[]>>;

interface Props {
  selected: BodyArea[];
  concerns: ConcernsMap;
  onChange: (selected: BodyArea[], concerns: ConcernsMap) => void;
}

interface Region {
  id: BodyArea;
  label: string;
  // approximate SVG coords for label/highlight
  cx: number;
  cy: number;
}

const REGIONS: Region[] = [
  { id: "face", label: "Face", cx: 100, cy: 38 },
  { id: "chest", label: "Chest", cx: 100, cy: 105 },
  { id: "arms", label: "Arms", cx: 50, cy: 130 },
  { id: "tummy", label: "Tummy", cx: 100, cy: 165 },
  { id: "hips", label: "Hips", cx: 100, cy: 220 },
  { id: "thighs", label: "Thighs", cx: 100, cy: 270 },
  { id: "legs", label: "Legs", cx: 100, cy: 360 },
];

export function BodyMap({ selected, concerns, onChange }: Props) {
  const [activeArea, setActiveArea] = useState<BodyArea | null>(null);

  const toggleArea = (id: BodyArea) => {
    setActiveArea(id);
    if (!selected.includes(id)) {
      onChange([...selected, id], { ...concerns, [id]: concerns[id] ?? [] });
    }
  };

  const toggleConcern = (area: BodyArea, concern: string) => {
    const current = concerns[area] ?? [];
    const next = current.includes(concern)
      ? current.filter((c) => c !== concern)
      : [...current, concern];
    onChange(selected, { ...concerns, [area]: next });
  };

  const removeArea = (area: BodyArea) => {
    onChange(
      selected.filter((a) => a !== area),
      Object.fromEntries(Object.entries(concerns).filter(([k]) => k !== area)),
    );
    if (activeArea === area) setActiveArea(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative mx-auto w-full max-w-sm">
        <svg
          viewBox="0 0 200 440"
          className="w-full h-auto drop-shadow-[0_10px_30px_oklch(0.7_0.18_330/0.25)]"
        >
          <defs>
            <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.95 0.05 345)" />
              <stop offset="100%" stopColor="oklch(0.88 0.08 320)" />
            </linearGradient>
            <radialGradient id="tummyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.75 0.18 335 / 0.4)" />
              <stop offset="100%" stopColor="oklch(0.75 0.18 335 / 0)" />
            </radialGradient>
          </defs>

          {/* Subtle glow behind tummy area */}
          <ellipse cx="100" cy="165" rx="55" ry="38" fill="url(#tummyGlow)" />

          {/* Body silhouette path */}
          <path
            d="M100 12
               c-14 0 -24 11 -24 25
               c0 10 4 17 9 22
               c-3 3 -5 7 -5 11
               c0 5 3 9 7 11
               l-22 8
               c-10 4 -16 13 -16 24
               l0 35
               c0 6 2 11 5 15
               l4 25
               c-3 8 -5 17 -5 26
               c0 18 5 30 12 38
               l-1 30
               c0 12 5 22 12 30
               l8 65
               c1 10 8 18 18 18
               c8 0 15 -6 17 -14
               l4 -42
               l4 42
               c2 8 9 14 17 14
               c10 0 17 -8 18 -18
               l8 -65
               c7 -8 12 -18 12 -30
               l-1 -30
               c7 -8 12 -20 12 -38
               c0 -9 -2 -18 -5 -26
               l4 -25
               c3 -4 5 -9 5 -15
               l0 -35
               c0 -11 -6 -20 -16 -24
               l-22 -8
               c4 -2 7 -6 7 -11
               c0 -4 -2 -8 -5 -11
               c5 -5 9 -12 9 -22
               c0 -14 -10 -25 -24 -25z"
            fill="url(#bodyFill)"
            stroke="oklch(0.7 0.12 330 / 0.5)"
            strokeWidth="1"
          />

          {/* Tappable regions */}
          {REGIONS.map((r) => {
            const isSelected = selected.includes(r.id);
            const isActive = activeArea === r.id;
            const isTummy = r.id === "tummy";
            // Tummy region intentionally larger
            const rx = isTummy ? 42 : r.id === "face" ? 22 : r.id === "arms" ? 18 : 32;
            const ry = isTummy ? 30 : r.id === "face" ? 22 : r.id === "arms" ? 60 : 24;

            return (
              <g
                key={r.id}
                className="cursor-pointer transition-smooth"
                onClick={() => toggleArea(r.id)}
              >
                {r.id === "arms" ? (
                  <>
                    <ellipse cx={50} cy={r.cy} rx={12} ry={ry} fill={isSelected ? "oklch(0.7 0.2 330 / 0.55)" : "transparent"} stroke={isActive ? "oklch(0.5 0.2 320)" : "transparent"} strokeWidth="1.5" />
                    <ellipse cx={150} cy={r.cy} rx={12} ry={ry} fill={isSelected ? "oklch(0.7 0.2 330 / 0.55)" : "transparent"} stroke={isActive ? "oklch(0.5 0.2 320)" : "transparent"} strokeWidth="1.5" />
                  </>
                ) : (
                  <ellipse
                    cx={r.cx}
                    cy={r.cy}
                    rx={rx}
                    ry={ry}
                    fill={isSelected ? "oklch(0.7 0.2 330 / 0.55)" : "transparent"}
                    stroke={isActive ? "oklch(0.5 0.2 320)" : "transparent"}
                    strokeWidth="1.5"
                    className={isTummy && !isSelected ? "animate-pulse-soft" : ""}
                  />
                )}
                {isSelected && (
                  <circle cx={r.id === "arms" ? 50 : r.cx} cy={r.cy} r="6" fill="white" />
                )}
                {isSelected && (
                  <Check
                    x={(r.id === "arms" ? 50 : r.cx) - 4}
                    y={r.cy - 4}
                    width="8"
                    height="8"
                    color="oklch(0.5 0.2 320)"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating label hints */}
        <div className="pointer-events-none absolute inset-0">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => toggleArea(r.id)}
              className={cn(
                "pointer-events-auto absolute -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium transition-smooth",
                selected.includes(r.id)
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-white/80 backdrop-blur text-foreground border border-border hover:bg-white",
              )}
              style={{
                left: r.id === "arms" ? "8%" : r.id === "face" ? "62%" : "62%",
                top: `${(r.cy / 440) * 100}%`,
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Concern panels */}
      <div className="flex flex-col gap-4">
        {selected.map((area) => {
          const label = BODY_AREAS.find((b) => b.id === area)?.label ?? area;
          const opts = concernsFor(area);
          const picked = concerns[area] ?? [];
          return (
            <div
              key={area}
              className="rounded-3xl bg-white/80 backdrop-blur p-5 shadow-soft border border-border animate-float-in"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-plum">{label}</h3>
                <button
                  onClick={() => removeArea(area)}
                  className="text-xs text-muted-foreground hover:text-destructive transition-smooth"
                >
                  Remove
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {opts.map((c) => {
                  const on = picked.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleConcern(area, c)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-sm transition-smooth border",
                        on
                          ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                          : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary",
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {selected.length === 0 && (
          <p className="text-center text-sm text-muted-foreground italic">
            Tap any area of the body to begin
          </p>
        )}
      </div>
    </div>
  );
}
