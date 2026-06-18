export type BodyArea =
  | "face"
  | "chest"
  | "arms"
  | "tummy"
  | "hips"
  | "thighs"
  | "legs";

export const BODY_AREAS: { id: BodyArea; label: string }[] = [
  { id: "face", label: "Face" },
  { id: "chest", label: "Chest" },
  { id: "arms", label: "Arms" },
  { id: "tummy", label: "Tummy / Waist" },
  { id: "hips", label: "Hips" },
  { id: "thighs", label: "Thighs" },
  { id: "legs", label: "Legs" },
];

export const TUMMY_CONCERNS = [
  "Bloating",
  "Swelling",
  "Digestive discomfort",
  "Food sensitivities",
  "Hormonal changes",
  "Period-related changes",
  "Clothing fit issues",
  "Confidence concerns",
  "Weight fluctuations",
  "Waist size changes",
  "Not understanding triggers",
  "Other",
];

export const FACE_CONCERNS = [
  "Acne or breakouts",
  "Skin changes",
  "Swelling or puffiness",
  "Changes around my cycle",
  "Changes I don't fully understand",
  "I notice patterns",
  "I don't know the triggers",
  "Confidence concerns",
  "Weight-related changes",
  "Other",
];

export const GENERAL_CONCERNS = [
  "Appearance concerns",
  "Comfort concerns",
  "Skin concerns",
  "Size / shape concerns",
  "Clothing fit concerns",
  "Other",
];

export const FREQUENCY_OPTIONS = [
  "Rarely",
  "Daily",
  "Weekly",
  "Monthly",
  "Around my cycle",
  "Occasionally",
];

export const CURRENT_SOLUTIONS = [
  "Nothing",
  "Food tracking",
  "Symptom tracking",
  "Supplements",
  "Medication",
  "Exercise",
  "Wearable Devices",
  "Measuring",
  "Taking photos",
  "Loose clothing",
  "Other",
];

export const VOICE_PROMPTS = [
  {
    key: "frustration",
    text: "What do you wish you understood better about the changes happening in your body?"
  },
  {
    key: "impact",
    text: "How does this affect your life?"
  },
  {
    key: "current_solutions",
    text: "What have you tried to use or do already?"
  },
  {
    key: "ideal_solution",
    text: "If a solution existed, what would it do?"
  }
];

export function concernsFor(area: BodyArea): string[] {
  switch (area) {
    case "tummy":
      return TUMMY_CONCERNS;

    case "face":
      return FACE_CONCERNS;

    default:
      return GENERAL_CONCERNS;
  }
}