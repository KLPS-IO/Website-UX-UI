import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(
  projectRoot,
  "src",
  "assets",
  "KLPS-pitch-deck (1).pdf",
);

const EXPORT_ROUTE = "/pitch-deck-export";
const EXPORT_WIDTH = 1920;
const EXPORT_HEIGHT = 1080;

async function launchBrowser() {
  try {
    return await chromium.launch({
      channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || "chrome",
      headless: true,
    });
  } catch (error) {
    console.warn(
      "Could not launch system Chrome; falling back to Playwright Chromium.",
    );
    console.warn(error instanceof Error ? error.message : error);
    return chromium.launch({ headless: true });
  }
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const server = await createServer({
    root: projectRoot,
    logLevel: "warn",
    server: {
      host: "127.0.0.1",
      port: 0,
    },
  });

  let browser;

  try {
    await server.listen();
    const baseUrl = server.resolvedUrls?.local[0];

    if (!baseUrl) {
      throw new Error("Vite did not expose a local URL for PDF export.");
    }

    browser = await launchBrowser();
    const page = await browser.newPage({
      viewport: {
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        deviceScaleFactor: 1,
      },
    });

    page.on("pageerror", (error) => {
      console.warn("Page error during PDF export:", error.message);
    });

    await page.emulateMedia({ media: "screen" });
    await page.goto(new URL(EXPORT_ROUTE, baseUrl).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });

    await page.waitForFunction(() => window.__KLPS_PDF_EXPORT_READY__ === true, {
      timeout: 60_000,
    });

    await page.pdf({
      path: outputPath,
      printBackground: true,
      preferCSSPageSize: true,
      width: `${EXPORT_WIDTH}px`,
      height: `${EXPORT_HEIGHT}px`,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    console.log(`Exported pitch deck PDF: ${path.relative(projectRoot, outputPath)}`);
  } finally {
    if (browser) await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error("PDF export failed:");
  console.error(error);
  process.exitCode = 1;
});
