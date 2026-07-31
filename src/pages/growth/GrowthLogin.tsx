import { useEffect } from "react";
import { FounderPasswordLogin } from "@/components/auth/FounderPasswordLogin";

export default function GrowthLogin() {
  useEffect(() => {
    document.title = "Founder Sign In | Funnel OS | KLPS";
  }, []);

  return (
    <FounderPasswordLogin
      eyebrow="KLPS Funnel OS"
      title="Founder Sign In"
      description="Funnel OS is a private founder workspace. Sign in with the same founder email and password used for the R&D Lab."
      destination="/innovation-lab/growth/mission-control"
      returnTo="/innovation-lab"
      returnLabel="Return to Innovation Lab"
      accent="purple"
    />
  );
}
