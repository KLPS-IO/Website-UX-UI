import { useEffect, useState } from "react";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { authenticatedApi } from "@/lib/authenticated-api";
import { mvp1Blueprint } from "@/features/technology-blueprint/mvp1Blueprint";
import { TechnicalPublication } from "@/features/technology-blueprint/TechnicalPublication";
import { exportBlueprintPdf } from "@/features/technology-blueprint/exportBlueprintPdf";
import "@/features/technology-blueprint/blueprint.css";

export default function DataRoomTechnologyBlueprint() {
  const [access, setAccess] = useState<"checking" | "allowed" | "denied">(
      "checking",
    ),
    [exporting, setExporting] = useState(false),
    [progress, setProgress] = useState(0),
    [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    authenticatedApi("/api/data-room/documents")
      .then(() => setAccess("allowed"))
      .catch(() => setAccess("denied"));
  }, []);
  useEffect(() => {
    if (access !== "allowed") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setActiveSection(visible.target.id.replace("section-", ""));
      },
      { rootMargin: "-15% 0px -65%", threshold: [0, 0.15, 0.4] },
    );
    const sections = document.querySelectorAll(".blueprint-section");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [access]);
  useEffect(() => {
    const update = () => {
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (access === "checking")
    return (
      <main className="blueprint-shell grid min-h-screen place-items-center text-sm">
        Checking Data Room access…
      </main>
    );
  if (access === "denied")
    return (
      <main className="blueprint-shell blueprint-access-state grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl">Authorised Data Room access required</h1>
          <p className="mt-3">
            Sign in and accept the current NDA to view this confidential
            engineering record.
          </p>
          <Link
            className="mt-6 inline-block rounded border px-4 py-2"
            to="/data-room"
          >
            Return to Data Room
          </Link>
        </div>
      </main>
    );
  const download = async () => {
    setExporting(true);
    try {
      await exportBlueprintPdf(mvp1Blueprint);
    } finally {
      setExporting(false);
    }
  };
  return (
    <main className="blueprint-shell">
      <nav className="blueprint-nav" aria-label="Technology Blueprint controls">
        <div className="blueprint-nav-inner">
          <Link to="/data-room">
            <ArrowLeft className="inline h-4 w-4" />{" "}
            <span className="label">Documents</span>
          </Link>
          <select
            aria-label="Jump to section"
            value={activeSection}
            onChange={(event) => {
              if (event.target.value)
                document
                  .getElementById(`section-${event.target.value}`)
                  ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <option value="">Jump to section…</option>
            {mvp1Blueprint.sections.map((section) => (
              <option key={section.number} value={section.number}>
                {section.number} — {section.title}
              </option>
            ))}
          </select>
          <span className="spacer" />
          <button type="button" onClick={() => window.print()}>
            <Printer className="inline h-4 w-4" />{" "}
            <span className="label">Print</span>
          </button>
          <button
            type="button"
            disabled={exporting}
            onClick={() => void download()}
          >
            <Download className="inline h-4 w-4" />{" "}
            <span className="label">
              {exporting ? "Preparing…" : "Download PDF"}
            </span>
          </button>
        </div>
        <div
          className="blueprint-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </nav>
      <TechnicalPublication document={mvp1Blueprint} />
    </main>
  );
}
