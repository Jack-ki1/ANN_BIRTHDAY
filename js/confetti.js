/* ═══════════════════════════════════════════
   ann-birthday / js/confetti.js
   Confetti burst system (used by main.js)
   ═══════════════════════════════════════════ */

const Confetti = (() => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');

  const COLORS = [
    '#FF4E8E','#FFB3CF','#C9A7FF',
    '#E8B86D','#FF4E8E','#EDD9FF',
    '#FFD6E7','#F7DBA7','#ffffff'
  ];
  const SHAPES = ['rect','circle','triangle'];

  let pieces  = [];
  let running = false;
  let rafId   = null;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createPieces(count = 240) {
    pieces = [];
    for (let i = 0; i < count; i++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      pieces.push({
        x:      Math.random() * canvas.width,
        y:      -20 - Math.random() * 200,
        w:      Math.random() * 10 + 4,
        h:      Math.random() * 6  + 3,
        r:      Math.random() * 4  + 2,
        color:  COLORS[Math.floor(Math.random() * COLORS.length)],
        vx:     (Math.random() - 0.5) * 5,
        vy:     Math.random() * 5 + 2,
        angle:  Math.random() * Math.PI * 2,
        va:     (Math.random() - 0.5) * 0.25,
        alpha:  1,
        shape,
      });
    }
  }

  function drawPiece(p) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle   = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    if (p.shape === 'rect') {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    } else if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -p.h);
      ctx.lineTo(p.w / 2, p.h / 2);
      ctx.lineTo(-p.w / 2, p.h / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.va;
      p.vy    += 0.06; // gravity
      p.alpha -= 0.006;
      if (p.alpha > 0) { alive = true; drawPiece(p); }
    });
    if (alive) {
      rafId = requestAnimationFrame(animate);
    } else {
      running = false;
      canvas.style.display = 'none';
    }
  }

  function launch(count = 240) {
    resize();
    canvas.style.display = 'block';
    createPieces(count);
    if (running) cancelAnimationFrame(rafId);
    running = true;
    animate();
  }

  window.addEventListener('resize', () => {
    if (running) resize();
  });

  return { launch };
})();
