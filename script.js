/* ═══════════════════════════════════════════
   DHANUSH R – PORTFOLIO  |  script.js
   ═══════════════════════════════════════════ */

/* ── NAV: set active link ─────────────────── */
function setActive(el) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

/* ── NAV: hamburger toggle ────────────────── */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* Close menu when clicking outside */
document.addEventListener('click', function (e) {
  const nav   = document.getElementById('nav-links');
  const ham   = document.getElementById('hamburger');
  if (nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !ham.contains(e.target)) {
    closeMenu();
  }
});

/* ── NAV: highlight active section on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navBtns  = document.querySelectorAll('.nav-btn');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── SCROLL REVEAL ────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── TOAST NOTIFICATION ───────────────────── */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── CONTACT FORM ─────────────────────────── */
function handleSend() {
  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const message = document.getElementById('f-msg').value.trim();

  if (!name) {
    showToast('Please enter your name ✏️');
    document.getElementById('f-name').focus();
    return;
  }
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address 📧');
    document.getElementById('f-email').focus();
    return;
  }
  if (!message) {
    showToast('Please enter a message 💬');
    document.getElementById('f-msg').focus();
    return;
  }

  /* Clear fields */
  ['f-name', 'f-email', 'f-subject', 'f-msg'].forEach(id => {
    document.getElementById(id).value = '';
  });

  showToast("Message sent! I'll get back to you soon 🙌");
}

/* ── ENTER key submits form ───────────────── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    const form = e.target.closest('.msg-box');
    if (form) handleSend();
  }
});
