// ABOUTME: Builds the final HTML string for the web /cv/ — grouped work-experience render.
// ABOUTME: Kept in a .ts file so the Astro component doesn't carry HTML template literals (Astro's preprocessor mis-parses them).

import { marked } from 'marked';
import { parseCv, type ParsedRole } from './cvParser';
import { cvGroups, buildRoleToGroupIndex, type CvGroup } from '../data/cvGroups';

export interface CvRenderResult {
  /** Final HTML to inject via set:html. */
  html: string;
  /** Any roles in cv.md not assigned to a group — exposed so callers can warn during dev. */
  orphans: ParsedRole[];
}

/**
 * Render the whole cv.md as flat marked HTML — used by /cv/print/ and the PDF.
 */
export async function renderFlatCv(source: string): Promise<string> {
  marked.setOptions({ gfm: true, breaks: false });
  return marked.parse(source);
}

/**
 * Render cv.md as the grouped web /cv/ surface — pre + grouped work + post.
 */
export async function renderGroupedCv(source: string): Promise<CvRenderResult> {
  marked.setOptions({ gfm: true, breaks: false });
  const parsed = parseCv(source);
  const preWorkHtml = await marked.parse(parsed.preWorkMarkdown);

  // Projects + Education + link refs (parsed.postWorkMarkdown) are intentionally
  // dropped from the web /cv/ — they don't add much next to the grouped
  // narratives, and the PDF/print path keeps everything (renderFlatCv uses the
  // whole cv.md).

  const roleIndex = new Map(parsed.roles.map((r) => [r.key, r]));
  const groupIndex = buildRoleToGroupIndex();

  const groupsHtml = (
    await Promise.all(
      cvGroups.map(async (group) => {
        const roles = group.roleKeys
          .map((key) => roleIndex.get(key))
          .filter((r): r is ParsedRole => r !== undefined);
        return renderGroup(group, roles);
      }),
    )
  ).join('');

  const orphans = parsed.roles.filter((r) => !groupIndex.has(r.key));
  const orphansHtml = orphans.length > 0 ? renderOrphans(orphans) : '';

  const html = [
    '<div class="cv__pre">',
    preWorkHtml,
    '</div>',
    '<section class="cv-work" aria-labelledby="cv-work-heading">',
    '<h3 id="cv-work-heading" class="cv-work__heading">Work Experience</h3>',
    groupsHtml,
    orphansHtml,
    '</section>',
  ].join('\n');

  return { html, orphans };
}

async function renderGroup(group: CvGroup, roles: ParsedRole[]): Promise<string> {
  const rolesHtml = (await Promise.all(roles.map((role) => renderRole(role)))).join('');
  const rolesBlock = roles.length > 0 ? `<ol class="cv-group__roles">${rolesHtml}</ol>` : '';
  return [
    '<section class="cv-group">',
    '<header class="cv-group__header">',
    `<h4 class="cv-group__title">${escapeHtml(group.title)}</h4>`,
    `<p class="cv-group__dates tabular">${escapeHtml(group.dateRange)}</p>`,
    '</header>',
    `<p class="cv-group__narrative">${escapeHtml(group.narrative)}</p>`,
    rolesBlock,
    '</section>',
  ].join('');
}

async function renderRole(role: ParsedRole): Promise<string> {
  const hasTitle = role.title.length > 0;
  const description = hasTitle
    ? await renderDescriptionBullets(role.description)
    : await renderDescriptionProse(role.description);

  const head = hasTitle
    ? [
        '<div class="cv-role__head">',
        `<h5 class="cv-role__title">${escapeHtml(role.title)}</h5>`,
        `<p class="cv-role__dates tabular">${escapeHtml(role.dateRange)}</p>`,
        '</div>',
      ].join('')
    : `<p class="cv-role__dates cv-role__dates--standalone tabular">${escapeHtml(role.dateRange)}</p>`;

  return ['<li class="cv-role">', head, description, '</li>'].join('');
}

/** One bullet per source line — used for normal roles with a title. */
async function renderDescriptionBullets(desc: string): Promise<string> {
  const lines = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return '';
  const items = await Promise.all(lines.map((l) => marked.parseInline(l)));
  return `<ul class="cv-role__points">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

/** Single prose paragraph — used for entries without a title (e.g. consolidated 'Earlier Career'). */
async function renderDescriptionProse(desc: string): Promise<string> {
  const text = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
  if (text.length === 0) return '';
  const inline = await marked.parseInline(text);
  return `<p class="cv-role__prose">${inline}</p>`;
}

function renderOrphans(orphans: ParsedRole[]): string {
  const items = orphans
    .map((r) => `<li><code>${escapeHtml(r.key)}</code> — ${escapeHtml(r.dateRange)}</li>`)
    .join('');
  return [
    '<aside class="cv-orphans" role="note">',
    '<p class="cv-orphans__title">Not yet assigned to a group:</p>',
    `<ul>${items}</ul>`,
    '<p class="cv-orphans__hint">Add these to <code>src/data/cvGroups.ts</code> so they appear on the web /cv/.</p>',
    '</aside>',
  ].join('');
}

export function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      (
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }) as Record<
          string,
          string
        >
      )[c] ?? c,
  );
}
