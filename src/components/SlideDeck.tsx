import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { slides } from "@/components/data/slides";
import { API_BASE } from "@/config/api";

export function SlideDeck() {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const scalerRef = useRef<HTMLDivElement>(null);
  const exportPoolRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((i) => {
        const n = Math.max(0, Math.min(total - 1, next));
        return n;
      });
    },
    [total],
  );

  // keyboard
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

  // responsive scaling
  useEffect(() => {
    const el = scalerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 1920, h / 1080) * 0.94;
      setScale(s);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // touch swipe
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

  const [metrics, setMetrics] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/research/public/metrics`)
      .then((r) => r.json())
      .then((data) => {
        setMetrics(data);
      })
      .catch(console.error);
  }, []);

  // PDF export
  const exportPdf = async () => {
    if (exporting) return;
    setExportError("");
    setExporting(true);
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
      setExporting(false);
    }
  };

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
                {s.render(metrics)}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom chrome */}
      <div
        style={{
          padding: "20px 28px 24px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: 0.8,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            KLPS · Pitch Deck
          </div>
          <div
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div style={{ fontSize: 13 }}>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")} ·{" "}
            <span style={{ opacity: 0.7 }}>{slides[index].title}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            className="nav-btn"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              padding: "0 6px",
            }}
          >
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

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
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
          <button className="pill-btn" onClick={exportPdf} disabled={exporting}>
            <Download size={16} />
            {exporting ? "Generating PDF…" : "Download PDF"}
          </button>
          {exportError && (
            <div
              role="alert"
              style={{
                alignSelf: "center",
                maxWidth: 260,
                color: "rgba(255,255,255,0.82)",
                fontSize: 12,
                lineHeight: 1.35,
              }}
            >
              Export failed: {exportError}
            </div>
          )}
        </div>
      </div>

      {/* Hidden export pool — renders all slides at native 1920x1080 for capture */}
      <div className="export-pool" ref={exportPoolRef} aria-hidden>
        {slides.map((s, i) => (
          <div
            key={i}
            data-export-slide
            style={{ width: 1920, height: 1080, background: "white" }}
          >
            {s.render(metrics)}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
