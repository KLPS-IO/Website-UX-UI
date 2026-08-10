import { jsPDF } from "jspdf";
import type { TechnologyBlueprint } from "./types";
import { secureEvidenceAsset } from "./secureEvidenceAsset";
const loadImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
export async function exportBlueprintPdf(document: TechnologyBlueprint) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const width = 210,
    margin = 18,
    bottom = 278;
  let y = 24,
    page = 1;
  const footer = () => {
    pdf.setDrawColor(180);
    pdf.line(margin, 286, width - margin, 286);
    pdf.setFontSize(7);
    pdf.setTextColor(90);
    pdf.text(
      `${document.metadata.document} · v${document.metadata.version} · Confidential — Investor Data Room`,
      margin,
      291,
    );
    pdf.text(String(page), width - margin, 291, { align: "right" });
  };
  const next = () => {
    footer();
    pdf.addPage();
    page++;
    y = 20;
  };
  const ensure = (height: number) => {
    if (y + height > bottom) next();
  };
  const text = (
    value: string,
    size = 10,
    colour: [number, number, number] = [35, 35, 40],
    leading = 5,
  ) => {
    pdf.setFontSize(size);
    pdf.setTextColor(...colour);
    const lines = pdf.splitTextToSize(value, width - margin * 2);
    ensure(lines.length * leading);
    pdf.text(lines, margin, y);
    y += lines.length * leading + 2;
  };
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(116, 76, 145);
  pdf.text("KLPS · ENGINEERING RECORD", margin, y);
  y += 20;
  pdf.setFontSize(34);
  pdf.setTextColor(20);
  const title = pdf.splitTextToSize(document.metadata.document, 170);
  pdf.text(title, margin, y);
  y += title.length * 13 + 8;
  text(
    "Scientific hypothesis → experimental progression → MVP1 → next engineering gates",
    13,
    [70, 70, 76],
    7,
  );
  y += 12;
  for (const [key, value] of Object.entries(document.metadata).filter(
    ([key]) => key !== "document",
  )) {
    text(
      `${key.replace(/([A-Z])/g, " $1").toUpperCase()}  ${value}`,
      8,
      [70, 70, 76],
      4,
    );
  }
  next();
  const figures = new Map(
    document.figures.map((figure) => [figure.figureNumber, figure]),
  );
  for (const section of document.sections) {
    ensure(36);
    pdf.setFontSize(8);
    pdf.setTextColor(116, 76, 145);
    pdf.text(section.number, margin, y);
    y += 6;
    text(section.title, 22, [20, 20, 24], 9);
    text(`ENGINEERING QUESTION  ${section.question}`, 9, [100, 70, 120], 5);
    for (const paragraph of section.body) text(paragraph, 10, [40, 40, 45], 5);
    for (const item of section.items ?? [])
      text(`• ${item}`, 9, [45, 45, 50], 4.6);
    for (const id of section.figureIds ?? []) {
      const figure = figures.get(id);
      if (!figure) continue;
      try {
        const data = await loadImage(await secureEvidenceAsset(figure.asset));
        ensure(78);
        pdf.addImage(
          data,
          "JPEG",
          margin,
          y,
          width - margin * 2,
          66,
          undefined,
          "FAST",
        );
        y += 70;
        text(
          `Figure ${figure.figureNumber} | ${figure.classification} — ${figure.caption}`,
          8,
          [60, 60, 65],
          4,
        );
      } catch {
        text(
          `Figure ${figure.figureNumber} — image unavailable during export`,
          8,
          [100, 60, 60],
          4,
        );
      }
    }
    if (section.keyLearning)
      text(`KEY LEARNING  ${section.keyLearning}`, 9, [75, 45, 95], 5);
    if (section.nextActivity)
      text(`NEXT ACTIVITY  ${section.nextActivity}`, 9, [75, 45, 95], 5);
    if (section.number === "27")
      for (const record of document.evidence) {
        ensure(28);
        text(
          `${record.id} · ${record.status} · ${record.question}`,
          9,
          [75, 45, 95],
          5,
        );
        text(`Establishes: ${record.establishes}`, 8, [45, 45, 50], 4);
        text(
          `Does not establish: ${record.doesNotEstablish}`,
          8,
          [80, 80, 85],
          4,
        );
      }
    y += 8;
  }
  footer();
  pdf.save("KLPS-Technology-Blueprint-MVP1-v1.0.pdf");
}
