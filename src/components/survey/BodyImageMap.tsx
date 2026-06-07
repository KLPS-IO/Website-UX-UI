import { BODY_TYPE_IMAGES, type BodyType } from "./BodyTypePicker";
import type { BodyArea } from "@/lib/survey-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type ConcernsMap = Partial<Record<BodyArea, string[]>>;

interface Hotspot {
  id: BodyArea;
  label: string;
  top: string;
  left: string;
}

// Approximate label positions for the full-body illustrations
const HOTSPOTS: Hotspot[] = [
  { id: "face", label: "Face", top: "12%", left: "50%" },
  { id: "chest", label: "Chest", top: "30%", left: "50%" },
  { id: "arms", label: "Arms", top: "35%", left: "20%" },
  { id: "tummy", label: "Tummy", top: "40%", left: "50%" },
  { id: "hips", label: "Hips", top: "48%", left: "70%" },
  { id: "thighs", label: "Thighs", top: "58%", left: "50%" },
  { id: "legs", label: "Legs", top: "78%", left: "50%" },
];

interface Props {
  bodyType: BodyType;
  selected: BodyArea[];
  active: BodyArea;
  onSelectArea: (a: BodyArea) => void;
}

export function BodyImageMap({ bodyType, selected, active, onSelectArea }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <img
        src={BODY_TYPE_IMAGES[bodyType]}
        alt="Body illustration"
        className="w-full h-auto select-none pointer-events-none drop-shadow-[0_10px_30px_oklch(0.7_0.18_330/0.18)]"
      />
      {HOTSPOTS.map((h) => {
        const isSelected = selected.includes(h.id);
        const isActive = active === h.id;
        return (
          <button
            key={h.id}
            onClick={() => onSelectArea(h.id)}
            style={{ top: h.top, left: h.left }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium transition-smooth flex items-center gap-1.5 whitespace-nowrap",
              isActive
                ? "bg-gradient-primary text-primary-foreground shadow-soft scale-110"
                : isSelected
                  ? "bg-petal/80 text-plum shadow-soft"
                  : "bg-white/90 backdrop-blur text-plum border border-border hover:bg-white",
              h.id === "tummy" && !isSelected && !isActive && "animate-pulse-soft",
            )}
          >
            {isSelected && <Check className="h-3 w-3" />}
            {h.label}
          </button>
        );
      })}
    </div>
  );
}
