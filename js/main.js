// ===== Responsive Menu =====
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ===== Dark Mode =====
// Strategy: prefer user saved theme -> system preference -> default light
const root = document.documentElement;
const toggle = document.getElementById('darkToggle');
function applyTheme(mode) {
  if (mode === 'dark') {
    root.classList.remove('light');
    toggle && toggle.setAttribute('aria-pressed', 'true');
  } else {
    root.classList.add('light');
    toggle && toggle.setAttribute('aria-pressed', 'false');
  }
}
function currentPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null
applyTheme(saved ? saved : (currentPrefersDark() ? 'dark' : 'light'));
toggle && toggle.addEventListener('click', () => {
  const nowDark = !root.classList.contains('light');
  const next = nowDark ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});
// watch system change if not saved
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

// ===== Scroll Reveal (IntersectionObserver) =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Analytics helper (example custom event) =====
window.trackCTA = (label) => {
  try {
    gtag('event', 'cta_click', { label });
  } catch (e) {}
};
