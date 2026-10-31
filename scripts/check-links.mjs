// Checks every tool URL and reports ones that look dead or moved.
// Many sites block bots (403/429) or are slow from some regions, so treat
// the output as hints to review by hand, not as definitive.
import { loadData } from './lib.mjs';

const { tools, own } = loadData();
const items = [...tools, ...own].flatMap((t) => [
  { t, url: t.url },
  ...(t.oss && t.oss !== t.url ? [{ t, url: t.oss }] : []),
]);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const bad = [];
const queue = [...items];
await Promise.all(
  Array.from({ length: 10 }, async () => {
    while (queue.length) {
      const { t, url } = queue.shift();
      try {
        const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(15000) });
        const moved = new URL(res.url).hostname.replace(/^www\./, '') !== new URL(url).hostname.replace(/^www\./, '');
        if (res.status === 404 || res.status >= 500) bad.push(`${res.status}  ${t.id}  ${url}`);
        else if (moved) bad.push(`跳转  ${t.id}  ${url} -> ${res.url}`);
      } catch (e) {
        bad.push(`失败  ${t.id}  ${url}  (${e.cause?.code || e.name})`);
      }
    }
  }),
);
console.log(`检查了 ${items.length} 个链接。`);
if (bad.length) {
  console.log(`需要人工确认的 ${bad.length} 个：\n` + bad.sort().join('\n'));
  process.exitCode = 1;
}
