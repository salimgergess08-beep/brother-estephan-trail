'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Trail stops ---------- */
const categories = {
  religious: { label: 'Faith & heritage', stops: ['St. Estephan Nehme house', 'Our Lady of the Prairie church', 'Our Lady of the River church', 'St. Simon old church', 'St. Peter & Paul church', 'St. Elias church', 'St. Eusebius church', 'Five hermit cells', 'St. Sabbas church'] },
  historical: { label: 'History', stops: ['Old mill near the river', 'Old threshing floor', 'Old winepress', 'Shir Elaamiyye', 'Rock-cut tombs', 'Adam’s cave'] },
  natural: { label: 'Nature', stops: ['Al-Ghurair spring', 'Lehfed river', 'Bee yard', 'Oak forest', 'Pine forest', 'Apple orchards', 'Vineyard', 'Aakala waterfalls'] }
};

const allStops = [];
Object.entries(categories).forEach(([key, cat]) => cat.stops.forEach(name => allStops.push({ key, label: cat.label, name })));

function renderStops(filter = 'all') {
  const grid = document.querySelector('#stop-grid');
  grid.replaceChildren();
  let shown = 0;
  allStops.forEach((stop, index) => {
    if (filter !== 'all' && filter !== stop.key) return;
    const card = document.createElement('article');
    card.className = 'stop';
    card.dataset.cat = stop.key;
    card.style.setProperty('--i', shown);
    const top = document.createElement('div');
    top.className = 'stop-top';
    const label = document.createElement('small');
    label.textContent = stop.label;
    const num = document.createElement('span');
    num.className = 'stop-num';
    num.textContent = String(index + 1).padStart(2, '0');
    top.append(label, num);
    const title = document.createElement('h3');
    title.textContent = stop.name;
    card.append(top, title);
    grid.append(card);
    shown++;
  });
  document.querySelector('#result-count').textContent = `${shown} stops to discover`;
}
renderStops();

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const pill = document.querySelector('.filter-pill');
function movePill(button) {
  if (!pill || !button) return;
  pill.style.width = `${button.offsetWidth}px`;
  pill.style.transform = `translate(${button.offsetLeft}px, ${button.offsetTop - 5}px)`;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  movePill(button);
  renderStops(button.dataset.filter);
}));
const activeFilter = () => filterButtons.find(b => b.getAttribute('aria-pressed') === 'true');
window.addEventListener('load', () => movePill(activeFilter()));
window.addEventListener('resize', () => movePill(activeFilter()));
if (document.fonts) document.fonts.ready.then(() => movePill(activeFilter()));
movePill(activeFilter());

/* ---------- Header + mobile menu ---------- */
const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', open);
  if (open) header.classList.add('scrolled');
  else onScroll();
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

/* ---------- Scroll effects ---------- */
const progress = document.querySelector('.progress span');
const heroImg = document.querySelector('.hero-media img');
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header.classList.toggle('scrolled', y > 60 || navigation.classList.contains('open'));
  if (!reduceMotion) {
    if (heroImg && y < window.innerHeight) heroImg.parentElement.style.transform = `translateY(${y * 0.3}px)`;
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * Number(el.dataset.parallax);
      el.querySelector('img').style.transform = `translateY(${offset}px) scale(1.12)`;
    });
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
onScroll();

/* ---------- Reveal + counters ---------- */
function animateCount(el) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
  const start = performance.now();
  const duration = 1400;
  const step = now => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('[data-count]').forEach(animateCount);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .hero-stats').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

/* ---------- Lightbox ---------- */
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-full-image]').forEach(button => button.addEventListener('click', () => {
  const image = document.querySelector('#lightbox-image');
  image.src = button.dataset.fullImage;
  image.alt = button.dataset.caption;
  document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
  lightbox.showModal();
}));
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target !== lightbox) return;
  const r = lightbox.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close();
});

/* ---------- Checklist ---------- */
const checks = [...document.querySelectorAll('.checklist input')];
const ring = document.querySelector('.ring-fill');
const circumference = 2 * Math.PI * 19;
checks.forEach(check => check.addEventListener('change', () => {
  const count = checks.filter(item => item.checked).length;
  ring.style.strokeDashoffset = String(circumference * (1 - count / checks.length));
  document.querySelector('#check-status').textContent = `${count} of ${checks.length} ready${count === checks.length ? ' · Checklist complete — enjoy the walk!' : ''}`;
}));
