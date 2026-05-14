import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder Dashboard — KPLS" },
      { name: "description", content: "Founder profile, vision, journey, accelerators, milestones, press and partnerships for KPLS." },
    ],
  }),
  component: Founder,
});

const TIMELINE = [
  { date: "2022 · Q3", title: "KPLS founded", body: "Initial research into conductive thread architectures." },
  { date: "2023 · Q2", title: "First conductive prototype", body: "K-01 mesh validated under wash-cycle stress." },
  { date: "2023 · Q4", title: "Pre-seed closed", body: "£1.5M oversubscribed from angels and one institutional fund." },
  { date: "2024 · Q1", title: "FemTech Core (K-04)", body: "Sensor architecture for women's health embedded into waistband." },
  { date: "2024 · Q3", title: "Accelerator: Future Materials", body: "Selected from 1,200 applicants." },
  { date: "2025 · Q2", title: "Clinical pilot signed", body: "500-unit deployment with two EU partners." },
  { date: "2026 · Q1", title: "Series A opens", body: "Targeting £6M to scale manufacturing and IP filings." },
];

function Founder() {
  return (
    <>
      <PageHeader
        eyebrow="Founder Dashboard"
        title="The operating system behind KPLS."
        description="Vision, mission, journey and the people building the sensory layer of human–computer interaction."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="glass rounded-2xl p-6">
              <div className="size-20 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 ring-1 ring-accent/30" />
              <div className="mt-4 text-lg font-medium">Founder, KPLS</div>
              <div className="text-xs text-muted-foreground">Materials science · wearable systems</div>
              <div className="mt-6 space-y-3 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Based</span><span className="text-foreground">London, UK</span></div>
                <div className="flex justify-between"><span>Background</span><span className="text-foreground">Smart textiles, biomedical eng.</span></div>
                <div className="flex justify-between"><span>Prior</span><span className="text-foreground">R&D, applied research labs</span></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Vision</div>
              <p className="mt-4 text-2xl font-light leading-snug text-foreground">
                Make the textiles touching the human body intelligent, intimate and quietly diagnostic.
              </p>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Mission</div>
              <p className="mt-4 text-base text-muted-foreground">
                Build the conductive textile platform that powers the next decade of women's health, wellness and ambient sensing — engineered with clinical rigour and human-centred design.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Journey" title="A timeline of the build.">
        <div className="glass rounded-2xl p-8">
          <ol className="space-y-8">
            {TIMELINE.map((t, i) => (
              <li key={t.date} className="relative flex gap-6">
                <div className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t.date}
                </div>
                <div className="relative">
                  {i !== TIMELINE.length - 1 && (
                    <div className="absolute left-1.5 top-3 h-full w-px bg-border" />
                  )}
                  <div className="relative z-10 size-3 rounded-full border-2 border-accent bg-obsidian" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="text-sm font-medium text-foreground">{t.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Recognition" title="Accelerators, press & partnerships.">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {[
            "Future Materials Accelerator",
            "Wearable Tech Forum 2025",
            "FemTech Lab Cohort",
            "Innovate UK Grant",
            "Press · Wired",
            "Press · Vogue Business",
            "Partner · EU Knit Lab",
            "Award · Material Honours",
          ].map((p) => (
            <div key={p} className="bg-obsidian p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {p.split(" · ")[0]}
              </div>
              <div className="mt-2 text-sm text-foreground">
                {p.includes("·") ? p.split(" · ")[1] : p}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
