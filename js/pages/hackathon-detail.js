// ── PAGE: HACKATHON DETAIL ───────────────────────────────────
function renderDetail(slug, tabParam) {
  const hack = HACKATHONS.find((h) => h.slug === slug);
  const detail = DETAILS[slug];
  if (!hack || !detail)
    return `<div class="wrap page"><div class="empty"><div class="ico">🔍</div><p>해커톤을 찾을 수 없습니다.</p></div></div>`;
  if (tabParam) _tab = tabParam;
  const s = detail.sections;
  const TABS = [
    { id: "overview", label: "개요" },
    { id: "info", label: "안내" },
    { id: "eval", label: "평가" },
    { id: "schedule", label: "일정" },
    { id: "prize", label: "상금" },
    { id: "teams", label: "팀" },
    { id: "submit", label: "제출" },
    { id: "leaderboard", label: "리더보드" },
  ];
  if (!TABS.find((t) => t.id === _tab)) _tab = "overview";
  return `
<div class="wrap page">
  <button class="btn btn-o btn-sm" style="margin-bottom:1.25rem" onclick="go('/hackathons')">← 목록으로</button>
  <div class="dh">
    <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
      <span class="sbadge s-${hack.status}">${slabel(hack.status)}</span>
      ${hack.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
    <h1>${hack.title}</h1>
    <div class="dh-meta">
      <span>📅 제출 마감: ${fmt(hack.period.submissionDeadlineAt)}</span>
      <span>🏁 대회 종료: ${fmt(hack.period.endAt)}</span>
    </div>
  </div>
  <div class="tab-nav">
    ${TABS.map((t) => `<button class="tbtn${_tab === t.id ? " active" : ""}" data-tab="${t.id}" onclick="switchTab('${slug}','${t.id}')">${t.label}</button>`).join("")}
  </div>
  <div id="tc">${tabContent(slug, _tab, s, hack)}</div>
</div>`;
}

function switchTab(slug, tab) {
  _tab = tab;
  document
    .querySelectorAll(".tbtn")
    .forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.getElementById("tc").innerHTML = tabContent(
    slug,
    tab,
    DETAILS[slug].sections,
    HACKATHONS.find((h) => h.slug === slug),
  );
  scrollTo(
    0,
    document.getElementById("tc").getBoundingClientRect().top + scrollY - 80,
  );
}

function tabContent(slug, tab, s, hack) {
  switch (tab) {
    case "overview":   return tabOverview(s.overview);
    case "info":       return tabInfo(s.info);
    case "eval":       return tabEval(s.eval);
    case "schedule":   return tabSchedule(s.schedule);
    case "prize":      return tabPrize(s.prize);
    case "teams":      return tabTeams(slug);
    case "submit":     return tabSubmit(slug, s.submit);
    case "leaderboard": return tabLeaderboard(slug, s.leaderboard);
    default:           return "";
  }
}

function tabOverview(ov) {
  return `
<div class="box"><h3>대회 소개</h3><p>${ov.summary}</p></div>
<div class="box"><h3>팀 구성 정책</h3>
  <div class="metrics">
    <div class="metric"><div class="metric-l">개인 참가</div><div class="metric-v">${ov.teamPolicy.allowSolo ? "✅ 가능" : "❌ 불가"}</div></div>
    <div class="metric"><div class="metric-l">최대 팀원</div><div class="metric-v">${ov.teamPolicy.maxTeamSize}명</div></div>
  </div>
</div>`;
}

function tabInfo(info) {
  return `
<div class="box"><h3>공지사항</h3><ul class="ilist">${info.notice.map((n) => `<li>${n}</li>`).join("")}</ul></div>
<div class="box"><h3>관련 링크</h3>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap">
    <a href="${info.links.rules}" target="_blank" class="btn btn-o btn-sm">📋 규정 보기</a>
    <a href="${info.links.faq}" target="_blank" class="btn btn-o btn-sm">❓ FAQ</a>
  </div>
</div>`;
}

