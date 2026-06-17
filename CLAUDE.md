# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Source for `https://estebantorr.es`, a Hugo static site published to GitHub Pages. The `source` branch holds the source; CI builds and pushes the rendered output to the `master` branch. The published site lives at `site/public/` after a build.

Note: `README.md` still describes the previous Gatsby incarnation. The actual stack is Hugo + the `KeepIt` theme (Git submodule). Trust the `Makefile` / `Rakefile` / GitHub Actions workflow over the README.

## Common commands

Hugo runs inside the `jojomi/hugo:latest` Docker image — there is no local Hugo install. Everything goes through the `Makefile` (which `Rakefile` wraps for the `build` / `test` flow).

| Task | Command |
| ---- | ------- |
| Serve locally with live reload | `make serve` (port 1313, drafts enabled) |
| Build into `site/public/` | `make build` |
| Open an interactive shell in the Hugo container | `make dev` |
| New blog post | `make post TYPE=<management\|engineering> FILENAME=<slug>` — creates `site/content/blog/<TYPE>/YYYY-MM-DD-<slug>.md` from `site/archetypes/default.md` |
| Full CI-style build + link check | `bundle exec rake build:test` (cleans → `make build` → `html-proofer` on `site/public/`) |
| Link check only (build must exist) | `bundle exec rake test` |
| Clean cache + build output | `bundle exec rake clean` (uses `sudo rm -rf`) |

`make serve` exposes the site at `http://<docker-ip>:1313`. Override with `PORT=`, `URL=`, or `HUGO_BASE_URL=` env vars. The `docker-ip` helper is invoked by the Makefile — if it's not on `PATH`, set `HUGO_BASE_URL` explicitly.

## Submodule

The KeepIt theme is a Git submodule at `site/themes/KeepIt`. After cloning, run `git submodule update --init --recursive` or CI's `actions/checkout@v4` step (`submodules: true`) won't have an analog locally and the build will fail with a missing-theme error.

## Architecture

Hugo's standard layout under `site/`:

- `site/config/_default/config.toml` — site config (baseURL, menu, params, social, share, markup, utterances comments). Development-only overrides live in `site/config/development/config.toml`.
- `site/content/` — Markdown content. Sections: `blog/` (organized by year, then `<YYYY-MM-DD>-<slug>.md`), `about/`, `cv/`, `talks/`.
- `site/layouts/` — site-level overrides on top of the theme:
  - `partials/` — empty placeholder
  - `shortcodes/` — custom shortcodes: `awesome`, `blockquote`, `github`, `html`, `terminal`
- `site/static/` — copied verbatim into the output (`CNAME`, favicons, manifests, `assets/`)
- `site/themes/KeepIt/` — the theme (submodule). Don't edit it here; override by creating a same-named file under `site/layouts/`.
- `site/archetypes/default.md` — template used by `hugo new` / `make post`.

Permalinks for blog posts are `/:year/:month/:title/` (see `Permalinks` in `config.toml`). Comments are powered by [utteranc.es](https://utteranc.es/) backed by issues on this same repo.

## Deployment

`.github/workflows/build-and-deploy.yml` runs on every push to `source`:
1. Checks out with submodules.
2. Pulls/caches the `jojomi/hugo:latest` image.
3. `make build` equivalent (runs `hugo` in the container against `site/`).
4. Verifies `site/public/index.html` exists.
5. Runs `bundle exec rake test` (html-proofer).
6. Publishes `site/public/` to the `master` branch via `peaceiris/actions-gh-pages@v4`.

Production deploys happen automatically on merge to `source`. There is no separate "deploy" step to run by hand.

## Pull request automation

`Dangerfile` runs on PRs and:
- Flags titles containing `[Draft]`.
- Runs `danger-prose` against changed `.md` / `.markdown` files under `site/content/`.
- Spell-checks them with `mdspell` (installs `orta/node-markdown-spellcheck` if missing).

Disabled proselint linters: `typography.diacritical_marks`, `butterick.symbols.curly_quotes`, `butterick.symbols.multiplication_symbol`.

## Tool versions

`.mise.toml` pins `bun 1.3`, `node 22`, `ruby 3.4`. Use `mise install` to get the right Ruby for the `Gemfile` / `html-proofer` step (`gem install bundler && bundle install`).

## Untracked output directories

`dist/` and `.astro/` exist in the working tree but are not tracked and are not part of the Hugo build. Ignore them unless explicitly working on a migration — Hugo's output is `site/public/`.

## Writing content

- New post: `make post TYPE=engineering FILENAME=my-post-slug` (or `TYPE=management`). Front matter follows the archetype; add `tags`, `categories`, and `type: post` as seen in existing posts under `site/content/blog/<year>/`.
- Drafts: the archetype has `# draft: true` commented out — uncomment to keep a post out of production builds. `make serve` includes drafts (`--buildDrafts`).
- Custom shortcodes available: `{{< awesome >}}`, `{{< blockquote >}}`, `{{< github >}}`, `{{< html >}}`, `{{< terminal >}}` (see `site/layouts/shortcodes/`).

## Design context

- `PRODUCT.md` at the project root holds the strategic design brief: register (`brand`), three equally-weighted audiences, brand personality (plainspoken, opinionated, idiosyncratic), anti-references, accessibility commitments, and the five design principles. Read it before any visual / UX / copy work.
- North-star metric: reading depth (people read more than one post per visit). Astro is the design target; the Hugo `source` branch is the live deploy but is sunsetting. Hard-banned aesthetics: cream/sand editorial-warm, generic SaaS landing, Medium-clone, dev-blog-2018.
- `DESIGN.md` (visual tokens / components / palette) is not written yet. Run `/impeccable document` once the Astro source is in place to capture it.
