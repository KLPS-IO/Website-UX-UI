import type { TechnologyBlueprint } from "./types";

import finalGarment from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Final-Waistband-Prototype_v1.jpg";
import onBody from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_On-Body-Abdominal-Sensing_v1.jpg";
import firstSignal from "@/assets/Tech Spech 2026/publication/Screenshot 2026-03-31 at 12.59.26.jpg";
import textileCircuit from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_First-Stretch-Sensor-Test-Circuit_v1.jpg";
import stitchedRegion from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Conductive-Waistband-Prototype_v1.jpg";
import removableAssembly from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Internal-Electronics-Assembly_v1.jpg";
import arduino from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Arduino-Breadboard-Test_v1.jpg";
import workbench from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Engineering-Components-Layout_v1.jpg";
import laterSignal from "@/assets/Tech Spech 2026/publication/Screenshot 2026-06-24 at 21.09.52.jpg";
import materials from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Initial-Materials-and-Garment_v1.jpg";
import firstWaistband from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_First-Waistband-Integration_v1.jpg";
import connectionDetail from "@/assets/Tech Spech 2026/publication/20260407_155524.jpg";
import integratedFront from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Integrated-Garment-Front_v1.jpg";
import firstFitting from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_First-On-Body-Wear-Trial_v1.jpg";
import evolutionSignal from "@/assets/Tech Spech 2026/publication/Screenshot 2026-03-31 at 12.55.35.jpg";
import bodyScan from "@/assets/Tech Spech 2026/publication/KLPS_MVP1_BodyScan-Dashboard_v1.jpg";
import statistics from "@/assets/Tech Spech 2026/publication/KLPS_MVP1_Statistics-Dashboard_v1.jpg";
import dailyInsight from "@/assets/Tech Spech 2026/publication/Screenshot 2026-04-04 at 22.01.24.jpg";

const section = (
  number: string,
  title: string,
  question: string,
  state: "PROVEN" | "OBSERVED" | "IN DEVELOPMENT" | "PLANNED",
  body: string[],
  extra: Partial<TechnologyBlueprint["sections"][number]> = {},
): TechnologyBlueprint["sections"][number] => ({
  number,
  title,
  question,
  state,
  body,
  ...extra,
});

