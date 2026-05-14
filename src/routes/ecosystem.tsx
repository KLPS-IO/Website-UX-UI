import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import productImg from "@/assets/wearable-product.jpg";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Product Ecosystem — KPLS" },
      { name: "description", content: "Smart underwear, wearable mockups, textile system diagrams and the AI-enhanced product roadmap." },
    ],
  }),
  component: Ecosystem,
});

function Ecosystem() {
  return (
    <>
      <PageHeader
        eyebrow="Product Ecosystem"
        title="A coherent system of intelligent garments."
        description="Smart underwear, integrated textile platforms, and the AI-enhanced roadmap for the KPLS product family."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass overflow-hidden rounded-2xl">
            <div className="aspect-square overflow-hidden bg-obsidian">
              <img
                src={productImg}
                alt="Smart underwear prototype with glowing sensor seams"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">K-Series · 01</div>
              <h3 className="mt-3 text-2xl font-light text-foreground">Smart Underwear</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Continuous, non-invasive biometric sensing in a garment people forget they're wearing.
                Engineered for comfort first, sensors second.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { code: "K-Series · 02", title: "Femtech Waistband", body: "Cycle-aware monitoring for women's health, integrated into everyday wear." },
              { code: "K-Series · 03", title: "Performance Layer", body: "Athletic baselayer with real-time muscle and recovery telemetry." },
              { code: "K-Series · 04", title: "Therapeutic Wrap", body: "Targeted sensory and stimulation system for rehabilitation contexts." },
            ].map((c) => (
              <article key={c.code} className="glass rounded-2xl p-6 transition-colors hover:border-accent/30">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{c.code}</div>
                <div className="mt-2 text-lg font-medium text-foreground">{c.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="System diagram" title="One stack, many garments.">
        <div className="glass rounded-2xl p-10">
          <div className="grid gap-6 md:grid-cols-5">
            {["Conductive Yarn", "3D Weave", "Sensor Array", "Edge Compute", "Cloud + AI"].map((layer, i) => (
              <div key={layer} className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Layer 0{i + 1}
                </div>
                <div className="mt-3 rounded-xl border border-border bg-onyx p-5 text-center">
                  <div className="text-sm font-medium text-foreground">{layer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
