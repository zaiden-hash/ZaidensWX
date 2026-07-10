// ============================================================
// Rensselaer County Weather — Worker API
//
// Endpoints:
//   GET  /api/content   -> public, returns published content
//   POST /api/login     -> { password } -> { ok, token }
//   POST /api/content   -> Authorization: Bearer <token>, saves content
//
// Storage: Cloudflare KV, binding name "CONTENT".
// Secret:  ADMIN_PASSWORD, set with `wrangler secret put ADMIN_PASSWORD`.
// ============================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const DEFAULT_CONTENT = {
  discussion: "Welcome! The forecast discussion will appear here once the admin publishes an update.",
  today: "No forecast published yet.",
  weekly: [],
  updated: null,
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname === "/api/content" && request.method === "GET") {
      const raw = await env.CONTENT.get("content");
      return json(raw ? JSON.parse(raw) : DEFAULT_CONTENT);
    }

    if (url.pathname === "/api/login" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      if (!env.ADMIN_PASSWORD) {
        return json({ error: "Server not configured: missing ADMIN_PASSWORD secret" }, 500);
      }
      if (body.password === env.ADMIN_PASSWORD) {
        // The password itself doubles as the bearer token for this
        // single-admin setup. Simple and sufficient for personal use.
        return json({ ok: true, token: env.ADMIN_PASSWORD });
      }
      return json({ error: "Incorrect password" }, 401);
    }

    if (url.pathname === "/api/content" && request.method === "POST") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      if (!env.ADMIN_PASSWORD || token !== env.ADMIN_PASSWORD) {
        return json({ error: "Unauthorized" }, 401);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const payload = {
        discussion: String(body.discussion || "").slice(0, 8000),
        today: String(body.today || "").slice(0, 2000),
        weekly: Array.isArray(body.weekly)
          ? body.weekly.slice(0, 7).map((d) => ({
              day: String(d.day || "").slice(0, 40),
              high: String(d.high || "").slice(0, 10),
              low: String(d.low || "").slice(0, 10),
              summary: String(d.summary || "").slice(0, 200),
            }))
          : [],
        updated: new Date().toISOString(),
      };

      await env.CONTENT.put("content", JSON.stringify(payload));
      return json({ ok: true, updated: payload.updated });
    }

    return json({ error: "Not found" }, 404);
  },
};
