// ── PAGE: LOGIN ──────────────────────────────────────────────
function renderLogin() {
  return `
<div class="wrap page" style="max-width:420px">
  <div class="ph"><h1>로그인</h1><p>DAKER 계정으로 로그인하세요.</p></div>
  <form id="login-form">
    <div class="fg"><label class="fl">이메일</label><input type="email" class="fi" name="email" placeholder="email@example.com" required></div>
    <div class="fg"><label class="fl">비밀번호</label><input type="password" class="fi" name="password" placeholder="비밀번호 입력" required></div>
    <button type="submit" class="btn btn-p" style="width:100%;margin-bottom:.75rem">로그인</button>
    <p style="text-align:center;font-size:.85rem;color:var(--muted)">
      계정이 없으신가요? <button class="sh-l" onclick="go('/signup')">회원가입</button>
    </p>
  </form>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "login") {
  document.getElementById("app").innerHTML = renderLogin();
  updateNav("/login");
}
