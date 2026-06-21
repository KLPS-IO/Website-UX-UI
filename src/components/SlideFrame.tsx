import type { ReactNode } from "react";
import { Logo } from "./PitchDeckLogo";

interface SlideFrameProps {
  children: ReactNode;
  variant?: "white" | "gradient" | "soft" | "split";
  pageNumber?: number;
  pageTotal?: number;
  showLogo?: boolean;
  logoLight?: boolean;
  showFooter?: boolean;
  footerLight?: boolean;
  showWatermark?: boolean;
}

export function SlideFrame({
  children,
  variant = "white",
  pageNumber,
  pageTotal,
  showLogo = true,
  logoLight = false,
  showFooter = true,
  footerLight = false,
  showWatermark = true,
}: SlideFrameProps) {
  const className =
    "slide " +
    (variant === "gradient"
      ? "slide-gradient"
      : variant === "soft"
        ? "slide-soft"
        : variant === "split"
          ? "slide-split"
          : "");
  return (
    <section className={className}>
      {showWatermark && <div className="watermark">CONFIDENTIAL — KLPS LTD</div>}
      {showLogo && (
        <div className="absolute" style={{ top: 64, left: 80, zIndex: 5 }}>
          <Logo light={logoLight} />
        </div>
      )}
      <div className="slide-content">{children}</div>
      {showFooter && (
        <div
          className="absolute slide-chrome"
          style={{
            bottom: 48,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            color: footerLight ? "rgba(255,255,255,0.7)" : "rgba(30,15,45,0.55)",
            zIndex: 5,
          }}
        >
          <span>KLPS.CO.UK</span>
          <span>Confidential — For Authorised Recipient Only</span>
          {pageNumber && pageTotal ? (
            <span>
              {String(pageNumber).padStart(2, "0")} / {String(pageTotal).padStart(2, "0")}
            </span>
          ) : (
            <span />
          )}
        </div>
      )}
    </section>
  );
}
