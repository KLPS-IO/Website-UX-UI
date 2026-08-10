import type { TechnologyBlueprint } from "./types";
import materials from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Initial-Materials-and-Garment_v1.jpg";
import circuit from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_First-Stretch-Sensor-Test-Circuit_v1.jpg";
import arduino from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Arduino-Breadboard-Test_v1.jpg";
import garment from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Integrated-Garment-with-Electronics_v1.jpg";
import body from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_On-Body-Abdominal-Sensing_v1.jpg";
import bench from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Stretch-Sensor-Bench-Test_v1.jpg";
import firstWaistband from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_First-Waistband-Integration_v1.jpg";
import conductiveWaistband from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Conductive-Waistband-Prototype_v1.jpg";
import internalElectronics from "@/assets/Tech Spech 2026/publication/KLPS_WP1_MVP1_Internal-Electronics-Assembly_v1.jpg";
import bodyInterface from "@/assets/Tech Spech 2026/publication/KLPS_MVP1_Body-Measurement-Interface_v1.jpg";

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
    documentType: "Engineering Record",
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
      figureNumber: "6.1",
      asset: materials,
      classification: "PROVEN",
      caption:
        "Early material exploration showing a close-fitting garment, conductive textile samples and conductive thread before integration.",
      evidenceIds: ["EV-001"],
    },
    {
      figureNumber: "9.1",
      asset: circuit,
      classification: "PROVEN",
      caption:
        "Arduino Nano 33 BLE Sense Rev2 breadboard circuit with removable press-stud leads used to explore a textile-resistance measurement path.",
      evidenceIds: ["EV-002"],
    },
    {
      figureNumber: "9.2",
      asset: arduino,
      classification: "PROVEN",
      caption:
        "Close view of the actual Arduino-based prototype electronics. This is development hardware, not a custom production PCB.",
      evidenceIds: ["EV-002"],
    },
    {
      figureNumber: "14.1",
      asset: garment,
      classification: "PROVEN",
      caption:
        "MVP1 garment iteration with conductive waistband region, removable connections and externally mounted prototype electronics.",
      evidenceIds: ["EV-003"],
    },
    {
      figureNumber: "14.2",
      asset: body,
      classification: "OBSERVED",
      caption:
        "An on-body fitting experiment used to inspect placement and garment behaviour. It does not establish long-duration comfort, clinical performance or population-level fit.",
      evidenceIds: ["EV-004"],
    },
    {
      figureNumber: "11.1",
      asset: bench,
      classification: "PROVEN",
      caption:
        "Bench configuration used to explore electrical response during applied stretch. No formal linearity, SNR or durability result is claimed.",
      evidenceIds: ["EV-005"],
    },
    {
      figureNumber: "8.1",
      asset: firstWaistband,
      classification: "PROVEN",
      caption:
        "Early waistband integration experiment comparing the original garment construction with a manually positioned conductive textile layer. It establishes physical material placement only.",
      evidenceIds: ["EV-006"],
    },
    {
      figureNumber: "8.2",
      asset: conductiveWaistband,
      classification: "PROVEN",
      caption:
        "Hand-stitched conductive sensing region during construction. Visible temporary stitching and unfinished edges show the experimental manufacturing state.",
      evidenceIds: ["EV-006"],
    },
    {
      figureNumber: "9.3",
      asset: internalElectronics,
      classification: "PROVEN",
      caption:
        "Internal MVP1 assembly showing conductive textile, press-stud connections, wiring and development electronics. The assembly is removable but not miniaturised or production-ready.",
      evidenceIds: ["EV-007"],
    },
    {
      figureNumber: "13.1",
      asset: bodyInterface,
      classification: "OBSERVED",
      caption:
        "Early KLPS body-measurement interface captured during software exploration. It establishes that an interface concept exists; it does not establish validated sensor ingestion or physiological interpretation.",
      evidenceIds: ["EV-008"],
    },
  ],
  sections: [
    section("00", "Document Control", "What record is this?", "PROVEN", [
      "This controlled publication records the evidence available for KLPS MVP1 and separates demonstrated prototype facts from observations, work in development and future objectives.",
    ]),
    section(
      "01",
      "Engineering Summary",
      "What does MVP1 establish?",
      "PROVEN",
      [
        "A physical sensor-integrated underwear prototype exists. Conductive textile, conductive thread, removable connections and Arduino-based electronics have been assembled to investigate textile deformation as an electrical signal.",
        "MVP1 is an experimental platform. It is not a clinical device or commercial product.",
      ],
      {
        keyLearning:
          "Garment integration and an electrical measurement path are feasible at prototype level.",
        nextActivity:
          "Convert prototype observations into repeatable WP1 test protocols.",
        workPackage: "WP1",
      },
    ),
    section(
      "02",
      "Scientific Hypothesis",
      "What is the underlying hypothesis?",
      "IN DEVELOPMENT",
      [
        "Changes in the deformation of a close-fitting textile sensing region may create measurable electrical responses over time.",
        "A future research programme may investigate whether validated longitudinal signal features correlate with body-state patterns. MVP1 does not establish that inference.",
      ],
      { nextActivity: "Define falsifiable sensing and repeatability tests." },
    ),
    section(
      "03",
      "Why Textiles?",
      "Why investigate a garment-based sensing interface?",
      "IN DEVELOPMENT",
      [
        "Textiles can place a sensing region close to the body while using a familiar garment form. The engineering challenge is to preserve repeatable contact, stretch behaviour and usable signals without assuming comfort or durability.",
      ],
      {
        keyLearning:
          "The textile is both sensing medium and mechanical interface.",
      },
    ),
    section(
      "04",
      "Target Sensing Region",
      "Where is MVP1 investigating deformation?",
      "OBSERVED",
      [
        "MVP1 places conductive material around the waistband and abdominal region. Photographs establish placement, not validated physiological interpretation.",
      ],
      { figureIds: ["14.2"] },
    ),
    section(
      "05",
      "Engineering Question",
      "What must be resolved before progression?",
      "IN DEVELOPMENT",
      [
        "Can an integrated conductive textile produce repeatable electrical responses under controlled deformation, garment fit and repeated use conditions?",
      ],
      {
        items: [
          "Signal repeatability",
          "Fit and placement sensitivity",
          "Material durability",
          "Connection reliability",
          "Calibration behaviour",
        ],
      },
    ),
    section(
      "06",
      "Experimental Progression",
      "How did the prototype move from material to garment?",
      "PROVEN",
      [
        "Work progressed from material exploration to a simple circuit, waistband integration, removable electronics, on-body fitting and signal-capture experiments.",
      ],
      {
        figureIds: ["6.1", "9.1"],
        keyLearning:
          "Each iteration reduced uncertainty about physical integration while exposing new repeatability questions.",
      },
    ),
    section(
      "07",
      "Material Selection",
      "What sensing materials are present?",
      "PROVEN",
      [
        "The repository photographs show conductive textile, including silver-coloured conductive material, and conductive thread used with a conventional stretch garment.",
      ],
      {
        figureIds: ["6.1"],
        nextActivity:
          "Record composition, resistance, dimensions and supplier provenance for each test sample.",
      },
    ),
    section(
      "08",
      "MVP1 Garment Construction",
      "How is the sensing region integrated?",
      "PROVEN",
      [
        "Conductive textile is attached around the waistband/abdominal sensing region of a close-fitting prototype underwear platform. Construction remains an experimental hand-built iteration.",
      ],
      { figureIds: ["8.1", "8.2", "14.1"] },
    ),
    section(
      "09",
      "Electronics & Connections",
      "What electronics are actually implemented?",
      "PROVEN",
      [
        "MVP1 uses an Arduino Nano 33 BLE Sense Rev2 on breadboard/prototype wiring, with resistive components, conductive leads and press-stud-style removable connections.",
        "No custom KLPS PCB, production enclosure, final battery system or validated runtime is claimed.",
      ],
      {
        figureIds: ["9.1", "9.2", "9.3"],
        decision: {
          decision: "Use accessible modular development hardware for MVP1.",
          reason:
            "It supports rapid circuit and firmware iteration without prematurely fixing a production architecture.",
          alternatives: [],
          tradeOff:
            "The assembly is bulky and unsuitable for product-level wearability.",
          evidenceIds: ["EV-002", "EV-007"],
        },
      },
    ),
    section(
      "10",
      "Firmware & Calibration",
      "How is the electrical response made usable?",
      "IN DEVELOPMENT",
      [
        "MVP1 firmware work uses baseline/calibration concepts and stretch measurements. Repository evidence does not justify claims for production firmware, OTA updates, formal linearity or validated calibration stability.",
      ],
      {
        nextActivity:
          "Version the firmware and publish controlled calibration/test procedures.",
      },
    ),
    section(
      "11",
      "Signal Capture",
      "What is measured?",
      "PROVEN",
      [
        "The present measurement is an electrical response associated with applied textile deformation/stretch. It is not a validated measurement of digestion, hormones, bloating, respiration or a clinical condition.",
      ],
      {
        figureIds: ["11.1"],
        observation: {
          observation:
            "Applied textile deformation can be explored through the prototype electrical path.",
          context:
            "Bench and garment experiments using conductive textile and Arduino-based electronics.",
          implication:
            "Repeatability and artefact controls are the next evidence gate.",
          evidenceIds: ["EV-005"],
        },
      },
    ),
    section(
      "12",
      "MVP1 System Architecture",
      "What is the evidenced end-to-end system?",
      "IN DEVELOPMENT",
      [
        "Conductive textile → removable electrical connection → Arduino Nano 33 BLE Sense Rev2 → firmware measurement/calibration → BLE/data capture exploration → KLPS application and research interfaces.",
        "The current website platform uses a React/TypeScript client, an Express/TypeScript service, PostgreSQL and private Cloudflare R2 object storage, deployed through the repository’s Railway-backed service architecture. This web stack documents and supports research; it is not presented as validated embedded-device telemetry infrastructure.",
      ],
      {
        items: [
          "Textile sensor",
          "Prototype circuit",
          "Arduino firmware",
          "BLE exploration",
          "Application/research interface",
          "Express API",
          "PostgreSQL",
          "Private R2 evidence storage",
        ],
      },
    ),
    section(
      "13",
      "Software / Research Infrastructure",
      "What supporting software exists?",
      "PROVEN",
      [
        "The repository contains authenticated Data Room, R&D work-package, evidence, research and dashboard interfaces. These systems organise records and research workflows; screenshots do not by themselves validate sensor performance.",
      ],
      {
        figureIds: ["13.1"],
        nextActivity: "Link future test outputs to canonical evidence records.",
      },
    ),
    section(
      "14",
      "Prototype Evolution",
      "What physical progression is visible?",
      "PROVEN",
      [
        "The photographic record shows material exploration, sensing-region construction, circuit prototyping, removable connection, electronics integration and an on-body development fitting. This is progression in experimental configuration, not validated product performance.",
      ],
      {
        figureIds: [
          "6.1",
          "8.1",
          "8.2",
          "9.1",
          "9.3",
          "14.1",
          "14.2",
          "11.1",
          "13.1",
        ],
        evolutionSteps: [
          {
            stage: "Material exploration",
            figureId: "6.1",
            changed:
              "Conductive textile, thread and a close-fitting garment were brought together as candidate prototype materials.",
            reason:
              "To determine whether a garment-based deformation experiment could be assembled from accessible materials.",
            learned:
              "The constituent materials could be physically combined for early trials.",
            unresolved:
              "Electrical repeatability, attachment method, durability and washability.",
          },
          {
            stage: "Initial garment integration",
            figureId: "8.1",
            changed:
              "A conductive textile layer was manually positioned at the waistband.",
            reason:
              "To inspect placement before committing to a stitched sensing region.",
            learned:
              "The waistband provides a practical experimental integration location.",
            unresolved:
              "Dimensional control, fit consistency and repeatable construction.",
          },
          {
            stage: "Conductive sensing region",
            figureId: "8.2",
            changed:
              "The conductive layer was hand stitched into the garment construction.",
            reason:
              "To create a retained textile region for subsequent electrical experiments.",
            learned:
              "A hand-built conductive region can be integrated physically.",
            unresolved:
              "Seam durability, wash behaviour and manufacturing repeatability.",
          },
          {
            stage: "Wired prototype",
            figureId: "9.1",
            changed:
              "The textile experiment was connected to a breadboard measurement circuit.",
            reason:
              "To explore whether applied stretch is associated with an electrical response.",
            learned:
              "The physical measurement path can support exploratory readings.",
            unresolved:
              "Linearity, noise, calibration stability and artefact control.",
          },
          {
            stage: "Removable connection",
            figureId: "9.3",
            changed:
              "Press studs and wiring linked the textile region to removable development electronics.",
            reason:
              "To separate garment construction from reusable measurement hardware.",
            learned:
              "A detachable physical connection can be assembled at prototype level.",
            unresolved:
              "Connection-cycle life, electrical stability, bulk and wearer safety.",
          },
          {
            stage: "Electronics integration",
            figureId: "14.1",
            changed:
              "Development electronics were mounted with the integrated garment prototype.",
            reason:
              "To examine the combined garment-and-electronics configuration.",
            learned: "The elements coexist as an MVP1 experimental platform.",
            unresolved:
              "Miniaturisation, enclosure, power, runtime and product wearability.",
          },
          {
            stage: "On-body development fitting",
            figureId: "14.2",
            changed:
              "The integrated garment was inspected during a founder development fitting.",
            reason: "To observe placement and garment behaviour on body.",
            learned:
              "Placement can be inspected in a development fitting context.",
            unresolved:
              "Long-duration comfort, multiple bodies, size repeatability and formal wear validation.",
          },
          {
            stage: "Electrical signal capture",
            figureId: "11.1",
            changed:
              "A bench arrangement applied stretch while observing the electrical path.",
            reason:
              "To move from physical assembly towards controlled measurement questions.",
            learned:
              "Stretch-related electrical response can be explored with the prototype.",
            unresolved:
              "Repeatability, SNR, validation thresholds and physiological meaning.",
          },
          {
            stage: "Research / software interface",
            figureId: "13.1",
            changed:
              "An early interface concept presented body-measurement information.",
            reason:
              "To explore how future research measurements might be represented.",
            learned:
              "A KLPS interface concept exists independently of sensor validation.",
            unresolved:
              "Validated ingestion, measurement accuracy and physiological interpretation.",
          },
        ],
        keyLearning:
          "Physical iteration moved uncertainty from basic integration towards repeatability, artefact and validation questions.",
        nextActivity:
          "Record each future iteration against a controlled change, test method and result.",
      },
    ),
    section(
      "15",
      "Engineering Observations",
      "What has been observed without formal validation?",
      "OBSERVED",
      [
        "Garment placement, wiring movement, connection bulk and hand-built textile construction may affect the measured response. These are development observations requiring controlled comparison.",
      ],
      {
        keyLearning:
          "Mechanical and electrical variables cannot yet be separated reliably.",
      },
    ),
    section(
      "16",
      "Known Limitations",
      "What currently constrains confidence?",
      "PROVEN",
      [
        "MVP1 lacks formal evidence for wash durability, repeatability across sizes and bodies, long-duration wear, stable calibration, artefact rejection, production electronics, manufacturing repeatability and physiological interpretation.",
      ],
      {
        items: [
          "Material durability — protocol not completed",
          "Washability — unproven",
          "Calibration stability — unproven",
          "Garment fit repeatability — unproven",
          "Long-duration performance — unproven",
          "Physiological classification — unproven",
        ],
      },
    ),
    section(
      "17",
      "What MVP1 Establishes",
      "What can be stated directly?",
      "PROVEN",
      [
        "Physical garment integration is feasible at prototype level; actual Arduino-based electronics and removable textile connections exist; and stretch-related electrical response can be investigated using this platform.",
      ],
    ),
    section(
      "18",
      "What MVP1 Does NOT Yet Establish",
      "Which claims remain outside the evidence?",
      "PROVEN",
      [
        "MVP1 does not establish clinical relevance, physiological classification, formal comfort, multi-size performance, wash durability, signal-quality thresholds, battery life, wireless reliability, manufacturing yield or commercial economics.",
      ],
    ),
    section(
      "19",
      "WP1: Textile Sensing",
      "What is the next engineering gate?",
      "IN DEVELOPMENT",
      [
        "WP1 should characterise materials, textile construction, resistance response, hysteresis, drift, repeatability, attachment methods and wash/durability behaviour under controlled protocols.",
      ],
      { workPackage: "WP1" },
    ),
    section(
      "20",
      "WP2: Electronics & Power",
      "What follows textile feasibility?",
      "PLANNED",
      [
        "Future work should translate the development circuit into requirements for smaller electronics, safe power, connection robustness and product-level integration. No custom PCB or runtime result is claimed.",
      ],
      { workPackage: "WP2" },
    ),
    section(
      "21",
      "WP3: Body Intelligence",
      "When can body-state inference be investigated?",
      "PLANNED",
      [
        "Only after sensing repeatability and artefacts are characterised should longitudinal features and potential body-state correlations be studied with appropriate validation and governance.",
      ],
      { workPackage: "WP3" },
    ),
    section(
      "22",
      "Graphene Materials Pathway",
      "Why is graphene being considered?",
      "PLANNED",
      [
        "The current MVP uses commercially available conductive material. KLPS intends to investigate a nylon and graphene-nanoplatelet melt-spun fibre pathway as a materials hypothesis.",
        "Planned gates are formulation, fibre production, material characterisation, textile construction, garment integration and comparative validation. No KLPS graphene sensor performance result is claimed.",
      ],
      {
        nextActivity:
          "Define material characterisation criteria before comparative claims.",
      },
    ),
    section(
      "23",
      "Manufacturing Progression",
      "What must change before repeatable manufacture?",
      "PLANNED",
      [
        "Hand-built integration must progress to controlled patterns, material specifications, connection methods, assembly tolerances, inspection criteria and traceable test records.",
      ],
      {
        items: [
          "Repeatable sensing-zone dimensions",
          "Documented joining method",
          "Component traceability",
          "In-process inspection",
          "End-of-line functional test",
        ],
      },
    ),
    section(
      "24",
      "Technology Readiness",
      "What is the defensible readiness position?",
      "OBSERVED",
      [
        "Current evidence is consistent with TRL 3: an experimental proof of concept supported by physical prototypes and exploratory testing.",
        "The next validation gate is repeatable WP1 performance under controlled deformation and environmental/durability protocols. A higher target TRL is not treated as achieved.",
      ],
      {
        keyLearning: "TRL is an evidence conclusion, not a roadmap decoration.",
      },
    ),
    section(
      "25",
      "Engineering Status",
      "Where does the programme stand now?",
      "IN DEVELOPMENT",
      [
        "MVP1 physically exists and combines conductive textile, garment integration, prototype electronics and firmware-led measurement exploration.",
        "Wash durability, manufacturing and fit repeatability, long-duration performance, physiological classification, clinical relevance, commercial electronics and production economics remain unproven.",
      ],
      {
        nextActivity:
          "WP1 textile sensing development and controlled evidence capture.",
      },
    ),
    section("26", "Technical Glossary", "How are key terms used?", "PROVEN", [
      "Textile deformation: change in textile geometry under applied movement or stretch. Calibration: establishing a reference for subsequent measurements. BLE: Bluetooth Low Energy. MVP1: the current experimental minimum viable prototype. Evidence state: PROVEN, OBSERVED, IN DEVELOPMENT or PLANNED.",
    ]),
    section(
      "27",
      "Evidence Register",
      "Which records support the conclusions?",
      "PROVEN",
      [
        "The register below states both what each item establishes and what it does not establish. Future blueprint versions should extend this same structure.",
      ],
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
        "Material durability, composition, washability or production suitability.",
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
      asset: "Integrated garment with electronics",
      status: "PROVEN",
      establishes:
        "Physical integration is feasible at hand-built prototype level.",
      doesNotEstablish:
        "Manufacturing repeatability, fit consistency, wash durability or comfort.",
      workPackage: "WP1",
    },
    {
      id: "EV-004",
      question: "Has the placement been inspected on body?",
      type: "Development photograph",
      asset: "On-body abdominal sensing experiment",
      status: "OBSERVED",
      establishes:
        "A founder development fitting was undertaken to inspect placement.",
      doesNotEstablish:
        "Formal wear validation, multiple participants, clinical relevance or long-duration comfort.",
      workPackage: "WP1",
    },
    {
      id: "EV-005",
      question:
        "Can the prototype explore an electrical response during stretch?",
      type: "Bench configuration photograph",
      asset: "Stretch-sensor bench test",
      status: "PROVEN",
      establishes:
        "A physical test arrangement exists for observing stretch-related electrical response.",
      doesNotEstablish:
        "Linearity, SNR, repeatability, physiological meaning or validated performance thresholds.",
      workPackage: "WP1",
    },
    {
      id: "EV-006",
      question:
        "How was the conductive sensing region introduced into the garment?",
      type: "Construction photography",
      asset: "First and conductive waistband integrations",
      status: "PROVEN",
      establishes:
        "Manual placement and stitching of a conductive waistband region occurred across physical iterations.",
      doesNotEstablish:
        "Repeatable manufacture, seam durability, washability or dimensional tolerance.",
      workPackage: "WP1",
    },
    {
      id: "EV-007",
      question:
        "Are the sensing region and development electronics physically connected?",
      type: "Internal assembly photography",
      asset: "Internal electronics assembly",
      status: "PROVEN",
      establishes:
        "Press-stud connections and wiring link the textile region to development electronics in MVP1.",
      doesNotEstablish:
        "Connection-cycle life, electrical stability, wearer safety or commercial packaging.",
      workPackage: "WP1/WP2",
    },
    {
      id: "EV-008",
      question: "Does a KLPS software-interface concept exist?",
      type: "Application screenshot",
      asset: "Body-measurement interface",
      status: "OBSERVED",
      establishes:
        "An early interface concept and measurement presentation were explored.",
      doesNotEstablish:
        "Validated sensor ingestion, accurate measurements or physiological interpretation.",
      workPackage: "Software research",
    },
  ],
};
