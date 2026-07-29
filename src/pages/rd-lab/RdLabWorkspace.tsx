import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FileUp, LogOut, Plus, ShieldCheck } from "lucide-react";
import { ApiError } from "@/lib/authenticated-api";
import { formatMoney } from "@/lib/safe-money";
import { formatSafeDate } from "@/lib/safe-date";
import { rdLabService } from "@/services/rd-lab/rd-lab.service";
import { evidenceService } from "@/services/evidence/evidence.service";
import {
  UploadDialog,
  type QueueItem,
  type UploadPrefill,
} from "@/pages/FInance.documents";
import type { EvidenceItem } from "@/types/evidence";
import type {
  ProcurementProgress as ProcurementProgressModel,
  RdRecord,
  RdResource,
  RdSummary,
  RdWorkPackage,
} from "@/types/rd-lab";
import { ProcurementProgress } from "@/components/rd-lab/ProcurementProgress";
import {
  EVIDENCE_LED_RESEARCH_NOTE_TEMPLATE,
  PROCUREMENT_STATUSES,
  SUPPLIER_CATEGORIES,
  WP1_SUPPLIER_VERIFICATION_SPRINT,
} from "@/config/rdProcurement";

const tabs = [
  "Overview",
  "Instructions",
  "Suppliers",
  "Interactions",
  "RFQs",
  "Quotations",
  "Findings",
  "Actions",
  "Finance OS Mapping",
  "Friction Log",
] as const;
const resourceFor: Partial<Record<(typeof tabs)[number], RdResource>> = {
  Suppliers: "suppliers",
  Interactions: "interactions",
  RFQs: "rfqs",
  Quotations: "quotations",
  Findings: "findings",
  Actions: "actions",
  "Finance OS Mapping": "mappings",
  "Friction Log": "friction",
};
const challenges = [
  "repeatable sensing",
  "calibration",
  "drift",
  "posture and movement artefacts",
  "breathing artefacts",
  "garment placement",
  "comfort",
  "size variation",
  "washability",
  "integration with removable electronics",
  "scalable manufacturing",
  "IP ownership",
];
const success = [
  "repeatability evidence",
  "electrical characterisation",
  "integration potential",
  "indicative manufacturing pathway",
  "cost range",
  "IP position",
  "realistic next-stage plan",
];
const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-[#df3fae]";

export default function RdLabWorkspace() {
  const nav = useNavigate();
  const [checking, setChecking] = useState(true);
  const [wp, setWp] = useState<RdWorkPackage | null>(null);
  const [summary, setSummary] = useState<RdSummary | null>(null);
  const [active, setActive] = useState<(typeof tabs)[number]>("Overview");
  const [records, setRecords] = useState<RdRecord[]>([]);
  const [suppliers, setSuppliers] = useState<RdRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [evidencePrefill, setEvidencePrefill] =
    useState<UploadPrefill | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [procurementProgress, setProcurementProgress] =
    useState<ProcurementProgressModel | null>(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        await rdLabService.session();
        const [w, s, sups] = await Promise.all([
          rdLabService.workPackage(),
          rdLabService.summary(),
          rdLabService.list("suppliers"),
        ]);
        setWp(w.work_package);
        setSummary(s.summary);
        setSuppliers(sups);
        rdLabService
          .procurementProgress(w.work_package.id)
          .then((result) => setProcurementProgress(result.procurement_progress))
          .catch(() =>
            setProgressError("Procurement progress could not be loaded."),
          )
          .finally(() => setProgressLoading(false));
        setEvidence(
          await evidenceService.linked("rd_work_package", w.work_package.id),
        );
      } catch (e) {
        if (e instanceof ApiError && [401, 403].includes(e.status))
          nav("/rd-lab/login", { replace: true });
        else setError("R&D workspace could not be loaded.");
      } finally {
        setChecking(false);
      }
    })();
  }, [nav]);
  useEffect(() => {
    const resource = resourceFor[active];
    if (!resource || !wp) {
      setRecords([]);
      return;
    }
    setLoading(true);
    rdLabService
      .list(resource)
      .then(setRecords)
      .catch(() => setError(`${active} could not be loaded.`))
      .finally(() => setLoading(false));
  }, [active, wp]);
  const shown = useMemo(
    () =>
      records.filter((r) =>
        JSON.stringify(r).toLowerCase().includes(search.toLowerCase()),
      ),
    [records, search],
  );
  const refreshProgress = async () => {
    if (!wp) return;
    const result = await rdLabService.procurementProgress(wp.id);
    setProcurementProgress(result.procurement_progress);
    setProgressError("");
  };
  if (checking) return <State text="Checking secure founder session…" />;
  if (!wp) return <State text={error || "WP1 is unavailable."} />;
  const progressSummary = procurementProgress?.summary;
  const operationalMetrics = [
    {
      label: "Suppliers",
      values: [
        ["Identified", progressSummary?.suppliers_identified],
        ["Verified", progressSummary?.suppliers_verified],
      ],
    },
    {
      label: "Engagement",
      values: [
        ["Contacted", progressSummary?.suppliers_contacted],
        ["Meetings held", progressSummary?.meetings_held],
      ],
    },
    {
      label: "Commercial evidence",
      values: [
        ["RFQs sent", progressSummary?.rfqs_sent],
        ["Quotations received", progressSummary?.quotations_received],
      ],
    },
    {
      label: "Actions",
      values: [
        ["Open actions", summary?.open_actions],
        ["Critical actions", progressSummary?.critical_actions_open],
      ],
    },
  ];
  const prefill: UploadPrefill = {
    title: "WP1 Textile Sensing Evidence",
    category: "Technology",
    sourceOrganisation: "",
    description: "Evidence supporting KLPS MVP V2 WP1 — Textile Sensing.",
    linkMode: true,
    entityType: "rd_work_package",
    entityId: wp.id,
    relationship: "Supports WP1 textile sensing feasibility",
  };
  return (
    <main className="rd-lab-light min-h-screen bg-[#100c13] text-white">
      <header className="border-b border-white/10 bg-[#100c13]/95">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
          <Link to="/rd-lab" className="font-mono text-sm tracking-[.3em]">
            KLPS <span className="text-[#df3fae]">R&D</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEvidencePrefill(null);
                setUploadOpen(true);
              }}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/65"
            >
              <FileUp className="mr-2 inline h-4 w-4" />
              Upload evidence
            </button>
            <button
              onClick={async () => {
                await rdLabService.logout();
                nav("/rd-lab/login", { replace: true });
              }}
              className="rounded-lg border border-white/10 p-2 text-white/50"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1500px] px-5 py-7">
        <Link to="/rd-lab" className="text-xs text-white/35">
          <ArrowLeft className="mr-1 inline h-3.5 w-3.5" />
          R&D Lab
        </Link>
        <section className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.055] to-[#df3fae]/[.045] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div>
              <div className="font-mono text-xs tracking-[.22em] text-[#f36bc5]">
                {wp.code} · MVP V2
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                {wp.title}
              </h1>
              <p className="mt-4 max-w-4xl leading-7 text-white/55">
                {wp.objective}
              </p>
              <div className="mt-5 text-xs text-white/35">
                Last updated: {formatSafeDate(wp.updated_at)}
              </div>
              <ProcurementProgress
                compact
                progress={procurementProgress}
                loading={progressLoading}
                error={progressError}
              />
            </div>
            <div className="min-w-56 rounded-2xl border border-white/10 bg-black/15 p-4">
              <div className="text-xs text-white/35">STATUS</div>
              <div className="mt-2 font-semibold text-[#f36bc5]">
                {wp.status}
              </div>
              <div className="mt-4 text-xs text-white/35">OWNER</div>
              <div className="mt-1 text-sm">Emma Mendez</div>
              <div className="mt-4 text-xs text-white/35">EVIDENCE</div>
              <div className="mt-1 text-sm">{evidence.length} linked</div>
            </div>
          </div>
        </section>
        <nav className="mt-6 overflow-x-auto">
          <div className="flex min-w-max gap-1 rounded-xl border border-white/10 bg-white/[.025] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`rounded-lg px-3 py-2 text-xs transition ${active === tab ? "bg-[#df3fae]/20 text-white" : "text-white/40 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
        <section className="mt-6">
          {active === "Overview" ? (
            <>
              <ProcurementProgress
                progress={procurementProgress}
                loading={progressLoading}
                error={progressError}
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {operationalMetrics.map((metric) => (
                  <Card key={metric.label} className="p-4">
                    <h2 className="text-sm font-semibold text-[#171219]">
                      {metric.label}
                    </h2>
                    <dl className="mt-3 space-y-2">
                      {metric.values.map(([label, value]) => (
                        <div
                          key={label as string}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <dt className="text-[#5f5563]">{label}</dt>
                          <dd className="font-semibold text-[#171219]">
                            {value ?? "Not loaded"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                ))}
              </div>
              <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-3">
                <Card className="h-full">
                  <h2 className="font-semibold">Current cost range</h2>
                  <div className="mt-4 space-y-2 text-sm text-white/55">
                    <Row
                      label="Minimum"
                      value={formatMoney(summary?.minimum_amount)}
                    />
                    <Row
                      label="Likely"
                      value={formatMoney(summary?.likely_amount)}
                    />
                    <Row
                      label="Maximum"
                      value={formatMoney(summary?.maximum_amount)}
                    />
                  </div>
                </Card>
                <Card className="h-full">
                  <h2 className="font-semibold">Major risks</h2>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    No canonical procurement risks recorded.
                  </p>
                </Card>
                <Card className="h-full">
                  <h2 className="font-semibold">Next action</h2>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {procurementProgress?.next_action ??
                      (progressError ? "Not available" : "Loading…")}
                  </p>
                </Card>
              </div>
            </>
          ) : active === "Instructions" ? (
            <Instructions />
          ) : (
            <ResourceView
              title={active}
              resource={resourceFor[active]!}
              records={shown}
              suppliers={suppliers}
              wp={wp}
              loading={loading}
              search={search}
              setSearch={setSearch}
              addOpen={addOpen}
              setAddOpen={setAddOpen}
              reload={async () => {
                const refreshed = await rdLabService.list(
                  resourceFor[active]!,
                );
                setRecords(refreshed);
                if (resourceFor[active] === "suppliers")
                  setSuppliers(refreshed);
                await refreshProgress();
              }}
              uploadEvidence={(resource, record) => {
                const entityType = {
                  suppliers: "rd_supplier",
                  rfqs: "rd_rfq",
                  quotations: "rd_quotation",
                }[resource];
                if (!entityType) return;
                const name = String(
                  record.organisation_name ??
                    record.rfq_code ??
                    record.quote_reference ??
                    "R&D record",
                );
                setEvidencePrefill({
                  title: `${name} Evidence`,
                  category:
                    resource === "quotations" ? "Finance" : "Technology",
                  sourceOrganisation:
                    resource === "suppliers"
                      ? String(record.organisation_name ?? "")
                      : "",
                  description: `Canonical evidence supporting ${name} in KLPS WP1.`,
                  linkMode: true,
                  entityType,
                  entityId: record.id,
                  relationship: `Supports WP1 ${resource.replace("_", " ")} record`,
                });
                setUploadOpen(true);
              }}
            />
          )}
        </section>
      </div>
      <UploadDialog
        open={uploadOpen}
        setOpen={setUploadOpen}
        queue={queue}
        setQueue={setQueue}
        companyId={null}
        documents={evidence}
        prefill={evidencePrefill ?? prefill}
        afterUploads={async () => {
          setEvidence(await evidenceService.linked("rd_work_package", wp.id));
          await refreshProgress();
        }}
      />
    </main>
  );
}

function ResourceView({
  title,
  resource,
  records,
  suppliers,
  wp,
  loading,
  search,
  setSearch,
  addOpen,
  setAddOpen,
  reload,
  uploadEvidence,
}: {
  title: string;
  resource: RdResource;
  records: RdRecord[];
  suppliers: RdRecord[];
  wp: RdWorkPackage;
  loading: boolean;
  search: string;
  setSearch: (v: string) => void;
  addOpen: boolean;
  setAddOpen: (v: boolean) => void;
  reload: () => Promise<void>;
  uploadEvidence: (resource: RdResource, record: RdRecord) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-white/40">
            {resource === "mappings"
              ? "Founder-reviewed proposals only. No Finance OS record is created or overwritten here."
              : "Canonical WP1 operational records. Unknown information remains blank."}
          </p>
        </div>
        {resource !== "mappings" && (
          <button
            onClick={() => setAddOpen(!addOpen)}
            className="rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-semibold"
          >
            <Plus className="mr-2 inline h-4 w-4" />
            Add record
          </button>
        )}
      </div>
      {resource === "mappings" && (
        <Card className="mt-5">
          <h3 className="font-semibold">Manual Finance OS promotion</h3>
          <p className="mt-2 text-sm leading-6 text-white/45">
            After founder approval, enter cost drivers in Assumptions or
            Products, confirmed supplier costs in Expenses, financing
            requirements in Funding and Forecasts, uncertainty in Risks, and
            selected technical or commercial treatments in Decisions. Link the
            same canonical Evidence record. No automatic promotion is enabled.
          </p>
        </Card>
      )}
      {resource === "suppliers" && (
        <SupplierSprintScope suppliers={suppliers} />
      )}
      {addOpen && (
        <RecordForm
          resource={resource}
          wp={wp}
          suppliers={suppliers}
          done={async () => {
            setAddOpen(false);
            await reload();
          }}
        />
      )}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${title.toLowerCase()}`}
        className={`${inputClass} mt-5 max-w-lg`}
      />
      {loading ? (
        <p className="mt-8 text-white/40">Loading…</p>
      ) : records.length ? (
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {records.map((record) =>
            resource === "suppliers" ? (
              <SupplierRecordCard
                key={record.id}
                record={record}
                uploadEvidence={() => uploadEvidence(resource, record)}
              />
            ) : (
              <Card key={record.id}>
              <div className="text-xs text-[#f36bc5]">
                {String(
                  record.status ??
                    record.procurement_status ??
                    record.mapping_status ??
                    "Recorded",
                )}
              </div>
              <h3 className="mt-2 break-words font-semibold">
                {String(
                  record.organisation_name ??
                    record.title ??
                    record.quote_reference ??
                    record.rfq_code ??
                    record.workflow_step ??
                    "R&D record",
                )}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/45">
                {String(
                  record.relevant_capability ??
                    record.summary ??
                    record.finding ??
                    record.description ??
                    record.friction ??
                    record.notes ??
                    "No additional details recorded.",
                )}
              </p>
              <div className="mt-4 text-xs text-white/25">
                v{String(record.version ?? 1)} ·{" "}
                {String(record.change_reason ?? "Audit reason recorded")}
              </div>
              {["rfqs", "quotations"].includes(resource) && (
                <button
                  type="button"
                  onClick={() => uploadEvidence(resource, record)}
                  className="mt-4 inline-flex items-center rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload linked evidence
                </button>
              )}
              </Card>
            ),
          )}
        </div>
      ) : (
        <Card className="mt-5">
          <ShieldCheck className="h-5 w-5 text-[#df3fae]" />
          <h3 className="mt-3 font-semibold">
            No {title.toLowerCase()} recorded
          </h3>
          <p className="mt-2 text-sm text-white/40">
            Add the first verified operational record when information is
            available.
          </p>
        </Card>
      )}
    </>
  );
}

const formFields: Record<RdResource, Array<[string, string, string?]>> = {
  suppliers: [
    ["organisation_name", "Organisation name", "sprint-supplier"],
    ["organisation_aliases", "Known trading identities", "aliases"],
    ["category", "Supplier category", "supplier-category"],
    ["country", "Country"],
    ["existing_relationship", "Existing relationship"],
    ["priority_tier", "Priority tier"],
    ["procurement_status", "Procurement status", "procurement-status"],
    ["source_reference", "Verified source URL", "url"],
    ["research_notes", "Evidence-led research notes", "research-notes"],
  ],
  contacts: [],
  interactions: [
    ["supplier_id", "Supplier", "supplier"],
    ["interaction_type", "Interaction type"],
    ["occurred_at", "Occurred at", "datetime-local"],
    ["summary", "Summary"],
    ["technical_learning", "Technical finding"],
    ["commercial_learning", "Commercial finding"],
    ["actions", "CEO action"],
    ["follow_up_date", "Follow-up date", "date"],
    ["status", "Interaction status"],
  ],
  rfqs: [
    ["supplier_id", "Supplier", "supplier"],
    ["rfq_code", "RFQ code"],
    ["title", "Title"],
    ["status", "Status"],
  ],
  quotations: [
    ["supplier_id", "Supplier", "supplier"],
    ["quote_reference", "Quote reference"],
    ["minimum_amount", "Minimum amount", "number"],
    ["likely_amount", "Likely amount", "number"],
    ["maximum_amount", "Maximum amount", "number"],
  ],
  findings: [
    ["supplier_id", "Supplier", "supplier"],
    ["title", "Title"],
    ["finding", "Finding"],
    ["source_type", "Evidence basis", "evidence-basis"],
    ["status", "Finding status"],
  ],
  actions: [
    ["supplier_id", "Supplier", "supplier"],
    ["title", "Action title"],
    ["owner", "Owner"],
    ["priority", "Priority"],
    ["status", "Status"],
  ],
  friction: [
    ["workflow_step", "Workflow step"],
    ["friction", "Friction"],
    ["enhancement_needed", "Enhancement needed"],
    ["urgency", "Urgency"],
  ],
  mappings: [],
};
function RecordForm({
  resource,
  wp,
  suppliers,
  done,
}: {
  resource: RdResource;
  wp: RdWorkPackage;
  suppliers: RdRecord[];
  done: () => Promise<void>;
}) {
  const [value, setValue] = useState<Record<string, string>>(
    resource === "suppliers"
      ? {
          procurement_status: "Research",
          priority_tier: "Supplier Verification Sprint 1",
          research_notes: EVIDENCE_LED_RESEARCH_NOTE_TEMPLATE,
        }
      : {},
  );
  const [error, setError] = useState("");
  return (
    <form
      className="mt-5 rounded-2xl border border-[#df3fae]/20 bg-[#df3fae]/[.05] p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        const payload: Record<string, unknown> = {
          ...value,
          work_package_id: wp.id,
          change_reason:
            value.change_reason || "Initial WP1 operational record",
        };
        if (resource === "suppliers") {
          payload.organisation_aliases = value.organisation_aliases
            ? value.organisation_aliases
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [];
        }
        for (const k of ["minimum_amount", "likely_amount", "maximum_amount"])
          if (payload[k] === "") payload[k] = null;
        if (
          resource === "interactions" &&
          typeof payload.occurred_at === "string"
        )
          payload.occurred_at = new Date(payload.occurred_at).toISOString();
        try {
          await rdLabService.create(resource, payload);
          await done();
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "Record could not be saved.",
          );
        }
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {formFields[resource].map(([key, label, type]) => (
          <label key={key} className="text-xs text-white/50">
            {label}
            {type === "supplier" ? (
              <select
                required
                value={value[key] ?? ""}
                onChange={(e) => setValue({ ...value, [key]: e.target.value })}
                className={`${inputClass} mt-1`}
              >
                <option value="">Select supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {String(s.organisation_name)}
                  </option>
                ))}
              </select>
            ) : type === "sprint-supplier" ? (
              <select
                required
                value={value[key] ?? ""}
                onChange={(e) =>
                  setValue({ ...value, [key]: e.target.value })
                }
                className={`${inputClass} mt-1`}
              >
                <option value="">Select a Sprint 1 organisation</option>
                {WP1_SUPPLIER_VERIFICATION_SPRINT.map((supplier) => (
                  <option
                    key={supplier.canonicalName}
                    value={supplier.canonicalName}
                  >
                    {supplier.displayName}
                  </option>
                ))}
              </select>
            ) : type === "supplier-category" ? (
              <select
                required
                value={value[key] ?? ""}
                onChange={(e) =>
                  setValue({ ...value, [key]: e.target.value })
                }
                className={`${inputClass} mt-1`}
              >
                <option value="">Select a verified category</option>
                {SUPPLIER_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : type === "procurement-status" ? (
              <select
                required
                value={value[key] ?? "Research"}
                onChange={(e) =>
                  setValue({ ...value, [key]: e.target.value })
                }
                className={`${inputClass} mt-1`}
              >
                {PROCUREMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : type === "evidence-basis" ? (
              <select
                required
                value={value[key] ?? ""}
                onChange={(e) =>
                  setValue({ ...value, [key]: e.target.value })
                }
                className={`${inputClass} mt-1`}
              >
                <option value="">Select evidence basis</option>
                {[
                  "Verified Fact",
                  "Supplier Confirmed",
                  "Reasonable Inference",
                  "Founder Assumption",
                  "Unknown",
                ].map((basis) => (
                  <option key={basis} value={basis}>
                    {basis}
                  </option>
                ))}
              </select>
            ) : type === "research-notes" ? (
              <textarea
                required
                rows={7}
                value={value[key] ?? ""}
                onChange={(e) =>
                  setValue({ ...value, [key]: e.target.value })
                }
                className={`${inputClass} mt-1 resize-y`}
              />
            ) : (
              <input
                required={
                  ![
                    "country",
                    "organisation_aliases",
                    "existing_relationship",
                    "priority_tier",
                    "minimum_amount",
                    "likely_amount",
                    "maximum_amount",
                  ].includes(key)
                }
                type={type ?? "text"}
                value={value[key] ?? ""}
                onChange={(e) => setValue({ ...value, [key]: e.target.value })}
                className={`${inputClass} mt-1`}
              />
            )}
          </label>
        ))}
        <label className="text-xs text-white/50 md:col-span-2">
          Reason for this entry
          <input
            required
            minLength={5}
            value={value.change_reason ?? ""}
            onChange={(e) =>
              setValue({ ...value, change_reason: e.target.value })
            }
            className={`${inputClass} mt-1`}
          />
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <button className="mt-4 rounded-lg bg-[#df3fae] px-4 py-2 text-sm font-semibold">
        Save canonical record
      </button>
    </form>
  );
}
function SupplierRecordCard({
  record,
  uploadEvidence,
}: {
  record: RdRecord;
  uploadEvidence: () => void;
}) {
  const aliases = Array.isArray(record.organisation_aliases)
    ? record.organisation_aliases.filter(
        (value): value is string => typeof value === "string",
      )
    : [];
  const source =
    typeof record.source_reference === "string"
      ? record.source_reference
      : null;
  const notes =
    typeof record.research_notes === "string" ? record.research_notes : null;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-[#b52a8b]">
            {String(record.procurement_status ?? "Research")}
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            {String(record.organisation_name)}
          </h3>
          {aliases.length > 0 && (
            <p className="mt-1 text-sm text-white/45">
              Also known as: {aliases.join(", ")}
            </p>
          )}
        </div>
        <div className="rd-priority-pill rounded-full px-3 py-1 text-xs font-semibold">
          {String(record.priority_tier ?? "Priority not confirmed")}
        </div>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold">Category</dt>
          <dd className="mt-0.5 text-white/45">
            {String(record.category ?? "Not confirmed")}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Country</dt>
          <dd className="mt-0.5 text-white/45">
            {String(record.country ?? "Not confirmed")}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Existing relationship</dt>
          <dd className="mt-0.5 text-white/45">
            {String(record.existing_relationship ?? "Not confirmed")}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Evidence source</dt>
          <dd className="mt-0.5">
            {source ? (
              <a
                href={source}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#8f1d6e] underline underline-offset-2"
              >
                Open verified source
              </a>
            ) : (
              <span className="text-white/45">Not yet evidenced</span>
            )}
          </dd>
        </div>
      </dl>
      {notes && (
        <div className="mt-4 whitespace-pre-line rounded-xl border border-white/10 bg-white/[.035] p-3 text-sm leading-6 text-white/55">
          {notes}
        </div>
      )}
      <button
        type="button"
        onClick={uploadEvidence}
        className="mt-4 inline-flex items-center rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold"
      >
        <FileUp className="mr-2 h-4 w-4" />
        Upload linked evidence
      </button>
      <div className="mt-4 text-xs text-white/25">
        v{String(record.version ?? 1)} ·{" "}
        {String(record.change_reason ?? "Audit reason recorded")}
      </div>
    </Card>
  );
}
function SupplierSprintScope({ suppliers }: { suppliers: RdRecord[] }) {
  const recordedNames = new Set(
    suppliers.map((supplier) =>
      String(supplier.organisation_name ?? "").toLowerCase(),
    ),
  );

  return (
    <Card className="mt-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-[#b52a8b]">
            Supplier Verification Sprint 1
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            Four-organisation research boundary
          </h3>
        </div>
        <p className="max-w-xl text-sm text-white/45">
          No organisations should be added outside this scope until this sprint
          is complete.
        </p>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {WP1_SUPPLIER_VERIFICATION_SPRINT.map((supplier) => {
          const recorded = recordedNames.has(
            supplier.canonicalName.toLowerCase(),
          );
          return (
            <li
              key={supplier.canonicalName}
              className="rounded-xl border border-white/10 bg-white/[.035] px-3 py-3"
            >
              <div className="font-semibold">{supplier.displayName}</div>
              <div className="mt-1 text-xs text-white/45">
                {recorded ? "Canonical record created" : "Awaiting record"}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
function Instructions() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h2 className="text-xl font-semibold">Approved requirement</h2>
        <p className="mt-4 leading-7 text-white/60">
          Identify at least one textile sensing approach capable of repeatably
          detecting abdominal expansion or related abdominal change relative to
          an individual baseline under normal daily use.
        </p>
        <h3 className="mt-7 font-semibold">Customer outcome</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Help the user understand when abdominal change differs from her
          personal norm and, over time, identify repeatable patterns and
          possible lifestyle correlations.
        </p>
        <div className="mt-5 rounded-xl border border-[#df3fae]/20 bg-[#df3fae]/10 p-4 text-sm">
          No diagnostic claims.
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Positioning</h2>
        <p className="mt-4 text-sm leading-6 text-white/55">
          KLPS is developing a longitudinal Body Understanding Platform powered
          by intelligent textiles. The underwear is the first interface—not
          generic smart underwear.
        </p>
        <h3 className="mt-6 font-semibold">Material position</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Graphene is preferred as a strategic research direction. Compare it
          with silver-coated fibres, conductive yarns, conductive polymers and
          printed materials. Do not lock WP1 before feasibility evidence.
        </p>
      </Card>
      <Card>
        <h2 className="font-semibold">Technical progression</h2>
        <ol className="mt-4 space-y-2 text-sm text-white/50">
          {[
            "Sensing textile feasibility",
            "Textile swatches",
            "Removable sensing insert",
            "Garment-ready prototype",
            "Purpose-designed underwear",
            "Pilot preparation",
          ].map((x, i) => (
            <li key={x}>
              {i + 1}. {x}
            </li>
          ))}
        </ol>
      </Card>
      <Card>
        <h2 className="font-semibold">Core technical challenges</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {challenges.map((x) => (
            <span
              key={x}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45"
            >
              {x}
            </span>
          ))}
        </div>
        <h2 className="mt-7 font-semibold">Success evidence</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/50 sm:grid-cols-2">
          {success.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[.035] p-5 ${className}`}
    >
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <strong className="text-white">{value}</strong>
    </div>
  );
}
function State({ text }: { text: string }) {
  return (
    <main className="rd-lab-light flex min-h-screen items-center justify-center bg-[#100c13] text-white/50">
      {text}
    </main>
  );
}
