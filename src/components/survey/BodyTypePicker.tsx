import slim from "@/assets/body-slim.png";
import mid from "@/assets/body-mid.png";
import curvy from "@/assets/body-curvy.png";
import { cn } from "@/lib/utils";

export type BodyType = "slim" | "mid" | "curvy";

export const BODY_TYPE_IMAGES: Record<BodyType, string> = {
  slim,
  mid,
  curvy,
};

const OPTIONS: { id: BodyType; label: string; src: string }[] = [
  { id: "slim", label: "Slender", src: slim },
  { id: "mid", label: "Curvy", src: mid },
  { id: "curvy", label: "Full", src: curvy },
];

export function BodyTypePicker({
  selected,
  onSelect,
}: {
  selected: BodyType | null;
  onSelect: (t: BodyType) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-5">
      {OPTIONS.map((o) => {
        const on = selected === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className={cn(
              "group relative rounded-3xl overflow-hidden border-2 transition-smooth bg-white/60 backdrop-blur",
              on
                ? "border-orchid shadow-soft scale-[1.02]"
                : "border-transparent hover:border-petal/60",
            )}
          >
            <img
              src={o.src}
              alt={o.label}
              className="w-full h-auto object-contain"
              loading="lazy"
            /> <br></br>
            <div
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium transition-smooth",
                on
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-plum",
              )}
            >
              {o.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
