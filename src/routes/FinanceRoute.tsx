import { FinanceProvider } from "@/contexts/FinanceContext";
import FinanceApp from "@/pages/FinanceApp";

export default function FinanceRoute() {
  return (
    <FinanceProvider>
      <FinanceApp />
    </FinanceProvider>
  );
}
