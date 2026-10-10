// Hero background: drifting particles that link to each other and to the pointer.
// Faint behind the copy so the headline stays readable.
(() => {
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".hero__network");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const quietTarget = document.querySelector(".hero__copy");

  const COLORS = [
    { rgb: "242, 242, 242", weight: 0.78 },
    { rgb: "39, 94, 254", weight: 0.14 },
    { rgb: "143, 176, 255", weight: 0.08 },
  ];
  const LINK_DIST = 110;
  const POINTER_RADIUS = 190;
  const MAX_SPEED = 0.45;

  let width = 0;
  let height = 0;
  let particles = [];
  let quiet = null;
  let running = false;
  let visible = true;
  let frameId = 0;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };

  function pickColor() {
    let r = Math.random();
    for (const c of COLORS) {
      if ((r -= c.weight) <= 0) return c.rgb;
    }
    return COLORS[0].rgb;
  }

  function makeParticle() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.08 + Math.random() * 0.25;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 0.8 + Math.random() * 1.4,
      dash: Math.random() < 0.3,
      color: pickColor(),
      alpha: 0.35 + Math.random() * 0.4,
    };
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(60, Math.min(200, Math.round((width * height) / 7000)));
    while (particles.length < count) particles.push(makeParticle());
    particles.length = count;
    particles.forEach((p) => {
      if (p.x > width) p.x = Math.random() * width;
      if (p.y > height) p.y = Math.random() * height;
    });
    updateQuietZone();
    if (!running) draw();
  }

  // Area behind the name and messages, where particles stay faint.
  function updateQuietZone() {
    if (!quietTarget) return;
    const h = hero.getBoundingClientRect();
    const q = quietTarget.getBoundingClientRect();
    quiet = { x1: q.left - h.left - 20, y1: q.top - h.top - 20, x2: q.right - h.left + 20, y2: q.bottom - h.top + 20 };
  }

  function quietFactor(x, y) {
    if (!quiet) return 1;
    return x > quiet.x1 && x < quiet.x2 && y > quiet.y1 && y < quiet.y2 ? 0.35 : 1;
  }

  function step() {
    pointer.x += (pointer.tx - pointer.x) * 0.18;
    pointer.y += (pointer.ty - pointer.y) * 0.18;

    for (const p of particles) {
      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < POINTER_RADIUS && d > 1) {
          const pull = (1 - d / POINTER_RADIUS) * 0.012;
          p.vx += (dx / d) * pull;
          p.vy += (dy / d) * pull;
        }
      }
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > MAX_SPEED) {
        p.vx *= MAX_SPEED / speed;
        p.vy *= MAX_SPEED / speed;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const d = Math.sqrt(d2);
        const alpha = (1 - d / LINK_DIST) * 0.2 * quietFactor((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.strokeStyle = `rgba(242, 242, 242, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const p of particles) {
      let alpha = p.alpha * quietFactor(p.x, p.y);
      let near = 0;
      if (pointer.active) {
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (d < POINTER_RADIUS) {
          near = 1 - d / POINTER_RADIUS;
          ctx.strokeStyle = `rgba(110, 150, 255, ${near * 0.8})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
          alpha = Math.min(1, alpha + near * 0.7);
        }
      }
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
      if (p.dash) {
        const len = 3 + p.size * 2;
        const angle = Math.atan2(p.vy, p.vx);
        ctx.lineWidth = p.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x - Math.cos(angle) * len, p.y - Math.sin(angle) * len);
        ctx.lineTo(p.x + Math.cos(angle) * len, p.y + Math.sin(angle) * len);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + near, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function loop() {
    step();
    draw();
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frameId);
  }

  function setPointer(e) {
    const rect = hero.getBoundingClientRect();
    pointer.tx = e.clientX - rect.left;
    pointer.ty = e.clientY - rect.top;
    if (!pointer.active) {
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
    }
    pointer.active = true;
  }

  hero.addEventListener("pointermove", setPointer);
  hero.addEventListener("pointerdown", setPointer);
  hero.addEventListener("pointerleave", () => (pointer.active = false));
  hero.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "mouse") pointer.active = false;
  });

  new ResizeObserver(resize).observe(hero);
  window.addEventListener("scroll", updateQuietZone, { passive: true });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(hero);

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  resize();
  start();
})();
