/* ============================================================
   Rensselaer County Weather — Design Tokens & Base
   Theme: regional weather ops-center. Dark navy field, condensed
   industrial display type for headings, monospace for all live
   data (temps, coords, timestamps) to read like instrumentation.
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root {
  /* Color */
  --bg: #0a0f1a;
  --bg-grid: #0d1424;
  --panel: #111a2c;
  --panel-2: #16213a;
  --border: #223252;
  --border-soft: #1a2740;
  --ink: #e9eef7;
  --muted: #8ba0c2;
  --muted-dim: #5d6f8f;
  --accent-amber: #f0a83b;
  --accent-teal: #3ec9ac;
  --accent-red: #ef4b52;
  --accent-blue: #5b93ff;

  /* Type */
  --font-display: 'Oswald', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Layout */
  --maxw: 1180px;
  --radius: 6px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background:
    radial-gradient(1100px 500px at 15% -10%, #101c33 0%, transparent 60%),
    var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent-blue); text-decoration: none; }
a:hover { text-decoration: underline; }

img, svg { max-width: 100%; display: block; }

.wrap {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- Status strip (signature element) ---------- */
.status-strip {
  background: #060a13;
  border-bottom: 1px solid var(--border-soft);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
  letter-spacing: .02em;
}
.status-strip .wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  height: 34px;
  overflow-x: auto;
  white-space: nowrap;
}
.status-strip .live-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent-teal);
  box-shadow: 0 0 0 0 rgba(62,201,172,.6);
  animation: pulse 2.2s infinite;
  flex: none;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(62,201,172,.55); }
  70% { box-shadow: 0 0 0 7px rgba(62,201,172,0); }
  100% { box-shadow: 0 0 0 0 rgba(62,201,172,0); }
}
.status-strip .sep { color: var(--border); }
.status-strip .warn-pill {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
}
.status-strip .warn-pill.active {
  border-color: rgba(239,75,82,.5);
  background: rgba(239,75,82,.12);
  color: #ff9298;
}

/* ---------- Header / Nav ---------- */
header.site {
  border-bottom: 1px solid var(--border-soft);
  background: linear-gradient(180deg, #0c1424 0%, #0a101d 100%);
}
header.site .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  padding-bottom: 18px;
  gap: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-mark {
  width: 34px; height: 34px;
  border-radius: 8px;
  background: linear-gradient(145deg, var(--accent-teal), #1c8f78);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  color: #04241d;
  font-size: 15px;
  flex: none;
}
.brand-text .name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  letter-spacing: .01em;
  text-transform: uppercase;
  line-height: 1;
}
.brand-text .tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted-dim);
  letter-spacing: .04em;
}
nav.main {
  display: flex;
  gap: 4px;
}
nav.main a {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: .03em;
  text-transform: uppercase;
  padding: 8px 14px;
  border-radius: var(--radius);
}
nav.main a:hover, nav.main a.active {
  color: var(--ink);
  background: var(--panel-2);
  text-decoration: none;
}

/* ---------- Section shells ---------- */
main { padding: 34px 0 70px; }
section + section { margin-top: 46px; }

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--accent-teal);
}
h1, h2, h3 {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: .01em;
  margin: 4px 0 0;
  font-weight: 600;
  color: var(--ink);
}
h2 { font-size: 22px; }
h3 { font-size: 16px; }

.timestamp {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted-dim);
}

/* ---------- Panels / cards ---------- */
.panel {
  background: var(--panel);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
}

/* ---------- Hero current conditions ---------- */
.hero-conditions {
  padding: 26px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px;
  align-items: center;
}
.hero-temp-block { display: flex; align-items: flex-start; gap: 6px; }
.hero-temp {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 76px;
  line-height: .9;
  color: var(--accent-amber);
}
.hero-temp-unit {
  font-family: var(--font-mono);
  font-size: 22px;
  color: var(--muted);
  margin-top: 8px;
}
.hero-meta .station-name {
  font-family: var(--font-display);
  font-size: 20px;
  text-transform: uppercase;
}
.hero-meta .cond-text { color: var(--accent-teal); font-weight: 600; margin-top: 2px;}
.hero-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 16px;
}
.hero-stat {
  background: var(--panel-2);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 9px 12px;
}
.hero-stat .label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted-dim);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.hero-stat .value {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--ink);
  margin-top: 2px;
}

