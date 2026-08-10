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
  return (
    <div
      className="blueprint-architecture"
      aria-label="Evidenced MVP1 system architecture"
    >
      <div className="blueprint-architecture-track">
        <span>Conductive textile</span>
        <i>Physical sensing region</i>
        <b>↓</b>
        <span>Removable connection</span>
        <i>Press studs and prototype wiring</i>
        <b>↓</b>
        <span>Arduino Nano 33 BLE Sense Rev2</span>
        <i>Development measurement hardware</i>
        <b>↓</b>
        <span>Firmware measurement / calibration</span>
        <i>Experimental baseline and stretch response</i>
        <b>↓</b>
        <span>BLE / data-capture exploration</span>
        <i>Not a validated telemetry pipeline</i>
      </div>
      <div className="blueprint-architecture-boundary">
        Evidenced prototype boundary
      </div>
      <div className="blueprint-architecture-software">
        <strong>Separate deployed research infrastructure</strong>
        <span>React / TypeScript</span>
        <span>Express / TypeScript</span>
        <span>PostgreSQL</span>
        <span>Private Cloudflare R2</span>
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
        <div className="flex items-center justify-between gap-3">
          <strong>Figure {figure.figureNumber}</strong>
          <EvidenceBadge state={figure.classification} />
        </div>
        <p>{figure.caption}</p>
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
        <div className="blueprint-kicker">
          KLPS · Engineering record · {document.metadata.version}
        </div>
        <h1>{document.metadata.document}</h1>
        <p>
          Scientific hypothesis → experimental progression → MVP1 → next
          engineering gates
        </p>
        <dl>
          {Object.entries(document.metadata)
            .filter(([key]) => key !== "document")
            .map(([key, value]) => (
              <div key={key}>
                <dt>{key.replace(/([A-Z])/g, " $1")}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
      </header>
      {document.sections.map((section) => (
        <section
          id={`section-${section.number}`}
          key={section.number}
          className="blueprint-section"
        >
          <div className="blueprint-section-head">
            <div>
              <span>{section.number}</span>
              <h2>{section.title}</h2>
            </div>
            <EvidenceBadge state={section.state} />
          </div>
          <div className="blueprint-question">
            <span>Engineering question</span>
            {section.question}
          </div>
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
          {section.number === "12" && <SystemArchitecture />}
          {section.evolutionSteps && (
            <div
              className="blueprint-evolution"
              aria-label="Prototype evolution"
            >
              {section.evolutionSteps.map((step) => (
                <article key={step.figureId}>
                  <div>
                    <strong>{step.stage}</strong>
                    <a href={`#figure-${step.figureId.replace(".", "-")}`}>
                      Figure {step.figureId}
                    </a>
                  </div>
                  <dl>
                    <dt>What changed</dt>
                    <dd>{step.changed}</dd>
                    <dt>Why</dt>
                    <dd>{step.reason}</dd>
                    <dt>What was learned</dt>
                    <dd>{step.learned}</dd>
                    <dt>What remained unresolved</dt>
                    <dd>{step.unresolved}</dd>
                  </dl>
                </article>
              ))}
            </div>
          )}
          {section.figureIds
            ?.map((id) => figures.get(id))
            .filter(Boolean)
            .map((figure) => (
              <EvidenceFigure key={figure!.figureNumber} figure={figure!} />
            ))}
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
          {section.number === "27" && (
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
