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
const TOTAL = 14;

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
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-390px",
          }}
        >
          <video
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
      description:
        "Flexible conductive textiles make sensing possible without bulky wearable devices.",
    },
    {
      title: "Flexible Electronics",
      description:
        "Electronics are becoming smaller, printable and increasingly invisible inside everyday products.",
    },
    {
      title: "Consumer Behaviour",
      description:
        "Millions already wear smart watches and rings. The next evolution is technology woven into clothing they already wear every day.",
    },
    {
      title: "Artificial Intelligence",
      description:
        "AI can now transform continuous physiological signals into meaningful health insights.",
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
          top: 150,
          left: 110,
          right: 110,
        }}
      >
        <div
          className="slide-kicker"
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 24,
          }}
        >
          Why Now?
        </div>

        <h2
          className="slide-title"
          style={{
            color: "var(--brand-ink)",
            maxWidth: 1300,
            marginBottom: 24,
            fontSize: 78,
          }}
        >
          The future of fashion isn't just what you wear, but what your clothes
          can actually do.
        </h2>

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
            marginTop: 80,
            padding: "34px 44px",
            borderRadius: 24,
            background:
              "linear-gradient(135deg, rgba(184,0,130,.08), rgba(255,255,255,.95))",
            border: "1px solid #eadde8",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "var(--brand-ink)",
              lineHeight: 1.35,
            }}
          >
            The next generation of wearable technology won't be another device.
            <span className="brand-text">
              {" "}
              It will be woven into the textiles people already wear.
            </span>
          </div>
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
      statement:
        "My experience in enterprise software, advanced materials and women's health uniquely combines all three in KLPS.",
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
                My career began with working with advanced materials and
                wearable technology, in VR film making, before I built
                enterprise grade software at KPMG for highly regulated
                organisations. Today, I'm applying that experience to build the
                future of intelligent textiles for women's health.
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
                    <video
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
    "Habits affecting my symptoms",
    "Patterns I might be missing",
    "My personal baseline",
    "Food & nutrition insights",
    "Trigger detection",
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
            marginLeft: 500,
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
            marginTop: -40,
          }}
        >
          Traction
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
  return (
    <SlideFrame variant="white" pageNumber={8} pageTotal={TOTAL}>
      <img
        src={blobSpiral}
        alt=""
        className="blob"
        style={{ top: -100, right: -100, width: 460, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", top: 160, left: 110, right: 110 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2
            className="slide-title"
            style={{ color: "var(--brand-ink)", marginBottom: 14 }}
          >
            Hardware <span className="brand-text">+</span> Intelligence.
          </h2>
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#5f5364",
              maxWidth: 1300,
              lineHeight: 1.4,
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            WHOOP charges £30/month. Oura sells at £399. No one has built this
            for the body part that matters most.{" "}
            <span style={{ color: "var(--brand-magenta)" }}>
              We are first. And we intend to own it.
            </span>
          </p>
        </div>

        {/* Revenue cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
        >
          {/* Card 1 — Garment */}
          <div
            style={{
              padding: 44,
              borderRadius: 28,
              background: "var(--brand-gradient-soft)",
              minHeight: 340,
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
                wordSpacing: "0.05em",
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
                lineHeight: 1,
              }}
            >
              £249 – £399
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#5f5364",
                marginTop: 8,
                lineHeight: 1.4,
              }}
            >
              Consumer entry to performance tier.
              <br />
              COGS £37–52 at scale. Margin 68–78%.
            </div>
          </div>

          {/* Card 2 — Subscription */}
          <div
            style={{
              padding: 44,
              borderRadius: 28,
              background: "var(--brand-gradient)",
              color: "white",
              minHeight: 340,
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
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                marginTop: 16,
              }}
            >
              Insight Subscription Platform
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                marginTop: 24,
                lineHeight: 1,
              }}
            >
              £20 – £30
            </div>
            <div
              style={{
                fontSize: 22,
                opacity: 0.85,
                marginTop: 8,
                lineHeight: 1.4,
              }}
            >
              per user / month.
              <br />
              Year 1 LTV per customer: £759. 2-yr LTV: £1,119.
            </div>
          </div>
        </div>

        {/* Enterprise + bottom tags */}
        <div
          style={{
            marginTop: 20,
            padding: "22px 36px",
            borderRadius: 28,
            background: "var(--brand-gradient-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.18em",
                fontWeight: 800,
                color: "var(--brand-magenta)",
                marginBottom: 6,
              }}
            >
              REVENUE STREAM · 03
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "var(--brand-ink)",
              }}
            >
              Enterprise B2B · Military · Elite Sport · Corporate Wellness
            </div>
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--brand-ink)",
              flexShrink: 0,
            }}
          >
            £550 – £750
          </div>
        </div>

        {/* Bottom pills */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            "Textile collaborations",
            "Healthcare partnerships",
            "Institutional licensing",
            "Data API access",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "14px 28px",
                borderRadius: 9999,
                border: "1px solid #d8bed4",
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
      p: "Now",
      t: "Prototype Validation",
      n: "Moving from TRL-3 to 4. Fundraising pre-seed to access labs for validating CRL-4 - 5",
    },
    {
      p: "Q1 2027",
      t: "Pilot Waitlist Live",
      n: "Waitlist open. Actively growing early adopters",
    },
    {
      p: "Q3 2027",
      t: "Commercial Launch",
      n: "First sales to 50 early adopters",
    },
    {
      p: "2028",
      t: "Platform Expansion",
      n: "Moving to TRL-5 and CRL-5 ",
    },
  ];
  return (
    <SlideFrame variant="white" pageNumber={9} pageTotal={TOTAL}>
      <div style={{ position: "absolute", top: 220, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{ color: "var(--brand-magenta)", marginBottom: 28 }}
        >
          Roadmap
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 80 }}
        >
          Path to scale.
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
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 300,
                  color: "var(--brand-ink)",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {ph.n}
              </div>
              <div style={{ fontSize: 22, color: "#5f5364" }}></div>
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
    { t: "£75,000", q: "Pre-seed · Investment" },
    { t: " Conductive Fabric IP Development", q: "£15k R&D" },
    { t: " Early Testers and Waitlist Onboarding", q: "£25k TRL-4 Marketing" },
    { t: " Strategy, Legal and Insight Platform Build", q: "35k Overheads" },
    { t: "Pilot Scaled to First 200 Users", q: "2028 CRL-5" },
  ];
  return (
    <SlideFrame variant="soft" pageNumber={10} pageTotal={TOTAL}>
      <img
        src={blobRing}
        alt=""
        className="blob"
        style={{ top: -120, right: -120, width: 480, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", top: 70, left: 110, right: 110 }}>
        <div
          className="slide-kicker"
          style={{
            color: "var(--brand-magenta)",
            marginTop: 28,
            marginLeft: 1400,
            marginBottom: 30,
          }}
        >
          The Ask
        </div>
        <h2
          className="slide-title"
          style={{ color: "var(--brand-ink)", marginBottom: 24 }}
        >
          We've Validated the Demand. <br />
          Now We Build It.{" "}
        </h2>
        <div style={{ marginTop: 30, display: "grid", gap: 18 }}>
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
                boxShadow: "0 14px 40px -28px rgba(184, 0, 130, 0.2)",
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
    <SlideFrame variant="white" pageNumber={11} pageTotal={TOTAL}>
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
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 10,
            fontSize: 40,
            marginTop: -70,
            fontStyle: "italic",
            fontWeight: 160,
          }}
        >
          Every woman wearing an Oura Ring or a WHOOP Strap
        </div>
        <div
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 10,
            fontSize: 40,
            marginTop: -20,
            fontStyle: "italic",
            fontWeight: 160,
          }}
        >
          {" "}
          already buys into 'insight' technology!{" "}
        </div>
        <div
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 10,
            fontSize: 40,
            marginTop: -20,
            fontStyle: "italic",
            fontWeight: 160,
          }}
        >
          {" "}
          Just in the wrong place.
        </div>
        <div
          style={{
            color: "var(--brand-magenta)",
            marginBottom: 10,
            fontSize: 40,
            marginTop: -20,
            fontStyle: "italic",
            fontWeight: 160,
          }}
        >
          {" "}
          The richest data zone is NOT her wrist. It never was.{" "}
        </div>
        <h2 className="slide-title-xl" style={{ color: "var(--brand-ink)" }}>
          The Question is Who
          <br />
          Builds It? <span className="brand-text">I AM</span>
        </h2>
        <div style={{ marginTop: 80, display: "grid", gap: 18 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "var(--brand-ink)",
              wordSpacing: "0.08em",
              whiteSpace: "normal",
              letterSpacing: "0",
            }}
          >
            Backed by Research. Powered by Breakthrough Materials. Validated by
            Women. 93% of Women Surveyed Would Pay for Personalised Insights.
            KLPS is Building the Future of Women's Health. This is Your Moment
            to be Part of it.
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

