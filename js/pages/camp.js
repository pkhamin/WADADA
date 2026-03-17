// ── PAGE: CAMP ──────────────────────────────────────────────
function renderCamp(hFilter) {
  if (hFilter) {
    _campFilters = hFilter.split(",").filter(Boolean);
  } else {
    _campFilters = [];
  }
  _campDropdownOpen = false;
  return renderCampHTML();
}

function renderCampHTML() {
  const teams = getTeams();
  const filtered =
    _campFilters.length === 0
      ? teams
      : teams.filter((t) => _campFilters.includes(t.hackathonSlug));
  return `
<div class="wrap page" onclick="closeCampDropdown(event)">
  <div class="ph-row">
    <div class="ph">
      <h1>👥 팀원 모집</h1>
      <p>해커톤 팀을 찾거나 새 팀을 만드세요.</p>
    </div>
    <button class="btn btn-p" onclick="openTeamModal()">+ 팀 만들기</button>
  </div>

  <div style="position:relative;margin-bottom:1.5rem" id="camp-filter-wrap" onclick="event.stopPropagation()">
    <div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-o btn-sm" onclick="toggleCampDropdown(event)" style="display:flex;align-items:center;gap:.4rem">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
        필터
        ${_campFilters.length > 0 ? `<span style="background:var(--primary);color:#fff;border-radius:100px;padding:.05rem .45rem;font-size:.68rem;margin-left:.1rem">${_campFilters.length}</span>` : ""}
      </button>
      ${_campFilters.map((slug) => {
        const h = HACKATHONS.find((x) => x.slug === slug);
        return h
          ? `<span style="display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .65rem;background:var(--pd);color:var(--pl);border:1px solid var(--primary);border-radius:100px;font-size:.78rem">
              ${h.title.length > 18 ? h.title.slice(0, 18) + "…" : h.title}
              <span onclick="toggleCampFilterSlug('${slug}')" style="cursor:pointer;opacity:.7;font-size:.8rem;line-height:1">✕</span>
            </span>`
          : "";
      }).join("")}
    </div>

    <div id="camp-filter-panel" style="display:${_campDropdownOpen ? "block" : "none"};position:absolute;top:calc(100% + .5rem);left:0;z-index:50;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;min-width:290px;box-shadow:0 8px 32px rgba(0,0,0,.5)">
      <div style="font-size:.75rem;font-weight:700;color:var(--muted);margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.5px">해커톤 선택</div>
      ${HACKATHONS.map((h) => {
        const cnt = teams.filter((t) => t.hackathonSlug === h.slug).length;
        const checked = _campFilters.includes(h.slug);
        return `<label style="display:flex;align-items:center;gap:.7rem;padding:.55rem 0;cursor:pointer;border-bottom:1px solid var(--border)">
          <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleCampFilterSlug('${h.slug}')" style="width:16px;height:16px;cursor:pointer;accent-color:var(--primary);flex-shrink:0">
          <span style="flex:1;font-size:.85rem;line-height:1.4">${h.title.length > 30 ? h.title.slice(0, 30) + "…" : h.title}</span>
          <span style="font-size:.75rem;color:var(--muted);flex-shrink:0">${cnt}팀</span>
        </label>`;
      }).join("")}
    </div>
  </div>

  <div class="grid">
    ${filtered.length
      ? filtered.map(teamCard).join("")
      : `<div class="empty" style="grid-column:1/-1"><div class="ico">👥</div><p>조건에 맞는 팀이 없습니다.</p></div>`}
  </div>
</div>`;
}

function toggleCampDropdown(e) {
  e.stopPropagation();
  _campDropdownOpen = !_campDropdownOpen;
  const panel = document.getElementById("camp-filter-panel");
  if (panel) panel.style.display = _campDropdownOpen ? "block" : "none";
}

function closeCampDropdown(e) {
  if (_campDropdownOpen) {
    _campDropdownOpen = false;
    const panel = document.getElementById("camp-filter-panel");
    if (panel) panel.style.display = "none";
  }
}

