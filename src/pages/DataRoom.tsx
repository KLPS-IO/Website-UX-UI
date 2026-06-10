import { PageHeader, Section } from "@/components/Section";
import { API_BASE } from "@/config/api";
import {
  DATA_ROOM_NDA_VERSION,
  normalizeAccessEmail,
} from "@/config/dataRoomAccess";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const LEGACY_KEYS = [
  "klps.dataRoom.session",
  "klps.dataRoom.authorizedEmails",
  "klps.dataRoom.accessLog",
];

const TOKEN_KEY = "klps.dataRoom.sessionToken";

type DataRoomUser = {
  id?: string;
  email: string;
  role?:
    | "founder"
    | "admin"
    | "authorised_user"
    | "authorized_user"
    | "pending_user"
    | "revoked_user";
  isAdmin?: boolean;
  isFounder?: boolean;
  ndaAccepted?: boolean;
};

type DocumentItem = {
  id: string;
  filename: string;
  category?: string;
  fileSize?: string;
  file_size?: string;
  version?: string;
  updatedAt?: string;
  updated_at?: string;
};

type AccessLog = {
  id?: string;
  email: string;
  event_type?: string;
  eventType?: string;
  detail?: string;
  document_id?: string;
  documentId?: string;
  timestamp?: string;
  at?: string;
};

type NdaContent = {
  version: string;
  title: string;
  sections: { title: string; body: string }[];
  watermark: string;
};

type SessionState = {
  authenticated: boolean;
  user: DataRoomUser | null;
};

type ApiRecord = Record<string, unknown>;

type InsightMetric = {
  value: string;
  count: number;
};

type ResearchMetrics = {
  participants: number;
  voiceRecordings: number;

  topConcern: string | null;
  topConcernPercent: number;

  spentMoneyPercent: number;
  wouldPayPercent: number;

  topPricePoint?: string;
  topPricePointCount?: number;

  topDesiredInsight?: string;
  topDesiredInsightPercent?: number;

  topDesiredInsights: InsightMetric[];
  trustedSources: InsightMetric[];
};

class ApiRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

const isRecord = (value: unknown): value is ApiRecord =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const stringValue = (value: unknown) =>
  typeof value === "string" ? value : undefined;

const booleanValue = (value: unknown) =>
  typeof value === "boolean" ? value : undefined;

