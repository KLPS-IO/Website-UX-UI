import type {
  BlueprintFigure,
  EngineeringDecision as DecisionType,
  EngineeringObservation as ObservationType,
  TechnologyBlueprint,
} from "./types";
import { useEffect, useState } from "react";

const badgeColours = {
  PROVEN: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
  OBSERVED: "border-sky-500/30 text-sky-300 bg-sky-500/10",
  "IN DEVELOPMENT": "border-amber-500/30 text-amber-300 bg-amber-500/10",
  PLANNED: "border-slate-500/30 text-slate-300 bg-slate-500/10",
};
export const EvidenceBadge = ({
  state,
}: {
  state: keyof typeof badgeColours;
}) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[.16em] ${badgeColours[state]}`}
  >
    {state}
  </span>
);
export function EngineeringDecision({ value }: { value: DecisionType }) {
  return (
    <aside className="blueprint-callout">
      <div className="blueprint-kicker">Engineering decision</div>
      <h4>{value.decision}</h4>
      <p>{value.reason}</p>
      <dl>
        {value.alternatives.length > 0 && (
          <>
            <dt>Alternatives</dt>
            <dd>{value.alternatives.join(" · ")}</dd>
          </>
        )}
        <dt>Trade-off</dt>
        <dd>{value.tradeOff}</dd>
        <dt>Evidence</dt>
        <dd>{value.evidenceIds.join(", ")}</dd>
      </dl>
    </aside>
  );
}
export function EngineeringObservation({ value }: { value: ObservationType }) {
  return (
    <aside className="blueprint-callout">
      <div className="blueprint-kicker">Engineering observation</div>
      <h4>{value.observation}</h4>
      <p>{value.context}</p>
      <dl>
        <dt>Implication</dt>
        <dd>{value.implication}</dd>
        <dt>Evidence</dt>
        <dd>{value.evidenceIds.join(", ")}</dd>
      </dl>
    </aside>
  );
}
function SystemArchitecture() {
  const stages = [
    ["Conductive textile", "Physical sensing region"],
    ["Removable connection", "Press studs and prototype wiring"],
    ["Arduino Nano 33 BLE Sense Rev2", "Development measurement hardware"],
    ["Firmware measurement", "Baseline and stretch response"],
    ["BLE / data-capture exploration", "Not a validated telemetry pipeline"],
  ];
  return (
    <div
      className="blueprint-architecture"
      aria-label="Evidenced MVP1 system architecture"
    >
      <div className="blueprint-architecture-track">
        {stages.map(([title, note], index) => (
          <div className="blueprint-architecture-stage" key={title}>
            <span>{title}</span>
            <i>{note}</i>
            {index < stages.length - 1 && <b aria-hidden="true">↓</b>}
          </div>
        ))}
      </div>
      <div className="blueprint-architecture-boundary">
        Evidenced prototype boundary
      </div>
      <div className="blueprint-architecture-software">
        <strong>Supporting research infrastructure</strong>
        <span>React / TypeScript</span>
        <span>Express / TypeScript</span>
        <span>PostgreSQL</span>
        <span>Private Cloudflare R2</span>
        <span>Railway</span>
        <small>
          Supports research records and evidence. It is not presented as
          embedded-device infrastructure.
        </small>
      </div>
    </div>
  );
}
export function EvidenceFigure({ figure }: { figure: BlueprintFigure }) {
  const [enlarged, setEnlarged] = useState(false);
  useEffect(() => {
    if (!enlarged) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnlarged(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [enlarged]);
  return (
    <figure
      id={`figure-${figure.figureNumber.replace(".", "-")}`}
      className="blueprint-figure"
    >
      <button
        type="button"
        className="blueprint-figure-image"
        onClick={() => setEnlarged(true)}
        aria-label={`Enlarge Figure ${figure.figureNumber}`}
      >
        <img src={figure.asset} alt={figure.caption} loading="eager" />
      </button>
      <figcaption>
        <div className="blueprint-caption-head">
          <strong>Figure {figure.figureNumber} · {figure.classification}</strong>
        </div>
        <p>{figure.caption}</p>
        {figure.callouts && (
          <ul className="blueprint-figure-callouts">
            {figure.callouts.map((callout) => (
              <li key={callout}>{callout}</li>
            ))}
          </ul>
        )}
        <small>Evidence: {figure.evidenceIds.join(", ")}</small>
      </figcaption>
      {enlarged && (
        <div
          className="blueprint-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Figure ${figure.figureNumber}`}
          onClick={() => setEnlarged(false)}
        >
          <button type="button" aria-label="Close enlarged figure">
            Close
          </button>
          <img src={figure.asset} alt={figure.caption} />
          <p>
            Figure {figure.figureNumber} · {figure.caption}
          </p>
        </div>
      )}
    </figure>
  );
}
export function TechnicalPublication({
  document,
}: {
  document: TechnologyBlueprint;
}) {
  const figures = new Map(
    document.figures.map((figure) => [figure.figureNumber, figure]),
  );
  return (
    <article
      id="technology-blueprint-publication"
      className="blueprint-publication"
    >
      <header className="blueprint-cover">
        <div className="blueprint-kicker">KLPS · Technology publication</div>
        <h1>{document.metadata.document}</h1>
        <h2>{document.metadata.documentType}</h2>
        <p>Scientific Hypothesis → MVP1 → Next Engineering Gates</p>
        <dl>
          {Object.entries(document.metadata)
            .filter(([key]) =>
              ["version", "date", "workPackage", "technologyReadiness", "confidentiality"].includes(key),
            )
            .map(([key, value]) => (
              <div key={key}>
                <dt>{key.replace(/([A-Z])/g, " $1")}</dt>
                <dd>
                  {key === "technologyReadiness" ? "TRL 3" : value}
                </dd>
              </div>
            ))}
        </dl>
      </header>
      {document.sections.map((section) => (
        <section
          id={`section-${section.number}`}
          key={section.number}
          className={`blueprint-section blueprint-layout-${section.layoutVariant ?? "standard"}`}
        >
          <div className="blueprint-section-head">
            <h2>{section.title}</h2>
            <EvidenceBadge state={section.state} />
          </div>
          <div className="blueprint-question">
            <span>{section.questionLabel ?? "Question"}</span>
            {section.question}
          </div>
          {section.heroStatement && (
            <p className="blueprint-hero-statement">{section.heroStatement}</p>
          )}
          {section.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.layoutVariant === "architecture" && <SystemArchitecture />}
          {section.evolutionSteps && (
            <div
              className="blueprint-evolution"
              aria-label="Prototype evolution"
            >
              {section.evolutionSteps.map((step) => (
                <article key={step.figureId}>
                  {figures.get(step.figureId) && (
                    <EvidenceFigure figure={figures.get(step.figureId)!} />
                  )}
                  <div>
                    <strong>{step.stage}</strong>
                    <a href={`#figure-${step.figureId.replace(".", "-")}`}>
                      Figure {step.figureId}
                    </a>
                  </div>
                  <dl>
                    <dt>Changed</dt>
                    <dd>{step.changed}</dd>
                    <dt>Learning</dt>
                    <dd>{step.learned}</dd>
                    <dt>Open</dt>
                    <dd>{step.unresolved}</dd>
                  </dl>
                </article>
              ))}
            </div>
          )}
          {section.figureIds && (
            <div className={section.number === "12" ? "blueprint-figures blueprint-software-screens" : "blueprint-figures"}>
              {section.figureIds
                .map((id) => figures.get(id))
                .filter(Boolean)
                .map((figure, index) => (
                  <div key={figure!.figureNumber} className="blueprint-figure-wrap">
                    {section.number === "12" && (
                      <div className="blueprint-screen-label">
                        <span>{["Measurement", "Progress", "Daily understanding"][index]}</span>
                        <strong>{["Body Scan", "Statistics", "Daily engagement"][index]}</strong>
                      </div>
                    )}
                    <EvidenceFigure figure={figure!} />
                  </div>
                ))}
            </div>
          )}
          {section.number === "12" && (
            <p className="blueprint-group-evidence-note">
              Interface concepts only. These screens do not represent validated physiological outputs or a validated sensor-ingestion pipeline.
            </p>
          )}
          {section.comparison && (
            <div className="blueprint-comparison">
              <div>
                <span>{section.comparison.leftLabel}</span>
                <strong>{section.comparison.left}</strong>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <span>{section.comparison.rightLabel}</span>
                <strong>{section.comparison.right}</strong>
              </div>
            </div>
          )}
          {section.pullQuote && (
            <blockquote className="blueprint-pull-quote">
              {section.pullQuote}
            </blockquote>
          )}
          {section.decision && <EngineeringDecision value={section.decision} />}{" "}
          {section.observation && (
            <EngineeringObservation value={section.observation} />
          )}{" "}
          {(section.keyLearning ||
            section.outcome ||
            section.nextActivity ||
            section.workPackage) && (
            <dl className="blueprint-outcomes">
              {section.keyLearning && (
                <>
                  <dt>Key learning</dt>
                  <dd>{section.keyLearning}</dd>
                </>
              )}
              {section.outcome && (
                <>
                  <dt>Engineering outcome</dt>
                  <dd>{section.outcome}</dd>
                </>
              )}
              {section.nextActivity && (
                <>
                  <dt>Next activity</dt>
                  <dd>{section.nextActivity}</dd>
                </>
              )}
              {section.workPackage && (
                <>
                  <dt>Related work package</dt>
                  <dd>{section.workPackage}</dd>
                </>
              )}
            </dl>
          )}
          {section.title === "Evidence Register" && (
            <div className="overflow-x-auto">
              <table className="blueprint-evidence-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Engineering question</th>
                    <th>Evidence</th>
                    <th>Status</th>
                    <th>What it establishes</th>
                    <th>What it does not establish</th>
                    <th>WP</th>
                  </tr>
                </thead>
                <tbody>
                  {document.evidence.map((record) => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.question}</td>
                      <td>
                        {record.type}
                        <br />
                        <small>{record.asset}</small>
                      </td>
                      <td>{record.status}</td>
                      <td>{record.establishes}</td>
                      <td>{record.doesNotEstablish}</td>
                      <td>{record.workPackage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <footer className="blueprint-document-footer">
        KLPS Technology Blueprint · v{document.metadata.version} · Confidential
        — Investor Data Room
      </footer>
    </article>
  );
}
