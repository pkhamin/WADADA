// ── PAGE: HOME ───────────────────────────────────────────────
function renderHome() {
  const active = HACKATHONS.filter((h) => h.status !== "ended");
  const teams  = getTeams();
  const lbCount = Object.values(LEADERBOARDS).reduce((a, b) => a + b.entries.length, 0);
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
  ${active.length ? `
  <div class="sh">
    <div class="sh-t">🔥 진행 중 / 예정 해커톤</div>
    <button class="sh-l" onclick="go('/hackathons')">전체 보기 →</button>
  </div>
  <div class="grid">${active.map(hCard).join("")}</div>` : ""}
  <hr class="div">
  <div class="grid" style="margin-bottom:2.5rem">
    <div class="box" style="cursor:pointer" onclick="go('/rankings')"><h3>🏆 글로벌 랭킹</h3><p>모든 해커톤 참가자의 순위를 확인하세요.</p></div>
    <div class="box" style="cursor:pointer" onclick="go('/camp')"><h3>👥 팀원 모집</h3><p>함께할 팀을 찾거나 나만의 팀을 만드세요.</p></div>
    <div class="box" style="cursor:pointer" onclick="go('/hackathons?status=upcoming')"><h3>📅 예정 해커톤</h3><p>다가오는 해커톤에 미리 준비하세요.</p></div>
  </div>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "home") {
  document.getElementById("app").innerHTML = renderHome();
  updateNav("/");
}
