import { FounderPasswordLogin } from "@/components/auth/FounderPasswordLogin";

export default function RdLabLogin() {
  return (
    <FounderPasswordLogin
      eyebrow="KLPS R&D Lab"
      title="Founder Sign In"
      description="Enter the founder email and password established through the secure backend bootstrap command."
      destination="/rd-lab/work-packages/wp1-textile-sensing"
      returnTo="/rd-lab"
      returnLabel="Return to R&D overview"
    />
  );
}
