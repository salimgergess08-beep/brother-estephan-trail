'use strict';
const categories = {
 religious: {label: 'Faith & heritage', stops: ['St. Estephan Nehme house', 'Our Lady of the Prairie church', 'Our Lady of the River church', 'St. Simon old church', 'St. Peter & Paul church', 'St. Elias church', 'St. Eusebius church', 'Five hermit cells', 'St. Sabbas church']},
 historical: {label: 'History', stops: ['Old mill near the river', 'Old threshing floor', 'Old winepress', 'Shir Elaamiyye', 'Rock-cut tombs', 'Adam’s cave']},
 natural: {label: 'Nature', stops: ['Al-Ghurair spring', 'Lehfed river', 'Bee yard', 'Oak forest', 'Pine forest', 'Apple orchards', 'Vineyard', 'Aakala waterfalls']}
};
function renderStops(filter = 'all') {
 const grid = document.querySelector('#stop-grid');
 grid.replaceChildren();
 Object.entries(categories).forEach(([key, category]) => {
  if (filter !== 'all' && filter !== key) return;
  category.stops.forEach(name => {
   const card = document.createElement('article'); card.className = 'stop';
   const label = document.createElement('small'); label.textContent = category.label;
   const title = document.createElement('h3'); title.textContent = name;
   card.append(label, title); grid.append(card);
  });
 });
 document.querySelector('#result-count').textContent = `${grid.children.length} stops to discover`;
}
renderStops();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
 renderStops(button.dataset.filter);
}));
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));navigation.classList.toggle('open', open);});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {if(event.key === 'Escape') closeMenu();});
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-full-image]').forEach(button => button.addEventListener('click', () => {
 const image = document.querySelector('#lightbox-image'); image.src = button.dataset.fullImage;image.alt = button.dataset.caption;
 document.querySelector('#lightbox-caption').textContent = button.dataset.caption;lightbox.showModal();
}));
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {if(event.target === lightbox){const r = lightbox.getBoundingClientRect();if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close();}});
const checks = [...document.querySelectorAll('.checklist input')];
checks.forEach(check => check.addEventListener('change', () => {const count = checks.filter(item => item.checked).length;document.querySelector('#check-status').textContent = `${count} of ${checks.length} ready${count === checks.length ? ' · Checklist complete' : ''}`;}));
