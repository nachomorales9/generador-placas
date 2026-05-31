/* =========================================================
   data.js — datos estáticos: equipos, tipos, fuentes,
   fondos (degradés), logos y acentos
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

// Tipos de placa. Agrupados por categoría para el selector.
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
  ['feat','Features'],['testi','Testimonio'],
  // — Marketing / Social —
  ['promo','Promo / Oferta'],['event','Evento'],['profile','Perfil'],
  ['pricing','Plan / Precio'],['faq','Pregunta / FAQ'],['agenda','Agenda']
];

// Primer tipo de cada grupo, para dibujar los separadores en el selector.
const TYPE_GROUPS = { cover: 'Genéricas · UI/UX', promo: 'Marketing · Social' };

// Fuentes disponibles (cargadas desde Google Fonts en index.html)
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
  ["'Space Grotesk',sans-serif",'Space Grotesk'],
  ["'Playfair Display',serif",  'Playfair (elegante)'],
  ["'Lobster',cursive",         'Lobster (script)'],
  ["Georgia,serif",             'Georgia (serif)']
];

// Presets de fondo: [nombre, gradiente CSS]
const BACKGROUNDS = [
  // oscuros
  ['Verde',     'linear-gradient(160deg,#0e1f15,#06120b)'],
  ['Esmeralda', 'linear-gradient(160deg,#0a3d2e,#04120d)'],
  ['Noche',     'linear-gradient(160deg,#171a26,#0a0b12)'],
  ['Océano',    'linear-gradient(160deg,#0d2b3e,#05101c)'],
  ['Cielo',     'linear-gradient(160deg,#1e3a5f,#0a1a30)'],
  ['Violeta',   'linear-gradient(160deg,#2a1a4a,#0e0820)'],
  ['Vino',      'linear-gradient(160deg,#2a0f17,#140509)'],
  ['Fuego',     'linear-gradient(160deg,#3a1410,#160505)'],
  ['Cobre',     'linear-gradient(160deg,#3a2416,#160d06)'],
  ['Carbón',    'linear-gradient(160deg,#23272f,#0b0d12)'],
  ['Slate',     'linear-gradient(160deg,#1e293b,#0b1120)'],
  ['Negro',     'linear-gradient(160deg,#1a1a1a,#000000)'],
  // vivos / coloridos
  ['Sunset',    'linear-gradient(160deg,#ff6a3d,#c0392b)'],
  ['Mango',     'linear-gradient(160deg,#f7971e,#ffd200)'],
  ['Aurora',    'linear-gradient(160deg,#7b2ff7,#f107a3)'],
  ['Neón',      'linear-gradient(160deg,#11998e,#38ef7d)'],
  ['Cyber',     'linear-gradient(160deg,#0f0c29,#302b63,#24243e)'],
  ['Rosa',      'linear-gradient(160deg,#ec008c,#fc6767)'],
  ['Índigo',    'linear-gradient(160deg,#4568dc,#b06ab3)'],
  ['Menta',     'linear-gradient(160deg,#2af598,#009efd)'],
  ['Lava',      'linear-gradient(160deg,#f12711,#f5af19)'],
  ['Galaxia',   'linear-gradient(160deg,#41295a,#2f0743)']
];

// Colores de acento sugeridos: [nombre, color]
const ACCENTS = [
  ['Dorado','#ffce2e'],['Ámbar','#ffb300'],['Verde','#19c37d'],['Lima','#9ee37d'],
  ['Esmeralda','#10b981'],['Celeste','#3ad0ff'],['Azul','#4f8cff'],['Índigo','#7c8cff'],
  ['Violeta','#c084fc'],['Magenta','#ff5cc8'],['Rosa','#ff7eb6'],['Rojo','#ff5252'],
  ['Coral','#ff7a59'],['Naranja','#ff8a3d'],['Turquesa','#2dd4bf'],['Blanco','#ffffff']
];

// Logos disponibles. Token: 'default' | 'none' | 'emoji:X' | 'custom'
const LOGOS = [
  ['default','🏆 Trofeo'],['none','Sin logo'],
  ['emoji:⚽','⚽'],['emoji:🏆','🏆'],['emoji:🥇','🥇'],['emoji:⭐','⭐'],
  ['emoji:🔥','🔥'],['emoji:👑','👑'],['emoji:⚡','⚡'],['emoji:🚀','🚀'],
  ['emoji:🎯','🎯'],['emoji:💎','💎'],['emoji:✨','✨'],['emoji:🎨','🎨'],
  ['emoji:📊','📊'],['emoji:🏀','🏀'],['emoji:🎮','🎮'],['emoji:🎧','🎧']
];
