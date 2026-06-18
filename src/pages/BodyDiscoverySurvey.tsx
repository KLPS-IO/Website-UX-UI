import { useState, useRef } from "react";
import { API_BASE } from "@/config/api";
import { type ConcernsMap } from "@/components/survey/BodyMap";
import { BodyImageMap } from "@/components/survey/BodyImageMap";
import {
  BodyTypePicker,
  type BodyType,
} from "@/components/survey/BodyTypePicker";
import {
  PromptedVoiceFlow,
  type VoiceRecordingEntry,
} from "@/components/survey/PromptedVoiceFlow";
import {
  BODY_AREAS,
  CURRENT_SOLUTIONS,
  FREQUENCY_OPTIONS,
  VOICE_PROMPTS,
  concernsFor,
  type BodyArea,
} from "@/lib/survey-data";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Gift,
  Check,
  ShieldCheck,
  CalendarDays,
  Stethoscope,
  Ban,
  Apple,
  ClipboardList,
  Pill,
  Dumbbell,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

// const contactSchema = z.object({
//   email: z.string().trim().optional(),
//   consent: z.boolean(),
// }).superRefine((value, ctx) => {
//   const hasEmail = value.email.length > 0;

//     if (!hasEmail) {
//       return;
//     }

//     if (!hasEmail) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Please add an email address or leave Stay involved blank.",
//         path: ["email"],
//       });
//     } else if (!z.string().email().safeParse(value.email).success) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Please enter a valid email address.",
//         path: ["email"],
//       });
//     }

//     if (!value.consent) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Please tick consent if you would like to stay involved.",
//         path: ["consent"],
//       });
//     }
//   });

const SOLUTION_ICONS: Record<string, typeof Ban> = {
  Nothing: Ban,
  "Food tracking": Apple,
  "Symptom tracking": ClipboardList,
  Supplements: Pill,
  Medication: Pill,
  Exercise: Dumbbell,
  Wearables: Sparkles,
  Measuring: ClipboardList,
  "Taking photos": Sparkles,
  "Loose clothing": Sparkles,
  Other: MoreHorizontal,
};

const MONEY_SPENT_OPTIONS = [
  "Apps",
  "Wearable Devices",
  "Supplements",
  "Medication",
  "Private healthcare",
  "Gym membership/Personal trainer",
  "Coaching or nutrition support",
  "Clothing or shapewear",
  "Other",
];

const DESIRED_INSIGHT_OPTIONS = [
  "Trigger detection",
  "Cycle understanding",
  "Food and nutrition insights",
  "Habits affecting my symptoms",
  "Patterns I might be missing",
  "Changes in my body over time",
  "Improve my wellbeing",
  "Personal baseline and what's normal for me",
  "Something else",
];

const TRUSTED_SOURCE_OPTIONS = [
  "My GP or doctor",
  "Specialist clinician",
  "Google search/AI answers",
  "Social media creators",
  "Friends or family",
  "Health apps",
  "Online communities",
  "Wearable Devices",
  "I don't trust any source consistently",
  "Other",
];

function Stepper({ step }: { step: Step }) {
  const items = [
    { n: 1, label: "Body map" },
    { n: 2, label: "Your voice" },
    { n: 3, label: "Research profile" },
  ];
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        return (
          <div key={it.n} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-smooth",
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : done
                      ? "bg-petal/40 text-plum"
                      : "bg-white/70 text-muted-foreground border border-border",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : it.n}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm hidden sm:inline",
                  active ? "text-plum font-medium" : "text-muted-foreground",
                )}
              >
                {it.label}
              </span>
            </div>
            {i < items.length - 1 && (
              <div className="h-px w-6 sm:w-10 bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ step, onBack }: { step: Step; onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 sm:mb-10">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-plum transition-smooth"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <div className="font-display text-2xl sm:text-3xl text-orchid tracking-wide">
          KLPS
        </div>
        <span className="hidden sm:inline text-sm text-muted-foreground">
          Body Discovery
        </span>
      </div>
      <Stepper step={step} />
      <a
        href="https://klps.co.uk"
        className="whitespace-nowrap rounded-full border border-border bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08]"
      >
        Back to Home
      </a>
    </div>
  );
}

