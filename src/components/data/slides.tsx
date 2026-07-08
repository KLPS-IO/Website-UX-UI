import { useEffect, useRef, useState, type ReactNode } from "react";
import { SlideFrame } from "@/components/SlideFrame";
import blobPink from "@/assets/blob-pink.png";
import blobSpiral from "@/assets/blob-spiral.png";
import blobRing from "@/assets/blob-ring.png";
import klpsVideo from "@/assets/klps.mp4";
import headShot from "@/assets/headshot.jpg";
import garmentAsset from "@/assets/garmentklps.jpeg";
import textileAsset from "@/assets/textile.png";
import mcuAsset from "@/assets/mcu.png";
import insightAsset from "@/assets/insight.mp4";
import insightImageAsset from "@/assets/insight.png";
import { AnimatedHeadline } from "../AnimatedHeadline";
import grapheneVideo from "@/assets/graphene.mp4";
import wireframeStatsAsset from "@/assets/wireframe-composition.png";
import wireframeScanAsset from "@/assets/wireframe-scan.jpeg";
import wireframeCompositionAsset from "@/assets/wireframe-stats.jpeg";
import ChatToLema from "@/assets/chat-lema.png";
import niyoLogo from "@/assets/niyo-group-logo-l.png";
import ffrLogo from "@/assets/ffr-logo.jpg";
import ctfLogo from "@/assets/ctf-logo.png";
import catapultLogo from "@/assets/DC_Logo_Housed_Dark_Red.png";
import uom from "@/assets/uomlogo.jpg";
import { Italic } from "lucide-react";
const TOTAL = 11;

const metricsStatusCopy: Record<SlideMetricsState["status"], string> = {
  loading: "Connecting to live research...",
  retrying: "Updating live survey metrics...",
  unavailable: "Live research data temporarily unavailable",
  success: "",
};
const unavailableMetricsMessage = metricsStatusCopy.unavailable;

