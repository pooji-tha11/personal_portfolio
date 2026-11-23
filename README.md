# Poojitha Ramkumar — Personal Portfolio

A distinctive, editorial, and interactive personal portfolio website for **Poojitha Ramkumar**, second-year B.E. Computer Science and Engineering student at **Chennai Institute of Technology (CIT)** (2025–2029).

Built entirely with pure, vanilla web technologies—**no frameworks, no bundlers, and zero build steps**.

---

## 🎨 Visual Direction & Design Philosophy

The site departs from generic developer templates and SaaS dashboards, favoring a warm, tactile, editorial aesthetic that balances personality with engineering discipline:

* **Warm Editorial Palette**:
  * `--bg-ivory`: `#F4EBDD` (Warm Ivory — primary page background)
  * `--bg-sand`: `#E5D7C3` (Soft Sand — cards & alternate sections)
  * `--text-espresso`: `#29231F` (Deep Espresso — primary typography & dark sections)
  * `--accent-terracotta`: `#A66B4F` (Muted Terracotta — sparing accent)
  * `--text-taupe`: `#88796B` (Warm Taupe — secondary text)
  * `--border-caramel`: `#C6A98B` (Dusty Caramel — borders, hairlines & dividers)
  * Contrast-safe dark tokens: Terracotta Dark (`#8E5A41`) and Taupe Dark (`#6B5D51`) ensuring WCAG AA readability.
* **Typography**:
  * **Display**: *Fraunces* (Google Fonts variable serif, pairing upright and italic weights)
  * **Body**: *Manrope* (clean, highly readable modern sans)
  * **Code / Terminal**: *JetBrains Mono* (monospaced diagnostics and code blocks)
* **Subtle Noise Texture**: An inline SVG fractal noise filter (`feTurbulence`) creates a gentle analog paper grain across the viewport without external image assets.
* **Rhythm**: Alternates warm ivory/sand surfaces with deep espresso sections (`#29231F`) to create deliberate visual pacing.

---

## ✨ Key Features & Interactive Architecture

### 1. Retro Desktop Computer Loading Screen (`#intro-screen`)
* **Vector Illustration**: Rendered entirely with an inline SVG retro desktop computer (sand chassis, espresso outlines, caramel keyboard, terracotta power button).
* **3D Perspective Tilt**: Tracks pointer coordinates via CSS 3D perspective (`rotateX`, `rotateY`) with dynamic mouse cord drifting.
* **Tactile Keyboard Dips**: Pressing any keyboard key depresses a key on the drawn SVG keyboard with visual feedback.
* **Stepped Boot Sequence**: Powering on triggers a terracotta glowing LED, scanline CRT illumination, stepped diagnostic boot logs (`Memory OK`, `Loading skills...`, `Starting portfolio...`), and an 8-bit stepped progress bar.
* **Camera Zoom Transition**: Clicking *"Open portfolio"* (or pressing `Enter`) zooms into the CRT monitor screen until it fills the window, smoothly fading into the portfolio. Includes an accessible *"Skip intro"* link and reduced-motion bypass.

### 2. Hero Section (`#home`)
* **Decryption Animation**: Hero display title (*Poojitha Ramkumar*) resolves from randomized glyphs left-to-right.
* **Euclidean Proximity Physics**: As the cursor nears individual letters, they dynamically elevate (`translateY`), scale up, increase font weight, and shift to terracotta without relying on variable font axes.
* **Marquee Velocity Ticker**: Continuous horizontal ticker (`cybersecurity • web development • artificial intelligence • open source • backend • Linux`) that accelerates and skews with scroll velocity using `requestAnimationFrame`.

### 3. About Section (`#about`)
* **Illuminated Reading**: Paragraph words progressively light up from muted taupe to deep espresso as the user scrolls through the narrative.
* **Arch Portrait Monogram**: Soft sand arch placeholder with dashed inner border and scroll-linked parallax translation.
* **Skills Tiles with Cursor Glow**: Technical categories with staggered chips and a cursor-following terracotta radial glow on hover (`--mouse-x`, `--mouse-y`).
* **Unboxed Hackathons**: Clean, open list with hairline dividers for rapid extensibility as future hackathons are added.

