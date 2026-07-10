# Rensselaer County Weather

A static weather site: live ASOS conditions, active NWS warnings, and a
forecast discussion / today / 7-day outlook you edit yourself through a
hidden admin panel.

- **Frontend**: plain HTML/CSS/JS, hosted free on **GitHub Pages**.
- **Live conditions & alerts**: fetched directly from the public NWS API
  (`api.weather.gov`) in the browser — no key needed.
- **Your forecast content** (discussion, today, 7-day outlook): stored in
  **Cloudflare Workers KV**, edited through `admin.html`, served by a small
  **Cloudflare Worker**. This is the "real backend" piece — you never
  touch a GitHub token.

## 1. Deploy the Worker (backend)

You'll need a free Cloudflare account and `wrangler` (Cloudflare's CLI).

```bash
cd worker
npm install -g wrangler        # if you don't have it
wrangler login

# Create the KV namespace that stores your published content
wrangler kv namespace create CONTENT
```

That command prints an `id`. Copy it into `worker/wrangler.toml`:

```toml
kv_namespaces = [
  { binding = "CONTENT", id = "PASTE_YOUR_ID_HERE" }
]
```

Set your admin password as a secret (never stored in code or the repo):

```bash
wrangler secret put ADMIN_PASSWORD
# paste a strong password when prompted
```

Deploy:

```bash
wrangler deploy
```

Wrangler prints your Worker URL, something like:

```
https://weather-site-api.yoursubdomain.workers.dev
```

## 2. Point the site at your Worker

Open `js/config.js` and set:

```js
const WORKER_API_BASE = "https://weather-site-api.yoursubdomain.workers.dev";
```

## 3. (Optional) Adjust stations / alert area

Still in `js/config.js`:

- `PRIMARY_STATION` — the ASOS station for the big hero display. Defaults
  to `KALB` (Albany Intl), the nearest full ASOS station to Rensselaer
  County. Find other station IDs at https://www.weather.gov/asos/
- `REGIONAL_STATIONS` — the 4-station grid under the hero.
- `ALERT_POINT` — lat/lon used to pull active NWS alerts. Defaults to
  Troy, NY (the county seat). Any point inside the county works.

## 4. Publish to GitHub Pages

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source → Deploy from branch → main
/ (root)**. Your site will be live at
`https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## 5. Publish your first forecast

Visit `https://YOUR-USERNAME.github.io/YOUR-REPO/admin.html`, sign in with
the password you set in step 1, fill in the discussion / today / 7-day
fields, and hit **Publish Update**. The homepage picks it up on next load.

The admin page isn't linked from the nav — it's only reachable if you
know the URL. That's "hidden," not secured; the password + Worker auth is
what actually protects it.

## Project structure

```
index.html          Home — hero conditions, regional grid, forecasts, discussion
warnings.html        Active NWS watches/warnings/advisories
admin.html            Password-gated content editor
css/style.css         Design system
js/config.js           <- set WORKER_API_BASE and stations here
js/nws.js              NWS API helpers (observations, alerts)
js/content.js           Fetches your published content from the Worker
js/app.js               Shared header clock / alert-count pill
js/admin.js             Admin panel logic
worker/src/index.js      Cloudflare Worker (API)
worker/wrangler.toml      Worker config
```

## Notes

- All current-conditions and alert data comes straight from NOAA/NWS —
  this site is not an official government product.
- The admin auth is intentionally simple (single shared password) since
  this is a one-person forecast desk. If you ever want multiple editors
  or stronger auth, swap the password check in `worker/src/index.js` for
  something like Cloudflare Access.