// ----- helpers -----
function hasMetricValue(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatMetricPercent(value: number | undefined) {
  return hasMetricValue(value) ? `${Math.round(value)}%` : null;
}

function formatParticipants(value: number | undefined) {
  return hasMetricValue(value) ? `of ${Math.round(value)} surveyed` : null;
}

function getMetricsMessage(metricsState: SlideMetricsState) {
  return metricsState.status === "success"
    ? unavailableMetricsMessage
    : metricsStatusCopy[metricsState.status];
}

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
          right: 600,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 86,
                height: 86,
                background: "var(--brand-gradient)",
                borderRadius: 18,
                position: "relative",
                boxShadow: "0 16px 40px -12px rgba(184,0,130,.55)",
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

            <span
              style={{
                fontSize: 32,
                color: "var(--muted-foreground)",
              }}
            >
              technology
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="slide-title-xl"
          style={{
            color: "var(--brand-ink)",
            marginRight: "60px",
            marginTop: "-40px",
            lineHeight: 0.96,
          }}
        >
          <span>The Future of</span>
          <br />
          <span>Health Monitoring</span>
          <br />
          <span>Isn't Devices.</span>
          <br />
          <span className="brand-text">It's Textiles.</span>
        </h1>

        {/* Subheading */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: "-0.02em",
            marginTop: 64,
            maxWidth: 900,
            lineHeight: 1.35,
            color: "var(--muted-foreground)",
          }}
        >
          Wearable technology is moving from devices we wear
          <br />
          to garments that become the technology.
        </div>

        {/* Product video */}
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 780,
          }}
        >
          <video
            className="pdf-video"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "430px",
              borderRadius: "24px",
              boxShadow: "0 30px 80px rgba(0,0,0,.12)",
            }}
          >
            <source src={klpsVideo} type="video/mp4" />
          </video>
          <img
            className="pdf-video-fallback"
            src={garmentAsset}
            alt=""
            style={{
              width: "430px",
              borderRadius: "24px",
              boxShadow: "0 30px 80px rgba(0,0,0,.12)",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Contact */}
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
          style={{
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          emmamendez@klps.co.uk
        </div>

        <div
          style={{
            fontSize: 22,
            opacity: 0.9,
            marginTop: 6,
          }}
        >
          klps.co.uk
        </div>
      </div>
    </SlideFrame>
  );
}

function Slide02() {
  const drivers = [
    {
      title: "Graphene Materials",
      description: "- Conductive - Odorless - Washable",
    },
    {
      title: "Flexible Electronics",
      description: "- Smaller - Printable - Invisible",
    },
    {
      title: "Consumer Behaviour",
      description: "Already own smart devices",
    },
    {
      title: "Artificial Intelligence",
      description:
        "AI delivers continuous physiological signals into meaningful health insights.",
    },
  ];

  return (
    <SlideFrame variant="white" pageNumber={2} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{
          top: -120,
          right: -80,
          width: 520,
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 180,
          left: 110,
          right: 110,
        }}
      >
        <div
          className="slide-kicker"
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 10,
            paddingTop: 20,
          }}
        >
          Why This
        </div>
        <h1 className="text-6xl font-black leading-tight tracking-tight">
          <span className="text-[#22162F]">
            Future Fashion - WHAT CLOTHES CAN Actually Do!
          </span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 28,
          }}
        >
          {drivers.map((driver) => (
            <div
              key={driver.title}
              className="stat-card"
              style={{
                padding: 36,
                minHeight: 240,
              }}
            >
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: "var(--brand-magenta)",
                  marginBottom: 18,
                }}
              >
                {driver.title}
              </div>

              <div
                style={{
                  fontSize: 30,
                  lineHeight: 1.45,
                  color: "var(--brand-ink)",
                }}
              >
                {driver.description}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 30,
            padding: "34px 44px",
            borderRadius: 24,
            background:
              "linear-gradient(135deg, rgba(184,0,130,.08), rgba(255,255,255,.95))",
            border: "1px solid #eadde8",
          }}
        >
          <h1 className="text-6xl font-black leading-tight tracking-tight">
            <span className="text-[#22162F]"> Next Generation </span>

            <span className="text-[#E6A8B9]">- Woven </span>

            <span className="text-[#C67CE6]">Textiles </span>

            <span className="text-[#8A5CF6]">We Already Wear.</span>
          </h1>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 03: FOUNDER -----
