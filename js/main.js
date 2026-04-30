/* ═══════════════════════════════════════════
   ann-birthday / js/main.js
   Countdown, cake, scroll reveal, utilities
   ═══════════════════════════════════════════ */

/* ─── TOAST ──────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
window.showToast = showToast; // make accessible to player.js

/* ─── COUNTDOWN ──────────────────────────── */
function updateCountdown() {
  // Show all zeros - birthday is today!
  document.getElementById('cd-days').textContent  = '00';
  document.getElementById('cd-hours').textContent = '00';
  document.getElementById('cd-mins').textContent  = '00';
  document.getElementById('cd-secs').textContent  = '00';
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── SCROLL REVEAL ──────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 55);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── SCROLL TO SECTION ──────────────────── */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
window.scrollToSection = scrollToSection;

/* ─── CAKE & CANDLES ─────────────────────── */
let candlesBlown = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  ['c1','c2','c3','c4','c5'].forEach((id, i) => {
    setTimeout(() => {
      const el   = document.getElementById(id);
      const body = el.querySelector('.candle-body');
      body.textContent = '🌟';
      el.style.transform = 'scale(1.35)';
      setTimeout(() => el.style.transform = '', 350);
    }, i * 220);
  });

  setTimeout(() => {
    document.getElementById('wish-prompt').textContent =
      '🌟 Your wish has been made! May it come true, Ann! 🌟';
    document.getElementById('wish-prompt').style.color = '#E8B86D';
    showToast('🌟 Wish made! It\'s coming true! ✨');
    Confetti.launch(200);
  }, 1200);
}
window.blowCandles = blowCandles;

/* ─── CELEBRATE BUTTON ───────────────────── */
function celebrate() {
  Confetti.launch(300);
  showToast('🎉 Happy Birthday, Queen Ann! 👑');
  document.querySelectorAll('.balloon').forEach((b, i) => {
    setTimeout(() => {
      b.style.transform = 'scale(1.6) rotate(20deg)';
      setTimeout(() => b.style.transform = '', 450);
    }, i * 90);
  });
}
window.celebrate = celebrate;

/* ─── WELCOME TOAST ──────────────────────── */
setTimeout(() => showToast('🎀 Welcome to Ann\'s Birthday! 🎂'), 1400);
