import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
const roadmap = [
  ["01", "Textile Sensing", "Active"],
  ["02", "Garment Engineering", "Planned"],
  ["03", "Electronics and Power", "Planned"],
  ["04", "Firmware", "Planned"],
  ["05", "Pilot Assembly and Validation", "Planned"],
  ["06", "Clinical and Regulatory Advisory", "Planned"],
];
export default function RdLabOverview() {
  return (
    <main className="rd-lab-light min-h-screen bg-[#100c13] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-sm tracking-[.35em]">
            <span className="h-2 w-2 rounded-full bg-[#df3fae] shadow-[0_0_18px_#df3fae]" />
            KLPS
          </div>
          <span className="flex items-center gap-2 text-xs text-white/45">
            <LockKeyhole className="h-4 w-4" />
            Private founder workspace
          </span>
        </div>
        <section className="grid gap-12 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[.28em] text-[#df3fae]">
              Research & Development
            </div>
            <h1 className="mt-5 text-6xl font-light tracking-[-.05em] md:text-8xl">
              R&D Lab
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-white/80 md:text-2xl">
              Building the evidence-led pathway from sensing textile feasibility
              to MVP V2.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-white/50">
              This private workspace manages technical requirements, supplier
              discovery, quotations, testing evidence, development decisions and
              the costed roadmap for KLPS MVP V2.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/rd-lab/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#df3fae] px-6 py-3 text-sm font-semibold"
              >
                Founder Login <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/innovation-lab"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/70"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Overview
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.035] p-7">
            <div className="text-xs uppercase tracking-[.2em] text-white/35">
              Current programme
            </div>
            <h2 className="mt-3 text-2xl font-semibold">
              MVP V2 — Intelligent Textile Platform
            </h2>
            <div className="mt-7 border-l-2 border-[#df3fae] pl-5">
              <div className="text-sm font-semibold text-[#f36bc5]">
                WP1 — Textile Sensing
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Identify and cost at least one textile sensing approach capable
                of detecting repeatable abdominal changes relative to a personal
                baseline.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-5 text-xs uppercase tracking-[.22em] text-white/35">
            Six-work-package roadmap
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map(([code, title, status]) => (
              <div key={code} className="rd-roadmap-card bg-[#151019] p-6">
                <div className="flex justify-between font-mono text-xs text-white/30">
                  <span>{code}</span>
                  <span className={status === "Active" ? "text-[#f36bc5]" : ""}>
                    {status}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-medium">{title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
