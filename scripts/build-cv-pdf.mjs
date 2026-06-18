// ABOUTME: Generates public/cv/esteban-torres-cv.pdf by delegating to the cv.git submodule's `mise run pdf` task.
// ABOUTME: The submodule owns the typography (modern.css) + weasyprint pipeline; this script just runs it and copies the result.
//
// Usage:
//   bun run cv:pdf           # mise run pdf in external/cv/ -> copy cv.pdf to public/cv/esteban-torres-cv.pdf

import { spawn } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const submoduleDir = resolve(projectRoot, 'external', 'cv');
const sourcePdf = resolve(submoduleDir, 'cv.pdf');
const outDir = resolve(projectRoot, 'public', 'cv');
const outFile = resolve(outDir, 'esteban-torres-cv.pdf');

function log(msg) {
  process.stdout.write(`[cv:pdf] ${msg}\n`);
}

function run(cmd, args, opts = {}) {
  return new Promise((resolveProc, rejectProc) => {
    const child = spawn(cmd, args, {
      cwd: submoduleDir,
      stdio: 'inherit',
      ...opts,
    });
    child.on('exit', (code) =>
      code === 0 ? resolveProc() : rejectProc(new Error(`${cmd} ${args.join(' ')} exited ${code}`)),
    );
    child.on('error', rejectProc);
  });
}

log('running `mise run pdf` in external/cv/…');
await run('mise', ['run', 'pdf']);

log(`copying ${sourcePdf} → ${outFile}`);
await mkdir(outDir, { recursive: true });
await copyFile(sourcePdf, outFile);

log('done.');
