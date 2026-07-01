import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  slides,
  type SlideMetrics,
  type SlideMetricsState,
} from "@/components/data/slides";
import { API_BASE } from "@/config/api";

const METRICS_RETRY_DELAYS_MS = [1000, 2000, 4000, 8000];

const wait = (delay: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, delay);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeoutId);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });

async function fetchResearchMetrics(
  signal: AbortSignal,
): Promise<SlideMetrics> {
  const response = await fetch(`${API_BASE}/api/research/public/metrics`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(`Metrics request failed with ${response.status}`);
  }
  return response.json();
}

export function SlideDeck() {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const scalerRef = useRef<HTMLDivElement>(null);
  const exportPoolRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex(() => {
        return Math.max(0, Math.min(total - 1, next));
      });
    },
    [total],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "f") {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, go]);

  // Responsive scaling
  useEffect(() => {
    const el = scalerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const style = window.getComputedStyle(el);
      const paddingX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const paddingY =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const w = el.clientWidth - paddingX;
      const h = el.clientHeight - paddingY;
      const s = Math.min(w / 1920, h / 1080) * 0.96;
      setScale(s);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  // Metrics
  const [metricsState, setMetricsState] = useState<SlideMetricsState>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const loadMetrics = async () => {
      for (
        let attempt = 0;
        attempt < METRICS_RETRY_DELAYS_MS.length + 1;
        attempt++
      ) {
        if (!active || controller.signal.aborted) return;

        if (attempt > 0) {
          setMetricsState((current) =>
            current.status === "retrying"
              ? current
              : { status: "retrying", data: null },
          );
        }

        try {
          const data = await fetchResearchMetrics(controller.signal);
          if (active && !controller.signal.aborted) {
            setMetricsState({ status: "success", data });
          }
          return;
        } catch (error) {
          if (controller.signal.aborted) return;
          const isFinalAttempt = attempt === METRICS_RETRY_DELAYS_MS.length;
          if (isFinalAttempt) {
            console.error("Live research metrics unavailable", error);
            if (active) {
              setMetricsState({ status: "unavailable", data: null });
            }
            return;
          }
          await wait(METRICS_RETRY_DELAYS_MS[attempt], controller.signal).catch(
            () => {},
          );
        }
      }
    };

    loadMetrics();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  // PDF export
  const exportPdf = async () => {
    if (exporting) return;
    setExportError("");
    setExporting(true);
    document.body.classList.add("pdf-export");

    try {
      const pool = exportPoolRef.current;
      if (!pool) return;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1920, 1080],
      });
      const nodes = pool.querySelectorAll<HTMLElement>("[data-export-slide]");
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const canvas = await html2canvas(node, {
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          scale: 1.2,
          backgroundColor: "#ffffff",
          useCORS: true,
        });
        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage([1920, 1080], "landscape");
        pdf.addImage(img, "JPEG", 0, 0, 1920, 1080);
      }
      const blobUrl = URL.createObjectURL(pdf.output("blob"));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "KLPS-pitch-deck.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("Could not export pitch deck PDF", error);
      setExportError(
        error instanceof Error
          ? error.message
          : "Could not export the pitch deck PDF.",
      );
    } finally {
      document.body.classList.remove("pdf-export");
      setExporting(false);
    }
  };

  // Mobile landing screen
  if (isMobile) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100svh",
            padding: "40px 24px",
            background: "linear-gradient(160deg, #1a0d24, #2d1040)",
            gap: 24,
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                background: "linear-gradient(135deg, #b80082, #7b2ff7)",
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 900,
                fontSize: 28,
                boxShadow: "0 8px 24px -4px rgba(184,0,130,0.5)",
              }}
            >
              K
            </div>
            <div>
              <div
                style={{ color: "white", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}
              >
                KLPS technology
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Investor Pitch Deck · 2026
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ maxWidth: 320 }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              The Future of Health Monitoring Is Not Devices.
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                background: "linear-gradient(135deg, #b80082, #c060a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.03em",
              }}
            >
              It is Fabrics.
            </div>
          </div>

          {/* Stats pills */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              width: "100%",
              maxWidth: 320,
              margin: "8px 0",
            }}
          >
            {[
              { v: "93%", l: "would pay for body insights" },
              { v: "77%", l: "already spending to solve this" },
              { v: "$8B", l: "smart wearable market by 2032" },
              { v: "£75k", l: "pre-seed · SEIS eligible" },
            ].map((s) => (
              <div
                key={s.v}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "14px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#e060a0",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.3,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA — PDF download */}
          <button
            onClick={exportPdf}
            disabled={exporting}
            style={{
              padding: "18px 36px",
              borderRadius: 9999,
              background: "linear-gradient(135deg, #b80082, #7b2ff7)",
              color: "white",
              fontSize: 17,
              fontWeight: 700,
              border: "none",
              cursor: exporting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 16px 40px -8px rgba(184,0,130,0.55)",
              opacity: exporting ? 0.7 : 1,
              width: "100%",
              maxWidth: 320,
              justifyContent: "center",
            }}
          >
            <Download size={20} />
            {exporting ? "Generating PDF…" : "Download Pitch Deck PDF"}
          </button>

          {exportError && (
            <div
              role="alert"
              style={{
                color: "#ff6b6b",
                fontSize: 13,
                maxWidth: 320,
                background: "rgba(255,100,100,0.1)",
                padding: "10px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,100,100,0.2)",
              }}
            >
              Export failed: {exportError}
            </div>
          )}

          {/* Secondary — landscape hint */}
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              maxWidth: 280,
              lineHeight: 1.5,
            }}
          >
            For the full interactive experience, open on a desktop or laptop
            browser. Rotate to landscape for a preview on mobile.
          </div>

          {/* Contact */}
          <div
            style={{
              marginTop: 8,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              width: "100%",
              maxWidth: 320,
            }}
          >
            <div
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6 }}
            >
              <div style={{ fontWeight: 600, color: "white", marginBottom: 4 }}>
                Emma Mendez · Founder & CEO
              </div>
              emmamendez@klps.co.uk
              <br />
              klps.co.uk
            </div>
          </div>
        </div>

        {/* Export pool still rendered for PDF generation */}
        <div
          ref={exportPoolRef}
          aria-hidden
          style={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              data-export-slide
              style={{ width: 1920, height: 1080, background: "white" }}
            >
              {s.render(metricsState)}
            </div>
          ))}
        </div>
      </>
    );
  }

  // Desktop view
  return (
    <div className="app-shell">
      {/* Stage */}
      <div
        className="scaler"
        ref={scalerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="stage" style={{ ["--scale" as never]: scale }}>
          <div
            className="track"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {slides.map((s, i) => (
              <div key={i} style={{ flex: "0 0 100%", height: "100%" }}>
                {s.render(metricsState)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom chrome */}
      <div className="deck-chrome">
        <div className="deck-meta">
          <div className="deck-brand">KLPS · Pitch Deck</div>
          <div className="deck-meta-divider" />
          <div className="deck-slide-label">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")} ·{" "}
            <span style={{ opacity: 0.7 }}>{slides[index].title}</span>
          </div>
        </div>

        <div className="deck-nav">
          <button
            className="nav-btn"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="deck-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`dot ${i === index ? "active" : ""}`}
                style={{ border: "none", cursor: "pointer", padding: 0 }}
              />
            ))}
          </div>
          <button
            className="nav-btn"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="deck-actions">
          <button
            className="nav-btn"
            onClick={() =>
              document.documentElement.requestFullscreen?.().catch(() => {})
            }
            aria-label="Enter fullscreen"
            title="Fullscreen (F)"
          >
            <Maximize2 size={18} />
          </button>
          <button
            className="pill-btn"
            onClick={exportPdf}
            disabled={exporting}
          >
            <Download size={16} />
            {exporting ? "Generating PDF…" : "Download PDF"}
          </button>
          {exportError && (
            <div role="alert" className="deck-export-error">
              Export failed: {exportError}
            </div>
          )}
        </div>
      </div>

      {/* Export pool — fixed off-screen so html2canvas can render fully */}
      <div
        ref={exportPoolRef}
        aria-hidden
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            data-export-slide
            style={{ width: 1920, height: 1080, background: "white" }}
          >
            {s.render(metricsState)}
          </div>
        ))}
      </div>
    </div>
  );
}