function Slide03() {
  const team = [
    {
      name: "Emma Mendez",
      title: "Founder & CEO",
      statement: "Entrepreneur",
      strengths: [
        "Enterprise Software",
        "Advanced Materials",
        "FemTech Founder",
        "Entrepreneur",
      ],
    },
  ];

  return (
    <SlideFrame variant="soft" pageNumber={3} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{
          bottom: -120,
          left: -120,
          width: 520,
          opacity: 0.8,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 110,
          right: 110,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 70,
            alignItems: "center",
          }}
        >
          {/* Photo */}
          <div>
            <img
              src={headShot}
              style={{
                width: "320px",
                borderRadius: "24px",
                boxShadow: "0 30px 70px rgba(0,0,0,.12)",
              }}
            />
          </div>

          {/* Content */}
          {team.map((m) => (
            <div
              key={m.name}
              className="stat-card"
              style={{
                padding: 54,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "var(--brand-ink)",
                  letterSpacing: "-0.03em",
                }}
              >
                {m.name}
              </div>

              <div
                style={{
                  marginTop: 14,
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--brand-magenta)",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                {m.title}
              </div>

              <div
                style={{
                  marginTop: 44,
                  fontSize: 46,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: "var(--brand-ink)",
                  maxWidth: 1050,
                }}
              >
                {m.statement}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 18,
                  marginTop: 60,
                }}
              >
                {m.strengths.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "16px 28px",
                      borderRadius: 999,
                      background: "#f8eef6",
                      color: "var(--brand-magenta)",
                      fontSize: 28,
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 60,
                  fontSize: 34,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  color: "#555",
                  maxWidth: 1100,
                }}
              >
                I began working with advanced materials and wearable technology
                for film making. Then built software at KPMG for highly
                regulated organisations. NOW applying that experience to build
                intelligent textiles for women's health.
              </div>
            </div>
          ))}
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
      d: "Everyday clothing becomes a passive, non-invasive health interface.",
      media: garmentAsset,
      type: "image",
    },
    {
      n: "02",
      t: "Conductive Fabric",
      d: "Washable conductive textiles designed to retain sensing performance through everyday wear.",
      media: grapheneVideo,
      fallback: textileAsset,
      type: "video",
    },
    {
      n: "03",
      t: "Body Intelligence",
      d: "Capturing the physiological signals women actually want to understand from everyday wear.",
      media: mcuAsset,
      type: "image",
    },
    {
      n: "04",
      t: "Insight Platform",
      d: "AI transforms garment signals into personalised health insights/ A coach built into the clothing itself.",
      media: insightAsset,
      fallback: insightImageAsset,
      type: "video",
    },
  ];

  // Rotation: 0 → 1 → 2 → 3 → 0 (stop).
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const start = () => {
      timers.forEach(clearTimeout);
      timers = [];

      setActive(0);
      timers.push(setTimeout(() => setActive(1), 5000));
      timers.push(setTimeout(() => setActive(2), 10000));
      timers.push(setTimeout(() => setActive(3), 15000));
      timers.push(setTimeout(() => setActive(0), 20000));
    };

    const stop = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            start();
          } else {
            stop();
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <SlideFrame variant="white" pageNumber={4} pageTotal={TOTAL}>
      <div
        ref={rootRef}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      />

      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{
          top: -160,
          right: -120,
          width: 520,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 140,
          left: 110,
          right: 110,
        }}
      >
        <h2
          className="slide-title"
          style={{
            color: "var(--brand-ink)",
            maxWidth: 1450,
            fontSize: 78,
          }}
        >
          The <span className="brand-text">garment</span> becomes the interface.
        </h2>

        <div
          style={{
            marginTop: 42,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 28,
          }}
        >
          {steps.map((s, i) => {
            const isActive = i === active;

            return (
              <div
                key={s.n}
                style={{
                  padding: 28,
                  borderRadius: 28,
                  background: "white",
                  border: isActive
                    ? "3px solid var(--brand-magenta)"
                    : "1px solid #eadde8",
                  boxShadow: isActive
                    ? "0 35px 80px -15px rgba(184,0,130,.35)"
                    : "0 20px 50px -28px rgba(184,0,130,.18)",
                  minHeight: 510,
                  transform: isActive ? "translateY(-24px)" : "none",
                  transition:
                    "border-color 600ms ease, box-shadow 600ms ease, transform 600ms ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 230,
                    borderRadius: 18,
                    overflow: "hidden",
                    background: s.n === "01" ? "#ffffff" : "#f8eef6",
                    marginBottom: 18,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {s.type === "video" ? (
                    <>
                      <video
                        className="pdf-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: isActive ? "scale(1.03)" : "scale(1)",
                          transition: "transform 1.2s ease",
                        }}
                      >
                        <source src={s.media} type="video/mp4" />
                      </video>
                      <img
                        className="pdf-video-fallback"
                        src={s.fallback}
                        alt={s.t}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: isActive ? "scale(1.03)" : "scale(1)",
                          transition: "transform 1.2s ease",
                        }}
                      />
                    </>
                  ) : (
                    <img
                      src={s.media}
                      alt={s.t}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: s.n === "01" ? "contain" : "cover",
                        transform: isActive ? "scale(1.03)" : "scale(1)",
                        transition: "transform 1.2s ease",
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    color: "var(--brand-magenta)",
                    marginBottom: 10,
                  }}
                >
                  {s.n}
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "var(--brand-ink)",
                    marginBottom: 10,
                  }}
                >
                  {s.t}
                </div>

                <div
                  style={{
                    fontSize: 30,
                    lineHeight: 1.4,
                    color: "#5f5364",
                  }}
                >
                  {s.d}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 24,
            display: "inline-flex",
            alignItems: "center",
            gap: 28,
            padding: "14px 34px",
            borderRadius: 9999,
            background: "var(--brand-gradient)",
            color: "white",
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: "-0.02em",
          }}
        >
          Signal &nbsp;→&nbsp; Insight &nbsp;→&nbsp; Understanding
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 05: Market Opportunity -----
// function Slide05() {
//   const groups = [
//     {
//       h: "$97 Billion Femtech Market Growth By 2030-",
//       q: "NO COMPANY HAS MARRIED NON-INVASIVE, SENSING FABRIC WITH A GOAL-ORIENTED WOMEN'S PLATFORM.",
//       items: [
//         "Fibra",
//         "Flo",
//         "Clue",
//         "Hexoskin",
//         "Modibodi",
//         "Apple",
//         "Fitbit",
//         "Whoop",
//         "Oura",
//       ],
//     },
//   ];
//   return (
//     <SlideFrame variant="white" pageNumber={5} pageTotal={TOTAL}>
//       <div style={{ position: "absolute", top: 180, left: 110, width: 880 }}>
//         <div
//           className="slide-kicker"
//           style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
//         >
//           The Opportunity
//         </div>
//         <h2
//           className="slide-title"
//           style={{ color: "var(--brand-ink)", marginBottom: 0 }}
//         >
//           A New Category of Wearables.
//         </h2>
//         <div>
//           {" "}
//           <div
//             style={{ position: "absolute", top: 320, left: 200, right: -10 }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: 28,
//               }}
//             >
//               {groups.map((g) => (
//                 <div
//                   key={g.h}
//                   style={{
//                     padding: 10,
//                     marginRight: -900,
//                     borderRadius: 28,
//                     border: "1px solid #eadde8",
//                     background: "white",
//                     boxShadow: "0 18px 40px -28px rgba(184, 0, 130, 0.2)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: 42,
//                       textAlign: "center",
//                       fontWeight: 700,
//                       color: "var(--brand-magenta)",
//                       marginBottom: 14,
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     {g.h}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 42,
//                       fontWeight: 900,
//                       color: "var(--brand-magenta)",
//                       marginBottom: 14,
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     {g.q}
//                   </div>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
//                     {g.items.map((i) => (
//                       <span
//                         key={i}
//                         style={{
//                           padding: "10px 22px",
//                           borderRadius: 9999,
//                           background: "#f8eef6",
//                           color: "var(--brand-ink)",
//                           fontWeight: 600,
//                           fontSize: 24,
//                         }}
//                       >
//                         {i}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         style={{
//           position: "absolute",
//           right: 120,
//           top: 180,
//           width: 760,
//           height: 760,
//           display: "grid",
//           placeItems: "center",
//         }}
//       ></div>
//     </SlideFrame>
//   );
// }
function Slide05() {
  const today = [
    "Heart rate, sleep and activity",
    "General biometric tracking",
    "External devices you must remember to wear",
    "Data without everyday context",
    "Same metrics for everyone",
  ];

  const tomorrow = [
    "Body changes over time",
    "Bloating & abdominal changes",
    "Cycle patterns",
    "Lifestyle & habit insights",
    "Personal goals & coaching",
  ];

  return (
    <SlideFrame variant="white" pageNumber={5} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{
          top: -120,
          right: -80,
          width: 520,
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 110,
          right: 110,
        }}
      >
        <h2
          className="slide-title"
          style={{
            color: "var(--brand-ink)",
            maxWidth: 1450,
            marginBottom: 0,
            marginTop: 0,
            fontSize: 74,
          }}
        >
          The next generation of wearables
          <br />
          <span className="brand-text">
            won't be something you THINK to wear.
          </span>
          <br />
          It'll be something you already wear.
        </h2>

        <div
          className="stat-card"
          style={{
            marginTop: 15,
            marginBottom: -10,
            padding: "60px 70px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* TODAY */}
          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#8b8686",
                marginBottom: 30,
              }}
            >
              Today's Wearables
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              {today.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "26px 1fr",
                    gap: 18,
                    alignItems: "start",
                    fontSize: 32,
                    fontWeight: 600,
                    color: "#555",
                  }}
                >
                  <span style={{ color: "#999" }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 34,
                fontSize: 20,
                color: "#8b8686",
                fontStyle: "italic",
              }}
            >
              Readouts of basic biometrics that lack deep, personaliSed context
            </div>
          </div>

          {/* WHAT WOMEN ASKED FOR */}
          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--brand-magenta)",
                marginBottom: 30,
              }}
            >
              What Women Asked For
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              {tomorrow.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: 18,
                    alignItems: "start",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "var(--brand-ink)",
                  }}
                >
                  <span style={{ color: "#16a36b" }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 34,
                fontSize: 20,
                color: "#8b8686",
                fontStyle: "italic",
              }}
            >
              Based on interviews and survey responses from 44 women.
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            display: "inline-flex",
            alignItems: "center",
            padding: "14px 34px",
            borderRadius: 999,
            background: "var(--brand-gradient)",
            color: "white",
            fontWeight: 800,
            fontSize: 32,
            marginLeft: 430,
          }}
        >
          Biometrics → Understanding → Action
        </div>
      </div>
    </SlideFrame>
  );
}
// ----- 06: No one is doing this -----
function Slide06() {
  const frames = [
    {
      img: wireframeStatsAsset,
      label: "Tailored insights",
      caption: "Personalised to each user's preferences and concerns.",
    },
    {
      img: wireframeScanAsset,
      label: "A standard data set",
      caption: "Consistent measurements captured in real-time.",
    },
    {
      img: wireframeCompositionAsset,
      label: "Always-on signal",
      caption: "BLE-synced underwear builds cumulative data over time.",
    },
    {
      img: ChatToLema,
      label: "KLPS' LLM - Chat Lema",
      caption: "Data capture unique to KLPS",
    },
  ];
  const insights = [
    "Bloating",
    "Size / shape concerns",
    "Appearance concerns",
    "Weight fluctuations",
    "Hormonal changes",
  ];

  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (interval) return;
      setActive(0);
      interval = setInterval(() => {
        setActive((a) => (a + 1) % frames.length);
      }, 4500);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) start();
          else stop();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [frames.length]);

  const current = frames[active];

  return (
    <SlideFrame variant="white" pageNumber={6} pageTotal={TOTAL}>
      <div
        ref={rootRef}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      />
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -100, width: 460, opacity: 0.55 }}
      />
      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{ bottom: -180, left: -120, width: 460, opacity: 0.5 }}
      />

      <div
        style={{
          position: "absolute",
          top: 130,
          left: 110,
          right: 110,
          bottom: 140,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "stretch",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            paddingRight: 30,
            justifyContent: "flex-start",
          }}
        >
          {/* <div
            className="slide-kicker"
            style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
          >
            05 · No one else is doing this
          </div> */}
          <h2
            className="slide-title"
            style={{
              color: "var(--brand-ink)",
              marginBottom: 30,
              maxWidth: 60,
              marginRight: 110,
            }}
          >
            {" "}
            <div
              className="slide-kicker"
              style={{
                color: "var(--brand-magenta)",
                marginBottom: 10,
                paddingTop: 20,
              }}
            >
              Moat
            </div>
            Insights That <span className="brand-text">Matter</span>
          </h2>
          <p
            style={{
              fontSize: 26,
              color: "#5f5364",
              lineHeight: 1.4,
              maxWidth: 720,
              marginBottom: 32,
            }}
          >
            Our underwear connects to the software and produces insights
            gathered from our platform, where the IP lives.{" "}
          </p>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              fontWeight: 800,
              color: "var(--brand-magenta)",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Top Insights Identified
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: -10,
              maxWidth: 760,
            }}
          >
            <div
              className="slide-kicker"
              style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
            ></div>
            {insights.map((i) => (
              <span
                key={i}
                style={{
                  padding: "12px 22px",
                  borderRadius: 9999,
                  background: "#faf4f8",
                  color: "var(--brand-ink)",
                  fontWeight: 600,
                  fontSize: 22,
                  paddingLeft: 10,
                  border: "1px solid #eadce8",
                  marginBottom: 10,
                }}
              >
                {i}
              </span>
            ))}
          </div>

          {/* Rotating caption */}
          <div
            key={active}
            style={{
              padding: 28,
              borderRadius: 24,
              background: "var(--brand-gradient-soft)",
              border: "1px solid #eadce8",
              maxWidth: 720,
              animation: "fade-in 500ms ease-out",
              marginTop: 50,
            }}
          >
            <div
              style={{
                fontSize: 20,
                letterSpacing: "0.18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {String(active + 1).padStart(2, "0")} · {current.label}
            </div>
            <div
              style={{
                fontSize: 26,
                color: "var(--brand-ink)",
                lineHeight: 1.35,
                fontWeight: 500,
              }}
            >
              {current.caption}
            </div>
          </div>
        </div>

        {/* ARROW (overlaid SVG spanning both columns) */}
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "42%",
            top: "38%",
            width: 360,
            height: 260,
            pointerEvents: "none",
            overflow: "visible",
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#efbdd6" />
              <stop offset="100%" stopColor="#b80082" />
            </linearGradient>
            <marker
              id="arrowHead"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#b80082" />
            </marker>
          </defs>
          <path
            d="M 20 300 C 250 100, 500 100, 760 280"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="18 16"
            markerEnd="url(#arrowHead)"
            style={{ animation: "dash-flow 1.6s linear infinite" }}
          />
        </svg>

        {/* RIGHT - phone wireframe */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 360,
              height: 720,
              borderRadius: 56,
              background: "linear-gradient(160deg, #32243d, #201523)",
              padding: 14,
              boxShadow:
                "0 60px 120px -30px rgba(184,0,130,.5), 0 0 0 2px rgba(184,0,130,.25)",
            }}
          >
            {/* notch */}
            <div
              style={{
                position: "absolute",
                top: 18,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 22,
                borderRadius: 14,
                background: "#000",
                zIndex: 2,
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 44,
                overflow: "hidden",
                background: "white",
                position: "relative",
              }}
            >
              {frames.map((f, i) => (
                <img
                  key={i}
                  src={f.img}
                  alt={f.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.04)",
                    transition: "opacity 700ms ease, transform 900ms ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* dots */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              display: "flex",
              gap: 10,
            }}
          >
            {frames.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === active ? 32 : 10,
                  height: 10,
                  borderRadius: 9999,
                  background: i === active ? "var(--brand-magenta)" : "#e7d5e3",
                  transition: "all 400ms ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 07: Traction -----
function Slide07() {
  type Stat = {
    c: string;
    v: string;
    alt?: string;
    logo?: string;
    logos?: string[];
  };

  const stats: Stat[] = [
    {
      c: "She Builds Accelerator",
      v: "Niyo Enterprise",
      logo: niyoLogo,
      alt: "Niyo Enterprise",
    },
    {
      c: "University of Manchester · Materials Research",
      v: "UoM Henry Royce Institute",
      logo: uom,
      alt: "University of Manchester Henry Royce Institute",
    },
    {
      c: "CreaTech Frontiers Accelerator",
      v: "CreaTech. Digital Catapult",
      logos: [ctfLogo, catapultLogo],
      alt: "CreaTech Frontiers",
    },
    {
      c: "Fundraising Accelerator",
      v: "Female Founders Rise",
      logo: ffrLogo,
      alt: "Female Founders Rise",
    },
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
      <div style={{ position: "absolute", top: 160, left: 50, right: 110 }}>
        <h2
          className="slide-title"
          style={{ color: "white", marginBottom: 20, maxWidth: 1500 }}
        >
          Not Just Our Opinion.
        </h2>
        <h2
          className="slide-title"
          style={{ color: "white", marginBottom: 80, maxWidth: 1500 }}
        >
          Institutions Agree.
        </h2>
        <div
          className="slide-kicker"
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 28,
            marginTop: -60,
          }}
        >
          Momentum{" "}
        </div>
        <div
          className=""
          style={{
            color: "black",
            marginBottom: 28,
            marginTop: -10,
            fontSize: 28,
          }}
        >
          Selected by leading UK research and venture programmes validating both
          the technology and commercial opportunity.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 28,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.v}
              style={{
                position: "relative",
                padding: 44,
                borderRadius: 28,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                color: "white",
                minHeight: 480,
              }}
            >
              <div
                style={{
                  marginBottom: 40,
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.c}
              </div>
              <div
                style={{
                  marginBottom: 140,
                  fontSize: 60,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 10,
                  width: 205,
                  height: 100,
                  borderRadius: 16,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                  overflow: "hidden",
                }}
              >
                {s.logos ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: "100%",
                      height: "100%",
                      gap: 8,
                    }}
                  >
                    {s.logos.map((logo, index) => (
                      <img
                        key={index}
                        src={logo}
                        alt={s.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={s.logo}
                    alt={s.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
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
        ></div>
      </div>
    </SlideFrame>
  );
}

// ----- 08: Business Model -----
function Slide08() {
  const useOfFunds = [
    {
      title: "Build",
      items: [
        "Production-ready smart garment",
        "AI insight platform",
        "Mobile application",
      ],
    },
    {
      title: "Validate",
      items: [
        "Manufacture pilot units",
        "User testing programme",
        "Performance & clinical data",
      ],
    },
    {
      title: "Scale",
      items: [
        "Manufacturing partnerships",
        "Protect core IP",
        "Commercial launch",
      ],
    },
  ];

  return (
    <SlideFrame variant="white" pageNumber={8} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{
          top: -100,
          right: -100,
          width: 460,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 110,
          right: 110,
        }}
      >
        {/* Header */}

        <div style={{ marginBottom: 40 }}>
          <h2
            className="slide-title"
            style={{
              color: "var(--brand-ink)",
              marginBottom: 18,
            }}
          >
            {" "}
            <span className="brand-text">
              Preparing KLPS Commercial Pilots.{" "}
            </span>{" "}
            <br />
            Raising investment.
            <br />
            Transforming prototype into manufacturable consumer product
          </h2>
        </div>

        {/* Three cards */}

        {/* Bottom callout */}

        <div
          style={{
            marginTop: 34,
            padding: "34px 44px",
            borderRadius: 28,
            background: "var(--brand-gradient-soft)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: ".18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
                marginBottom: 8,
              }}
            >
              INVESTMENT
            </div>

            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "var(--brand-ink)",
                lineHeight: 1,
              }}
            >
              Seeking £250,000 SEIS
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 26,
                color: "#5f5364",
                fontWeight: 600,
              }}
            >
              18 month runway • Product • Validation • Manufacturing
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: ".18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
              }}
            >
              OUTCOME
            </div>

            <div
              style={{
                marginTop: 12,
                fontSize: 38,
                fontWeight: 800,
                color: "var(--brand-ink)",
                lineHeight: 1.3,
              }}
            >
              Ready for commercial pilots
              <br />
              and first customer revenue.
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 09: GTM -----
function Slide09() {
const allocation = [
  {
    amount: "40%",
    value: "£100k",
    title: "Build",
    desc: "TRL 4-5. University validation, engineers and smart textiles.",
  },
  {
    amount: "25%",
    value: "£62.5k",
    title: "Manufacture",
    desc: "First 200 garments ready for commercial pilots.",
  },
  {
    amount: "20%",
    value: "£50k",
    title: "Validate",
    desc: "CRL 6-7. Convert waitlist into paying pilot customers.",
  },
  {
    amount: "15%",
    value: "£37.5k",
    title: "Protect",
    desc: "Patents, legal, compliance and operating runway.",
  },
];

  return (
    <SlideFrame variant="white" pageNumber={9} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{
          top: -100,
          right: -100,
          width: 460,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 160,
          left: 110,
          right: 110,
        }}
      >
        <div
          className="slide-kicker"
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 14,
          }}
        >
          USE OF FUNDS
        </div>

        <h2
          className="slide-title"
          style={{
            color: "var(--brand-ink)",
            marginBottom: 10,
          }}
        >
          Every pound accelerates KLPS
          <span className="brand-text"> Commercial Launch.</span>
        </h2>

        <p
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#5f5364",
            maxWidth: 1250,
            lineHeight: 1.45,
            marginBottom: 0,
          }}
        >
          The investment is focused on reaching one objective: a manufacturable
          product, validated with users and ready for first commercial pilots.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 26,
          }}
        >
          {allocation.map((item) => (
            <div
              key={item.title}
              className="stat-card"
              style={{
                padding: 36,
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontSize: 82,
                    fontWeight: 900,
                    color: "var(--brand-magenta)",
                    lineHeight: 1,
                  }}
                >
                  {item.amount}
                </div>

                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "var(--brand-ink)",
                  }}
                >
                  {item.value}
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  fontSize: 34,
                  fontWeight: 800,
                  color: "var(--brand-ink)",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 27,
                  lineHeight: 1.45,
                  color: "#5f5364",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 34,
            padding: "24px 38px",
            borderRadius: 24,
            background: "var(--brand-gradient-soft)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: ".18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
                marginBottom: 6,
              }}
            >
              TARGET OUTCOME
            </div>

            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "var(--brand-ink)",
              }}
            >
              Commercial pilot ready within 18 months.
            </div>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "var(--brand-ink)",
            }}
          >
            £250k
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 10: Team -----
function Slide10() {
  const team = [
    // {
    //   n: "Emma Mendez.",
    //   r: "Founder & CEO",
    //   d: "Founder of KLPS technology. Building the wearable category for women's health.",
    // },
    {
      n: "Oyin. A",
      r: "Advisor/Angel",
      d: "Award-Winning Commercial Leadership and Deep Community Reach in Women-in-Tech.",
    },
    {
      n: "Muneeb. A",
      r: "Technical Advisor",
      d: "Specialist in LLM systems, MVP Development, and Enterprise-Scale Computer Vision Architectures.",
    },
    {
      n: "Imran. K",
      r: "Advisor",
      d: "Director | Professional Services Procurement Expert | Big 4 Advisory",
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={10} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -80, width: 460, opacity: 0.55 }}
      />
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        {/* <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          10 · The Team
        </div> */}
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 72 }}
        >
          Advisors
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
                  fontWeight: 900,
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
                  fontSize: 34,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: "#4f4554",
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

