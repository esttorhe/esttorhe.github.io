// ABOUTME: Three-tier hero resolver for blog posts.
// ABOUTME: (1) post.data.featured_image path → (2) convention path src/assets/post-heroes/<slug>.{ext} → (3) Sigil-generated fallback SVG.

import type { ImageMetadata } from 'astro';

/**
 * Build-time glob of every post-hero asset. Vite resolves the URLs + metadata
 * eagerly so the resolver can look up by slug without runtime fs access.
 */
const conventionImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/post-heroes/*.{webp,avif,jpg,jpeg,png,svg}',
  { eager: true },
);

/**
 * Optional explicit-path glob — for posts that set `featured_image` in
 * frontmatter to a path inside src/assets/. Lets the resolver still pull the
 * Astro Image metadata (dimensions, format) for srcset generation.
 */
const explicitImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/post-heroes/**/*.{webp,avif,jpg,jpeg,png,svg}',
  { eager: true },
);

export type HeroResolution =
  | {
      kind: 'image';
      /** Astro image metadata, ready to pass to the <Image /> component. */
      image: ImageMetadata;
      /** Accessible alt text. */
      alt: string;
    }
  | {
      kind: 'fallback';
      /** Title used to compose the fallback SVG. */
      title: string;
      /** Category used as the small mono kicker above the title. */
      category?: string;
      /** Slug used to seed deterministic composition variation. */
      seed: string;
      /** Accessible alt text describing the fallback illustration. */
      alt: string;
    };

interface ResolveInput {
  /** Bare post slug (without date prefix or .mdx extension). */
  slug: string;
  /** Post title used as alt fallback and as the fallback-SVG title. */
  title: string;
  /** Post category, surfaced on the fallback SVG as a kicker. */
  category?: string;
  /** Frontmatter `featured_image` field, if present. */
  featuredImage?: string;
  /** Frontmatter `featured_image_alt` field, if present. */
  featuredImageAlt?: string;
}

/**
 * Resolve a hero for a post. Tries (in order):
 *   1. `featuredImage` frontmatter, if it matches a known asset.
 *   2. Convention path `src/assets/post-heroes/<slug>.<ext>`.
 *   3. Returns a fallback descriptor so the caller can render the Sigil SVG.
 */
export function resolveHero(input: ResolveInput): HeroResolution {
  const { slug, title, category, featuredImage, featuredImageAlt } = input;
  const altWhenImage = featuredImageAlt ?? `Hero illustration for ${title}`;

  // Tier 1: explicit path from frontmatter.
  if (featuredImage) {
    const explicit = lookupExplicit(featuredImage);
    if (explicit) {
      return { kind: 'image', image: explicit, alt: altWhenImage };
    }
  }

  // Tier 2: convention path by slug.
  const conv = lookupConvention(slug);
  if (conv) {
    return { kind: 'image', image: conv, alt: altWhenImage };
  }

  // Tier 3: programmatic fallback.
  return {
    kind: 'fallback',
    title,
    category,
    seed: slug,
    alt: `Brand mark and post title for ${title}`,
  };
}

function lookupConvention(slug: string): ImageMetadata | null {
  for (const [path, mod] of Object.entries(conventionImages)) {
    // path looks like '/src/assets/post-heroes/<slug>.<ext>'
    const match = path.match(/\/post-heroes\/([^/]+?)\.[^./]+$/);
    if (match && match[1] === slug) {
      return mod.default;
    }
  }
  return null;
}

function lookupExplicit(featured: string): ImageMetadata | null {
  // Accept either '/src/assets/...' (absolute project path) or '.../slug.ext'
  // (just the filename, treated as living under post-heroes/).
  if (featured.startsWith('/src/assets/')) {
    const mod = explicitImages[featured];
    return mod?.default ?? null;
  }
  // Try as a basename under post-heroes/.
  for (const [path, mod] of Object.entries(explicitImages)) {
    if (path.endsWith('/' + featured) || path.endsWith(featured)) {
      return mod.default;
    }
  }
  return null;
}
