const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();

// Keep production sessions first-party, including on mobile browsers that
// block cross-site cookies. Vercel forwards /api requests to the backend.
const sameOriginApi = ["klps.co.uk", "www.klps.co.uk"].includes(
  window.location.hostname,
);

export const API_BASE = (
  sameOriginApi
    ? ""
    : configuredApiBase || "https://klps-lema-production.up.railway.app"
).replace(/\/$/, "");
