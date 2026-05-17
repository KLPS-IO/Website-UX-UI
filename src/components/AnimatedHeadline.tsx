import { useEffect, useRef } from "react";

interface AnimatedHeadlineProps {
  lines: { text: string; italic?: boolean; muted?: boolean }[];
  className?: string;
}

// Renders each word as a particle/dot cloud that flows in on a sine wave,
// then coalesces into crisp typography. Inspired by audio-wave particle fields.
function WordParticles({
  word,
  delay,
  italic,
  muted,
}: {
  word: string;
  delay: number;
  italic?: boolean;
  muted?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const text = textRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !text || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let startTime = 0;
    const DURATION = 1400; // ms per-word reveal

    // Measure word and rasterize to sample target points
    const rect = text.getBoundingClientRect();
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);
    if (w === 0 || h === 0) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Offscreen rasterization to get pixel mask of the word
    const off = document.createElement("canvas");
    off.width = w * dpr;
    off.height = h * dpr;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.scale(dpr, dpr);
    const cs = window.getComputedStyle(text);
    octx.fillStyle = "#fff";
    octx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    octx.textBaseline = "alphabetic";
    // baseline approx: use font size; align to bottom with small padding
    const fontSizePx = parseFloat(cs.fontSize);
    octx.fillText(word, 0, fontSizePx * 0.85);

    const img = octx.getImageData(0, 0, w * dpr, h * dpr).data;
    const targets: { x: number; y: number }[] = [];
    const step = Math.max(3, Math.round(fontSizePx / 14));
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = ((y * dpr | 0) * (w * dpr) + (x * dpr | 0)) * 4;
        if (img[i + 3] > 128) targets.push({ x, y });
      }
    }

    // Particles start scattered to the left in a wave field
    type P = {
      tx: number; ty: number;
      sx: number; sy: number;
      phase: number; amp: number; freq: number;
    };
    // Wavelength: how the wave varies across X (spatial frequency)
    const wavelength = w * 1.2; // one full wave across ~1.2x word width
    const k = (Math.PI * 2) / wavelength;
    const particles: P[] = targets.map((t) => ({
      tx: t.x,
      ty: t.y,
      sx: -w * 1.2 - Math.random() * w * 1.4,
      sy: t.y + (Math.random() - 0.5) * h * 0.9,
      phase: t.x * k + Math.random() * 0.6,
      amp: h * (0.9 + Math.random() * 0.8),
      freq: 0.018 + Math.random() * 0.012,
    }));

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime - delay;
      ctx.clearRect(0, 0, w, h);

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const p = Math.min(1, elapsed / DURATION);
      const e = easeOut(p);

      ctx.fillStyle = `rgba(245,245,250,${0.35 + 0.65 * e})`;
      for (const pt of particles) {
        // wave incoming position
        const waveX = pt.sx + (pt.tx - pt.sx) * e;
        const waveY =
          pt.sy +
          (pt.ty - pt.sy) * e +
          Math.sin(now * pt.freq + pt.phase) * pt.amp * (1 - e);
        ctx.fillRect(waveX, waveY, 1.2, 1.2);
      }

      if (p >= 1) {
        // Reveal real text, hide canvas
        text.style.opacity = "1";
        canvas.style.opacity = "0";
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    text.style.opacity = "0";
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [word, delay]);

  return (
    <span
      ref={wrapRef}
      className={`relative inline-block align-baseline ${italic ? "italic" : ""} ${muted ? "text-muted-foreground" : ""}`}
    >
      <span
        ref={textRef}
        className="inline-block transition-opacity duration-500"
        style={{ opacity: 0 }}
      >
        {word}
      </span>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute left-0 top-0 transition-opacity duration-500"
      />
    </span>
  );
}

export function AnimatedHeadline({ lines, className }: AnimatedHeadlineProps) {
  const PER_WORD = 180;
  let wordIndex = 0;
  return (
    <h1 className={className}>
      {lines.map((line, li) => {
        const words = line.text.split(" ");
        return (
          <span key={li} className="block">
            {words.map((word, wi) => {
              const delay = wordIndex * PER_WORD;
              wordIndex++;
              return (
                <span key={`${li}-${wi}`}>
                  <WordParticles
                    word={word}
                    delay={delay}
                    italic={line.italic}
                    muted={line.muted}
                  />
                  {wi < words.length - 1 && " "}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
