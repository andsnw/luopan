# 参与贡献

感谢你帮 AI 罗盘变得更好！收录完全免费，不接受付费排名。

## 收录标准

- 是一个真实可用的 AI 产品、开源项目或学习资源，不是只有落地页的预约产品
- 有明确的用途，能用一句话说清楚它帮用户做什么
- 不收录：套壳后没有任何附加价值的站点、违法或灰色用途的工具、需要付费才能看到任何功能的工具

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | ✓ | 唯一标识，小写字母、数字和连字符，会成为详情页网址 `/t/<id>/`，确定后不要改 |
| `name` | ✓ | 工具名称，有中文名的写中文名 |
| `url` | ✓ | 官网地址，必须是 https |
| `cat` | ✓ | 分类 id，见 `categories` 列表：`chat` `search` `writing` `image` `image-edit` `video` `audio` `code` `design` `office` `agent` `dev` `learn` |
| `desc` | ✓ | 一句话简介，60 字以内。写清楚“能做什么”，少用“强大”“领先”这类形容词 |
| `price` | ✓ | `free` 完全免费 / `freemium` 有免费额度 / `paid` 只能付费 |
| `tags` | | 最多 4 个标签，用于搜索 |
| `cn` | | 中国大陆网络下可以直接访问和注册时写 `true` |
| `oss` | | 开源项目写仓库地址 |
| `icon` | | 官网图标抓不到时，指定从哪个网址取图标 |
| `featured` | | 编辑精选，由维护者决定 |

## 提交步骤

```bash
npm run validate   # 检查数据格式
npm run icons      # 下载新工具的图标到 public/icons/
npm run dev        # 本地预览
```

把 `data/tools.json` 和新下载的图标一起提交。README 里的工具列表由 `npm run build` 自动生成，不需要手动改。

## 发现信息有误

工具改名、换域名、关停或者国内访问情况变了，欢迎直接提 issue 或 PR。`npm run check-links` 可以批量检查所有链接。
