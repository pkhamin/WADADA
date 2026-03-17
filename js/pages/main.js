// ── 상태 ────────────────────────────────────────────────────
let _tab = "overview";
let _hf = "all";
let _campFilters = [];
let _campDropdownOpen = false;

// ── ROUTER ──────────────────────────────────────────────────
function parseHash() {
  const h = window.location.hash;
  if (!h || h === "#") return { path: "/", q: new URLSearchParams() };
  const full = h.slice(1);
  const qi = full.indexOf("?");
  if (qi === -1) return { path: full, q: new URLSearchParams() };
  return {
    path: full.slice(0, qi),
    q: new URLSearchParams(full.slice(qi + 1)),
  };
}

function go(pathQ, replace = false) {
  const url = "#" + pathQ;
  replace
    ? history.replaceState(null, "", url)
    : history.pushState(null, "", url);
  render();
  updateNav();
  scrollTo(0, 0);
}

function updateNav() {
  const { path } = parseHash();
  document.querySelectorAll(".nl").forEach((el) => {
    const r = el.dataset.r;
    el.classList.toggle(
      "active",
      path === r || (r !== "/" && path.startsWith(r)),
    );
  });
}

window.addEventListener("popstate", () => {
  render();
  updateNav();
});

// ── RENDER DISPATCH ─────────────────────────────────────────
function render() {
  const { path, q } = parseHash();
  const app = document.getElementById("app");
  if (path === "/") app.innerHTML = renderHome();
  else if (path === "/hackathons")
    app.innerHTML = renderList(q.get("status") || "all");
  else if (path.startsWith("/hackathons/")) {
    const slug = path.split("/hackathons/")[1];
    app.innerHTML = renderDetail(slug, q.get("tab"));
  } else if (path === "/rankings") app.innerHTML = renderRankings();
  else if (path === "/camp")
    app.innerHTML = renderCamp(q.get("hackathon"));
  else
    app.innerHTML = `<div class="wrap page"><div class="empty"><div class="ico">🔍</div><p>페이지를 찾을 수 없습니다.</p></div></div>`;
}

// ── PAGE: HOME ───────────────────────────────────────────────
function renderHome() {
  const active = HACKATHONS.filter((h) => h.status !== "ended");
  const teams = getTeams();
  const lbCount = Object.values(LEADERBOARDS).reduce(
    (a, b) => a + b.entries.length,
    0,
  );
  return `
<section class="hero">
  <div class="wrap">
    <div class="hero-badge">⚡ AI 해커톤 플랫폼</div>
    <h1>아이디어를 현실로,<br><span>함께 만드는 해커톤</span></h1>
    <p>도전하고, 배우고, 성장하세요. 지금 바로 참가하거나 팀원을 모집하세요.</p>
    <div class="hero-btns">
      <button class="btn btn-p" onclick="go('/hackathons')">해커톤 보기</button>
      <button class="btn btn-o" onclick="go('/camp')">👥 팀원 모집</button>
      <button class="btn btn-o" onclick="go('/rankings')">🏆 랭킹</button>
    </div>
  </div>
</section>
<div class="wrap">
  <div class="stats">
    <div><div class="stat-n">${HACKATHONS.length}</div><div class="stat-l">전체 해커톤</div></div>
    <div><div class="stat-n">${HACKATHONS.filter((h) => h.status === "ongoing").length}</div><div class="stat-l">진행 중</div></div>
    <div><div class="stat-n">${teams.length}</div><div class="stat-l">참가 팀</div></div>
    <div><div class="stat-n">${lbCount}</div><div class="stat-l">제출 기록</div></div>
  </div>
  ${
    active.length
      ? `
  <div class="sh"><div class="sh-t">🔥 진행 중 / 예정 해커톤</div><button class="sh-l" onclick="go('/hackathons')">전체 보기 →</button></div>
  <div class="grid">${active.map(hCard).join("")}</div>`
      : ""
  }
  <hr class="div">
  <div class="grid" style="margin-bottom:2.5rem">
    <div class="box" style="cursor:pointer" onclick="go('/rankings')"><h3>🏆 글로벌 랭킹</h3><p>모든 해커톤 참가자의 순위를 확인하세요.</p></div>
    <div class="box" style="cursor:pointer" onclick="go('/camp')"><h3>👥 팀원 모집</h3><p>함께할 팀을 찾거나 나만의 팀을 만드세요.</p></div>
    <div class="box" style="cursor:pointer" onclick="go('/hackathons?status=upcoming')"><h3>📅 예정 해커톤</h3><p>다가오는 해커톤에 미리 준비하세요.</p></div>
  </div>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
render();
updateNav();
