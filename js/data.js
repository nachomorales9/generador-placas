/* =========================================================
   data.js — datos estáticos: equipos, tipos, fuentes, fondos
   ========================================================= */

// Logo (trofeo) extraído a un archivo real
const CUP = 'assets/logo.png';

// Grupos del Mundial 2026 (iso de bandera + nombre)
const GROUPS = {
  A:[['mx','México'],['za','Sudáfrica'],['kr','Corea del Sur'],['cz','Chequia']],
  B:[['ca','Canadá'],['ba','Bosnia'],['qa','Catar'],['ch','Suiza']],
  C:[['br','Brasil'],['ma','Marruecos'],['ht','Haití'],['gb-sct','Escocia']],
  D:[['us','Estados Unidos'],['py','Paraguay'],['au','Australia'],['tr','Turquía']],
  E:[['de','Alemania'],['cw','Curazao'],['ci','Costa de Marfil'],['ec','Ecuador']],
  F:[['nl','Países Bajos'],['jp','Japón'],['se','Suecia'],['tn','Túnez']],
  G:[['be','Bélgica'],['eg','Egipto'],['ir','Irán'],['nz','Nueva Zelanda']],
  H:[['es','España'],['cv','Cabo Verde'],['sa','Arabia Saudí'],['uy','Uruguay']],
  I:[['fr','Francia'],['sn','Senegal'],['iq','Irak'],['no','Noruega']],
  J:[['ar','Argentina'],['dz','Argelia'],['at','Austria'],['jo','Jordania']],
  K:[['pt','Portugal'],['cd','RD Congo'],['uz','Uzbekistán'],['co','Colombia']],
  L:[['gb-eng','Inglaterra'],['hr','Croacia'],['gh','Ghana'],['pa','Panamá']]
};

const ALL = [];
Object.values(GROUPS).forEach(g => g.forEach(t => ALL.push(t)));

const flag = iso => `https://flagcdn.com/w320/${iso}.png`;
const tn = iso => { const t = ALL.find(x => x[0] === iso); return t ? t[1] : iso; };

// Tipos de placa. Agrupados: fútbol (Mundial) + genéricos (UI/UX).
const TYPES = [
  // — Fútbol / Mundial —
  ['grupo','Grupo'],['match','Partido del día'],['result','Resultado'],
  ['rank','Ranking / Top'],['poll','Encuesta'],['quote','Frase / Cita'],
  ['day','Jornada'],['stat','Estadística'],
  ['big','Número gigante'],['count','Cuenta regresiva'],['vs','Comparación VS'],
  ['list','Lista de datos'],['record','Récord histórico'],['sedes','Sedes / Países'],
  ['time','Timeline'],['curio','Curiosidad'],
  // — Genéricos (UI/UX, anuncios, métricas) —
  ['cover','Portada / Título'],['kpi','Métrica / KPI'],['steps','Pasos / Guía'],
  ['feat','Features'],['testi','Testimonio']
];

// Fuentes disponibles. value = font-family CSS, label = nombre visible.
// Todas se cargan desde Google Fonts en index.html.
const FONTS = [
  ["'Baloo 2',sans-serif",      'Baloo 2 (redonda)'],
  ["'Bebas Neue',sans-serif",   'Bebas Neue (alta)'],
  ["'Anton',sans-serif",        'Anton (impacto)'],
  ["'Archivo Black',sans-serif",'Archivo Black'],
  ["'Oswald',sans-serif",       'Oswald (condensada)'],
  ["'Teko',sans-serif",         'Teko (deportiva)'],
  ["'Russo One',sans-serif",    'Russo One'],
  ["'Righteous',cursive",       'Righteous'],
  ["'Montserrat',sans-serif",   'Montserrat'],
  ["'Poppins',sans-serif",      'Poppins'],
  ["'Nunito',sans-serif",       'Nunito (suave)'],
  ["'Inter',sans-serif",        'Inter'],
  ["'Roboto Condensed',sans-serif",'Roboto Condensed'],
  ["'Rubik',sans-serif",        'Rubik'],
  ["Georgia,serif",             'Georgia (serif)']
];

// Presets de fondo: [nombre, color1 (top), color2 (base), glow rgba]
const BACKGROUNDS = [
  ['Verde',   '#0e1f15', '#06120b', 'rgba(47,150,71,.4)'],
  ['Noche',   '#171a26', '#0a0b12', 'rgba(116,140,223,.35)'],
  ['Vino',    '#2a0f17', '#140509', 'rgba(224,50,42,.35)'],
  ['Azul',    '#0d2236', '#05101c', 'rgba(58,140,255,.4)'],
  ['Violeta', '#241638', '#0e0820', 'rgba(192,132,252,.4)'],
  ['Carbón',  '#1c1f26', '#0b0d12', 'rgba(255,255,255,.18)'],
  ['Arena',   '#33291a', '#15100a', 'rgba(255,206,46,.32)'],
  ['Esmeralda','#0a2c2a','#04100f', 'rgba(25,195,125,.4)']
];

// Colores de acento sugeridos: [nombre, acento, texto]
const ACCENTS = [
  ['Dorado',  '#ffce2e', '#ffffff'],
  ['Verde',   '#19c37d', '#ffffff'],
  ['Celeste', '#3ad0ff', '#ffffff'],
  ['Rojo',    '#ff5252', '#ffffff'],
  ['Naranja', '#ff8a3d', '#ffffff'],
  ['Lila',    '#c084fc', '#ffffff'],
  ['Blanco',  '#ffffff', '#ffffff']
];