const fallbackNda: NdaContent = {
  version: DATA_ROOM_NDA_VERSION,
  title: "KLPS One-Way Confidentiality & Non-Disclosure Agreement",
  watermark: "Confidential Property of KLPS Ltd",
  sections: [
    {
      title: "1. Parties and Purpose",
      body: "This One-Way Confidentiality and Non-Disclosure Agreement applies between KLPS Ltd, company number to be added once registered details are finalised, with registered office address to be added once finalised, and the authorised recipient accessing the KLPS investor data room, R&D lab materials, documents, prototypes, commercial information, and related discussions.",
    },
    {
      title: "2. Confidential Information",
      body: "Confidential Information includes all non-public information disclosed by KLPS Ltd in any form, including business plans, financials, cap table information, designs, software, algorithms, textile systems, sensor concepts, prototypes, research, manufacturing processes, commercial strategy, investor materials, university or agency materials, and all derivative notes, analyses, summaries, extracts, compilations, copies, or materials created from or based on that information.",
    },
    {
      title: "3. Use and Non-Disclosure",
      body: "The recipient may use Confidential Information only to evaluate, advise on, invest in, manufacture for, partner with, or otherwise support KLPS Ltd in the specific authorised purpose. The recipient must keep the information confidential, protect it with at least reasonable care, and must not disclose it to any person except approved representatives who have a genuine need to know and are bound by equivalent confidentiality obligations.",
    },
    {
      title: "4. No Implied Licence",
      body: "No licence, assignment, ownership right, or other intellectual property right is granted or implied by disclosure. KLPS Ltd retains all rights, title, and interest in its Confidential Information, intellectual property, know-how, data, inventions, designs, prototypes, documentation, and related materials.",
    },
    {
      title: "5. Reverse Engineering and AI Restrictions",
      body: "The recipient must not reverse engineer, decompile, disassemble, reproduce, train artificial intelligence systems on, scrape, mine, upload into public or third-party AI tools, or attempt to derive the composition, structure, source, algorithms, designs, formulae, or underlying methods of any KLPS material, product, prototype, dataset, software, textile, sensor system, or technical disclosure.",
    },
    {
      title: "6. Residual Knowledge",
      body: "Nothing in this agreement restricts the recipient from using general knowledge, skills, and experience retained unaided in memory, provided that such use does not disclose or rely on KLPS Confidential Information, trade secrets, technical specifics, business plans, or protected intellectual property.",
    },
    {
      title: "7. Non-Circumvention",
      body: "The recipient must not use Confidential Information to bypass, compete unfairly with, solicit away from, or directly approach KLPS Ltd's investors, partners, manufacturers, suppliers, employees, contractors, universities, agencies, customers, or commercial opportunities for any purpose that harms or circumvents KLPS Ltd.",
    },
    {
      title: "8. Data Room Protections",
      body: "Access to the data room is personal, permissioned, and logged. The recipient must not share login details, copy files outside authorised channels, remove watermarks, alter metadata, or redistribute materials. Exported PDFs and shared files should include the footer watermark: Confidential Property of KLPS Ltd.",
    },
    {
      title: "9. Assignment, Warranty, and Return",
      body: "The recipient may not assign this agreement or transfer access without KLPS Ltd's written consent. Confidential Information is provided without warranty as to accuracy, completeness, fitness for purpose, or commercial outcome. On request, the recipient must return or destroy Confidential Information and confirm deletion of copies, subject only to legally required archival retention.",
    },
    {
      title: "10. Duration and Remedies",
      body: "Confidentiality obligations continue for five years from disclosure, and trade secret obligations continue for as long as the information remains a trade secret. The recipient acknowledges that unauthorised disclosure may cause irreparable harm and that KLPS Ltd may seek injunctive relief and other remedies available by law.",
    },
  ],
};

const categories = [
  "All Documents",
  "Pitch Deck",
  "Financials",
  "IP Portfolio",
  "Market",
  "Legal",
  "FAQ",
] as const;

type DataRoomCategory = (typeof categories)[number];

const faqItems = [
  {
    question: "What makes KPLS different?",
    answer: [
      "The most popular devices give insights from the wrist and finger. KPLS focuses on torso and pelvic signals.",
      "KPLS is being designed to understand patterns over time. Rather than simply displaying raw data, our vision is to help users understand changes in body measurements, potential cycle-related trends, recovery patterns, personal physiological baselines, and long-term changes and correlations.",
      "The aim is to provide context, not just data.",
    ],
  },
  {
    question: "What insights could users receive?",
    answer: [
      "Potential future insights may include cycle pattern awareness, waist and bloating trend analysis, recovery and physiological change monitoring, personal baseline comparisons, long-term pattern recognition, behavioural and wellbeing correlations, and passive health journaling without manual tracking.",
      'For example, rather than showing a single measurement, KPLS may identify trends such as: "Your waist measurements have increased above your typical baseline over the last four days, a pattern that has previously occurred before your menstrual cycle."',
      "The exact insight set will evolve through research, user testing and validation.",
    ],
  },
  {
    question: "What is personal baseline intelligence?",
    answer: [
      "Most health technologies compare users against population averages. KPLS is exploring a different approach: you compared with you.",
      "By understanding an individual's historical patterns, the platform may be able to identify meaningful changes relative to their own normal baseline.",
      "This approach has the potential to make insights more relevant and personalised.",
    ],
  },
  {
    question: "What stage is the company at?",
    answer: [
      "KPLS is currently in the research and development phase.",
      "We are conducting customer discovery, technical exploration and ecosystem engagement to better understand women's needs and evaluate potential approaches to delivering meaningful health insights.",
    ],
  },
  {
    question: "How will the product evolve over time?",
    answer: [
      "Our long-term vision is to build a continuously improving intelligence platform.",
      "As more longitudinal data is collected and validated, future versions of KPLS may be able to identify increasingly sophisticated patterns, trends and correlations that help users better understand their health.",
      "The garment is the mechanism. The intelligence is the product.",
    ],
  },
  {
    question: "Why are you collecting longitudinal data?",
    answer: [
      "Most health measurements are captured as isolated snapshots. KPLS is interested in understanding change over time.",
      "By observing patterns across weeks, months and eventually years, we believe it may be possible to generate insights that are difficult to obtain through occasional measurements or short-term tracking alone.",
      "Our ambition is to build one of the world's most valuable longitudinal physiological datasets focused on women's health.",
    ],
  },
];

