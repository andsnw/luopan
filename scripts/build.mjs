// Static site generator: data/tools.json -> dist/
// Zero dependencies; run with `npm run build`.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PRICES, ROOT, hostOf, loadData, validate } from './lib.mjs';

const SITE = {
  name: 'AI 罗盘',
  en: 'Luopan',
  url: (process.env.SITE_URL || 'https://woodti.github.io/luopan/').replace(/\/?$/, '/'),
  repo: 'https://github.com/woodti/luopan',
};
const DIST = join(ROOT, 'dist');

const data = loadData();
const errors = validate(data);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const { categories, tools, own } = data;
const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
const byCat = Object.fromEntries(categories.map((c) => [c.id, tools.filter((t) => t.cat === c.id)]));

// ---------- helpers ----------
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

const iconFile = (id) => ['svg', 'png'].map((ext) => `${id}.${ext}`).find((f) => existsSync(join(ROOT, 'public/icons', f)));

function hue(id) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

function logo(t, p, size = '') {
  const letter = esc([...t.name.replace(/^[^\p{L}\p{N}]+/u, '')][0]?.toUpperCase() || '?');
  const file = iconFile(t.id);
  const img = file ? `<img src="${p}icons/${file}" alt="" loading="lazy" width="32" height="32">` : '';
  return `<span class="logo ${size}" style="--h:${hue(t.id)}" aria-hidden="true"><span>${letter}</span>${img}</span>`;
}

function badges(t) {
  const b = [];
  if (t.cn) b.push('<span class="badge cn" title="国内网络可直接访问">国内可用</span>');
  b.push(`<span class="badge price-${t.price}">${PRICES[t.price]}</span>`);
  if (t.oss) b.push('<span class="badge oss" title="代码开源">开源</span>');
  return b.join('');
}

function searchText(t) {
  return [t.name, t.id, hostOf(t.url), t.desc, ...(t.tags || []), catById[t.cat].name].join(' ').toLowerCase();
}

function card(t, p) {
  return `<article class="card" data-id="${t.id}" data-cat="${t.cat}" data-price="${t.price}"${t.cn ? ' data-cn' : ''}${t.oss ? ' data-oss' : ''} data-s="${esc(searchText(t))}">
<a class="card-main" href="${esc(t.url)}" target="_blank" rel="noopener" data-visit="${t.id}">
${logo(t, p)}<span class="card-body"><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></span>
</a>
<div class="card-foot"><span class="badges">${badges(t)}</span><a class="more" href="${p}t/${t.id}/" title="${esc(t.name)} 详情">详情</a><button class="fav" type="button" data-fav="${t.id}" aria-label="收藏 ${esc(t.name)}" aria-pressed="false">★</button></div>
</article>`;
}

const grid = (list, p) => `<div class="grid">${list.map((t) => card(t, p)).join('\n')}</div>`;

let assetVersion = '';

