import { loadData, validate } from './lib.mjs';

const data = loadData();
const errors = validate(data);
if (errors.length) {
  console.error(`数据校验失败（${errors.length} 处）：\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`数据校验通过：${data.categories.length} 个分类，${data.tools.length} 个工具。`);
