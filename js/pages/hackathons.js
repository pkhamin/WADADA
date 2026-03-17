// ── PAGE: HACKATHON LIST ─────────────────────────────────────
function renderList(f) {
  _hf = f || "all";
  const filtered =
    _hf === "all"
      ? HACKATHONS
      : HACKATHONS.filter((h) => h.status === _hf);
  return `
<div class="wrap page">
  <div class="ph"><h1>해커톤 목록</h1><p>참가하고 싶은 해커톤을 찾아보세요.</p></div>
  <div class="ftabs">
    ${["all", "ongoing", "upcoming", "ended"]
      .map(
        (s) => `
    <button class="ftab${_hf === s ? " active" : ""}" onclick="go('/hackathons?status=${s}')">
      ${s === "all" ? "전체" : slabel(s)} <span style="opacity:.6">${s === "all" ? HACKATHONS.length : HACKATHONS.filter((h) => h.status === s).length}</span>
    </button>`,
      )
      .join("")}
  </div>
  <div class="grid">
    ${filtered.length ? filtered.map(hCard).join("") : `<div class="empty" style="grid-column:1/-1"><div class="ico">📭</div><p>해당 상태의 해커톤이 없습니다.</p></div>`}
  </div>
</div>`;
}

function hCard(h) {
  return `
<div class="hcard" onclick="go('/hackathons/${h.slug}')">
  <div class="hcard-thumb" style="background:${grad(h.slug)}"><span>${emoji(h.slug)}</span></div>
  <div class="hcard-body">
    <div class="hcard-title">${h.title}</div>
    <div class="tags">${h.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    <div class="hcard-foot">
      <span class="sbadge s-${h.status}">${slabel(h.status)}</span>
      <span class="dl">마감 ${fmtD(h.period.submissionDeadlineAt)}</span>
    </div>
  </div>
</div>`;
}