function tabEval(ev) {
  const bd = ev.scoreDisplay && ev.scoreDisplay.breakdown;
  return `
<div class="box"><h3>평가 지표</h3>
  <div class="metrics">
    <div class="metric"><div class="metric-l">지표명</div><div class="metric-v">${ev.metricName}</div></div>
    ${
      ev.limits
        ? `<div class="metric"><div class="metric-l">최대 런타임</div><div class="metric-v">${ev.limits.maxRuntimeSec}초</div></div>
    <div class="metric"><div class="metric-l">일일 최대 제출</div><div class="metric-v">${ev.limits.maxSubmissionsPerDay}회</div></div>`
        : ""
    }
  </div>
</div>
<div class="box"><h3>평가 방식</h3><p>${ev.description}</p>
  ${
    bd
      ? `<div style="margin-top:1.1rem">${bd
          .map(
            (b) => `
  <div class="sbar-wrap">
    <div class="sbar-label"><span>${b.label}</span><span>${b.weightPercent}%</span></div>
    <div class="sbar"><div class="sbar-fill" style="width:${b.weightPercent}%"></div></div>
  </div>`,
          )
          .join("")}</div>`
      : ""
  }
</div>`;
}

function tabSchedule(sch) {
  return `<div class="box"><h3>일정 (${sch.timezone})</h3>
<div class="timeline">${sch.milestones
    .map(
      (m) => `
<div class="titem${isPast(m.at) ? " past" : ""}">
  <div class="tdate">${fmt(m.at)}</div>
  <div class="tname">${m.name}${!isPast(m.at) ? ` <span style="font-size:.7rem;color:var(--blue);background:rgba(59,130,246,.12);padding:.1rem .4rem;border-radius:4px">예정</span>` : ""}</div>
</div>`,
    )
    .join("")}
</div></div>`;
}

function tabPrize(prize) {
  if (!prize)
    return `<div class="box"><p>상금 정보가 없습니다.</p></div>`;
  const med = ["🥇", "🥈", "🥉"];
  return `<div class="box"><h3>시상 내역</h3>
<div class="pgrid">${prize.items
    .map(
      (it, i) => `
<div class="pcard"><div style="font-size:1.6rem;margin-bottom:.4rem">${med[i] || "🏅"}</div>
<div class="pplace">${it.place}</div><div class="pamount">${krw(it.amountKRW)}</div></div>`,
    )
    .join("")}
</div></div>`;
}

function tabTeams(slug) {
  return `<div class="box"><h3>팀 모집</h3>
<p style="margin-bottom:1rem">이 해커톤의 팀원을 찾거나 새 팀을 만드세요.</p>
<button class="btn btn-p" onclick="go('/camp?hackathon=${slug}')">👥 팀원 모집 게시판 보기</button>
</div>`;
}

function tabSubmit(slug, submit) {
  const saved = getSubs()[slug] || {};
  const typeL = { zip: "ZIP 파일", url: "URL", text: "텍스트", pdf: "PDF URL" };
  const items = submit.submissionItems;
  return `
<div class="box"><h3>제출 안내</h3><ul class="ilist">${submit.guide.map((g) => `<li>${g}</li>`).join("")}</ul></div>
<div class="box"><h3>제출 양식</h3>
  <div class="tags" style="margin-bottom:1.1rem">
    ${submit.allowedArtifactTypes.map((t) => `<span class="tag" style="color:var(--pl);border-color:var(--primary)">${typeL[t] || t}</span>`).join("")}
  </div>
  <form id="subform" onsubmit="doSubmit(event,'${slug}')">
    ${
      items
        ? items
            .map(
              (it) => `
    <div class="fg">
      <label class="fl">${it.title}</label>
      ${
        it.format === "text_or_url"
          ? `<textarea class="fta" name="${it.key}" placeholder="텍스트 또는 URL 입력...">${saved[it.key] || ""}</textarea>`
          : `<input type="${it.format === "url" || it.format === "pdf_url" ? "url" : "text"}" class="fi" name="${it.key}" placeholder="${it.format.includes("url") ? "https://" : "입력..."}" value="${saved[it.key] || ""}">`
      }
    </div>`,
            )
            .join("")
        : `
    ${submit.allowedArtifactTypes.includes("zip") ? `<div class="fg"><label class="fl">파일명 (ZIP)</label><input type="text" class="fi" name="filename" placeholder="submission.zip" value="${saved.filename || ""}"></div>` : ""}
    ${submit.allowedArtifactTypes.includes("url") ? `<div class="fg"><label class="fl">제출 URL</label><input type="url" class="fi" name="url" placeholder="https://" value="${saved.url || ""}"></div>` : ""}
    ${submit.allowedArtifactTypes.includes("text") ? `<div class="fg"><label class="fl">기획서</label><textarea class="fta" name="text" placeholder="내용 입력...">${saved.text || ""}</textarea></div>` : ""}
    `
    }
    <div class="fg"><label class="fl">메모 (선택)</label><textarea class="fta" name="notes" style="min-height:70px" placeholder="추가 메모...">${saved.notes || ""}</textarea></div>
    <div style="display:flex;gap:.75rem">
      <button type="button" class="btn btn-o" onclick="doDraft('${slug}')">💾 임시저장</button>
      <button type="submit" class="btn btn-p">📤 최종 제출</button>
    </div>
  </form>
</div>`;
}

