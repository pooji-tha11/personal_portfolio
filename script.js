/**
 * POOJITHA RAMKUMAR - PERSONAL PORTFOLIO SCRIPT
 * Plain vanilla JavaScript, zero dependencies, no build steps.
 * Handles:
 * 1. Intro Screen & Retro Desktop Computer (Tilt, Key Dips, Boot, Camera Zoom)
 * 2. Header Active Section Tracking & Sliding Nav Indicator
 * 3. Hero Name Decryption & Cursor Proximity Physics
 * 4. Scroll Velocity Marquee Ticker with Skew
 * 5. About Section Illuminated Paragraph on Scroll
 * 6. Skills Tiles Cursor-Follower Glow
 * 7. Sticky Panels Scaling & Dimming (Desktop)
 * 8. Live In-Browser SHA-256 & Password Strength Demo
 * 9. Animated Experience Timeline (Self-Drawing Line)
 * 10. Cursor Follower Dot
 * 11. Reduced Motion Compliance
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 0. ENVIRONMENT & REDUCED MOTION DETECTION
  // -------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------------
  // 1. INTRO LOADING SCREEN & RETRO DESKTOP COMPUTER
  // -------------------------------------------------------------------------
  const introScreen = document.getElementById('intro-screen');
  const retroPc = document.getElementById('retro-pc');
  const pcSvg = document.getElementById('pc-svg');
  const powerBtn = document.getElementById('power-button');
  const powerLed = document.getElementById('power-led');
  const screenIdle = document.getElementById('screen-idle');
  const screenBoot = document.getElementById('screen-boot');
  const screenReady = document.getElementById('screen-ready');
  const bootLog = document.getElementById('boot-log');
  const bootProgressBar = document.getElementById('boot-progress-bar');
  const btnEnterPortfolio = document.getElementById('btn-enter-portfolio');
  const skipIntroBtn = document.getElementById('skip-intro');

  let isPoweredOn = false;
  let isBootComplete = false;
  let isIntroDone = false;

  // If user prefers reduced motion, skip intro directly
  if (prefersReducedMotion) {
    dismissIntro(true);
  } else {
    // 3D Perspective Tilt toward cursor
    window.addEventListener('mousemove', (e) => {
      if (isIntroDone || !retroPc) return;
      const rect = retroPc.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const tiltY = Math.max(-10, Math.min(10, deltaX * 10));
      const tiltX = Math.max(-8, Math.min(8, -deltaY * 8));

      retroPc.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // Mouse cord slight drift
      const mouseGroup = document.getElementById('mouse-group');
      if (mouseGroup) {
        mouseGroup.style.transform = `translate(${605 + deltaX * 8}px, ${485 + deltaY * 5}px)`;
      }
    });

    // Keyboard Key Dip Effect & First Key Boot
    window.addEventListener('keydown', (e) => {
      if (isIntroDone) return;

      // Visual key press animation on drawn keyboard
      triggerKeyboardVisual();

      // First key press powers on if idle
      if (!isPoweredOn) {
        powerOnComputer();
      } else if (isBootComplete && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openPortfolioZoom();
      }
    });

    // Power button click/keyboard activation
    if (powerBtn) {
      powerBtn.addEventListener('click', () => {
        if (!isPoweredOn) powerOnComputer();
      });
      powerBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isPoweredOn) powerOnComputer();
        }
      });
    }

    // "Open Portfolio" Button inside screen
    if (btnEnterPortfolio) {
      btnEnterPortfolio.addEventListener('click', () => {
        openPortfolioZoom();
      });
    }

    // Skip Intro button
    if (skipIntroBtn) {
      skipIntroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dismissIntro(true);
      });
    }
  }

  function triggerKeyboardVisual() {
    const keyCaps = document.querySelectorAll('.key-cap');
    if (!keyCaps.length) return;
    const randomKey = keyCaps[Math.floor(Math.random() * keyCaps.length)];
    randomKey.classList.add('key-pressed');
    setTimeout(() => {
      randomKey.classList.remove('key-pressed');
    }, 120);
  }

  function powerOnComputer() {
    if (isPoweredOn) return;
    isPoweredOn = true;

    // Power LED turns terracotta and stays lit
    if (powerLed) {
      powerLed.classList.remove('led-pulse');
      powerLed.classList.add('led-powered');
    }

    // Switch screen to boot log
    if (screenIdle) screenIdle.style.display = 'none';
    if (screenBoot) screenBoot.style.display = 'flex';

    const bootMessages = [
      { text: 'Base Memory 640K OK', status: 'OK' },
      { text: 'Loading technical skills...', status: 'OK' },
      { text: 'Loading projects & toolkits...', status: 'OK' },
      { text: 'Starting Poojitha portfolio...', status: 'READY' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootMessages.length) {
        const item = bootMessages[step];
        const line = document.createElement('div');
        line.className = 'boot-line';
        line.innerHTML = `<span>&gt; ${item.text}</span> <span class="ok">[${item.status}]</span>`;
        if (bootLog) bootLog.appendChild(line);

        const progressPercent = Math.min(100, Math.round(((step + 1) / bootMessages.length) * 100));
        if (bootProgressBar) bootProgressBar.style.width = `${progressPercent}%`;

        step++;
      } else {
        clearInterval(interval);
        setTimeout(showReadyScreen, 350);
      }
    }, 380);
  }

  function showReadyScreen() {
    isBootComplete = true;
    if (screenBoot) screenBoot.style.display = 'none';
    if (screenReady) screenReady.style.display = 'flex';
    if (btnEnterPortfolio) btnEnterPortfolio.focus();
  }

  function openPortfolioZoom() {
    if (isIntroDone) return;
    isIntroDone = true;

    if (introScreen) {
      introScreen.classList.add('intro-zooming');
    }

    setTimeout(() => {
      dismissIntro(false);
    }, 1100);
  }

  function dismissIntro(immediate) {
    isIntroDone = true;
    document.body.classList.remove('intro-active');

    if (introScreen) {
      if (immediate) {
        introScreen.classList.add('intro-hidden');
      } else {
        introScreen.style.opacity = '0';
        setTimeout(() => {
          introScreen.classList.add('intro-hidden');
        }, 750);
      }
    }

    // Trigger hero decryption once intro completes
    triggerHeroDecryption();
  }

  // -------------------------------------------------------------------------
  // 2. HERO NAME DECRYPTION & PROXIMITY EFFECT
  // -------------------------------------------------------------------------
  const decryptChars = document.querySelectorAll('.hero-display-name .char');
  const glyphPool = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#*!%&?';

  function triggerHeroDecryption() {
    if (prefersReducedMotion) return;

    decryptChars.forEach((charEl, idx) => {
      const finalChar = charEl.getAttribute('data-final') || charEl.textContent;
      let iterations = 0;
      const maxIterations = 8 + (idx * 2);

      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          charEl.textContent = finalChar;
          clearInterval(interval);
        } else {
          charEl.textContent = glyphPool[Math.floor(Math.random() * glyphPool.length)];
          iterations++;
        }
      }, 45);
    });
  }

  // Hero Name Proximity Physics (Cursor rises, grows, and shifts color)
  if (!prefersReducedMotion && decryptChars.length) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = 130; // proximity threshold in pixels

      decryptChars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const distX = mouseX - charCenterX;
        const distY = mouseY - charCenterY;
        const distance = Math.hypot(distX, distY);

        if (distance < radius) {
          const power = (1 - distance / radius);
          const riseY = -12 * power;
          const scale = 1 + (0.16 * power);

          char.style.transform = `translateY(${riseY}px) scale(${scale})`;
          char.classList.add('char-proximity');
        } else {
          char.style.transform = '';
          char.classList.remove('char-proximity');
        }
      });
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 3. MARQUEE TICKER (Scroll-Velocity Acceleration & Skew)
  // -------------------------------------------------------------------------
  const marqueeTrack = document.getElementById('marquee-track');
  let marqueePos = 0;
  let marqueeSpeed = 1.0;
  let currentSkew = 0;
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  function updateMarquee() {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Calculate instantaneous scroll velocity with smooth decay
    scrollVelocity = (scrollVelocity * 0.88) + (deltaY * 0.12);

    if (marqueeTrack && !prefersReducedMotion) {
      // Dynamic speed additions based on scroll velocity
      const targetSpeed = 1.0 + Math.min(8, Math.abs(scrollVelocity) * 0.25);
      marqueeSpeed += (targetSpeed - marqueeSpeed) * 0.1;

      // Dynamic skewing
      const targetSkew = Math.max(-6, Math.min(6, -scrollVelocity * 0.18));
      currentSkew += (targetSkew - currentSkew) * 0.1;

      marqueePos -= marqueeSpeed;
      // Reset position seamlessly when half has scrolled (track has 2 duplicate sets)
      const halfWidth = marqueeTrack.scrollWidth / 2;
      if (Math.abs(marqueePos) >= halfWidth) {
        marqueePos = 0;
      }

      marqueeTrack.style.transform = `translateX(${marqueePos}px) skewX(${currentSkew}deg)`;
    }

    requestAnimationFrame(updateMarquee);
  }
  requestAnimationFrame(updateMarquee);

  // -------------------------------------------------------------------------
  // 4. HEADER SLIDING NAV INDICATOR & SCROLL PROGRESS
  // -------------------------------------------------------------------------
  const navIndicator = document.getElementById('nav-indicator');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const sections = document.querySelectorAll('main section[id], #experience');

  function updateNavIndicator(targetLink) {
    if (!navIndicator || !targetLink) return;
    const navPill = targetLink.closest('.nav-pill');
    if (!navPill) return;

    const pillRect = navPill.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();

    const leftOffset = linkRect.left - pillRect.left;
    const width = linkRect.width;

    navIndicator.style.left = `${leftOffset}px`;
    navIndicator.style.width = `${width}px`;

    navLinks.forEach((link) => link.classList.remove('active'));
    targetLink.classList.add('active');
  }

  // Active section scroll detection
  function handleScrollNav() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - viewportHeight;

    // Update top progress bar
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
      scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }

    // Determine active section
    let activeSectionId = 'home';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        activeSectionId = sec.getAttribute('id');
      }
    });

    // Map experience section back to "work" nav link
    if (activeSectionId === 'experience') {
      activeSectionId = 'work';
    }

    const currentActiveLink = document.querySelector(`.nav-link[data-section="${activeSectionId}"]`);
    if (currentActiveLink && !currentActiveLink.classList.contains('active')) {
      updateNavIndicator(currentActiveLink);
    }
  }

  window.addEventListener('scroll', handleScrollNav, { passive: true });
  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav-link.active') || navLinks[0];
    updateNavIndicator(current);
  });

  // Smooth click navigation
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          updateNavIndicator(link);
        }
      }
    });
  });

  // Initial nav indicator placement
  setTimeout(() => {
    const initialLink = document.querySelector('.nav-link.active') || navLinks[0];
    updateNavIndicator(initialLink);
  }, 250);

  // -------------------------------------------------------------------------
  // 5. ABOUT SECTION ILLUMINATED PARAGRAPH ON SCROLL
  // -------------------------------------------------------------------------
  const illuminatedText = document.getElementById('illuminated-text');
  if (illuminatedText) {
    const rawWords = illuminatedText.innerText.trim().split(/\s+/);
    illuminatedText.innerHTML = rawWords
      .map((word) => `<span class="scroll-word">${word}</span> `)
      .join('');

    const wordSpans = illuminatedText.querySelectorAll('.scroll-word');

    function updateWordIllumination() {
      const rect = illuminatedText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of paragraph across viewport center
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.25;

      const totalDistance = startTrigger - endTrigger;
      const currentPos = startTrigger - rect.top;

      let ratio = Math.max(0, Math.min(1, currentPos / totalDistance));

      const litCount = Math.floor(ratio * wordSpans.length);
      wordSpans.forEach((span, index) => {
        if (index <= litCount) {
          span.classList.add('lit');
        } else {
          span.classList.remove('lit');
        }
      });
    }

    window.addEventListener('scroll', updateWordIllumination, { passive: true });
    updateWordIllumination();
  }

  // Portrait arch parallax
  const portraitArch = document.getElementById('portrait-arch');
  if (portraitArch && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const rect = portraitArch.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08;
        portraitArch.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 6. SKILLS TILES CURSOR GLOW
  // -------------------------------------------------------------------------
  const skillTiles = document.querySelectorAll('.skill-tile');
  skillTiles.forEach((tile) => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tile.style.setProperty('--mouse-x', `${x}px`);
      tile.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // -------------------------------------------------------------------------
  // 7. STICKY STACKING PANELS (Desktop Scaling & Dimming)
  // -------------------------------------------------------------------------
  const panels = [
    document.getElementById('panel-1'),
    document.getElementById('panel-2'),
    document.getElementById('panel-3')
  ].filter(Boolean);

  function updateStickyStack() {
    if (window.innerWidth <= 860 || prefersReducedMotion) {
      panels.forEach((p) => {
        p.style.transform = '';
        p.style.opacity = '';
      });
      return;
    }

    for (let i = 0; i < panels.length - 1; i++) {
      const currentPanel = panels[i];
      const nextPanel = panels[i + 1];

      const currentRect = currentPanel.getBoundingClientRect();
      const nextRect = nextPanel.getBoundingClientRect();

      // When the next panel rises over the current one
      const overlap = currentRect.bottom - nextRect.top;
      if (overlap > 0) {
        const progress = Math.min(1, Math.max(0, overlap / (window.innerHeight * 0.75)));
        const scale = 1 - (progress * 0.06); // scale down to 0.94
        const opacity = 1 - (progress * 0.45); // dim down to 0.55
        currentPanel.style.transform = `scale(${scale})`;
        currentPanel.style.opacity = `${opacity}`;
      } else {
        currentPanel.style.transform = 'scale(1)';
        currentPanel.style.opacity = '1';
      }
    }
  }

  window.addEventListener('scroll', updateStickyStack, { passive: true });
  window.addEventListener('resize', updateStickyStack);

  // -------------------------------------------------------------------------
  // 8. WORKING IN-BROWSER SECURITY DEMO (SHA-256 & Strength)
  // -------------------------------------------------------------------------
  const secInput = document.getElementById('sec-demo-input');
  const secHashVal = document.getElementById('sec-hash-val');
  const strengthVal = document.getElementById('strength-val');
  const meterFill = document.getElementById('meter-fill');

  async function computeSha256(str) {
    if (!window.crypto || !window.crypto.subtle) {
      return 'WebCrypto not available in this environment';
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function evaluateStrength(pass) {
    if (!pass) return { score: 0, text: 'None', color: '#6B5D51', width: '4%' };

    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) {
      return { score, text: 'Weak', color: '#D9534F', width: '25%' };
    } else if (score <= 4) {
      return { score, text: 'Fair', color: '#C6A98B', width: '55%' };
    } else if (score === 5) {
      return { score, text: 'Good', color: '#A66B4F', width: '75%' };
    } else {
      return { score, text: 'Strong', color: '#8E5A41', width: '100%' };
    }
  }

  async function updateSecurityDemo() {
    if (!secInput || !secHashVal) return;
    const value = secInput.value;

    // Live SHA-256
    try {
      const hash = await computeSha256(value);
      secHashVal.textContent = hash;
    } catch (err) {
      secHashVal.textContent = 'Hash error: ' + err.message;
    }

    // Complexity
    const analysis = evaluateStrength(value);
    if (strengthVal) {
      strengthVal.textContent = analysis.text;
      strengthVal.style.color = analysis.color;
    }
    if (meterFill) {
      meterFill.style.width = analysis.width;
      meterFill.style.backgroundColor = analysis.color;
    }
  }

  if (secInput) {
    secInput.addEventListener('input', updateSecurityDemo);
    updateSecurityDemo();
  }

  // -------------------------------------------------------------------------
  // 9. ANIMATED EXPERIENCE TIMELINE (Self-Drawing Line)
  // -------------------------------------------------------------------------
  const timelineContainer = document.getElementById('timeline-container');
  const timelineProgress = document.getElementById('timeline-progress');
  const timelineEntries = document.querySelectorAll('.timeline-entry');

  function updateTimeline() {
    if (!timelineContainer || !timelineProgress) return;
    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startY = windowHeight * 0.8;
    const totalHeight = rect.height;
    const currentScroll = startY - rect.top;

    const progressRatio = Math.max(0, Math.min(1, currentScroll / totalHeight));
    timelineProgress.style.height = `${progressRatio * 100}%`;

    timelineEntries.forEach((entry) => {
      const entryRect = entry.getBoundingClientRect();
      if (entryRect.top <= windowHeight * 0.75) {
        entry.classList.add('timeline-active');
      } else {
        entry.classList.remove('timeline-active');
      }
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  updateTimeline();

  // -------------------------------------------------------------------------
  // 10. CURSOR FOLLOWER DOT (Desktop)
  // -------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  let mouseCursorX = -100;
  let mouseCursorY = -100;
  let dotX = -100;
  let dotY = -100;

  if (cursorDot && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseCursorX = e.clientX;
      mouseCursorY = e.clientY;
      if (!cursorDot.classList.contains('active')) {
        cursorDot.classList.add('active');
        dotX = mouseCursorX;
        dotY = mouseCursorY;
      }
    }, { passive: true });

    function renderCursor() {
      dotX += (mouseCursorX - dotX) * 0.22;
      dotY += (mouseCursorY - dotY) * 0.22;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand cursor over interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, summary, .clickable-power, .skill-tile, .cert-row'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-hover'));
    });
  }

  // Back to top smooth button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 12. SMALLER THINGS & EXPLORATIONS: INTERACTIVE JOURNEY TIMELINE
  // -------------------------------------------------------------------------
  const journeyNodes = document.querySelectorAll('.journey-node-item');
  const journeyCard = document.getElementById('journey-showcase-card');
  const journeyStatusPill = document.getElementById('journey-status-pill');
  const journeyMilestoneTag = document.getElementById('journey-milestone-tag');
  const journeyTitle = document.getElementById('journey-showcase-title');
  const journeyStack = document.getElementById('journey-showcase-stack');
  const journeyDesc = document.getElementById('journey-showcase-desc');
  const journeyActions = document.getElementById('journey-showcase-actions');
  const journeyPathActive = document.getElementById('journey-path-active');

  const journeyMilestones = [
    {
      index: 'Milestone 01 / 02',
      status: 'Learning Project',
      statusClass: 'status-deployed',
      title: 'Python Web Scraping',
      stack: 'Python • Requests • BeautifulSoup • MySQL',
      desc: 'A learning project focused on automated web data extraction and structured persistence. Built custom scraping workflows utilizing Requests and BeautifulSoup to parse page hierarchies, extract metadata, clean datasets, and persist information into MySQL tables.',
      linkText: 'View on GitHub →',
      linkUrl: 'https://github.com/pooji-tha11/WebScraping'
    },
    {
      index: 'Milestone 02 / 02',
      status: 'Learning Project',
      statusClass: 'status-deployed',
      title: 'FastAPI Blog API',
      stack: 'FastAPI • SQLite • SQLAlchemy • Pydantic',
      desc: 'A backend learning exercise developed to practice structured API engineering. Implements 4 CRUD operations for blog posts, schema validation via Pydantic, and persistence through SQLite with SQLAlchemy ORM. JWT authentication is currently an architectural concept being explored for integration.',
      linkText: 'View on GitHub →',
      linkUrl: 'https://github.com/pooji-tha11/FastAPI-Project-'
    }
  ];

  function selectJourneyMilestone(idx) {
    if (!journeyMilestones[idx]) return;
    const data = journeyMilestones[idx];

    // Update active node classes
    journeyNodes.forEach((node, i) => {
      if (i === idx) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // Update SVG active straight trail stroke (360 is stroke-dasharray)
    if (journeyPathActive) {
      const offset = idx === 0 ? 360 : 0;
      journeyPathActive.style.strokeDashoffset = `${offset}`;
    }

    // Card fade transition
    if (journeyCard) {
      journeyCard.classList.add('card-fading');
      setTimeout(() => {
        if (journeyStatusPill) {
          journeyStatusPill.textContent = data.status;
          journeyStatusPill.className = `status-pill ${data.statusClass}`;
        }
        if (journeyMilestoneTag) journeyMilestoneTag.textContent = data.index;
        if (journeyTitle) journeyTitle.textContent = data.title;
        if (journeyStack) journeyStack.innerHTML = data.stack.replace(/•/g, '&bull;');
        if (journeyDesc) journeyDesc.textContent = data.desc;

        if (journeyActions) {
          if (data.linkUrl) {
            journeyActions.innerHTML = `<a href="${data.linkUrl}" target="_blank" rel="noopener" class="link-arrow" id="journey-action-link">${data.linkText}</a>`;
          } else {
            journeyActions.innerHTML = `<span class="text-subtle">${data.linkText}</span>`;
          }
        }

        journeyCard.classList.remove('card-fading');
      }, 150);
    }
  }

  journeyNodes.forEach((node, idx) => {
    node.addEventListener('click', () => selectJourneyMilestone(idx));
    node.addEventListener('mouseenter', () => selectJourneyMilestone(idx));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectJourneyMilestone(idx);
      }
    });
  });

})();
