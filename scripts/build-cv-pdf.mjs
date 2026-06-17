// ABOUTME: Generates public/cv/esteban-torres-cv.pdf from /cv/print/ rendered by the site itself.
// ABOUTME: Uses puppeteer + print media emulation so the PDF matches the site's typography exactly.
//
// Usage:
//   bun run cv:pdf           # builds the site, serves it, snapshots PDF, tears down
//
// Why we don't reuse the cv.git repo's weasyprint build: that one ships md2resume's stock
// CSS, not the site design tokens. This script renders through OUR site so the PDF carries
// Bricolage + Vollkorn + Geist Mono + honey accent + the cv.css print stylesheet.

import { spawn } from 'node:child_process';
import { mkdir, access } from 'node:fs/promises';
import { constants as FS } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const outDir = resolve(projectRoot, 'public', 'cv');
const outFile = resolve(outDir, 'esteban-torres-cv.pdf');
const distDir = resolve(projectRoot, 'dist');

const PORT = 4329; // out of the way of the usual 4321 dev server

function log(msg) {
  process.stdout.write(`[cv:pdf] ${msg}\n`);
}

function run(cmd, args, opts = {}) {
  return new Promise((resolveProc, rejectProc) => {
    const child = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      ...opts,
    });
    let out = '';
    let err = '';
    child.stdout?.on('data', (d) => (out += d.toString()));
    child.stderr?.on('data', (d) => (err += d.toString()));
    child.on('exit', (code) =>
      code === 0
        ? resolveProc({ out, err })
        : rejectProc(new Error(`${cmd} exited ${code}\n${err}`)),
    );
    child.on('error', rejectProc);
  });
}

async function waitForServer(url, attempts = 40, intervalMs = 250) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* keep polling */
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`server did not come up at ${url}`);
}

// 1. Build the site (so the dist/ is current).
log('building site…');
await run('bun', ['run', 'build']);

// 2. Verify dist/cv/print/index.html exists.
const printHtmlPath = resolve(distDir, 'cv', 'print', 'index.html');
try {
  await access(printHtmlPath, FS.R_OK);
} catch {
  throw new Error(
    `dist/cv/print/index.html not found at ${printHtmlPath} — did the build skip the print page?`,
  );
}

// 3. Start a static server on dist/ so puppeteer can fetch fonts + CSS via http.
log(`serving dist/ on http://localhost:${PORT}…`);
// NOTE: do NOT pass `-s` (SPA mode) — that makes serve fall back every unknown
// path to index.html, which silently served the homepage as /cv/print/ once.
// Default mode serves the actual file at the requested path.
const server = spawn('bun', ['x', 'serve', '-l', String(PORT), distDir], {
  cwd: projectRoot,
  stdio: ['ignore', 'pipe', 'pipe'],
});
const cleanup = () => {
  if (!server.killed) server.kill('SIGTERM');
};
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});

try {
  await waitForServer(`http://localhost:${PORT}/cv/print/`);

  // 4. Puppeteer-print the page to PDF using the site's @media print stylesheet.
  log('rendering /cv/print/ to PDF…');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/cv/print/`, { waitUntil: 'networkidle0' });
    // Force the site's light theme — print stylesheet expects ink-on-white.
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        /* ignored */
      }
    });
    await page.emulateMediaType('print');
    // Give web fonts a moment to load.
    await page.evaluateHandle('document.fonts.ready');

    await mkdir(outDir, { recursive: true });
    await page.pdf({
      path: outFile,
      format: 'A4',
      printBackground: false,
      margin: { top: '14mm', right: '14mm', bottom: '14mm', left: '14mm' },
      preferCSSPageSize: false,
    });

    log(`wrote ${outFile}`);
    await page.close();
  } finally {
    await browser.close();
  }
} finally {
  cleanup();
}

log('done.');
