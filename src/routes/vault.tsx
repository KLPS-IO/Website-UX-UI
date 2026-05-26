import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Secure File Vault — KPLS" },
      { name: "description", content: "Permissioned file management, folder structure, investor-specific sharing and activity logs." },
    ],
  }),
  component: Vault,
});

const FOLDERS = [
  { name: "01 · Pitch Deck", count: 4, updated: "2h ago" },
  { name: "02 · Financials", count: 7, updated: "1d ago" },
  { name: "03 · IP Portfolio", count: 18, updated: "3d ago" },
  { name: "04 · Market Research", count: 9, updated: "1w ago" },
  { name: "05 · Legal & NDA", count: 6, updated: "2w ago" },
  { name: "06 · Press & Awards", count: 12, updated: "1mo ago" },
];

const ACTIVITY = [
  { who: "Investor · Sequoia", what: "viewed Financial_Projections", when: "12m ago" },
  { who: "Investor · Atomico", what: "downloaded Series_A_Deck", when: "47m ago" },
  { who: "Investor · LocalGlobe", what: "opened IP_Portfolio_Audit", when: "2h ago" },
  { who: "Investor · EQT", what: "requested access to Cap_Table", when: "5h ago" },
];

function Vault() {
  return (
    <>
      <PageHeader
        eyebrow="Secure File Vault"
        title="Drag, drop, permission, audit."
        description="The central command surface for fundraising materials and investor-specific sharing."
      />

      <Section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <input
            placeholder="Search files, folders, investors…"
            className="w-full max-w-md rounded-full border border-border bg-onyx px-5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none md:w-96"
          />
          <button className="rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-primary-foreground">
            + Upload
          </button>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FOLDERS.map((f) => (
            <button
              key={f.name}
              className="group bg-obsidian p-6 text-left transition-colors hover:bg-onyx"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-onyx">
                  <div className="size-1.5 rounded-full bg-accent" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{f.count} files</span>
              </div>
              <div className="mt-4 text-sm font-medium text-foreground">{f.name}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Updated {f.updated}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section eyebrow="Activity log" title="Who's reading what.">
        <div className="glass divide-y divide-border overflow-hidden rounded-2xl">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 text-sm">
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full border border-border bg-onyx" />
                <div>
                  <div className="text-foreground">
                    {a.who}{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {a.when}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