const normaliseCategoryName = (value?: string): DataRoomCategory | null => {
  const normalized =
    value
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim() || "";

  if (!normalized) return null;
  if (normalized.includes("pitch") || normalized.includes("deck"))
    return "Pitch Deck";
  if (normalized.includes("financial") || normalized.includes("projection"))
    return "Financials";
  if (
    normalized.includes("ip") ||
    normalized.includes("portfolio") ||
    normalized.includes("patent")
  )
    return "IP Portfolio";
  if (normalized.includes("market") || normalized.includes("value proposition"))
    return "Market";
  if (normalized.includes("legal") || normalized.includes("nda"))
    return "Legal";
  if (normalized.includes("faq")) return "FAQ";

  return null;
};

const getDocumentCategory = (doc: DocumentItem): DataRoomCategory => {
  const category = normaliseCategoryName(doc.category);
  if (category && category !== "FAQ") return category;

  return normaliseCategoryName(doc.filename) || "Market";
};

const endpointSets = {
  requestLogin: [
    "/api/data-room/auth/request-login",
    "/api/data-room/request-login",
    "/api/auth/request-login",
  ],
  verifyLogin: [
    "/api/data-room/auth/verify-login",
    "/api/data-room/verify-login",
    "/api/auth/verify-login",
  ],
  session: [
    "/api/data-room/session",
    "/api/session",
    "/api/data-room/auth/session",
  ],
  ndaStatus: ["/api/data-room/nda/status", "/api/nda/status"],
  ndaContent: ["/api/data-room/nda/current", "/api/nda/current"],
  acceptNda: ["/api/data-room/nda/accept", "/api/nda/accept"],
  documents: ["/api/data-room/documents", "/api/documents"],
  documentAccess: (id: string) => [`/api/data-room/documents/${id}/url`],
  logs: ["/api/data-room/admin/access-logs", "/api/admin/access-logs"],
  authorise: [
    "/api/data-room/admin/users/authorise",
    "/api/admin/users/authorise",
  ],
  logout: [
    "/api/data-room/auth/logout",
    "/api/data-room/logout",
    "/api/auth/logout",
  ],
};

function getSessionToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

function setSessionToken(token?: string) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

function clearPrototypeAccess() {
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  Object.keys(localStorage)
    .filter((key) => key.startsWith("klps.dataRoom.ndaAccepted."))
    .forEach((key) => localStorage.removeItem(key));
}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

const isRetryableLoginError = (error: unknown) =>
  error instanceof ApiRequestError
    ? typeof error.status === "number" && error.status >= 500
    : error instanceof TypeError;

async function apiRequest<T>(
  paths: string[],
  options: RequestInit = {},
): Promise<T> {
  let lastError = "";

  for (const path of paths) {
    const token = getSessionToken();
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 404) {
      lastError = `Endpoint not found: ${path}`;
      continue;
    }

    const text = await response.text();
    const data: unknown = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const payload = isRecord(data) ? data : {};
      throw new ApiRequestError(
        stringValue(payload.message) ||
          stringValue(payload.error) ||
          `Request failed with ${response.status}`,
        response.status,
      );
    }

    return data as T;
  }

  throw new ApiRequestError(
    lastError || "Backend endpoint is unavailable.",
    404,
  );
}

const isAdminUser = (user: DataRoomUser) =>
  user.isAdmin ||
  user.isFounder ||
  user.role === "founder" ||
  user.role === "admin";

