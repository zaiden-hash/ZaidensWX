// ============================================================
// Fetches admin-published content (discussion, today's forecast,
// weekly forecast) from the Cloudflare Worker + KV backend.
// ============================================================

async function fetchPublishedContent() {
  try {
    const res = await fetch(`${WORKER_API_BASE}/api/content`, { cache: "no-store" });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("content fetch failed", err);
    return {
      discussion: "Forecast discussion is temporarily unavailable.",
      today: "Today's forecast is temporarily unavailable.",
      weekly: [],
      updated: null,
    };
  }
}

function formatUpdated(iso) {
  if (!iso) return "not yet published";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}
