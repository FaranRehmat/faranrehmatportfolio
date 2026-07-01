/* ============================================================
   FARAN REHMAT — MAIN PORTFOLIO JAVASCRIPT
   ============================================================ */

// ── CURSOR ────────────────────────────────────────────────────────────────
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx=0, cy=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY; });
(function animCursor() {
  requestAnimationFrame(animCursor);
  rx += (cx-rx)*0.12; ry += (cy-ry)*0.12;
  cur.style.left  = cx+'px'; cur.style.top  = cy+'px';
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
})();

// ── NAV ───────────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  const prog = document.getElementById('progress');
  const pct  = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = pct + '%';
});
function toggleMobile() { nav.classList.toggle('mobile-open'); }

// ── TYPING EFFECT ─────────────────────────────────────────────────────────
const phrases = [
  'Game Developer in the Making',
  'UI/UX Designer',
  'Unreal Engine Enthusiast',
  'C++ Developer',
  'Creative Technologist',
  'Air University · Batch 2024'
];
let pi=0, ci=0, del=false;
const typed = document.getElementById('typed');
function typeEffect() {
  const c = phrases[pi];
  if (!del) {
    typed.textContent = c.slice(0, ++ci);
    if (ci === c.length) { del=true; setTimeout(typeEffect, 2000); return; }
  } else {
    typed.textContent = c.slice(0, --ci);
    if (ci === 0) { del=false; pi=(pi+1)%phrases.length; }
  }
  setTimeout(typeEffect, del ? 50 : 80);
}
typeEffect();

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        setTimeout(() => b.style.width = b.dataset.w, 100);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── LIGHTBOX ──────────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── PROJECTS ──────────────────────────────────────────────────────────────
let currentFilter = 'all';

