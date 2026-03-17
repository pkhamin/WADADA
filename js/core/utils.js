// ── 날짜 포맷 ────────────────────────────────────────────────
const fmt = (d) =>
  new Date(d).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtD = (d) =>
  new Date(d).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const isPast = (d) => new Date(d) < new Date();
const krw = (n) => n.toLocaleString("ko-KR") + "원";
const slabel = (s) =>
  ({ ongoing: "진행중", upcoming: "예정", ended: "종료" })[s] || s;

// ── 카드 시각 헬퍼 ───────────────────────────────────────────
const GRADS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#fa709a,#fee140)",
];
const EMOJIS = { aimers: "🤖", vibe: "✨", daker: "⚡", monthly: "📅" };

const grad = (slug) => {
  let h = 0;
  for (let c of slug) h += c.charCodeAt(0);
  return GRADS[h % GRADS.length];
};
const emoji = (slug) => {
  for (const [k, v] of Object.entries(EMOJIS))
    if (slug.includes(k)) return v;
  return "🏆";
};

// ── 토스트 ───────────────────────────────────────────────────
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
