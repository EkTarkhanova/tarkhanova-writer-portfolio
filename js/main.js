/* ============================================
   PORTFOLIO MAIN SCRIPT
   Ekaterina Tarkhanova
   ============================================ */

(function() {
  'use strict';

  // ==========================================
  // CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.querySelectorAll('a, button, .poem-header, .story-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  // ==========================================
  // HERO CANVAS — FLOATING PARTICLES
  // ==========================================
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3 - 0.1;
      this.alpha = 0;
      this.targetAlpha = Math.random() * 0.5 + 0.1;
      this.size = Math.random() * 1.5 + 0.5;
      this.life = 0;
      this.maxLife = Math.random() * 400 + 200;
    }
    update() {
      this.life++;
      this.x += this.vx;
      this.y += this.vy;
      if (this.life < 60) this.alpha += this.targetAlpha / 60;
      else if (this.life > this.maxLife - 60) this.alpha -= this.targetAlpha / 60;
      if (this.life >= this.maxLife) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = `hsl(42, 60%, 55%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Generate initial particles
  for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife);
    particles.push(p);
  }

  // Draw connecting lines between close particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.06;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#c9a84c';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // ==========================================
  // NAVIGATION — SCROLL EFFECT
  // ==========================================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // ==========================================
  // REVEAL ON SCROLL
  // ==========================================
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // Auto-add reveal to section elements
  document.querySelectorAll(
    '.section-header, .story-card, .about-text, .about-frame, .contact-content'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  // ==========================================
  // POETRY ACCORDION
  // ==========================================
  document.querySelectorAll('.poem-item').forEach(item => {
    const header = item.querySelector('.poem-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.poem-item').forEach(p => p.classList.remove('open'));
      // Open clicked (if was closed)
      if (!isOpen) item.classList.add('open');
    });
  });

  // ==========================================
  // STORY CARDS — PARALLAX TILT
  // ==========================================
  document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-8px)
        rotateX(${-y * 4}deg)
        rotateY(${x * 4}deg)
      `;
      card.style.transformOrigin = 'center';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================
  // HERO TITLE — GLITCH EFFECT ON HOVER
  // ==========================================
  document.querySelectorAll('.hero-title .line').forEach(line => {
    const original = line.textContent;
    const chars = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyz01234';
    let interval = null;

    line.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        line.textContent = original
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        if (iteration >= original.length) {
          clearInterval(interval);
          line.textContent = original;
        }
        iteration += 0.4;
      }, 35);
    });
  });

  // ==========================================
  // SMOOTH ANCHOR SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // POETRY SECTION LAYOUT FIX
  // ==========================================
  // Ensure poetry section header is handled correctly
  const poetrySection = document.querySelector('.poetry-section');
  const poetryHeader = poetrySection?.querySelector('.section-header');
  if (poetryHeader && poetrySection) {
    poetrySection.style.display = 'block';
  }

  console.log('%cЕкатерина Тарханова — Portfolio', 'font-size: 20px; font-family: serif; color: #c9a84c;');

})();