// ----- 11: Vision -----
function Slide11() {
  return (
    <SlideFrame
      variant="gradient"
      pageNumber={11}
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
          {/* <div
            className="slide-kicker"
            style={{ color: "rgba(255,255,255,0.8)", marginBottom: 40 }}
          >
            11 · Vision
          </div> */}
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
            KLPS' new category of wearable technology.
          </p>
          <p
            style={{
              fontSize: 36,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 1300,
              margin: "0 auto",
            }}
          >
            Designed for health intelligence.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}


export interface SlideMetrics {
  tummyPercent?: number;
  topConcernPercent?: number;
  commercialInterestPercent?: number;

  spentMoneyPercent?: number;
  participants?: number;
  topPricePoint?: string;
}

export type SlideMetricsStatus =
  | "loading"
  | "retrying"
  | "success"
  | "unavailable";

export interface SlideMetricsState {
  status: SlideMetricsStatus;
  data: SlideMetrics | null;
}

export interface SlideMeta {
  title: string;
  render: (metricsState: SlideMetricsState) => ReactNode;
}

export const slides: SlideMeta[] = [
  { title: "Cover", render: () => <Slide01 /> },
  {
    title: "The Problem",
    render: (metricsState) => <Slide02 />,
  },
  { title: "The Gap", render: () => <Slide03 /> },
  { title: "How it works", render: () => <Slide04 /> },
  { title: "Market Opportunity", render: () => <Slide05 /> },
  { title: "Product", render: () => <Slide06 /> },
  { title: "Traction", render: () => <Slide07 /> },
  { title: "Fund Raising", render: () => <Slide08 /> },
  { title: "Go-to-market", render: () => <Slide09 /> },
  { title: "Advisors", render: () => <Slide10 /> },
  { title: "Close", render: () => <Slide11 /> },
];
