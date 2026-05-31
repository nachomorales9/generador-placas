/* =========================================================
   render.js — genera el HTML interno de la placa por tipo
   ========================================================= */

// Escapa texto del usuario para no romper la vista previa
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// Escapa y convierte saltos de línea en <br>
const escBr = s => esc(s).replace(/\n/g, '<br>');

const img = (iso, attrs = '') => `<img src="${flag(iso)}" crossorigin="anonymous" ${attrs}>`;

function head(k, g) {
  const logo = config.showLogo
    ? `<img class="logo" src="${config.customLogo || CUP}" crossorigin="anonymous">`
    : '';
  return `<div class="head">${logo}<div class="txt"><div class="k">${esc(k)}</div><div class="g">${esc(g)}</div></div></div>`;
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

  return body;
}
