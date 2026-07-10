// ============================================================
// NWS API helpers
// api.weather.gov is public, free, and CORS-enabled — no key
// needed and no worker involved for this data.
// ============================================================

const NWS_BASE = "https://api.weather.gov";

function cToF(c) {
  if (c === null || c === undefined) return null;
  return Math.round((c * 9) / 5 + 32);
}

function kmhToMph(kmh) {
  if (kmh === null || kmh === undefined) return null;
  return Math.round(kmh * 0.621371);
}

function paToInHg(pa) {
  if (pa === null || pa === undefined) return null;
  return (pa * 0.0002953).toFixed(2);
}

function compassFromDeg(deg) {
  if (deg === null || deg === undefined) return "—";
  const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
}

function timeAgo(iso) {
  if (!iso) return "—";
  const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin === 1) return "1 min ago";
  if (diffMin < 60) return `${diffMin} min ago`;
  const h = Math.floor(diffMin / 60);
  return `${h} hr${h > 1 ? "s" : ""} ago`;
}

/**
 * Fetch and normalize the latest observation for a station.
 * Returns null (rather than throwing) on failure so callers can
 * render a graceful "unavailable" state per-station.
 */
async function fetchStationObservation(stationId) {
  try {
    const res = await fetch(`${NWS_BASE}/stations/${stationId}/observations/latest`, {
      headers: { Accept: "application/geo+json" },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = await res.json();
    const p = json.properties;
    return {
      stationId,
      tempF: cToF(p.temperature?.value),
      dewpointF: cToF(p.dewpoint?.value),
      condition: p.textDescription || "—",
      windMph: kmhToMph(p.windSpeed?.value != null ? p.windSpeed.value * 3.6 : null),
      windDir: compassFromDeg(p.windDirection?.value),
      humidity: p.relativeHumidity?.value != null ? Math.round(p.relativeHumidity.value) : null,
      pressureInHg: paToInHg(p.barometricPressure?.value),
      timestamp: p.timestamp,
      updatedLabel: timeAgo(p.timestamp),
    };
  } catch (err) {
    console.error(`observation fetch failed for ${stationId}`, err);
    return null;
  }
}

/**
 * Fetch active alerts intersecting a lat/lon point.
 */
async function fetchActiveAlerts(lat, lon) {
  try {
    const res = await fetch(`${NWS_BASE}/alerts/active?point=${lat},${lon}`, {
      headers: { Accept: "application/geo+json" },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = await res.json();
    return (json.features || [])
      .map((f) => f.properties)
      .sort((a, b) => new Date(b.sent) - new Date(a.sent));
  } catch (err) {
    console.error("alerts fetch failed", err);
    return [];
  }
}

function alertSeverityClass(props) {
  const event = (props.event || "").toLowerCase();
  if (event.includes("watch")) return "watch";
  if (event.includes("advisory")) return "advisory";
  return "";
}