export const mvp1Blueprint: TechnologyBlueprint = {
  slug: "mvp1-technology-blueprint",
  metadata: {
    document: "KLPS Technology Blueprint",
    documentType: "Engineering Record 01",
    version: "1.0",
    date: "August 2026",
    currentStage: "MVP1",
    workPackage: "WP1",
    technologyReadiness: "TRL 3 — experimental proof of concept",
    status: "Active Engineering Record",
    confidentiality: "Confidential — Investor Data Room",
  },
  figures: [
    {
      figureNumber: "1.1",
      asset: finalGarment,
      classification: "PROVEN",
      caption:
        "A later hand-built waistband prototype. The conductive region is integrated into a familiar garment form; repeatable manufacture and wear performance remain open questions.",
      evidenceIds: ["EV-003"],
    },
    {
      figureNumber: "3.1",
      asset: onBody,
      classification: "OBSERVED",
      caption:
        "Founder development fitting used to inspect the abdominal sensing position and waistband deformation zone. It is not a comfort, population-fit or clinical study.",
      callouts: ["Abdominal sensing region", "Waistband deformation zone"],
      evidenceIds: ["EV-004"],
    },
    {
      figureNumber: "4.1",
      asset: firstSignal,
      classification: "OBSERVED",
      caption:
        "Arduino Serial Monitor during an early stretch experiment. Changing readings were observed as the textile experiment was manipulated; no formal linearity or repeatability result is claimed.",
      callouts: [
        "Live stretch value",
        "Changing range",
        "Baseline / calibration",
        "Event response",
      ],
      evidenceIds: ["EV-005", "EV-009"],
    },
    {
      figureNumber: "5.1",
      asset: textileCircuit,
      classification: "PROVEN",
      caption:
        "Conductive textile connected to a breadboard measurement circuit through removable prototype leads: the physical bridge from soft material to rigid hardware.",
      callouts: [
        "Conductive textile",
        "Removable contact",
        "Electrical path",
        "Prototype lead",
      ],
      evidenceIds: ["EV-002"],
    },
    {
      figureNumber: "6.1",
      asset: stitchedRegion,
      classification: "PROVEN",
      caption:
        "The hand-stitched sensing region during construction. Temporary stitching and unfinished edges are evidence of an iteration built for learning, not product finish.",
      evidenceIds: ["EV-006"],
    },
    {
      figureNumber: "7.1",
      asset: removableAssembly,
      classification: "PROVEN",
      caption:
        "Internal assembly showing the sensing textile, press-stud connections, wiring and removable development electronics. Washability has not been validated.",
      callouts: [
        "Conductive region",
        "Press-stud connection",
        "Removable electronics",
      ],
      evidenceIds: ["EV-007"],
    },
    {
      figureNumber: "8.1",
      asset: arduino,
      classification: "PROVEN",
      caption:
        "Arduino Nano 33 BLE Sense Rev2 on development wiring. This is measurement hardware, not a custom production PCB.",
      callouts: [
        "Arduino Nano 33 BLE Sense Rev2",
        "Sensor connection",
        "Development wiring",
        "USB development power",
      ],
      evidenceIds: ["EV-002"],
    },
    {
      figureNumber: "9.1",
      asset: workbench,
      classification: "PROVEN",
      caption:
        "MVP1 engineering components brought together on the workbench: textiles, joining tools, electrical connections, development hardware and measurement equipment.",
      callouts: [
        "Textiles",
        "Garment construction",
        "Electrical connection",
        "Embedded hardware",
        "Measurement tools",
        "Firmware development",
      ],
      evidenceIds: ["EV-010"],
    },
    {
      figureNumber: "10.1",
      asset: laterSignal,
      classification: "OBSERVED",
      caption:
        "A separate serial-output capture from later development work. It records exploratory measurement output, not a validated physiological signal or formal performance result.",
      evidenceIds: ["EV-009"],
    },
    {
      figureNumber: "11.1",
      asset: materials,
      classification: "PROVEN",
      caption:
        "Material exploration: garment, conductive textile, conductive thread and prototype components before integration.",
      evidenceIds: ["EV-001"],
    },
    {
      figureNumber: "11.2",
      asset: firstWaistband,
      classification: "PROVEN",
      caption:
        "Initial waistband placement compared with the original garment construction.",
      evidenceIds: ["EV-006"],
    },
    {
      figureNumber: "11.3",
      asset: connectionDetail,
      classification: "PROVEN",
      caption:
        "Press-stud components and installation tooling used to explore a detachable electrical interface.",
      evidenceIds: ["EV-007"],
    },
    {
      figureNumber: "11.4",
      asset: integratedFront,
      classification: "PROVEN",
      caption:
        "Garment iteration combining the stitched sensing region, wiring and externally mounted development electronics.",
      evidenceIds: ["EV-003"],
    },
    {
      figureNumber: "11.5",
      asset: firstFitting,
      classification: "OBSERVED",
      caption:
        "An early founder fitting used to inspect placement and handling of the external development hardware.",
      evidenceIds: ["EV-004"],
    },
    {
      figureNumber: "11.6",
      asset: evolutionSignal,
      classification: "OBSERVED",
      caption:
        "Early serial output used to observe whether the physical experiment produced changing readings.",
      evidenceIds: ["EV-009"],
    },
    {
      figureNumber: "12.1",
      asset: bodyScan,
      classification: "OBSERVED",
      caption:
        "Body Scan concept exploring how a measurement might be presented.",
      evidenceIds: ["EV-008"],
    },
    {
      figureNumber: "12.2",
      asset: statistics,
      classification: "OBSERVED",
      caption:
        "Statistics concept exploring the presentation of longitudinal progress.",
      evidenceIds: ["EV-008"],
    },
    {
      figureNumber: "12.3",
      asset: dailyInsight,
      classification: "OBSERVED",
      caption:
        "Daily-engagement concept exploring how repeated records might support understandable progress over time.",
      evidenceIds: ["EV-008"],
    },
  ],
  sections: [
    section(
      "00",
      "The hardest sensor to build is the one people forget to wear.",
      "Could sensing disappear into everyday life?",
      "IN DEVELOPMENT",
      [
        "Most wearables add another behaviour: put it on, charge it, remember it and keep wearing it. Every missed day creates another gap in the picture.",
        "KLPS started with a different question: could the sensing live inside something people already put on?",
      ],
      {
        layoutVariant: "statement",
        heroStatement:
          "Continuous data only works when the sensing stays with the person.",
        pullQuote:
          "The challenge isn’t only sensing. It’s making sensing disappear into everyday life.",
        questionLabel: "Starting question",
      },
    ),

    section(
      "01",
      "What if the garment was the interface?",
      "Why begin with something already worn?",
      "IN DEVELOPMENT",
      [
        "Underwear already sits close to the body, follows its movement and belongs to an existing daily routine.",
        "That makes the garment more than a place to attach a sensor. It becomes the mechanical interface between the body and the sensing system.",
        "KLPS is exploring whether textile deformation can become a continuous source of body data without introducing another device to remember.",
      ],
      {
        layoutVariant: "split",
        figureIds: ["1.1"],
        pullQuote:
          "Signal begins with movement. The textile is where we listen.",
        questionLabel: "Design premise",
      },
    ),

    section(
      "02",
      "Can fabric learn the movement of the body?",
      "Can stretch become signal?",
      "IN DEVELOPMENT",
      [
        "Our hypothesis is that conductive textile integrated around the abdomen can produce measurable electrical changes as the garment deforms.",
        "If those signals can be made repeatable over time, they may provide the foundation for studying longitudinal patterns associated with body movement and changing body states.",
      ],
      {
        layoutVariant: "statement",
        pullQuote:
          "MVP1 tests the first part of the hypothesis: can stretch become signal?",
        questionLabel: "Hypothesis",
      },
    ),

    section(
      "03",
      "Why start with the abdomen?",
      "Can changing mechanical patterns be captured consistently?",
      "OBSERVED",
      [
        "The abdomen changes throughout the day. Movement, posture, breathing, food, cycle-related changes and normal body variation all alter how this region expands, contracts and carries tension.",
        "MVP1 does not identify those causes. The opportunity is more fundamental: establish whether a textile sensing region can capture changing mechanical patterns consistently enough to build a longitudinal baseline.",
      ],
      {
        layoutVariant: "split",
        figureIds: ["3.1"],
        pullQuote:
          "The first job is not diagnosis. The first job is reliable signal.",
        questionLabel: "Sensing region",
      },
    ),

    section(
      "04",
      "The first test was simple: does the number move?",
      "Could applied stretch create a measurable electrical response?",
      "OBSERVED",
      [
        "Before building intelligence, KLPS had to answer a smaller question. Development electronics and conductive material were assembled into a simple experiment.",
        "Applied deformation produced changing electrical readings. This did not establish physiological meaning. It established something more basic: the textile could become a signal source.",
      ],
      {
        layoutVariant: "evidence",
        figureIds: ["4.1"],
        pullQuote: "We stretched the textile. The signal changed.",
        questionLabel: "First experiment",
      },
    ),

    section(
      "05",
      "From fabric to circuit.",
      "How does a soft sensing region reach rigid hardware?",
      "PROVEN",
      [
        "The sensing region needed a physical electrical path. Conductive textile, conductive thread and removable contacts connected the garment experiment to development electronics.",
        "That bridge between soft material and rigid hardware is one of the core engineering problems in intelligent textiles.",
      ],
      {
        layoutVariant: "split",
        figureIds: ["5.1"],
        questionLabel: "Connection",
      },
    ),

    section(
      "06",
      "Hand-built on purpose.",
      "What did manual construction make possible?",
      "PROVEN",
      [
        "MVP1 was built to answer questions quickly, not to look like a finished product. Materials were positioned, stitched, removed and changed by hand so each iteration could expose the next problem.",
        "The visible stitching, unfinished edges and manual construction are part of the evidence. They show the transition from idea to physical experiment.",
      ],
      {
        layoutVariant: "full-bleed",
        figureIds: ["6.1"],
        pullQuote:
          "Prototype quality is not product quality. At MVP1, learning speed mattered more.",
        questionLabel: "Construction",
      },
    ),

    section(
      "07",
      "The garment and the electronics needed to separate.",
      "Could the development hardware be removable?",
      "PROVEN",
      [
        "Textile and electronics have different handling requirements. Press-stud-style contacts created a simple removable interface between the conductive sensing region and external development hardware.",
        "The interface supports experimentation. It is not presented as wash-safe, electrically validated over repeated connection cycles or ready for wear outside development work.",
      ],
      {
        layoutVariant: "split",
        figureIds: ["7.1"],
        questionLabel: "Removable interface",
      },
    ),

    section(
      "08",
      "What did we actually build?",
      "What electronics exist in MVP1?",
      "PROVEN",
      [
        "MVP1 uses development hardware rather than production electronics: an Arduino Nano 33 BLE Sense Rev2, prototype wiring and removable textile connections.",
        "Its purpose is measurement, experimentation and iteration—not miniaturisation.",
      ],
      {
        layoutVariant: "evidence",
        figureIds: ["8.1"],
        pullQuote: "Development hardware first. Product electronics later.",
        decision: {
          decision: "Use modular development hardware for MVP1.",
          reason:
            "It allows rapid circuit and firmware iteration before a production architecture is justified.",
          alternatives: [],
          tradeOff:
            "The assembly remains bulky and unsuitable for product-level wearability.",
          evidenceIds: ["EV-002", "EV-007"],
        },
        questionLabel: "Electronics",
      },
    ),

    section(
      "09",
      "A garment became an engineering system.",
      "What came together on the workbench?",
      "PROVEN",
      [
        "By MVP1, the experiment was no longer one material or one circuit. It spanned textile construction, electronics, firmware and physical wear.",
        "The value of MVP1 is not that every element is solved. It is that the interactions between them are now visible.",
      ],
      {
        layoutVariant: "full-bleed",
        figureIds: ["9.1"],
        questionLabel: "System view",
      },
    ),

    section(
      "10",
      "What is the signal today?",
      "What does MVP1 measure now?",
      "PROVEN",
      [
        "MVP1 detects changes in electrical response as the textile is deformed. That is the current measurement.",
        "The system does not yet determine why the body moved or what that movement means physiologically. The next challenge is repeatability across time, garments and wear conditions.",
      ],
      {
        layoutVariant: "evidence",
        figureIds: ["10.1"],
        comparison: {
          leftLabel: "Today",
          left: "Textile deformation → electrical response",
          rightLabel: "Future research",
          right: "Repeatable signal → longitudinal interpretation",
        },
        questionLabel: "Current measurement",
      },
    ),

    section(
      "11",
      "The prototype did not appear fully formed.",
      "How did each version expose the next question?",
      "PROVEN",
      [
        "Each physical iteration answered one question and made the next uncertainty visible. This is a progression in experimental configuration—not evidence of validated product performance.",
      ],
      {
        layoutVariant: "timeline",
        questionLabel: "Prototype evolution",
        pullQuote: "Each version answered one question and exposed another.",
        evolutionSteps: [
          {
            stage: "Material exploration",
            figureId: "11.1",
            changed:
              "Conductive textile, thread and a close-fitting garment were brought together.",
            reason:
              "Create the smallest practical garment-based deformation experiment.",
            learned:
              "The materials could be combined into a workable early prototype.",
            unresolved:
              "Material specification, resistance, durability and washability.",
          },
          {
            stage: "Sensing region",
            figureId: "11.2",
            changed: "Conductive textile was positioned at the waistband.",
            reason: "Inspect placement before committing to a stitched region.",
            learned:
              "The waistband provides a practical experimental location.",
            unresolved:
              "Dimensional control, fit consistency and repeatable construction.",
          },
          {
            stage: "Connection",
            figureId: "11.3",
            changed: "Press-stud components introduced a detachable contact.",
            reason: "Separate garment construction from reusable electronics.",
            learned: "A removable physical interface could be assembled.",
            unresolved:
              "Connection life, electrical stability and wash handling.",
          },
          {
            stage: "Electronics integration",
            figureId: "11.4",
            changed:
              "Development electronics were combined with the stitched garment.",
            reason:
              "Examine the garment and measurement hardware as one experiment.",
            learned: "The elements coexist as an MVP1 platform.",
            unresolved:
              "Miniaturisation, enclosure, power and wearer handling.",
          },
          {
            stage: "On-body fitting",
            figureId: "11.5",
            changed:
              "The integrated prototype was inspected during a founder fitting.",
            reason: "Observe placement and handling on the body.",
            learned:
              "The fitting allowed us to inspect sensor placement and handling on the body.",
            unresolved:
              "Long-duration comfort, sizes, multiple bodies and formal wear validation.",
          },
          {
            stage: "Signal capture",
            figureId: "11.6",
            changed: "Serial output was observed during physical manipulation.",
            reason: "Check whether the experiment produced changing readings.",
            learned:
              "Applied stretch produced a visible electrical response through the prototype circuit.",
            unresolved:
              "Repeatability, artefacts, calibration stability and physiological meaning.",
          },
        ],
      },
    ),

    section(
      "12",
      "The signal was never meant to stop at the garment.",
      "How might repeated measurements become understandable over time?",
      "OBSERVED",
      [
        "While sensing hardware was being explored, KLPS also developed software concepts around measurement, longitudinal progress and daily engagement.",
        "These interfaces are not validated sensor-driven health outputs. They show the intended destination: turn repeated measurements into something a person can understand over time.",
      ],
      {
        layoutVariant: "cards",
        figureIds: ["12.1", "12.2", "12.3"],
        pullQuote: "Signal → Memory → Insight",
        questionLabel: "Software direction",
      },
    ),

    section(
      "13",
      "How the experiment connects.",
      "Where does the current prototype boundary end?",
      "IN DEVELOPMENT",
      [
        "The current measurement path runs from conductive textile through a removable connection and Arduino-based development hardware into firmware measurement and data-capture exploration.",
        "KLPS research software supports records, evidence and interface exploration. It is shown separately because it is not yet a validated embedded telemetry pipeline.",
      ],
      { layoutVariant: "architecture", questionLabel: "System architecture" },
    ),

    section(
      "14",
      "What still needs proving?",
      "Which uncertainties become the engineering roadmap?",
      "IN DEVELOPMENT",
      [
        "MVP1 makes the unanswered questions concrete. Each one now points to a test, protocol or later validation programme.",
      ],
      {
        layoutVariant: "cards",
        questionLabel: "Opportunity map",
        items: [
          "Wash durability | Not yet validated → WP1 wash protocol",
          "Repeatability | Not yet established → controlled strain testing",
          "Garment fit | Founder fitting only → multi-size validation",
          "Calibration stability | Not yet validated → repeatability protocol",
          "Long-duration wear | Not established → wear study",
          "Physiological interpretation | Not established → later WP3 validation",
        ],
        pullQuote: "The unanswered questions are the roadmap.",
      },
    ),

    section(
      "15",
      "What MVP1 proves today.",
      "What has moved beyond concept?",
      "PROVEN",
      [
        "A physical sensor-integrated underwear prototype exists. Conductive textile is integrated into the garment. Development electronics connect to the sensing region. Stretch-related electrical responses can be observed.",
        "The system can now be subjected to controlled engineering tests.",
      ],
      {
        layoutVariant: "statement",
        pullQuote:
          "MVP1 does not finish the technology. It makes the next experiments possible.",
        questionLabel: "Evidence today",
      },
    ),

    section(
      "16",
      "What MVP1 leaves unanswered.",
      "What can the present evidence not tell us?",
      "PROVEN",
      [
        "How the textile behaves after repeated washing. How repeatable the signal is across garments. How body size and fit affect measurement. How stable calibration remains over long wear.",
        "Whether signal patterns correlate with specific physiological states. What production electronics should look like. What the manufacturing economics will be.",
      ],
      { layoutVariant: "statement", questionLabel: "Open questions" },
    ),

    section(
      "17",
      "Why graphene comes next—not first.",
      "When should the material itself be re-engineered?",
      "PLANNED",
      [
        "MVP1 uses commercially available conductive materials because the first job was to test the sensing concept.",
        "KLPS intends to investigate whether nylon blended with graphene nanoplatelets can produce a conductive fibre better suited to integrated textile sensing. That is a materials hypothesis, not yet a result.",
      ],
      {
        layoutVariant: "standard",
        items: [
          "Formulation",
          "Fibre production",
          "Material characterisation",
          "Textile construction",
          "Garment integration",
          "Comparative validation",
        ],
        pullQuote:
          "First prove the sensing system. Then improve the material at its source.",
        questionLabel: "Materials pathway",
      },
    ),

    section(
      "18",
      "The next chapter is repeatability.",
      "Can the experiment work consistently?",
      "PLANNED",
      [
        "WP1 moves the programme from ‘Can this work?’ towards ‘Can this work consistently?’",
      ],
      {
        layoutVariant: "cards",
        items: [
          "Resistance under controlled strain",
          "Hysteresis",
          "Drift over repeated cycles",
          "Attachment-method effects",
          "Wash-performance change",
          "Sensing-region repeatability across garments",
        ],
        pullQuote: "WP1 is where prototype behaviour becomes engineering data.",
        questionLabel: "WP1",
      },
    ),

    section(
      "19",
      "Where are we really?",
      "What is the defensible readiness position?",
      "OBSERVED",
      [
        "KLPS is currently at TRL 3: an experimental proof of concept supported by physical prototypes and exploratory testing.",
        "The next step is not simply ‘TRL 4’. The next step is evidence: repeatable performance under controlled conditions.",
      ],
      {
        layoutVariant: "comparison",
        comparison: {
          leftLabel: "You are here",
          left: "TRL 3 · Experimental proof of concept",
          rightLabel: "Next evidence gate",
          right: "Controlled repeatability → TRL 4 target",
        },
        questionLabel: "Technology readiness",
      },
    ),

    section(
      "20",
      "This is the beginning of the engineering record.",
      "What becomes possible after MVP1?",
      "IN DEVELOPMENT",
      [
        "MVP1 answered the first question: can textile deformation become a measurable electrical signal inside a garment? Yes—at experimental prototype level.",
        "The next questions are harder. Can it become repeatable? Can it survive real use? Can the materials be engineered for scale? Can longitudinal signal eventually become meaningful body intelligence?",
      ],
      {
        layoutVariant: "statement",
        heroStatement: "The garment is built. Now the evidence gets deeper.",
        pullQuote: "Signal → Memory → Insight",
        questionLabel: "Next chapter",
      },
    ),

    section(
      "21",
      "Evidence Register",
      "Which records support this engineering story?",
      "PROVEN",
      [
        "Each record states what the evidence establishes and where its limits begin.",
      ],
      { layoutVariant: "standard", questionLabel: "Controlled evidence" },
    ),
  ],
  evidence: [
    {
      id: "EV-001",
      question:
        "Were candidate conductive materials and a garment physically explored?",
      type: "Prototype photography",
      asset: "Initial materials and garment",
      status: "PROVEN",
      establishes:
        "Candidate textile, conductive thread and garment materials were assembled for development.",
      doesNotEstablish:
        "Material composition, durability, washability or production suitability.",
      workPackage: "WP1",
    },
    {
      id: "EV-002",
      question: "Does an Arduino-based prototype measurement circuit exist?",
      type: "Prototype photography",
      asset: "Arduino breadboard and removable leads",
      status: "PROVEN",
      establishes:
        "Arduino Nano 33 BLE Sense Rev2 development hardware and a wired prototype circuit exist.",
      doesNotEstablish:
        "Custom PCB, battery life, BLE reliability or production readiness.",
      workPackage: "WP1/WP2",
    },
    {
      id: "EV-003",
      question:
        "Can conductive textile be physically integrated into underwear?",
      type: "Prototype photography",
      asset: "Integrated garment iterations",
      status: "PROVEN",
      establishes:
        "Physical integration is feasible at hand-built prototype level.",
      doesNotEstablish:
        "Manufacturing repeatability, fit consistency, wash durability or comfort.",
      workPackage: "WP1",
    },
    {
      id: "EV-004",
      question: "Has placement been inspected on body?",
      type: "Development photography",
      asset: "Founder on-body fitting images",
      status: "OBSERVED",
      establishes:
        "Founder development fittings were undertaken to inspect placement and handling.",
      doesNotEstablish:
        "Formal wear validation, multiple participants, clinical relevance or long-duration comfort.",
      workPackage: "WP1",
    },
    {
      id: "EV-005",
      question:
        "Can the prototype explore an electrical response during stretch?",
      type: "Bench configuration and serial output",
      asset: "Stretch experiment",
      status: "OBSERVED",
      establishes:
        "A physical test arrangement exists and changing readings were observed during manipulation.",
      doesNotEstablish:
        "Linearity, SNR, repeatability, physiological meaning or validated thresholds.",
      workPackage: "WP1",
    },
    {
      id: "EV-006",
      question: "How was the conductive sensing region introduced?",
      type: "Construction photography",
      asset: "Waistband integration images",
      status: "PROVEN",
      establishes:
        "Manual placement and stitching of a conductive waistband region occurred across iterations.",
      doesNotEstablish:
        "Repeatable manufacture, seam durability, washability or dimensional tolerance.",
      workPackage: "WP1",
    },
    {
      id: "EV-007",
      question: "Are the sensing region and electronics physically connected?",
      type: "Assembly photography",
      asset: "Internal assembly and press-stud details",
      status: "PROVEN",
      establishes:
        "Press-stud contacts and wiring link the textile region to development electronics.",
      doesNotEstablish:
        "Connection-cycle life, electrical stability, wearer safety or commercial packaging.",
      workPackage: "WP1/WP2",
    },
    {
      id: "EV-008",
      question: "Do KLPS software-interface concepts exist?",
      type: "Application screenshots",
      asset: "Body Scan, statistics and daily-engagement concepts",
      status: "OBSERVED",
      establishes:
        "Interface concepts for measurement, progress and engagement were explored.",
      doesNotEstablish:
        "Validated sensor ingestion, accurate measurements or physiological interpretation.",
      workPackage: "Software research",
    },
    {
      id: "EV-009",
      question: "Was exploratory serial output captured?",
      type: "Arduino IDE screenshots",
      asset: "Serial Monitor development captures",
      status: "OBSERVED",
      establishes:
        "Changing development readings were captured during prototype experiments.",
      doesNotEstablish:
        "A controlled test result, calibration stability, repeatability or physiological meaning.",
      workPackage: "WP1",
    },
    {
      id: "EV-010",
      question: "Did MVP1 span multiple engineering disciplines?",
      type: "Workbench photography",
      asset: "Engineering components layout",
      status: "PROVEN",
      establishes:
        "Textile, construction, connection, electronics and measurement components were assembled for MVP1 work.",
      doesNotEstablish:
        "A finished system, production process or validated end-to-end telemetry.",
      workPackage: "WP1/WP2",
    },
  ],
};
