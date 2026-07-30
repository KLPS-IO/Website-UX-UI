import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const BUILD_DATE = "30 July 2026";

type SeoMetadataProps = {
  title: string;
  description: string;
  canonicalPath: string;
};

function SeoMetadata({ title, description, canonicalPath }: SeoMetadataProps) {
  useEffect(() => {
    document.title = title;

    let descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.name = "description";
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.content = description;

    let canonicalElement = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = `https://klps.co.uk${canonicalPath}`;
  }, [canonicalPath, description, title]);

  return null;
}

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  canonicalPath: string;
  children: ReactNode;
};

function LegalPage({
  eyebrow,
  title,
  description,
  canonicalPath,
  children,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMetadata
        title={`${title} | KLPS`}
        description={description}
        canonicalPath={canonicalPath}
      />
      <a
        href="#legal-content"
        className="sr-only z-50 rounded-md bg-background px-4 py-3 font-semibold text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-primary"
      >
        Skip to legal content
      </a>

      <header className="border-b border-border bg-background/95 px-5 py-5 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="KLPS home"
            className="rounded-sm text-xl font-bold tracking-[0.28em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            KLPS
          </Link>
          <nav aria-label="Legal pages" className="flex items-center gap-5 text-sm font-semibold">
            <Link
              to="/privacy"
              aria-current={canonicalPath === "/privacy" ? "page" : undefined}
              className="rounded-sm text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              aria-current={canonicalPath === "/terms" ? "page" : undefined}
              className="rounded-sm text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>

      <main id="legal-content" className="px-5 py-12 sm:px-8 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12 border-b border-border pb-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base font-medium text-muted-foreground sm:text-lg">
              Last updated: <time dateTime="2026-07-30">{BUILD_DATE}</time>
            </p>
          </header>

          <div className="legal-copy space-y-10 text-[1.0625rem] leading-8 text-foreground sm:text-lg">
            {children}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
      <h2
        id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const Bullets = ({ children }: { children: ReactNode }) => (
  <ul className="ml-6 list-disc space-y-2 marker:text-primary">{children}</ul>
);

const ContactLink = () => (
  <a
    href="mailto:emmamendez@klps.co.uk"
    className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    emmamendez@klps.co.uk
  </a>
);

export function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Privacy at KLPS"
      title="Privacy Policy"
      description="Learn what personal information KLPS collects, why it is used, how it is protected, and the choices available to you."
      canonicalPath="/privacy"
    >
      <Section title="Who we are">
        <p>
          KLPS Ltd (“KLPS”, “we”, “us” or “our”) develops software and intelligent
          textile technology. Our website is{" "}
          <a
            href="https://klps.co.uk"
            className="font-semibold text-primary underline underline-offset-4"
          >
            klps.co.uk
          </a>
          .
        </p>
        <p>
          Questions about this policy or your personal information can be sent to{" "}
          <ContactLink />.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>We collect information only when it is needed to provide and operate KLPS services:</p>
        <Bullets>
          <li>details you provide when joining the KLPS waitlist;</li>
          <li>information you send through contact forms;</li>
          <li>answers you choose to provide in research questionnaires;</li>
          <li>voice recordings you voluntarily submit as part of research;</li>
          <li>account and access information needed for investor authentication;</li>
          <li>account and access information needed for founder authentication;</li>
          <li>limited technical and usage analytics needed to operate, secure and improve the website; and</li>
          <li>essential cookie and session information required for authentication and core website functions.</li>
        </Bullets>
        <p>
          We do not use this website to collect information for behavioural advertising.
        </p>
      </Section>

      <Section title="How we use information">
        <p>We use personal information where necessary to:</p>
        <Bullets>
          <li>respond to enquiries;</li>
          <li>operate and maintain the KLPS platform;</li>
          <li>conduct product research and understand user needs;</li>
          <li>improve KLPS products, software and intelligent textile technology;</li>
          <li>manage authorised investor access;</li>
          <li>authenticate founders and secure accounts;</li>
          <li>detect, prevent and investigate abuse or security incidents; and</li>
          <li>send updates that a person has requested.</li>
        </Bullets>
        <p>
          Depending on the circumstances, we process information with your consent, to
          provide a service you have requested, to meet a legal obligation, or for our
          legitimate interests in safely researching, developing and operating KLPS.
        </p>
      </Section>

      <Section title="Research participation">
        <p>
          Taking part in KLPS research is voluntary. You may choose which questions to
          answer, and voice recordings are always optional.
        </p>
        <p>
          Research responses may be anonymised or combined with other responses for
          product development. Where information has been fully anonymised so that it no
          longer identifies an individual, it is no longer personal information.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          KLPS uses only cookies and similar session technology required for
          authentication, session security and essential website functionality. These
          help keep signed-in areas secure and remember the state needed to provide the
          service.
        </p>
        <p>We do not use advertising cookies on the KLPS website.</p>
      </Section>

      <Section title="Data sharing">
        <p>KLPS does not sell personal information.</p>
        <p>
          Information may be processed by trusted service providers that help us operate
          the platform, such as hosting, infrastructure, secure storage, communications
          and security providers. They may process information only for the agreed
          service and subject to appropriate protections. We may also disclose
          information where the law requires it or where necessary to protect people,
          accounts or the platform.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We keep personal information only for as long as reasonably necessary for the
          purpose for which it was collected, including legitimate research, account
          security, legal and record-keeping needs. Retention may differ by record type.
          When information is no longer needed, we delete it, anonymise it, or securely
          restrict access until deletion is possible.
        </p>
      </Section>

      <Section title="Your rights">
        <p>Under UK data protection law, you may have the right to:</p>
        <Bullets>
          <li>ask for access to your personal information;</li>
          <li>ask us to correct inaccurate or incomplete information;</li>
          <li>ask us to delete information where the law allows;</li>
          <li>ask us to restrict or object to certain processing;</li>
          <li>receive certain information in a portable format; and</li>
          <li>withdraw consent at any time where processing relies on consent.</li>
        </Bullets>
        <p>
          Withdrawing consent does not affect processing that was lawful before
          withdrawal. You may also raise a concern with the UK Information
          Commissioner’s Office.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          To ask a privacy question or exercise your rights, email <ContactLink />. We
          may need to verify your identity before acting on a request.
        </p>
      </Section>
    </LegalPage>
  );
}

