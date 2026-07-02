import { useEffect, useRef } from "react";

const PINK = "#D946A8";

const SoftOrbitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const dots = [
      { radius: 0.05, angle: 0.2, speed: 0.34, size: 0.018, color: "rgba(217,70,168,0.13)" },
      { radius: 0.11, angle: 1.4, speed: 0.27, size: 0.025, color: "rgba(160,140,195,0.11)" },
      { radius: 0.19, angle: 2.7, speed: 0.21, size: 0.032, color: "rgba(195,175,100,0.08)" },
      { radius: 0.28, angle: 4.1, speed: 0.15, size: 0.04, color: "rgba(217,70,168,0.07)" },
      { radius: 0.38, angle: 5.2, speed: 0.1, size: 0.052, color: "rgba(160,140,195,0.06)" },
    ];

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loopMs = 8500;
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - start) % loopMs;
      const t = elapsed / loopMs;
      const seconds = elapsed / 1000;
      const min = Math.min(width, height);
      const cx = width * 0.43;
      const cy = height * 0.5;
      const collapse = smoothstep(0.55, 0.82, t);

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);

      const warmGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, min * 0.45);
      warmGrad.addColorStop(0, `rgba(245,228,239,${0.75 * (1 - collapse)})`);
      warmGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, width, height);

      dots.forEach((dot) => {
        const orbit = dot.radius * min * (1 - collapse);
        const angle = dot.angle + dot.speed * seconds * (1 + collapse * 2);
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle) * orbit * 0.55;
        const size = dot.size * min * (1 - collapse * 0.45);

        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      const corePulse = bump(t, 0.82, 0.06);
      if (corePulse > 0.01) {
        const coreSize = min * 0.012 + corePulse * min * 0.05;
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
        coreGrad.addColorStop(0, `${hexToRgb(PINK, 0.08 + corePulse * 0.12)}`);
        coreGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default SoftOrbitBackground;

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function bump(x: number, centre: number, halfWidth: number) {
  const distance = Math.abs(x - centre) / halfWidth;
  if (distance >= 1) return 0;
  return Math.pow(1 - distance * distance, 2);
}

function hexToRgb(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
