# Reference: chris-jimenez.com

Captured: 2026-06-17. Source: WebFetch of the live homepage HTML only — no JS-rendered details, no scroll behavior observed in motion.

Chris is a peer in the engineering-leadership space (named in shared circles); Esteban flagged the site as a pull-source for estebantorr.es. **He explicitly likes parts of it.** This memo extracts what's worth pulling, what isn't, and what we can use right now for the open sticky-header issue.

---

## What's worth pulling

These match estebantorr.es's brand (plainspoken + opinionated + idiosyncratic + reading-depth-first) and are concrete enough to lift the _pattern_ without lifting the work.

### Structure: single column, content-first

Chris uses one centered column, generous side whitespace, no sidebar, no widgets. Recent essays flow inline as a list with thumbnails. **We already do this on our homepage and article surface.** The reference confirms we're on the right track — Chris doesn't reach for sidebars / tag clouds / "popular posts" widgets even though those are common on engineering-leadership blogs.

**Lift:** keep the no-sidebar rule firm. When a future polish suggests adding a related-posts sidebar, this reference is the counter-argument.

### Photo placement mid-page, not in header

Chris's circular bio photo sits in the **mid-page bio section** (not in the header or a sidebar). This humanizes the credentials that follow. The header carries just the wordmark + nav — no avatar.

**Lift:** if/when we ever add a portrait of Esteban, put it mid-About (or mid-CV), not in the header. The wordmark Sigil is already doing the brand-recognition job in the header.

### Conversational link copy

Chris uses _"View all essays →"_ instead of _"See More"_ or _"All Posts"_. Directional language, conversational register.

**Lift:** matches what we already shipped — _"All 23 posts →"_, _"Next read · "_, _"Previously · "_, _"All writing →"_. We're already in this voice.

### Career timeline as substance, not visualization

Chris's career section is a straightforward list of roles (employer, location, dates, paragraph). **No fancy timeline graphic, no resume-card grid, no progress bar showing tenure.** Substance over decoration.

**Lift:** when we craft the CV page (the submodule already powers `/cv/`), keep the role-list flat-and-readable. No timeline visualization. No "5 years at X" hero-metric. The CV is read-it-in-90-seconds material; the structure does the work.

### Restraint as the dominant aesthetic

"Radically restrained" was the WebFetch verdict — no animations, no novelty, no micro-interactions. Power is in clarity, breathing room, and writing weight.

**Lift, with one caveat:** Esteban's brief explicitly says _"plainspoken, opinionated, **idiosyncratic**"_ and PRODUCT.md flags "minimalist tasteful" as a failure state. Chris's site sits closer to that failure state than ours wants to. Pull the restraint **of structure** (one column, no widgets, content-first) but _not_ the restraint **of identity** (no Sigil, no ornament, no idiosyncratic move). We've established the Sigil as our brand mark; Chris's site doesn't have an equivalent and is the lesser for it from our brief's standpoint.

---

## What NOT to pull

- **Copy voice.** Chris's phrasing is direct, authority-forward ("I've led high-performing engineering teams," "My passion lies in…"). That's his register. Esteban's voice is more wry / understated / "Costa Rican to Berlin via iOS engineering." Adopt structure, never sentences.
- **The photo.** Obviously.
- **The exact color palette.** WebFetch couldn't confirm the accent precisely, but Chris's surface is cream/charcoal. We've committed to pure white + honey accent at hue 60. Don't drift.
- ~~**Blog post thumbnails as a system.**~~ **Revisit:** Esteban wants to start adding thumbnails / hero shots to articles. Chris's system is in scope as a reference now (not an anti-reference). Open questions: per-post asset workflow, aspect ratio, where thumbnails surface (blog index? curated picks? article hero?), generation source (commissioned? AI? hand-drawn? stock?). Will be addressed in a dedicated `/impeccable shape article-hero` (or similar) pass — see follow-up note at the bottom of this memo.
- **The no-toggle posture.** Chris's site appears to have no light/dark toggle. We've committed to dark/light parity per PRODUCT.md A11y clause. Keep the toggle.

---

## For the sticky-header issue (`bd-<id>`)

**Correction (2026-06-17, ground-truthed by Esteban):** Chris's header IS visible while scrolling — the user reports this directly. WebFetch saw HTML only and couldn't observe scroll behavior; the markup-only inspection got this wrong. Chris's site IS a real reference for the sticky pattern (alongside the "what to put inside" notes below).

If we implement sticky-on-scroll-up + hide-on-scroll-down for estebantorr.es, the WebFetch tool recommended:

- **Visibility**: top of viewport always.
- **Auto-hide**: detect scroll direction; hide on scroll-down past 50–100px, reappear on scroll-up.
- **Height**: 50–60px to preserve reading space.
- **Background**: light translucency + backdrop-blur — `background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px)` in light; equivalent for dark.
- **Contents**: wordmark left + essential nav (Writing / Talks / CV / About) + theme toggle right. **We've already got this exact shape** post-round-2; the change is purely behavioral.
- **Implementation**: pure CSS `position: sticky; top: 0;` is simplest but can't detect scroll direction (always visible). JS scroll-listener is required for hide-on-scroll-down. Library options: a tiny IntersectionObserver-based sentinel pattern works without a scroll listener and respects reduced-motion cleanly.

**Open call**: when we shape the sticky-header work, decide between (a) always-sticky (simpler, costs ~56px vertical permanently) and (b) sticky-with-auto-hide (more JS, more reading space). The brief gets one short interview round; both are defensible.

---

## Open questions for a real-browser revisit

WebFetch only sees HTML; some of these need a live tab + DevTools:

- Actual fonts in use (display + body) — not declared in markup excerpt.
- Exact color values (HSL/hex).
- Scroll behavior on real interaction.
- Mobile breakpoint behavior — nav collapse / hamburger / overflow.
- Page-load motion (if any).
- Whether Chris uses any CSS framework signal (Tailwind classes, etc.).

If a future pass needs these, run Puppeteer against `https://chris-jimenez.com` and capture computed styles + breakpoint screenshots.

---

## Filed against

- Sticky-header issue: `bd-<id>` (notes this reference in its acceptance criteria; header IS sticky on Chris's site per ground-truth correction).
- Article hero / thumbnail work: future `/impeccable shape article-hero` (or similar) pass. Chris's per-post thumbnail system is a real reference — re-visit this memo when shaping that feature.
- Future shape passes that touch the article / about / CV surfaces: consult this memo before re-deriving structural decisions.
