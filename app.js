// Frøken Hangeland — redesign

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header scroll state + logo swap ---------- */
const header = document.getElementById('siteHeader');
const brandLogo = document.getElementById('brandLogo');

function updateHeader() {
  const scrolled = window.scrollY > 40;
  header.classList.toggle('scrolled', scrolled);
  brandLogo.src = scrolled ? 'assets/logo-green.png' : 'assets/logo-white.png';
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* ---------- Mobile menu ---------- */
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenuBackdrop.classList.add('open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenuBackdrop.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
burgerBtn.addEventListener('click', openMenu);
mobileMenuClose.addEventListener('click', closeMenu);
mobileMenuBackdrop.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ---------- Menu category cards (real links to live site) ---------- */
const menuCategories = [
  { name: 'Koldtbord', href: 'https://www.frkhangeland.no/koldtbord' },
  { name: 'Tapas', href: 'https://www.frkhangeland.no/tapas' },
  { name: 'Varm mat', href: 'https://www.frkhangeland.no/koldtbord-1' },
  { name: 'Lunsj mat', href: 'https://www.frkhangeland.no/lunch-mat' },
  { name: 'Smørbrød', href: 'https://www.frkhangeland.no/smrbrd' },
];
const menuGrid = document.getElementById('menuGrid');
menuGrid.innerHTML = menuCategories.map(c => `
  <a class="menu-card" href="${c.href}" target="_blank" rel="noopener">
    <span>${c.name}</span>
    <span class="arrow">→</span>
  </a>
`).join('');

/* ---------- Gallery (real photos) ---------- */
const galleryImages = [
  { src: 'assets/gallery-koldtbord-1.jpg', alt: 'Koldtbord med laks og roastbiff', tall: true },
  { src: 'assets/gallery-reker-1.jpg', alt: 'Rekesmørbrød pyntet med agurk og sitron' },
  { src: 'assets/gallery-kake.jpg', alt: 'Hjemmelaget napoleonskake' },
  { src: 'assets/gallery-dagens-1.jpg', alt: 'Dagens middag servert varm' },
  { src: 'assets/gallery-smorbrod-2.jpg', alt: 'Rekesmørbrød med sitron' },
  { src: 'assets/gallery-koldtbord-2.jpg', alt: 'Koldtbord dekket til selskap', tall: true },
  { src: 'assets/gallery-reker-2.jpg', alt: 'Smørbrød pyntet med reker og agurk' },
  { src: 'assets/gallery-dagens-3.jpg', alt: 'Farseboller som dagens middag' },
  { src: 'assets/gallery-kanelboller.jpg', alt: 'Nybakte kanelboller' },
  { src: 'assets/gallery-dagens-2.jpg', alt: 'Stekt makrell som dagens middag' },
  { src: 'assets/gallery-smorbrod-1.jpg', alt: 'Rekesmørbrød med roastbiff i bakgrunnen' },
];
const galleryGrid = document.getElementById('galleryGrid');
galleryGrid.innerHTML = galleryImages.map(g => `
  <a href="${g.src}" target="_blank" rel="noopener" class="${g.tall ? 'tall' : ''}">
    <img src="${g.src}" alt="${g.alt}" loading="lazy">
  </a>
`).join('');

/* ---------- Reveal on scroll ---------- */
document.querySelectorAll('.section, .offer-card, .split').forEach(el => el.classList.add('reveal'));
document.documentElement.classList.add('js-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Safety net: instant/large scroll jumps (End key, scrollbar drag, restored
// scroll position) can skip past an element between IntersectionObserver
// samples. Catch anything left hidden that is already on screen.
function catchUpReveals() {
  document.querySelectorAll('.reveal:not(.in-view)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('in-view');
      revealObserver.unobserve(el);
    }
  });
}
let revealTicking = false;
window.addEventListener('scroll', () => {
  if (revealTicking) return;
  revealTicking = true;
  requestAnimationFrame(() => { catchUpReveals(); revealTicking = false; });
}, { passive: true });
window.addEventListener('load', catchUpReveals);
