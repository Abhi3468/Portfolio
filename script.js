// =========================================================
//  script.js  — Abhishek R portfolio
//  1. Core behavior: mobile nav, footer year, scroll reveal
//  2. Company CONTENT personalization (?company=)
//  3. Theme map
//  4. Google tri-color name toggle
//  5. Accenture animated ">" cursor trail
// =========================================================

(() => {
    const initPortfolio = () => {
        /* ---------- 1. CORE BEHAVIOR ---------- */
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('open');
                hamburger.classList.toggle('open');
            });
        }

        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

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
        const requestedCompany = raw.trim().toLowerCase();
        const aliases = {
            'goldman-sachs': 'goldmansachs',
            'goldman sachs': 'goldmansachs',
            goldman: 'goldmansachs',
            gs: 'goldmansachs'
        };
        const key = aliases[requestedCompany] || requestedCompany;

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
            ey: {
                name: 'EY',
                headline: 'Backend & Quality Engineer ready to build with EY',
                tag: 'Python · Django · REST APIs · enterprise data systems'
            },
            microsoft: {
                name: 'Microsoft',
                headline: 'Backend & Quality Engineer ready to build with Microsoft',
                tag: 'Python · Django · REST APIs · CI/CD'
            },
            amazon: {
                name: 'Amazon',
                headline: 'Backend & Quality Engineer ready to build with Amazon',
                tag: 'Python · Django · REST APIs · scalable customer-first systems'
            },
            google: {
                name: 'Google',
                headline: 'Backend & Quality Engineer ready to build with Google',
                tag: 'Python · Django · REST APIs · scalable systems'
            },
            cisco: {
                name: 'Cisco',
                headline: 'Backend & Quality Engineer ready to build with Cisco',
                tag: 'Python · Django · REST APIs · network infrastructure'
            },
            deloitte: {
                name: 'Deloitte',
                headline: 'Backend & Quality Engineer ready to build with Deloitte',
                tag: 'Python · Django · REST APIs · enterprise data solutions'
            },
            visa: {
                name: 'Visa',
                headline: 'Backend & Quality Engineer ready to build with Visa',
                tag: 'Python · Django · REST APIs · secure digital payments'
            },
            infosys: {
                name: 'Infosys',
                headline: 'Backend & Quality Engineer ready to build with Infosys',
                tag: 'Python · Django · REST APIs · AI-first digital transformation'
            },
            capgemini: {
                name: 'Capgemini',
                headline: 'Backend & Quality Engineer ready to build with Capgemini',
                tag: 'Python · Django · REST APIs · digital transformation'
            },
            oracle: {
                name: 'Oracle',
                headline: 'Backend & Quality Engineer ready to build with Oracle',
                tag: 'Python · Django · REST APIs · enterprise database systems'
            },
            goldmansachs: {
                name: 'Goldman Sachs',
                headline: 'Backend & Quality Engineer ready to build with Goldman Sachs',
                tag: 'Python · Django · REST APIs · reliable financial systems'
            }
        };

        const content = companyContent[key];
        const welcomeEl = document.getElementById('companyWelcome');
        const headlineEl = document.getElementById('heroHeadline');
        const tagEl = document.getElementById('heroTag');

        // The initial loader selects the stylesheet before paint. Do not replace it
        // here: doing so previously made the Goldman Sachs route fall back to default.
        if (welcomeEl) welcomeEl.style.display = 'none';
        if (headlineEl) headlineEl.textContent = content
            ? content.headline
            : 'Software Engineer — Backend & Quality Engineering';
        if (tagEl) tagEl.textContent = content
            ? content.tag
            : 'Python · Django · REST APIs · SQL · CI/CD';

        /* ---------- 3. COMPANY-SPECIFIC NAME TREATMENT ---------- */
        const defaultNavEl = document.getElementById('navNameDefault');
        const defaultHeroEl = document.getElementById('heroNameDefault');
        const googleNavEl = document.getElementById('navNameGoogle');
        const googleHeroEl = document.getElementById('heroNameGoogle');
        const goldmanNavEl = document.getElementById('navNameGoldman');
        const goldmanHeroEl = document.getElementById('heroNameGoldman');

        if (key === 'google') {
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
        } else if (key === 'goldmansachs') {
            if (defaultNavEl) defaultNavEl.style.setProperty('display', 'none', 'important');
            if (defaultHeroEl) defaultHeroEl.style.setProperty('display', 'none', 'important');
            if (googleNavEl) googleNavEl.style.setProperty('display', 'none', 'important');
            if (googleHeroEl) googleHeroEl.style.setProperty('display', 'none', 'important');
            if (goldmanNavEl) {
                goldmanNavEl.removeAttribute('aria-hidden');
                goldmanNavEl.style.setProperty('display', 'inline-flex', 'important');
            }
            if (goldmanHeroEl) {
                goldmanHeroEl.removeAttribute('aria-hidden');
                goldmanHeroEl.style.setProperty('display', 'block', 'important');
            }
        } else {
            if (defaultNavEl) defaultNavEl.style.setProperty('display', 'inline', 'important');
            if (defaultHeroEl) defaultHeroEl.style.setProperty('display', 'block', 'important');
            if (googleNavEl) googleNavEl.style.setProperty('display', 'none', 'important');
            if (googleHeroEl) googleHeroEl.style.setProperty('display', 'none', 'important');
            if (goldmanNavEl) goldmanNavEl.style.setProperty('display', 'none', 'important');
            if (goldmanHeroEl) goldmanHeroEl.style.setProperty('display', 'none', 'important');
        }

        /* ---------- 4. ACCENTURE ">" CURSOR TRAIL ---------- */
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

        document.body.classList.add('ready');
    };

    initPortfolio();
})();
