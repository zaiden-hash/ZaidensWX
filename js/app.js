// ============================================================
// Shared chrome: runs on every public page. Updates the status
// strip clock and reflects active-alert count in the warn pill.
// ============================================================

function pad(n) { return n.toString().padStart(2, "0"); }

function tickClock() {
  const now = new Date();
  const local = document.getElementById("clock-local");
  const utc = document.getElementById("clock-utc");
  if (local) {
    local.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} LOCAL`;
  }
  if (utc) {
    utc.textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}Z`;
  }
}

async function updateWarnPill() {
  const pill = document.getElementById("warn-pill");
  if (!pill) return;
  const alerts = await fetchActiveAlerts(ALERT_POINT.lat, ALERT_POINT.lon);
  if (alerts.length > 0) {
    pill.classList.add("active");
    pill.textContent = `${alerts.length} ACTIVE ALERT${alerts.length > 1 ? "S" : ""}`;
  } else {
    pill.classList.remove("active");
    pill.textContent = "NO ACTIVE ALERTS";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  tickClock();
  setInterval(tickClock, 1000);
  updateWarnPill();
  setInterval(updateWarnPill, 5 * 60 * 1000);
});
