# Aarthi — Portfolio

A minimal, fast, fully static portfolio. No build step, no framework, no dependencies.
Open `index.html` or drop the folder on any host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Run locally
```
python3 -m http.server 8000
# visit http://localhost:8000
```

## Structure
```
index.html              # Home: hero, industries, worked-with, work, approach, experiments, testimonials, contact
about.html              # About: story, experience timeline, skill/tool chips
work/swish.html         # Case study — Swish (placeholder content)
work/kaching.html       # Case study — Kaching (placeholder content)
work/breadcrumb.html    # Case study — Breadcrumb (real product content; needs images + metrics)
assets/css/style.css    # Global styles + light/dark theme
assets/css/case.css     # Case-study-only styles
assets/js/main.js       # Theme toggle, scroll reveal, testimonial carousel
assets/img/             # Drop real images here
```

## ⚠️ Cache-busting — IMPORTANT when editing CSS
The stylesheet links use a version query, e.g. `style.css?v=4`. Browsers cache CSS aggressively;
**whenever you change a `.css` file, bump the number** (`?v=4` → `?v=5`) in every HTML `<link>` so the
change actually shows up. Otherwise a refresh may keep serving the old styles.

## Punch-list — replace before publishing
1. **Testimonials (2 fake)** — `index.html` has 2 placeholder quotes with `Replace · Name`. Ean Lee's is real; replace or delete the other two. The carousel counter/dots auto-adjust.
2. **Images (13 slots)** — search the HTML for `Replace —`. Project heroes, case-study covers/figures, and the About portrait are gradient placeholders. To swap: replace the placeholder `<div>`/`<figure>` block with `<img src="assets/img/your-file.png" alt="...">`.
3. **Breadcrumb metrics + research** — `work/breadcrumb.html` has `Replace with` markers in the Research and Outcome sections. Add real findings/numbers.
4. **Other case-study content** — Swish & Kaching are well-structured but their narratives/metrics are realistic *placeholders*. Replace with your real stories, or repoint them to live case studies.
5. **Links** — set real `href`s for `data-replace="linkedin"` and `data-replace="resume"` (drop the résumé PDF in e.g. `assets/Aarthi-Resume.pdf`). Update the email `hello@aarthi.design`.
6. **Worked-with logos** — the wall is text; swap each `<li>` for a real SVG logo when you have them.
7. **OG image** — add `assets/img/og.png` (1200×630) and uncomment the `og:image` line in `index.html` for sharp link previews.

## Tweaking the look
- **Accent colour:** `--accent` in `assets/css/style.css` (set in `:root`, `[data-theme="dark"]`, and `.testimonials`). Currently a vermilion `#ff4d2e` / `#ff5b3d` (dark). Remember to bump `?v=`.
- **Fonts:** Bricolage Grotesque (display) + Schibsted Grotesk (body) + Instrument Serif (italic accent) via the Google Fonts `<link>`.
- All spacing/colour tokens are CSS variables at the top of `style.css`.
