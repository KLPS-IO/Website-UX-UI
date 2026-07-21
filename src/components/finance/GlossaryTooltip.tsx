import { useMemo, useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { financeGlossaryTerms, getFinanceGlossaryEntry, type FinanceGlossaryKey } from "@/config/financeGlossary";
import { cn } from "@/lib/utils";

export function GlossaryTooltip({ term, glossaryKey, children, className }: { term?: string; glossaryKey?: FinanceGlossaryKey; children?: ReactNode; className?: string }) {
  const lookup = glossaryKey ?? term ?? "";
  const entry = getFinanceGlossaryEntry(lookup);
  const [open, setOpen] = useState(false);
  if (!entry) return <>{children ?? term}</>;

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span role="button" tabIndex={0} onClick={(event) => { event.preventDefault(); event.stopPropagation(); setOpen((value) => !value); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen((value) => !value); } }} className={cn("inline-flex cursor-help items-center gap-0.5 font-inherit text-inherit underline decoration-dotted underline-offset-2", className)} aria-label={`${String(children ?? term ?? entry.term)}: ${entry.definition}`}>
            <span>{children ?? term ?? entry.term}</span><Info aria-hidden="true" className="h-[0.8em] w-[0.8em] shrink-0 opacity-55" />
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={6} className="max-w-xs border-brand-orange/20 bg-popover px-3 py-2 text-xs leading-relaxed shadow-xl">
          <span className="font-semibold text-brand-orange">{entry.term}</span><span className="text-popover-foreground"> — {entry.definition}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function GlossaryText({ children }: { children: string }) {
  const parts = useMemo(() => {
    const terms = financeGlossaryTerms.map(({ term }) => escapeRegExp(term));
    return children.split(new RegExp(`(?<![A-Za-z0-9])(${terms.join("|")})(?![A-Za-z0-9])`, "gi"));
  }, [children]);

  return <>{parts.map((part, index) => {
    const entry = getFinanceGlossaryEntry(part);
    return entry ? <GlossaryTooltip key={`${part}-${index}`} term={part}>{part}</GlossaryTooltip> : part;
  })}</>;
}
