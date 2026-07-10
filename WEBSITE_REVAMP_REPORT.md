# Website Revamp — Audit & Change Report

**Date:** 2026-07-10
**Scope:** Full-site audit (Phases 1–10 of the revamp brief) and the first implementation round (Phase 11).
**Rule honoured throughout:** *No doctrinal content was modified.* Every change below is design, accessibility, performance, or navigation infrastructure only.

---

## Part 1 — Site Audit Summary

### Inventory (Phase 1)

| Area | Count | Notes |
|---|---|---|
| Markdown studies | ~43 files (~4.2 MB) | Root guides + `Study_guides/` + `False_Doctrines/` (01–17) |
| HTML study guides | ~30 pages | `Study_guides/`, `Typology/`, `Modern diet and disease/`, etc. |
| Infographics | 17 pages | Consistent Cinzel/EB Garamond gold-parchment design system |
| Interactive tools | 2 | `prophecy_map.html` (Leaflet), `Sign_of_the_times/signs_of_the_times.html` |
| PDFs | ~75 (~180 MB+) | `Additional Reading/`, `History/`, `Supporting Documents/` |
| Videos | ~60 in 7 categories | Driven by `assets/videos.json` |
| App shell | `index.html` + `assets/app.js` (4.1k lines) + `assets/style.css` (2.4k lines) | SPA with sidebar, search, verse lookup, TOC, themes, PWA |

### Page-quality scores (out of 10)

| Page / area | Score | Main strengths / weaknesses |
|---|---|---|
| Home page (index.html) | 8 | Strong hero, study path, clear sections. Weak: cards not keyboard-accessible (fixed), no deep links (fixed) |
| Markdown study reader | 8 | Excellent verse-lookup, TOC, progressive rendering, print CSS. Weak: no reading time/progress (fixed), refresh lost your place (fixed) |
| Sidebar navigation | 7 | Well-organised, searchable. Weak: div-based controls invisible to keyboard/screen readers (fixed) |
| Full-text search | 7 | Real content search with snippets. Weak: slow serial index build (fixed), no Enter-to-open (fixed) |
| Infographics (17) | 8 | Beautiful, consistent, print-aware. Weak: inline CSS duplicated per file; colour-only meaning cues; low-contrast dim text |
| Prophecy map | 7 | Impressive tool, good mobile views. Weak: 215 KB single file, div-based tabs without ARIA, CDN deps uncached (offline-broken) |
| Bible verse modal | 8 | Multi-translation comparison, throttling, fallbacks. Weak: no focus management (fixed) |
| PWA / offline | 6 | Working SW + manifest. Weak: version-skew risk (fixed via network-first shell), CDN assets never cached, icon metadata wrong (fixed) |
| Video library | 7 | Clean cards, lazy embeds. Weak: thumbnails not keyboard-operable (fixed) |
| PDF library | 7 | Sensible native-viewer handling on mobile. Weak: several files >100 MB; spaces/parentheses in filenames are URL-hostile |

### Key structural findings (Phases 2–3)

- **No URL routing existed** — every visit started at Home; studies could not be shared, bookmarked, or survive a refresh. This was the single biggest usability gap for serious Bible study. *(Now implemented.)*
- Cross-referencing between studies works well (`.md` links resolve through the SPA; `prophecy_map` deep-links now land correctly thanks to legacy-hash support).
- Content organisation is logical (14 themed sections), though several folders hold a single file.
- Housekeeping items (not changed, recommended): duplicate images in `Study_guides/images/` (many "- Copy (2)" chains), duplicate `History of Sabbath Observance.pdf` in two folders, spaces/`&`/parentheses in file names, `Quotes_regarding…md` has a broken `../Commandments.md` link and no H1, `salvation_assurance.html` references Google Fonts it never loads, `Supporting Documents/Sabbath History.pdf` (205 MB) and `Quote 52` (163 MB) exceed GitHub's 100 MB limit.

---

## Part 2 — Changes Implemented (Phase 11)

### 1. Deep linking & browser history (`assets/app.js`)
**What:** Every document now records itself in the URL as `#doc=<path>`. Opening a link with that hash (or a legacy `#<path>` link, as used by `prophecy_map.html`) loads the study directly. Back/forward buttons navigate between studies; Home clears the hash. Full-page tools (prophecy map, signs of the times) are deliberately excluded to avoid a back-button redirect loop.
**Why:** Studies could not be shared or bookmarked, and a refresh lost the reader's place.
**Usability:** Major — shareable studies, working back button, refresh-safe reading.