function BodyDiscoverySurvey() {
  const [step, setStep] = useState<Step>(1);

  // Page 1 state
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [bodyShape, setBodyShape] = useState("");
  const [areas, setAreas] = useState<BodyArea[]>([]);
  const [concerns, setConcerns] = useState<ConcernsMap>({});
  const [bodyAreaResponses, setBodyAreaResponses] = useState<
    Partial<
      Record<
        BodyArea,
        {
          concerns: string[];
          frequency: string[];
        }
      >
    >
  >({});
  const [solutions, setSolutions] = useState<string[]>([]);
  const [activePanelArea, setActivePanelArea] = useState<BodyArea>("tummy");

  // Page 2 state

  const [voiceRecordings, setVoiceRecordings] = useState<VoiceRecordingEntry[]>(
    [],
  );

  const [otherResponses, setOtherResponses] = useState<
    Partial<Record<BodyArea, string>>
  >({});

  // Page 3 state

  const [email, setEmail] = useState("");

  const [ageRange, setAgeRange] = useState("");

  const [employmentStatus, setEmploymentStatus] = useState("");

  const [occupation, setOccupation] = useState("");

  const [lifeStage, setLifeStage] = useState("");

  const [incomeBand, setIncomeBand] = useState("");

  const [challengeFrequency, setChallengeFrequency] = useState("");

  const [confidenceLevel, setConfidenceLevel] = useState("");

  const [spentMoney, setSpentMoney] = useState("");

  const [spentMoneyOn, setSpentMoneyOn] = useState<string[]>([]);

  const [otherSpentMoney, setOtherSpentMoney] = useState("");

  const [otherTrustedSource, setOtherTrustedSource] = useState("");

  const [wouldUse, setWouldUse] = useState("");

  const [wouldPay, setWouldPay] = useState("");

  const [monthlyPrice, setMonthlyPrice] = useState("");

  const [desiredInsights, setDesiredInsights] = useState<string[]>([]);

  const [otherInsight, setOtherInsight] = useState("");

  const [trustedSource, setTrustedSource] = useState<string[]>([]);

  const [showMissingAnswersModal, setShowMissingAnswersModal] = useState(false);

  const [missingQuestions, setMissingQuestions] = useState<string[]>([]);

  const isMissing = (question: string) => missingQuestions.includes(question);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const toggleSolution = (s: string) =>
    setSolutions((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s],
    );

  const toggleSpentMoneyOn = (value: string) =>
    setSpentMoneyOn((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );

  const toggleDesiredInsight = (value: string) =>
    setDesiredInsights((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );

  const toggleTrustedSource = (value: string) =>
    setTrustedSource((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );

  const handleSelectArea = (a: BodyArea) => {
    if (areas.includes(a)) {
      const remainingAreas = areas.filter((area) => area !== a);

      setAreas(remainingAreas);

      // If user deselected the active panel area,
      // move panel to another selected area
      if (activePanelArea === a) {
        setActivePanelArea(
          remainingAreas.length > 0
            ? remainingAreas[remainingAreas.length - 1]
            : "tummy",
        );
      }

      return;
    }

    // Select area
    setAreas((current) => [...current, a]);

    setConcerns((current) => ({
      ...current,
      [a]: current[a] ?? [],
    }));

    setActivePanelArea(a);
  };

  const activeAreaLabel =
    BODY_AREAS.find((b) => b.id === activePanelArea)?.label ?? "Tummy / Waist";
  const activePicked = bodyAreaResponses[activePanelArea]?.concerns ?? [];

  const togglePanelConcern = (c: string) => {
    const next = activePicked.includes(c)
      ? activePicked.filter((x) => x !== c)
      : [...activePicked, c];

    setBodyAreaResponses((current) => ({
      ...current,
      [activePanelArea]: {
        concerns: next,
        frequency: current[activePanelArea]?.frequency ?? [],
      },
    }));

    const merged = {
      ...concerns,
      [activePanelArea]: next,
    };

    setConcerns(merged);

    if (!areas.includes(activePanelArea)) {
      setAreas([...areas, activePanelArea]);
    }
  };

  const canContinue1 = areas.length > 0;

  const submitAll = async () => {
    setFormError(null);

    // const parsed = contactSchema.safeParse({
    //   email,
    // });

    // if (!parsed.success) {
    //   setFormError(
    //     parsed.error.issues[0]?.message ??
    //       "Please check your details"
    //   );
    //   return;
    // }

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append(
        "payload",
        JSON.stringify({
          bodyType,
          bodyShape,
          otherBodyType: bodyShape || null,
          bodyAreas: bodyAreaResponses,
          concerns,
          otherResponses,
          currentSolutions: solutions,

          email,
          ageRange,
          employmentStatus,
          occupation,
          lifeStage,
          incomeBand,
          challengeFrequency,
          confidenceLevel,
          spentMoney,
          spentMoneyOn,
          otherSpentMoney,
          wouldUse,
          wouldPay,
          monthlyPrice,
          desiredInsights,
          trustedSource: [
            ...trustedSource.filter((s) => s !== "Other"),
            ...(otherTrustedSource.trim()
              ? [`Other: ${otherTrustedSource.trim()}`]
              : []),
          ],
          otherInsight,

          age_range: ageRange,
          employment_status: employmentStatus,
          life_stage: lifeStage,
          income_band: incomeBand,
          challenge_frequency: challengeFrequency,
          confidence_level: confidenceLevel,
          spent_money: spentMoney,
          spent_money_on: spentMoneyOn,
          other_spent_money: otherSpentMoney,
          would_use: wouldUse,
          would_pay: wouldPay,
          monthly_price: monthlyPrice,
          desired_insights: desiredInsights,
          other_insight: otherInsight,

          voiceRecordings: voiceRecordings.map((recording) => ({
            questionKey: recording.questionKey,
            questionText: recording.questionText,
            typedResponse: recording.typedResponse,
            durationSeconds: recording.durationSeconds,
          })),
        }),
      );

      voiceRecordings.forEach((recording, index) => {
        if (recording.blob) {
          formData.append(
            `voice_${index}`,
            recording.blob,
            `${recording.questionKey}.webm`,
          );
        }
      });

      const response = await fetch(`${API_BASE}/api/research`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        throw new Error(body?.error ?? "Survey submission failed.");
      }

      setStep(4);
    } catch (e) {
      console.error(e);

      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const wouldPayRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const handleSubmitAttempt = () => {
    const missing: string[] = [];

    if (!wouldPay) {
      missing.push("Would you pay for a solution like this?");
    }

    if ((wouldPay === "yes" || wouldPay === "maybe") && !monthlyPrice) {
      missing.push("What price feels reasonable?");
    }

    if (missing.length > 0) {
      setMissingQuestions(missing);
      setShowMissingAnswersModal(true);
      return;
    }

    submitAll();
  };

  // Footer
  const currentYear = new Date().getFullYear();

  return (
    <main className="survey-theme min-h-screen bg-background px-4 sm:px-8 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <TopBar
          step={step}
          onBack={
            step > 1 && step < 4 ? () => setStep((step - 1) as Step) : undefined
          }
        />

        {/* STEP 1 */}
        {step === 1 && !bodyType && (
          <section className="animate-float-in max-w-3xl mx-auto">
            <BodyTypePicker selected={bodyType} onSelect={setBodyType} />

            <div className="mt-8 max-w-md mx-auto">
              <label className="block text-sm font-medium text-plum mb-2">
                If you don't see yourself in the options above, choose from the
                options below to tell us more about your body shape, then click
                the closest match above to continue. (Optional)
              </label>
              <div className="relative">
                <select
                  value={bodyShape}
                  onChange={(e) => setBodyShape(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 pr-12 py-3 appearance-none"
                >
                  <option value="">Select body shape</option>
                  <option value="pear">Pear</option>
                  <option value="hourglass">Hourglass</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="apple">Apple</option>
                  <option value="inverted_triangle">Inverted Triangle</option>
                  <option value="athletic">Athletic</option>
                  <option value="petite">Petite</option>
                  <option value="not_sure">Not sure</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                  <svg
                    className="h-5 w-5 text-plum"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 1 && bodyType && (
          <section className="animate-float-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left intro */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div>
                  <h1 className="font-display text-4xl sm:text-5xl text-plum leading-[1.05]">
                    Your body,
                    <br />
                    your{" "}
                    <span className="text-gradient italic pr-2 ">story</span>
                  </h1>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-10 w-10 rounded-full bg-blush/60 flex items-center justify-center"></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    - Tap an area where you'd like more insight into the changes, patterns, or experiences you're noticing. <br /> - Tap one area at a
                    time, select concerns in the panel below/at the side of your
                    screen as they change with each area.
                    <br /> - You can always edit your selections before moving
                    on through the questionnaire.
                  </p>
                </div>
                <button
                  onClick={() => setBodyType(null)}
                  className="text-xs text-muted-foreground hover:text-orchid underline self-start"
                >
                  Change body type
                </button>
                <div className="hidden lg:flex flex-col gap-2 mt-auto pt-8">
                  <div className="h-10 w-10 rounded-full bg-blush/60 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-orchid" />
                  </div>
                  <p className="text-sm font-medium text-plum">
                    A safe, private space
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your story is always confidential.
                  </p>
                </div>
              </div>

              {/* Center body */}
              <div className="lg:col-span-5">
                <BodyImageMap
                  bodyType={bodyType}
                  selected={areas}
                  active={activePanelArea}
                  onSelectArea={handleSelectArea}
                />
                <p className="text-center font-display italic text-orchid text-sm mt-4"></p>
              </div>

              {/* Right concern panel */}
              <div className="lg:col-span-4">
                <div className="rounded-3xl bg-white/85 backdrop-blur p-5 sm:p-6 shadow-soft border border-border sticky top-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-9 w-9 rounded-full bg-blush/60 flex items-center justify-center shrink-0"></div>
                    <div>
                      <h3 className="font-display text-xl text-plum leading-tight">
                        {activeAreaLabel}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        What do you notice here?
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        Select all that apply
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
                    {concernsFor(activePanelArea).map((c) => {
                      const on = activePicked.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => togglePanelConcern(c)}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-left transition-smooth",
                            on
                              ? "bg-blush/40 border-petal text-plum"
                              : "bg-white border-border hover:bg-secondary/40",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-md border transition-smooth shrink-0",
                              on
                                ? "bg-gradient-primary border-transparent text-primary-foreground"
                                : "border-border bg-white",
                            )}
                          >
                            {on && <Check className="h-3 w-3" />}
                          </span>
                          <span className="flex-1">{c}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    {activePicked.includes("Other") && (
                      <div className="mt-3">
                        <textarea
                          value={otherResponses[activePanelArea] ?? ""}
                          onChange={(e) =>
                            setOtherResponses((current) => ({
                              ...current,
                              [activePanelArea]: e.target.value,
                            }))
                          }
                          placeholder="What have you noticed?"
                          rows={4}
                          maxLength={500}
                          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm resize-none"
                        />
                      </div>
                    )}
                  </div>
                  {/* <button
                    onClick={() => {
                      // ensure area is in selected
                      if (!areas.includes(activePanelArea)) {
                        setAreas([...areas, activePanelArea]);
                      }
                    }}
                    className="mt-5 w-full rounded-full bg-gradient-primary text-primary-foreground py-3 font-medium shadow-soft transition-smooth hover:scale-[1.02]"
                  >
                    Save
                  </button> */}
                </div>
              </div>
            </div>

            {/* Frequency + Solutions row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <div className="rounded-3xl bg-white/80 backdrop-blur p-5 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-full bg-blush/60 flex items-center justify-center">
                    <CalendarDays className="h-4 w-4 text-orchid" />
                  </div>
                  <h3 className="text-sm font-semibold text-plum">
                    How often do these changes or experiences affect your confidence, comfort, or daily life?
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FREQUENCY_OPTIONS.map((f) => (
                    <button
                      key={f}
                      onClick={() =>
                        setBodyAreaResponses((current) => {
                          const existing = current[activePanelArea] || {
                            concerns: [],
                            frequency: [],
                          };

                          const frequencies = existing.frequency || [];

                          return {
                            ...current,
                            [activePanelArea]: {
                              ...existing,
                              frequency: frequencies.includes(f)
                                ? frequencies.filter((x) => x !== f)
                                : [...frequencies, f],
                            },
                          };
                        })
                      }
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-xs sm:text-sm transition-smooth border min-w-[72px] text-center",
                        bodyAreaResponses[activePanelArea]?.frequency?.includes(
                          f,
                        )
                          ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                          : "bg-white border-border hover:bg-secondary/40 text-foreground",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 backdrop-blur p-5 shadow-soft border border-border">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blush/60 flex items-center justify-center">
                      <Stethoscope className="h-4 w-4 text-orchid" />
                    </div>
                    <h3 className="text-sm font-semibold text-plum">
                      What do you currently do to manage this?
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline">
                    Select all that apply
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {CURRENT_SOLUTIONS.map((s) => {
                    const on = solutions.includes(s);
                    const Icon = SOLUTION_ICONS[s] ?? Sparkles;
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSolution(s)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-2.5 text-[11px] sm:text-xs transition-smooth aspect-square text-center",
                          on
                            ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                            : "bg-white border-border hover:bg-secondary/40 text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="leading-tight">{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                disabled={!canContinue1}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-10 py-3.5 font-medium shadow-soft transition-smooth hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section className="animate-float-in max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-3xl sm:text-4xl text-plum">
                Your voice matters{" "}
                <Heart className="inline h-5 w-5 text-petal" />
              </h2>

              <p className="mt-2 text-muted-foreground text-sm">
                Your perspective is the most important part of this research.
                <br />
                We'd love to hear your experience in your own words.
              </p>
            </div>

            <PromptedVoiceFlow
              prompts={VOICE_PROMPTS}
              onComplete={(recordings) => {
                setVoiceRecordings(recordings);
                setStep(3);
              }}
            />
          </section>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <section className="animate-float-in max-w-xl mx-auto">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-2">
                <div className="absolute inset-0 -m-6 bg-gradient-warm rounded-full blur-2xl opacity-60" />
                <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                  <Heart className="h-9 w-9" fill="currentColor" />
                </div>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-plum">
                Thank you
                <br />
                <span className="italic text-gradient pr-2">
                  for sharing your story
                </span>{" "}
                <Heart className="inline h-5 w-5 text-petal" />
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                You're helping us understand how women's bodies change and what
                support is truly needed.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 backdrop-blur p-6 shadow-soft border border-border space-y-5">
              <div className="text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blush/60 mb-2">
                  <Gift className="h-4 w-4 text-orchid" />
                </div>

                <h3 className="font-display text-xl text-plum">
                  Final questions
                </h3>

                <p className="text-xs text-muted-foreground mt-1">
                  These answers help us understand who experiences these
                  challenges and what support women need most.
                </p>
              </div>

              {/* AGE */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Age range
                </label>

                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="under_18">Under 18</option>
                  <option value="18_24">18 to 24</option>
                  <option value="25_34">25 to 34</option>
                  <option value="35_44">35 to 44</option>
                  <option value="45_54">45 to 54</option>
                  <option value="55_plus">55+</option>
                </select>
              </div>

              {/* EMPLOYMENT */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Employment status
                </label>

                <select
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="employed_full_time">Employed full-time</option>
                  <option value="employed_part_time">Employed part-time</option>
                  <option value="self_employed">Self-employed</option>
                  <option value="business_owner">Business owner</option>
                  <option value="not_working">Not currently working</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              {/* OCCUPATION */}

              <div>
                <label className="block text-sm font-medium text-plum mb-1.5">
                  Occupation
                </label>

                <input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                  placeholder="e.g. Nurse, Teacher, Accountant"
                />
              </div>

              {/* LIFE STAGE */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Which best describes you?
                </label>

                <select
                  value={lifeStage}
                  onChange={(e) => setLifeStage(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="no_children">No children</option>
                  <option value="pregnant">Pregnant</option>
                  <option value="new_mother">New mother</option>
                  <option value="parent">Parent</option>
                  <option value="perimenopausal">Perimenopausal</option>
                  <option value="menopausal">Menopausal</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* INCOME */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Income band (optional)
                </label>

                <select
                  value={incomeBand}
                  onChange={(e) => setIncomeBand(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="under_25k">Under £25k</option>
                  <option value="25_40k">£25k to £40k</option>
                  <option value="40_60k">£40k to £60k</option>
                  <option value="60_100k">£60k to £100k</option>
                  <option value="100k_plus">£100k+</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* PROBLEM FREQUENCY */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  How often do you track what's happening with your body?
                </label>

                <select
                  value={challengeFrequency}
                  onChange={(e) => setChallengeFrequency(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>

              {/* UNDERSTANDING */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  How confident do you feel understanding what's happening in
                  your body?
                </label>

                <select
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="1">1 - Not confident</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 - Very confident</option>
                </select>
              </div>

              {/* MONEY SPENT */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Have you spent money trying to understand, manage, or improve
                  changes in your body, health, weight, energy, or
                  wellbeing?{" "}
                </label>

                <select
                  value={spentMoney}
                  onChange={(e) => setSpentMoney(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {spentMoney === "yes" && (
                  <>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {MONEY_SPENT_OPTIONS.map((option) => {
                        const selected = spentMoneyOn.includes(option);

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleSpentMoneyOn(option)}
                            className={cn(
                              "rounded-2xl border px-3 py-2.5 text-left text-xs transition-smooth",
                              selected
                                ? "border-petal bg-blush/40 text-plum"
                                : "border-border bg-white text-foreground hover:bg-secondary/40",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {spentMoneyOn.includes("Other") && (
                      <input
                        type="text"
                        value={otherSpentMoney}
                        onChange={(e) => setOtherSpentMoney(e.target.value)}
                        placeholder="What have you spent money on?"
                        className="mt-3 w-full rounded-2xl border border-border bg-white px-4 py-3"
                      />
                    )}
                  </>
                )}
              </div>

              {/* PRODUCT VALIDATION */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Would you use a tool that helped explain changes happening in
                  your body?
                </label>

                <select
                  value={wouldUse}
                  onChange={(e) => setWouldUse(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="definitely">Definitely</option>
                  <option value="probably">Probably</option>
                  <option value="maybe">Maybe</option>
                  <option value="unlikely">Unlikely</option>
                </select>
              </div>

              {/* PAY */}

              <div ref={wouldPayRef}>
                <label className="block text-sm font-medium text-plum mb-2">
                  If a solution gave you insights into your body, would you
                  consider paying for it?
                  {isMissing("Would you pay for a solution like this?") && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                <select
                  value={wouldPay}
                  onChange={(e) => {
                    setWouldPay(e.target.value);

                    setMissingQuestions((current) =>
                      current.filter(
                        (q) => q !== "Would you pay for a solution like this?",
                      ),
                    );
                  }}
                  className={cn(
                    "w-full rounded-2xl border bg-white px-4 py-3",
                    isMissing("Would you pay for a solution like this?")
                      ? "border-red-500"
                      : "border-border",
                  )}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* PRICE */}

              <div ref={priceRef}>
                <label className="block text-sm font-medium text-plum mb-2">
                  What would feel is a reasonable price bracket?
                  {isMissing("What price feels reasonable?") && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                <select
                  value={monthlyPrice}
                  onChange={(e) => {
                    setMonthlyPrice(e.target.value);

                    setMissingQuestions((current) =>
                      current.filter(
                        (q) => q !== "What price feels reasonable?",
                      ),
                    );
                  }}
                  className={cn(
                    "w-full rounded-2xl border bg-white px-4 py-3",
                    isMissing("What price feels reasonable?")
                      ? "border-red-500"
                      : "border-border",
                  )}
                >
                  <option value="">Select</option>
                  <option value="under_20">Under £20</option>
                  <option value="20_50">£20 to £50</option>
                  <option value="50_100">£50 to £100</option>
                  <option value="100_200">£100 to £200</option>
                  <option value="20_plus">£200+</option>
                </select>
              </div>

              {/* DESIRED INSIGHTS */}

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  What insights would feel most useful?
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {DESIRED_INSIGHT_OPTIONS.map((option) => {
                    const selected = desiredInsights.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleDesiredInsight(option)}
                        className={cn(
                          "rounded-2xl border px-3 py-2.5 text-left text-xs transition-smooth",
                          selected
                            ? "border-petal bg-blush/40 text-plum"
                            : "border-border bg-white text-foreground hover:bg-secondary/40",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {desiredInsights.includes("Something else") && (
                  <textarea
                    value={otherInsight}
                    onChange={(e) => setOtherInsight(e.target.value)}
                    placeholder="What would you want to understand?"
                    rows={3}
                    maxLength={500}
                    className="mt-3 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm resize-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-plum mb-2">
                  Which sources do you trust for understanding changes in your
                  body? (Select all that apply)
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {TRUSTED_SOURCE_OPTIONS.map((option) => {
                    const selected = trustedSource.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleTrustedSource(option)}
                        className={cn(
                          "rounded-2xl border px-3 py-2.5 text-left text-xs transition-smooth",
                          selected
                            ? "border-petal bg-blush/40 text-plum"
                            : "border-border bg-white text-foreground hover:bg-secondary/40",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {trustedSource.includes("Other") && (
                  <input
                    type="text"
                    value={otherTrustedSource}
                    onChange={(e) => setOtherTrustedSource(e.target.value)}
                    placeholder="Please specify"
                    className="mt-3 w-full rounded-2xl border border-border bg-white px-4 py-3"
                  />
                )}
              </div>

              {/* PRIZE DRAW */}

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-plum mb-3 italic">
                  (Optional)
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                />
              </div>

              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}

              <button
                disabled={submitting}
                onClick={handleSubmitAttempt}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 font-medium"
              >
                {submitting ? "Submitting..." : "Submit survey"}
              </button>
            </div>
            {showMissingAnswersModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="max-w-md rounded-3xl bg-white p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-plum">
                    You haven't answered:
                  </h3>

                  <ul className="mt-4 space-y-2 text-sm">
                    {missingQuestions.map((question) => (
                      <li key={question}>• {question}</li>
                    ))}
                  </ul>

                  <p className="mt-4 text-sm text-muted-foreground">
                    These answers help us understand whether a solution is
                    commercially viable.
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        setShowMissingAnswersModal(false);

                        if (
                          missingQuestions.includes(
                            "Would you pay for a solution like this?",
                          )
                        ) {
                          wouldPayRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                          return;
                        }

                        if (
                          missingQuestions.includes(
                            "What price feels reasonable?",
                          )
                        ) {
                          priceRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }
                      }}
                      className="flex-1 rounded-full border border-border px-4 py-3"
                    >
                      Go back
                    </button>

                    <button
                      onClick={() => {
                        setShowMissingAnswersModal(false);
                        submitAll();
                      }}
                      className="flex-1 rounded-full bg-gradient-primary px-4 py-3 text-primary-foreground"
                    >
                      Submit anyway
                    </button>
                  </div>
                </div>
              </div>
            )}

            <p className="text-center text-[11px] text-muted-foreground mt-4 inline-flex items-center justify-center gap-1.5 w-full">
              <ShieldCheck className="h-3 w-3" />
              We respect your privacy. Your details will never be shared.
            </p>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-muted-foreground hover:text-plum transition-smooth inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>
          </section>
        )}

        {/* STEP 4 — Final thank you */}
        {step === 4 && (
          <section className="text-center animate-bloom py-12 max-w-md mx-auto">
            <div className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <Heart className="h-10 w-10" fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl text-plum">
              You're wonderful
            </h2>
            <p className="mt-3 text-muted-foreground">
              Thank you for sharing. Your story will help shape something
              kinder, smarter and made for women like you.
            </p>
          </section>
        )}

        <footer className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} All rights reserved. Made with &hearts; by KLPS
            Ltd.&nbsp;
          </p>
        </footer>
      </div>
    </main>
  );
}

export default BodyDiscoverySurvey;
