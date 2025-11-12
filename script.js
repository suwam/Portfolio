// -----------------------------
// JS: theme, mobile nav, reveal, form
// -----------------------------

// Theme toggle (dark <-> light)
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') root.classList.add('light');

document.getElementById('themeToggle').addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');
hamburger.addEventListener('click', () => {
  const hidden = mobilePanel.hasAttribute('hidden');
  mobilePanel.toggleAttribute('hidden');
  hamburger.setAttribute('aria-expanded', hidden ? 'true' : 'false');
});
mobilePanel.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobilePanel.setAttribute('hidden', ''))
);

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Back-to-top button
const toTop = document.getElementById('toTop');
const revealTopBtn = () => {
  if (window.scrollY > 500) toTop.classList.add('show');
  else toTop.classList.remove('show');
};
window.addEventListener('scroll', revealTopBtn);
toTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (mailto)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const subject = `Portfolio inquiry from ${decodeURIComponent(name)}`;
    const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(email)}%0A%0A${decodeURIComponent(message)}`;

    // ⚠️ Replace with your actual email
window.location.href = `mailto:suwamsubedi30@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;


    status.textContent = 'Opening your email client…';
    form.reset();
  });
}