function doSubmit(e, slug) {
  e.preventDefault();
  const d = {};
  new FormData(e.target).forEach((v, k) => (d[k] = v));
  saveSub(slug, d);
  toast("✅ 제출 완료!");
}

function doDraft(slug) {
  const f = document.getElementById("subform");
  const d = {};
  new FormData(f).forEach((v, k) => (d[k] = v));
  saveSub(slug, d);
  toast("💾 임시저장 완료!");
}

function tabLeaderboard(slug, lbInfo) {
  const lb = LEADERBOARDS[slug];
  return `<div class="box"><h3>리더보드</h3>
${
  lb
    ? `
<div style="font-size:.76rem;color:var(--muted);margin-bottom:.85rem">최종 업데이트: ${fmt(lb.updatedAt)}</div>
${lbInfo.note ? `<div class="lb-note">${lbInfo.note}</div>` : ""}
<div class="ovx"><table class="tbl">
<thead><tr>
  <th>순위</th><th>팀명</th><th>점수</th>
  ${lb.entries[0]?.scoreBreakdown ? "<th>세부 점수</th>" : ""}
  <th>제출 시각</th>
  ${lb.entries[0]?.artifacts ? "<th>링크</th>" : ""}
</tr></thead>
<tbody>${lb.entries
        .map(
          (e) => `<tr>
  <td><span class="rank ${e.rank <= 3 ? "r" + e.rank : "rn"}">${e.rank}</span></td>
  <td style="font-weight:600">${e.teamName}</td>
  <td style="font-weight:700;color:var(--pl)">${e.score < 1 ? (e.score * 100).toFixed(2) + "%" : e.score}</td>
  ${e.scoreBreakdown ? `<td><div class="bc"><span class="bchip">참가자 <span>${e.scoreBreakdown.participant}</span></span><span class="bchip">심사 <span>${e.scoreBreakdown.judge}</span></span></div></td>` : lb.entries[0]?.scoreBreakdown ? "<td>-</td>" : ""}
  <td style="color:var(--muted);font-size:.78rem">${fmt(e.submittedAt)}</td>
  ${e.artifacts ? `<td>${e.artifacts.webUrl ? `<a href="${e.artifacts.webUrl}" target="_blank" style="color:var(--blue);font-size:.78rem;margin-right:.5rem">🌐 Web</a>` : ""}${e.artifacts.pdfUrl ? `<a href="${e.artifacts.pdfUrl}" target="_blank" style="color:var(--muted);font-size:.78rem">📄 PDF</a>` : ""}</td>` : lb.entries[0]?.artifacts ? "<td>-</td>" : ""}
</tr>`,
        )
        .join("")}
</tbody></table></div>`
    : `<p style="color:var(--muted)">아직 리더보드 데이터가 없습니다.</p>`
}
</div>`;
}
