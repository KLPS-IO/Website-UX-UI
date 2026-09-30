import { Link } from "react-router-dom";

const advisers = [
  {
    name: "Oyin A.",
    role: "Adviser / Angel",
    contribution: "Commercial perspective and connections across women-in-tech communities.",
  },
  {
    name: "Muneeb A.",
    role: "Technical adviser",
    contribution: "Technical input spanning LLM systems, MVP development and enterprise computer vision.",
  },
  {
    name: "Imran K.",
    role: "Adviser",
    contribution: "Professional-services and procurement perspective informed by Big Four advisory experience.",
  },
];

const linkStyle =
  "font-medium text-[#9d245d] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500";

export function TeamAdvisersOverview() {
  return (
    <article aria-label="KLPS team and advisers" className="mt-10 space-y-9 text-base leading-7 text-[#71616a]">
      <section className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9d245d]">Team and advisers · 30 September 2026</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#241b20]">Founder-led, supported by specialist advisers</h2>
        <p className="mt-4 max-w-3xl">KLPS is currently led by its founder, with advisers contributing focused commercial, technical and procurement perspective. Adviser roles do not imply employment, executive authority or a full-time operating commitment.</p>
      </section>

      <section>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9d245d]">Founder</p>
        <h2 className="mt-3 font-serif text-2xl text-[#241b20]">Emma Mendez · Founder &amp; CEO</h2>
        <p className="mt-3 max-w-3xl">Emma leads company strategy, product direction, software development, customer discovery, fundraising and supplier engagement. Her background includes enterprise software engineering and the development of KLPS’s early textile-sensing prototype and supporting software concepts.</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#241b20]">Advisory support</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {advisers.map((adviser) => (
            <article key={adviser.name} className="rounded-2xl border border-pink-100 p-5">
              <h3 className="font-semibold text-[#241b20]">{adviser.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#9d245d]">{adviser.role}</p>
              <p className="mt-3 text-sm leading-6">{adviser.contribution}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-pink-100 p-5">
          <h2 className="font-serif text-xl text-[#241b20]">How support is used</h2>
          <p className="mt-3 text-sm leading-6">The founder retains responsibility for decisions and delivery. Advisers are consulted where their experience is relevant, while specialist development work is scoped separately with research organisations and commercial suppliers.</p>
        </div>
        <div className="rounded-2xl border border-pink-100 p-5">
          <h2 className="font-serif text-xl text-[#241b20]">Capability development</h2>
          <p className="mt-3 text-sm leading-6">Immediate external capability priorities include textile-sensor engineering, garment integration, testing, design for manufacture and investment readiness. Permanent hiring will follow demonstrated, repeatable needs.</p>
        </div>
      </section>

      <section className="border-t border-pink-100 pt-7">
        <h2 className="font-serif text-2xl text-[#241b20]">Related information</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <Link className={linkStyle} to="/pitch-deck-preview">View the pitch deck</Link>
          <Link className={linkStyle} to="/data-room?folder=Development%20Conversations">Review development conversations</Link>
        </div>
      </section>
    </article>
  );
}