// ----- 14: The Competitor -----
function Slide14() {
  const competitorGaps = [
    "Graphene - uses cotton yarn",
    "Shapewear - clinical underwear only",
    "Women, mums & families - fertility focus only",
    "Whole-body goals platform - no bloating, weight, habits",
    "UK market presence",
  ];

  const klpsAdvantages = [
    "Graphene-native conductivity - stronger IP moat",
    "Shapewear - fashion-grade, women already buying",
    "Women, mums & families - not fertility only",
    "Goals platform - habits, bloating, weight, cycle in one",
    "UK-first, SEIS-backed, UoM graphene research access",
  ];

  return (
    <SlideFrame variant="white" pageNumber={14} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -80, width: 520, opacity: 0.55 }}
      />
      <div
        className="stat-card"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 300,
          width: 1660,
          padding: "44px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          alignItems: "start",
          textAlign: "left",
          background: "rgba(255,255,255,0.82)",
          border: "1px solid #eadde8",
          boxShadow: "0 24px 70px -38px rgba(60, 20, 90, 0.35)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: -150,
            width: 1660,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 800,
              color: "#8b8686",
              marginBottom: 16,
            }}
          >
            Competitive Position
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--brand-ink)",
            }}
          >
            Why KLPS Wins{" "}
          </div>
        </div>
        {/* Column 1 — Fibra */}
        <div style={{ paddingRight: 56, borderRight: "1px solid #eadde8" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 800,
              color: "#8b8686",
              marginBottom: 20,
            }}
          >
            Fibra · Canada
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              fontWeight: 600,
              color: "#4f4b4b",
              marginBottom: 28,
            }}
          >
            Focused reproductive health platform. Cotton yarn sensors.
            Medical-adjacent. Not in UK.
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {competitorGaps.map((gap) => (
              <div
                key={gap}
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",
                  gap: 14,
                  alignItems: "start",
                  color: "#4f4b4b",
                  fontSize: 29,
                  lineHeight: 1.18,
                  fontWeight: 650,
                }}
              >
                <span style={{ color: "#e33d76", fontWeight: 400 }}>✗</span>
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 — KLPS */}
        <div style={{ paddingLeft: 56 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 800,
              color: "#e33d76",
              marginBottom: 20,
            }}
          >
            KLPS · UK
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              fontWeight: 600,
              color: "#4f4b4b",
              marginBottom: 28,
            }}
          >
            Graphene shapewear and goals platform for women, mums and families.
            Bloating, hormones, weight, habits - the whole picture.
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {klpsAdvantages.map((advantage) => (
              <div
                key={advantage}
                style={{
                  display: "grid",
                  gridTemplateColumns: "26px 1fr",
                  gap: 14,
                  alignItems: "start",
                  color: "#4f4b4b",
                  fontSize: 29,
                  lineHeight: 1.15,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: "#119c67", fontWeight: 700 }}>✓</span>
                <span>{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ----- 15: The Stats -----
function Slide15({ metricsState }: { metricsState: SlideMetricsState }) {
  const metrics = metricsState.data;
  const metricsMessage = getMetricsMessage(metricsState);
  const interest = formatMetricPercent(metrics?.commercialInterestPercent);

  return (
    <SlideFrame variant="white" pageNumber={14} pageTotal={TOTAL}>
      <img
        src={blobPink}
        alt=""
        className="blob"
        style={{ top: -120, right: -80, width: 520, opacity: 0.55 }}
      />
      <h2
        className="slide-title"
        style={{
          color: "var(--brand-ink)",
          marginLeft: 100,
          fontSize: 60,
          fontWeight: 290,
          paddingRight: 10,
          paddingTop: 620,
        }}
      >
        <span className="brand-text italic">
          {
            "'If a solution gave you insights into your body, would you consider paying for it?'"
          }
          <br />
          {interest ? (
            <>
              <strong>{interest}</strong> of women surveyed said{" "}
              <strong>"Yes"</strong> or <strong>"Maybe"</strong>.
            </>
          ) : (
            <strong>{metricsMessage}</strong>
          )}
        </span>
      </h2>
      {/* Top row */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {[
          {
            value: "£75k",
            label: "Pre-Seed",
            description: "SEIS Eligible",
          },
          {
            value: interest ?? metricsMessage,
            label: interest ? "of Women" : "",
            description: "Would Pay For Personalised Body Insights",
          },
        ].map((row) => (
          <div
            key={`${row.value}-${row.description}`}
            className="stat-card"
            style={{
              padding: 36,
              display: "flex",
              flexDirection: "column",
              width: 520,
              height: 360,
            }}
          >
            <div style={{ height: 150 }}>
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 700,
                  color: "var(--brand-ink)",
                }}
              >
                {row.value}
              </div>

              {row.label && (
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: "var(--brand-ink)",
                    marginTop: 8,
                  }}
                >
                  {row.label}
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: 37,
                fontWeight: 600,
                color: "var(--brand-magenta)",
                lineHeight: 1.3,
              }}
            >
              {row.description}
            </div>
          </div>
        ))}
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
  { title: "Landscape", render: () => <Slide06 /> },
  { title: "Traction", render: () => <Slide07 /> },
  { title: "Business Model", render: () => <Slide08 /> },
  { title: "Go-to-market", render: () => <Slide09 /> },
  { title: "Roadmap", render: () => <Slide10 /> },
  { title: "Team", render: () => <Slide11 /> },
  { title: "Vision", render: () => <Slide12 /> },
  { title: "Build it", render: () => <Slide13 /> },
  { title: "Competitors", render: () => <Slide14 /> },
];
