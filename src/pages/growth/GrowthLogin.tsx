import { FounderPasswordLogin } from "@/components/auth/FounderPasswordLogin";

export default function GrowthLogin() {
  return (
    <FounderPasswordLogin
      eyebrow="KLPS Growth OS"
      title="Founder Sign In"
      description="Growth OS is a private founder workspace. Sign in with the same founder email and password used for the R&D Lab."
      destination="/innovation-lab/growth/mission-control"
      returnTo="/innovation-lab"
      returnLabel="Return to Innovation Lab"
      accent="purple"
    />
  );
}
