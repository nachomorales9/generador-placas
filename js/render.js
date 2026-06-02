/* =========================================================
   render.js — genera el HTML interno de la placa por tipo
   ========================================================= */

// Escapa texto del usuario para no romper la vista previa
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// Escapa y convierte saltos de línea en <br>
const escBr = s => esc(s).replace(/\n/g, '<br>');

const img = (iso, attrs = '') => `<img src="${flag(iso)}" crossorigin="anonymous" ${attrs}>`;

// Devuelve el HTML del logo según config.logo (default | none | emoji:X | custom)
function logoMarkup() {
  const L = config.logo;
  if (L === 'none') return '';
  if (L === 'custom' && config.customLogo) return `<img class="logo" src="${config.customLogo}" crossorigin="anonymous">`;
  if (typeof L === 'string' && L.startsWith('emoji:')) return `<div class="logo logo-emoji">${esc(L.slice(6))}</div>`;
  return `<img class="logo" src="${CUP}" crossorigin="anonymous">`; // default
}

function head(k, g) {
  return `<div class="head">${logoMarkup()}<div class="txt"><div class="k">${esc(k)}</div><div class="g">${esc(g)}</div></div></div>`;
}

function foot() {
  return `<div class="foot">${esc(config.brand)}</div>`;
}

function render() {
  const type = config.type;
  let body = '';

  if (type === 'grupo') {
    const g = GROUPS[state.grupo];
    body = `${head('Mundial 2026', 'Grupo ' + state.grupo)}<div class="grid">${g.map(t => `<div class="cell">${img(t[0])}<span class="nm">${esc(t[1])}</span></div>`).join('')}</div>${foot()}`;
  }
  else if (type === 'tabla') {
    const qcut = Math.max(0, parseInt(state.tablaQ, 10) || 0);
    const rows = state.tablaLines.split('\n').map(x => x.trim()).filter(Boolean).map(l => {
      const p = l.split('|').map(s => s.trim());
      const iso = (p[0] || 'ar').toLowerCase();
      const num = i => parseInt(p[i], 10) || 0;
      const pj = num(1), pg = num(2), pe = num(3), pp = num(4), gf = num(5), gc = num(6);
      return { iso, name: tn(iso), pj, pg, pe, pp, gf, gc, dif: gf - gc, pts: pg * 3 + pe };
    });
    // Ordena por PTS, luego diferencia de gol, luego goles a favor
    rows.sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
    const dif = d => (d > 0 ? '+' : '') + d;
    const headRow = `<div class="trow thead"><span class="pos">#</span><span class="team">Equipo</span>` +
      ['PJ', 'G', 'E', 'P', 'GF', 'GC', 'DG', 'Pts'].map(c => `<span class="num">${c}</span>`).join('') + `</div>`;
    const bodyRows = rows.map((r, i) =>
      `<div class="trow${i < qcut ? ' q' : ''}"><span class="pos">${i + 1}</span>` +
      `<span class="team">${img(r.iso)}<span class="tnm">${esc(r.name)}</span></span>` +
      `<span class="num">${r.pj}</span><span class="num">${r.pg}</span><span class="num">${r.pe}</span><span class="num">${r.pp}</span>` +
      `<span class="num">${r.gf}</span><span class="num">${r.gc}</span><span class="num">${dif(r.dif)}</span><span class="num pts">${r.pts}</span></div>`
    ).join('');
    body = `${head('Mundial 2026', state.tablaT)}<div class="tbl">${headRow}${bodyRows}</div>${foot()}`;
  }
  else if (type === 'prematch') {
    body = `${head('Previa', state.pmPhase)}<div class="pmwrap">` +
      `<div class="pmvs"><div class="pmside">${img(state.pmHome)}<span class="nm">${esc(tn(state.pmHome))}</span></div>` +
      `<div class="pmx">VS</div>` +
      `<div class="pmside">${img(state.pmAway)}<span class="nm">${esc(tn(state.pmAway))}</span></div></div>` +
      `<div class="pminfo"><span>📅 ${esc(state.pmDate)}</span><span>🕘 ${esc(state.pmTime)}</span><span>🏟️ ${esc(state.pmStad)}</span></div>` +
      (state.pmCta.trim() ? `<div class="pmcta">¿QUIÉN GANA? 👉 ${esc(state.pmCta)}</div>` : '') +
      `</div>${foot()}`;
  }
  else if (type === 'match') {
    body = `${head('Partido del día', 'Mundial 2026')}<div class="vsw"><div class="side">${img(state.mhome)}<span class="nm">${esc(tn(state.mhome))}</span></div><div class="vs">VS</div><div class="side">${img(state.maway)}<span class="nm">${esc(tn(state.maway))}</span></div></div><div class="info">🕘 ${esc(state.mtime)} · 🏟️ ${esc(state.mstad)}</div>${foot()}`;
  }
  else if (type === 'result') {
    body = `${head('Resultado', 'FINAL')}<div class="rrow"><div class="rside">${img(state.rhome)}<span class="nm">${esc(tn(state.rhome))}</span></div><div class="rscore">${esc(state.rsh)} - ${esc(state.rsa)}</div><div class="rside">${img(state.raway)}<span class="nm">${esc(tn(state.raway))}</span></div></div><div class="rinfo">🏟️ ${esc(state.rinfo)}</div>${foot()}`;
  }
  else if (type === 'rank') {
    const lines = state.rkLines.split('\n').filter(x => x.trim());
    body = `${head('Mundial 2026', state.rkTitle)}<div class="rk-list">${lines.map((l, i) => {
      const t = ALL.find(x => x[1].toLowerCase() === l.trim().toLowerCase());
      const iso = t ? t[0] : 'ar';
      return `<div class="rk"><span class="n">${i + 1}</span>${img(iso)}<span class="nm">${esc(l.trim())}</span></div>`;
    }).join('')}</div>${foot()}`;
  }
  else if (type === 'poll') {
    body = `${head('El debate del día', state.pollT)}<div class="poll"><div class="pside">${img(state.pollA)}<span>${esc(tn(state.pollA))}</span><div class="pbar"><i style="width:${esc(state.pollPa)}%;background:#74acdf"></i></div><b>${esc(state.pollPa)}%</b></div><div class="pside">${img(state.pollB)}<span>${esc(tn(state.pollB))}</span><div class="pbar"><i style="width:${esc(state.pollPb)}%;background:#e0322a"></i></div><b>${esc(state.pollPb)}%</b></div></div><div class="vote">👇 Comentá tu voto</div>${foot()}`;
  }
  else if (type === 'quote') {
    body = `${head('La frase', 'del Mundial')}<div class="quote"><div class="qmark">"</div><div class="qtext">${escBr(state.qText)}</div><div class="qauthor">— ${esc(state.qAuthor)}</div></div>${foot()}`;
  }
  else if (type === 'day') {
    const lines = state.dayLines.split('\n').filter(x => x.trim());
    body = `${head('Jornada', state.dayT)}<div class="day-list">${lines.map(l => {
      const p = l.split('|').map(x => x.trim());
      return `<div class="dmatch"><span class="t">${esc(p[0] || '')}</span>${img(p[1] || 'ar')}<span class="nm">${esc(tn(p[1] || 'ar'))}</span><span class="vs">vs</span>${img(p[2] || 'br')}<span class="nm">${esc(tn(p[2] || 'br'))}</span></div>`;
    }).join('')}</div>${foot()}`;
  }
  else if (type === 'stat') {
    const lines = state.statLines.split('\n').filter(x => x.trim());
    body = `${head('Ranking', state.statT)}<div class="stat-grid">${lines.map(l => {
      const p = l.split('|').map(x => x.trim());
      return `<div class="statcell">${img(p[0] || 'ar')}<div class="statval">${esc(p[1] || '')}</div><div class="statlbl">${esc(p[2] || '')}</div></div>`;
    }).join('')}</div>${foot()}`;
  }
  else if (type === 'big') {
    body = `${head('Mundial 2026', state.bigT)}<div class="bigcard"><div class="big">${esc(state.bigN)}</div><div class="lbl">${esc(state.bigL)}</div><div class="desc">${escBr(state.bigD)}</div></div>${foot()}`;
  }
  else if (type === 'count') {
    body = `${head('Para el Mundial', state.cdT)}<div class="countdown"><div class="cu"><div class="n">${esc(state.cdD)}</div><div class="l">Días</div></div><div class="cu"><div class="n">${esc(state.cdH)}</div><div class="l">Horas</div></div><div class="cu"><div class="n">${esc(state.cdM)}</div><div class="l">Min</div></div></div><div class="ctxt">⚽ ${esc(state.cdTxt)}</div>${foot()}`;
  }
  else if (type === 'vs') {
    body = `${head('Comparativa', state.vsT)}<div class="cmp"><div class="cmside">${img(state.vsA)}<div class="cval">${esc(state.vsVa)}</div><div class="clbl">${esc(state.vsLbl)}</div></div><div class="cmvs">VS</div><div class="cmside">${img(state.vsB)}<div class="cval">${esc(state.vsVb)}</div><div class="clbl">${esc(state.vsLbl)}</div></div></div>${foot()}`;
  }
  else if (type === 'list') {
    const lines = state.listLines.split('\n').filter(x => x.trim());
    body = `${head('Mundial 2026', state.listT)}<div class="dlist">${lines.slice(0, 5).map((l, i) => `<div class="di"><span class="dn">${['①','②','③','④','⑤'][i]}</span>${esc(l.trim())}</div>`).join('')}</div>${foot()}`;
  }
  else if (type === 'record') {
    body = `${head('Mundial', state.recT)}<div class="recordcard"><div class="rtrophy">🏆</div><div class="rval">${esc(state.recVal)}</div><div class="rlbl">${esc(state.recLbl)}</div><img class="rflag" src="${flag(state.recF)}" crossorigin="anonymous"><div class="rname">${esc(state.recName)}</div><div class="rsub">${escBr(state.recSub)}</div></div>${foot()}`;
  }
  else if (type === 'sedes') {
    const lines = state.sedLines.split('\n').filter(x => x.trim());
    body = `${head('Mundial 2026', state.sedT)}<div class="sedes">${lines.map(l => {
      const p = l.split('|').map(x => x.trim());
      return `<div class="sede">${img(p[0] || 'us')}<div class="sname">${esc(p[1] || '')}</div><div class="snum">${esc(p[2] || '')}</div><div class="sl">estadios</div></div>`;
    }).join('')}</div><div class="infobox">${esc(state.sedTot)}</div>${foot()}`;
  }
  else if (type === 'time') {
    const lines = state.timLines.split('\n').filter(x => x.trim());
    body = `${head('Historia', state.timT)}<div class="tline">${lines.map(l => {
      const p = l.split('|').map(x => x.trim());
      return `<div class="tev"><div class="ty">${esc(p[0] || '')}</div><div class="tt">${esc(p[1] || '')}</div></div>`;
    }).join('')}</div>${foot()}`;
  }
  else if (type === 'curio') {
    const main = escBr(state.curMain).replace(/\[([^\]]+)\]/g, '<span class="hl">$1</span>');
    body = `${head('¿Sabías que...?', state.curT)}<div class="curio"><div class="cic">${esc(state.curIc)}</div><div class="ctxt2">${main}</div><div class="cyears">${esc(state.curYears)}</div></div>${foot()}`;
  }
  // ---- Plantillas genéricas (UI/UX) ----
  else if (type === 'cover') {
    const lm = logoMarkup();
    const logo = lm ? `<div class="head" style="justify-content:center">${lm}</div>` : '';
    body = `${logo}<div class="cover"><div class="ck">${esc(state.covK)}</div><div class="ctitle">${escBr(state.covT)}</div><div class="csub">${escBr(state.covSub)}</div>${state.covTag.trim() ? `<div class="ctag">${esc(state.covTag)}</div>` : ''}</div>${foot()}`;
  }
  else if (type === 'kpi') {
    const dir = state.kpiDir === 'down' ? 'down' : 'up';
    const arrow = dir === 'down' ? '▼' : '▲';
    body = `${head(state.kpiK, state.kpiT)}<div class="kpicard"><div class="kpival">${esc(state.kpiVal)}</div>${state.kpiDelta.trim() ? `<div class="kpidelta ${dir}">${arrow} ${esc(state.kpiDelta)}</div>` : ''}<div class="kpilbl">${esc(state.kpiLbl)}</div>${state.kpiDesc.trim() ? `<div class="kpidesc">${escBr(state.kpiDesc)}</div>` : ''}</div>${foot()}`;
  }
  else if (type === 'steps') {
    const lines = state.stepLines.split('\n').filter(x => x.trim());
    body = `${head(state.stepK, state.stepT)}<div class="steplist">${lines.map((l, i) => `<div class="step"><span class="sn">${i + 1}</span><span class="st">${esc(l.trim())}</span></div>`).join('')}</div>${foot()}`;
  }
  else if (type === 'feat') {
    const lines = state.featLines.split('\n').filter(x => x.trim());
    body = `${head(state.featK, state.featT)}<div class="featlist">${lines.map(l => `<div class="feat"><span class="fc">✓</span>${esc(l.trim())}</div>`).join('')}</div>${foot()}`;
  }
  else if (type === 'testi') {
    body = `${head(state.testiK, state.testiT)}<div class="testi"><div class="tqm">"</div><div class="tq">${escBr(state.testiText)}</div><div class="tnm">${esc(state.testiName)}</div><div class="tr">${esc(state.testiRole)}</div></div>${foot()}`;
  }
  // ---- Marketing / Social ----
  else if (type === 'promo') {
    body = `${head('OFERTA', state.promoT)}<div class="promo"><div class="pbadge">${esc(state.promoBadge)}</div><div class="pprices">${state.promoOld.trim() ? `<span class="pold">${esc(state.promoOld)}</span>` : ''}<span class="pnew">${esc(state.promoNew)}</span></div>${state.promoCta.trim() ? `<div class="pcta">${esc(state.promoCta)}</div>` : ''}</div>${foot()}`;
  }
  else if (type === 'event') {
    body = `${head('EVENTO', state.evtT)}<div class="evt"><div class="edate"><div class="eday">${esc(state.evtDay)}</div><div class="emonth">${esc(state.evtMonth)}</div></div><div class="ewhere">${escBr(state.evtWhere)}</div>${state.evtCta.trim() ? `<div class="ecta">${esc(state.evtCta)}</div>` : ''}</div>${foot()}`;
  }
  else if (type === 'profile') {
    const av = (config.logo !== 'default' && config.logo !== 'none') ? logoMarkup().replace('class="logo','class="pavatar-logo') : '';
    const avatar = av || `<div class="pavatar">${esc((state.profInit || state.profName[0] || '?'))}</div>`;
    body = `${avatar}<div class="prof"><div class="pname">${esc(state.profName)}</div><div class="prole">${esc(state.profRole)}</div>${state.profHandle.trim() ? `<div class="phandle">${esc(state.profHandle)}</div>` : ''}<div class="pbio">${escBr(state.profBio)}</div></div>${foot()}`;
  }
  else if (type === 'pricing') {
    const lines = state.priceLines.split('\n').filter(x => x.trim());
    body = `${head('PLAN', state.pricePlan)}<div class="pricecard"><div class="priceval">${esc(state.priceVal)}<span class="priceper">${esc(state.pricePer)}</span></div><div class="pricelist">${lines.map(l => `<div class="pli"><span class="pc">✓</span>${esc(l.trim())}</div>`).join('')}</div>${state.priceCta.trim() ? `<div class="pcta">${esc(state.priceCta)}</div>` : ''}</div>${foot()}`;
  }
  else if (type === 'faq') {
    body = `${head('PREGUNTAS', 'FAQ')}<div class="faq"><div class="fqmark">?</div><div class="fq">${escBr(state.faqQ)}</div><div class="fa">${escBr(state.faqA)}</div></div>${foot()}`;
  }
  else if (type === 'agenda') {
    const lines = state.agLines.split('\n').filter(x => x.trim());
    body = `${head('AGENDA', state.agT)}<div class="aglist">${lines.map(l => {
      const p = l.split('|').map(x => x.trim());
      return `<div class="agrow"><span class="agt">${esc(p[0] || '')}</span><span class="aga">${esc(p[1] || '')}</span></div>`;
    }).join('')}</div>${foot()}`;
  }

  return body;
}