function page({ path, title, desc, body, p, jsonld, active = '' }) {
  const canonical = SITE.url + path;
  const fullTitle = title ? `${title} - ${SITE.name}` : `${SITE.name} - 好用的 AI 工具导航，国内可用一目了然`;
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#f6f5f1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#16171a" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${p}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${p}assets/style.css?v=${assetVersion}">
<script>try{var t=localStorage.getItem('lp-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<header class="topbar">
<div class="topbar-in">
<a class="brand" href="${p || './'}"><span class="brand-mark" aria-hidden="true">${compass}</span><span>${SITE.name}</span></a>
<form class="search" role="search" action="${p || './'}" method="get">
<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
<input id="q" name="q" type="search" placeholder="搜索 ${tools.length} 个 AI 工具，如：PPT、抠图、免费" autocomplete="off" aria-label="搜索 AI 工具">
<kbd>/</kbd>
</form>
<nav class="top-actions">
<a class="btn-ghost hide-sm" href="${SITE.repo}/issues/new?template=submit-tool.yml" target="_blank" rel="noopener">提交工具</a>
<a class="btn-ghost" href="${SITE.repo}" target="_blank" rel="noopener" aria-label="GitHub 仓库"><svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg><span class="hide-sm">Star</span></a>
<button class="btn-ghost" id="theme" type="button" aria-label="切换深色模式"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.4 5.4 0 0 1-9.54-4.9A5.4 5.4 0 0 1 13.36 3.1 9 9 0 0 0 12 3"/></svg></button>
</nav>
</div>
</header>
${body}
<footer class="footer">
<div class="wrap">
<p><strong>${SITE.name}</strong> 是一个开源的 AI 工具导航，数据全部在 <a href="${SITE.repo}/blob/main/data/tools.json" target="_blank" rel="noopener">tools.json</a> 里，欢迎 <a href="${SITE.repo}/issues/new?template=submit-tool.yml" target="_blank" rel="noopener">提交新工具</a> 或指出错误。</p>
<p class="muted">“国内可用”指在中国大陆网络下通常可以直接访问和注册，实际情况可能变化。本站不收费收录，没有广告。MIT 开源。</p>
</div>
</footer>
<script src="${p}assets/app.js?v=${assetVersion}" defer></script>
</body>
</html>
`;
  const file = join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const compass = `<svg viewBox="0 0 32 32" width="26" height="26"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M21.5 10.5 18 18l-7.5 3.5L14 14z" fill="currentColor"/></svg>`;

function sidebar(p, current) {
  return `<nav class="cats" aria-label="分类">
<a href="${p || './'}#featured" class="${current ? '' : 'on'}" data-nav="featured"><span>⭐</span>编辑精选</a>
${categories
  .map(
    (c) =>
      `<a href="${current ? `${p}c/${c.id}/` : `#${c.id}`}" class="${current === c.id ? 'on' : ''}" data-nav="${c.id}"><span>${c.emoji}</span>${esc(c.name)}<em>${byCat[c.id].length}</em></a>`,
  )
  .join('\n')}
</nav>`;
}

const filters = `<div class="filters" role="group" aria-label="筛选">
<button type="button" class="chip" data-filter="cn" aria-pressed="false">国内可用</button>
<button type="button" class="chip" data-filter="free" aria-pressed="false">免费可用</button>
<button type="button" class="chip" data-filter="oss" aria-pressed="false">开源</button>
</div>`;

const empty = `<div class="empty" id="empty" hidden>
<p>没有找到相关工具。</p>
<p><a href="${SITE.repo}/issues/new?template=submit-tool.yml" target="_blank" rel="noopener">推荐一个给我们 →</a></p>
</div>`;

function ownSection(p) {
  return `<section class="own" aria-labelledby="own-h">
<div class="sec-head"><h2 id="own-h">🛠️ 作者的开源小工具</h2><p>同样免费、开源、不用注册，数据只在你的浏览器里。</p></div>
<div class="grid">${own
    .map(
      (t) => `<article class="card"><a class="card-main" href="${esc(t.url)}" target="_blank" rel="noopener">${logo(t, p)}<span class="card-body"><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></span></a>
<div class="card-foot"><span class="badges"><span class="badge price-free">免费</span><span class="badge oss">开源</span></span><a class="more" href="${esc(t.repo)}" target="_blank" rel="noopener">GitHub</a></div></article>`,
    )
    .join('\n')}</div>
</section>`;
}

// ---------- build ----------
rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'assets'), { recursive: true });
const css = readFileSync(join(ROOT, 'src/style.css'));
const js = readFileSync(join(ROOT, 'src/app.js'));
assetVersion = createHash('sha1').update(css).update(js).digest('hex').slice(0, 8);
writeFileSync(join(DIST, 'assets/style.css'), css);
writeFileSync(join(DIST, 'assets/app.js'), js);
cpSync(join(ROOT, 'public'), DIST, { recursive: true });

const cnCount = tools.filter((t) => t.cn).length;
const homeDesc = `精选 ${tools.length} 个好用的 AI 工具：AI 对话、AI 绘画、AI 视频、AI 编程、PPT、抠图、配音……其中 ${cnCount} 个国内可直接使用。开源免费，没有广告。`;

// Home
page({
  path: '',
  p: '',
  desc: homeDesc,
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      potentialAction: { '@type': 'SearchAction', target: `${SITE.url}?q={q}`, 'query-input': 'required name=q' },
    },
  ],
  body: `<main class="wrap">
<section class="hero">
<h1>好用的 AI 工具，都在这里</h1>
<p>精选 <b>${tools.length}</b> 个 AI 工具，按用途分好类，<b>${cnCount}</b> 个国内可直接使用。开源、无广告，任何人都可以补充。</p>
${filters}
</section>
<div class="layout">
${sidebar('', '')}
<div class="sections">
<section id="mine" class="sec" hidden aria-labelledby="mine-h"><div class="sec-head"><h2 id="mine-h">📌 我的收藏</h2><p>点卡片右下角的 ★ 收藏，只保存在这个浏览器里。</p></div><div class="grid" id="mine-grid"></div></section>
<section id="recent" class="sec" hidden aria-labelledby="recent-h"><div class="sec-head"><h2 id="recent-h">🕘 最近打开</h2><button type="button" class="link" id="clear-recent">清空</button></div><div class="grid" id="recent-grid"></div></section>
<section id="featured" class="sec" aria-labelledby="featured-h"><div class="sec-head"><h2 id="featured-h">⭐ 编辑精选</h2><p>不知道从哪开始？先试试这些。</p></div>${grid(tools.filter((t) => t.featured), '')}</section>
${categories
  .map(
    (c) => `<section id="${c.id}" class="sec cat-sec" aria-labelledby="h-${c.id}">
<div class="sec-head"><h2 id="h-${c.id}"><a href="c/${c.id}/">${c.emoji} ${esc(c.name)}</a></h2><p>${esc(c.desc)}</p></div>
${grid(byCat[c.id], '')}
</section>`,
  )
  .join('\n')}
${empty}
${ownSection('')}
</div>
</div>
</main>`,
});

