import type { ReactNode } from "react";
import { SlideFrame } from "@/components/SlideFrame";
import blobPink from "@/assets/blob-pink.png";
import blobSpiral from "@/assets/blob-spiral.png";
import blobRing from "@/assets/blob-ring.png";

const TOTAL = 13;

// const tummyInTen = Math.round((metrics?.tummyPercent ?? 0) / 10);

// ----- helpers -----
function BlobDecor({
  variant = "all",
}: {
  variant?: "all" | "top" | "minimal";
}) {
  return (
    <>
      {(variant === "all" || variant === "top") && (
        <img
          src={blobPink}
          alt=""
          className="blob"
          style={{ top: -180, right: 380, width: 720, opacity: 0.95 }}
        />
      )}
      {variant === "all" && (
        <img
          src={blobSpiral}
          alt=""
          className="blob"
          style={{ top: 120, right: -120, width: 560, opacity: 0.85 }}
        />
      )}
      {variant === "all" && (
        <img
          src={blobRing}
          alt=""
          className="blob"
          style={{ bottom: -160, right: 220, width: 540, opacity: 0.9 }}
        />
      )}
    </>
  );
}

// ----- 01: Cover -----
function Slide01() {
  return (
    <SlideFrame
      variant="split"
      pageNumber={1}
      pageTotal={TOTAL}
      showLogo={false}
      showWatermark
    >
      <BlobDecor />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 110,
          right: 900,
        }}
      >
        <div style={{ marginBottom: 56 }}>
          <div
            style={{ display: "inline-flex", alignItems: "baseline", gap: 18 }}
          >
            <span
              style={{
                display: "inline-block",
                width: 86,
                height: 86,
                background: "var(--brand-gradient)",
                borderRadius: 18,
                position: "relative",
                boxShadow: "0 16px 40px -12px oklch(0.55 0.30 320 / 0.55)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 56,
                }}
              >
                K
              </span>
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: 64,
                letterSpacing: "-0.04em",
              }}
            >
              KLPS
            </span>
            <span style={{ fontSize: 32, color: "var(--muted-foreground)" }}>
              technology
            </span>
          </div>
        </div>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 24 }}
        >
          Investor Pitch · 2026
        </div>
        <h1
          className="slide-title-xl"
          style={{ color: "var(--brand-ink)", marginRight: "50px" }}
        >
          <span className="brand-text">Femtech</span>
          <br />
          <h1>
            <span>Insights Underwear.</span>
          </h1>{" "}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 110,
          color: "white",
        }}
      >
        <div
          style={{ fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em" }}
        >
          Emma Mendez
        </div>
        <div style={{ fontSize: 22, opacity: 0.9, marginTop: 6 }}>
          Founder &amp; CEO
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          right: 110,
          textAlign: "right",
          color: "white",
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.9 }}>emmamendez@klps.co.uk</div>
        <div style={{ fontSize: 22, opacity: 0.9, marginTop: 6 }}>
          klps.co.uk
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 02: The Problem -----
function Slide02({ metrics }: { metrics?: SlideMetrics }) {
  const tummyInTen = Math.round((metrics?.tummyPercent ?? 0) / 10);

  return (
    <SlideFrame variant="white" pageNumber={2} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -80, width: 520, opacity: 0.55 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 900 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          01 · The Problem
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 48 }}
        >
          Most wearables
          <br />
          measure from the <span className="brand-text">wrist.</span>
        </h2>
        <p
          className="slide-body-lg"
          style={{ color: "oklch(0.35 0.03 290)", maxWidth: 940 }}
        >
          Women's bodies are not wrists. Meaningful physiological signals occur
          in the abdomen, pelvic region and core body zones - and remain
          under-measured today.
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          right: 110,
          top: 260,
          width: "30%",
          minWidth: 420,
          display: "grid",
          gap: 24,
        }}
      >
        {[
          {
            label: `${tummyInTen} in 10 women`,
            pct: "selected the abdominal region as an area where they want more insight",
          },
          {
            label: `${metrics?.topConcernPercent ?? 0}%`,
            pct: "report bloating as a recurring experience",
          },
          {
            label: `${metrics?.commercialInterestPercent ?? 0}%`,
            pct: "would consider paying for personalised body insights",
          },
        ].map((row) => (
          <div
            key={`${row.label}-${row.pct}`}
            className="stat-card"
            style={{ padding: 36 }}
          >
            {" "}
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "var(--brand-ink)",
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "var(--brand-magenta)",
                marginTop: 8,
                fontWeight: 600,
              }}
            >
              {row.pct}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

// ----- 03: What it feels like -----
function Slide03() {
  return (
    <SlideFrame variant="soft" pageNumber={3} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{ bottom: -120, left: -120, width: 520, opacity: 0.8 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          02 · The Gap
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", maxWidth: 1400 }}
        >
          We have tracking devices.
          <br />
          <span className="brand-text">
            They just don't track what matters.
          </span>
        </h2>

        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
          }}
        >
          <div className="stat-card">
            <div
              className="slide-kicker"
              style={{ color: "var(--brand-violet)", marginBottom: 16 }}
            >
              Today
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.25,
                color: "var(--brand-ink)",
              }}
            >
              WHOOP. Apple Watch. Oura. Flo.
              <br />
              All worn on the wrist, the finger, or the phone.
            </div>
          </div>
          <div
            className="stat-card"
            style={{ background: "var(--brand-gradient)", color: "white" }}
          >
            <div
              className="slide-kicker"
              style={{ color: "rgba(255,255,255,0.85)", marginBottom: 16 }}
            >
              KLPS
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.25 }}>
              Sensing embedded into garments.
              <br />
              Passive monitoring. No behaviour change.
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 04: How it works -----
function Slide04() {
  const steps = [
    {
      n: "01",
      t: "Garment",
      d: "Everyday underwear holds sensing materials close to the body.",
    },
    {
      n: "02",
      t: "Conductive textile",
      d: "Stretch fabric, sensor patch and conductive thread carry signals.",
    },
    {
      n: "03",
      t: "Microcontroller",
      d: "An on-board Arduino reads signals and converts to data.",
    },
    {
      n: "04",
      t: "Insight layer",
      d: "Signal → Memory → Insight. Structured behavioural intelligence.",
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={4} pageTotal={TOTAL}>
      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{ top: -160, right: -120, width: 520, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          03 · How it works
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", maxWidth: 1400 }}
        >
          A <span className="brand-text">garment</span> that listens.
        </h2>
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 28,
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                padding: 36,
                borderRadius: 28,
                background: "white",
                border: "1px solid oklch(0.92 0.02 320)",
                boxShadow: "0 20px 50px -28px oklch(0.55 0.30 320 / 0.25)",
                minHeight: 320,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  color: "var(--brand-magenta)",
                  marginBottom: 16,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: "var(--brand-ink)",
                  marginBottom: 16,
                }}
              >
                {s.t}
              </div>
              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.4,
                  color: "oklch(0.4 0.03 290)",
                }}
              >
                {s.d}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
            display: "inline-flex",
            alignItems: "center",
            gap: 24,
            padding: "20px 36px",
            borderRadius: 9999,
            background: "var(--brand-gradient)",
            color: "white",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "-0.01em",
          }}
        >
          Signal &nbsp;→&nbsp; Memory &nbsp;→&nbsp; Insight
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 05: Market Opportunity -----
function Slide05() {
  return (
    <SlideFrame variant="white" pageNumber={5} pageTotal={TOTAL}>
      <div style={{ position: "absolute", top: 180, left: 110, width: 880 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          04 · Market Opportunity
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 0 }}
        >
          A category-defining market.
        </h2>

        <div style={{ display: "grid", gap: 28 }}>
          {[
            { tag: "TAM", value: "£165B", label: "Femtech in the next decade" },
            { tag: "SAM", value: "£46B", label: "Femtech wearables" },
            {
              tag: "SOM",
              value: "£180m – £240m",
              label: "Premium early adopters + pilots (5 yrs)",
            },
          ].map((m) => (
            <div
              key={m.tag}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "10px 0",
                borderBottom: "1px solid oklch(0.9 0.02 320)",
              }}
            >
              <div
                style={{
                  width: 110,
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "0.18em",
                  color: "var(--brand-magenta)",
                }}
              >
                {m.tag}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    color: "var(--brand-ink)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    color: "oklch(0.4 0.03 290)",
                    marginTop: 4,
                  }}
                >
                  {m.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{ marginTop: 32, fontSize: 18, color: "oklch(0.45 0.02 290)" }}
        >
          Sources: McKinsey Femtech Outlook 2024 · Smart Textiles Market Report
          2023 · Graphene Market UK Forecast 2025.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 120,
          top: 180,
          width: 760,
          height: 760,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div className="tam-circles">
          <div className="ring r1">£165B</div>
          <div className="ring r2">£46B</div>
          <div className="ring r3">
            £180m
            <br />
            £240m
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 06: Competitors -----
function Slide06() {
  const groups = [
    {
      h: "Cycle prediction apps",
      items: ["Flo", "Clue", "Glow"],
    },
    {
      h: "Smart textiles — non-intimate",
      items: ["Hexoskin", "Siren"],
    },
    {
      h: "Absorbent fabrics, no sensing",
      items: ["Thinx", "Modibodi"],
    },
    {
      h: "Single-signal trackers",
      items: ["Tempdrop", "Elvie", "Femsense"],
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={6} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -100, width: 460, opacity: 0.55 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          05 · Landscape
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 56 }}
        >
          No one is doing this.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 28,
          }}
        >
          {groups.map((g) => (
            <div
              key={g.h}
              style={{
                padding: 40,
                borderRadius: 28,
                border: "1px solid oklch(0.92 0.02 320)",
                background: "white",
                boxShadow: "0 18px 40px -28px oklch(0.55 0.30 320 / 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--brand-magenta)",
                  marginBottom: 14,
                  letterSpacing: "0.04em",
                }}
              >
                {g.h}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {g.items.map((i) => (
                  <span
                    key={i}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 9999,
                      background: "oklch(0.96 0.02 320)",
                      color: "var(--brand-ink)",
                      fontWeight: 600,
                      fontSize: 24,
                    }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "oklch(0.4 0.03 290)",
            maxWidth: 1500,
            lineHeight: 1.35,
          }}
        >
          Apps predict. Trackers measure narrow signals. Absorbent fabrics solve
          a different problem. KLPS sits in a white space: sensing-grade
          intimate garments.
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 07: Traction -----
function Slide07() {
  const stats = [
    { v: "12", l: "Users onboarded" },
    { v: "25+", l: "Completed sessions" },
    { v: "127", l: "Behavioural signals captured" },
    { v: "75%", l: "Day-2 retention" },
  ];
  return (
    <SlideFrame
      variant="gradient"
      pageNumber={7}
      pageTotal={TOTAL}
      logoLight
      footerLight
    >
      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{ bottom: -180, left: -80, width: 520, opacity: 0.6 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28 }}
        >
          06 · Traction
        </div>
        <h2
          className="slide-title"
          style={{ color: "white", marginBottom: 80, maxWidth: 1500 }}
        >
          Live behavioural signals — already flowing.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 28,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.l}
              style={{
                padding: 44,
                borderRadius: 28,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                color: "white",
                minHeight: 280,
              }}
            >
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 22,
                  opacity: 0.85,
                  marginTop: 24,
                  lineHeight: 1.35,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 30,
            color: "rgba(255,255,255,0.9)",
            maxWidth: 1400,
          }}
        >
          Confirming early engagement momentum from day one.
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 08: Business Model -----
function Slide08() {
  return (
    <SlideFrame variant="white" pageNumber={8} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{ top: -100, right: -100, width: 460, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          07 · Business Model
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 24 }}
        >
          Hardware <span className="brand-text">+</span> Intelligence.
        </h2>
        <p
          className="slide-body-lg"
          style={{
            color: "oklch(0.4 0.03 290)",
            maxWidth: 1300,
            marginBottom: 64,
          }}
        >
          A hybrid model: a premium physical product that fuels a high-margin
          recurring insight layer.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
        >
          <div
            style={{
              padding: 44,
              borderRadius: 28,
              background: "var(--brand-gradient-soft)",
              minHeight: 320,
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
              }}
            >
              REVENUE STREAM · 01
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "var(--brand-ink)",
                marginTop: 16,
              }}
            >
              Smart Garment Sales
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--brand-ink)",
                marginTop: 24,
              }}
            >
              £65 – £95
            </div>
            <div
              style={{
                fontSize: 22,
                color: "oklch(0.4 0.03 290)",
                marginTop: 4,
              }}
            >
              per garment
            </div>
          </div>
          <div
            style={{
              padding: 44,
              borderRadius: 28,
              background: "var(--brand-gradient)",
              color: "white",
              minHeight: 320,
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.18em",
                fontWeight: 800,
                opacity: 0.85,
              }}
            >
              REVENUE STREAM · 02
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, marginTop: 16 }}>
              Insight Subscription
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                marginTop: 24,
              }}
            >
              £4 – £9
            </div>
            <div style={{ fontSize: 22, opacity: 0.85, marginTop: 4 }}>
              per user / month
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          {[
            "Research collaborations",
            "Healthcare partnerships",
            "Institutional licensing",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "14px 28px",
                borderRadius: 9999,
                border: "1px solid oklch(0.85 0.04 320)",
                fontSize: 22,
                color: "var(--brand-ink)",
                fontWeight: 600,
              }}
            >
              + {t}
            </span>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 09: GTM -----
