# estebantorr.es

Source for [https://estebantorr.es](https://estebantorr.es) — the personal site of Esteban Torres. Long-form writing on engineering and engineering management, plus CV, talks, and portfolio.

## Branches

- `source` — the live site. Currently Hugo (`KeepIt` theme). CI deploys to `master` → GitHub Pages.
- `astro-v2` — in-flight redesign on Astro 5. New visual direction is being shaped via the [impeccable skill](.claude/skills/impeccable/SKILL.md); see [`PRODUCT.md`](PRODUCT.md) for the strategic brief.

This README describes `astro-v2`.

## Stack

- [Astro 5](https://astro.build/) — static site generator, Content Layer API.
- [MDX](https://mdxjs.com/) — blog posts (`src/content/blog/*.mdx`).
- [Tailwind v4](https://tailwindcss.com/) — via the `@tailwindcss/vite` plugin; design tokens live in [`src/styles/global.css`](src/styles/global.css).
- [`@astrojs/rss`](https://docs.astro.build/en/recipes/rss/) + [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) for feed and sitemap.
- [bun](https://bun.sh/) — package manager + scripts runner. Versions pinned in [`.mise.toml`](.mise.toml).

## Common commands

```sh
bun install         # install deps
bun run dev         # dev server on http://localhost:4321
bun run build       # static build into dist/
bun run preview     # preview the production build locally
```

Run `mise install` first if Ruby / Node / bun versions aren't already in your shell.

## Directory layout

```
src/
  content/blog/         # MDX posts; permalink shape /:year/:month/:slug/
  content/config.ts     # collection schema (Content Layer API)
  components/shortcodes # MDX-callable components (Blockquote, Terminal, TweetQuote, GitHubRepo)
  layouts/              # page shells (BaseLayout)
  pages/                # routes (index, blog/, [year]/[month]/[...slug])
  styles/global.css     # token slots + base layout
  assets/               # imported images (processed by Astro)
  data/                 # static JSON (portfolio, etc.)
  lib/                  # utilities (Goodreads, etc.)
public/                 # served as-is (favicons, manifest, post images)
```

Permalinks intentionally preserve Hugo's `/:year/:month/:title/` shape so existing inbound links and RSS subscribers keep working.

## Design context

The visual system is being redesigned via the impeccable skill. The strategic brief is in [`PRODUCT.md`](PRODUCT.md); the homepage shape happens in `/impeccable shape homepage`; build with `/impeccable craft homepage`. The current scaffold is intentionally undesigned — token slots in `src/styles/global.css` are placeholders that shape + craft will commit to.
