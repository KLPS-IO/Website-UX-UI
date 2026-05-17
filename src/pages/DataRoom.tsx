import { PageHeader, Section } from "@/components/Section";
import {
  DATA_ROOM_AUTHORIZED_EMAILS,
  DATA_ROOM_FOUNDER_EMAIL,
  DATA_ROOM_INVITE_CODE,
  DATA_ROOM_NDA_VERSION,
  isFounderEmail,
  normalizeAccessEmail,
} from "@/config/dataRoomAccess";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SESSION_KEY = "klps.dataRoom.session";
const AUTHORIZED_KEY = "klps.dataRoom.authorizedEmails";
const ACCESS_LOG_KEY = "klps.dataRoom.accessLog";

const DOCS = [
  { name: "KPLS_Series_A_Deck.pdf", size: "14.2 MB", updated: "2h ago", v: "v4.1" },
  { name: "Financial_Projections.xlsx", size: "1.8 MB", updated: "1d ago", v: "v3.0" },
  { name: "Cap_Table_Current.xlsx", size: "212 KB", updated: "3d ago", v: "v2.4" },
  { name: "Market_Research_FemTech.pdf", size: "8.6 MB", updated: "1w ago", v: "v1.2" },
  { name: "Go_To_Market_Strategy.pdf", size: "3.4 MB", updated: "1w ago", v: "v2.0" },
  { name: "Competitor_Analysis.pdf", size: "2.1 MB", updated: "2w ago", v: "v1.5" },
  { name: "Business_Model_Canvas.pdf", size: "640 KB", updated: "2w ago", v: "v1.1" },
  { name: "IP_Portfolio_Audit_2026.pdf", size: "11.2 MB", updated: "1mo ago", v: "v1.0" },
];

const categories = ["All Documents", "Pitch & Deck", "Financials", "IP Portfolio", "Market", "Legal"];

type AccessLog = {
  email: string;
  action: "login" | "nda_acceptance" | "document_view" | "user_authorised";
  detail: string;
  at: string;
};

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const ndaKey = (email: string) =>
  `klps.dataRoom.ndaAccepted.${DATA_ROOM_NDA_VERSION}.${normalizeAccessEmail(email)}`;

const logAccess = (email: string, action: AccessLog["action"], detail: string) => {
  const current = readJson<AccessLog[]>(ACCESS_LOG_KEY, []);
  const next = [{ email, action, detail, at: new Date().toISOString() }, ...current].slice(0, 80);
  localStorage.setItem(ACCESS_LOG_KEY, JSON.stringify(next));
};

const getAuthorizedEmails = () => {
  const manual = readJson<string[]>(AUTHORIZED_KEY, []);
  return Array.from(
    new Set([...DATA_ROOM_AUTHORIZED_EMAILS, ...manual].map(normalizeAccessEmail).filter(Boolean)),
  );
};

const ndaSections = [
  {
    title: "1. Parties and Purpose",
    body:
      "This One-Way Confidentiality and Non-Disclosure Agreement applies between KLPS Ltd, company number to be added once registered details are finalised, with registered office address to be added once finalised, and the authorised recipient accessing the KLPS investor data room, R&D lab materials, documents, prototypes, commercial information, and related discussions.",
  },
  {
    title: "2. Confidential Information",
    body:
      "Confidential Information includes all non-public information disclosed by KLPS Ltd in any form, including business plans, financials, cap table information, designs, software, algorithms, textile systems, sensor concepts, prototypes, research, manufacturing processes, commercial strategy, investor materials, university or agency materials, and all derivative notes, analyses, summaries, extracts, compilations, copies, or materials created from or based on that information.",
  },
  {
    title: "3. Use and Non-Disclosure",
    body:
      "The recipient may use Confidential Information only to evaluate, advise on, invest in, manufacture for, partner with, or otherwise support KLPS Ltd in the specific authorised purpose. The recipient must keep the information confidential, protect it with at least reasonable care, and must not disclose it to any person except approved representatives who have a genuine need to know and are bound by equivalent confidentiality obligations.",
  },
  {
    title: "4. No Implied Licence",
    body:
      "No licence, assignment, ownership right, or other intellectual property right is granted or implied by disclosure. KLPS Ltd retains all rights, title, and interest in its Confidential Information, intellectual property, know-how, data, inventions, designs, prototypes, documentation, and related materials.",
  },
  {
    title: "5. Reverse Engineering and AI Restrictions",
    body:
      "The recipient must not reverse engineer, decompile, disassemble, reproduce, train artificial intelligence systems on, scrape, mine, upload into public or third-party AI tools, or attempt to derive the composition, structure, source, algorithms, designs, formulae, or underlying methods of any KLPS material, product, prototype, dataset, software, textile, sensor system, or technical disclosure.",
  },
  {
    title: "6. Residual Knowledge",
    body:
      "Nothing in this agreement restricts the recipient from using general knowledge, skills, and experience retained unaided in memory, provided that such use does not disclose or rely on KLPS Confidential Information, trade secrets, technical specifics, business plans, or protected intellectual property.",
  },
  {
    title: "7. Non-Circumvention",
    body:
      "The recipient must not use Confidential Information to bypass, compete unfairly with, solicit away from, or directly approach KLPS Ltd's investors, partners, manufacturers, suppliers, employees, contractors, universities, agencies, customers, or commercial opportunities for any purpose that harms or circumvents KLPS Ltd.",
  },
  {
    title: "8. Data Room Protections",
    body:
      "Access to the data room is personal, permissioned, and logged. The recipient must not share login details, copy files outside authorised channels, remove watermarks, alter metadata, or redistribute materials. Exported PDFs and shared files should include the footer watermark: Confidential Property of KLPS Ltd.",
  },
  {
    title: "9. Assignment, Warranty, and Return",
    body:
      "The recipient may not assign this agreement or transfer access without KLPS Ltd's written consent. Confidential Information is provided without warranty as to accuracy, completeness, fitness for purpose, or commercial outcome. On request, the recipient must return or destroy Confidential Information and confirm deletion of copies, subject only to legally required archival retention.",
  },
  {
    title: "10. Duration and Remedies",
    body:
      "Confidentiality obligations continue for five years from disclosure, and trade secret obligations continue for as long as the information remains a trade secret. The recipient acknowledges that unauthorised disclosure may cause irreparable harm and that KLPS Ltd may seek injunctive relief and other remedies available by law.",
  },
];

