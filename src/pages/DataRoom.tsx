import { PageHeader, Section } from "@/components/Section";
import { useState } from "react";

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

const DataRoom = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  if (!acknowledged) {
    return (
      <main className="data-room-theme min-h-screen bg-obsidian px-6 py-24 text-foreground">
        <div className="mx-auto max-w-2xl">
          <div className="glass rounded-2xl p-8 md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Restricted - NDA Required
            </div>
            <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground">
              Investor Data Room
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The materials within are confidential and proprietary to KPLS Technology Ltd.
              By proceeding you acknowledge a binding non-disclosure agreement covering all
              documents, financials, and intellectual property disclosed within this surface.
              Access is logged.
            </p>
            <button
              onClick={() => setAcknowledged(true)}
              className="mt-8 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              I acknowledge - Enter Data Room
            </button>
            <button className="mt-3 w-full rounded-full border border-border bg-transparent px-6 py-3 text-xs text-muted-foreground hover:text-foreground">
              Request investor invite
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="data-room-theme min-h-screen bg-obsidian text-foreground">
      <PageHeader
        eyebrow="NDA Active · Level 4 Access"
        title="Investor Data Room."
        description="Versioned, permissioned documents covering KPLS fundraising, financials, IP and strategy."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Round Progress
              </div>
              <div className="mt-3 text-2xl font-light italic">£6.0M Series A</div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Committed</span>
                  <span className="text-foreground">£2.1M / £6.0M</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[35%] rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-border p-3">
                  <div className="text-muted-foreground">Lead</div>
                  <div className="mt-1 text-foreground">In diligence</div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-muted-foreground">Close target</div>
                  <div className="mt-1 text-foreground">Q4 2026</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
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
                    <span className="font-mono text-[10px]">{index === 0 ? DOCS.length : "·"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="text-sm font-medium">Documents</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Version-tracked
                </span>
              </div>
              <ul className="divide-y divide-border">
                {DOCS.map((doc) => (
                  <li
                    key={doc.name}
                    className="group flex cursor-pointer items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-onyx">
                        <div className="size-1.5 rounded-full bg-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{doc.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          Updated {doc.updated} · {doc.size} · {doc.v}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                      View →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default DataRoom;