### 2. Keyboard & screen-reader accessibility (`app.js`, `index.html`)
**What:** All generated controls — sidebar nav items, collapsible section headers (now with `aria-expanded`), topic cards, study-path steps, continue-reading card, search results, video thumbnails, sidebar logo — are focusable (`tabindex="0"`), have roles, and respond to Enter/Space. Icon-only buttons got `aria-label`s; decorative emoji are `aria-hidden`. The verse modal now moves focus to its close button on open and returns focus to the originating reference on close. The search box is a labelled `type="search"` input; Enter opens the first result, Escape dismisses the panel.
**Why:** The entire navigation was built from click-only `<div>`s — unusable by keyboard or assistive technology.
**Accessibility:** Major — the whole library is now operable without a mouse.

### 3. Reduced motion & focus visibility (`assets/style.css`)
**What:** A `prefers-reduced-motion` block completes all animations instantly and guarantees content visibility (scroll-reveal cards can never stay hidden). A consistent gold `:focus-visible` ring was added for every interactive element; `::selection` styled; multi-line headings use `text-wrap: balance`.
**Why:** Motion-sensitive readers had no opt-out; keyboard users had no visible focus.
**Accessibility:** Meets WCAG 2.3.3 / 2.4.7 expectations for these areas.

### 4. Reading tools (`index.html`, `app.js`, `style.css`)
**What:** A thin gold reading-progress bar under the top bar tracks scroll position while a study is open (rAF-throttled). Each markdown study shows "≈ N min read · N words" above the title.
**Why:** Long studies (some 50+ min) gave no sense of length or position — important for planning long study sessions.
**Usability:** Better orientation in long-form reading; no distraction (single 3px line).

### 5. Performance (`index.html`, `app.js`)
**What:**
- CDN scripts (`marked`, `DOMPurify`, FUMS) and `app.js` now load with `defer` + `preconnect` hints — HTML parsing is no longer blocked.
- Startup no longer waits for a serial network waterfall: the UI paints immediately from the static catalog, then source-PDF discovery, infographic discovery, and the video library load **in parallel** and refresh the sidebar once.
- The full-text search index now fetches with 4-way concurrency instead of one file at a time (~4× faster to become searchable).
- Body text bumped 16→17px desktop / 15→16px mobile for comfortable long reads (measure stays ~75 characters).
**Performance:** Faster first paint, faster time-to-interactive sidebar, faster search readiness.

### 6. PWA hardening (`sw.js`, `manifest.json`, `index.html`)
**What:** Cache bumped to `babylons-wine-v5`. The app shell (`index.html`, `app.js`, CSS) is now **network-first** (falls back to cache offline) instead of stale-while-revalidate, eliminating the "old shell + new content" version-skew after deploys. Documents keep stale-while-revalidate for instant repeat reads. Manifest icon metadata fixed (one scalable SVG declared honestly with `sizes: "any"`) and `scope` added. Asset URLs re-versioned (`?v=20260710`).
**Why:** Returning visitors could be served an outdated app for one extra visit; the manifest declared a 512×512 icon that didn't exist.
**Performance/Reliability:** Deploys reach users immediately; offline behaviour unchanged for content.

### 7. Semantics polish (`index.html`)
**What:** Footer "links" are real `<button>`s; `color-scheme` meta added; theme now defaults to the visitor's system preference (`prefers-color-scheme`) when they haven't chosen one.
**Why:** Span-with-onclick is invisible to keyboards; respecting OS theme is expected modern behaviour.

### Verification
- `node --check` passes on `app.js` and `sw.js`; `manifest.json` parses.
- Automated jsdom boot test against a live local server: **13/13 checks pass** — app boots with zero errors, 237 nav items + 120 cards generated with keyboard access and ARIA, deep-link hash set on document open and cleared on Home, markdown renders, reading time and progress bar appear.
- All key URLs return 200 via `python -m http.server`.

---

## Part 3 — Recommended Next Steps (not yet implemented)

Ranked by value vs. effort:

1. **Content housekeeping** (low effort): delete "- Copy" image duplicates, fix the broken `../Commandments.md` link, add the missing Google Fonts link to `salvation_assurance.html`, deduplicate the twice-stored Sabbath Observance PDF.
2. **Rename URL-hostile files** (medium): spaces/`&`/`()` in `Supporting Documents/` and folder names; update the JSON manifests to match. Reduces broken-link risk on GitHub Pages.
3. **Oversized PDFs** (medium): `Sabbath History.pdf` (205 MB) and `Quote 52` (163 MB) exceed GitHub's 100 MB limit — split, compress, or host externally.
4. **Scripture index page** (medium): a generated index mapping Bible books/chapters → studies that cite them, using the existing verse-reference detector. The single best study-flow feature not yet present.
5. **Infographic shared stylesheet** (medium): extract the duplicated `:root` palette into one CSS file to stop drift.
6. **Map/worldmap offline + resilience** (medium): self-host Leaflet/D3 (or add SRI + SW caching for those origins).
7. **Prophecy-map accessibility** (higher effort): ARIA tabs, keyboard country list, contrast fixes for `#5c6580` text.
8. **Bookmarks & personal notes** (higher effort): localStorage-based verse/section bookmarks with an export option.
