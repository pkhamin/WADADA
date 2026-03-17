// ── PAGE: TEAMPAGE ───────────────────────────────────────────
function renderTeampage(teamCode) {
  const team = getTeams().find((t) => t.teamCode === teamCode);
  if (!team) return `<div class="wrap page"><div class="empty"><div class="ico">🔍</div><p>팀을 찾을 수 없습니다.</p></div></div>`;

  return `
<div class="wrap page">
  <button class="btn btn-o btn-sm" style="margin-bottom:1.25rem" onclick="go('/camp')">← 팀원 모집으로</button>
  <div class="tcard" style="margin-bottom:1.5rem">
    <div class="tc-head">
      <div class="tname">${team.name}</div>
      <span class="opbadge ${team.isOpen ? "op-y" : "op-n"}">${team.isOpen ? "모집중" : "모집완료"}</span>
    </div>
    <div class="tintro">${team.intro}</div>
    ${team.lookingFor.length ? `<div class="lfor">${team.lookingFor.map((r) => `<span class="ltag">${r}</span>`).join("")}</div>` : ""}
    <div style="font-size:.8rem;color:var(--muted)">👤 ${team.memberCount}명 · 결성일 ${new Date(team.createdAt).toLocaleDateString("ko-KR")}</div>
    ${team.isOpen ? `<a href="${team.contact.url}" target="_blank" class="cbtn" style="align-self:flex-start">연락하기</a>` : ""}
  </div>
  <div class="empty"><div class="ico">🚧</div><p>팀 상세 페이지는 준비 중입니다.</p></div>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "teampage") {
  const q = new URLSearchParams(window.location.search);
  document.getElementById("app").innerHTML = renderTeampage(q.get("team"));
  updateNav("/camp");
}
