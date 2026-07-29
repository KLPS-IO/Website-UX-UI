import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Download,
  Eye,
  FileUp,
  GripVertical,
  Link2,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  Unlink,
  X,
} from "lucide-react";
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
import type { EvidenceEntityType, EvidenceItem } from "@/types/evidence";
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
  const [evidenceRevision, setEvidenceRevision] = useState(0);
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
              <LinkedEvidenceList
                entityType="rd_work_package"
                entityId={wp.id}
                contextLabel="work package"
                refreshKey={evidenceRevision}
                onChanged={async () => {
                  setEvidence(
                    await evidenceService.linked("rd_work_package", wp.id),
                  );
                  await refreshProgress();
                }}
              />
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
              evidenceRevision={evidenceRevision}
              onEvidenceChanged={async () => {
                await refreshProgress();
                setEvidenceRevision((current) => current + 1);
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
          setEvidenceRevision((current) => current + 1);
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
  evidenceRevision,
  onEvidenceChanged,
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
  evidenceRevision: number;
  onEvidenceChanged: () => Promise<void>;
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
          cancel={() => setAddOpen(false)}
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
                evidenceRevision={evidenceRevision}
                onEvidenceChanged={onEvidenceChanged}
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
  cancel,
}: {
  resource: RdResource;
  wp: RdWorkPackage;
  suppliers: RdRecord[];
  done: () => Promise<void>;
  cancel: () => void;
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
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-lg bg-[#df3fae] px-4 py-2 text-sm font-semibold">
          Save canonical record
        </button>
        <button
          type="button"
          onClick={cancel}
          className="rounded-lg border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-[#2d2530]"
        >
          Close without saving
        </button>
      </div>
    </form>
  );
}
function SupplierRecordCard({
  record,
  uploadEvidence,
  evidenceRevision,
  onEvidenceChanged,
}: {
  record: RdRecord;
  uploadEvidence: () => void;
  evidenceRevision: number;
  onEvidenceChanged: () => Promise<void>;
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
  const [notesExpanded, setNotesExpanded] = useState(false);
  const notesNeedExpansion = Boolean(notes && notes.length > 360);

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
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[.035] p-3">
          <div
            id={`supplier-notes-${record.id}`}
            className={`relative whitespace-pre-line text-sm leading-6 text-white/55 ${
              notesNeedExpansion && !notesExpanded
                ? "max-h-36 overflow-hidden"
                : ""
            }`}
          >
            {notes}
            {notesNeedExpansion && !notesExpanded && (
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"
                aria-hidden="true"
              />
            )}
          </div>
          {notesNeedExpansion && (
            <button
              type="button"
              onClick={() => setNotesExpanded((current) => !current)}
              aria-expanded={notesExpanded}
              aria-controls={`supplier-notes-${record.id}`}
              className="mt-2 rounded-md px-1 py-1 text-sm font-bold text-[#18743b] underline decoration-[#18743b]/40 underline-offset-4 hover:text-[#0f5c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18743b]"
            >
              {notesExpanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      )}
      <LinkedEvidenceList
        entityType="rd_supplier"
        entityId={record.id}
        contextLabel="supplier"
        refreshKey={evidenceRevision}
        onChanged={onEvidenceChanged}
      />
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
function LinkedEvidenceList({
  entityType,
  entityId,
  contextLabel,
  refreshKey,
  onChanged,
}: {
  entityType: EvidenceEntityType;
  entityId: string;
  contextLabel: string;
  refreshKey: number;
  onChanged?: () => Promise<void> | void;
}) {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<"manual" | "evidence-date" | "upload-date" | "title">(
    () => (localStorage.getItem(`rd-lab:evidence-order:${entityType}:${entityId}`) as "manual" | "evidence-date" | "upload-date" | "title" | null) ?? "manual",
  );
  const [draggedLinkId, setDraggedLinkId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deletionItem, setDeletionItem] = useState<EvidenceItem | null>(null);
  const [deletionDetails, setDeletionDetails] = useState<EvidenceItem | null>(null);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const closeDeletionRef = useRef<HTMLButtonElement>(null);
  const [previewItem, setPreviewItem] = useState<EvidenceItem | null>(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const closePreviewRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    evidenceService
      .linked(entityType, entityId)
      .then((result) => {
        if (active) setItems(result);
      })
      .catch(() => {
        if (active)
          setError("Linked evidence could not be loaded. Check Documents.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [entityId, entityType, refreshKey]);

  useEffect(() => {
    localStorage.setItem(`rd-lab:evidence-order:${entityType}:${entityId}`, order);
  }, [entityId, entityType, order]);

  useEffect(() => {
    if (!deletionItem) return;
    closeDeletionRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deletionLoading) {
        setDeletionItem(null);
        setDeletionDetails(null);
        setShowLinks(false);
        setDeleteConfirmation("");
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [deletionItem, deletionLoading]);

  useEffect(() => {
    if (!previewItem) return;
    closePreviewRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewItem(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [previewItem]);

  const linkFor = useCallback(
    (item: EvidenceItem) =>
      item.links?.find(
        (link) =>
          link.entity_type === entityType &&
          link.entity_id === entityId,
      ),
    [entityId, entityType],
  );

  const displayedItems = useMemo(() => {
    const result = [...items];
    if (order === "manual") {
      return result.sort(
        (a, b) =>
          (linkFor(a)?.display_order ?? Number.MAX_SAFE_INTEGER) -
          (linkFor(b)?.display_order ?? Number.MAX_SAFE_INTEGER),
      );
    }
    if (order === "title") {
      return result.sort((a, b) => a.title.localeCompare(b.title));
    }
    const value = (item: EvidenceItem) =>
      Date.parse(
        order === "evidence-date"
          ? item.documentDate ?? ""
          : item.createdAt,
      );
    return result.sort((a, b) => {
      const aDate = value(a);
      const bDate = value(b);
      if (!Number.isFinite(aDate)) return Number.isFinite(bDate) ? 1 : 0;
      if (!Number.isFinite(bDate)) return -1;
      return aDate - bDate;
    });
  }, [items, linkFor, order]);

  const reorder = async (targetLinkId: string) => {
    if (!draggedLinkId || draggedLinkId === targetLinkId || order !== "manual") return;
    const current = [...displayedItems];
    const from = current.findIndex((item) => linkFor(item)?.id === draggedLinkId);
    const to = current.findIndex((item) => linkFor(item)?.id === targetLinkId);
    if (from < 0 || to < 0) return;
    const previous = items;
    const [moved] = current.splice(from, 1);
    current.splice(to, 0, moved);
    setItems(current);
    setSavingOrder(true);
    setError("");
    try {
      await evidenceService.reorderLinks(
        entityType,
        entityId,
        current.map((item) => linkFor(item)?.id).filter((id): id is string => Boolean(id)),
      );
      setItems(await evidenceService.linked(entityType, entityId));
    } catch {
      setItems(previous);
      setError("The evidence order could not be saved. Reload and try again.");
    } finally {
      setDraggedLinkId(null);
      setSavingOrder(false);
    }
  };

  const openDeletion = async (item: EvidenceItem) => {
    setDeletionItem(item);
    setDeletionDetails(null);
    setDeletionLoading(true);
    setShowLinks(false);
    setDeleteConfirmation("");
    setError("");
    try {
      setDeletionDetails(await evidenceService.get(item.id));
    } catch {
      setDeletionItem(null);
      setError("The linked records could not be checked safely.");
    } finally {
      setDeletionLoading(false);
    }
  };

  const closeDeletion = () => {
    if (deletionLoading) return;
    setDeletionItem(null);
    setDeletionDetails(null);
    setShowLinks(false);
    setDeleteConfirmation("");
  };

  const refreshAfterDeletion = async () => {
    setItems(await evidenceService.linked(entityType, entityId));
    await onChanged?.();
    closeDeletion();
  };

  const removeCurrentLink = async () => {
    if (!deletionItem) return;
    const linkId = linkFor(deletionItem)?.id;
    if (!linkId) return;
    setDeletionLoading(true);
    try {
      await evidenceService.unlink(deletionItem.id, linkId);
      await refreshAfterDeletion();
    } catch {
      setError("The evidence link could not be removed.");
      setDeletionLoading(false);
    }
  };

  const deleteEverywhere = async () => {
    if (!deletionItem || deleteConfirmation !== "DELETE EVERYWHERE") return;
    setDeletionLoading(true);
    try {
      await evidenceService.deleteEverywhere(deletionItem.id);
      await refreshAfterDeletion();
    } catch {
      setError("The canonical evidence record could not be deleted.");
      setDeletionLoading(false);
    }
  };

  const access = async (
    item: EvidenceItem,
    action: "view" | "download",
  ) => {
    setError("");
    try {
      const result = await evidenceService.accessDocument(item.id, action);
      if (action === "view") {
        const isWordDocument =
          item.mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          item.originalFilename?.toLowerCase().endsWith(".docx");
        if (isWordDocument) {
          setPreviewItem(item);
          setPreviewHtml("");
          setPreviewError("");
          setPreviewLoading(true);
          try {
            const mammoth = await import("mammoth");
            const converted = await mammoth.convertToHtml({
              arrayBuffer: await (await evidenceService.previewDocument(item.id)).arrayBuffer(),
            });
            setPreviewHtml(converted.value);
          } catch {
            setPreviewError(
              "This Word document could not be previewed. You can still use Download.",
            );
          } finally {
            setPreviewLoading(false);
          }
          return;
        }
        window.open(result.signed_url, "_blank", "noopener,noreferrer");
        return;
      }
      const anchor = document.createElement("a");
      anchor.href = result.signed_url;
      anchor.download = item.originalFilename ?? "";
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch {
      setError("The evidence file could not be opened.");
    }
  };

  return (
    <details className="group mt-4 rounded-xl border border-white/10 bg-[#faf8fb]">
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 font-semibold">
          Uploaded evidence
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#eadde7] px-2.5 py-1 text-xs font-semibold text-[#3b102f]">
            {loading ? "Checking…" : `${items.length} linked`}
          </span>
          <label className="flex items-center gap-1.5 text-xs font-semibold" onClick={(event) => event.stopPropagation()}>
            Order:
            <select
              value={order}
              onChange={(event) => setOrder(event.target.value as typeof order)}
              aria-label="Order uploaded evidence"
              className="rounded-lg border border-[#d9ced7] bg-white px-2 py-1 text-[#211b20]"
            >
              <option value="manual">Manual</option>
              <option value="evidence-date">Evidence Date</option>
              <option value="upload-date">Upload Date</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </label>
        </span>
      </summary>
      <div className="border-t border-white/10 px-4 pb-4 pt-3">
        {loading ? (
          <p className="text-sm text-white/45">
            Checking canonical Evidence records…
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-white/45">
            No uploaded evidence is linked to this supplier.
          </p>
        ) : (
          <>
            <p className="text-sm text-white/45">
              Arrange evidence in the order that best tells the technical and procurement story for this {contextLabel}. Evidence can be reordered without affecting upload dates or other linked records.
            </p>
            <ul className="mt-3 space-y-2">
            {displayedItems.map((item) => {
              const canonicalLink = linkFor(item);
              const relationship =
                canonicalLink?.relationship ?? "Linked to supplier";
              return (
                <li
                  key={canonicalLink?.id ?? item.id}
                  draggable={order === "manual" && !savingOrder}
                  onDragStart={() => setDraggedLinkId(canonicalLink?.id ?? null)}
                  onDragOver={(event) => {
                    if (order === "manual") event.preventDefault();
                  }}
                  onDrop={() => canonicalLink?.id && void reorder(canonicalLink.id)}
                  onDragEnd={() => setDraggedLinkId(null)}
                  className={`overflow-hidden rounded-xl border border-[#e2d9e0] bg-white shadow-[0_1px_2px_rgba(40,22,35,.04)] ${draggedLinkId === canonicalLink?.id ? "opacity-55" : ""}`}
                >
                  <div className="flex min-w-0 items-start gap-3 p-4">
                      <button
                        type="button"
                        disabled={order !== "manual" || savingOrder}
                        className="mt-0.5 h-9 shrink-0 cursor-grab rounded-lg p-2 text-[#746a72] hover:bg-[#f3edf2] disabled:cursor-default disabled:opacity-30"
                        aria-label={`Drag to reorder ${item.title}`}
                        title={order === "manual" ? "Drag to reorder" : "Select Manual Order to reorder"}
                      >
                        <GripVertical className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-[#9c1f76]">
                            {item.code}
                          </span>
                          <span className="rounded-full bg-[#f4e8f1] px-2.5 py-1 text-xs font-semibold text-[#5c204d]">
                            {item.verificationStatus}
                          </span>
                        </div>
                        <h4 className="mt-1.5 max-w-3xl break-words text-lg font-bold leading-6 text-[#211b20]">
                          {item.title}
                        </h4>
                        <p
                          className="mt-2 truncate text-sm text-[#625962]"
                          title={item.originalFilename ?? undefined}
                        >
                          {item.originalFilename ?? "No filename recorded"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#625962]">
                          <span>{item.category ?? "Category not confirmed"}</span>
                          <span>
                            Evidence date:{" "}
                            {item.documentDate
                              ? formatSafeDate(item.documentDate)
                              : "Not confirmed"}
                          </span>
                          <span>
                            Uploaded: {formatSafeDate(item.createdAt)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-[#443c43]">
                          {relationship}
                        </p>
                      </div>
                  </div>
                  <div className="flex flex-wrap gap-2 border-t border-[#eee6ec] bg-[#fcfafc] px-4 py-3 sm:pl-16">
                      <button
                        type="button"
                        disabled={!item.hasR2Object}
                        onClick={() => void access(item, "view")}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#dcd3da] bg-white px-3 py-2 text-sm font-semibold text-[#282127] hover:bg-[#f7f2f6] disabled:opacity-45 sm:flex-none"
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        View
                      </button>
                      <button
                        type="button"
                        disabled={!item.hasR2Object}
                        onClick={() => void access(item, "download")}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#dcd3da] bg-white px-3 py-2 text-sm font-semibold text-[#282127] hover:bg-[#f7f2f6] disabled:opacity-45 sm:flex-none"
                      >
                        <Download className="mr-1.5 h-4 w-4" />
                        Download
                      </button>
                      <button
                        type="button"
                        onClick={() => void openDeletion(item)}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#dcd3da] bg-white px-3 py-2 text-sm font-semibold text-[#282127] hover:bg-[#f7f2f6] sm:flex-none"
                      >
                        <Unlink className="mr-1.5 h-4 w-4" />
                        Remove Link
                      </button>
                      <button
                        type="button"
                        onClick={() => void openDeletion(item)}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 sm:flex-none"
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Delete
                      </button>
                  </div>
                </li>
              );
            })}
            </ul>
          </>
        )}
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
      {deletionItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDeletion();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="evidence-delete-title"
            className="w-full max-w-xl rounded-2xl border border-[#ddd2da] bg-white p-5 text-[#211b20] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[.14em] text-[#a6227d]">
                  Canonical Evidence
                </div>
                <h3 id="evidence-delete-title" className="mt-1 text-xl font-bold">
                  Remove or delete {deletionItem.code}
                </h3>
              </div>
              <button ref={closeDeletionRef} type="button" onClick={closeDeletion} className="rounded-lg p-2 hover:bg-[#f3edf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae]" aria-label="Close evidence deletion dialog">
                <X className="h-5 w-5" />
              </button>
            </div>
            {deletionLoading && !deletionDetails ? (
              <p className="mt-4">Checking every canonical relationship…</p>
            ) : deletionDetails ? (
              <>
                <p className="mt-4">
                  This evidence is linked to <strong>{deletionDetails.links?.length ?? 0} records</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setShowLinks((current) => !current)}
                  className="mt-3 inline-flex items-center rounded-lg border border-[#d9ced7] px-3 py-2 text-sm font-semibold"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  View linked records
                </button>
                {showLinks && (
                  <ul className="mt-3 space-y-2 rounded-xl bg-[#f7f2f6] p-3">
                    {(deletionDetails.links ?? []).map((link) => (
                      <li key={link.id} className="text-sm">
                        <strong>{evidenceEntityLabel(link.entity_type)}</strong>
                        <span className="block text-[#675d65]">{link.relationship ?? "Relationship not described"}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    disabled={deletionLoading}
                    onClick={() => void removeCurrentLink()}
                    className="rounded-xl bg-[#e13aad] px-4 py-3 font-bold text-white disabled:opacity-50"
                  >
                    {(deletionDetails.links?.length ?? 0) > 1
                      ? `Remove link from this ${contextLabel} only`
                      : "Remove final link and delete evidence"}
                  </button>
                  {(deletionDetails.links?.length ?? 0) === 1 && (
                    <p className="text-sm text-[#675d65]">
                      This is the last relationship, so removing it will also delete the canonical evidence record and stored file.
                    </p>
                  )}
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                    <div className="font-bold text-red-800">Delete everywhere</div>
                    <p className="mt-1 text-sm text-red-700">
                      This removes the canonical record, every relationship and the stored file. Type DELETE EVERYWHERE to confirm.
                    </p>
                    <input
                      value={deleteConfirmation}
                      onChange={(event) => setDeleteConfirmation(event.target.value)}
                      className="mt-3 w-full rounded-lg border border-red-200 bg-white px-3 py-2"
                      aria-label="Type DELETE EVERYWHERE to confirm canonical deletion"
                    />
                    <button
                      type="button"
                      disabled={deletionLoading || deleteConfirmation !== "DELETE EVERYWHERE"}
                      onClick={() => void deleteEverywhere()}
                      className="mt-3 rounded-lg bg-red-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-40"
                    >
                      Delete everywhere
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        </div>
      )}
      {previewItem && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-3 sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewItem(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="evidence-preview-title"
            className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#ddd2da] bg-white text-[#211b20] shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#e8e0e6] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-[.14em] text-[#9c1f76]">
                  {previewItem.code} · Document preview
                </div>
                <h3
                  id="evidence-preview-title"
                  className="mt-1 truncate text-lg font-bold"
                  title={previewItem.title}
                >
                  {previewItem.title}
                </h3>
              </div>
              <button
                ref={closePreviewRef}
                type="button"
                onClick={() => setPreviewItem(null)}
                className="shrink-0 rounded-lg p-2 hover:bg-[#f3edf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae]"
                aria-label="Close document preview"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="min-h-0 flex-1 bg-[#f1edf0] p-3 sm:p-5">
              {previewLoading ? (
                <div className="flex h-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-[#625962]">
                  Preparing secure Word preview…
                </div>
              ) : previewError ? (
                <div
                  role="alert"
                  className="flex h-full items-center justify-center rounded-xl bg-white p-6 text-center text-sm font-semibold text-red-700"
                >
                  {previewError}
                </div>
              ) : (
                <iframe
                  title={`${previewItem.title} preview`}
                  sandbox=""
                  srcDoc={`<!doctype html><html><head><meta charset="utf-8"><style>html{background:#fff}body{box-sizing:border-box;max-width:850px;min-height:100%;margin:0 auto;padding:48px 56px;color:#211b20;font:16px/1.65 Arial,sans-serif}h1,h2,h3,h4{line-height:1.25}p{margin:0 0 1em}table{width:100%;border-collapse:collapse}td,th{border:1px solid #d8d0d6;padding:8px;text-align:left}img{max-width:100%;height:auto}@media(max-width:640px){body{padding:24px 20px}}</style></head><body>${previewHtml}</body></html>`}
                  className="h-full w-full rounded-xl border border-[#ddd2da] bg-white"
                />
              )}
            </div>
            <footer className="flex flex-wrap justify-end gap-2 border-t border-[#e8e0e6] bg-white px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => void access(previewItem, "download")}
                className="inline-flex items-center rounded-lg border border-[#dcd3da] px-3 py-2 text-sm font-semibold hover:bg-[#f7f2f6]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="rounded-lg bg-[#df3fae] px-4 py-2 text-sm font-bold text-white"
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </details>
  );
}

function evidenceEntityLabel(entityType: string) {
  return ({
    rd_work_package: "Work Package",
    rd_supplier: "Supplier",
    rd_rfq: "RFQ",
    rd_quotation: "Quotation",
    expense: "Finance OS Expense",
    decision: "Decision Log",
    company: "Company",
    funding: "Funding",
    report: "Report",
    assumption: "Assumption",
    product: "Product",
    risk: "Risk Register",
    scenario: "Scenario",
    hire: "Hiring",
    document: "Document",
    kpi: "KPI",
  } as Record<string, string>)[entityType] ?? entityType.replaceAll("_", " ");
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
