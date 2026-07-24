import { PageHeader, Section } from "@/components/Section";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { API_BASE } from "@/config/api";
import { normalizeAccessEmail } from "@/config/dataRoomAccess";
import { X } from "lucide-react";
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

  yesCount: number;
  maybeCount: number;
  noCount: number;

  commercialInterestCount: number;
  commercialInterestPercent: number;

  topPricePoint?: string;
  topPricePointCount?: number;

  topConcerns?: {
    value: string;
    count: number;
  }[];

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

const DATA_ROOM_WATERMARK = "KPLS Investor Data Room";

const categories = [
  "All Documents",
  "Pitch Deck",
  "Financials",
  "Finance OS",
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
  if (normalized.includes("legal")) return "Legal";
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
  documents: ["/api/data-room/documents", "/api/documents"],
  documentAccess: (id: string) => [`/api/data-room/documents/${id}/url`],
  metrics: ["/api/research/metrics"],
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
}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

const METRICS_RETRY_DELAYS_MS = [1000, 2000, 4000, 8000];

const isRetryableLoginError = (error: unknown) =>
  error instanceof ApiRequestError
    ? typeof error.status === "number" && error.status >= 500
    : error instanceof TypeError;

async function fetchSecureResearchMetrics(): Promise<ResearchMetrics> {
  let lastError: unknown;

  for (let attempt = 0; attempt < METRICS_RETRY_DELAYS_MS.length + 1; attempt++) {
    try {
      return await apiRequest<ResearchMetrics>(endpointSets.metrics);
    } catch (error) {
      lastError = error;

      const isFinalAttempt = attempt === METRICS_RETRY_DELAYS_MS.length;
      if (isFinalAttempt) break;

      await wait(METRICS_RETRY_DELAYS_MS[attempt]);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Live research metrics unavailable.");
}

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

const DataRoom = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<DataRoomUser | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [metrics, setMetrics] = useState<ResearchMetrics | null>(null);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [error, setError] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const guideCloseTimer = useRef<number | null>(null);
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
              : category === "Finance OS"
                ? 1
              : category === "FAQ"
                ? faqItems.length
                : category === "Financials"
                  ? Math.max(
                      1,
                      documents.filter(
                        (doc) => getDocumentCategory(doc) === category,
                      ).length,
                    )
                : documents.filter(
                    (doc) => getDocumentCategory(doc) === category,
                  ).length;
          return counts;
        },
        {} as Record<DataRoomCategory, number>,
      ),
    [documents],
  );
  const hasFinanceWorkspace = activeCategory === "Financials";
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
  const keepGuideOpen = () => {
    if (guideCloseTimer.current !== null) window.clearTimeout(guideCloseTimer.current);
    guideCloseTimer.current = null;
    setGuideOpen(true);
  };
  const scheduleGuideClose = () => {
    if (guideCloseTimer.current !== null) window.clearTimeout(guideCloseTimer.current);
    guideCloseTimer.current = window.setTimeout(() => setGuideOpen(false), 180);
  };

  useEffect(() => () => {
    if (guideCloseTimer.current !== null) window.clearTimeout(guideCloseTimer.current);
  }, []);

  const loadSecureData = async (nextUser: DataRoomUser) => {
    setError("");
    setUser(nextUser);
    setDocuments([]);
    setLogs([]);

    const docsPayload = await apiRequest<unknown>(endpointSets.documents);
    setDocuments(normaliseDocuments(docsPayload));

    try {
      setMetrics(await fetchSecureResearchMetrics());
    } catch (error) {
      console.error("Data room research metrics unavailable", error);
      setMetrics(null);
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
  const metricsUnavailableLabel = "Live research data temporarily unavailable";
  const compactMetricsUnavailableLabel = "Unavailable";
  const metricNumber = (value: number | undefined) =>
    typeof value === "number" && Number.isFinite(value)
      ? String(Math.round(value))
      : compactMetricsUnavailableLabel;
  const metricPercent = (value: number | undefined) =>
    typeof value === "number" && Number.isFinite(value)
      ? `${Math.round(value)}%`
      : compactMetricsUnavailableLabel;

  const logout = async () => {
    await apiRequest(endpointSets.logout, { method: "POST" }).catch(
      () => undefined,
    );
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
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

  return (
    <main className="data-room-theme min-h-screen bg-obsidian text-foreground">
      <PageHeader
        eyebrow="Authorised Investor Access"
        title="Investor Data Room."
        description="Versioned, permissioned documents covering KLPS fundraising, financials, IP and strategy."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/innovation-lab"
            className="inline-flex rounded-full border border-border bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Return to Innovation Lab
          </Link>
          <Link
            to="/pitch-deck"
            className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Pitch Deck
          </Link>
          <Popover open={guideOpen} onOpenChange={setGuideOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onMouseEnter={keepGuideOpen}
                onMouseLeave={scheduleGuideClose}
                className="inline-flex rounded-full border border-border bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="How to Use This Data Room"
              >
                How to Use This Data Room
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="bottom"
              sideOffset={10}
              onMouseEnter={keepGuideOpen}
              onMouseLeave={scheduleGuideClose}
              className="data-room-theme w-[min(24rem,calc(100vw-2rem))] rounded-2xl border-white/10 bg-obsidian p-0 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="relative border-b border-white/10 px-5 py-4 pr-12">
                <div className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Investor orientation</div>
                <h2 className="text-base font-semibold text-foreground">How to Use This Data Room</h2>
                <button
                  type="button"
                  onClick={() => setGuideOpen(false)}
                  className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close data room guidance"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 px-5 py-4 text-xs leading-5 text-muted-foreground">
                <p className="font-medium text-foreground">Everything you need to learn about KLPS is in one secure place.</p>
                <p>At the top of the page, you’ll see live customer research showing the latest validation and market insights. These numbers update as new research is completed.</p>
                <p>Use the Pitch Deck button to view our latest investor presentation at any time.</p>
                <p>Browse the Categories to explore key documents including our market research, financials, IP, legal information and FAQs.</p>
                <p>For a deeper look at the business, open Finance OS. It contains our live financial model, assumptions, forecasts and the key metrics behind our growth strategy.</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
                    {category === "Finance OS" ? (
                      <Link
                        to="/data-room/finance/dashboard"
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-muted-foreground transition-colors hover:bg-white/[0.03] hover:text-foreground"
                      >
                        <span>{category}</span>
                        <span className="font-mono text-[10px]">
                          {categoryCounts[category]}
                        </span>
                      </Link>
                    ) : (
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
                    )}
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
                Early customer discovery indicates a strong demand for
                non-invasive personalised body intelligence.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Survey Participants
                  </div>
                  <div className="mt-2 text-3xl font-light">
                    {metricNumber(metrics?.participants)}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Customer Interviews
                  </div>
                  <div className="mt-2 text-3xl font-light">
                    {metricNumber(metrics?.voiceRecordings)}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Most Popular Price Point
                  </div>

                  <div className="mt-2 text-3xl font-light">
                    {topPriceLabel || compactMetricsUnavailableLabel}
                  </div>

                  {metrics && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {metricNumber(metrics.topPricePointCount)} of{" "}
                      {metricNumber(metrics.participants)} responses
                    </div>
                  )}
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

                    <div className="mt-3">
                      <p className="text-sm leading-7 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {metricPercent(metrics?.topConcernPercent)}
                          <br />
                        </span>
                        Of participants report {""}
                        <span className="font-medium text-foreground">
                          '{metrics?.topConcern ?? metricsUnavailableLabel}'
                        </span>{" "}
                        as a recurring concern.{" "}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Market Demand
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {metricPercent(metrics?.spentMoneyPercent)}{" "}
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
                        {metrics?.topDesiredInsights?.[0]?.value ??
                          metricsUnavailableLabel}
                        '
                      </span>{" "}
                      is the most requested insight by participants.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Commercial Interest
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {metricPercent(metrics?.commercialInterestPercent)}{" "}
                        <br />
                      </span>
                      Respondents answered 'Yes' or 'Maybe' when asked{" "}
                      <span className="font-bold italic text-foreground">
                        'If a solution gave you insights into your body, would
                        you consider paying for it?'
                      </span>
                      <br />
                      <span className="italic">
                        i.e. a subscription for an app or wearable device
                      </span>
                      .
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">
                      Top Concerns Reported :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {metrics?.topConcerns?.slice(0, 5).map((concern) => (
                        <span
                          key={concern.value}
                          className="rounded-full border border-border px-3 py-1 text-xs"
                        >
                          {concern.value} · {concern.count}
                        </span>
                      ))}
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
                  {DATA_ROOM_WATERMARK}
                </div>
              </div>
            ) : hasFinanceWorkspace ? (
              <div className="glass overflow-hidden rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
                  <h3 className="text-sm font-medium">Financials</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {DATA_ROOM_WATERMARK}
                  </span>
                </div>
                <div className="px-6 py-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Finance OS
                  </div>
                  <h3 className="mt-3 text-2xl font-light tracking-tight text-foreground">
                    Financial Operating System
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Live assumptions, evidence, cash flow, funding scenarios,
                    reports, risks and AI-ready structured finance data for
                    KLPS. This workspace is available to authorised founders and
                    invited data room guests.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Assumptions", "Traceable, versioned model inputs"],
                      ["Evidence", "Quotes, research, contracts and invoices"],
                      ["Reports", "Engine-generated investor outputs"],
                    ].map(([title, body]) => (
                      <div
                        key={title}
                        className="rounded-lg border border-border bg-white/[0.02] p-4"
                      >
                        <div className="text-sm font-medium text-foreground">
                          {title}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-muted-foreground">
                          {body}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/data-room/finance/dashboard"
                    className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
                  >
                    Open Finance OS
                  </Link>
                </div>
                <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {DATA_ROOM_WATERMARK}
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
                    {DATA_ROOM_WATERMARK}
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
                  {DATA_ROOM_WATERMARK}
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
