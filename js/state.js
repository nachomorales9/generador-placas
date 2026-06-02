/* =========================================================
   state.js — estado global, configuración y valores por defecto
   ========================================================= */

// Configuración global (aplica a todas las placas)
const config = {
  type: 'match',
  size: 'square',
  accColor: '#ffcb3d',                // dorado copa (base Fulbazo)
  textColor: '#f1f7f2',              // blanco hueso
  fontDisp: "'Oswald',sans-serif",    // títulos / números — condensada deportiva
  fontBody: "'Inter',sans-serif",     // texto — sans limpia tipo SF
  // fondo
  bg: 0,                              // índice en BACKGROUNDS (0 = degradé Marca), o 'custom'
  bgC1: '#0c5a2c', bgC2: '#04110b', bgAngle: 160,  // degradé personalizado (arranca en verde marca)
  glow: true,                        // brillo de acento detrás
  // estilo
  radius: 18,                        // redondeo de esquinas (px)
  // marca y logo
  logo: 'default',                   // token de LOGOS
  customLogo: '',                    // dataURL si el usuario sube un logo
  brand: '@fulbazo_ · Todo el Mundial en un lugar'
};

// Datos por tipo de placa
const state = {
  grupo:'J',
  // Tabla de posiciones — DIF y PTS se calculan solos; se ordena de mayor a menor.
  // Formato por línea: iso | PJ | PG | PE | PP | GF | GC
  tablaT:'Grupo J', tablaQ:2,
  tablaLines:'ar | 3 | 2 | 1 | 0 | 6 | 2\ndz | 3 | 2 | 0 | 1 | 4 | 3\nat | 3 | 1 | 0 | 2 | 3 | 4\njo | 3 | 0 | 1 | 2 | 1 | 5',
  // Previa / día de partido
  pmPhase:'Grupo C', pmHome:'ar', pmAway:'br', pmDate:'12 JUN', pmTime:'21:00', pmStad:'MetLife', pmCta:'Votá en la web',
  mhome:'ar',maway:'br',mtime:'21:00',mstad:'MetLife',
  rhome:'ar',raway:'fr',rsh:3,rsa:1,rinfo:"MetLife · 90+3'",
  rkTitle:'Top 5 candidatos',rkLines:'Argentina\nFrancia\nBrasil\nEspaña\nAlemania',
  pollT:'¿Quién gana?',pollA:'ar',pollB:'br',pollPa:62,pollPb:38,
  qText:'El fútbol es el juego\nmás bonito del mundo.',qAuthor:'PELÉ',
  dayT:'Hoy juegan',dayLines:'15:00 | mx | us\n18:00 | ar | br\n21:00 | fr | es',
  statT:'Goleadores',statLines:'fr | 8 | Mbappé\nar | 6 | L. Messi\nbr | 5 | Vinicius\npt | 4 | B. Fernandes',
  bigT:'Sabías que...',bigN:'104',bigL:'partidos',bigD:'El Mundial más grande de la historia, con 48 selecciones en 3 países.',
  cdT:'Faltan',cdD:'87',cdH:'14',cdM:'23',cdTxt:'11 de junio · Estadio Azteca',
  vsT:'Argentina vs Brasil',vsA:'ar',vsB:'br',vsVa:'3',vsVb:'5',vsLbl:'MUNDIALES',
  listT:'5 datos locos',listLines:'Primer Mundial con 48 selecciones\n3 países sede por primera vez\nAzteca, único en 3 Mundiales\n104 partidos en total\nFinal en MetLife · NY',
  recT:'Récord histórico',recVal:'5',recLbl:'títulos mundiales',recF:'br',recName:'BRASIL',recSub:'La selección más ganadora\nde la historia del Mundial',
  sedT:'3 países sede',sedLines:'us | EE.UU. | 11\nmx | México | 3\nca | Canadá | 2',sedTot:'Total: 16 estadios · 104 partidos',
  timT:'Mundiales en USA',timLines:'1994 | 1° Mundial en EE.UU.\n2026 | 2° Mundial (con MX y CA)\n32 | años desde el último',
  curT:'Dato curioso',curIc:'🏟️',curMain:'El Estadio Azteca es el [único en la historia] en vivir [3 Mundiales]',curYears:'1970 · 1986 · 2026',

  // — Plantillas genéricas (UI/UX) —
  covK:'PRESENTAMOS',covT:'Nuevo diseño',covSub:'Una experiencia más simple, rápida y clara para todo tu equipo.',covTag:'Disponible ya',
  kpiK:'MÉTRICA',kpiT:'Crecimiento mensual',kpiVal:'+248%',kpiDelta:'vs. el mes anterior',kpiDir:'up',kpiLbl:'usuarios activos',kpiDesc:'El mejor mes desde el lanzamiento.',
  stepK:'GUÍA',stepT:'Cómo empezar',stepLines:'Creá tu cuenta gratis\nConfigurá tu perfil\nInvitá a tu equipo\nEmpezá a crear',
  featK:'NOVEDADES',featT:'Qué incluye',featLines:'Modo oscuro automático\nExportación en alta resolución\nPlantillas personalizables\nColaboración en tiempo real',
  testiK:'TESTIMONIO',testiT:'Lo que dicen',testiText:'Cambió por completo nuestro flujo de trabajo. No volvemos atrás.',testiName:'Ana Pérez',testiRole:'Product Designer',

  // — Marketing / Social —
  promoBadge:'50% OFF',promoT:'Black Friday',promoOld:'$99',promoNew:'$49',promoCta:'Aprovechá hoy',
  evtDay:'24',evtMonth:'OCT',evtT:'Lanzamiento oficial',evtWhere:'Online · 18:00 hs',evtCta:'Reservá tu lugar',
  profName:'Ana Pérez',profRole:'Product Designer',profHandle:'@anaux',profBio:'Diseño productos digitales centrados en las personas.',profInit:'A',
  pricePlan:'PRO',priceVal:'$29',pricePer:'/mes',priceLines:'Proyectos ilimitados\nExportación 4K\nSoporte prioritario\nSin marca de agua',priceCta:'Empezar gratis',
  faqQ:'¿Cómo funciona?',faqA:'Elegís una plantilla, editás los datos y descargás la imagen en alta resolución. Así de simple.',
  agT:'Agenda del día',agLines:'09:00 | Apertura y bienvenida\n10:30 | Charla principal\n13:00 | Almuerzo\n15:00 | Talleres\n18:00 | Cierre'
};