export function TermsOfService() {
  return (
    <LegalPage
      eyebrow="Using KLPS"
      title="Terms of Service"
      description="Read the terms that apply when using the KLPS website, research services and authorised platform areas."
      canonicalPath="/terms"
    >
      <Section title="Acceptance">
        <p>
          By accessing or using the KLPS website, you agree to these Terms of Service.
          If you do not agree, please do not use the website or its restricted areas.
          Additional terms may apply to a specific research activity, investor area or
          service and will be presented where relevant.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          The KLPS name, brand, technology, software, research, designs and content
          remain the property of KLPS Ltd or the relevant stated owner. Using the
          website does not transfer ownership or grant a licence to use proprietary
          materials beyond viewing and using them for their intended purpose.
        </p>
      </Section>

      <Section title="Website use">
        <p>You must not:</p>
        <Bullets>
          <li>attempt to gain unauthorised access to accounts, systems or restricted material;</li>
          <li>disrupt, damage or interfere with the website or its services;</li>
          <li>copy, distribute or exploit proprietary content without permission;</li>
          <li>misuse research systems or submit deliberately false, harmful or unlawful material;</li>
          <li>circumvent security or access controls; or</li>
          <li>use the website in a way that breaks applicable law or infringes another person’s rights.</li>
        </Bullets>
      </Section>

      <Section title="Research participation">
        <p>
          Participation in KLPS research is voluntary. You may stop taking part at any
          time, subject to any information provided for the particular study. Research
          questions and responses are used to support product development and do not
          create a clinical or healthcare relationship.
        </p>
      </Section>

      <Section title="Health disclaimer">
        <p>
          KLPS is developing technology. Information currently provided through the
          website, research activities or platform is for informational and development
          purposes only. It is not medical advice and does not provide diagnosis or
          treatment.
        </p>
        <p>
          Always consult a suitably qualified healthcare professional about symptoms,
          health concerns, diagnosis or treatment. Do not delay seeking professional
          advice because of information provided by KLPS.
        </p>
      </Section>

      <Section title="Investor materials">
        <p>
          Investor materials are provided only to authorised users and may be
          commercially sensitive. Materials remain confidential where an NDA or a
          specific confidentiality notice applies. Access may be suspended or revoked
          where necessary to protect KLPS, other users, or the integrity of the data
          room. Access does not constitute an offer or financial advice.
        </p>
      </Section>

      <Section title="Availability and changes">
        <p>
          We work to keep the website secure and available, but uninterrupted or
          error-free access cannot be guaranteed. Features may change, be suspended or
          be withdrawn as KLPS develops its technology and services. We may update these
          terms when the website or applicable law changes, and the updated date will be
          shown at the top of this page.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          KLPS takes reasonable care in operating the website. To the extent permitted
          by law, we are not responsible for losses that are indirect, were not
          reasonably foreseeable, or arise from relying on informational or
          early-stage development material as medical, financial or professional
          advice.
        </p>
        <p>
          Nothing in these terms excludes or limits liability where doing so would be
          unlawful, including liability for fraud, fraudulent misrepresentation, or
          death or personal injury caused by negligence. Your statutory rights are not
          affected.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These terms are governed by the laws of England and Wales. The courts of
          England and Wales will have jurisdiction, subject to any rights that cannot
          lawfully be excluded.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms can be sent to <ContactLink />.
        </p>
      </Section>
    </LegalPage>
  );
}
