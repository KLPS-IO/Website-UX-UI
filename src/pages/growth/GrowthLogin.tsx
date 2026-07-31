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
      description="Funnel OS is a private workspace. Sign in with the secure credentials provided for your account."
      destination="/innovation-lab/funnel/mission-control"
      returnTo="/innovation-lab"
      returnLabel="Return to Innovation Lab"
      accent="purple"
    />
  );
}
