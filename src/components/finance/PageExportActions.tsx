import { Download, Printer } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { exportCurrentFinancePagePdf, printCurrentFinancePage } from "@/lib/finance-page-export";

export function FinancePageExportActions() {
  const { pathname } = useLocation();
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState("");

  const downloadPdf = async () => {
    setPreparing(true);
    setError("");
    try {
      await exportCurrentFinancePagePdf(pathname);
    } catch (exportError) {
      console.error("Finance page PDF export failed", exportError);
      setError("PDF export failed");
    } finally {
      setPreparing(false);
    }
  };

  const buttonClass = "inline-flex items-center gap-2 rounded-lg border border-border bg-white/70 px-2.5 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:cursor-wait disabled:opacity-60";

  return (
    <div className="flex items-center gap-2">
      {error && <span role="alert" className="hidden text-xs text-brand-coral xl:inline">{error}</span>}
      <button type="button" onClick={() => void downloadPdf()} disabled={preparing} className={buttonClass} title="Download this page as PDF">
        <Download className="h-4 w-4" />
        <span className="hidden xl:inline">{preparing ? "Preparing…" : "PDF"}</span>
      </button>
      <button type="button" onClick={printCurrentFinancePage} className={buttonClass} title="Print this page">
        <Printer className="h-4 w-4" />
        <span className="hidden xl:inline">Print</span>
      </button>
    </div>
  );
}
