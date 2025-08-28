// Mobile menu
const burger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Smooth scroll + close menu on click
document.querySelectorAll('.nav a, .nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }
  });
});

// Scroll progress
const progress = document.querySelector('.progress');
const setProgress = () => {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (scrollTop / docH) * 100)}%`;
};
addEventListener('scroll', setProgress); addEventListener('load', setProgress);

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active section highlighting (scrollspy)
const sections = [...document.querySelectorAll('section[id]')];
const linksMap = new Map([...document.querySelectorAll('.nav-links a')].map(a => [a.getAttribute('href'), a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      linksMap.forEach(l => l.classList.remove('active'));
      const id = '#' + e.target.id;
      (linksMap.get(id) || linksMap.get('#home'))?.classList.add('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(s => spy.observe(s));

// Animated counters
const counterEls = document.querySelectorAll('.stat span[data-count]');
let countersStarted = false;
const startCounters = () => {
  counterEls.forEach(el => {
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target / 60));
    const tick = () => {
      n += step;
      if (n >= target) { el.textContent = target; return; }
      el.textContent = n;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};
const countersIO = new IntersectionObserver((entries) => {
  if (!countersStarted && entries.some(e => e.isIntersecting)) {
    countersStarted = true; startCounters();
  }
}, { threshold: 0.3 });
document.querySelectorAll('.stats').forEach(s => countersIO.observe(s));

// Lightweight “typewriter” effect for terminal (optional feel)
const term = document.getElementById('terminalContent');
if (term) {
  const full = term.textContent;
  term.textContent = '';
  let i = 0;
  const type = () => {
    term.textContent = full.slice(0, i++);
    if (i <= full.length) requestAnimationFrame(type);
  };
  setTimeout(type, 300);
}

// Contact form (front-end only demo)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending… (demo)';
  setTimeout(() => statusEl.textContent = 'Message queued. I will get back to you!', 900);
});