// Category pages
for (const c of categories) {
  const list = byCat[c.id];
  const p = '../../';
  page({
    path: `c/${c.id}/`,
    p,
    title: `${c.name}工具大全（${list.length} 个）`,
    desc: `${c.desc}收录 ${list.map((t) => t.name).slice(0, 8).join('、')} 等 ${list.length} 个${c.name}工具。`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${c.name}工具`,
      itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}t/${t.id}/`, name: t.name })),
    },
    body: `<main class="wrap">
<section class="hero hero-sm">
<nav class="crumbs"><a href="${p}">首页</a> / ${esc(c.name)}</nav>
<h1>${c.emoji} ${esc(c.name)}工具</h1>
<p>${esc(c.desc)}共 ${list.length} 个。</p>
${filters}
</section>
<div class="layout">
${sidebar(p, c.id)}
<div class="sections"><section class="sec cat-sec">${grid(list, p)}</section>${empty}</div>
</div>
</main>`,
  });
}

// Tool pages
for (const t of tools) {
  const c = catById[t.cat];
  const p = '../../';
  const related = byCat[t.cat].filter((x) => x.id !== t.id);
  const sameTag = tools.filter((x) => x.cat !== t.cat && x.tags?.some((tag) => t.tags?.includes(tag))).slice(0, 4);
  const alts = [...related.filter((x) => x.cn === t.cn), ...related.filter((x) => x.cn !== t.cn)].slice(0, 8);
  page({
    path: `t/${t.id}/`,
    p,
    title: `${t.name}：${t.desc.replace(/[。，].*$/, '')}`,
    desc: `${t.name}（${hostOf(t.url)}）：${t.desc}${t.cn ? '国内可直接使用。' : ''}价格：${PRICES[t.price]}。附官网入口和 ${alts.length} 个同类替代工具。`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: t.name,
      url: t.url,
      description: t.desc,
      applicationCategory: c.name,
      operatingSystem: 'Web',
      ...(t.price === 'free' ? { offers: { '@type': 'Offer', price: 0, priceCurrency: 'CNY' } } : {}),
    },
    body: `<main class="wrap narrow">
<nav class="crumbs"><a href="${p}">首页</a> / <a href="${p}c/${c.id}/">${esc(c.name)}</a> / ${esc(t.name)}</nav>
<article class="detail">
<div class="detail-head">
${logo(t, p, 'lg')}
<div><h1>${esc(t.name)}</h1><p class="host">${esc(hostOf(t.url))}</p></div>
</div>
<p class="lead">${esc(t.desc)}</p>
<dl class="facts">
<div><dt>分类</dt><dd><a href="${p}c/${c.id}/">${c.emoji} ${esc(c.name)}</a></dd></div>
<div><dt>价格</dt><dd>${PRICES[t.price]}</dd></div>
<div><dt>国内访问</dt><dd>${t.cn ? '可以直接使用' : '通常需要特殊网络环境'}</dd></div>
${t.oss ? `<div><dt>源代码</dt><dd><a href="${esc(t.oss)}" target="_blank" rel="noopener">${esc(t.oss.replace('https://github.com/', 'GitHub: '))}</a></dd></div>` : ''}
${t.tags?.length ? `<div><dt>标签</dt><dd class="tags">${t.tags.map((x) => `<a href="${p}?q=${encodeURIComponent(x)}">${esc(x)}</a>`).join('')}</dd></div>` : ''}
</dl>
<div class="detail-actions">
<a class="btn" href="${esc(t.url)}" target="_blank" rel="noopener" data-visit="${t.id}">打开 ${esc(t.name)} ↗</a>
<button class="btn-ghost fav" type="button" data-fav="${t.id}" aria-pressed="false">★ 收藏</button>
<a class="btn-ghost" href="${SITE.repo}/issues/new?title=${encodeURIComponent(`信息有误：${t.name}`)}" target="_blank" rel="noopener">信息有误？</a>
</div>
</article>
${alts.length ? `<section class="sec"><div class="sec-head"><h2>${esc(t.name)} 的同类工具</h2></div>${grid(alts, p)}</section>` : ''}
${sameTag.length ? `<section class="sec"><div class="sec-head"><h2>相关工具</h2></div>${grid(sameTag, p)}</section>` : ''}
</main>`,
  });
}