const normaliseUser = (payload: unknown): DataRoomUser | null => {
  const root = isRecord(payload) ? payload : {};
  const user = isRecord(root.user) ? root.user : root;
  const email = stringValue(user.email);
  if (!email) return null;

  const role = stringValue(user.role) as DataRoomUser["role"];
  return {
    id: stringValue(user.id),
    email,
    role,
    isAdmin: Boolean(booleanValue(user.isAdmin) || booleanValue(user.is_admin)),
    isFounder: Boolean(
      booleanValue(user.isFounder) ||
      booleanValue(user.is_founder) ||
      role === "founder",
    ),
    ndaAccepted: Boolean(
      booleanValue(user.ndaAccepted) ||
      booleanValue(user.nda_accepted) ||
      booleanValue(root.ndaAccepted) ||
      booleanValue(root.nda_accepted),
    ),
  };
};

const normaliseSession = (payload: unknown): SessionState => {
  const root = isRecord(payload) ? payload : {};
  const authenticated = Boolean(root.authenticated);
  const user = normaliseUser(root.user ? payload : root);

  return {
    authenticated: authenticated && Boolean(user),
    user,
  };
};

const getSession = async (): Promise<SessionState> => {
  try {
    const payload = await apiRequest<unknown>(endpointSets.session);
    return normaliseSession(payload);
  } catch {
    return { authenticated: false, user: null };
  }
};

const normaliseDocuments = (payload: unknown): DocumentItem[] => {
  const root = isRecord(payload) ? payload : {};
  const source = Array.isArray(root.documents)
    ? root.documents
    : Array.isArray(root.data)
      ? root.data
      : Array.isArray(payload)
        ? payload
        : [];

  return source.filter(isRecord).map((doc) => ({
    id: stringValue(doc.id) || stringValue(doc.filename) || crypto.randomUUID(),
    filename:
      stringValue(doc.filename) ||
      stringValue(doc.name) ||
      "Protected document",
    category: stringValue(doc.category),
    fileSize: stringValue(doc.fileSize),
    file_size: stringValue(doc.file_size),
    version: stringValue(doc.version),
    updatedAt: stringValue(doc.updatedAt),
    updated_at: stringValue(doc.updated_at),
  }));
};

const normaliseLogs = (payload: unknown): AccessLog[] => {
  const root = isRecord(payload) ? payload : {};
  const source = Array.isArray(root.logs)
    ? root.logs
    : Array.isArray(root.events)
      ? root.events
      : Array.isArray(root.data)
        ? root.data
        : [];

  return source.filter(isRecord).map((log) => ({
    id: stringValue(log.id),
    email: stringValue(log.email) || "unknown",
    event_type: stringValue(log.event_type),
    eventType: stringValue(log.eventType),
    detail: stringValue(log.detail),
    document_id: stringValue(log.document_id),
    documentId: stringValue(log.documentId),
    timestamp: stringValue(log.timestamp),
    at: stringValue(log.at),
  }));
};

const normaliseNda = (payload: unknown): NdaContent => {
  const root = isRecord(payload) ? payload : {};
  const nda = isRecord(root.nda) ? root.nda : {};
  const sections = Array.isArray(root.sections)
    ? root.sections
    : Array.isArray(nda.sections)
      ? nda.sections
      : fallbackNda.sections;

  return {
    version:
      stringValue(root.version) ||
      stringValue(nda.version) ||
      fallbackNda.version,
    title:
      stringValue(root.title) || stringValue(nda.title) || fallbackNda.title,
    watermark:
      stringValue(root.watermark) ||
      stringValue(root.watermarkText) ||
      stringValue(nda.watermark) ||
      stringValue(nda.watermark_text) ||
      fallbackNda.watermark,
    sections: sections.filter(isRecord).map((section) => ({
      title: stringValue(section.title) || "NDA section",
      body: stringValue(section.body) || "",
    })),
  };
};

function LoginGate({
  onVerified,
}: {
  onVerified: (user: DataRoomUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [retryingLogin, setRetryingLogin] = useState(false);
  const submittingRef = useRef(false);

  const requestLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (submittingRef.current) return;

    setError("");
    setStatus("");
    setRetryingLogin(false);

    const normalized = normalizeAccessEmail(email);
    if (!normalized.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify({ email: normalized }),
      };

      try {
        await apiRequest(endpointSets.requestLogin, requestOptions);
      } catch (firstError) {
        if (!isRetryableLoginError(firstError)) {
          throw firstError;
        }

        setRetryingLogin(true);
        setStatus(
          "Connecting to secure server... this may take a few seconds.",
        );
        await wait(5000);
        await apiRequest(endpointSets.requestLogin, requestOptions);
      }

      setEmail(normalized);
      setStep("code");
      setStatus(
        "A secure login code has been sent if this email is authorised.",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not request a login code.",
      );
    } finally {
      setRetryingLogin(false);
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const verifyLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (submittingRef.current) return;

    setError("");
    submittingRef.current = true;
    setSubmitting(true);

    try {
      const payload = await apiRequest<unknown>(endpointSets.verifyLogin, {
        method: "POST",
        body: JSON.stringify({ email, code: code.trim() }),
      });
      const root = isRecord(payload) ? payload : {};
      setSessionToken(
        stringValue(root.token) ||
          stringValue(root.accessToken) ||
          stringValue(root.access_token),
      );
      const session = await getSession();
      if (!session.authenticated || !session.user) {
        throw new Error(
          "The backend did not confirm an authenticated session.",
        );
      }
      onVerified(session.user);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not verify the login code.",
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <main className="data-room-theme min-h-screen bg-obsidian px-6 py-24 text-foreground">
      <div className="mx-auto max-w-2xl">
        <form
          onSubmit={step === "email" ? requestLogin : verifyLogin}
          className="glass rounded-lg p-8 md:p-10"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Verified Access
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground">
            Founder & Investor Data Room Login
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            You will receive a one-time login code if your email is authorised.
          </p>

          <label className="mt-8 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Email address
          </label>
          <input
            type="email"
            value={email}
            disabled={step === "code"}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent disabled:opacity-60"
            placeholder="authorised@email.com"
          />

          {step === "code" && (
            <>
              <label className="mt-5 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Secure code
              </label>
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                placeholder="Enter the code from your email"
              />
            </>
          )}

          {status && <p className="mt-4 text-sm text-accent">{status}</p>}
          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

          <button
            disabled={submitting}
            className="mt-8 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? retryingLogin
                ? "Connecting..."
                : "Checking..."
              : step === "email"
                ? "Send secure code"
                : "Verify and continue"}
          </button>

          {step === "code" && (
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setStatus("");
              }}
              className="mt-3 w-full rounded-full border border-border px-6 py-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Use a different email
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

function NdaGate({
  nda,
  onAccepted,
}: {
  nda: NdaContent;
  onAccepted: () => void;
}) {
  const [readToEnd, setReadToEnd] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const accept = async () => {
    setSubmitting(true);
    setError("");
    try {
      await apiRequest(endpointSets.acceptNda, {
        method: "POST",
        body: JSON.stringify({
          nda_version: nda.version,
          scroll_completed: readToEnd,
          acceptance_method: "clickwrap",
          accepted_button_label: "I agree",
        }),
      });
      onAccepted();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not record NDA acceptance.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="data-room-theme min-h-screen bg-obsidian px-6 py-12 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="glass overflow-hidden rounded-lg">
          <div className="border-b border-border px-6 py-5 md:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {nda.version}
            </div>
            <h1 className="mt-3 text-3xl font-light tracking-tight">
              {nda.title}
            </h1>
          </div>

          <div
            onScroll={(event) => {
              const target = event.currentTarget;
              if (
                target.scrollTop + target.clientHeight >=
                target.scrollHeight - 12
              ) {
                setReadToEnd(true);
              }
            }}
            className="relative max-h-[62vh] overflow-y-auto px-6 py-6 md:px-8"
          >
            <div className="pointer-events-none sticky top-1/3 z-0 text-center text-4xl font-semibold uppercase tracking-[0.3em] text-white/[0.035] md:text-6xl">
              {nda.watermark}
            </div>
            <div className="relative z-10 -mt-20 space-y-5 text-sm leading-7 text-muted-foreground">
              {nda.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-base font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <p className="mt-2">{section.body}</p>
                </section>
              ))}
              <div className="rounded-md border border-border bg-white/[0.03] p-4 text-xs leading-6">
                Footer watermark for exported PDFs: "{nda.watermark}". Version
                reference: {nda.version}.
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-obsidian/80 px-6 py-5 md:px-8">
            <p className="text-xs leading-6 text-muted-foreground">
              Scroll to the bottom of the agreement to enable acceptance. The
              backend stores this acknowledgement once for this NDA version with
              audit metadata.
            </p>
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <button
              onClick={accept}
              disabled={!readToEnd || submitting}
              className="mt-4 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Recording..." : "I agree"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const DataRoom = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<DataRoomUser | null>(null);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [nda, setNda] = useState<NdaContent>(fallbackNda);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [metrics, setMetrics] = useState<ResearchMetrics | null>(null);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<DataRoomCategory>("All Documents");

  const isAdmin = useMemo(() => (user ? isAdminUser(user) : false), [user]);
  const categoryCounts = useMemo(
    () =>
      categories.reduce<Record<DataRoomCategory, number>>(
        (counts, category) => {
          counts[category] =
            category === "All Documents"
              ? documents.length
              : category === "FAQ"
                ? faqItems.length
                : documents.filter(
                    (doc) => getDocumentCategory(doc) === category,
                  ).length;
          return counts;
        },
        {} as Record<DataRoomCategory, number>,
      ),
    [documents],
  );
  const visibleDocuments = useMemo(
    () =>
      activeCategory === "All Documents"
        ? documents
        : activeCategory === "FAQ"
          ? []
          : documents.filter(
              (doc) => getDocumentCategory(doc) === activeCategory,
            ),
    [activeCategory, documents],
  );
  const showingFaq = activeCategory === "FAQ";

  const loadSecureData = async (nextUser: DataRoomUser) => {
    setError("");
    setUser(nextUser);
    setDocuments([]);
    setLogs([]);

    const [ndaStatus, ndaContent] = await Promise.all([
      apiRequest<unknown>(endpointSets.ndaStatus).catch(() => ({
        accepted: nextUser.ndaAccepted,
      })),
      apiRequest<unknown>(endpointSets.ndaContent).catch(() => fallbackNda),
    ]);

    setNda(normaliseNda(ndaContent));
    const ndaStatusRecord = isRecord(ndaStatus) ? ndaStatus : {};
    const accepted = Boolean(
      booleanValue(ndaStatusRecord.accepted) ||
      booleanValue(ndaStatusRecord.ndaAccepted) ||
      nextUser.ndaAccepted,
    );
    setNdaAccepted(accepted);

    if (accepted) {
      const docsPayload = await apiRequest<unknown>(endpointSets.documents);
      setDocuments(normaliseDocuments(docsPayload));
    }

    try {
      const metricsResponse = await fetch(`${API_BASE}/api/research/metrics`);

      const metricsData = await metricsResponse.json();

      setMetrics(metricsData);
    } catch (error) {
      console.error(error);
    }

    if (isAdminUser(nextUser)) {
      const logPayload = await apiRequest<unknown>(endpointSets.logs).catch(
        () => ({ logs: [] }),
      );
      setLogs(normaliseLogs(logPayload));
    }
  };

  useEffect(() => {
    clearPrototypeAccess();

    getSession()
      .then((session) => {
        if (!session.authenticated || !session.user) {
          setUser(null);
          return;
        }
        return loadSecureData(session.user);
      })
      .catch(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const acceptNda = async () => {
    setNdaAccepted(true);
    const docsPayload = await apiRequest<unknown>(endpointSets.documents);
    setDocuments(normaliseDocuments(docsPayload));
  };

  const authorizeUser = async (event: FormEvent) => {
    event.preventDefault();
    setAdminMessage("");
    setError("");

    const normalized = normalizeAccessEmail(newUserEmail);
    if (!normalized.includes("@")) return;

    try {
      await apiRequest(endpointSets.authorise, {
        method: "POST",
        body: JSON.stringify({ email: normalized }),
      });
      setAdminMessage(`${normalized} has been authorised.`);
      setNewUserEmail("");
      const logPayload = await apiRequest<unknown>(endpointSets.logs).catch(
        () => ({ logs: [] }),
      );
      setLogs(normaliseLogs(logPayload));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not authorise this user.",
      );
    }
  };

  const viewDocument = async (doc: DocumentItem) => {
    setError("");
    try {
      const payload = await apiRequest<unknown>(
        endpointSets.documentAccess(doc.id),
        {
          method: "POST",
          body: JSON.stringify({ action: "view" }),
        },
      );
      const root = isRecord(payload) ? payload : {};
      const url =
        stringValue(root.url) ||
        stringValue(root.signedUrl) ||
        stringValue(root.signed_url);
      if (!url)
        throw new Error("The backend did not return a signed document URL.");
      window.open(url, "_blank", "noopener,noreferrer");

      if (isAdmin) {
        const logPayload = await apiRequest<unknown>(endpointSets.logs).catch(
          () => ({ logs: [] }),
        );
        setLogs(normaliseLogs(logPayload));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not open this protected document.",
      );
    }
  };

  const PRICE_LABELS: Record<string, string> = {
    under_20: "Under £20",
    "20_50": "£20 to £50",
    "50_100": "£50 to £100",
    "100_200": "£100 to £200",
    "200_plus": "£200+",
  };

  const topPriceLabel =
    PRICE_LABELS[metrics?.topPricePoint] ?? metrics?.topPricePoint;

  const logout = async () => {
    await apiRequest(endpointSets.logout, { method: "POST" }).catch(
      () => undefined,
    );
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setNdaAccepted(false);
    setDocuments([]);
    setLogs([]);
    setActiveCategory("All Documents");
  };

  const handleVerifiedUser = async (verifiedUser: DataRoomUser) => {
    setLoading(true);
    try {
      await loadSecureData(verifiedUser);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load the secure data room.",
      );
      setUser(null);
      sessionStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="data-room-theme flex min-h-screen items-center justify-center bg-obsidian px-6 text-foreground">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Checking secure session...
        </div>
      </main>
    );
  }

  if (!user) {
    return <LoginGate onVerified={handleVerifiedUser} />;
  }

  if (!ndaAccepted) {
    return <NdaGate nda={nda} onAccepted={acceptNda} />;
  }

  return (
    <main className="data-room-theme min-h-screen bg-obsidian text-foreground">
      <PageHeader
        eyebrow={`NDA Active · ${nda.version}`}
        title="Investor Data Room."
        description="Versioned, permissioned documents covering KPLS fundraising, financials, IP and strategy."
      >
        <Link
          to="/innovation-lab"
          className="inline-flex rounded-full border border-border bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08]"
        >
          Return to Innovation Lab
        </Link>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="glass rounded-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Secure Session
              </div>
              <div className="mt-3 break-all text-sm text-foreground">
                {user.email}
              </div>
              <div className="mt-2 text-xs capitalize text-muted-foreground">
                {user.role || (isAdmin ? "admin" : "authorised_user")}
              </div>
              <button
                onClick={logout}
                className="mt-5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </div>

            {isAdmin && (
              <form onSubmit={authorizeUser} className="glass rounded-lg p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Founder Authorisation
                </div>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Authorised users are created server-side. Email alone cannot
                  bypass this gate.
                </p>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(event) => setNewUserEmail(event.target.value)}
                  className="mt-4 w-full rounded-md border border-border bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="new.user@example.com"
                />
                <button className="mt-3 w-full rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
                  Authorise user
                </button>
                {adminMessage && (
                  <p className="mt-3 text-xs text-accent">{adminMessage}</p>
                )}
              </form>
            )}

            {isAdmin && (
              <div className="glass rounded-lg p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Server Access Log
                </div>
                <ul className="mt-4 space-y-3 text-xs">
                  {logs.slice(0, 8).map((log, index) => (
                    <li
                      key={log.id || `${log.timestamp || log.at}-${index}`}
                      className="border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="text-foreground">
                        {log.detail || log.event_type || log.eventType}
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {log.email} ·{" "}
                        {new Date(
                          log.timestamp || log.at || Date.now(),
                        ).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="glass rounded-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Categories
              </div>
              <ul className="mt-4 space-y-1 text-sm">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
                        activeCategory === category
                          ? "bg-white/5 text-foreground"
                          : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="font-mono text-[10px]">
                        {categoryCounts[category]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="glass rounded-lg p-6 mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Research Intelligence
              </div>

              <h3 className="mt-3 text-2xl font-light tracking-tight text-foreground">
                Live Customer Discovery - Shaping Product Strategy.
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                Early customer discovery indicates a strong demand for non-invaive
                personalised body intelligence.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Survey Participants
                  </div>
                  <div className="mt-2 text-3xl font-light">
                    {metrics?.participants ?? 0}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Customer Interviews
                  </div>
                  <div className="mt-2 text-3xl font-light">
                    {metrics?.voiceRecordings ?? 0}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    WOULD PAY '{topPriceLabel || "NO DATA"}'
                  </div>
                  <div className="mt-2 text-3xl font-light">
                    {metrics?.topPricePointCount ?? 0}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  CUSTOMER VALIDATION
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Problem Validation
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {Math.round(Number(metrics?.topConcernPercent ?? 0))}%{" "}
                        <br />
                      </span>{" "}
                      Report {metrics?.topConcern?.toLowerCase()} as a recurring
                      concern.{" "}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Market Demand
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {Math.round(Number(metrics?.spentMoneyPercent ?? 0))}%{" "}
                        <br />
                      </span>{" "}
                      Have already spent money trying to solve the problem.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Product Opportunity
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Top Insight Requested
                        <br /> '
                        {metrics?.topDesiredInsights?.[0]?.value ?? "No data"}'
                      </span>{" "}
                      is the most requested insight by participants.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Commercial Signal
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {Math.round(Number(metrics?.wouldPayPercent ?? 0))}%{" "}
                        <br />
                      </span>{" "}
                      Would pay for a personalised solution.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  Top Insights Requested :{" "}
                  {metrics?.topDesiredInsights
                    ?.slice(0, 4)
                    ?.map((insight: InsightMetric) => (
                      <span
                        key={insight.value}
                        className="rounded-full border border-border px-3 py-1 text-xs"
                      >
                        {insight.value}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {error && (
              <div className="mb-4 rounded-md border border-red-300/30 bg-red-950/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            {showingFaq ? (
              <div className="glass overflow-hidden rounded-lg">
                <div className="border-b border-border px-6 py-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Investor FAQ
                  </div>
                  <h3 className="mt-3 text-2xl font-light tracking-tight text-foreground">
                    Product, data and market context.
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Answers for authorised readers evaluating the KPLS platform,
                    longitudinal dataset and product direction.
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {faqItems.map((item) => (
                    <section key={item.question} className="px-6 py-6">
                      <h4 className="text-base font-medium text-foreground">
                        {item.question}
                      </h4>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                        {item.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {nda.watermark}
                </div>
              </div>
            ) : (
              <div className="glass overflow-hidden rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
                  <h3 className="text-sm font-medium">
                    {activeCategory === "All Documents"
                      ? "Documents"
                      : activeCategory}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {nda.watermark}
                  </span>
                </div>
                {visibleDocuments.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {visibleDocuments.map((doc) => (
                      <li
                        key={doc.id}
                        onClick={() => viewDocument(doc)}
                        className="group flex cursor-pointer items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-onyx">
                            <div className="size-1.5 rounded-full bg-accent" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-foreground">
                              {doc.filename}
                            </div>
                            <div className="font-mono text-[10px] text-muted-foreground">
                              Updated{" "}
                              {doc.updatedAt || doc.updated_at || "secure"} ·{" "}
                              {doc.fileSize || doc.file_size || "protected"} ·{" "}
                              {doc.version || "v1.0"} ·{" "}
                              {getDocumentCategory(doc)}
                            </div>
                          </div>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                          View
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-12 text-sm text-muted-foreground">
                    No protected documents are currently available in this
                    category.
                  </div>
                )}
                <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {nda.watermark}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default DataRoom;