function LoginGate({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = normalizeAccessEmail(email);
    const isAuthorized = getAuthorizedEmails().includes(normalized);
    const hasInvite = inviteCode.trim() === DATA_ROOM_INVITE_CODE;

    if (!normalized.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (!isAuthorized && !hasInvite) {
      setError("This email is not authorised for the KLPS data room.");
      return;
    }

    if (hasInvite && !isAuthorized) {
      const next = Array.from(new Set([...readJson<string[]>(AUTHORIZED_KEY, []), normalized]));
      localStorage.setItem(AUTHORIZED_KEY, JSON.stringify(next));
    }

    localStorage.setItem(SESSION_KEY, normalized);
    logAccess(normalized, "login", "Data room login");
    onLogin(normalized);
  };

  return (
    <main className="data-room-theme min-h-screen bg-obsidian px-6 py-24 text-foreground">
      <div className="mx-auto max-w-2xl">
        <form onSubmit={submit} className="glass rounded-lg p-8 md:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Restricted Access
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground">
            Investor Data Room Login
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Click-through notice: by logging in you agree to keep all KLPS materials
            confidential, use them only for authorised review, and complete the NDA before
            viewing documents. Access and document activity are logged.
          </p>

          <label className="mt-8 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            placeholder={DATA_ROOM_FOUNDER_EMAIL}
          />

          <label className="mt-5 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Invite code
          </label>
          <input
            type="password"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            placeholder="Required for new authorised users"
          />

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

          <button className="mt-8 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]">
            Continue securely
          </button>
        </form>
      </div>
    </main>
  );
}

function NdaGate({ email, onAccepted }: { email: string; onAccepted: () => void }) {
  const [readToEnd, setReadToEnd] = useState(false);

  const accept = () => {
    localStorage.setItem(ndaKey(email), new Date().toISOString());
    logAccess(email, "nda_acceptance", DATA_ROOM_NDA_VERSION);
    onAccepted();
  };

  return (
    <main className="data-room-theme min-h-screen bg-obsidian px-6 py-12 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="glass overflow-hidden rounded-lg">
          <div className="border-b border-border px-6 py-5 md:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {DATA_ROOM_NDA_VERSION}
            </div>
            <h1 className="mt-3 text-3xl font-light tracking-tight">
              KLPS One-Way Confidentiality & Non-Disclosure Agreement
            </h1>
          </div>

          <div
            onScroll={(event) => {
              const target = event.currentTarget;
              if (target.scrollTop + target.clientHeight >= target.scrollHeight - 12) {
                setReadToEnd(true);
              }
            }}
            className="relative max-h-[62vh] overflow-y-auto px-6 py-6 md:px-8"
          >
            <div className="pointer-events-none sticky top-1/3 z-0 text-center text-4xl font-semibold uppercase tracking-[0.3em] text-white/[0.035] md:text-6xl">
              Confidential Property of KLPS Ltd
            </div>
            <div className="relative z-10 -mt-20 space-y-5 text-sm leading-7 text-muted-foreground">
              {ndaSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-2">{section.body}</p>
                </section>
              ))}
              <div className="rounded-md border border-border bg-white/[0.03] p-4 text-xs leading-6">
                Footer watermark for exported PDFs: "Confidential Property of KLPS Ltd".
                Registered company number and registered office address will be added once
                finalised. Version reference: {DATA_ROOM_NDA_VERSION}.
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-obsidian/80 px-6 py-5 md:px-8">
            <p className="text-xs leading-6 text-muted-foreground">
              Signed in as {email}. Scroll to the bottom of the agreement to enable acceptance.
              This acknowledgement is stored once for this NDA version.
            </p>
            <button
              onClick={accept}
              disabled={!readToEnd}
              className="mt-4 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              I agree
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const DataRoom = () => {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem(SESSION_KEY) || "");
  const [ndaAccepted, setNdaAccepted] = useState(() =>
    userEmail ? Boolean(localStorage.getItem(ndaKey(userEmail))) : false,
  );
  const [authorizedEmails, setAuthorizedEmails] = useState(getAuthorizedEmails);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [logs, setLogs] = useState(() => readJson<AccessLog[]>(ACCESS_LOG_KEY, []));

  const isFounder = isFounderEmail(userEmail);

  const visibleLogs = useMemo(
    () => logs.filter((log) => isFounder || log.email === userEmail).slice(0, 8),
    [isFounder, logs, userEmail],
  );

  const refreshLogs = () => setLogs(readJson<AccessLog[]>(ACCESS_LOG_KEY, []));

  const authorizeUser = (event: FormEvent) => {
    event.preventDefault();
    const normalized = normalizeAccessEmail(newUserEmail);
    if (!normalized.includes("@")) return;
    const next = Array.from(new Set([...authorizedEmails, normalized]));
    localStorage.setItem(AUTHORIZED_KEY, JSON.stringify(next.filter((item) => item !== DATA_ROOM_FOUNDER_EMAIL)));
    logAccess(userEmail, "user_authorised", normalized);
    setAuthorizedEmails(next);
    setNewUserEmail("");
    refreshLogs();
  };

  const viewDocument = (docName: string) => {
    logAccess(userEmail, "document_view", docName);
    refreshLogs();
  };

  if (!userEmail) {
    return (
      <LoginGate
        onLogin={(email) => {
          setUserEmail(email);
          setNdaAccepted(Boolean(localStorage.getItem(ndaKey(email))));
          refreshLogs();
        }}
      />
    );
  }

  if (!ndaAccepted) {
    return <NdaGate email={userEmail} onAccepted={() => setNdaAccepted(true)} />;
  }

  return (
    <main className="data-room-theme min-h-screen bg-obsidian text-foreground">
      <PageHeader
        eyebrow={`NDA Active · ${DATA_ROOM_NDA_VERSION}`}
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
                Signed In
              </div>
              <div className="mt-3 break-all text-sm text-foreground">{userEmail}</div>
              <button
                onClick={() => {
                  localStorage.removeItem(SESSION_KEY);
                  setUserEmail("");
                  setNdaAccepted(false);
                }}
                className="mt-5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </div>

            {isFounder && (
              <form onSubmit={authorizeUser} className="glass rounded-lg p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Founder Authorisation
                </div>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Add a manual authorised user email for this browser-based gate.
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
              </form>
            )}

            <div className="glass rounded-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Access Log
              </div>
              <ul className="mt-4 space-y-3 text-xs">
                {visibleLogs.map((log) => (
                  <li key={`${log.at}-${log.detail}`} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="text-foreground">{log.detail}</div>
                    <div className="mt-1 text-muted-foreground">
                      {log.email} · {new Date(log.at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Categories
              </div>
              <ul className="mt-4 space-y-1 text-sm">
                {categories.map((category, index) => (
                  <li
                    key={category}
                    className={`flex items-center justify-between rounded-md px-3 py-2 ${
                      index === 0 ? "bg-white/5 text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{category}</span>
                    <span className="font-mono text-[10px]">{index === 0 ? DOCS.length : "."}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="glass overflow-hidden rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
                <h3 className="text-sm font-medium">Documents</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Confidential Property of KLPS Ltd
                </span>
              </div>
              <ul className="divide-y divide-border">
                {DOCS.map((doc) => (
                  <li
                    key={doc.name}
                    onClick={() => viewDocument(doc.name)}
                    className="group flex cursor-pointer items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-onyx">
                        <div className="size-1.5 rounded-full bg-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-foreground">{doc.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          Updated {doc.updated} · {doc.size} · {doc.v}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                      View
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Confidential Property of KLPS Ltd
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default DataRoom;
