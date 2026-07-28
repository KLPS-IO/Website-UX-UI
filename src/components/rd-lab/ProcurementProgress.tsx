import { AlertTriangle, Check, LoaderCircle } from "lucide-react";
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

function supportingText(stage: ProcurementProgressStage) {
  const counts = stage.supporting_counts;
  switch (stage.key) {
    case "research":
      return `${counts.suppliers_identified} identified · ${counts.suppliers_verified ?? 0} verified`;
    case "supplier_engagement":
      return `${counts.suppliers_contacted} contacted · ${counts.discovery_meetings_completed ?? 0} meetings`;
    case "rfqs":
      return `${counts.rfqs_created ?? 0} prepared · ${counts.rfqs_sent} sent`;
    case "quotations":
      return stage.target_count
        ? `${counts.valid_quotations} of ${stage.target_count} valid`
        : `${counts.valid_quotations} valid`;
    case "comparison":
      return `${counts.recommendations_recorded} recommendations · ${counts.selection_decisions_recorded ?? 0} decisions`;
    case "finance_os_mapping":
      return `${counts.mappings_complete} mapped`;
    case "complete":
      return `${counts.linked_evidence_count ?? 0} evidence · ${counts.critical_actions_open} critical actions`;
    default:
      return `${stage.completed_count} recorded`;
  }
}

const displayLabel = (stage: ProcurementProgressStage) =>
  stage.key === "finance_os_mapping" ? "Finance OS" : stage.label;

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
        className="rounded-xl border border-amber-300/80 bg-amber-50 p-3 text-sm text-[#4d3715]"
        role="alert"
      >
        {error || "Procurement progress is not available."}
      </div>
    );
  }

  if (compact) {
    return (
      <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm text-[#2d2530] sm:grid-cols-[auto_1fr]">
        <div>
          <dt className="inline font-semibold">Current stage</dt>
          <dd className="ml-2 inline text-[#8f1d6e]">
            {progress.current_stage}
          </dd>
        </div>
        <div>
          <dt className="inline font-semibold">Next action</dt>
          <dd className="ml-2 inline">{progress.next_action}</dd>
        </div>
        {progress.blocking_reason && (
          <div className="sm:col-span-2">
            <dt className="inline font-semibold">Blocking reason</dt>
            <dd className="ml-2 inline">{progress.blocking_reason}</dd>
          </div>
        )}
      </dl>
    );
  }

  return (
    <section
      className="rounded-2xl border border-[#3a2a41]/10 bg-white px-5 py-4 shadow-[0_12px_35px_-30px_rgba(58,42,65,0.35)] md:px-6"
      aria-labelledby="procurement-progress-title"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-[#b52a8b]">
            Procurement Progress
          </div>
          <h2
            id="procurement-progress-title"
            className="mt-1 text-2xl font-semibold text-[#171219]"
          >
            {progress.current_stage}
          </h2>
        </div>
        <dl className="grid max-w-4xl gap-x-8 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
          <div>
            <dt className="inline font-semibold text-[#171219]">
              Current stage
            </dt>
            <dd className="ml-2 inline text-[#8f1d6e]">
              {progress.current_stage}
            </dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#171219]">Next action</dt>
            <dd className="ml-2 inline text-[#2d2530]">
              {progress.next_action}
            </dd>
          </div>
        </dl>
      </div>

      {progress.blocking_reason && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-[#4d3715]">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>
            <strong>Blocking reason:</strong> {progress.blocking_reason}
          </span>
        </div>
      )}

      <ol
        className="relative mt-5 grid gap-0 md:grid-cols-7"
        aria-label="Procurement lifecycle"
      >
        {progress.stages.map((stage, index) => {
          const current = stage.label === progress.current_stage;
          const complete = stage.state === "Complete";
          const blocked = current && Boolean(progress.blocking_reason);
          const connector = complete ? "bg-[#39745d]/45" : "bg-[#3a2a41]/14";

          return (
            <li
              key={stage.key}
              aria-current={current ? "step" : undefined}
              aria-label={`${displayLabel(stage)}: ${stage.state}. ${supportingText(stage)}`}
              className="relative grid min-w-0 grid-cols-[1.5rem_1fr] gap-3 pb-5 last:pb-0 md:block md:px-1 md:pb-0 md:text-center"
            >
              {index < progress.stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-px md:left-[calc(50%+12px)] md:top-[11px] md:h-px md:w-[calc(100%-24px)] ${connector}`}
                />
              )}
              <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 md:mx-auto ${
                  complete
                    ? "border-[#39745d] bg-[#39745d] text-white"
                    : current
                      ? "border-[#df3fae] bg-[#df3fae] text-white shadow-[0_0_0_4px_rgba(223,63,174,0.12)]"
                      : "border-[#9b919f] bg-white text-[#5f5563]"
                }`}
              >
                {complete ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : blocked ? (
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      current ? "bg-white" : "bg-[#9b919f]"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">{stage.state}</span>
              </span>
              <div className="min-w-0 md:mt-2">
                <h3
                  className={`break-words text-sm font-semibold ${
                    current
                      ? "text-[#8f1d6e]"
                      : complete
                        ? "text-[#245541]"
                        : "text-[#5f5563]"
                  }`}
                >
                  {displayLabel(stage)}
                </h3>
                <p className="mt-0.5 truncate text-xs text-[#5f5563] md:whitespace-normal">
                  {supportingText(stage)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
