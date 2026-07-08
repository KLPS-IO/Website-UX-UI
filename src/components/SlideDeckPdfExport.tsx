import { useEffect, useState } from "react";
import {
  slides,
  type SlideMetrics,
  type SlideMetricsState,
} from "@/components/data/slides";
import { API_BASE } from "@/config/api";

declare global {
  interface Window {
    __KLPS_PDF_EXPORT_READY__?: boolean;
  }
}

async function fetchResearchMetrics(): Promise<SlideMetrics> {
  const response = await fetch(`${API_BASE}/api/research/public/metrics`);
  if (!response.ok) {
    throw new Error(`Metrics request failed with ${response.status}`);
  }
  return response.json();
}

export function SlideDeckPdfExport() {
  const [metricsState, setMetricsState] = useState<SlideMetricsState>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    let active = true;

    fetchResearchMetrics()
      .then((data) => {
        if (active) setMetricsState({ status: "success", data });
      })
      .catch((error) => {
        console.warn("Exporting pitch deck without live metrics", error);
        if (active) setMetricsState({ status: "unavailable", data: null });
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    window.__KLPS_PDF_EXPORT_READY__ = false;

    const markReady = async () => {
      await document.fonts.ready;

      const images = Array.from(document.images);
      await Promise.all(
        images.map((image) => {
          if (image.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }),
      );

      await Promise.all(
        Array.from(document.querySelectorAll("video")).map(async (video) => {
          video.muted = true;
          video.currentTime = Math.min(0.2, video.duration || 0.2);
          await video.play().catch(() => undefined);
          video.pause();
        }),
      );

      window.__KLPS_PDF_EXPORT_READY__ = true;
    };

    markReady().catch((error) => {
      console.warn("Pitch deck export readiness check failed", error);
      window.__KLPS_PDF_EXPORT_READY__ = true;
    });
  }, [metricsState.status]);

  return (
    <main className="pdf-export-document" aria-label="KLPS pitch deck PDF export">
      {slides.map((slide, index) => (
        <section className="pdf-export-page" key={`${slide.title}-${index}`}>
          {slide.render(metricsState)}
        </section>
      ))}
    </main>
  );
}
