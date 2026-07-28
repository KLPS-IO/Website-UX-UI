import { Check, Circle, LoaderCircle } from "lucide-react";
import type {
  ProcurementProgress as ProcurementProgressModel,
  ProcurementProgressStage,
} from "@/types/rd-lab";

type Props = {
  progress: ProcurementProgressModel | null;
  loading?: boolean;
  error?: string;
  compact?: boolean;
};

const stateStyles = {
  "Not Started": "border-[#3a2a41]/12 bg-white text-[#5f5563]",
  "In Progress": "border-[#df3fae]/45 bg-[#df3fae]/8 text-[#8f1d6e]",
  Ready: "border-[#945c8c]/40 bg-[#945c8c]/8 text-[#674061]",
  Complete: "border-[#39745d]/35 bg-[#eaf5ef] text-[#245541]",
} as const;

function supportingText(stage: ProcurementProgressStage) {
  const counts = stage.supporting_counts;
  switch (stage.key) {
    case "research":
      return `${counts.suppliers_identified} identified · ${counts.suppliers_shortlisted} shortlisted`;
    case "supplier_engagement":
      return `${counts.suppliers_contacted} contacted · ${counts.discovery_meetings_completed} meetings`;
    case "rfqs":
      return `${counts.rfqs_sent} sent · ${counts.responses_received} responses`;
    case "quotations":
      return stage.target_count
        ? `${counts.valid_quotations} of ${stage.target_count} valid quotations`
        : `${counts.valid_quotations} valid quotations`;
    case "comparison":
      return `${counts.recommendations_recorded} recommendations · ${counts.selection_decisions_recorded} decisions`;
    case "finance_os_mapping":
      return `${counts.mappings_complete} complete · ${counts.mappings_total} total`;
    case "complete":
      return `${counts.linked_evidence_count} evidence linked · ${counts.critical_actions_open} critical actions`;
    default:
      return `${stage.completed_count} recorded`;
  }
}

export function ProcurementProgress({
  progress,
  loading = false,
  error = "",
  compact = false,
}: Props) {
  if (loading) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-[#3e3542]"
        role="status"
      >
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Loading procurement progress…
      </div>
    );
  }
  if (error || !progress) {
    return (
      <div
        className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-[#4d3715]"
        role="alert"
      >
        {error || "Procurement progress is not available."}
      </div>
    );
  }
  if (compact) {
    return (
      <div className="mt-5 grid gap-2 text-sm text-[#2d2530] sm:grid-cols-2">
        <div>
          <span className="font-semibold">Current stage:</span>{" "}
          {progress.current_stage}
        </div>
        <div>
          <span className="font-semibold">Next action:</span>{" "}
          {progress.next_action}
        </div>
        {progress.blocking_reason && (
          <div className="sm:col-span-2">
            <span className="font-semibold">Blocking reason:</span>{" "}
            {progress.blocking_reason}
          </div>
        )}
      </div>
    );
  }
  return (
    <section
      className="rounded-2xl border border-[#3a2a41]/12 bg-white p-5 md:p-6"
      aria-labelledby="procurement-progress-title"
    >
      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-[#b52a8b]">
            Procurement Progress
          </div>
          <h2
            id="procurement-progress-title"
            className="mt-2 text-2xl font-semibold text-[#171219]"
          >
            {progress.current_stage}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#2d2530]">
            <span className="font-semibold">Next action:</span>{" "}
            {progress.next_action}
          </p>
          {progress.blocking_reason && (
            <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-[#4d3715]">
              <span className="font-semibold">Blocking reason:</span>{" "}
              {progress.blocking_reason}
            </p>
          )}
          <p className="mt-4 text-xs text-[#5f5563]">
            {progress.summary.suppliers_identified} suppliers identified ·{" "}
            {progress.summary.suppliers_shortlisted} shortlisted ·{" "}
            {progress.summary.suppliers_contacted} contacted
          </p>
        </div>
        <ol
          className="grid gap-2 md:grid-cols-7"
          aria-label="Procurement stages"
        >
          {progress.stages.map((stage) => {
            const current = stage.label === progress.current_stage;
            return (
              <li
                key={stage.key}
                aria-current={current ? "step" : undefined}
                className={`min-w-0 rounded-xl border p-3 ${stateStyles[stage.state]} ${
                  current ? "ring-2 ring-[#df3fae]/35" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  {stage.state === "Complete" ? (
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Circle
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-xs font-semibold">{stage.state}</span>
                </div>
                <h3 className="mt-3 break-words text-sm font-semibold">
                  {stage.label}
                </h3>
                <p className="mt-2 text-xs leading-5">
                  {supportingText(stage)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
