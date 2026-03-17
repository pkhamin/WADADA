// ── 경로 감지 (root vs pages/ 폴더) ─────────────────────────
const _inPages = window.location.pathname.replace(/\\/g, "/").includes("/pages/");
const _root    = _inPages ? "../" : "";
const _dir     = _inPages ? ""    : "pages/";

// ── 페이지 이동 ──────────────────────────────────────────────
function go(path) {
  const p  = path.split("?")[0];
  const qs = path.includes("?") ? "?" + path.split("?")[1] : "";

  if (p === "/") {
    window.location.href = _root + "index.html";
    return;
  }
  if (p.startsWith("/hackathons/")) {
    const slug = p.replace("/hackathons/", "");
    window.location.href = _dir + "hackathon-detail.html?slug=" + slug + (qs ? "&" + qs.slice(1) : "");
    return;
  }
  if (p === "/hackathons") { window.location.href = _dir + "hackathons.html" + qs; return; }
  if (p === "/rankings")   { window.location.href = _dir + "rankings.html";        return; }
  if (p === "/camp")       { window.location.href = _dir + "camp.html" + qs;       return; }
  if (p === "/login")      { window.location.href = _dir + "login.html";            return; }
  if (p === "/signup")     { window.location.href = _dir + "signup.html";           return; }
  if (p === "/mypage")     { window.location.href = _dir + "mypage.html";           return; }
  if (p === "/teampage")   { window.location.href = _dir + "teampage.html" + qs;   return; }
}

// ── 현재 페이지 네비 활성화 ──────────────────────────────────
function updateNav(activePath) {
  document.querySelectorAll(".nl").forEach((el) => {
    const r = el.dataset.r;
    el.classList.toggle(
      "active",
      r && (r === activePath || (r !== "/" && activePath.startsWith(r))),
    );
  });
}
