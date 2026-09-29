/**
 * BuildBro - Production Interactive Script
 * High performance, zero framework dependencies, mobile-first touch optimization
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration Constants
  const WHATSAPP_NUMBER = '919025175386';
  const INSTAGRAM_HANDLE = 'buildbro.in';
  const CONTACT_EMAIL = 'buildbro.service@gmail.com';

  /* ==========================================================================
     1. Intro / Splash Screen Management ("Midnight Aurora Glass" + 2s Safety Fallback)
     ========================================================================== */
  const splashScreen = document.getElementById('splash-screen');
  const splashCard = document.getElementById('splash-card');
  const splashEnterBtn = document.getElementById('splash-enter-btn');
  const splashSkipBtn = document.getElementById('splash-skip-btn');
  const siteWrapper = document.getElementById('site-wrapper');

  let splashDismissed = false;
  let heroExperienceStarted = false;
  let splashAnimationHealthy = false;
  let splashInteractionArmed = false;
  let rainCleanup = null;

  function triggerHeroOnce() {
    if (heroExperienceStarted) return;
    heroExperienceStarted = true;
    startHeroExperience();
  }

  function dismissSplashScreen(source = 'unknown') {
    if (splashDismissed || !splashScreen) return;
    splashDismissed = true;

    // Clean up rain animation loop and resize listeners
    if (rainCleanup && typeof rainCleanup === 'function') {
      rainCleanup();
      rainCleanup = null;
    }

    // Trigger smooth fade, scale and site scale arrival entrance
    splashScreen.classList.add('splash-exit');
    if (siteWrapper) {
      siteWrapper.classList.add('site-arriving');
    }

    try {
      sessionStorage.setItem('buildbro_splash_seen', 'true');
    } catch (e) {
      // Fallback if sessionStorage is disabled/blocked in private mode
    }

    // Start hero wow experience as entrance screen transitions out
    triggerHeroOnce();

    // Reveal main website underneath once exit animation completes (650ms)
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 650);
  }

  // Check if already seen in current browsing session
  let isSeenInSession = false;
  try {
    const storedVal = sessionStorage.getItem('buildbro_splash_seen');
    isSeenInSession = storedVal === 'true';
  } catch (e) {
    isSeenInSession = false;
  }

  if (isSeenInSession) {
    if (splashScreen) {
      splashScreen.style.display = 'none';
      splashDismissed = true;
    }
    // Launch hero experience directly if splash was previously dismissed in session
    triggerHeroOnce();
  } else if (splashScreen) {
    // Arm interaction after brief delay (250ms) to prevent synthetic or initial layout clicks
    setTimeout(() => {
      splashInteractionArmed = true;
    }, 250);

    // 1. Tap or click anywhere on screen
    splashScreen.addEventListener('click', (e) => {
      if (!splashInteractionArmed) return;
      dismissSplashScreen('screen-click');
    });

    splashScreen.addEventListener('touchend', (e) => {
      if (!splashInteractionArmed) return;
      dismissSplashScreen('screen-touchend');
    }, { passive: true });

    // 2. Button tap/click
    if (splashEnterBtn) {
      splashEnterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplashScreen('enter-btn-click');
      });
      splashEnterBtn.addEventListener('touchend', (e) => {
        e.stopPropagation();
        dismissSplashScreen('enter-btn-touchend');
      }, { passive: true });
    }

    // 3. Skip link tap/click
    if (splashSkipBtn) {
      splashSkipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplashScreen('skip-btn-click');
      });
      splashSkipBtn.addEventListener('touchend', (e) => {
        e.stopPropagation();
        dismissSplashScreen('skip-btn-touchend');
      }, { passive: true });
    }

    // 4. Strict 2-second safety fallback: ensures site automatically unlocks if animation fails to complete within 2s
    setTimeout(() => {
      if (!splashDismissed && !splashAnimationHealthy) {
        dismissSplashScreen('safety-fallback-animation-failed');
      }
    }, 2000);

    // 5. Initialize Splash Experience
    try {
      initSplashExperience();
    } catch (err) {
      dismissSplashScreen('init-exception');
    }
  }

  function initSplashExperience() {
    splashAnimationHealthy = true;
    rainCleanup = initRainEffect();
  }

  function initRainEffect() {
    const canvas = document.getElementById('splash-rain-canvas');
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};
    let raindrops = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const isMobile = window.innerWidth < 768;
    const dropCount = isMobile ? 60 : 150;

    function createDrop() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.1,
        angle: 0.15 // slight diagonal tilt
      };
    }

    for (let i = 0; i < dropCount; i++) {
      raindrops.push(createDrop());
    }

    function drawRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;

      raindrops.forEach(drop => {
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.length * drop.angle, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x += drop.speed * drop.angle;

        if (drop.y > canvas.height) {
          drop.y = Math.random() * -100;
          drop.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(drawRain);
    }

    drawRain();

    return function cleanup() {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }

  /* ==========================================================================
     2. Sticky Glass Navbar & Scroll Handler
     ========================================================================== */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ==========================================================================
     3. Mobile Navigation Drawer & Touch Menu
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileDrawer || !mobileBackdrop) return;
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileBackdrop) return;
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     Smooth Anchor Link Scrolling
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  /* ==========================================================================
     4. FAQ Interactive Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Collapse all items for clean single-expanded view
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     5. Package-Specific WhatsApp Deep Links
     ========================================================================== */
  const packageWhatsAppLinks = {
    'resume-basic': "Hi BuildBro! I'm interested in the Basic Resume package (Rs. 200). I'd like to get my resume ATS-ready.",
    'resume-cover': "Hi BuildBro! I'm interested in the Resume + Cover Letter package (Rs. 400) for campus placements.",
    'resume-linkedin': "Hi BuildBro! I'm interested in the Resume + LinkedIn package (Rs. 600). Please help me optimize my profile.",
    'resume-full': "Hi BuildBro! I'm interested in the Full Placement Package (Rs. 800) with priority support.",
    'website-starter': "Hi BuildBro! I'd like to get the Starter Website package (Rs. 3,000) for my business.",
    'website-business': "Hi BuildBro! I'd like to get the Business Website package (Rs. 6,000) with 1-month maintenance.",
    'general-enquiry': "Hi BuildBro! I'd like to enquire about your Resume & Website services."
  };

  const actionButtons = document.querySelectorAll('[data-wa-package]');
  actionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const packageKey = btn.getAttribute('data-wa-package');
      const text = packageWhatsAppLinks[packageKey] || packageWhatsAppLinks['general-enquiry'];
      const targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      btn.setAttribute('href', targetUrl);
    });
  });

  /* ==========================================================================
     6. Desktop-Only Parallax & Ambient Scroll Effect
     ========================================================================== */
  const isDesktop = window.innerWidth >= 1024;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isDesktop && !prefersReducedMotion) {
    const orbGold = document.querySelector('.orb-gold');
    const orbCyan = document.querySelector('.orb-cyan');
    const mockupResume = document.querySelector('.mockup-resume');
    const mockupBrowser = document.querySelector('.mockup-browser');

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;

          // Parallax background orbs
          if (orbGold) {
            orbGold.style.transform = `translate3d(0, ${scrollPos * 0.12}px, 0)`;
          }
          if (orbCyan) {
            orbCyan.style.transform = `translate3d(0, ${scrollPos * -0.08}px, 0)`;
          }

          // Subtle tilt reaction on hero preview cards
          if (scrollPos < 800) {
            if (mockupResume) {
              mockupResume.style.transform = `rotate(${-6 - scrollPos * 0.005}deg) translateY(${scrollPos * 0.04}px)`;
            }
            if (mockupBrowser) {
              mockupBrowser.style.transform = `rotate(${3 + scrollPos * 0.004}deg) translateY(${scrollPos * -0.03}px)`;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     7. Scroll Reveal Observer (GPU-Accelerated)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If IntersectionObserver is unavailable or reduced motion is preferred
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     8. Floating WhatsApp Safe Area Adjustment (Avoids Footer Overlap)
     ========================================================================== */
  const floatingWA = document.querySelector('.floating-whatsapp');
  const footer = document.querySelector('.site-footer');

  if (floatingWA && footer) {
    function adjustFloatingButton() {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is visible in viewport, push the button up so it never covers footer links
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        floatingWA.style.transform = `translateY(-${overlap + 10}px)`;
      } else {
        floatingWA.style.transform = 'translateY(0)';
      }
    }

    window.addEventListener('scroll', adjustFloatingButton, { passive: true });
    window.addEventListener('resize', adjustFloatingButton, { passive: true });
  }

  /* ==========================================================================
     9. Hero Wow Experience: Particle Constellation, Logo Assembly & Magnetic CTAs
     ========================================================================== */
  function startHeroExperience() {
    const heroSection = document.getElementById('hero');
    const heroCanvas = document.getElementById('hero-particles-canvas');
    const headline = document.getElementById('hero-headline');
    if (!heroSection || !heroCanvas) return;

    const ctx = heroCanvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 72;
    let particles = [];
    let burstParticles = [];
    let animationFrameId = null;
    let isHeroVisible = true;
    let burstTriggered = false;

    // Logo Assembly sequence timing
    let assemblyPhase = isMobile ? 'done' : 'assembling';
    let assemblyStartTime = null;

    // Track mouse for magnetic particle displacement (Desktop only)
    const mouse = { x: -1000, y: -1000, active: false };

    if (!isMobile) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroCanvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });

      heroSection.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    // Compute recognizable BuildBro logo target points (Resume "E" & Browser "B")
    function computeLogoTargets(cx, cy) {
      const targets = [];
      const gold = '#f59e0b';
      const cyan = '#06b6d4';

      // Left Letter: Gold "E" (Resume document format)
      // Spine
      for (let y = -40; y <= 40; y += 10) {
        targets.push({ x: cx - 50, y: cy + y, color: gold });
      }
      // Top bar
      for (let x = -40; x <= -10; x += 10) {
        targets.push({ x: cx + x, y: cy - 40, color: gold });
      }
      // Folded corner accent
      targets.push({ x: cx - 18, y: cy - 32, color: '#fbbf24' });
      // Middle bar
      for (let x = -40; x <= -18; x += 10) {
        targets.push({ x: cx + x, y: cy, color: gold });
      }
      // Bottom bar
      for (let x = -40; x <= -10; x += 10) {
        targets.push({ x: cx + x, y: cy + 40, color: gold });
      }
      // Resume text line dots
      targets.push({ x: cx - 34, y: cy - 20, color: gold });
      targets.push({ x: cx - 22, y: cy - 20, color: gold });
      targets.push({ x: cx - 34, y: cy + 20, color: gold });
      targets.push({ x: cx - 22, y: cy + 20, color: gold });

      // Right Letter: Cyan "B" (Browser window format)
      // Spine
      for (let y = -40; y <= 40; y += 10) {
        targets.push({ x: cx + 12, y: cy + y, color: cyan });
      }
      // Browser status dots
      targets.push({ x: cx + 22, y: cy - 38, color: '#ef4444' });
      targets.push({ x: cx + 30, y: cy - 38, color: '#eab308' });
      targets.push({ x: cx + 38, y: cy - 38, color: '#22c55e' });
      // Top loop
      targets.push({ x: cx + 24, y: cy - 40, color: cyan });
      targets.push({ x: cx + 38, y: cy - 40, color: cyan });
      targets.push({ x: cx + 48, y: cy - 30, color: cyan });
      targets.push({ x: cx + 48, y: cy - 12, color: cyan });
      targets.push({ x: cx + 38, y: cy - 2, color: cyan });
      targets.push({ x: cx + 24, y: cy - 2, color: cyan });
      // Bottom loop
      targets.push({ x: cx + 24, y: cy + 2, color: cyan });
      targets.push({ x: cx + 40, y: cy + 2, color: cyan });
      targets.push({ x: cx + 52, y: cy + 14, color: cyan });
      targets.push({ x: cx + 52, y: cy + 30, color: cyan });
      targets.push({ x: cx + 40, y: cy + 40, color: cyan });
      targets.push({ x: cx + 24, y: cy + 40, color: cyan });
      // Glow dot
      targets.push({ x: cx + 46, y: cy - 46, color: '#22d3ee' });

      return targets;
    }

    function resize() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function initParticles() {
      particles = [];
      const colors = ['#f59e0b', '#fbbf24', '#06b6d4', '#22d3ee'];
      
      const cx = width / 2;
      const cy = Math.max(160, height * 0.42);
      const logoTargets = computeLogoTargets(cx, cy);

      for (let i = 0; i < particleCount; i++) {
        const color = colors[i % colors.length];
        const z = 0.5 + Math.random() * 1.1; // 3D depth layer
        const target = logoTargets[i % logoTargets.length];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35 * z,
          vy: (Math.random() - 0.5) * 0.35 * z,
          radius: (1.2 + Math.random() * 1.6) * z,
          baseAlpha: 0.3 + Math.random() * 0.5,
          color: (!isMobile && target && i < logoTargets.length) ? target.color : color,
          z: z,
          targetX: target ? target.x : Math.random() * width,
          targetY: target ? target.y : Math.random() * height,
          dispX: 0,
          dispY: 0
        });
      }
    }

    function triggerBurst() {
      if (burstTriggered || isMobile) return;
      burstTriggered = true;

      const originX = width / 2;
      const originY = height - 20;

      for (let i = 0; i < 28; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
        const speed = 2.5 + Math.random() * 4.5;
        burstParticles.push({
          x: originX + (Math.random() - 0.5) * 40,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 2,
          color: Math.random() > 0.5 ? '#f59e0b' : '#06b6d4',
          alpha: 1,
          decay: 0.024 + Math.random() * 0.012
        });
      }
    }

    function render(timestamp) {
      if (!isHeroVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Handle Logo Assembly Phase Timing (Desktop only)
      if (!isMobile && assemblyPhase !== 'done') {
        if (!assemblyStartTime) assemblyStartTime = timestamp;
        const elapsed = timestamp - assemblyStartTime;

        if (elapsed < 650) {
          assemblyPhase = 'assembling';
        } else if (elapsed < 1250) {
          assemblyPhase = 'holding';
        } else {
          assemblyPhase = 'done';
          // Release particles back into natural drift with an outward impulse
          particles.forEach((p) => {
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
          });
          // Reveal headline with staggered word slide-up
          if (headline) headline.classList.add('animate-in');
        }
      }

      // Update & Draw Particles
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (assemblyPhase === 'assembling') {
          // Streak into logo formation
          p.x += (p.targetX - p.x) * 0.13;
          p.y += (p.targetY - p.y) * 0.13;
        } else if (assemblyPhase === 'holding') {
          // Subtle vibrating hold
          p.x += (p.targetX + (Math.random() - 0.5) * 1.4 - p.x) * 0.2;
          p.y += (p.targetY + (Math.random() - 0.5) * 1.4 - p.y) * 0.2;
        } else {
          // Ambient slow floating drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle mouse magnetic pull (Desktop only)
          if (!isMobile && mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const force = (1 - dist / 140) * 18;
              const angle = Math.atan2(dy, dx);
              p.dispX += (Math.cos(angle) * force - p.dispX) * 0.1;
              p.dispY += (Math.sin(angle) * force - p.dispY) * 0.1;
            } else {
              p.dispX += (0 - p.dispX) * 0.06;
              p.dispY += (0 - p.dispY) * 0.06;
            }
          } else {
            p.dispX += (0 - p.dispX) * 0.06;
            p.dispY += (0 - p.dispY) * 0.06;
          }
        }

        const renderX = p.x + p.dispX;
        const renderY = p.y + p.dispY;

        // Draw particle dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = assemblyPhase === 'holding' ? 0.95 : p.baseAlpha;
        if (assemblyPhase === 'holding') {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with faint constellation lines (Desktop only, when in natural drift)
        if (!isMobile && assemblyPhase === 'done') {
          for (let j = i + 1; j < len; j++) {
            const p2 = particles[j];
            const p2x = p2.x + p2.dispX;
            const p2y = p2.y + p2.dispY;
            const dLine = Math.hypot(renderX - p2x, renderY - p2y);

            if (dLine < 110) {
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(renderX, renderY);
              ctx.lineTo(p2x, p2y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dLine / 110) * 0.14;
              ctx.lineWidth = 0.65;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      // Update & Draw Scroll Burst Particles
      if (burstParticles.length > 0) {
        for (let b = burstParticles.length - 1; b >= 0; b--) {
          const bp = burstParticles[b];
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.vy += 0.06; // gentle gravity
          bp.alpha -= bp.decay;

          if (bp.alpha <= 0) {
            burstParticles.splice(b, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
          ctx.fillStyle = bp.color;
          ctx.globalAlpha = Math.max(0, bp.alpha);
          ctx.shadowColor = bp.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Magnetic Button Cursor Tracking (Desktop Only)
    if (!isMobile && window.matchMedia('(pointer: fine)').matches) {
      const magneticBtns = document.querySelectorAll('.magnetic-btn');
      magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.32;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.32;
          const clampX = Math.max(-8, Math.min(8, x));
          const clampY = Math.max(-8, Math.min(8, y));
          btn.style.transform = `translate3d(${clampX}px, ${clampY}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    }

    // Scroll burst trigger on Stats Section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window && !isMobile) {
      const burstObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !burstTriggered) {
            triggerBurst();
          }
        });
      }, { threshold: 0.2 });
      burstObserver.observe(statsSection);
    }

    // Pause rendering when hero is not visible in viewport to preserve 60fps & save battery
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroSection);
    }

    // Mobile fallback: reveal headline immediately on mobile
    if (isMobile && headline) {
      headline.classList.add('animate-in');
    }

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    }, { passive: true });

    resize();
    initParticles();
    animationFrameId = requestAnimationFrame(render);
  }
});
