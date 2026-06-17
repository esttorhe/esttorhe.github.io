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
  /** Optional slug used to seed deterministic visual variation across posts. */
  seed?: string;
  /**
   * 'full' (default): the post's hero on the article page — large Sigil + title text + category.
   * 'compact': the index-row thumbnail — Sigil-only, no title or category text (the row already shows them).
   */
  variant?: 'full' | 'compact';
}

/**
 * A small curated variant catalog. Each entry tweaks where the Sigil sits in
 * the 3:2 frame and how it's rotated, so a wall of fallbacks reads as a
 * family rather than 23 copies of the same composition. Title placement
 * adapts to the Sigil's column.
 */
interface Variant {
  /** Sigil position as fraction of canvas (0 = left/top edge, 1 = right/bottom edge). */
  sigilCx: number;
  sigilCy: number;
  /** Sigil scale (1.0 ≈ 240px tall). */
  sigilScale: number;
  /** Sigil rotation in degrees. */
  rotation: number;
  /** Title block layout — 'right' means title sits to the right of the Sigil. */
  titleSide: 'right' | 'left';
}

const VARIANTS: Variant[] = [
  { sigilCx: 0.18, sigilCy: 0.52, sigilScale: 1.0, rotation: 0, titleSide: 'right' },
  { sigilCx: 0.82, sigilCy: 0.5, sigilScale: 1.05, rotation: 18, titleSide: 'left' },
  { sigilCx: 0.2, sigilCy: 0.4, sigilScale: 0.95, rotation: -12, titleSide: 'right' },
  { sigilCx: 0.82, sigilCy: 0.62, sigilScale: 1.1, rotation: 26, titleSide: 'left' },
  { sigilCx: 0.16, sigilCy: 0.62, sigilScale: 0.9, rotation: -22, titleSide: 'right' },
  { sigilCx: 0.84, sigilCy: 0.42, sigilScale: 1.0, rotation: 8, titleSide: 'left' },
  { sigilCx: 0.22, sigilCy: 0.5, sigilScale: 1.15, rotation: -32, titleSide: 'right' },
  { sigilCx: 0.8, sigilCy: 0.56, sigilScale: 0.92, rotation: 15, titleSide: 'left' },
  { sigilCx: 0.18, sigilCy: 0.45, sigilScale: 1.08, rotation: 4, titleSide: 'right' },
  { sigilCx: 0.83, sigilCy: 0.48, sigilScale: 0.98, rotation: -18, titleSide: 'left' },
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickVariant(seed?: string): Variant {
  if (!seed) return VARIANTS[0];
  return VARIANTS[hashSeed(seed) % VARIANTS.length];
}

/**
 * Returns inline-SVG markup for a 3:2 hero fallback.
 *
 * Composition: the Sigil sits at one of a few curated positions, varied
 * deterministically by `seed`, with the post title flowing into the
 * opposite half of the frame. The viewBox is 1200×800 (3:2).
 *
 * Uses currentColor + CSS custom properties so the SVG picks up the page
 * theme — embed this with `set:html`, NOT as a separate <img>.
 */
export function generateHeroFallbackSvg({
  title,
  category,
  seed,
  variant: mode = 'full',
}: FallbackOptions): string {
  const variant = pickVariant(seed);
  const W = 1200;
  const H = 800;

  // Compact thumbnails get a bigger, more central Sigil so the mark IS the
  // composition (no title text to balance against). Full heroes keep the
  // smaller off-center Sigil to leave room for the title block.
  const baseSize = mode === 'compact' ? 380 : 240;
  const sigilBoxSize = baseSize * variant.sigilScale;
  const sigilCx = W * variant.sigilCx;
  const sigilCy = H * variant.sigilCy;
  const sigilScale = sigilBoxSize / 24;

  if (mode === 'compact') {
    return `<svg
  class="hero-fallback hero-fallback--compact"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${W} ${H}"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  aria-label="${escapeXml(`Brand mark thumbnail for ${title}`)}"
>
  <defs>
    <style>
      .hero-fallback__bg { fill: var(--surface, oklch(0.965 0.006 65)); }
      .hero-fallback__ring { stroke: var(--accent, oklch(0.58 0.155 60)); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .hero-fallback__dot { fill: var(--accent, oklch(0.58 0.155 60)); }
    </style>
  </defs>

  <rect class="hero-fallback__bg" width="${W}" height="${H}" />

  <g transform="translate(${sigilCx} ${sigilCy}) rotate(${variant.rotation}) translate(${-12 * sigilScale} ${-12 * sigilScale}) scale(${sigilScale})">
    <path class="hero-fallback__ring" d="${SIGIL_RING_D}" />
    <circle class="hero-fallback__dot" cx="12.5" cy="12.2" r="3.4" />
  </g>
</svg>`;
  }

  // 'full' — article-hero composition with title + category text.
  const titleBlockWidth = 540;
  const titleBlockX =
    variant.titleSide === 'right'
      ? Math.max(sigilCx + sigilBoxSize / 2 + 60, 540)
      : Math.min(sigilCx - sigilBoxSize / 2 - 60 - titleBlockWidth, 120);
  const titleBlockY = 270;
  const categoryY = titleBlockY - 30;

  const safeTitle = escapeXml(title);
  const safeCategory = category ? escapeXml(category) : '';

  return `<svg
  class="hero-fallback"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${W} ${H}"
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

  <rect class="hero-fallback__bg" width="${W}" height="${H}" />

  <g transform="translate(${sigilCx} ${sigilCy}) rotate(${variant.rotation}) translate(${-12 * sigilScale} ${-12 * sigilScale}) scale(${sigilScale})">
    <path class="hero-fallback__ring" d="${SIGIL_RING_D}" />
    <circle class="hero-fallback__dot" cx="12.5" cy="12.2" r="3.4" />
  </g>

  ${
    safeCategory
      ? `<text class="hero-fallback__category" x="${titleBlockX}" y="${categoryY}">${safeCategory}</text>`
      : ''
  }

  <foreignObject x="${titleBlockX}" y="${titleBlockY}" width="${titleBlockWidth}" height="420">
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
    x="${titleBlockX}"
    y="${titleBlockY + 60}"
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
