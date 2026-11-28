import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const CONFIG = {
  htmlFiles: ['index.html', 'builder.html', 'screener.html', 'templates.html', 'templates-pro.html'],
  jsFiles: ['app.js', 'builder.js', 'templates.js'],
  cssFiles: ['style.css', 'tailwind.css'],
  staticFiles: ['banner.png', 'banner.svg', 'robots.txt', 'sitemap.xml', 'vercel.json'],
  copyDirs: ['api']
};

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'dist');

/** Minifies and mangles local JS symbols cleanly without --toplevel breakage. */
function hardenJs(sourceCode, label) {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const tmpIn = path.join(os.tmpdir(), `mfa-in-${stamp}.js`);
  const tmpOut = path.join(os.tmpdir(), `mfa-out-${stamp}.js`);
  try {
    fs.writeFileSync(tmpIn, sourceCode, 'utf8');
    const isWin = process.platform === 'win32';
    const args = ['-y', 'terser', tmpIn, '--compress', 'drop_debugger=true', '--mangle', '-o', tmpOut];
    const res = spawnSync(isWin ? 'cmd.exe' : 'npx', isWin ? ['/d', '/c', 'npx', ...args] : args, { encoding: 'utf8' });
    if (res.status !== 0) throw new Error(`Terser failed on ${label}: ${res.stderr || res.stdout}`);
    const out = fs.readFileSync(tmpOut, 'utf8');
    new vm.Script(out, { filename: label });
    return out;
  } finally {
    if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
    if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);
  }
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

function hardenHtml(html, label) {
  const preserved = [];
  const hold = (val) => {
    const k = `__MFA_BLOCK_${preserved.length}__`;
    preserved.push(val);
    return k;
  };
  let out = html.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (_, a, c) => hold(`<style${a}>${minifyCss(c)}</style>`));
  out = out.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, a, b) => {
    if (/\bsrc\s*=/i.test(a) || !b.trim()) return hold(full);
    const typeMatch = a.match(/\btype\s*=\s*["']?([^"'\s>]+)/i);
    const sType = typeMatch ? typeMatch[1].toLowerCase() : '';
    if (sType === 'application/ld+json') {
      try { return hold(`<script${a}>${JSON.stringify(JSON.parse(b))}</script>`); } catch { return hold(full); }
    }
    if (sType && sType !== 'text/javascript' && sType !== 'module') return hold(full);
    return hold(`<script${a}>${hardenJs(b, label)}</script>`);
  });
  out = out.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s*\r?\n\s*</g, '><').trim();
  return out.replace(/__MFA_BLOCK_(\d+)__/g, (_, i) => preserved[Number(i)]);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) copyRecursive(path.join(src, entry), path.join(dest, entry));
  } else {
    fs.copyFileSync(src, dest);
  }
}

function buildTailwindCss() {
  const isWin = process.platform === 'win32';
  const localBin = path.join(rootDir, 'node_modules', '.bin', isWin ? 'tailwindcss.cmd' : 'tailwindcss');
  const args = ['-i', 'src/tailwind.input.css', '-o', 'tailwind.css', '--minify'];
  const res = fs.existsSync(localBin)
    ? spawnSync(isWin ? 'cmd.exe' : localBin, isWin ? ['/d', '/c', localBin, ...args] : args, { cwd: rootDir, encoding: 'utf8' })
    : spawnSync(isWin ? 'cmd.exe' : 'npx', isWin ? ['/d', '/c', 'npx', '-y', 'tailwindcss@3', ...args] : ['-y', 'tailwindcss@3', ...args], { cwd: rootDir, encoding: 'utf8' });
  if (res.status !== 0) {
    throw new Error(`Tailwind build failed: ${res.stderr || res.stdout}`);
  }
}

function build() {
  buildTailwindCss();
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });

  for (const file of CONFIG.htmlFiles) {
    const src = path.join(rootDir, file);
    if (!fs.existsSync(src)) continue;
    const raw = fs.readFileSync(src, 'utf8');
    const out = hardenHtml(raw, `${file}#inline`);
    fs.writeFileSync(path.join(distDir, file), out, 'utf8');
    console.log(`${file}: ${raw.length} -> ${out.length} bytes`);
  }
  for (const file of CONFIG.jsFiles) {
    const src = path.join(rootDir, file);
    if (!fs.existsSync(src)) continue;
    const raw = fs.readFileSync(src, 'utf8');
    const out = hardenJs(raw, file);
    fs.writeFileSync(path.join(distDir, file), out, 'utf8');
    console.log(`${file}: ${raw.length} -> ${out.length} bytes`);
  }
  for (const file of CONFIG.cssFiles) {
    const src = path.join(rootDir, file);
    if (!fs.existsSync(src)) continue;
    const raw = fs.readFileSync(src, 'utf8');
    const out = minifyCss(raw);
    fs.writeFileSync(path.join(distDir, file), out, 'utf8');
    console.log(`${file}: ${raw.length} -> ${out.length} bytes`);
  }
  for (const file of CONFIG.staticFiles) {
    const src = path.join(rootDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(distDir, file));
  }
  for (const dir of CONFIG.copyDirs) copyRecursive(path.join(rootDir, dir), path.join(distDir, dir));
}

build();
