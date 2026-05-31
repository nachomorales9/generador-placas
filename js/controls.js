/* =========================================================
   controls.js — formulario dinámico según el tipo de placa
   ========================================================= */

const $ = id => document.getElementById(id);

// Helpers de campos
function tOpts(selVal) { return ALL.map(t => `<option value="${t[0]}" ${t[0] === selVal ? 'selected' : ''}>${t[1]}</option>`).join(''); }
function gOpts(selVal) { return Object.keys(GROUPS).map(g => `<option ${g === selVal ? 'selected' : ''}>${g}</option>`).join(''); }
function field(lbl, html) { return `<div class="field"><label>${lbl}</label>${html}</div>`; }
function inp(id, val, lbl) { return field(lbl, `<input id="${id}" value="${esc(val)}">`); }
function txt(id, val, lbl) { return field(lbl, `<textarea id="${id}">${esc(val)}</textarea>`); }
function sel(id, val, lbl, opts) { return field(lbl, `<select id="${id}">${opts}</select>`); }

// Conecta un control del DOM con una clave de `state`
function bind(id, key) {
  const el = $(id);
  if (!el) return;
  const update = e => { state[key] = e.target.value; draw(); };
  el.oninput = update;
  el.onchange = update;
}

// Mapa de bindings por tipo: [idDelControl, claveDeState]
const BIND_MAP = {
  grupo:  [['c_g','grupo']],
  match:  [['c_h','mhome'],['c_a','maway'],['c_t','mtime'],['c_s','mstad']],
  result: [['c_h','rhome'],['c_a','raway'],['c_sh','rsh'],['c_sa','rsa'],['c_info','rinfo']],
  rank:   [['c_t','rkTitle'],['c_l','rkLines']],
  poll:   [['c_t','pollT'],['c_a','pollA'],['c_b','pollB'],['c_pa','pollPa'],['c_pb','pollPb']],
  quote:  [['c_t','qText'],['c_a','qAuthor']],
  day:    [['c_t','dayT'],['c_l','dayLines']],
  stat:   [['c_t','statT'],['c_l','statLines']],
  big:    [['c_t','bigT'],['c_n','bigN'],['c_l','bigL'],['c_d','bigD']],
  count:  [['c_t','cdT'],['c_d','cdD'],['c_h','cdH'],['c_m','cdM'],['c_txt','cdTxt']],
  vs:     [['c_t','vsT'],['c_a','vsA'],['c_b','vsB'],['c_va','vsVa'],['c_vb','vsVb'],['c_lbl','vsLbl']],
  list:   [['c_t','listT'],['c_l','listLines']],
  record: [['c_t','recT'],['c_v','recVal'],['c_lbl','recLbl'],['c_f','recF'],['c_n','recName'],['c_s','recSub']],
  sedes:  [['c_t','sedT'],['c_l','sedLines'],['c_tot','sedTot']],
  time:   [['c_t','timT'],['c_l','timLines']],
  curio:  [['c_t','curT'],['c_ic','curIc'],['c_y','curYears'],['c_m','curMain']]
};

function renderControls() {
  const type = config.type;
  let h = '';

  if (type === 'grupo') {
    h = sel('c_g', state.grupo, 'Grupo', gOpts(state.grupo));
  } else if (type === 'match') {
    h = `<div class="row2">${sel('c_h', state.mhome, 'Local', tOpts(state.mhome))}${sel('c_a', state.maway, 'Visitante', tOpts(state.maway))}</div><div class="row2">${inp('c_t', state.mtime, 'Hora')}${inp('c_s', state.mstad, 'Estadio')}</div>`;
  } else if (type === 'result') {
    h = `<div class="row2">${sel('c_h', state.rhome, 'Local', tOpts(state.rhome))}${sel('c_a', state.raway, 'Visitante', tOpts(state.raway))}</div><div class="row2">${inp('c_sh', state.rsh, 'Goles local')}${inp('c_sa', state.rsa, 'Goles visitante')}</div>${inp('c_info', state.rinfo, 'Info (estadio · min)')}`;
  } else if (type === 'rank') {
    h = inp('c_t', state.rkTitle, 'Título') + txt('c_l', state.rkLines, '5 líneas (una por equipo)');
  } else if (type === 'poll') {
    h = inp('c_t', state.pollT, 'Pregunta') + `<div class="row2">${sel('c_a', state.pollA, 'Opción A', tOpts(state.pollA))}${sel('c_b', state.pollB, 'Opción B', tOpts(state.pollB))}</div><div class="row2">${inp('c_pa', state.pollPa, '% A')}${inp('c_pb', state.pollPb, '% B')}</div>`;
  } else if (type === 'quote') {
    h = txt('c_t', state.qText, 'Frase') + inp('c_a', state.qAuthor, 'Autor');
  } else if (type === 'day') {
    h = inp('c_t', state.dayT, 'Título') + txt('c_l', state.dayLines, 'Una línea por partido: HORA | iso1 | iso2');
  } else if (type === 'stat') {
    h = inp('c_t', state.statT, 'Título') + txt('c_l', state.statLines, 'Líneas: iso | valor | nombre');
  } else if (type === 'big') {
    h = inp('c_t', state.bigT, 'Título superior') + `<div class="row2">${inp('c_n', state.bigN, 'Número')}${inp('c_l', state.bigL, 'Etiqueta')}</div>` + txt('c_d', state.bigD, 'Descripción');
  } else if (type === 'count') {
    h = inp('c_t', state.cdT, 'Título') + `<div class="row3">${inp('c_d', state.cdD, 'Días')}${inp('c_h', state.cdH, 'Horas')}${inp('c_m', state.cdM, 'Min')}</div>` + inp('c_txt', state.cdTxt, 'Texto inferior');
  } else if (type === 'vs') {
    h = inp('c_t', state.vsT, 'Título') + `<div class="row2">${sel('c_a', state.vsA, 'A', tOpts(state.vsA))}${sel('c_b', state.vsB, 'B', tOpts(state.vsB))}</div><div class="row2">${inp('c_va', state.vsVa, 'Valor A')}${inp('c_vb', state.vsVb, 'Valor B')}</div>` + inp('c_lbl', state.vsLbl, 'Etiqueta');
  } else if (type === 'list') {
    h = inp('c_t', state.listT, 'Título') + txt('c_l', state.listLines, '5 líneas');
  } else if (type === 'record') {
    h = inp('c_t', state.recT, 'Título') + `<div class="row2">${inp('c_v', state.recVal, 'Número')}${inp('c_lbl', state.recLbl, 'Etiqueta')}</div>${sel('c_f', state.recF, 'Selección', tOpts(state.recF))}${inp('c_n', state.recName, 'Nombre destacado')}` + txt('c_s', state.recSub, 'Subtítulo');
  } else if (type === 'sedes') {
    h = inp('c_t', state.sedT, 'Título') + txt('c_l', state.sedLines, 'Líneas: iso | nombre | número') + inp('c_tot', state.sedTot, 'Texto inferior');
  } else if (type === 'time') {
    h = inp('c_t', state.timT, 'Título') + txt('c_l', state.timLines, 'Líneas: año | evento');
  } else if (type === 'curio') {
    h = inp('c_t', state.curT, 'Título') + `<div class="row2">${inp('c_ic', state.curIc, 'Emoji grande')}${inp('c_y', state.curYears, 'Años / pie')}</div>` + txt('c_m', state.curMain, 'Texto principal (usá [palabra] para destacar)');
  }

  $('controls').innerHTML = h;
  (BIND_MAP[config.type] || []).forEach(b => bind(b[0], b[1]));
}