### 4. Featured Projects Stacking Panels (`#work`)
Desktop stacking panels that pin with `position: sticky` and scale down/dim as the next panel arrives:
1. **Cozy Pomodoro** (*Deployed*): Focus timer with customizable intervals, task panel, session history, and dark mode. Features a statically centered SVG circular progress ring and live deployment link.
2. **Cyber Security Assessment Toolkit** (*In Progress, Deep Espresso*): Flask-based modular security suite. Includes an **in-browser live demo** calculating instant cryptographic SHA-256 hashes via `crypto.subtle.digest` and a dynamic password complexity meter.
3. **PrepSphere** (*In Progress*): Comprehensive placement preparation tracker with animated topic mastery bars.

### 5. Smaller Things & Explorations Timeline
An interactive roadmap timeline inspired by GDG CIT:
* Straight SVG timeline track connecting milestone nodes.
* **Node 01**: **Python Web Scraping** (`Python • Requests • BeautifulSoup • MySQL`)
* **Node 02**: **FastAPI Blog API** (`FastAPI • SQLite • SQLAlchemy • Pydantic`)
* Tapping or hovering nodes highlights the node with a terracotta glowing ring and smoothly transitions the showcase detail card.

### 6. Experience Timeline (`#experience`)
* Dark espresso section with a dynamic self-drawing vertical progress line that draws downward as you scroll.
* Chronologically organized entries:
  * **AI Developer Intern** — Infologia Technologies Pvt. Ltd. (Ticketing system research & architecture)
  * **Prompt Engineer Intern** — InAmigos Foundation (Prompt structuring & STAR framework)
  * **Technical Member** — FOSS Club at CIT (Linux workshops & open-source advocacy)
  * **Software Developer Intern** — LambdaDigital (React & FastAPI full-stack integration)

### 7. Education & Certifications (`#education`)
* **Education Cards**:
  * **Bachelor of Engineering (CSE)** — Chennai Institute of Technology (2025–2029)
  * **Higher Secondary (11th & 12th)** — Narayana e-Techno School, Pallavaram (86.0% in 12th Boards)
  * **Secondary School (9th & 10th)** — Narayana e-Techno School, Medavakkam (92.2% in 10th Boards)
* **Certifications**: Hover-fill espresso rows covering Oracle Cloud Infrastructure AI Foundations Associate, NPTEL Ethical Hacking, and Deloitte Cyber Job Simulation.

### 8. Header & Tab Bar Branding
* **Browser Tab Bar (Favicon)**: Custom SVG favicon (`assets/favicon.svg`) rendering `<pr>` in Deep Espresso, Dusty Caramel, and Terracotta.
* **Navigation Header**: Left-aligned `<pr>` badge, sliding pill nav indicator tracking the active section, and an "Open CV" button that automatically floats to the bottom-right corner on mobile viewports (<820px).

---

## 📁 File Structure

```
/Users/poojitha/Portfolio/
├── index.html                           # Semantic HTML5 markup, inline retro PC SVG & content
├── styles.css                           # Complete design tokens, responsive rules & animations
├── script.js                             # Vanilla JS (boot, proximity, crypto demo & timeline)
├── README.md                            # Comprehensive project documentation
└── assets/
    ├── favicon.svg                      # Custom vector <pr> browser tab favicon
    └── Poojitha_Ramkumar_Resume.pdf     # Single-page professional vector PDF resume
```

---

## 🚀 Running Locally

Because this project is built as a static site without dependencies, you can run it immediately without `npm install` or build steps:

### Option A: Using Python's built-in HTTP server
```bash
# In the project directory:
python3 -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option B: Direct Browser Launch
Simply double-click [index.html](file:///Users/poojitha/Portfolio/index.html) or open it directly in Google Chrome, Safari, Firefox, or Microsoft Edge.

---

## ♿ Accessibility & Quality Standards

* **Semantic HTML**: Fully structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
* **Keyboard Navigation**: All interactive elements (retro power button, journey nodes, project links, skip link) are fully focusable with visible `:focus-visible` outlines.
* **Prefers-Reduced-Motion**: Respects user OS preferences by bypassing the intro screen, camera zooms, letter scrambles, and velocity skews.
* **Zero Horizontal Overflow**: Fluid typography (`clamp()`), flex wrapping, and responsive container constraints prevent unwanted horizontal scrolling across all viewports.
* **Safe External Links**: All external links include `target="_blank"` and `rel="noopener"`.

---

## 📬 Contact & Profiles

* **GitHub**: [github.com/pooji-tha11](https://github.com/pooji-tha11)
* **LinkedIn**: [linkedin.com/in/poojitha-ramkumar](https://www.linkedin.com/in/poojitha-ramkumar/)
* **Email**: [poojitharamk11@gmail.com](mailto:poojitharamk11@gmail.com)

---

&copy; 2026 Poojitha Ramkumar, Chennai
