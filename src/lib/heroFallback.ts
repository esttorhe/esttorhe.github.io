// ABOUTME: Generates the per-post fallback hero — a 3:2 SVG of the Sigil + post title.
// ABOUTME: Used when a post has no committed hero asset; same Sigil path data as src/components/marks/Sigil.astro.

/**
 * Sigil path data — kept in sync with `src/components/marks/Sigil.astro`.
 * The Sigil component's viewBox is 0 0 24 24; we re-scale below.
 */
const SIGIL_RING_D = `M12 2.4
       C 17.1 2.0, 21.7 6.3, 21.7 12.2
       C 22.1 17.7, 17.4 21.9, 11.8 21.9
       C 6.4 22.3, 2.1 17.6, 2.3 11.8
       C 1.9 6.6, 6.7 2.6, 12 2.4 Z`;

interface FallbackOptions {
  title: string;
  /** Category label rendered as a small mono kicker above the title. */
  category?: string;
}

/**
 * Returns inline-SVG markup for a 3:2 hero fallback.
 *
 * Composition: oversized wobbly Sigil on the left, post title in Bricolage on
 * the right. Uses currentColor + CSS custom properties so the SVG picks up the
 * page theme — embed this with `set:html`, NOT as a separate <img>.
 *
 * The viewBox is 1200x800 (3:2). Caller decides actual rendered width via
 * CSS — preserveAspectRatio is "xMidYMid meet" so it scales cleanly.
 */
export function generateHeroFallbackSvg({ title, category }: FallbackOptions): string {
  // Sigil is rendered at 240px × 240px, parked left-of-center, slightly above the
  // vertical midline so it visually balances the title block on the right.
  const sigilScale = 240 / 24; // = 10
  const sigilX = 160;
  const sigilY = 260;

  const safeTitle = escapeXml(title);
  const safeCategory = category ? escapeXml(category) : '';

  return `<svg
  class="hero-fallback"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1200 800"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  aria-label="${escapeXml(`Hero illustration for ${title}`)}"
>
  <defs>
    <style>
      .hero-fallback__bg { fill: var(--surface, oklch(0.965 0.006 65)); }
      .hero-fallback__ring { stroke: var(--accent, oklch(0.58 0.155 60)); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .hero-fallback__dot { fill: var(--accent, oklch(0.58 0.155 60)); }
      .hero-fallback__category { font-family: 'Geist Mono', ui-monospace, Menlo, monospace; font-size: 22px; fill: var(--ink-muted, oklch(0.42 0.012 65)); letter-spacing: 0.04em; text-transform: lowercase; }
      .hero-fallback__title-fo { color: var(--ink, oklch(0.2 0.005 65)); font-family: 'Bricolage Grotesque Variable', ui-sans-serif, system-ui, sans-serif; font-weight: 700; font-size: 64px; line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; word-break: break-word; }
      .hero-fallback__title-fallback { font-family: 'Bricolage Grotesque Variable', ui-sans-serif, system-ui, sans-serif; font-weight: 700; font-size: 56px; letter-spacing: -0.025em; fill: var(--ink, oklch(0.2 0.005 65)); }
    </style>
  </defs>

  <rect class="hero-fallback__bg" width="1200" height="800" />

  <g transform="translate(${sigilX} ${sigilY}) scale(${sigilScale})">
    <path class="hero-fallback__ring" d="${SIGIL_RING_D}" />
    <circle class="hero-fallback__dot" cx="12.5" cy="12.2" r="3.4" />
  </g>

  ${
    safeCategory
      ? `<text class="hero-fallback__category" x="540" y="240">${safeCategory}</text>`
      : ''
  }

  <foreignObject x="540" y="${safeCategory ? 270 : 260}" width="580" height="420">
    <div xmlns="http://www.w3.org/1999/xhtml" class="hero-fallback__title-fo">
      ${safeTitle}
    </div>
  </foreignObject>

  <!--
    Pure-SVG fallback for renderers that don't handle <foreignObject> (mostly
    rasterizers + some RSS readers). Hidden visually under the foreignObject
    box but exposed as accessible text via aria-label on the parent.
  -->
  <text
    class="hero-fallback__title-fallback"
    x="540"
    y="${safeCategory ? 330 : 320}"
    aria-hidden="true"
    visibility="hidden"
  >${truncateForSvgText(safeTitle, 24)}</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function truncateForSvgText(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
