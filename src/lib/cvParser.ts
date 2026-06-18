// ABOUTME: Parses cv.md's Work Experience section into structured roles for the grouped web /cv/ renderer.
// ABOUTME: Leaves the rest of the document (intro, skills, projects, education) intact for downstream markdown rendering.

export interface ParsedRole {
  /** Company / employer. Backtick-wrapped in cv.md; we strip the backticks. */
  company: string;
  /** Role title — e.g. 'Head of Platform Engineering'. */
  title: string;
  /** Date-range string as it appears in cv.md — e.g. 'October 2025 to present'. */
  dateRange: string;
  /** Description text — joined lines from the role block, raw markdown preserved. */
  description: string;
  /** Stable id used to map roles to groups: `${company}|${title}`. */
  key: string;
}

export interface ParsedCv {
  /** Markdown content BEFORE the `### Work Experience` heading. */
  preWorkMarkdown: string;
  /** Markdown content AFTER the Work Experience section (Projects, Education, links). */
  postWorkMarkdown: string;
  /** Roles in source order (which is reverse-chronological in cv.md). */
  roles: ParsedRole[];
}

const WORK_HEADING = /^###\s+Work\s+Experience\s*$/m;
const NEXT_SECTION_HEADING = /^###\s+/m;
const ROLE_LINE = /^\*\*`([^`]+)`\*\*\s*\*([^*]+)\*\s*\*\*([^*]+)\*\*\s*$/;
const ROLE_SEPARATOR = /<h3>\s*<\/h3>/g;
const SECTION_DIVIDER = /^-{3,}\s*$/m;

/**
 * Parse cv.md into (a) the surrounding markdown sections and (b) the
 * structured list of roles inside Work Experience.
 */
export function parseCv(source: string): ParsedCv {
  const workMatch = source.match(WORK_HEADING);
  if (!workMatch) {
    return { preWorkMarkdown: source, postWorkMarkdown: '', roles: [] };
  }

  const workStart = workMatch.index!;
  const preWorkMarkdown = source.slice(0, workStart).trimEnd();

  // Work content starts after the heading line. Look for the next section
  // boundary (either a `---` divider or the next `### ` heading).
  const afterHeading = source.slice(workStart + workMatch[0].length);
  const nextDividerIdx = (() => {
    const dividerMatch = afterHeading.match(SECTION_DIVIDER);
    return dividerMatch ? (dividerMatch.index ?? -1) : -1;
  })();
  const nextHeadingMatch = afterHeading.slice(1).match(NEXT_SECTION_HEADING);
  const nextHeadingIdx = nextHeadingMatch?.index !== undefined ? nextHeadingMatch.index + 1 : -1;

  let workEnd: number;
  if (nextDividerIdx >= 0 && nextHeadingIdx >= 0) {
    workEnd = Math.min(nextDividerIdx, nextHeadingIdx);
  } else if (nextDividerIdx >= 0) {
    workEnd = nextDividerIdx;
  } else if (nextHeadingIdx >= 0) {
    workEnd = nextHeadingIdx;
  } else {
    workEnd = afterHeading.length;
  }

  const workBody = afterHeading.slice(0, workEnd);
  const postWorkMarkdown = afterHeading.slice(workEnd).trimStart();

  const roles = parseRoles(workBody);
  return { preWorkMarkdown, postWorkMarkdown, roles };
}

function parseRoles(body: string): ParsedRole[] {
  // Roles are separated by `<h3></h3>` literal tags (a Hugo-era quirk).
  const blocks = body
    .split(ROLE_SEPARATOR)
    .map((b) => b.trim())
    .filter(Boolean);

  const roles: ParsedRole[] = [];
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.replace(/\r$/, ''));
    // First non-empty line is the role header; rest is the description body.
    const headerIdx = lines.findIndex((l) => l.trim().length > 0);
    if (headerIdx === -1) continue;

    const headerLine = lines[headerIdx].trim();
    const headerMatch = headerLine.match(ROLE_LINE);
    if (!headerMatch) continue;

    const [, companyRaw, titleRaw, dateRaw] = headerMatch;
    const company = companyRaw.trim();
    const title = titleRaw.trim();
    const dateRange = dateRaw.trim();

    const descriptionLines = lines
      .slice(headerIdx + 1)
      .map((l) => l.trimStart())
      .filter((l) => l.length > 0);
    const description = descriptionLines.join('\n');

    roles.push({
      company,
      title,
      dateRange,
      description,
      key: `${company}|${title}`,
    });
  }
  return roles;
}
