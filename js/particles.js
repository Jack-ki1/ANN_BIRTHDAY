/* ═══════════════════════════════════════════
   ann-birthday / js/particles.js
   Floating emoji particle system
   ═══════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');

  const EMOJIS = ['💖','🌸','✨','🦋','💫','🌷','💝','⭐','🌺','💕','🎀','🌟','🦄','🍭'];
  const COUNT  = 45;

  let particles = [];
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(randomY = false) { this.init(randomY); }
    init(randomY = false) {
      this.x     = Math.random() * W;
      this.y     = randomY ? Math.random() * H : H + 30;
      this.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      this.size  = Math.random() * 14 + 10;
      this.vy    = -(Math.random() * 1.4 + 0.4);
      this.vx    = (Math.random() - 0.5) * 0.7;
      this.alpha = Math.random() * 0.45 + 0.15;
      this.angle = Math.random() * Math.PI * 2;
      this.va    = (Math.random() - 0.5) * 0.025;
      this.life  = 1;
    }
    update() {
      this.y     += this.vy;
      this.x     += this.vx;
      this.angle += this.va;
      this.life  -= 0.0025;
      if (this.y < -30 || this.life <= 0) this.init();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * Math.max(0, this.life);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.font = `${this.size}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle(true)); // seed randomly on page load
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();

  // Cursor ─────────────────────────────────
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    setTimeout(() => {
      cursorTrail.style.left = mx + 'px';
      cursorTrail.style.top  = my + 'px';
    }, 80);
  });
})();
