/* ============================================================
   FARAN REHMAT — PROJECTS DATA
   Add or edit your projects here. Each project shows on the portfolio.
   ============================================================ */

const PROJECTS_KEY = 'fr_projects';
const MESSAGES_KEY = 'fr_messages';
const VISITS_KEY   = 'fr_visits';

const defaultProjects = [
  // ── GAME UI DESIGN ───────────────────────────────────────
  {
    id: 10,
    title: 'One Piece — Game UI Design',
    cat: 'design',
    desc: 'A full-scale game UI concept for a One Piece RPG — featuring the main lobby screen, pause menu, player/crew management screen, and loading screen. Designed with a wood-pirate aesthetic, rich character art integration, and polished HUD elements.',
    stack: ['UI Design', 'Game UX', 'Figma', 'Adobe Photoshop'],
    github: 'https://github.com/faranrehmat242001-glitch/Ui-for-one-piece.git',
    demo: 'http://drive.google.com/open?id=1Tu6OfnOPDeLbnJ3jVKuKu2KIk1l7sZaT&resourcekey=',
    images: [
      'images/church-flyer.jpeg',
      'images/one-piece-pause.jpeg',
      'images/one-piece-players.jpeg',
      'images/one-piece-loading.jpeg'
    ],
    featured: true
  },
    {
    id: 12,
    title: 'Dream League — Game UI Design',
    cat: 'design',
    desc: 'dream league soccer game UI design concept, featuring a main menu, team management screen, and in-game HUD. Designed with a modern sports aesthetic, intuitive navigation, and polished visual elements.',
    stack: ['UI Design', 'Game UX', 'Figma', 'Adobe Photoshop'],
    github: 'https://github.com/faranrehmat242001-glitch/Dream-League-Soccer-Ui-clone.git',
    demo: 'http://drive.google.com/open?id=1Tu6OfnOPDeLbnJ3jVKuKu2KIk1l7sZaT&resourcekey=',
    images: [
      'images/dreamleague.png',
    ],
    featured: true
  },
  

  // ── GRAPHIC DESIGN ───────────────────────────────────────
  {
    id: 11,
    title: 'Meltflix Branding & Poster Design',
    cat: 'design',
    desc: 'A branding and poster design project for Meltflix, a fictional streaming service. The project includes a logo, color scheme, typography, and promotional posters designed to capture the essence of the brand.',
    stack: ['Graphic Design', 'Flyer Design', 'Adobe Photoshop', 'Typography'],
    github: 'https://github.com/faranrehmat242001-glitch/Meltflix.git ',
    demo: 'http://drive.google.com/open?id=1Tu6OfnOPDeLbnJ3jVKuKu2KIk1l7sZaT&resourcekey=',
    images: [
      'images/meltflix-branding.png',
    ],
    featured: true
  },
 
  // ── EXISTING PROJECTS ────────────────────────────────────
  {
    id: 1,
    title: 'UE5 Pirate Game ',
    cat: 'game',
    desc: 'A procedurally generated open-world terrain with dynamic weather, real-time lighting, and AI-driven NPCs built in Unreal Engine 5.',
    stack: ['Unreal Engine 5', 'C++', 'Blueprints', 'Nanite'],
    github: '#',
    demo: 'http://drive.google.com/open?id=1Tu6OfnOPDeLbnJ3jVKuKu2KIk1l7sZaT&resourcekey=',
    images: [
      'images/ue5-pirate-game.jpg',
    ],
    featured: false
  },
 
  {
    id: 3,
    title: 'Full Stack Mortal Kombat Fan Site',
    cat: 'web',
    desc: 'My first portfolio website featuring animated transitions and responsive design, built from scratch to showcase projects.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/faranrehmat242001-glitch/Mortal-Kombat-Website.git',
    demo: 'https://web-lab-project-green.vercel.app/home.html',
    images: [
      'images/mortal-kombat.png'
    ],
    featured: false
  },
  

  {
    id: 6,
    title: 'Chatbot with OpenAI API',
    cat: 'chatbot',
    desc: 'Implementation of a chatbot using the OpenAI API, featuring natural language processing and conversational flow.',
    stack: ['JavaScript', 'OpenAI API', 'Node.js','python'],
    github: 'https://github.com/faranrehmat242001-glitch/Chatbot-for-Cgd.git',
    demo: 'http://drive.google.com/open?id=1Tu6OfnOPDeLbnJ3jVKuKu2KIk1l7sZaT&resourcekey=',
    images: [
      'images/chat-bot.png'
    ],
    featured: false
  },
  
  
];

function getProjects() {
  try { return JSON.parse(localStorage.getItem(PROJECTS_KEY)) || defaultProjects; }
  catch { return defaultProjects; }
}
function saveProjects(p) { localStorage.setItem(PROJECTS_KEY, JSON.stringify(p)); }
function getMessages() {
  try { return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || []; }
  catch { return []; }
}
function saveMessages(m) { localStorage.setItem(MESSAGES_KEY, JSON.stringify(m)); }
function getVisits() {
  try { return JSON.parse(localStorage.getItem(VISITS_KEY)) || {total:0,today:0,week:0,days:[]}; }
  catch { return {total:0,today:0,week:0,days:[]}; }
}
function recordVisit() {
  const v = getVisits();
  v.total = (v.total||0)+1;
  v.today = (v.today||0)+1;
  v.week  = (v.week||0)+1;
  if (!v.days || v.days.length === 0) { v.days = [5,12,8,20,15,9,v.today]; }
  else { v.days[v.days.length-1] = v.today; }
  localStorage.setItem(VISITS_KEY, JSON.stringify(v));
}
recordVisit();
