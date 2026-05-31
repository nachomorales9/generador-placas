/* =========================================================
   app.js — arranque, controles globales, dibujo y descarga
   ========================================================= */

const holder = $('placaHolder');
const sizeInfo = $('sizeInfo');
const SIZE_LABELS = { square: '1080 × 1080 px', story: '1080 × 1920 px', land: '1600 × 900 px' };

/* ---------- Utilidades ---------- */
function hexToRgba(hex, a) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
function bgGradient() {
  if (config.bg === 'custom') return `linear-gradient(${config.bgAngle}deg,${config.bgC1},${config.bgC2})`;
  return (BACKGROUNDS[config.bg] || BACKGROUNDS[0])[1];
}

/* ---------- Dibujar la placa ---------- */
function draw() {
  const styleVars = [
    `--placa-acc:${config.accColor}`,
    `--placa-text:${config.textColor}`,
    `--placa-bg:${bgGradient()}`,
    `--placa-glow:${config.glow ? hexToRgba(config.accColor, 0.38) : 'transparent'}`,
    `--placa-radius:${config.radius}px`,
    `--font-disp:${config.fontDisp}`,
    `--font-body:${config.fontBody}`
  ].join(';');
  holder.innerHTML =
    `<div class="placa ${config.size} t-${config.type}" id="placa" style="${styleVars}">` +
    `<div class="bgdark"></div><div class="inner"><div class="fit" id="fit">${render()}</div></div></div>`;
  fitContent();
  previewFit();
  $('placa').querySelectorAll('img').forEach(im => {
    if (!im.complete) im.addEventListener('load', () => { fitContent(); previewFit(); }, { once: true });
  });
}

/* ---------- Auto-ajuste: el contenido SIEMPRE entra en la placa ---------- */
function fitContent() {
  const fit = document.getElementById('fit');
  if (!fit) return;
  fit.style.transform = 'none';
  const scale = Math.min(1, fit.clientHeight / fit.scrollHeight, fit.clientWidth / fit.scrollWidth);
  fit.style.transform = scale < 0.999 ? `scale(${scale})` : 'none';
}

/* ---------- Escala el preview para llenar el escenario (responsive) ---------- */
function previewFit() {
  const wrap = document.getElementById('placaScale');
  const placa = document.getElementById('placa');
  const canvas = document.querySelector('.stage-canvas');
  if (!wrap || !placa || !canvas) return;
  wrap.style.transform = 'scale(1)';
  const availW = canvas.clientWidth - 32, availH = canvas.clientHeight - 32;
  const s = Math.min(availW / placa.offsetWidth, availH / placa.offsetHeight, 1.7);
  wrap.style.transform = `scale(${Math.max(0.25, s)})`;
}
window.addEventListener('resize', previewFit);

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

/* ---------- Selector de plantilla (con separadores de grupo) ---------- */
$('types').innerHTML = TYPES.map(t => {
  const divider = TYPE_GROUPS[t[0]] ? `<div class="type-group">${TYPE_GROUPS[t[0]]}</div>` : '';
  return divider + `<div class="type ${t[0] === config.type ? 'sel' : ''}" data-t="${t[0]}">${t[1]}</div>`;
}).join('');
$('types').onclick = e => {
  const x = e.target.closest('.type');
  if (!x) return;
  document.querySelectorAll('.type').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.type = x.dataset.t;
  renderControls();
  draw();
};

/* ---------- Tipografías ---------- */
function fontOptions(selVal) {
  return FONTS.map(f => `<option value="${f[0]}" ${f[0] === selVal ? 'selected' : ''}>${f[1]}</option>`).join('');
}
$('fontDisp').innerHTML = fontOptions(config.fontDisp);
$('fontBody').innerHTML = fontOptions(config.fontBody);
$('fontDisp').onchange = e => { config.fontDisp = e.target.value; draw(); };
$('fontBody').onchange = e => { config.fontBody = e.target.value; draw(); };

/* ---------- Colores de acento ---------- */
function paintAccentSel() {
  document.querySelectorAll('#colors .color').forEach(z => {
    z.classList.toggle('sel', z.dataset.c && z.dataset.c.toLowerCase() === config.accColor.toLowerCase());
  });
}
$('colors').innerHTML = ACCENTS.map(a =>
  `<div class="color" data-c="${a[1]}" style="background:${a[1]}" title="${a[0]}"></div>`
).join('') + `<div class="color custom" id="cpick" title="Personalizado">⚙</div>`;
paintAccentSel();
$('colors').onclick = e => {
  const x = e.target.closest('.color');
  if (!x || x.id === 'cpick') return;
  config.accColor = x.dataset.c;
  paintAccentSel();
  draw();
};
$('cpick').onclick = () => $('custompick').click();
$('custompick').oninput = e => { config.accColor = e.target.value; paintAccentSel(); draw(); };

