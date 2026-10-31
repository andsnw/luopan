// Downloads each tool's favicon into public/icons/<id>.png so the site never
// loads third-party images at runtime (fast in mainland China, no tracking).
// Usage: npm run icons            -> fetch only missing icons
//        npm run icons -- --force -> refetch all
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadData } from './lib.mjs';

const force = process.argv.includes('--force');
const dir = join(ROOT, 'public/icons');
mkdirSync(dir, { recursive: true });

const { tools, own } = loadData();
const items = [...tools, ...own];
const has = (id) => ['png', 'svg'].some((ext) => existsSync(join(dir, `${id}.${ext}`)));
const todo = items.filter((t) => force || !has(t.id));

async function fetchIcon(t) {
  // `icon` in tools.json overrides which site's favicon to use.
  const target = new URL(t.icon || t.url);
  // GitHub-hosted tools all share GitHub's icon; use the repo owner's avatar instead.
  if (target.hostname === 'github.com' && target.pathname.length > 1) {
    const owner = target.pathname.split('/')[1];
    const res = await fetch(`https://github.com/${owner}.png?size=64`);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    return null;
  }
  const res = await fetch(
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(target.origin)}&sz=64`,
  );
  if (res.ok) return Buffer.from(await res.arrayBuffer());
  // 404 means Google only has its generic globe icon; try the site's own favicon.
  const own = await fetch(`${target.origin}/favicon.ico`, { signal: AbortSignal.timeout(8000) });
  const type = own.headers.get('content-type') || '';
  if (own.ok && type.startsWith('image/')) return Buffer.from(await own.arrayBuffer());
  return null;
}

let ok = 0;
const missing = [];
const queue = [...todo];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const t = queue.shift();
      try {
        const buf = await fetchIcon(t);
        if (buf && buf.length > 100) {
          writeFileSync(join(dir, `${t.id}.png`), buf);
          ok++;
        } else missing.push(t.id);
      } catch {
        missing.push(t.id);
      }
    }
  }),
);
console.log(`图标：新下载 ${ok} 个，跳过 ${items.length - todo.length} 个已有图标。`);
if (missing.length) console.log(`以下工具没拿到图标，会显示首字母：${missing.join(', ')}`);
