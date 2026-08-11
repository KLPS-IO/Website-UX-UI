export type FundingAnswerStatus =
  | "drafted"
  | "pending_verification"
  | "founder_confirmation_required"
  | "eligibility_review"
  | "ethics_review";

export type FundingQuestion = {
  id: string;
  prompt: string;
  answer: string | null;
  status: FundingAnswerStatus;
  evidenceNote: string;
  limit?: { unit: "words" | "characters"; maximum: number };
  flags?: readonly string[];
};

export type FundingApplicationSection = {
  id: string;
  title: string;
  questions: readonly FundingQuestion[];
};

const q = (
  id: string,
  prompt: string,
  answer: string | null,
  status: FundingAnswerStatus,
  evidenceNote: string,
  options: Pick<FundingQuestion, "limit" | "flags"> = {},
): FundingQuestion => ({ id, prompt, answer, status, evidenceNote, ...options });

const pending = (id: string, prompt: string, evidenceNote: string, flags: readonly string[] = []) =>
  q(id, prompt, null, "founder_confirmation_required", evidenceNote, { flags });

export const womenTechEuSections: readonly FundingApplicationSection[] = [
  {
    id: "eligibility",
    title: "Eligibility",
    questions: [
      pending("EL-01", "Eligibility application ID", "No eligibility invitation ID is recorded in the repository.", ["Blocking factual field"]),
      pending("EL-02", "Is this the first Women TechEU Full Proposal submission?", "No prior Women TechEU submission evidence was found.", ["Resubmission rule requires careful confirmation"]),
    ],
  },
  {
    id: "legal-contact",
    title: "1. Legal and contact information",
    questions: [
      q("1.1-01", "Programme beneficiary — first name", "Emma", "drafted", "Verified founder record and Data Room guide."),
      q("1.1-02", "Programme beneficiary — surname", "Mendez", "drafted", "Verified founder record and Data Room guide."),
      q("1.1-03", "Programme beneficiary — email", "emmamendez@klps.co.uk", "drafted", "Current Data Room guide contact."),
      pending("1.1-04", "Programme beneficiary — phone", "No verified founder phone number is stored."),
      q("1.1-05", "Programme beneficiary — gender", "Woman", "founder_confirmation_required", "Historical women-founder application reference; self-identification must be confirmed by the founder."),
      q("1.1-06", "Position within the company", "Founder & CEO", "drafted", "Current Data Room guide identifies Emma Mendez as Founder & CEO."),
      pending("1.1-07", "Usual residential address", "A company registered-office address exists, but a residential address must not be inferred from it.", ["Personal data"]),
      pending("1.1-08", "Other woman co-founder (optional)", "The verified cap table records one shareholder and no verified co-founder record."),
      q("1.2-01", "Company legal name", "KIDS, LADIES & PARENTS, SPECIALISTS LTD", "drafted", "Verified canonical Companies House-backed company record."),
      q("1.2-02", "Established in a widening area?", "No — provisional", "eligibility_review", "Company is registered in the United Kingdom. The call-specific widening-area definition must be checked before submission.", { flags: ["Eligibility interpretation required"] }),
      pending("1.2-03", "Company phone", "No verified company phone number is stored."),
      q("1.2-04", "Website", "https://klps.co.uk", "drafted", "Current Data Room guide."),
      q("1.2-05", "Business registration number", "16436591", "drafted", "Verified canonical Companies House-backed company record."),
      q("1.2-06", "VAT number / Tax Identification Number", "522998359", "drafted", "Canonical Finance OS company record marks VAT status Approved."),
      pending("1.2-07", "PIC number (optional)", "No PIC number is recorded."),
      pending("1.2-08", "Three-minute founder video link", "Video intentionally not created in this task.", ["Required before submission"]),
      pending("1.2-09", "Company logo (optional)", "No specific approved upload asset has been selected."),
      q("1.2-10", "Company social media links", null, "pending_verification", "Growth OS contains social connection infrastructure, but the final public URL set requires founder confirmation.", { flags: ["Required before submission"] }),
    ],
  },
  {
    id: "impact",
    title: "2. Impact",
    questions: [
      pending("2-01", "Investor pitch deck (PDF)", "A secure Data Room may contain pitch-deck documents, but no final Women TechEU upload version has been designated."),
      q("2-02", "Business overview and plans for the next three years", "KLPS is building a longitudinal Body Understanding Platform powered by intelligent textiles. Underwear is the first interface: an existing daily garment through which textile deformation may become repeatable body data. MVP1 has established an experimental textile-to-signal proof of concept at TRL 3. Over three years, KLPS plans to pass controlled repeatability, materials, wash, fit and integration gates; develop a defensible sensing architecture and longitudinal software layer; then pursue carefully scoped pilots and commercialisation. Market launch, clinical use and revenue timing remain conditional on technical validation, responsible data governance and verified financing.", "drafted", "Technology Blueprint / Engineering Record 01 and current product narrative.", { limit: { unit: "words", maximum: 100 } }),
      q("2-03", "Markets planned within three years", "Home market; EU expansion beyond home; North America — provisional", "founder_confirmation_required", "The UK is the evidenced home base. Expansion sequence is a planning decision.", { flags: ["Founder confirmation required"] }),
      q("2-04", "Go-to-market, commercialisation, market size and realistic share", "KLPS plans a staged UK-first route: continue customer discovery; validate controlled textile performance; recruit an ethically governed early cohort; then test a direct-to-consumer garment and longitudinal software proposition before wider partnerships. Current evidence comprises 44 survey responses, 42 interview participants and two waitlist sign-ups; 41 respondents said yes or maybe to paying. These are discovery signals, not market share. EU and North American expansion would follow technical, regulatory and retention evidence. Target-market size, pricing, launch volumes and obtainable share are pending verified market research and founder approval.", "drafted", "Live Research platform totals checked read-only on 11 August 2026; no verified TAM/SAM/SOM model found.", { limit: { unit: "words", maximum: 100 }, flags: ["Market sizing pending verification"] }),
      q("2-05", "Customer value proposition, partnerships, customers and adoption", "KLPS is designed for women who want to understand changing body patterns without adding another device or manual-tracking routine. Underwear provides a familiar, close-to-body interface; the intended value is longitudinal context, not raw readings or diagnosis. In current discovery, 34 of 44 respondents had already spent money addressing the problem and 41 expressed possible payment interest. Henry Royce Institute is recorded as an existing research relationship; Interactive Wear is a verified supplier candidate. Neither is represented as a contracted partner. Adoption depends on comfort, repeatability, trust, useful insights and an acceptable verified price.", "drafted", "Live customer metrics, WP1 supplier records and Technology Blueprint.", { limit: { unit: "words", maximum: 100 } }),
      q("2-06A", "SWOT — Strengths", "KLPS starts from a distinctive systems insight: continuous sensing depends on an interface people already wear. MVP1 demonstrates a physical chain from conductive textile and garment construction to development electronics and changing readings. The software vision connects repeated measurements to longitudinal understanding rather than isolated metrics. Founder-led customer discovery provides current problem and payment signals. Compared with wrist devices and manual apps, KLPS targets torso-level textile interaction and reduced behavioural friction. The evidence record is unusually explicit about what is proven, observed, planned and still unknown, supporting technically disciplined development.", "drafted", "Engineering Record 01 and live customer discovery evidence.", { limit: { unit: "words", maximum: 100 } }),
      q("2-06B", "SWOT — Weaknesses", "The technology remains at TRL 3. MVP1 does not establish repeatability, linearity, wash durability, comfort across bodies, calibration stability, physiological meaning or scalable manufacture. The current electronics are development hardware, not a production design. Customer evidence is early and the waitlist is small. No supplier quotation or contracted technical partner is recorded. Market size, price, unit economics, regulatory route and IP ownership position require confirmation. Compared with established wearables, KLPS lacks validated outcomes, installed distribution, manufacturing scale and longitudinal datasets. These are explicit engineering and commercial gates, not completed capabilities.", "drafted", "Technology Blueprint limitations, live waitlist total and WP1 procurement records.", { limit: { unit: "words", maximum: 100 } }),
      q("2-06C", "SWOT — Opportunities", "A validated intelligent-textile platform could create a low-friction route to longitudinal body understanding, beginning with underwear and later extending to other close-to-body garments. The opportunity spans advanced materials, smart-textile manufacturing, embedded sensing and software intelligence rather than a single smart-underwear product. Current discovery indicates unmet demand and willingness to consider paying, while supplier and research outreach creates routes to controlled materials work. Women TechEU could help KLPS close technical, commercial and investment-readiness gaps. The next value inflection is defensible evidence of repeatability across materials, garments and wear conditions.", "drafted", "Technology Blueprint roadmap, customer metrics and WP1 supplier discovery.", { limit: { unit: "words", maximum: 100 } }),
      q("2-06D", "SWOT — Threats", "Material drift, wash degradation, fit variation and noisy signals may prevent repeatable measurement. Users may reject the product if comfort, privacy, price or insight quality fails expectations. Larger wearable, apparel or smart-textile companies could move faster once feasibility is demonstrated. Health-adjacent language could create regulatory, ethical or trust risk if evidence is overstated. Reliance on specialist suppliers and research facilities may increase cost or delay development. Patent freedom, ownership and protectability are not yet confirmed. KLPS mitigates these risks through gated experiments, conservative non-diagnostic claims, privacy-by-design, supplier verification and evidence-led go/no-go decisions.", "drafted", "Technology Blueprint open questions, procurement records and current Data Room positioning.", { limit: { unit: "words", maximum: 100 } }),
    ],
  },
  {
    id: "excellence-company",
    title: "3.1 Excellence — Company description",
    questions: [
      q("3.1-01", "Public startup summary", "KLPS is developing a longitudinal Body Understanding Platform powered by intelligent textiles. It addresses the fragmented, high-friction way women currently track changing body patterns through wrist devices, isolated measurements and manual logging. Underwear is KLPS’s first proposed interface because it is already worn close to the body and follows movement. MVP1 is an experimental proof of concept connecting conductive textile, a garment and development electronics to observable changing readings. KLPS is not yet offering a validated commercial or clinical product; current activity covers engineering, customer discovery, materials and supplier research, and software-interface exploration.", "drafted", "Technology Blueprint, Data Room company-stage statement and current research records.", { limit: { unit: "words", maximum: 100 } }),
      q("3.1-02", "Deep-tech novelty and disruptive potential", "KLPS combines advanced textile materials, garment mechanics, embedded measurement and longitudinal software intelligence. The novelty is treating fabric as the body interface: deformation of an everyday garment may become a repeatable signal source, reducing dependence on remembered devices or manual logging. MVP1 proves only the experimental chain from textile stretch to changing electrical readings; it does not prove physiological meaning. If controlled repeatability, durability and calibration are achieved, the architecture could support an extensible intelligent-textile platform across garment types. Its disruptive potential lies in persistent personal baselines and software interpretation, not in claiming that conductive underwear alone is a sensor.", "drafted", "Engineering Record 01, especially system boundary, MVP1 evidence and repeatability roadmap.", { limit: { unit: "words", maximum: 100 } }),
      pending("3.1-03", "Historical business information — 2024 and 2025 revenue, private funding and grants (€)", "KLPS incorporated on 8 May 2025. Verified euro-denominated revenue, private-funding and grant totals for the requested years are not stored.", ["Financial figures pending verification", "Do not enter zero without accountant/founder confirmation"]),
      pending("3.1-04", "Forecast — 2027 and 2028 revenue, FTEs, private funding and grants (€)", "No approved two-year euro forecast was found. Finance OS assumptions must not be presented as verified actuals.", ["Planning assumptions required", "Founder confirmation required"]),
      q("3.1-05", "Fundraising plan", "Option d — the company has not secured funding but has a clear plan to acquire public grants — provisional", "founder_confirmation_required", "Verified cap table records no external investors; grant and fundraising intentions require founder confirmation."),
      pending("3.1-06", "Consent to private-investment contact", "This is a founder consent decision."),
      q("3.1-07", "Current sources of funding", "Own funding (shareholder/founder funds) — provisional", "founder_confirmation_required", "Finance OS records founder-funded business expenditure, but the final disclosure and classification require confirmation."),
      pending("3.1-08", "Previously applied to an EIC programme?", "The historical Innovate UK application is not an EIC application. No verified EIC submission record was found."),
      pending("3.1-09", "Plan to apply to EIC Accelerator or Pre-Accelerator?", "This is a future founder strategy decision."),
      q("3.1-10", "EIC Challenge", "Open Challenge — intelligent textiles combining advanced materials, embedded sensing and longitudinal software intelligence for body understanding.", "founder_confirmation_required", "No listed thematic challenge directly matches the evidenced platform; final call fit requires eligibility review.", { flags: ["Eligibility interpretation required"] }),
    ],
  },
  {
    id: "excellence-technology",
    title: "3.2 Excellence — Technology",
    questions: [
      q("3.2-01", "Deep-tech technologies addressed", "Advanced Materials; Advanced Manufacturing; Artificial Intelligence and Machine Learning, including Big Data; Electronics and Photonics; Internet of Things", "founder_confirmation_required", "Technology Blueprint supports materials, garment manufacture, electronics and software intelligence; category choices require final founder review."),
      q("3.2-02", "Market readiness / TRL", "No truthful selectable answer: current verified position is TRL 3", "eligibility_review", "Engineering Record 01 and canonical Finance OS company record both state TRL 3; the form permits only TRL 4, TRL 5 or TRL 6.", { flags: ["Blocking TRL eligibility mismatch"] }),
      pending("3.2-03", "Does the company own IP under which the technology is rooted?", "No verified IP ownership or assignment evidence was found.", ["Do not infer ownership"]),
      q("3.2-04", "IP strategy", "KLPS will maintain dated engineering records and decision provenance; confirm founder, contractor and supplier assignments before external work; commission patentability and freedom-to-operate reviews at defined technical gates; and protect complementary value through appropriate patents, registered designs, trade secrets, copyright, trademarks and controlled data access. Filing decisions will follow repeatable technical results, not precede evidence. Supplier and research agreements should define background IP, project IP, licensing, publication, confidentiality and data rights. Current ownership and filing status remain founder/legal confirmation items.", "drafted", "Existing evidence/version architecture and Technology Blueprint; current IP ownership is unverified.", { limit: { unit: "words", maximum: 100 }, flags: ["Legal review required"] }),
    ],
  },
  {
    id: "implementation",
    title: "4. Implementation",
    questions: [
      q("4-01", "Team member 1", "Emma Mendez — Woman (confirmation required) — emmamendez@klps.co.uk — Founder & CEO. Leads company strategy, customer discovery, product direction, evidence governance and MVP1 development. English PDF CV and LinkedIn URL are required before submission.", "founder_confirmation_required", "Founder identity, email and role are verified; gender, CV and LinkedIn upload require confirmation.", { limit: { unit: "words", maximum: 50 }, flags: ["CV missing", "LinkedIn missing"] }),
      pending("4-01B", "Additional key team members (up to three)", "No current team-member record with verified role, email, CV and LinkedIn was found. Historical named supporters are not copied forward as current team."),
      pending("4-02", "FTE numbers for 2024, 2025 and 2026", "No verified annual FTE series is stored. Founder activity and company incorporation do not establish payroll FTE."),
      q("4-03", "Gender-equitable leadership and professional development", "KLPS is currently founder-led by a woman and is building a platform around women’s under-measured experiences. As the team grows, KLPS intends to use role-specific criteria, structured interviews, consistent pay bands, documented progression expectations and equal access to technical ownership, mentoring and training. Representation will be monitored across hiring, leadership, contractors and advisors, without treating lived experience as a substitute for technical competence. This is the intended operating approach; formal policies, workforce data and measurable targets require founder approval as hiring begins.", "drafted", "Verified woman-founder context plus an explicitly prospective policy; no current workforce metrics are claimed.", { limit: { unit: "words", maximum: 100 } }),
      q("4-04", "Team deep-tech experience and significant achievement", "Emma Mendez has historical evidence of software engineering, cybersecurity and regulated Big Four technology leadership; these credentials require CV confirmation for this application. The current technical achievement is MVP1: a founder-built experimental system integrating conductive textile, garment construction, removable connections, Arduino development hardware and software concepts. It produced observable changing readings under manipulation and moved KLPS to an evidenced TRL 3 proof of concept. The record deliberately makes no claim of graphene performance, repeatability, physiological validation, clinical evidence or production readiness.", "drafted", "Historical Innovate UK submission used only for founder-background reference; MVP1 claims come from Engineering Record 01.", { limit: { unit: "words", maximum: 100 }, flags: ["Founder CV confirmation required"] }),
      q("4-05", "Previous startup experience and success", "Founder confirmation required. The repository verifies Emma Mendez as KLPS founder and records current company-building activity, but it does not contain sufficient evidence to name a previous startup, define its outcome or claim commercial success. The historical Innovate UK application describes entrepreneurial and leadership experience but is not treated as proof of a prior successful startup. This answer should be completed from the founder’s CV and objective outcome evidence.", "founder_confirmation_required", "No verified prior-startup outcome evidence found.", { limit: { unit: "words", maximum: 100 } }),
      q("4-06", "Skills and competence gaps and plan", "KLPS’s immediate gap is controlled textile-sensor engineering: materials formulation, textile integration, metrology, calibration, repeatability protocols, wash and wear testing, multi-size garment construction and design-for-manufacture. Electronics gaps include production sensing architecture, low-power design, connection durability, signal conditioning and test automation. Software gaps include a validated telemetry pipeline, data-quality controls, longitudinal modelling and responsible human-centred interpretation. Commercial gaps include verified market sizing, pricing, unit economics, channel testing and procurement. Governance gaps include IP ownership and freedom-to-operate, participant research protocols, privacy impact assessment, regulatory and claims strategy, nanomaterial safety, and quality planning. KLPS will fill these sequentially: first define acceptance criteria and controlled experiments; then commission appropriately scoped specialists and laboratories under agreements covering deliverables, evidence and IP; obtain competing quotations before committing grant spend; use customer research to test comfort, trust and willingness to pay; and hire only when repeatable work justifies permanent capability. Henry Royce Institute is recorded as an existing research relationship, Interactive Wear as a verified supplier candidate, and Ohmatex as closed. These are not represented as contracted delivery partners. All supplier pricing remains quotation pending.", "drafted", "Technology Blueprint open questions and live WP1 supplier/procurement records.", { limit: { unit: "words", maximum: 500 } }),
      q("4-07", "Top three mentoring and training priorities", "Grant & non-dilutive funding navigation; Investor readiness, pitch preparation and investor outreach; Corporate access and paid pilot opportunities", "founder_confirmation_required", "Recommended from current grant, evidence and pilot-readiness gaps; founder must choose."),
      q("4-08", "Simple €75,000 budget breakdown", "Planning assumption only: €28,000 laboratory, materials and textile-development subcontracting; €17,000 specialist textile, electronics and data-engineering support; €15,000 founder delivery salary; €7,000 controlled testing, participant research and ethics/data safeguards; €5,000 IP, freedom-to-operate, regulatory and claims advice; €3,000 travel, software and project operations. Total: €75,000. No supplier cost is verified: laboratory, materials and specialist allocations remain supplier quotation pending. Salary treatment, tax, eligibility, subcontracting limits and exchange-rate basis require founder, accountant and programme confirmation before submission.", "founder_confirmation_required", "Budget uses transparent planning allocations only; live WP1 records show zero supplier quotations.", { limit: { unit: "words", maximum: 100 }, flags: ["All figures are planning assumptions", "Supplier quotations pending"] }),
    ],
  },
  {
    id: "ethics",
    title: "5. Ethics self-assessment",
    questions: [
      q("5-01", "Human embryonic stem cells and human embryos", "a. No — provisional. b. No — provisional.", "ethics_review", "Nothing in the current technical scope involves hESCs or embryos; founder must confirm final activities."),
      q("5-02", "Humans", "a. Yes if wearer or usability research is included. b. Yes if garment wearing, body measurement or imaging is part of the protocol. c. No — provisional; no pharmaceutical, biological, radiopharmaceutical or advanced-therapy clinical study is planned.", "ethics_review", "Engineering Record records founder fittings only and no clinical study. Future participant scope requires a protocol and ethics interpretation.", { flags: ["Human-participant review required"] }),
      q("5-03", "Human cells / tissues", "No — provisional.", "ethics_review", "No use is present in the current scope; founder must confirm final activities."),
      q("5-04", "Personal data", "a. Yes. b. Founder confirmation required: yes if existing discovery data is reused or merged. c. Founder confirmation required: depends on cloud, research and supplier data flows. d. Founder confirmation required for the same reason. e. No — provisional.", "ethics_review", "Customer research and longitudinal software necessarily involve personal data; international transfer architecture is not final.", { flags: ["DPIA and data-flow review required"] }),
      q("5-05", "Animals", "No — provisional.", "ethics_review", "No animal work is present in the current scope."),
      q("5-06", "Non-EU countries", "a. Yes: KLPS and planned core work are UK-based, and the UK is outside the EU. b–g require final activity, participant, supplier, material-transfer and data-flow confirmation. No low-income-country activity or at-risk participant context is currently evidenced.", "ethics_review", "Canonical company record is UK-based; supplier candidates include the UK, Germany and Denmark.", { flags: ["Cross-border interpretation required"] }),
      q("5-07", "Environment, health and safety", "a. Yes — prudent provisional answer because advanced textile materials and potential graphene nanoplatelet work require environmental and end-of-life assessment. b. No — provisional. c. Yes — prudent provisional answer because material handling, skin contact, electronics and wearer research may create occupational or participant risks requiring controls.", "ethics_review", "Technology Blueprint describes graphene as a future materials hypothesis, not a result; safety evidence is not yet established.", { flags: ["Nanomaterial and skin-contact safety review required"] }),
      q("5-08", "Artificial intelligence", "Yes. KLPS intends to develop software intelligence around longitudinal signals. Ethical concerns include opaque inference, bias across bodies, overclaiming health meaning, automation bias, privacy and unequal performance. Controls should include non-diagnostic claims, representative research, data minimisation, explainable outputs, uncertainty communication, human oversight, performance monitoring and clear escalation to appropriate healthcare advice.", "ethics_review", "Platform narrative and Technology Blueprint software concepts.", { flags: ["AI ethics assessment required"] }),
      q("5-09", "Other ethics issues", "Yes — provisional. Intimate garments and body-pattern data create dignity, consent, safeguarding, accessibility and misinterpretation risks beyond generic data protection. Participants should receive plain-language information, freely given and withdrawable consent, proportionate compensation, privacy during fitting, inclusive recruitment, minimised collection and clear complaint routes. Technical outputs must not be presented as diagnosis or physiological meaning before validation. Material skin-contact, wash degradation and electronic safety need gated evidence. Supplier, cloud and research agreements must define data and IP responsibilities. Any protocol involving wearers, body measurements or images should receive proportionate independent ethics review before recruitment.", "ethics_review", "Current system boundary, founder-fitting limitation, data governance and open safety questions.", { limit: { unit: "characters", maximum: 1000 }, flags: ["Founder and independent ethics review required"] }),
      pending("5-10", "Confirmation that all ethics issues have been considered", "This declaration can only be made by the applicant after final protocol and ethics review.", ["Do not accept on founder's behalf"]),
    ],
  },
  {
    id: "declaration",
    title: "6. Declaration of Honour",
    questions: [
      pending("6-01", "Declaration of Honour and personal-data consent", "The applicant must personally verify truthfulness, legal status, eligibility, financial capacity, exclusions, conflicts, other EU funding, privacy notices and terms before acceptance.", ["Legal declaration", "Do not accept or submit on founder's behalf"]),
    ],
  },
] as const;

export const countFundingAnswer = (answer: string, unit: "words" | "characters") =>
  unit === "characters" ? answer.length : answer.trim().split(/\s+/u).filter(Boolean).length;
