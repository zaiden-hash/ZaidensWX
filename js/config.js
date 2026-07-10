// ============================================================
// Site configuration
// ============================================================
// After you deploy the Cloudflare Worker (see /worker/README in
// the project root), paste its URL below. It will look like:
// https://weather-site-api.YOUR-SUBDOMAIN.workers.dev
const WORKER_API_BASE = "https://weather-site-api.YOUR-SUBDOMAIN.workers.dev";

// Primary station shown in the big hero display.
const PRIMARY_STATION = { id: "KALB", name: "Albany, NY" };

// Secondary stations shown in the regional grid.
const REGIONAL_STATIONS = [
  { id: "KALB", name: "Albany, NY" },
  { id: "KGFL", name: "Glens Falls, NY" },
  { id: "KPSF", name: "Pittsfield, MA" },
  { id: "KPOU", name: "Poughkeepsie, NY" },
];

// Point used to query active NWS alerts (defaults to Troy, NY —
// the Rensselaer County seat). Swap for any lat/lon in-county.
const ALERT_POINT = { lat: 42.7284, lon: -73.6918 };

const NWS_USER_AGENT_NOTE =
  "(Rensselaer County Weather, contact set by site owner)";