function Slide09() {
  const phases = [
    {
      p: "Phase 1",
      t: "Early testers & waitlist onboarding",
      d: "Underway today.",
    },
    {
      p: "Phase 2",
      t: "Community-driven growth",
      d: "Ambassador & referral loops.",
    },
    { p: "Phase 3", t: "Commercial pilot launches", d: "Premium D2C release." },
    {
      p: "Phase 4",
      t: "Retail & institutional partnerships",
      d: "Healthcare and research deals.",
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={9} pageTotal={TOTAL}>
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          08 · Go-to-market
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 80 }}
        >
          A staged path to scale.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 38,
              left: 60,
              right: 60,
              height: 2,
              background: "var(--brand-gradient)",
              opacity: 0.4,
              zIndex: 0,
            }}
          />
          {phases.map((ph, i) => (
            <div key={ph.p} style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 9999,
                  background: i === 0 ? "var(--brand-gradient)" : "white",
                  border: i === 0 ? "none" : "2px solid var(--brand-magenta)",
                  color: i === 0 ? "white" : "var(--brand-magenta)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 30,
                  marginBottom: 32,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: "var(--brand-magenta)",
                  marginBottom: 12,
                }}
              >
                {ph.p.toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--brand-ink)",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {ph.t}
              </div>
              <div style={{ fontSize: 22, color: "oklch(0.4 0.03 290)" }}>
                {ph.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 10: Roadmap -----
function Slide10() {
  const items = [
    { t: "Prototype validation", q: "Now" },
    { t: "Pilot deployment", q: "Q2 2026" },
    { t: "Commercial launch", q: "Q4 2026" },
    { t: "Platform expansion", q: "2027" },
    { t: "Dataset growth", q: "2027 +" },
  ];
  return (
    <SlideFrame variant="soft" pageNumber={10} pageTotal={TOTAL}>
      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{ top: -120, right: -120, width: 480, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          09 · Roadmap · Next 12–24 months
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 24 }}
        >
          Building reliable behavioural
          <br />
          and physiological infrastructure.
        </h2>
        <div style={{ marginTop: 80, display: "grid", gap: 18 }}>
          {items.map((it, i) => (
            <div
              key={it.t}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 200px 1fr",
                alignItems: "center",
                gap: 28,
                padding: "28px 36px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 14px 40px -28px oklch(0.55 0.30 320 / 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--brand-magenta)",
                }}
              >
                0{i + 1}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--brand-violet)",
                  letterSpacing: "0.06em",
                }}
              >
                {it.q.toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "var(--brand-ink)",
                }}
              >
                {it.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 11: Team -----
function Slide11() {
  const team = [
    {
      n: "Emma M.",
      r: "Founder & CEO",
      d: "Founder of KLPS technology. Building the wearable category for women's health.",
    },
    {
      n: "Oyin A.",
      r: "Advisor",
      d: "Award-winning commercial leadership and deep community reach in women-in-tech.",
    },
    {
      n: "Muneeb A.",
      r: "Advisor",
      d: "LLM systems, MVP development and computer vision pipelines at scale.",
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={11} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -80, width: 460, opacity: 0.55 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          10 · The Team
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 72 }}
        >
          Builders behind the fabric.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {team.map((m) => (
            <div
              key={m.n}
              style={{
                padding: 44,
                borderRadius: 28,
                background: "var(--brand-gradient-soft)",
                minHeight: 380,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 9999,
                  background: "var(--brand-gradient)",
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 42,
                  fontWeight: 800,
                  marginBottom: 32,
                }}
              >
                {m.n.charAt(0)}
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "var(--brand-ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                {m.n}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--brand-magenta)",
                  marginTop: 6,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {m.r}
              </div>
              <div
                style={{
                  fontSize: 24,
                  lineHeight: 1.4,
                  color: "oklch(0.35 0.03 290)",
                  marginTop: 24,
                }}
              >
                {m.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 12: Vision -----
function Slide12() {
  return (
    <SlideFrame
      variant="gradient"
      pageNumber={12}
      pageTotal={TOTAL}
      logoLight
      footerLight
    >
      <BlobDecor variant="all" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "0 200px",
          textAlign: "center",
        }}
      >
        <div>
          <div
            className="slide-kicker"
            style={{ color: "rgba(255,255,255,0.8)", marginBottom: 40 }}
          >
            11 · Vision
          </div>
          <h2
            style={{
              fontSize: 140,
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              fontWeight: 800,
              color: "white",
              marginBottom: 56,
            }}
          >
            The future of health monitoring
            <br />
            is not <span style={{ opacity: 0.5 }}>devices</span>.<br />
            It is{" "}
            <em style={{ fontStyle: "italic", fontWeight: 800 }}>fabric.</em>
          </h2>
          <p
            style={{
              fontSize: 36,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 1300,
              margin: "0 auto",
            }}
          >
            KLPS is introducing a new category of wearable technology — starting
            in FemTech, built for women's health intelligence.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 13: Thank you / contact -----
function Slide13() {
  return (
    <SlideFrame variant="split" pageNumber={13} pageTotal={TOTAL} showWatermark>
      <BlobDecor variant="all" />
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 110,
          right: 900,
        }}
      >
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          Let's talk
        </div>
        <h2 className="slide-title-xl" style={{ color: "var(--brand-ink)" }}>
          Thank you
          <br />
          for your <span className="brand-text">time.</span>
        </h2>
        <div style={{ marginTop: 80, display: "grid", gap: 18 }}>
          <div
            style={{ fontSize: 32, fontWeight: 600, color: "var(--brand-ink)" }}
          >
            emmamendez@klps.co.uk
          </div>
          <div
            style={{ fontSize: 32, fontWeight: 600, color: "var(--brand-ink)" }}
          >
            klps.co.uk
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          right: 110,
          textAlign: "right",
          color: "white",
        }}
      >
        <div
          style={{ fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em" }}
        >
          Emma Mendez
        </div>
        <div style={{ fontSize: 22, opacity: 0.9, marginTop: 6 }}>
          Founder &amp; CEO · KLPS technology
        </div>
      </div>
    </SlideFrame>
  );
}

export interface SlideMetrics {
  tummyPercent?: number;
  topConcernPercent?: number;
  commercialInterestPercent?: number;
  [key: string]: unknown;
}

export interface SlideMeta {
  title: string;
  render: (metrics?: SlideMetrics) => ReactNode;
}

export const slides: SlideMeta[] = [
  { title: "Cover", render: () => <Slide01 /> },
  {
    title: "The Problem",
    render: (metrics) => <Slide02 metrics={metrics} />,
  },
  { title: "The Gap", render: () => <Slide03 /> },
  { title: "How it works", render: () => <Slide04 /> },
  { title: "Market Opportunity", render: () => <Slide05 /> },
  { title: "Landscape", render: () => <Slide06 /> },
  { title: "Traction", render: () => <Slide07 /> },
  { title: "Business Model", render: () => <Slide08 /> },
  { title: "Go-to-market", render: () => <Slide09 /> },
  { title: "Roadmap", render: () => <Slide10 /> },
  { title: "Team", render: () => <Slide11 /> },
  { title: "Vision", render: () => <Slide12 /> },
  { title: "Thank you", render: () => <Slide13 /> },
];
