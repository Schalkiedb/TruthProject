# Website Revamp — Audit & Change Report

**Date:** 2026-07-10 (Round 1) · 2026-07-14 (Rounds 2 & 3)
**Scope:** Full-site audit (Phases 1–10 of the revamp brief) and three implementation rounds (Phase 11).
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

## Part 2b — Round 2 Changes (2026-07-14)

### 8. Shared infographic stylesheet (`assets/infographics-theme.css` + all 17 `infographics/*.html`)
**What:** The canonical palette was extracted into one shared stylesheet, linked in every infographic's `<head>` before its inline styles. Two token families exist (the numbered infographics use `--gold: #C9A84C`; infographics 11b–14 use `--gold: #C8A84A` with `--ink`/`--text` tokens), so family B is scoped to a `.ig-theme-b` class on those four files' `<html>` element — this prevents token leakage into files that use the same names differently. Per-file `:root` declarations were deleted **only where the value exactly matches** the shared file; differing values remain as intentional per-file overrides (e.g. infographic1's `--parchment: #F4ECD8`). Files with unique palettes (8, 11, worldmap; 9 and 10 use no variables) received only the link.
**Why:** The palette was duplicated in 17 files and had already begun to drift.
**Maintainability:** New infographics can now rely on the shared tokens; existing pages render pixel-identically.

### 9. Self-hosted map libraries (`assets/vendor/`, `prophecy_map.html`, `infographics/worldmap.html`, `sw.js`)
**What:** Leaflet 1.9.4 (CSS+JS), Leaflet.markercluster 1.5.3 (2 CSS + JS), D3 7.8.5, topojson 3.0.2, and the world-atlas `countries-110m.json` (~600 KB total) are now served from `assets/vendor/` instead of unpkg/cdnjs/jsdelivr. Both map pages reference the local copies; the service worker (cache v6) precaches them plus `prophecy_map.html` and `live-events.js`.
**Why:** The service worker only caches same-origin requests, so every CDN dependency made the maps completely non-functional offline and a single point of failure if a CDN was blocked or down.
**Reliability:** The prophecy map and world map now load offline (the CARTO basemap tiles remain online-only — country data, markers, and panels all work without them being fresh). No more third-party JS supply-chain exposure for these pages.

### 10. Prophecy-map accessibility (`prophecy_map.html`)
**What:**
- **Contrast:** all 15 uses of `#5c6580` text (≈2.9:1 against the dark background — WCAG AA fail) replaced with `#7f89a8` (≈5:1), preserving the muted-text hierarchy.
- **ARIA tabs:** the desktop country-detail tabs implement the WAI-ARIA tabs pattern (`role="tablist"/"tab"/"tabpanel"`, `aria-selected`, roving `tabindex`, Arrow/Home/End key navigation). The mobile detail tabs got the same pattern.
- **Keyboard operability:** category filter chips (`aria-pressed` toggle buttons), live-feed filter pills, the Live Feed button, and every row of the mobile country list are now focusable and respond to Enter/Space, with country rows labelled "Name — Alert level" for screen readers.
- **Focus visibility & reduced motion:** a gold `:focus-visible` ring and a `prefers-reduced-motion` block were added, matching the main site.
**Why:** The entire map UI was mouse-only `<div>`s with sub-AA contrast.
**Accessibility:** The map is now navigable end-to-end by keyboard and announces its state to assistive technology.

### 11. Bookmarks & personal notes (`assets/app.js`, `index.html`, `assets/style.css`)
**What:** A complete personal-study layer, stored only in the visitor's browser (localStorage):
- **🔖+ Bookmark button** (top bar, appears while reading a study): saves the document, the nearest heading above the current position, and the exact scroll offset; confirms with a small toast.
- **🔖 Bookmarks & Notes panel** (top bar, always available): lists all bookmarks (click to jump straight back to that heading — works with progressive rendering via a short retry loop; delete per item), a per-document **notes textarea** that auto-saves as you type, and a list of every other document that has notes.
- **Export:** one click downloads everything as `study-bookmarks-notes.json` (re-importable/archivable) or as a formatted plain-text file.
- Panel follows the dialog pattern: Escape closes, focus moves in on open and returns on close; all new UI is excluded from print output.
**Why:** Serious study sessions span days; readers had no way to mark passages or keep notes alongside the material.
**Usability:** Major for returning students. No document content is ever modified — notes live entirely outside the texts.

### Round 2 verification
- `node --check` passes on `app.js` and `sw.js`; zero remaining `unpkg`/`cdnjs`/`jsdelivr` references in the two map pages; all 17 infographics link the shared theme (verified per-token that every deleted declaration is re-provided with an identical value).
- Automated jsdom boot test extended to 21 checks: **21/21 pass** — including bookmark save, panel open/list/close, note auto-save, and button visibility toggling between reader and home views.
- All new URLs (theme CSS, vendor libraries, both map pages) return 200 from the local server.

---

## Part 2c — Round 3 Changes (2026-07-14)

### 12. URL-safe source-document filenames (`Supporting Documents/`, manifests, Quotes study)
**What:** All 107 files in `Supporting Documents/` with URL-hostile names (spaces, `&`, `()`, `'`, commas, non-breaking spaces, and mojibake characters like `�`) were renamed via `git mv` (history preserved) to clean underscore/hyphen names — e.g. `Quote 32 & Quote 33 - ADoctrinalCatechism.pdf` → `Quote_32_and_Quote_33-ADoctrinalCatechism.pdf`. The manifest was regenerated (`scripts/generate_source_manifest.py`), and all 98 source-document links inside the Quotes study were rewritten to the new names — including links that used full percent-encoding and links containing parentheses (matched with a balanced-paren parser + fuzzy name matching).
**Verification:** every one of the 108 manifest entries returns HTTP 200; 95 of 98 links in the Quotes study resolve. The 3 that don't are **pre-existing broken links** whose target files never existed in the repo or the Drive folder: `Quote 8 - Dies Domini…(Catholicism.org).png`, `Quote 8 - Dies Domini… entire article.pdf`, and `Quote 14 - Forbidden Sunday and Feast-Day Occupations.pdf` (only the `.md` and page images exist for Quote 14).
**Note:** the folder name `Supporting Documents/` itself was kept — a space in a folder name is handled cleanly by URL-encoding everywhere it's used, and renaming it would have touched dozens of references for no practical gain. The genuinely dangerous characters were all in the filenames.

### 13. Oversized PDFs → Google Drive (`assets/app.js`, `.gitignore`, `.gitattributes`, generator)
**What:** The two files over GitHub's hard 100 MB limit are now served from the owner's public Google Drive folder:
- `Sabbath History.pdf` (205 MB) — was gitignored, so it 404'd on the live site while still appearing in the manifest (a broken card).
- `Quote 52 - The_Catholic_Encyclopedia.pdf` (163 MB) — was in Git LFS, which GitHub Pages serves as a useless pointer file (also effectively broken).
Both were removed from git tracking/LFS (`.gitattributes` cleared, `.gitignore` updated), excluded from the manifest generator, and added to the library as ☁️ "Drive PDF" entries that open in a new tab. The Quote 52 link inside the Quotes study now points to Drive as well. Local copies remain on disk untouched.
**Hosting recommendation (as asked):** keep everything under ~50 MB on GitHub Pages (same-origin, works in the in-app viewer, cacheable offline); use Google Drive for anything above that. Drive is well suited to big documents — free, reliable, streams large PDFs in its own viewer — with two caveats: files open in a new tab rather than the in-app frame, and if a file is ever re-uploaded (not "Manage versions → replace") its ID changes and the link must be updated. The full Drive folder mapping (111 file IDs) was captured during this work, so extending Drive fallback to more files later is easy.

### 14. Scripture Index (`assets/app.js`, `index.html`, `assets/style.css`)
**What:** A new **📇 Scripture Index** tool (first card under Interactive Tools, also in the sidebar, deep-linkable as `#doc=__scripture-index__`). It reuses the existing verse-reference detector to scan the full text of every markdown study (piggybacking on the search-index fetch pass — no build step, always current) and maps **every Bible book → the studies that cite it**, grouped Old/New Testament with total citation counts. Selecting a book reveals the studies ranked by citation count, each showing its section and the chapters cited; clicking opens the study, where every bold reference remains clickable for multi-translation comparison. Fully keyboard-accessible.
**Result on current content:** 64 of 66 Bible books are cited somewhere in the library; Daniel alone is referenced in 26 studies.
**Why:** This was the top-ranked missing study-flow feature — it lets a reader start from Scripture ("what does this library say about Joel?") instead of from the catalog.

### 15. Dead-link repair in the Quotes study (owner-confirmed)
**What:** The three remaining dead links in the Source Document Reference Table were fixed per the owner's clarification:
- **Row 8** wrongly credited "Dies Domini" to the Catholic Universe Bulletin quote — it now links the two Catholic Universe Bulletin page images that actually exist (Dies Domini remains correctly attached to Quote 10, which shares the Quote 39 PDF).
- **Row 14** linked a PDF that never existed — it now links the actual cover + page 1 + page 2 scans of *Forbidden Sunday and Feast-Day Occupations*.
**Verification:** all 95 source-document links in the Quotes study now resolve with HTTP 200 — zero broken links remain.

### 16. Drive fallbacks for the remaining large PDFs (`assets/app.js`, `assets/style.css`)
**What:** The three 60–85 MB PDFs that still ship via GitHub (Quote 35 — Sunday Visitor, Quote 49 — Patrologiæ Cursus Completus, The Catholic Educator) now show a banner above the in-app PDF viewer: "☁️ Large document… Open it on Google Drive ↗", using the Drive file IDs captured from the shared folder. The GitHub copy remains the primary (loads in-app, works offline once cached); Drive is the escape hatch for slow connections or serving failures.

### 17. Bible Symbol highlighter & swapper (`assets/app.js`, `assets/style.css`)
**What:** A study aid built directly on `Study_guides/Bible_Symbols_Chart.md` — the chart is parsed at runtime, so editing the chart automatically updates the feature (no code changes needed). Inside quoted Bible passages (blockquotes in study guides, the inline verse previews, and the translation-comparison modal):
- **Highlighting:** words that appear in the symbols chart ("woman", "beast", "waters", "horn", "Lord's Day"…) are marked in blue with a dotted underline. Hovering, tapping, or keyboard-focusing shows a tooltip with the symbol's biblical meaning and the supporting Scripture references. Symbols with multiple senses (e.g. Woman — Pure vs Corrupt) show every sense.
- **Symbolic reading (swapper):** every passage containing symbols gets a "🔁 Symbolic reading" toggle that renders the passage again underneath with each symbol replaced by its meaning (e.g. *woman* → *the true, faithful church of God*), substitutions highlighted and still hoverable, with the original verse untouched above and a link to the full chart.
Multi-word symbols match correctly (longest-first, so "white robes" wins over "white"), plural/singular variants are handled, and matching is scoped to quoted passages only, so ordinary prose isn't cluttered.

**Context-aware interpretation (owner-directed refinement):** the chart's *Scriptural References* column is treated as each sense's "applies-in" scope. The passage's book+chapter (detected from the reference in the quote/preview/modal) is scored against each sense's references — chapter match beats book match beats none — and:
- If a longer matched term doesn't fit the context but a contained term does, the contained term wins: "four beasts" in **Daniel 7** resolves to *Beast = kingdom* (Daniel 7:17), while the same phrase in **Revelation 4** resolves to *Living Creatures* (Revelation 4:6-9).
- Ambiguous symbols pick the right sense by chapter: "woman" in Revelation 12 → *Pure (true church)*; in Revelation 17 → *Corrupt (apostate church)*.
- **The swapper substitutes only on an exact chapter match** (second owner-directed tightening): book-level matches proved too coarse — "the time is at hand" in Revelation 1:3 is literal even though "times" is prophetic in Revelation 12-13. Now "time" swaps in Daniel 7 and Revelation 12 (chapters the chart cites) but never in Revelation 1 or Psalm 23. The Symbolic-reading toggle only appears on passages with at least one chapter-verified symbol.
- A parsing fix accompanies this: the phrase row "Time, Times, Half a Time" no longer collapses to the bare word "time", which had wrongly given every "time" the 1260-year sense. Multi-comma chart entries stay whole; only single-comma qualifiers ("Balaam, Doctrine of") are trimmed.
- The tooltip orders senses by fit, badges the applicable one ("✓ referenced in Daniel 7"), dims non-applicable senses, and states plainly when the current chapter isn't referenced — "referenced elsewhere in Revelation, but not in chapter 1 — it may be literal here."
**Why:** The symbols chart existed as a stand-alone reference; readers had to cross-reference it manually while studying prophecy. Now the chart meets the reader inside the verse.
**Verification:** in the Daniel 2 guide alone, 166 symbol occurrences highlight across 61 quoted passages; the swapper round-trips on/off cleanly (boot test now 33/33 passing).

### 18. Prophecy map — category briefings & visual refresh (`prophecy_map.html`)
**What:**
- **Category briefings (relevant content):** selecting any category filter (Sunday Laws, Church & State, CBDC, Digital ID, Religious Liberty, Beast System) now opens a dismissible briefing card over the map: a one-paragraph description of what the category tracks, curated deep links into the study library (study guides in gold, infographics in blue — all `index.html#doc=` links), and a live-event counter that opens the Live Feed pre-filtered to that category.
- **Country panel enrichment:** each tab in the country detail panel now appends an "Explore: <category>" section with the same curated topic links (deduplicated against the country's own guide list), so every category view leads somewhere deeper.
- **Filter chips** show a count badge of how many countries have data for that category.
- **Visual polish:** serif display title matching the main site, floating-globe welcome animation, gold-tinted active tabs, uppercase stat labels, guide-link hover nudge, and a "Live news activity" row added to the map legend (the teal markers were previously unexplained).
**Verification:** dedicated jsdom smoke test, 10/10 passing — briefing opens with 7 deep links on Sunday Laws, links use the `#doc=` format, dismissal is per-category, chips expose `aria-pressed`, zero unexpected JS errors.

### Round 3 verification
- Automated jsdom boot test now at **27/27 passing**, including: Scripture Index renders 64 books, Daniel's detail lists 26 studies, the index is deep-linkable, and the Drive-hosted documents appear in navigation.
- All 108 regenerated manifest entries return HTTP 200 from the local server; `node --check` passes; renames were done with `git mv` so history follows the files.

---

## Part 3 — Recommended Next Steps (not yet implemented)

1. **Content housekeeping** (low effort): delete "- Copy" image duplicates in `Study_guides/images/`, fix the broken `../Commandments.md` link, add the missing Google Fonts link to `salvation_assurance.html`, deduplicate the twice-stored Sabbath Observance PDF.

Completed in Round 2: ~~infographic shared stylesheet~~, ~~map/worldmap offline~~, ~~prophecy-map accessibility~~, ~~bookmarks & notes~~.
Completed in Round 3: ~~rename URL-hostile files~~, ~~oversized PDFs → Drive~~, ~~Scripture index~~, ~~dead-link repair (Quotes study)~~, ~~Drive fallbacks for large PDFs~~.
