// ============================================================
// Admin panel logic. Auth token lives in sessionStorage only
// (cleared when the tab closes) — never written to the repo.
// ============================================================

const TOKEN_KEY = "rcweather_admin_token";

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
function setToken(t) {
  sessionStorage.setItem(TOKEN_KEY, t);
}
function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

function showEditor() {
  document.getElementById("login-panel").style.display = "none";
  document.getElementById("editor").style.display = "block";
  loadCurrentContent();
}
function showLogin() {
  document.getElementById("login-panel").style.display = "block";
  document.getElementById("editor").style.display = "none";
}

async function login() {
  const password = document.getElementById("password").value;
  const msg = document.getElementById("login-msg");
  msg.textContent = "";
  try {
    const res = await fetch(`${WORKER_API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    setToken(data.token);
    showEditor();
  } catch (err) {
    msg.textContent = "Incorrect password.";
  }
}

function logout() {
  clearToken();
  showLogin();
}

function addDayRow(day = "", high = "", low = "", summary = "") {
  const rows = document.getElementById("week-rows");
  const row = document.createElement("div");
  row.className = "day-row";
  row.innerHTML = `
    <input type="text" placeholder="Day (e.g. Monday)" class="d-day" value="${day}">
    <input type="number" placeholder="High" class="d-high" value="${high}">
    <input type="number" placeholder="Low" class="d-low" value="${low}">
    <input type="text" placeholder="Summary" class="d-summary" value="${summary}">
    <button type="button" class="secondary remove-row">Remove</button>
  `;
  row.querySelector(".remove-row").addEventListener("click", () => row.remove());
  rows.appendChild(row);
}

function collectWeekly() {
  return Array.from(document.querySelectorAll("#week-rows .day-row")).map((row) => ({
    day: row.querySelector(".d-day").value.trim(),
    high: row.querySelector(".d-high").value.trim(),
    low: row.querySelector(".d-low").value.trim(),
    summary: row.querySelector(".d-summary").value.trim(),
  })).filter(d => d.day || d.summary);
}

async function loadCurrentContent() {
  try {
    const res = await fetch(`${WORKER_API_BASE}/api/content`, { cache: "no-store" });
    const data = await res.json();
    document.getElementById("discussion-input").value = data.discussion || "";
    document.getElementById("today-input").value = data.today || "";
    document.getElementById("week-rows").innerHTML = "";
    (data.weekly || []).forEach(d => addDayRow(d.day, d.high, d.low, d.summary));
    if (!data.weekly || !data.weekly.length) {
      ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach(d => addDayRow(d));
    }
  } catch (err) {
    console.error("failed to load current content", err);
  }
}

async function publish() {
  const msg = document.getElementById("save-msg");
  msg.className = "form-msg";
  msg.textContent = "Publishing…";

  const payload = {
    discussion: document.getElementById("discussion-input").value,
    today: document.getElementById("today-input").value,
    weekly: collectWeekly(),
  };

  try {
    const res = await fetch(`${WORKER_API_BASE}/api/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Publish failed");
    msg.classList.add("ok");
    msg.textContent = `Published successfully at ${new Date(data.updated).toLocaleTimeString()}.`;
  } catch (err) {
    if (String(err.message).toLowerCase().includes("unauthorized")) {
      clearToken();
      showLogin();
      return;
    }
    msg.classList.add("err");
    msg.textContent = "Publish failed — check your connection and try again.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-btn").addEventListener("click", login);
  document.getElementById("password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") login();
  });
  document.getElementById("logout-btn").addEventListener("click", logout);
  document.getElementById("add-day-btn").addEventListener("click", () => addDayRow());
  document.getElementById("save-btn").addEventListener("click", publish);

  if (getToken()) {
    showEditor();
  } else {
    showLogin();
  }
});
