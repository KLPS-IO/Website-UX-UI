import { jsPDF } from "jspdf";
import type { TechnologyBlueprint } from "./types";
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
    margin = 24,
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
    const safeValue = value
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/…/g, "...");
    const lines = pdf.splitTextToSize(safeValue, Math.min(148, width - margin * 2));
    ensure(lines.length * leading);
    pdf.text(lines, margin, y);
    y += lines.length * leading + 2;
  };
  const arrowSequence = (parts: string[], size = 11) => {
    ensure(10);
    pdf.setFontSize(size);
    pdf.setTextColor(70, 45, 90);
    let x = margin;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      pdf.text(part, x, y);
      x += pdf.getTextWidth(part) + 3;
      if (index < parts.length - 1) {
        const lineY = y - 1.2;
        pdf.setDrawColor(116, 76, 145);
        pdf.line(x, lineY, x + 6, lineY);
        pdf.line(x + 6, lineY, x + 4.2, lineY - 1.2);
        pdf.line(x + 6, lineY, x + 4.2, lineY + 1.2);
        x += 9;
      }
    }
    y += 9;
  };
  const architecture = () => {
    ensure(112);
    const diagramWidth = width - margin * 2;
    const stages = [
      ["Conductive textile", "Physical sensing region"],
      ["Removable electrical connection", "Press studs and prototype wiring"],
      ["Arduino Nano 33 BLE Sense Rev2", "Development measurement hardware"],
      [
        "Firmware measurement / calibration",
        "Experimental baseline and stretch response",
      ],
      ["BLE / data-capture exploration", "Not a validated telemetry pipeline"],
    ];
    const nodeWidth = 27;
    const gap = (diagramWidth - nodeWidth * stages.length) / (stages.length - 1);
    stages.forEach(([title, note], index) => {
      const x = margin + index * (nodeWidth + gap);
      pdf.setDrawColor(116, 76, 145);
      pdf.setLineWidth(0.55);
      pdf.line(x, y, x + nodeWidth, y);
      if (index < stages.length - 1) {
        const start = x + nodeWidth + 2;
        const end = x + nodeWidth + gap - 2;
        pdf.setLineWidth(0.2);
        pdf.line(start, y, end, y);
        pdf.line(end, y, end - 1.6, y - 0.9);
        pdf.line(end, y, end - 1.6, y + 0.9);
      }
      pdf.setFontSize(8.5);
      pdf.setTextColor(35, 35, 40);
      pdf.setFont("helvetica", "bold");
      pdf.text(pdf.splitTextToSize(title, nodeWidth), x, y + 5);
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(95, 95, 100);
      pdf.text(pdf.splitTextToSize(note, nodeWidth), x, y + 15);
    });
    y += 37;
    pdf.setDrawColor(116, 76, 145);
    pdf.setLineDashPattern([2, 1.5], 0);
    pdf.line(margin, y, width - margin, y);
    pdf.setLineDashPattern([], 0);
    y += 4;
    pdf.setFontSize(7);
    pdf.setTextColor(116, 76, 145);
    pdf.text("EVIDENCED PROTOTYPE BOUNDARY", width / 2, y, {
      align: "center",
    });
    y += 5;
    pdf.setDrawColor(180);
    pdf.setFillColor(252, 252, 252);
    pdf.roundedRect(margin, y, diagramWidth, 23, 1.5, 1.5, "FD");
    pdf.setFontSize(8.5);
    pdf.setTextColor(35, 35, 40);
    pdf.text("SUPPORTING RESEARCH INFRASTRUCTURE", margin + 4, y + 5);
    pdf.setFontSize(7.5);
    pdf.text(
      "React / TypeScript · Express / TypeScript · PostgreSQL · Private Cloudflare R2 · Railway",
      margin + 4,
      y + 11,
    );
    pdf.setFontSize(7);
    pdf.setTextColor(95, 95, 100);
    pdf.text(
      "Supports research records and evidence. It is not presented as embedded-device infrastructure.",
      margin + 4,
      y + 17,
    );
    y += 29;
  };
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(116, 76, 145);
  pdf.text("KLPS · TECHNOLOGY PUBLICATION", margin, y);
  y += 20;
  pdf.setFontSize(34);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(20);
  const title = pdf.splitTextToSize(document.metadata.document, 170);
  pdf.text(title, margin, y);
  y += title.length * 13 + 8;
  pdf.setFont("helvetica", "normal");
  text(document.metadata.documentType, 16, [116, 76, 145], 8);
  arrowSequence(["Scientific Hypothesis", "MVP1", "Next Engineering Gates"], 11);
  y += 12;
  for (const [key, value] of Object.entries(document.metadata).filter(
    ([key]) => ["version", "date", "workPackage", "technologyReadiness", "confidentiality"].includes(key),
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
  const addFigure = async (id: string, maximumHeight = 90) => {
    const figure = figures.get(id);
    if (!figure) return;
    const data = await loadImage(figure.asset);
    const properties = pdf.getImageProperties(data);
    const availableWidth = width - margin * 2;
    const imageRatio = properties.width / properties.height;
    let imageWidth = availableWidth;
    let imageHeight = imageWidth / imageRatio;
    if (imageHeight > maximumHeight) {
      imageHeight = maximumHeight;
      imageWidth = imageHeight * imageRatio;
    }
    ensure(imageHeight + 58);
    const imageX = margin + (availableWidth - imageWidth) / 2;
    pdf.addImage(
      data,
      "JPEG",
      imageX,
      y,
      imageWidth,
      imageHeight,
      undefined,
      "FAST",
    );
    y += imageHeight + 4;
    text(
      `FIGURE ${figure.figureNumber} · ${figure.classification}`,
      7,
      [116, 76, 145],
      4,
    );
    text(figure.caption, 12, [75, 75, 82], 5.5);
    if (figure.callouts?.length)
      text(figure.callouts.join("  ·  "), 12, [116, 76, 145], 5.5);
  };
  const addSoftwareComposition = async (ids: string[]) => {
    ensure(116);
    const labels = [
      ["MEASUREMENT", "Body Scan"],
      ["PROGRESS", "Statistics"],
      ["DAILY UNDERSTANDING", "Daily engagement"],
    ];
    const gap = 8;
    const columnWidth = (width - margin * 2 - gap * 2) / 3;
    const top = y;
    for (let index = 0; index < ids.length; index++) {
      const figure = figures.get(ids[index]);
      if (!figure) continue;
      const data = await loadImage(figure.asset);
      const properties = pdf.getImageProperties(data);
      const x = margin + index * (columnWidth + gap);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(6.5);
      pdf.setTextColor(116, 76, 145);
      pdf.text(labels[index][0], x, top);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(35, 35, 40);
      pdf.text(labels[index][1], x, top + 5);
      const imageRatio = properties.width / properties.height;
      let imageWidth = columnWidth;
      let imageHeight = imageWidth / imageRatio;
      if (imageHeight > 85) {
        imageHeight = 85;
        imageWidth = imageHeight * imageRatio;
      }
      pdf.addImage(
        data,
        "JPEG",
        x + (columnWidth - imageWidth) / 2,
        top + 10,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );
      pdf.setFontSize(6);
      pdf.setTextColor(105, 105, 110);
      pdf.text(`FIGURE ${figure.figureNumber} · ${figure.classification}`, x, top + 99);
    }
    y = top + 108;
    text(
      "Interface concepts only. These screens do not represent validated physiological outputs or a validated sensor-ingestion pipeline.",
      12,
      [95, 95, 100],
      5.5,
    );
  };
  for (const section of document.sections) {
    if (y > 30) next();
    ensure(section.layoutVariant === "architecture" ? 151 : 36);
    pdf.setFont("helvetica", "bold");
    text(section.title, 25, [20, 20, 24], 10);
    pdf.setFont("helvetica", "normal");
    text(
      `${(section.questionLabel ?? "QUESTION").toUpperCase()}  ${section.question}`,
      9,
      [100, 70, 120],
      5,
    );
    if (section.heroStatement) text(section.heroStatement, 18, [35, 35, 40], 8);
    for (const paragraph of section.body) text(paragraph, 10, [40, 40, 45], 5);
    if (section.layoutVariant === "architecture") architecture();
    for (const item of section.items ?? []) {
      if (item.includes("→")) arrowSequence(item.split(" → "), 8.5);
      else text(`• ${item}`, 9, [45, 45, 50], 4.6);
    }
    if (section.comparison) {
      ensure(30);
      text(section.comparison.leftLabel.toUpperCase(), 7, [116, 76, 145], 4);
      if (section.comparison.left.includes("→")) arrowSequence(section.comparison.left.split(" → "), 10);
      else text(section.comparison.left, 10, [75, 45, 95], 5);
      text(section.comparison.rightLabel.toUpperCase(), 7, [116, 76, 145], 4);
      if (section.comparison.right.includes("→")) arrowSequence(section.comparison.right.split(" → "), 10);
      else text(section.comparison.right, 10, [75, 45, 95], 5);
    }
    for (const step of section.evolutionSteps ?? []) {
      ensure(112);
      text(`${step.stage} · Figure ${step.figureId}`, 12, [75, 45, 95], 6);
      text(`CHANGED  ${step.changed}`, 8, [45, 45, 50], 4);
      text(`LEARNING  ${step.learned}`, 8, [45, 45, 50], 4);
      text(`OPEN  ${step.unresolved}`, 8, [80, 80, 85], 4);
      await addFigure(step.figureId, 65);
    }
    if (section.number === "12" && section.figureIds)
      await addSoftwareComposition(section.figureIds);
    else
      for (const id of section.figureIds ?? [])
        await addFigure(id, section.layoutVariant === "full-bleed" ? 115 : 90);
    if (section.pullQuote) {
      if (section.pullQuote.includes("→")) arrowSequence(section.pullQuote.split(" → "), 14);
      else text(section.pullQuote, 14, [75, 45, 95], 7);
    }
    if (section.keyLearning)
      text(`KEY LEARNING  ${section.keyLearning}`, 9, [75, 45, 95], 5);
    if (section.nextActivity)
      text(`NEXT ACTIVITY  ${section.nextActivity}`, 9, [75, 45, 95], 5);
    if (section.title === "Evidence Register") {
      const columns = [13, 28, 25, 18, 31, 31, 16];
      const headers = ["ID", "QUESTION", "EVIDENCE", "STATUS", "ESTABLISHES", "DOES NOT ESTABLISH", "WP"];
      const drawHeader = () => {
        pdf.setFillColor(242, 238, 245);
        pdf.rect(margin, y, columns.reduce((sum, value) => sum + value, 0), 9, "F");
        let x = margin;
        pdf.setFontSize(5.8);
        pdf.setTextColor(90, 55, 110);
        headers.forEach((header, index) => { pdf.text(header, x + 1.5, y + 5.5); x += columns[index]; });
        y += 9;
      };
      drawHeader();
      document.evidence.forEach((record, rowIndex) => {
        const cells = [record.id, record.question, `${record.type}: ${record.asset}`, record.status, record.establishes, record.doesNotEstablish, record.workPackage];
        const lines = cells.map((cell, index) => pdf.splitTextToSize(cell, columns[index] - 3));
        const rowHeight = Math.max(13, Math.max(...lines.map((line) => line.length)) * 3.2 + 4);
        if (y + rowHeight > bottom) { next(); drawHeader(); }
        if (rowIndex % 2) { pdf.setFillColor(249, 248, 250); pdf.rect(margin, y, columns.reduce((sum, value) => sum + value, 0), rowHeight, "F"); }
        let x = margin;
        pdf.setFontSize(5.8);
        pdf.setTextColor(50, 50, 55);
        lines.forEach((line, index) => { pdf.text(line, x + 1.5, y + 4); x += columns[index]; });
        pdf.setDrawColor(220);
        pdf.line(margin, y + rowHeight, width - margin, y + rowHeight);
        y += rowHeight;
      });
    }
    y += 5;
  }
  footer();
  pdf.save("KLPS-Technology-Blueprint-MVP1-v1.0.pdf");
}
