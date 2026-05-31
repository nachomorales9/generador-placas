/* =========================================================
   state.js — estado global y valores por defecto
   ========================================================= */

// Configuración global (aplica a todas las placas)
const config = {
  type: 'grupo',
  size: 'square',
  accColor: '#ffce2e',
  textColor: '#ffffff',
  fontDisp: "'Baloo 2',sans-serif",   // fuente de títulos / números
  fontBody: "'Nunito',sans-serif",    // fuente de texto
  bg: 0,                              // índice en BACKGROUNDS
  brand: '@fulbazo_ · Todo el Mundial en un lugar', // texto del pie
  showLogo: true,
  customLogo: ''                     // dataURL si el usuario sube un logo
};

// Datos por tipo de placa
const state = {
  grupo:'J',
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
  curT:'Dato curioso',curIc:'🏟️',curMain:'El Estadio Azteca es el [único en la historia] en vivir [3 Mundiales]',curYears:'1970 · 1986 · 2026'
};
