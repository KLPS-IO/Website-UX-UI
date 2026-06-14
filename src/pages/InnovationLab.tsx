import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-textile.jpg";
import sensorImg from "@/assets/sensor-mesh.jpg";
import polymerImg from "@/assets/polymer-lab.jpg";
import dcLogo from "@/assets/DC_Logo_Housed_Dark_Red.png";
import createch from "@/assets/createch-logo.png";
import niyoLogo from "@/assets/niyo-group-logo-l.png";
import ffrLogo from "@/assets/ffr-logo.jpg";
import bfflogo from "@/assets/bff-logo.webp";
import { Section, StatCard } from "@/components/Section";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#founder", label: "Founder" },
  { href: "/data-room", label: "Data Room" },
  { href: "#lab", label: "R&D Lab" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#funding", label: "Funding" },
  { href: "#vault", label: "Vault" },
];

const companyWins = [
  {
    logo: dcLogo,
    name: "Digital Catapult",
    detail: "Working across innovation, industry access, and emerging technology pathways.",
  },
  {
    logo: createch,
    name: "Createch",
    detail: "Pioneering the future of creative technology and digital experiences.",
  },
  {
    logo: ffrLogo,
    name: "Female Founder Rise",
    detail: "Helping early-stage to growth-stage founders build profitable businesses and secure investment",
  },
  {
    logo: niyoLogo,
    name: "Niyo Group",
    detail: "Empowering ambitious females through technology, education, and innovative enterprise",
  },
  {
    logo: bfflogo,
    name: "BFF",
    detail: "Supporting black female entrepreneurs and women-led tech ventures",
  },
];

const pillars = [
  {
    img: heroImg,
    code: "K-01",
    title: "Conductive Textile Platform",
    desc: "Development of soft, conductive textile architectures designed to support future wearable sensing applications.",
    tags: ["Patent Pending", "R&D Programme"],
  },
  {
    img: sensorImg,
    code: "K-04",
    title: "Women's Body Intelligence Engine",
    desc: "Continuous, non-invasive monitoring of female-specific health biomarkers via intelligent waistbands.",
    tags: ["Materials Research", "IP Granted"],
  },
  {
    img: polymerImg,
    code: "K-07",
    title: "Smart Textile Materials",
    desc: "Exploration of durable conductive materials and manufacturing approaches suitable for everyday wearable products.",
    tags: ["Customer Validated", "Prototype Stage"],
  },
];

const quickNav = [
  { href: "/data-room", title: "Founder Dashboard", desc: "Vision, milestones, accelerators, press." },
  { href: "/data-room", title: "Investor Data Room", desc: "Deck, financials, cap table, NDA flow." },
  { href: "#lab", title: "IP & R&D Lab", desc: "Patents, prototypes, materials, roadmap." },
  { href: "#ecosystem", title: "Product Ecosystem", desc: "Smart underwear, textile systems, AI." },
  { href: "#funding", title: "Funding & Growth", desc: "Ask, use of funds, TAM/SAM/SOM." },
  { href: "#vault", title: "Secure File Vault", desc: "Permissioned files, activity logs." },
];

const NavLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const InnovationLab = () => {
  return (
    <div className="data-room-theme min-h-screen bg-obsidian text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-obsidian/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex min-w-0 items-center gap-8">
            <a href="https://klps.co.uk" className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
              <span className="text-m font-semibold tracking-[0.35em] text-foreground">KPLS</span>
            </a>
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-m font-medium tracking-wide transition-colors ${
                    index === 0 ? "bg-white/5 text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:inline-flex">
              Pre-Seed - Open
            </span>
            <a
              href="https://klps.co.uk"
              className="rounded-full border border-border bg-white/[0.03] px-4 py-1.5 text-m font-medium text-foreground transition-colors hover:bg-white/[0.08]"
            >
              Back to Home
            </a>
            <Link
              to="/data-room"
              className="hidden rounded-full bg-foreground px-4 py-1.5 text-m font-medium text-primary-foreground transition-transform hover:scale-[1.02] sm:inline-flex"
            >
              Access Vault
            </Link>
          </div>
        </div>
      </header>

      <main id="overview" className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImg}
              alt="Conductive threads woven through carbon-fiber textile"
              width={1920}
              height={1080}
              className="size-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/90 to-obsidian" />
          </div>

          <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
            <div className="max-w-4xl animate-fade-up">
              <div className="mb-6 inline-flex items-center gap-2 md:text-lg rounded-full border border-border bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                <span className="size-1 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]" />
                Next-generation wearable infrastructure
              </div>
            <AnimatedHeadline
              className="text-balance text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-7xl"
              lines={[
                { text: "ENGINEERING", italic: true},
                { text: "the future of", italic: true},
                { text: "INTELLIGENT TEXTILES.", italic: true, muted: true },
              ]}
            />
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                Proprietary conductive polymers integrated into medical-grade textiles.
                KPLS is building the sensory layer for human-computer interaction.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/data-room"
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Enter Data Room
                </Link>
                <a
                  href="#lab"
                  className="rounded-full border border-border bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                >
                  Explore R&D Lab
                </a>
              </div>
            </div>

            <div className="mt-24 overflow-hidden rounded-2xl border border-border bg-border pb-0">
              <div className="grid gap-px md:grid-cols-[0.85fr_1fr_1fr]">
                <div className="bg-obsidian p-6 md:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Company Wins
                  </div>
                  <div className="mt-3 text-3xl font-light italic tracking-tight text-foreground md:text-4xl">
                    Built with momentum
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Active work with ecosystem partners supporting KPLS across technology,
                    venture readiness, and market access.
                  </p>
                </div>

                {companyWins.map((win) => (
                  <article
                    key={win.name}
                    className="group flex min-h-56 flex-col justify-between bg-obsidian p-6 transition-colors hover:bg-onyx md:p-8"
                  >
                    <div className="flex h-24 items-center">
                      <img
                        src={win.logo}
                        alt={`${win.name} logo`}
                        className="max-h-20 max-w-[13rem] object-contain brightness-110 transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        Accelerator Momentum
                      </div>
                      <h3 className="mt-2 text-xl font-light tracking-tight text-foreground">
                        {win.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {win.detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section
          className="scroll-mt-20 pb-0"
          eyebrow="Core technology"
          title="Building the future of body intelligence."
          description="KLPS is developing wearable technologies that help women/girls better understand their bodies through non-invasive sensing, intelligent textiles and personalised insights."
        >
          <div id="lab" className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((card) => (
              <article
                key={card.code}
                className="group glass overflow-hidden rounded-2xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_-10px_hsl(var(--accent)/0.5)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Project {card.code}
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* <Section
          className="scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-border"
          eyebrow="Traction"
          title="Momentum across science, market and capital."
        >
          <div id="funding" className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard value="3" label="Accelerators" hint="Top-tier programmes" />
            <StatCard value="£1.5M" label="Pre-seed Closed" hint="Oversubscribed" />
            <StatCard value="11" label="Strategic Partners" hint="Manufacturing & clinical" />
            <StatCard value="2.4M" label="TAM (units, EU)" hint="Femtech apparel" />
          </div>
        </Section> */}

        <Section
          className="scroll-mt-20"
          eyebrow="Data room"
          title="Where to begin."
          description="Each surface mirrors a chapter of our investor narrative."
        >
          <div id="ecosystem" className="grid scroll-mt-24 grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {quickNav.map((item) => (
              <NavLink
                key={item.title}
                href={item.href}
                className="group bg-obsidian p-8 transition-colors hover:bg-onyx"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
          <div id="founder" className="scroll-mt-24" />
          <div id="vault" className="scroll-mt-24" />
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-[0.3em]">KPLS</div>
            <p className="mt-2 max-w-md text-m text-muted-foreground">
              Confidential investor data room. All materials subject to NDA.
              © {new Date().getFullYear()} KPLS Ltd.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <a className="hover:text-foreground" href="https://klps.co.uk">Back to Home</a>
            <a className="hover:text-foreground" href="#overview">NDA Terms</a>
            <a className="hover:text-foreground" href="#overview">Privacy</a>
            <a className="hover:text-foreground" href="#overview">Security</a>
            <a className="hover:text-foreground" href="#overview">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InnovationLab;