// 404
writeFileSync(
  join(DIST, '404.html'),
  `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>页面不存在 - ${SITE.name}</title><style>body{font:16px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;margin:0;background:#f6f5f1;color:#1d1d1f}@media(prefers-color-scheme:dark){body{background:#16171a;color:#ececec}}a{color:#2f6b4f}</style></head><body><div><h1>页面不存在</h1><p><a href="${SITE.url}">回到 ${SITE.name} 首页 →</a></p></div></body></html>`,
);

// sitemap & robots
const today = new Date().toISOString().slice(0, 10);
const urls = ['', ...categories.map((c) => `c/${c.id}/`), ...tools.map((t) => `t/${t.id}/`)];
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `<url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}sitemap.xml\n`);

// README tool list (awesome-list style), between markers
const readmePath = join(ROOT, 'README.md');
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8');
  const list = categories
    .map(
      (c) =>
        `### ${c.emoji} ${c.name}\n\n${byCat[c.id]
          .map(
            (t) =>
              `- [${t.name}](${t.url}) - ${t.desc}${t.cn ? ' `国内可用`' : ''}${t.price === 'free' ? ' `免费`' : ''}${t.oss ? ` [\`开源\`](${t.oss})` : ''}`,
          )
          .join('\n')}`,
    )
    .join('\n\n');
  const next = readme.replace(
    /<!-- TOOLS:START -->[\s\S]*<!-- TOOLS:END -->/,
    `<!-- TOOLS:START -->\n<!-- 以下内容由 npm run build 根据 data/tools.json 自动生成，请不要手动修改 -->\n\n${list}\n\n<!-- TOOLS:END -->`,
  );
  if (next !== readme) writeFileSync(readmePath, next);
}

console.log(`构建完成：${tools.length} 个工具，${categories.length + tools.length + 1} 个页面 -> dist/`);