/* ---------- Color del texto ---------- */
$('textColor').value = config.textColor;
$('textColor').oninput = e => { config.textColor = e.target.value; draw(); };

/* ---------- Fondos (presets + degradé personalizado) ---------- */
$('bgs').innerHTML = BACKGROUNDS.map((b, i) =>
  `<div class="bg ${i === config.bg ? 'sel' : ''}" data-bg="${i}" style="background:${b[1]}"><span class="bglbl">${b[0]}</span></div>`
).join('') + `<div class="bg ${config.bg === 'custom' ? 'sel' : ''}" data-bg="custom" style="background:linear-gradient(135deg,#ff0080,#00d4ff,#ffd400)"><span class="bglbl">Custom</span></div>`;
$('bgs').onclick = e => {
  const x = e.target.closest('.bg');
  if (!x) return;
  document.querySelectorAll('.bg').forEach(z => z.classList.remove('sel'));
  x.classList.add('sel');
  config.bg = x.dataset.bg === 'custom' ? 'custom' : +x.dataset.bg;
  $('bgCustom').hidden = config.bg !== 'custom';
  draw();
};
$('bgC1').value = config.bgC1;
$('bgC2').value = config.bgC2;
$('bgAngle').value = config.bgAngle;
$('bgC1').oninput = e => { config.bgC1 = e.target.value; draw(); };
$('bgC2').oninput = e => { config.bgC2 = e.target.value; draw(); };
$('bgAngle').oninput = e => { config.bgAngle = +e.target.value; $('bgAngleVal').textContent = config.bgAngle + '°'; draw(); };

/* ---------- Brillo (glow) ---------- */
$('glow').checked = config.glow;
$('glow').onchange = e => { config.glow = e.target.checked; draw(); };

/* ---------- Redondeo ---------- */
$('radius').value = config.radius;
$('radius').oninput = e => { config.radius = +e.target.value; $('radiusVal').textContent = config.radius + 'px'; draw(); };

/* ---------- Logos ---------- */
function logoLabel(l) {
  if (l[0] === 'default') return `<img src="${CUP}">`;
  if (l[0] === 'none') return `<span class="x">✕</span>`;
  return l[1];
}
function paintLogoSel() {
  document.querySelectorAll('#logos .logoitem').forEach(z => z.classList.toggle('sel', z.dataset.l === config.logo));
}
$('logos').innerHTML = LOGOS.map(l =>
  `<div class="logoitem ${l[0] === 'none' ? 'text' : ''} ${l[0] === config.logo ? 'sel' : ''}" data-l="${l[0]}" title="${l[1]}">${logoLabel(l)}</div>`
).join('');
$('logos').onclick = e => {
  const x = e.target.closest('.logoitem');
  if (!x) return;
  config.logo = x.dataset.l;
  paintLogoSel();
  draw();
};
$('logoUpload').onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { config.customLogo = ev.target.result; config.logo = 'custom'; paintLogoSel(); draw(); };
  reader.readAsDataURL(file);
};
$('logoReset').onclick = () => {
  config.customLogo = '';
  $('logoUpload').value = '';
  if (config.logo === 'custom') { config.logo = 'default'; paintLogoSel(); }
  draw();
};

/* ---------- Marca / pie ---------- */
$('brand').value = config.brand;
$('brand').oninput = e => { config.brand = e.target.value; draw(); };

/* ---------- Descargar imagen ---------- */
$('dl').onclick = async () => {
  const el = $('placa');
  const btn = $('dl');
  const prev = btn.textContent;
  btn.textContent = 'Generando…';
  btn.disabled = true;
  // Neutralizar el zoom del preview para que html2canvas mida el tamaño real
  const wrap = document.getElementById('placaScale');
  const prevTransform = wrap.style.transform;
  wrap.style.transform = 'scale(1)';
  try {
    const targetW = { square: 1080, story: 1080, land: 1600 }[config.size];
    const scale = targetW / el.offsetWidth;
    const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: null });
    const a = document.createElement('a');
    a.download = `placa-${config.type}-${config.size}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  } catch (err) {
    console.error(err);
    alert('No se pudo generar la imagen. Si abrís el archivo localmente, las banderas pueden bloquear la descarga: subilo a Vercel o serví la carpeta con un servidor local.');
  } finally {
    wrap.style.transform = prevTransform;
    btn.textContent = prev;
    btn.disabled = false;
  }
};

/* ---------- Arranque ---------- */
sizeInfo.textContent = SIZE_LABELS[config.size];
renderControls();
draw();