function renderProjects(filter = 'all') {
  const grid  = document.getElementById('projects-grid');
  const projs = getProjects().filter(p => filter === 'all' || p.cat === filter);
  const labels = { game:'Game Dev', web:'Web', tool:'Tool', design:'Design' };
  const emojis = { game:'🎮', web:'🌐', tool:'🔧', design:'🎨' };

  grid.innerHTML = projs.map(p => {
    const hasImages = p.images && p.images.length > 0;
    const mainImg   = hasImages ? p.images[0] : null;

    // thumbnail strip for overlay
    const thumbs = hasImages
      ? p.images.map(src => `<img src="${src}" class="thumb-mini" onclick="openLightbox('${src}')" alt="project screenshot">`).join('')
      : '';

    // FIX: Added style="cursor:pointer" and onclick="openLightbox('${mainImg}')" to the main image tag below
    const imgSection = mainImg
      ? `<div class="project-img">
           <img src="${mainImg}" alt="${p.title}" loading="lazy" onclick="openLightbox('${mainImg}')" style="cursor: pointer;">
           <span class="project-tag-top">${labels[p.cat]||p.cat}</span>
           ${p.images.length > 1 ? `<div class="project-img-overlay">${thumbs}</div>` : ''}
         </div>`
      : `<div class="project-img">
           <span class="project-img-label">${emojis[p.cat]||'◈'}</span>
           <span class="project-tag-top">${labels[p.cat]||p.cat}</span>
         </div>`;

    const featuredBadge = p.featured
      ? `<span style="display:inline-block;padding:0.2rem 0.6rem;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--gold);letter-spacing:2px;margin-bottom:0.6rem">★ FEATURED</span>`
      : '';

    return `
      <div class="glass-card project-card" data-cat="${p.cat}">
        ${imgSection}
        <div class="project-body">
          ${featuredBadge}
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.desc}</div>
          <div class="project-stack">${(p.stack||[]).map(t=>`<span class="stack-tag">${t}</span>`).join('')}</div>
          <div class="project-links">
            <a href="${p.github||'#'}" class="project-link" target="_blank">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.9 1.23 3.22 0 4.6-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="${p.demo||'#'}" class="project-link" target="_blank">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              doc
            </a>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterProjects(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('projects-grid');
  grid.style.opacity = '0';
  setTimeout(() => {
    renderProjects(filter);
    grid.style.opacity = '1';
    grid.style.transition = 'opacity 0.4s';
  }, 200);
}
renderProjects();
// ── CONTACT FORM ──────────────────────────────────────────────────────────
function handleContact(e) {
  e.preventDefault();
  const name    = document.getElementById('cName').value;
  const email   = document.getElementById('cEmail').value;
  const subject = document.getElementById('cSubject').value || 'No subject';
  const message = document.getElementById('cMessage').value;
  if (!name || !email || !message) { showFormMsg('error','Please fill in all required fields.'); return; }
  const msgs = getMessages();
  msgs.unshift({ id:Date.now(), name, email, subject, message, time:new Date().toLocaleString() });
  saveMessages(msgs);
  document.getElementById('contactForm').reset();
  showFormMsg('success','✓ Message sent! I\'ll get back to you soon.');
  renderAdminMessages();
  updateAdminCounts();
}
function showFormMsg(type, text) {
  const el = document.getElementById('formMsg');
  el.textContent = text; el.className = 'form-msg '+type; el.style.display = 'block';
  setTimeout(() => el.style.display='none', 5000);
}

// ── ADMIN ─────────────────────────────────────────────────────────────────
let adminLoggedIn = false;
function adminLogin() {
  const u   = document.getElementById('adminUser').value;
  const p   = document.getElementById('adminPass').value;
  const msg = document.getElementById('loginMsg');
  if (u === 'faranrehmat' && p === 'khattak123') {
    adminLoggedIn = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDash').style.display  = 'block';
    updateAdminCounts(); renderAdminMessages(); renderAdminProjects(); renderAnalytics();
  } else {
    msg.textContent = '✗ Invalid credentials'; msg.className='form-msg error'; msg.style.display='block';
    setTimeout(() => msg.style.display='none', 3000);
  }
}
function adminLogout() {
  adminLoggedIn = false;
  document.getElementById('adminLogin').style.display = 'block';
  document.getElementById('adminDash').style.display  = 'none';
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
}
function switchTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
}
function updateAdminCounts() {
  const v = getVisits(); const m = getMessages(); const p = getProjects();
  document.getElementById('visitorCount').textContent = (v.total||0).toLocaleString();
  document.getElementById('msgCount').textContent     = m.length;
  document.getElementById('projCount').textContent    = p.length;
  const feed  = document.getElementById('activityFeed');
  const items = [
    {icon:'👁', text:`${v.today||1} visit${v.today!==1?'s':''} today`},
    {icon:'✉', text:`${m.length} message${m.length!==1?'s':''} received`},
    {icon:'📁', text:`${p.length} projects active`},
    {icon:'🌍', text:'Top traffic: Pakistan'},
  ];
  feed.innerHTML = items.map(i => `
    <div style="display:flex;align-items:center;gap:0.8rem;padding:0.5rem 0;border-bottom:1px solid var(--border);font-size:0.85rem;color:var(--muted)">
      <span>${i.icon}</span><span>${i.text}</span>
    </div>`).join('');
}
function renderAdminMessages() {
  const msgs = getMessages();
  const list = document.getElementById('messagesList');
  if (!list) return;
  if (msgs.length === 0) { list.innerHTML='<p style="color:var(--muted);font-size:0.85rem;padding:1rem">No messages yet.</p>'; return; }
  list.innerHTML = msgs.map(m => `
    <div class="glass-card message-item" id="msg-${m.id}">
      <div style="flex:1">
        <div class="msg-from">${m.name} <span style="color:var(--muted);font-weight:400;font-size:0.8rem">&lt;${m.email}&gt;</span></div>
        <div class="msg-preview">${m.subject} — ${m.message.substring(0,80)}${m.message.length>80?'…':''}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.3rem;margin-left:1rem">
        <span class="msg-time">${m.time}</span>
        <button class="msg-del" onclick="deleteMessage(${m.id})">DELETE</button>
      </div>
    </div>`).join('');
}
function deleteMessage(id) {
  let msgs = getMessages(); msgs = msgs.filter(m => m.id !== id); saveMessages(msgs);
  renderAdminMessages(); updateAdminCounts();
}
function renderAdminProjects() {
  const projs = getProjects();
  const list  = document.getElementById('adminProjectList');
  if (!list) return;
  list.innerHTML = projs.map(p => `
    <div class="glass-card admin-project-item" id="aproj-${p.id}">
      <div>
        <div class="admin-project-name">${p.title}</div>
        <div class="admin-project-cat">${p.cat.toUpperCase()} · ${(p.stack||[]).join(', ')}</div>
      </div>
      <button class="admin-btn danger" onclick="deleteProject(${p.id})">DELETE</button>
    </div>`).join('');
}
function addAdminProject() {
  const title  = document.getElementById('pTitle').value.trim();
  const cat    = document.getElementById('pCat').value;
  const desc   = document.getElementById('pDesc').value.trim();
  const stack  = document.getElementById('pStack').value.split(',').map(s=>s.trim()).filter(Boolean);
  const github = document.getElementById('pGithub').value.trim();
  if (!title || !desc) { alert('Title and description are required'); return; }
  const projs = getProjects();
  projs.push({ id:Date.now(), title, cat, desc, stack, github, demo:'#', images:[], featured:false });
  saveProjects(projs);
  ['pTitle','pDesc','pStack','pGithub'].forEach(id => document.getElementById(id).value='');
  renderAdminProjects(); renderProjects(currentFilter); updateAdminCounts();
}
function deleteProject(id) {
  let projs = getProjects(); projs = projs.filter(p => p.id !== id); saveProjects(projs);
  renderAdminProjects(); renderProjects(currentFilter); updateAdminCounts();
}
function renderAnalytics() {
  const v = getVisits();
  document.getElementById('todayVisits').textContent = v.today||1;
  document.getElementById('weekVisits').textContent  = v.week||7;
  const chart = document.getElementById('analyticsChart');
  const days  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data  = v.days && v.days.length===7 ? v.days : [5,12,8,20,15,9,v.today||3];
  const max   = Math.max(...data, 1);
  chart.innerHTML = data.map((val,i) => `
    <div class="chart-bar-wrap">
      <div class="chart-bar" style="height:${Math.round((val/max)*100)}px"></div>
      <div class="chart-bar-label">${days[i]}</div>
    </div>`).join('');
}

// ── ENTER KEY FOR ADMIN ────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key==='Enter' && !adminLoggedIn && document.getElementById('adminPass')===document.activeElement) adminLogin();
});
