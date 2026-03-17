// ── PAGE: RANKINGS ──────────────────────────────────────────
function renderRankings() {
  const all = [];
  Object.values(LEADERBOARDS).forEach((lb) => {
    const hack = HACKATHONS.find((h) => h.slug === lb.hackathonSlug);
    lb.entries.forEach((e) =>
      all.push({ ...e, hackSlug: lb.hackathonSlug, hackTitle: hack?.title || lb.hackathonSlug }),
    );
  });
  all.sort((a, b) => b.score - a.score);
  return `
<div class="wrap page">
  <div class="ph"><h1>🏆 글로벌 랭킹</h1><p>모든 해커톤 참가팀의 종합 랭킹입니다.</p></div>
  <div class="box"><div class="ovx"><table class="tbl">
    <thead><tr><th>#</th><th>팀명</th><th>해커톤</th><th>점수</th><th>제출일</th></tr></thead>
    <tbody>${all.map((e, i) => `<tr>
      <td><span class="rank ${i < 3 ? "r" + (i + 1) : "rn"}">${i + 1}</span></td>
      <td style="font-weight:600">${e.teamName}</td>
      <td><span class="hchip" onclick="go('/hackathons/${e.hackSlug}')">${e.hackTitle.length > 22 ? e.hackTitle.slice(0, 22) + "…" : e.hackTitle}</span></td>
      <td style="font-weight:700;color:var(--pl)">${e.score < 1 ? (e.score * 100).toFixed(2) + "%" : e.score}</td>
      <td style="color:var(--muted);font-size:.78rem">${fmt(e.submittedAt)}</td>
    </tr>`).join("")}
    </tbody>
  </table></div></div>

  <div class="sh" style="margin-top:2rem"><div class="sh-t">해커톤별 TOP 팀</div></div>
  <div class="grid">${Object.values(LEADERBOARDS).map((lb) => {
    const hack = HACKATHONS.find((h) => h.slug === lb.hackathonSlug);
    const top  = lb.entries[0];
    return `<div class="box" style="cursor:pointer" onclick="go('/hackathons/${lb.hackathonSlug}?tab=leaderboard')">
      <div style="font-size:.74rem;color:var(--muted);margin-bottom:.5rem">${hack?.title || lb.hackathonSlug}</div>
      <div style="display:flex;align-items:center;gap:.75rem">
        <span style="font-size:1.4rem">🥇</span>
        <div>
          <div style="font-weight:700">${top.teamName}</div>
          <div style="font-size:.78rem;color:var(--pl)">Score: ${top.score < 1 ? (top.score * 100).toFixed(2) + "%" : top.score}</div>
        </div>
      </div>
    </div>`;
  }).join("")}</div>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "rankings") {
  document.getElementById("app").innerHTML = renderRankings();
  updateNav("/rankings");
}