function toggleCampFilterSlug(slug) {
  if (_campFilters.includes(slug)) {
    _campFilters = _campFilters.filter((s) => s !== slug);
  } else {
    _campFilters.push(slug);
  }
  const newHash =
    _campFilters.length > 0
      ? "#/camp?hackathon=" + _campFilters.join(",")
      : "#/camp";
  history.replaceState(null, "", newHash);
  _campDropdownOpen = true;
  const app = document.getElementById("app");
  if (app) app.innerHTML = renderCampHTML();
}

function teamCard(t) {
  const hack = HACKATHONS.find((h) => h.slug === t.hackathonSlug);
  return `
<div class="tcard">
  <div class="tc-head">
    <div class="tname">${t.name}</div>
    <span class="opbadge ${t.isOpen ? "op-y" : "op-n"}">${t.isOpen ? "모집중" : "모집완료"}</span>
  </div>
  <div><span class="hchip" onclick="go('/hackathons/${t.hackathonSlug}')">${hack ? hack.title.slice(0, 24) + (hack.title.length > 24 ? "…" : "") : t.hackathonSlug}</span></div>
  <div class="tintro">${t.intro}</div>
  ${t.lookingFor.length ? `<div><div style="font-size:.72rem;color:var(--muted);margin-bottom:.3rem">모집 포지션</div><div class="lfor">${t.lookingFor.map((r) => `<span class="ltag">${r}</span>`).join("")}</div></div>` : ""}
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.15rem">
    <span style="font-size:.76rem;color:var(--muted)">👤 ${t.memberCount}명</span>
    ${t.isOpen ? `<a href="${t.contact.url}" target="_blank" class="cbtn">연락하기</a>` : `<span style="font-size:.76rem;color:var(--gray)">모집 마감</span>`}
  </div>
</div>`;
}

function openTeamModal() {
  document.getElementById("modal-root").innerHTML = `
<div class="overlay" onclick="closeModal(event)">
  <div class="modal">
    <div class="modal-head">
      <div class="modal-title">팀 만들기</div>
      <button class="mclose" onclick="closeModalDirect()">✕</button>
    </div>
    <form onsubmit="createTeam(event)">
      <div class="fg"><label class="fl">팀 이름 *</label><input type="text" class="fi" name="name" required placeholder="팀 이름 입력"></div>
      <div class="fg"><label class="fl">해커톤 *</label>
        <select class="fi" name="hackathonSlug" required>
          <option value="">해커톤 선택</option>
          ${HACKATHONS.map((h) => `<option value="${h.slug}">${h.title}</option>`).join("")}
        </select>
      </div>
      <div class="fg"><label class="fl">팀 소개 *</label><textarea class="fta" name="intro" required placeholder="팀 소개를 입력하세요..."></textarea></div>
      <div class="fg"><label class="fl">모집 포지션 (쉼표로 구분)</label><input type="text" class="fi" name="lookingFor" placeholder="예: Frontend, Designer"></div>
      <div class="fg"><label class="fl">현재 팀원 수</label><input type="number" class="fi" name="memberCount" value="1" min="1" max="5"></div>
      <div class="fg"><label class="fl">연락처 URL *</label><input type="url" class="fi" name="contactUrl" required placeholder="https://open.kakao.com/..."></div>
      <div style="display:flex;gap:.75rem">
        <button type="button" class="btn btn-o" style="flex:1" onclick="closeModalDirect()">취소</button>
        <button type="submit" class="btn btn-p" style="flex:2">팀 생성</button>
      </div>
    </form>
  </div>
</div>`;
}

function closeModal(e) {
  if (e.target.classList.contains("overlay")) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById("modal-root").innerHTML = "";
}

function createTeam(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const lf = fd
    .get("lookingFor")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const team = {
    teamCode: "T-" + Date.now(),
    hackathonSlug: fd.get("hackathonSlug"),
    name: fd.get("name"),
    isOpen: true,
    memberCount: parseInt(fd.get("memberCount")) || 1,
    lookingFor: lf,
    intro: fd.get("intro"),
    contact: { url: fd.get("contactUrl") },
    createdAt: new Date().toISOString(),
  };
  const teams = getTeams();
  teams.unshift(team);
  saveTeams(teams);
  closeModalDirect();
  toast("✅ 팀이 생성되었습니다!");
  go("/camp?hackathon=" + team.hackathonSlug);
}
