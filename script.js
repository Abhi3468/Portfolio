// =========================================================
//  script.js  — Abhishek R portfolio
//  1. Core behavior: mobile nav, footer year, scroll reveal
//  2. Company CONTENT personalization (?company=)
//  3. Theme map
//  4. Google tri-color name toggle
//  5. Accenture animated ">" cursor trail
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. CORE BEHAVIOR ---------- */

    // Mobile nav toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }

    // Also support navToggle / navMenu IDs (fallback)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
    }

    // Auto footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }


    /* ---------- 2. READ ?company= PARAM ---------- */

    const params = new URLSearchParams(window.location.search);
    const raw = params.get('company') || '';
    const key = raw.trim().toLowerCase();


    /* ---------- 2b. COMPANY CONTENT ---------- */

    const companyContent = {
        accenture: {
            name: 'Accenture',
            headline: 'Backend & Quality Engineer ready to build with Accenture',
            tag: 'Python · Django · REST APIs · data quality at scale'
        },
        ibm: {
            name: 'IBM',
            headline: 'Backend & Quality Engineer ready to build with IBM',
            tag: 'Python · Django · REST APIs · enterprise data systems'
        },
        nordea: {
            name: 'Nordea',
            headline: 'Backend & Quality Engineer with banking-domain experience',
            tag: 'Mainframe · Snowflake · SQL data validation'
        },
        microsoft: {
            name: 'Microsoft',
            headline: 'Backend & Quality Engineer ready to build with Microsoft',
            tag: 'Python · Django · REST APIs · CI/CD'
        },
        google: {
            name: 'Google',
            headline: 'Backend & Quality Engineer ready to build with Google',
            tag: 'Python · Django · REST APIs · scalable systems'
        }
    };

    const content = companyContent[key];
    const welcomeEl = document.getElementById('companyWelcome');
    const headlineEl = document.getElementById('heroHeadline');
    const tagEl = document.getElementById('heroTag');

    if (content) {
        // if (welcomeEl) { welcomeEl.textContent = `Hello ${content.name} team 👋`; welcomeEl.style.display = 'block'; }
        if (headlineEl) headlineEl.textContent = content.headline;
        if (tagEl) tagEl.textContent = content.tag;
    } else {
        if (welcomeEl) welcomeEl.style.display = 'none';
        if (headlineEl) headlineEl.textContent = 'Software Engineer — Backend & Quality Engineering';
        if (tagEl) tagEl.textContent = 'Python · Django · REST APIs · SQL · CI/CD';
    }


    /* ---------- 3. THEME MAP ---------- */

    const companyThemes = {
        accenture: 'accenture',
        ibm: 'ibm',
        deloitte: 'pritzker',
        jpmorgan: 'pritzker',
        nordea: 'pritzker',
        microsoft: 'tech',
        amazon: 'tech',
        google: 'google'
    };

    const themeFile = companyThemes[key] || 'default';
    const themeLink = document.getElementById('themeStylesheet');
    if (themeLink) {
        themeLink.setAttribute('href', `theme-${themeFile}.css`);
    }


    /* ---------- 4. GOOGLE TRI-COLOR NAME ---------- */

    const defaultNavEl = document.getElementById('navNameDefault');
    const defaultHeroEl = document.getElementById('heroNameDefault');
    const googleNavEl = document.getElementById('navNameGoogle');
    const googleHeroEl = document.getElementById('heroNameGoogle');

    if (key === 'google') {
        // Show Google colored name
        if (defaultNavEl) defaultNavEl.style.setProperty('display', 'none', 'important');
        if (defaultHeroEl) defaultHeroEl.style.setProperty('display', 'none', 'important');
        if (googleNavEl) {
            googleNavEl.removeAttribute('aria-hidden');
            googleNavEl.style.setProperty('display', 'inline', 'important');
        }
        if (googleHeroEl) {
            googleHeroEl.removeAttribute('aria-hidden');
            googleHeroEl.style.setProperty('display', 'block', 'important');
        }
    } else {
        // ALL other companies — lock Google spans off, show plain name
        if (defaultNavEl) defaultNavEl.style.setProperty('display', 'inline', 'important');
        if (defaultHeroEl) defaultHeroEl.style.setProperty('display', 'block', 'important');
        if (googleNavEl) googleNavEl.style.setProperty('display', 'none', 'important');
        if (googleHeroEl) googleHeroEl.style.setProperty('display', 'none', 'important');
    }


    /* ---------- 5. ACCENTURE ">" CURSOR TRAIL ---------- */

    if (key === 'accenture') {
        const TRAIL_COUNT = 8;
        const trail = [];

        for (let i = 0; i < TRAIL_COUNT; i++) {
            const el = document.createElement('div');
            el.textContent = '>';
            el.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 99999;
                font-size: ${18 - i * 1.5}px;
                font-weight: 900;
                color: #a100ff;
                opacity: ${1 - i * (1 / TRAIL_COUNT)};
                transition: transform 0.05s ease;
                user-select: none;
                top: -50px;
                left: -50px;
                mix-blend-mode: multiply;
                font-family: "Segoe UI", Arial, sans-serif;
            `;
            document.body.appendChild(el);
            trail.push({ el, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            trail.forEach((point, i) => {
                const prev = trail[i - 1] || { x: mouseX, y: mouseY };
                point.x += (prev.x - point.x) * 0.35;
                point.y += (prev.y - point.y) * 0.35;
                point.el.style.transform = `translate(${point.x}px, ${point.y}px)`;
            });
            requestAnimationFrame(animateTrail);
        }

        animateTrail();

        document.addEventListener('mouseleave', () => {
            trail.forEach(p => p.el.style.opacity = '0');
        });
        document.addEventListener('mouseenter', () => {
            trail.forEach((p, i) => {
                p.el.style.opacity = String(1 - i * (1 / TRAIL_COUNT));
            });
        });

        document.addEventListener('click', () => {
            trail.forEach(p => {
                p.el.style.color = '#ffffff';
                p.el.style.textShadow = '0 0 12px #a100ff';
                setTimeout(() => {
                    p.el.style.color = '#a100ff';
                    p.el.style.textShadow = 'none';
                }, 300);
            });
        });
    }

});  // end DOMContentLoaded
