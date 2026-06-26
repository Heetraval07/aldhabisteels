# Al Dhabi Steel LLC — Official Website

A premium corporate website for **Al Dhabi Steel LLC**, a leading steel fabrication company in the UAE with 25+ years of expertise. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

🌐 **Live site:** [https://heetraval07.github.io/aldhabisteel](https://heetraval07.github.io/aldhabisteel)

---

## Project Structure

```
aldhabisteel/
├── index.html                      # Main landing page
├── general-solutions.html          # General Solutions gallery page
├── customized-manufacturing.html   # Customized Manufacturing gallery page
├── drainage-solutions.html         # Drainage Solutions gallery page
├── fitout-solutions.html           # Fitout Solutions gallery page
├── kitchen-solutions.html          # Kitchen Solutions gallery page
│
├── css/
│   ├── styles.css                  # Main stylesheet (landing page)
│   └── solution-page.css          # Shared styles for all solution pages
│
├── js/
│   ├── main.js                     # Landing page JavaScript
│   └── solution-page.js           # Shared JS for all solution pages
│
├── images/
│   ├── logo.png                    # Company logo
│   ├── hero-1.jpg / hero-2.jpg / hero-3.jpg
│   ├── Slide-images/
│   │   ├── General Solutions/
│   │   ├── Cutomized Manufacturing/
│   │   ├── Drainage Solutions/
│   │   ├── Fitout Solutions/
│   │   └── Kitchen Solutions/
│   └── ...project & certificate images
│
└── videos/
    └── hero-bg.mp4                 # Hero background video (optional)
```

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page — hero, about, services, portfolio, projects, why us, certificates, client reviews, contact |
| `general-solutions.html` | Full image gallery for General Solutions |
| `customized-manufacturing.html` | Full image gallery for Customized Manufacturing |
| `drainage-solutions.html` | Full image gallery for Drainage Solutions |
| `fitout-solutions.html` | Full image gallery for Fitout Solutions |
| `kitchen-solutions.html` | Full image gallery for Kitchen Solutions |

---

## Features

- **Responsive design** — mobile, tablet, and desktop
- **Hero carousel** — 3-image auto-rotating background with Ken Burns effect
- **Scroll animations** — Intersection Observer–based fade/slide-in
- **Portfolio grid** — 5 solution cards with hover overlay and logo badge
- **Solution gallery pages** — full-screen lightbox with keyboard, swipe, and click-outside-to-close
- **Client Reviews carousel** — autoplay, infinite loop, swipe support, submit form
- **Certificates modal** — click to expand certificate images
- **Contact form** — validated enquiry form
- **Floating WhatsApp button**
- **Custom animated cursor** (desktop only)
- **No external JS libraries** — 100% vanilla JavaScript

---

## Hosting on GitHub Pages

1. Push this repository to GitHub (already configured at `origin`)
2. Go to **Settings → Pages** in your GitHub repository
3. Under **Source**, select branch `main` and folder `/ (root)`
4. Click **Save** — your site will be live at `https://<your-username>.github.io/aldhabisteel`

> **Note:** GitHub Pages serves static files directly. No build step is needed.

---

## Local Development

Just open `index.html` in any modern browser — no build tools required.

```bash
# If you want a local server (optional, avoids some browser CORS quirks):
npx serve .
# or
python -m http.server 8080
```

---

## Technologies

| Layer | Tech |
|-------|------|
| Markup | HTML5 (semantic, ARIA) |
| Styling | CSS3 — custom properties, Grid, Flexbox, `clamp()` |
| Scripting | Vanilla JavaScript ES6+ |
| Fonts | Google Fonts — Sora + IBM Plex Sans |
| Images | WebP, JPEG, PNG |

---

## Browser Support

Chrome · Firefox · Safari · Edge · iOS Safari · Chrome Mobile

---

## License

Proprietary — © 2025 Al Dhabi Steel LLC. All rights reserved.
