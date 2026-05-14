import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import polymerImg from "@/assets/polymer-lab.jpg";
import sensorImg from "@/assets/sensor-mesh.jpg";
import heroImg from "@/assets/hero-textile.jpg";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "IP & R&D Lab — KPLS" },
      { name: "description", content: "Patent pipeline, prototypes, conductive thread testing, smart textile architecture and material experimentation at KPLS." },
    ],
  }),
  component: Lab,
});

const PATENTS = [
  { id: "WO-2024-0142", title: "Stretchable conductive lattice", status: "Granted" },
  { id: "WO-2024-0188", title: "Wash-stable polymer coating", status: "Pending" },
  { id: "WO-2025-0021", title: "Textile-integrated biosensor array", status: "Pending" },
  { id: "WO-2025-0107", title: "Modular signal-routing weave", status: "Filed" },
  { id: "WO-2025-0163", title: "Femtech waistband sensor", status: "Pending" },
  { id: "WO-2026-0014", title: "Multi-modal sensory layer", status: "Provisional" },
];

function Lab() {
  return (
    <>
      <PageHeader
        eyebrow="R&D Lab"
        title="The interactive research archive."
        description="Patents, prototypes, conductive thread testing, and the material science behind KPLS."
      />

      <Section eyebrow="Patent pipeline" title="14+ filings across the conductive textile stack.">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="col-span-3">Filing ID</div>
            <div className="col-span-7">Title</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          <ul className="divide-y divide-border">
            {PATENTS.map((p) => (
              <li key={p.id} className="grid grid-cols-12 items-center px-6 py-4 text-sm hover:bg-white/[0.02]">
                <div className="col-span-3 font-mono text-xs text-muted-foreground">{p.id}</div>
                <div className="col-span-7 text-foreground">{p.title}</div>
                <div className="col-span-2 text-right">
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] ${
                    p.status === "Granted"
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-border bg-white/[0.03] text-muted-foreground"
                  }`}>
                    {p.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Active prototypes" title="What's on the bench right now.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { img: heroImg, label: "Conductive lattice v3", code: "PROTO-031" },
            { img: sensorImg, label: "Embedded sensor patch", code: "PROTO-044" },
            { img: polymerImg, label: "Polymer wash-cycle test", code: "PROTO-058" },
          ].map((p) => (
            <div key={p.code} className="glass overflow-hidden rounded-2xl">
              <div className="aspect-square overflow-hidden">
                <img src={p.img} alt={p.label} loading="lazy" className="size-full object-cover" />
              </div>
              <div className="p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{p.code}</div>
                <div className="mt-2 text-sm text-foreground">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Innovation roadmap" title="From thread to integrated system.">
        <div className="glass rounded-2xl p-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { phase: "Phase 1", title: "Material", body: "Conductive polymer synthesis and wash-stability." },
              { phase: "Phase 2", title: "Architecture", body: "3D knitted structures with integrated routing." },
              { phase: "Phase 3", title: "Sensing", body: "Embedded biometric arrays at clinical grade." },
              { phase: "Phase 4", title: "Intelligence", body: "On-textile signal processing and AI inference." },
            ].map((p, i) => (
              <div key={p.phase} className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {p.phase}
                </div>
                <div className="mt-3 text-lg font-medium text-foreground">{p.title}</div>
                <p className="mt-2 text-xs text-muted-foreground">{p.body}</p>
                {i < 3 && (
                  <div className="absolute right-0 top-2 hidden h-px w-8 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
