// ── PAGE: SIGNUP ─────────────────────────────────────────────
function renderSignup() {
  return `
<div class="wrap page" style="max-width:420px">
  <div class="ph"><h1>회원가입</h1><p>DAKER 계정을 만드세요.</p></div>
  <form id="signup-form">
    <div class="fg"><label class="fl">닉네임</label><input type="text" class="fi" name="nickname" placeholder="닉네임 입력" required></div>
    <div class="fg"><label class="fl">이메일</label><input type="email" class="fi" name="email" placeholder="email@example.com" required></div>
    <div class="fg"><label class="fl">비밀번호</label><input type="password" class="fi" name="password" placeholder="8자 이상" required></div>
    <div class="fg"><label class="fl">비밀번호 확인</label><input type="password" class="fi" name="passwordConfirm" placeholder="비밀번호 재입력" required></div>
    <button type="submit" class="btn btn-p" style="width:100%;margin-bottom:.75rem">가입하기</button>
    <p style="text-align:center;font-size:.85rem;color:var(--muted)">
      이미 계정이 있으신가요? <button class="sh-l" onclick="go('/login')">로그인</button>
    </p>
  </form>
</div>`;
}

// ── INIT ────────────────────────────────────────────────────
if (document.getElementById("app")?.dataset.page === "signup") {
  document.getElementById("app").innerHTML = renderSignup();
  updateNav("/signup");
}
