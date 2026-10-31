import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PRICES = {
  free: '免费',
  freemium: '免费额度',
  paid: '付费',
};

export function loadData() {
  return JSON.parse(readFileSync(join(ROOT, 'data/tools.json'), 'utf8'));
}

/** Returns a list of problems; empty means the data is valid. */
export function validate(data) {
  const errors = [];
  const catIds = new Set();
  for (const c of data.categories) {
    if (!/^[a-z0-9-]+$/.test(c.id)) errors.push(`分类 id 只能用小写字母、数字和连字符：${c.id}`);
    if (catIds.has(c.id)) errors.push(`分类 id 重复：${c.id}`);
    catIds.add(c.id);
  }
  const ids = new Set();
  const urls = new Map();
  for (const [i, t] of data.tools.entries()) {
    const where = `tools[${i}] ${t.name ?? ''}`;
    for (const k of ['id', 'name', 'url', 'cat', 'desc', 'price']) {
      if (!t[k]) errors.push(`${where}：缺少字段 ${k}`);
    }
    if (t.id && !/^[a-z0-9-]+$/.test(t.id)) errors.push(`${where}：id 只能用小写字母、数字和连字符`);
    if (ids.has(t.id)) errors.push(`${where}：id 重复 ${t.id}`);
    ids.add(t.id);
    if (t.cat && !catIds.has(t.cat)) errors.push(`${where}：未知分类 ${t.cat}`);
    if (t.price && !PRICES[t.price]) errors.push(`${where}：price 只能是 ${Object.keys(PRICES).join(' / ')}`);
    for (const k of ['url', 'oss', 'icon']) {
      if (t[k] && !/^https:\/\/[^\s]+$/.test(t[k])) errors.push(`${where}：${k} 必须是 https 链接`);
    }
    if (t.desc && t.desc.length > 60) errors.push(`${where}：简介请控制在 60 字以内（现在 ${t.desc.length} 字）`);
    if (t.tags && (!Array.isArray(t.tags) || t.tags.length > 4)) errors.push(`${where}：tags 是数组，最多 4 个`);
    if (t.url) {
      const key = t.url.replace(/\/+$/, '').replace('://www.', '://');
      if (urls.has(key)) errors.push(`${where}：网址和 ${urls.get(key)} 重复`);
      urls.set(key, t.name);
    }
  }
  return errors;
}

export function hostOf(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}
