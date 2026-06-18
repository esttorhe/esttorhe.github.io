// ABOUTME: Parses cv.md's Work Experience section into structured roles for the grouped web /cv/ renderer.
// ABOUTME: Leaves the rest of the document (intro, skills, projects, education) intact for downstream markdown rendering.

export interface ParsedRole {
  /** Company / employer — e.g. 'Zenjob'. */
  company: string;
  /** Role title — e.g. 'Head of Platform Engineering'. Empty when the entry has no title (e.g. the consolidated 'Earlier Career' block). */
  title: string;
  /** Date-range string as it appears in cv.md — e.g. 'October 2025 to present'. */
  dateRange: string;
  /** Description text — joined lines from the role block, raw markdown preserved. */
  description: string;
  /** Stable id used to map roles to groups: `${company}|${title}` (title may be empty). */
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
// New cv.md format: `**Company** -- *Title* -- **Dates**` and (no-title variant) `**Company** -- **Dates**`.
const ROLE_LINE_WITH_TITLE = /^\*\*([^*]+)\*\*\s+--\s+\*([^*]+)\*\s+--\s+\*\*([^*]+)\*\*\s*$/;
const ROLE_LINE_NO_TITLE = /^\*\*([^*]+)\*\*\s+--\s+\*\*([^*]+)\*\*\s*$/;
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
  // Roles are no longer separated by `<h3></h3>` tags. We scan line-by-line,
  // treating every line that matches a role-header pattern as the start of a
  // new block. Everything until the next header (or EOF) is the description.
  const lines = body.split('\n').map((l) => l.replace(/\r$/, ''));

  type HeaderHit = { line: number; company: string; title: string; dateRange: string };
  const headers: HeaderHit[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const stripped = lines[i].trim();
    if (!stripped) continue;
    const withTitle = stripped.match(ROLE_LINE_WITH_TITLE);
    if (withTitle) {
      headers.push({
        line: i,
        company: withTitle[1].trim(),
        title: withTitle[2].trim(),
        dateRange: withTitle[3].trim(),
      });
      continue;
    }
    const noTitle = stripped.match(ROLE_LINE_NO_TITLE);
    if (noTitle) {
      headers.push({
        line: i,
        company: noTitle[1].trim(),
        title: '',
        dateRange: noTitle[2].trim(),
      });
    }
  }

  const roles: ParsedRole[] = [];
  for (let i = 0; i < headers.length; i += 1) {
    const header = headers[i];
    const endLine = i + 1 < headers.length ? headers[i + 1].line : lines.length;
    const descriptionLines = lines
      .slice(header.line + 1, endLine)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    roles.push({
      company: header.company,
      title: header.title,
      dateRange: header.dateRange,
      description: descriptionLines.join('\n'),
      key: `${header.company}|${header.title}`,
    });
  }

  return roles;
}