/* ---------- Regional grid ---------- */
.station-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.station-card {
  padding: 16px;
}
.station-card .city {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 13px;
  color: var(--muted);
  letter-spacing: .02em;
}
.station-card .temp {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 600;
  color: var(--ink);
  margin-top: 4px;
}
.station-card .temp span { font-size: 16px; color: var(--muted); }
.station-card .cond {
  font-size: 13px;
  color: var(--accent-teal);
  margin-top: 2px;
}
.station-card .sub {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted-dim);
  margin-top: 8px;
}

/* ---------- Forecast cards (today / weekly) ---------- */
.today-panel { padding: 22px; }
.today-panel .body-text { color: var(--ink); font-size: 15px; }

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}
.day-card {
  padding: 14px 10px;
  text-align: center;
}
.day-card .dname {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 12px;
  color: var(--muted);
}
.day-card .hi {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--accent-amber);
  margin-top: 6px;
}
.day-card .lo {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted-dim);
}
.day-card .dsum {
  font-size: 11.5px;
  color: var(--muted);
  margin-top: 6px;
  min-height: 28px;
}

/* ---------- Discussion / bulletin ---------- */
.bulletin {
  padding: 22px 24px;
  border-left: 3px solid var(--accent-teal);
}
.bulletin .body-text {
  white-space: pre-wrap;
  font-size: 15px;
  color: var(--ink);
}
.bulletin .body-text:first-line { color: var(--ink); }

/* ---------- Warnings page ---------- */
.alert-card {
  padding: 18px 20px;
  border-left: 4px solid var(--accent-red);
  margin-bottom: 12px;
}
.alert-card.advisory { border-left-color: var(--accent-amber); }
.alert-card.watch { border-left-color: var(--accent-blue); }
.alert-card .ev {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 17px;
  color: var(--ink);
}
.alert-card .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted-dim);
  margin: 4px 0 10px;
}
.alert-card .desc { font-size: 14px; color: var(--muted); white-space: pre-wrap; }

.no-alerts {
  padding: 40px 24px;
  text-align: center;
  color: var(--muted);
}
.no-alerts .big {
  font-family: var(--font-display);
  text-transform: uppercase;
  color: var(--accent-teal);
  font-size: 20px;
  margin-bottom: 6px;
}

/* ---------- Footer ---------- */
footer.site {
  border-top: 1px solid var(--border-soft);
  padding: 22px 0 40px;
  color: var(--muted-dim);
  font-size: 12px;
  font-family: var(--font-mono);
}
footer.site .wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;}

/* ---------- Admin ---------- */
.admin-shell { max-width: 760px; margin: 0 auto; padding: 60px 20px; }
.admin-login {
  padding: 34px;
  max-width: 380px;
  margin: 80px auto;
}
.field { margin-bottom: 16px; }
.field label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--muted);
  margin-bottom: 6px;
}
input[type="text"], input[type="password"], input[type="number"], textarea {
  width: 100%;
  background: var(--panel-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 14px;
  padding: 10px 12px;
}
textarea { min-height: 140px; resize: vertical; font-family: var(--font-body); }
input:focus, textarea:focus, button:focus, a:focus {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}
button, .btn {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: .03em;
  font-size: 13px;
  background: var(--accent-teal);
  color: #04241d;
  border: none;
  border-radius: var(--radius);
  padding: 11px 18px;
  cursor: pointer;
}
button.secondary {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}
button:hover { filter: brightness(1.08); }
.form-msg { font-family: var(--font-mono); font-size: 12px; margin-top: 10px; }
.form-msg.ok { color: var(--accent-teal); }
.form-msg.err { color: var(--accent-red); }

.day-row {
  display: grid;
  grid-template-columns: 1.4fr .8fr .8fr 2.4fr auto;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}
.day-row button { padding: 8px 10px; }

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero-conditions { grid-template-columns: 1fr; }
  .hero-stat-grid { grid-template-columns: repeat(2, 1fr); }
  .station-grid { grid-template-columns: repeat(2, 1fr); }
  .week-grid { grid-template-columns: repeat(4, 1fr); }
  .day-row { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  nav.main { display: none; }
  .week-grid { grid-template-columns: repeat(3, 1fr); }
  .hero-temp { font-size: 58px; }
}

@media (prefers-reduced-motion: reduce) {
  .status-strip .live-dot { animation: none; }
  html { scroll-behavior: auto; }
}
