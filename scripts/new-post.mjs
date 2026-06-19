// ABOUTME: Interactive scaffolder for new blog posts. Prompts for metadata, slugifies the title, optionally copies a hero image into src/assets/post-heroes/, and writes a valid MDX file under src/content/blog/.
// ABOUTME: Run via `mise run new-post` from the project root.

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { mkdir, copyFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, basename } from 'node:path';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const blogDir = resolve(projectRoot, 'src', 'content', 'blog');
const heroDir = resolve(projectRoot, 'src', 'assets', 'post-heroes');

// Must mirror the enum in src/content/config.ts.
const CATEGORIES = ['Tech', 'Leadership', 'Productivity', 'Personal', 'Community'];

const rl = createInterface({ input: stdin, output: stdout });

function log(msg) {
  process.stdout.write(`[new-post] ${msg}\n`);
}

async function ask(question, { required = false } = {}) {
  while (true) {
    const answer = (await rl.question(`${question}: `)).trim();
    if (answer) return answer;
    if (!required) return '';
    log('  field is required');
  }
}

async function askYesNo(question, defaultYes = true) {
  const suffix = defaultYes ? ' (Y/n)' : ' (y/N)';
  const answer = (await rl.question(`${question}${suffix}: `)).trim().toLowerCase();
  if (!answer) return defaultYes;
  return answer.startsWith('y');
}

async function askCategory() {
  log('category:');
  CATEGORIES.forEach((c, i) => process.stdout.write(`  ${i + 1}) ${c}\n`));
  while (true) {
    const answer = (await rl.question('> ')).trim();
    const asNumber = Number(answer);
    if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= CATEGORIES.length) {
      return CATEGORIES[asNumber - 1];
    }
    const match = CATEGORIES.find((c) => c.toLowerCase() === answer.toLowerCase());
    if (match) return match;
    log(`  pick a number 1-${CATEGORIES.length} or one of ${CATEGORIES.join(', ')}`);
  }
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Single-quoted YAML string, with `'` escaped as `''`. Safe for any title we'd realistically use.
function yamlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function expandPath(p) {
  if (p === '~') return homedir();
  if (p.startsWith('~/')) return resolve(homedir(), p.slice(2));
  return resolve(process.cwd(), p);
}

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  process.stdout.write('\nNew blog post scaffolder\n\n');

  const title = await ask('title', { required: true });
  const slug = slugify(title);
  if (!slug) {
    log('title produced an empty slug; aborting');
    process.exit(1);
  }
  log(`  slug → ${slug}`);

  const category = await askCategory();
  const description = await ask('description (optional)');
  const tagsRaw = await ask('tags (comma-separated, optional)');
  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const heroPathRaw = await ask('hero image path (optional, leave blank to skip)');
  let heroAlt = '';
  let heroDestRelative = '';
  if (heroPathRaw) {
    const heroSrc = expandPath(heroPathRaw);
    if (!(await pathExists(heroSrc))) {
      log(`hero image not found: ${heroSrc}`);
      process.exit(1);
    }
    const ext = extname(heroSrc).toLowerCase();
    if (!ext) {
      log('hero image must have a file extension');
      process.exit(1);
    }
    await mkdir(heroDir, { recursive: true });
    const heroDest = resolve(heroDir, `${slug}${ext}`);
    if (await pathExists(heroDest)) {
      log(`hero already exists at ${heroDest}; refusing to overwrite`);
      process.exit(1);
    }
    await copyFile(heroSrc, heroDest);
    heroDestRelative = `src/assets/post-heroes/${basename(heroDest)}`;
    log(`  copied → ${heroDestRelative}`);
    heroAlt = await ask('hero alt text', { required: true });
  }

  const draft = await askYesNo('save as draft?', true);

  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const isoDate = now.toISOString().replace(/\.\d{3}Z$/, 'Z');

  const fileName = `${year}-${month}-${slug}.mdx`;
  const filePath = resolve(blogDir, fileName);
  if (await pathExists(filePath)) {
    log(`post already exists: ${filePath}`);
    process.exit(1);
  }

  const frontmatter = ['---', `title: ${yamlString(title)}`, `date: ${isoDate}`];
  if (tags.length) {
    frontmatter.push('tags:');
    for (const tag of tags) frontmatter.push(`  - ${tag}`);
  }
  frontmatter.push(`category: ${category}`);
  if (description) frontmatter.push(`description: ${yamlString(description)}`);
  if (heroAlt) frontmatter.push(`featured_image_alt: ${yamlString(heroAlt)}`);
  if (draft) frontmatter.push('draft: true');
  frontmatter.push('---', '', `## ${title}`, '');

  await mkdir(blogDir, { recursive: true });
  await writeFile(filePath, frontmatter.join('\n'), 'utf8');

  process.stdout.write(
    `\n[new-post] created src/content/blog/${fileName}${draft ? ' (draft)' : ''}\n`,
  );
  if (heroDestRelative) process.stdout.write(`[new-post] hero copied to ${heroDestRelative}\n`);
  process.stdout.write('\n');
}

main()
  .catch((err) => {
    log(err.stack || err.message || String(err));
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });
