/* =========================================================
   app.js — arranque, controles globales, dibujo y descarga
   ========================================================= */

const holder = $('placaHolder');
const sizeInfo = $('sizeInfo');
const SIZE_LABELS = { square: '1080 × 1080 px', story: '1080 × 1920 px', land: '1600 × 900 px' };

/* ---------- Dibujar la placa ---------- */
function draw() {
  const bg = BACKGROUNDS[config.bg] || BACKGROUNDS[0];
  const styleVars = [
    `--placa-acc:${config.accColor}`,
    `--placa-text:${config.textColor}`,
    `--placa-bg1:${bg[1]}`,
    `--placa-bg2:${bg[2]}`,
    `--placa-glow:${bg[3]}`,
    `--font-disp:${config.fontDisp}`,
    `--font-body:${config.fontBody}`
  ].join(';');
  holder.innerHTML =
    `<div class="placa ${config.size} t-${config.type}" id="placa" style="${styleVars}">` +
    `<div class="bgdark"></div><div class="inner">${render()}</div></div>`;
}

/* ---------- Selector de tipo ---------- */
$('types').innerHTML = TYPES.map(t => `<div class="type ${t[0] === config.type ? 'sel' : ''}" data-t="${t[0]}">${t[1]}</div>`).join('');
$('types').onclick = e => {
  const x = e.target.closest('.type');
  if (!x) return;
  document.querySelectorAll('.type').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.type = x.dataset.t;
  renderControls();
  draw();
};

/* ---------- Selector de tamaño ---------- */
$('sizes').onclick = e => {
  const x = e.target.closest('.size');
  if (!x) return;
  document.querySelectorAll('.size').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.size = x.dataset.s;
  sizeInfo.textContent = SIZE_LABELS[config.size];
  draw();
};

/* ---------- Colores de acento ---------- */
$('colors').innerHTML = ACCENTS.map((a, i) =>
  `<div class="color ${i === 0 ? 'sel' : ''}" data-c="${a[1]}" data-t="${a[2]}" style="background:${a[1]}" title="${a[0]}"></div>`
).join('') + `<div class="color custom" id="cpick" title="Personalizado">⚙</div>`;

$('colors').onclick = e => {
  const x = e.target.closest('.color');
  if (!x || x.id === 'cpick') return;
  document.querySelectorAll('.color').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.accColor = x.dataset.c;
  draw();
};
$('cpick').onclick = () => $('custompick').click();
$('custompick').oninput = e => {
  config.accColor = e.target.value;
  document.querySelectorAll('.color').forEach(z => z.classList.remove('sel'));
  draw();
};

/* ---------- Color del texto ---------- */
$('textColor').oninput = e => { config.textColor = e.target.value; draw(); };

/* ---------- Presets de fondo ---------- */
$('bgs').innerHTML = BACKGROUNDS.map((b, i) =>
  `<div class="bg ${i === config.bg ? 'sel' : ''}" data-bg="${i}" style="background:linear-gradient(160deg,${b[1]},${b[2]})"><span class="bglbl">${b[0]}</span></div>`
).join('');
$('bgs').onclick = e => {
  const x = e.target.closest('.bg');
  if (!x) return;
  document.querySelectorAll('.bg').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.bg = +x.dataset.bg;
  draw();
};

/* ---------- Selectores de fuente ---------- */
function fontOptions(selVal) {
  return FONTS.map(f => `<option value="${f[0]}" ${f[0] === selVal ? 'selected' : ''}>${f[1]}</option>`).join('');
}
$('fontDisp').innerHTML = fontOptions(config.fontDisp);
$('fontBody').innerHTML = fontOptions(config.fontBody);
$('fontDisp').onchange = e => { config.fontDisp = e.target.value; draw(); };
$('fontBody').onchange = e => { config.fontBody = e.target.value; draw(); };

/* ---------- Marca / pie ---------- */
$('brand').value = config.brand;
$('brand').oninput = e => { config.brand = e.target.value; draw(); };

/* ---------- Logo ---------- */
$('showLogo').checked = config.showLogo;
$('showLogo').onchange = e => { config.showLogo = e.target.checked; draw(); };
$('logoUpload').onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { config.customLogo = ev.target.result; config.showLogo = true; $('showLogo').checked = true; draw(); };
  reader.readAsDataURL(file);
};
$('logoReset').onclick = () => { config.customLogo = ''; $('logoUpload').value = ''; draw(); };

/* ---------- Descargar imagen ---------- */
$('dl').onclick = async () => {
  const el = $('placa');
  const btn = $('dl');
  const prev = btn.textContent;
  btn.textContent = 'Generando…';
  btn.disabled = true;
  try {
    const targetW = { square: 1080, story: 1080, land: 1600 }[config.size];
    const scale = targetW / el.offsetWidth;
    const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: null });
    const a = document.createElement('a');
    a.download = `fulbazo-${config.type}-${config.size}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  } catch (err) {
    console.error(err);
    alert('No se pudo generar la imagen. Si estás abriendo el archivo localmente, las banderas pueden bloquear la descarga: subilo a Vercel o serví la carpeta con un servidor local.');
  } finally {
    btn.textContent = prev;
    btn.disabled = false;
  }
};

/* ---------- Arranque ---------- */
sizeInfo.textContent = SIZE_LABELS[config.size];
renderControls();
draw();
