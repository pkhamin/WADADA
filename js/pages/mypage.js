// ── PAGE: MYPAGE ─────────────────────────────────────────────
function renderMypage() {
  return `
<div class="wrap page">
  <div class="ph"><h1>마이페이지</h1><p>내 활동 내역과 정보를 확인하세요.</p></div>
  <div class="empty"><div class="ico">🚧</div><p>준비 중입니다.</p></div>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "mypage") {
  document.getElementById("app").innerHTML = renderMypage();
  updateNav("/mypage");
}
