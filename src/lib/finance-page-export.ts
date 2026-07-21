import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const cleanPageName = (pathname: string) => {
  const segment = pathname.split("/").filter(Boolean).at(-1) || "finance";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function exportCurrentFinancePagePdf(pathname: string) {
  const target = document.querySelector<HTMLElement>("[data-finance-page-content]");
  if (!target) throw new Error("Finance page content is unavailable.");

  const canvas = await html2canvas(target, {
    backgroundColor: "#f8f8f6",
    scale: Math.min(2, window.devicePixelRatio || 1),
    useCORS: true,
    logging: false,
    onclone: (clonedDocument) => {
      clonedDocument.documentElement.classList.add("finance-page-exporting");
    },
  });
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imageWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const pagePixelHeight = Math.floor((printableHeight * canvas.width) / imageWidth);
  let sourceY = 0;
  let pageIndex = 0;

  while (sourceY < canvas.height) {
    const sliceHeight = Math.min(pagePixelHeight, canvas.height - sourceY);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const context = pageCanvas.getContext("2d");
    if (!context) throw new Error("Could not prepare the PDF page.");
    context.fillStyle = "#f8f8f6";
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    if (pageIndex > 0) pdf.addPage();
    const sliceHeightMm = (sliceHeight * imageWidth) / canvas.width;
    pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.94), "JPEG", margin, margin, imageWidth, sliceHeightMm, undefined, "FAST");
    sourceY += sliceHeight;
    pageIndex += 1;
  }

  const date = new Date().toISOString().slice(0, 10);
  pdf.save(`KLPS-${cleanPageName(pathname).replace(/\s+/g, "-")}-${date}.pdf`);
}

export function printCurrentFinancePage() {
  document.documentElement.classList.add("finance-page-printing");
  const cleanup = () => {
    document.documentElement.classList.remove("finance-page-printing");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  window.print();
  window.setTimeout(cleanup, 60_000);
}
