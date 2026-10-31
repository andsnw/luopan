<div align="center">

# 🧭 AI 罗盘 Luopan

**开源的 AI 工具导航：好用的都在这，国内能不能用一眼就知道。**

精选 150+ 个 AI 工具，按用途分成 13 类，每个都标注了「国内可用 / 免费 / 开源」。

没有广告 · 不收费收录 · 数据全在一个 JSON 文件里 · 任何人都能补充

[在线访问](https://woodti.github.io/luopan/) · [提交工具](https://github.com/woodti/luopan/issues/new?template=submit-tool.yml) · [English](#english)

</div>

## 特色

- **国内可用标注**：每个工具都标了国内网络能不能直接用，还可以一键只看国内可用的
- **搜索很快**：按名称、用途、标签搜索，比如「抠图」「PPT」「免费」，按 `/` 或 `Ctrl+K` 聚焦搜索框
- **收藏和最近打开**：常用工具点 ★ 收藏，只保存在你的浏览器里，不用注册
- **每个工具一个详情页**：官网入口、价格、是否开源，加上同类替代工具推荐
- **深色模式、手机适配**
- **零依赖**：构建脚本只用 Node.js 自带模块，生成纯静态 HTML，页面不加载任何第三方资源，国内打开也快

## 自己部署一个

Fork 本仓库，在仓库设置里打开 **Settings → Pages → Source: GitHub Actions**，推送后会自动部署到 `https://<你的用户名>.github.io/luopan/`。

也可以部署到 Vercel、Netlify、Cloudflare Pages 或 EdgeOne Pages：构建命令填 `npm run build`，输出目录填 `dist`，并设置环境变量 `SITE_URL` 为你的网址（用于 sitemap 和 canonical 链接）。

本地预览：

```bash
npm run dev      # 构建并打开 http://localhost:4173
```

## 收录一个工具

最简单的方式：[填写提交表单](https://github.com/woodti/luopan/issues/new?template=submit-tool.yml)。

或者直接改 [`data/tools.json`](data/tools.json) 提 PR，加一条：

```json
{
  "id": "my-tool",
  "name": "工具名",
  "url": "https://example.com",
  "cat": "image",
  "desc": "一句话说清它能做什么，60 字以内。",
  "tags": ["标签1", "标签2"],
  "price": "freemium",
  "cn": true,
  "oss": "https://github.com/owner/repo"
}
```

详细说明见 [CONTRIBUTING.md](CONTRIBUTING.md)。提交前运行 `npm run validate` 检查格式，`npm run icons` 下载图标。

## 工具列表

<!-- TOOLS:START -->
<!-- 以下内容由 npm run build 根据 data/tools.json 自动生成，请不要手动修改 -->

### 💬 AI 对话

- [ChatGPT](https://chatgpt.com) - OpenAI 出品，用户最多的 AI 助手，支持联网、画图、语音和文件分析。
- [Claude](https://claude.ai) - Anthropic 出品，擅长长文写作、代码和复杂推理，支持超长上下文。
- [Gemini](https://gemini.google.com) - Google 的 AI 助手，接入搜索和 Google 全家桶，能生成图片和视频。
- [DeepSeek](https://chat.deepseek.com) - 深度求索出品的国产大模型，推理和编程能力强，免费使用，模型开源。 `国内可用` `免费`
- [豆包](https://www.doubao.com) - 字节跳动出品的 AI 助手，聊天、写作、画图、语音通话样样能做。 `国内可用` `免费`
- [Kimi](https://www.kimi.com) - 月之暗面出品，擅长读长文档和联网搜索，能一次读完几十个文件。 `国内可用` `免费`
- [千问](https://www.qianwen.com) - 阿里巴巴的 AI 助手（原通义千问），基于开源 Qwen 模型，能写能画能读文档。 `国内可用` `免费`
- [腾讯元宝](https://yuanbao.tencent.com) - 腾讯的 AI 助手，可选混元和 DeepSeek 模型，能搜公众号文章。 `国内可用` `免费`
- [文心](https://wenxin.baidu.com) - 百度出品的大模型助手（原文心一言），中文理解强，能搜索、写作和画图。 `国内可用` `免费`
- [智谱清言](https://chatglm.cn) - 智谱 AI 出品，基于 GLM 系列模型，支持智能体和数据分析。 `国内可用` `免费`
- [Grok](https://grok.com) - xAI 出品，能读取 X（推特）上的实时内容，风格直接。
- [Microsoft Copilot](https://copilot.microsoft.com) - 微软的 AI 助手，集成必应搜索，可在 Windows 和 Office 中使用。
- [Le Chat](https://chat.mistral.ai) - 法国 Mistral AI 的聊天助手，回答速度很快。
- [Poe](https://poe.com) - 一个账号用遍 GPT、Claude、Gemini 等上百个模型和机器人。

### 🔎 AI 搜索

- [Perplexity](https://www.perplexity.ai) - AI 搜索的代表，直接给出带引用来源的答案，可以连续追问。
- [秘塔 AI 搜索](https://metaso.cn) - 没有广告的国产 AI 搜索，能生成大纲和脑图，支持学术搜索。 `国内可用` `免费`
- [纳米 AI 搜索](https://www.n.cn) - 360 出品的 AI 搜索，可同时调用多个大模型，能把结果做成视频。 `国内可用` `免费`
- [天工 AI](https://www.tiangong.cn) - 昆仑万维出品，AI 搜索加智能体，能生成报告、PPT 和网页。 `国内可用`
- [知乎直答](https://zhida.zhihu.com) - 基于知乎社区内容的 AI 搜索，答案来自真实用户的经验分享。 `国内可用` `免费`
- [Felo](https://felo.ai) - 支持多语言的 AI 搜索，能把搜索结果一键生成 PPT 和思维导图。
- [Consensus](https://consensus.app) - 只搜科研论文的 AI 搜索，告诉你学界对一个问题的共识。

### ✍️ AI 写作

- [Notion AI](https://www.notion.com/product/ai) - 笔记里的 AI 助手，能写作、总结，并搜索整个工作区的内容。
- [Grammarly](https://www.grammarly.com) - 英文写作必备，实时检查语法、拼写和语气，还能改写句子。
- [QuillBot](https://quillbot.com) - 英文改写和降重工具，还能检查语法、总结和查引用。
- [Jasper](https://www.jasper.ai) - 给营销团队用的 AI 写作平台，能保持统一的品牌语气。
- [Copy.ai](https://www.copy.ai) - 写销售和营销文案的 AI 平台，能搭建自动化内容流程。
- [笔灵 AI](https://ibiling.cn) - 国产 AI 写作工具，有工作总结、公文、论文等上百种写作模板。 `国内可用`

### 🎨 AI 绘画

- [Midjourney](https://www.midjourney.com) - 画面审美最好的 AI 绘画工具之一，适合插画、概念图和摄影风格。
- [即梦 AI](https://jimeng.jianying.com) - 字节跳动的 AI 创作平台，能画图和生成视频，图片里的中文写得准。 `国内可用`
- [LiblibAI 哩布哩布](https://www.liblib.art) - 国内最大的 AI 绘画模型社区，海量 LoRA 和模型，可在线生图。 `国内可用`
- [吐司 TusiArt](https://tusiart.com) - AI 绘画模型分享社区，支持在线生图和 ComfyUI 工作流。 `国内可用`
- [Ideogram](https://ideogram.ai) - 擅长在图片中准确排版文字，适合做海报、Logo 和封面。
- [FLUX](https://bfl.ai) - Black Forest Labs 的图像模型，画面真实，有开源版本可本地运行。
- [Leonardo.Ai](https://leonardo.ai) - 适合游戏和设计素材的 AI 绘画平台，有大量预设风格。
- [Recraft](https://www.recraft.ai) - 能生成可编辑的矢量图和图标，适合品牌设计。
- [Krea](https://www.krea.ai) - 实时 AI 绘画，边画草图边出图，还能放大图片和生成视频。
- [通义万相 Wan](https://wan.video) - 阿里的图像和视频生成模型，模型开源，可以本地部署。 `国内可用`
- [ComfyUI](https://www.comfy.org) - 节点式的 AI 绘画工作流工具，本地运行，功能最强大、最灵活。 `免费` [`开源`](https://github.com/comfyanonymous/ComfyUI)
- [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) - 最经典的 Stable Diffusion 本地网页界面，插件生态丰富。 `免费` [`开源`](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

### 🖼️ 图片处理

- [remove.bg](https://www.remove.bg) - 上传图片，5 秒自动抠图去背景，人像和商品都很干净。
- [Clipdrop](https://clipdrop.co) - 一站式图片处理：去背景、消除杂物、补光、放大。
- [Photoroom](https://www.photoroom.com) - 电商商品图神器，抠图后一键换上 AI 生成的场景背景。
- [佐糖](https://picwish.cn) - 在线抠图、去水印、老照片修复和变清晰。 `国内可用`
- [美图设计室](https://www.designkit.com) - 美图出品，商品图、海报、AI 换背景和模特试衣。 `国内可用`
- [Magnific](https://www.magnific.com) - AI 图片放大和细节重绘，把低清图变成高清大图。
- [Cleanup.pictures](https://cleanup.pictures) - 涂抹一下就能去掉照片里的路人、文字和杂物。
- [Upscayl](https://upscayl.org) - 免费的桌面端 AI 图片放大软件，本地运行，支持多平台。 `免费` [`开源`](https://github.com/upscayl/upscayl)

### 🎬 AI 视频

- [可灵 AI](https://kling.ai) - 快手出品的视频生成模型，动作自然，能生成长镜头和口型同步。 `国内可用`
- [海螺视频](https://hailuoai.com) - MiniMax 出品的 AI 视频，画面表现力强，支持图生视频。 `国内可用`
- [Vidu](https://www.vidu.cn) - 生数科技的视频大模型，多主体参考，角色前后一致。 `国内可用`
- [Sora](https://sora.com) - OpenAI 的视频生成模型，同时生成画面和声音。
- [Google Flow](https://labs.google/flow) - Google 基于 Veo 模型的 AI 电影制作工具，生成带声音的视频片段。
- [Runway](https://runway.com) - 专业创作者常用的 AI 视频平台，生成、编辑和特效都能做。
- [Pika](https://pika.art) - 好玩的 AI 视频工具，各种魔法特效，适合做短视频梗图。
- [Luma Dream Machine](https://lumalabs.ai) - 运镜流畅、画面电影感强的 AI 视频生成工具。
- [PixVerse 拍我 AI](https://pixverse.ai) - 生成速度快的 AI 视频工具，有大量热门特效模板。
- [HeyGen](https://www.heygen.com) - AI 数字人视频，能克隆自己的形象和声音，还能把视频翻译成多国语言。
- [Hedra](https://www.hedra.com) - 一张照片加一段声音，生成会说话、有表情的角色视频。
- [剪映](https://www.capcut.cn) - 字节跳动的剪辑软件，自动字幕、AI 配音、数字人和一键成片。 `国内可用`
- [腾讯智影](https://zenvideo.qq.com) - 腾讯的在线视频创作平台，数字人播报、文本配音和字幕识别。 `国内可用`
- [Descript](https://www.descript.com) - 像改文档一样剪视频和播客，删掉文字就删掉对应片段。

### 🎵 AI 音频

- [Suno](https://suno.com) - 输入一句话生成带人声的完整歌曲，支持中文歌词。
- [Udio](https://www.udio.com) - 高音质的 AI 音乐生成工具，可以续写和混音。
- [海绵音乐](https://www.haimian.com) - 字节跳动的 AI 音乐创作工具，免费生成中文歌曲。 `国内可用` `免费`
- [ElevenLabs](https://elevenlabs.io) - 最逼真的 AI 配音和声音克隆，支持几十种语言，还能生成音效。
- [Fish Audio](https://fish.audio) - 中文效果很好的语音合成和声音克隆平台，有海量音色。
- [魔音工坊](https://www.moyin.com) - 短视频配音工具，几百种主播音色，支持多音字和停顿调整。 `国内可用`
- [通义听悟](https://tingwu.aliyun.com) - 阿里的音视频转文字工具，自动区分发言人、总结要点。 `国内可用`
- [讯飞听见](https://www.iflyrec.com) - 科大讯飞的录音转文字和实时字幕，支持多种方言。 `国内可用`
- [Whisper](https://github.com/openai/whisper) - OpenAI 开源的语音识别模型，支持近百种语言，可本地运行。 `免费` [`开源`](https://github.com/openai/whisper)
- [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) - 开源声音克隆，1 分钟语音就能训练出像你的声音。 `免费` [`开源`](https://github.com/RVC-Boss/GPT-SoVITS)
- [CosyVoice](https://github.com/FunAudioLLM/CosyVoice) - 阿里开源的多语言语音合成模型，支持零样本声音克隆和情感控制。 `免费` [`开源`](https://github.com/FunAudioLLM/CosyVoice)

### 👨‍💻 AI 编程

- [Claude Code](https://www.claude.com/product/claude-code) - Anthropic 的编程智能体，在终端和 IDE 里读代码、改代码、跑命令。
- [Cursor](https://cursor.com) - AI 优先的代码编辑器，智能补全和智能体模式，能理解整个项目。
- [GitHub Copilot](https://github.com/features/copilot) - GitHub 的 AI 编程助手，支持 VS Code、JetBrains 等主流编辑器。
- [OpenAI Codex](https://openai.com/codex/) - OpenAI 的编程智能体，可在终端、IDE 和云端并行处理任务。
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) - Google 开源的终端 AI 编程助手，有免费额度。 `免费` [`开源`](https://github.com/google-gemini/gemini-cli)
- [Trae](https://www.trae.cn) - 字节跳动的 AI 编辑器，国内版内置豆包和 DeepSeek 模型。 `国内可用` `免费`
- [通义灵码](https://lingma.aliyun.com) - 阿里云的 AI 编程助手，支持主流 IDE，个人版免费。 `国内可用` `免费`
- [CodeBuddy](https://www.codebuddy.ai) - 腾讯云的 AI 编程助手，有 IDE 插件和独立的 AI 编辑器。 `国内可用`
- [Kiro](https://kiro.dev) - 亚马逊的 AI IDE，先写需求和设计文档，再按规格生成代码。
- [Cline](https://cline.bot) - 开源的 VS Code 编程智能体插件，可接入任意模型 API。 `免费` [`开源`](https://github.com/cline/cline)
- [Aider](https://aider.chat) - 开源的终端结对编程工具，改完代码自动提交 Git。 `免费` [`开源`](https://github.com/Aider-AI/aider)
- [OpenCode](https://opencode.ai) - 开源的终端编程智能体，支持几十家模型提供商。 `免费` [`开源`](https://github.com/sst/opencode)
- [Zed](https://zed.dev) - Rust 写的高性能开源编辑器，内置 AI 助手和多人协作。 [`开源`](https://github.com/zed-industries/zed)
- [v0](https://v0.app) - Vercel 出品，一句话生成 React 网页和应用，一键部署上线。
- [Bolt.new](https://bolt.new) - 在浏览器里用对话生成并运行全栈应用，不用配环境。
- [Lovable](https://lovable.dev) - 用对话做出完整的 Web 应用，自带数据库和登录。
- [Replit](https://replit.com) - 在线 IDE 加 AI 智能体，从想法到上线一站完成。

### 📐 AI 设计

- [Figma](https://www.figma.com) - 主流协作设计工具，Figma Make 可以用对话生成可交互原型。
- [Stitch](https://stitch.withgoogle.com) - Google 的 AI UI 设计工具，用文字或草图生成界面，可导出到 Figma。 `免费`
- [Lovart](https://www.lovart.ai) - 设计智能体，一句话生成品牌全套视觉：Logo、海报、包装。
- [Canva 可画](https://www.canva.cn) - 海量模板的在线设计平台，内置 AI 生图和魔法编辑。 `国内可用`
- [稿定设计](https://www.gaoding.com) - 国产在线设计工具，电商、新媒体模板多，有 AI 商品图和 AI 设计。 `国内可用`
- [Framer](https://www.framer.com) - 设计即上线的网站搭建工具，AI 可以生成整页布局。
- [Uizard](https://uizard.io) - 把手绘草图或截图转成可编辑的 UI 设计稿。

### 📊 办公效率

- [Gamma](https://gamma.app) - 输入主题自动生成精美 PPT、文档和网页，排版好看。
- [AiPPT](https://www.aippt.cn) - 国产 AI 生成 PPT，模板多，支持导入 Word 和 PDF 一键转换。 `国内可用`
- [WPS AI](https://ai.wps.cn) - 金山办公的 AI 助手，在文档、表格、PPT 里直接写作和处理数据。 `国内可用`
- [NotebookLM](https://notebooklm.google.com) - Google 的 AI 笔记本，上传资料后问答、做思维导图，还能生成播客。 `免费`
- [Napkin AI](https://www.napkin.ai) - 把文字一键变成信息图、流程图和图表。
- [ChatPDF](https://www.chatpdf.com) - 上传 PDF 和它对话，快速读懂论文、合同和说明书。
- [沉浸式翻译](https://immersivetranslate.com) - 双语对照的网页翻译插件，也能翻译 PDF、电子书和视频字幕。 `国内可用`
- [DeepL](https://www.deepl.com) - 翻译质量口碑很好的机器翻译，支持整篇文档翻译。 `国内可用`
- [Monica](https://monica.im) - 浏览器里的 AI 助手插件，随时划词翻译、总结网页和视频。
- [Otter.ai](https://otter.ai) - 英文会议的实时记录和纪要，能自动加入线上会议。
- [博思白板](https://boardmix.cn) - 在线白板，AI 生成思维导图、流程图和 PPT。 `国内可用`
- [Xmind](https://xmind.cn) - 老牌思维导图软件，AI 可以一键展开和整理思路。 `国内可用`

### 🤖 智能体

- [Manus](https://manus.im) - 通用 AI 智能体，自己上网查资料、写代码，交付报告、网站和表格。
- [Genspark](https://www.genspark.ai) - AI 超级智能体，能做调研、PPT、表格，甚至替你打电话。
- [Flowith](https://flowith.io) - 画布式的 AI 工作空间，智能体可以连续执行很长的任务。
- [扣子 Coze](https://www.coze.cn) - 字节跳动的智能体开发平台，不写代码就能做 AI 机器人并发布到各平台。 `国内可用`
- [腾讯元器](https://yuanqi.tencent.com) - 腾讯的智能体创作平台，可发布到 QQ、微信公众号等。 `国内可用` `免费`
- [秒哒](https://www.miaoda.cn) - 百度的无代码应用开发平台，说出需求就能生成应用。 `国内可用`
- [Dify](https://dify.ai) - 开源的大模型应用开发平台，可视化编排工作流和知识库。 [`开源`](https://github.com/langgenius/dify)
- [n8n](https://n8n.io) - 开源的工作流自动化工具，连接 400 多个应用，可自托管。 [`开源`](https://github.com/n8n-io/n8n)
- [FastGPT](https://github.com/labring/FastGPT) - 开源的知识库问答系统，开箱即用，支持可视化工作流。 `国内可用` `免费` [`开源`](https://github.com/labring/FastGPT)
- [OpenHands](https://www.openhands.dev) - 开源的 AI 软件工程师智能体，能独立完成开发任务。 [`开源`](https://github.com/All-Hands-AI/OpenHands)
- [LangChain](https://www.langchain.com) - 最流行的大模型应用开发框架，LangGraph 用来搭建智能体。 `免费` [`开源`](https://github.com/langchain-ai/langchain)

### 🧩 模型与 API

- [OpenAI API](https://platform.openai.com) - OpenAI 的开发者平台，调用 GPT、图像和语音模型。
- [Claude API](https://platform.claude.com) - Anthropic 的开发者平台，调用 Claude 模型构建应用和智能体。
- [Google AI Studio](https://aistudio.google.com) - 免费试用 Gemini 全系列模型，一键获取 API Key。
- [DeepSeek 开放平台](https://platform.deepseek.com) - DeepSeek 官方 API，价格很低，兼容 OpenAI 接口格式。 `国内可用`
- [硅基流动](https://siliconflow.cn) - 国内大模型 API 聚合平台，一个 Key 调用 DeepSeek、Qwen 等开源模型。 `国内可用`
- [火山方舟](https://www.volcengine.com/product/ark) - 字节跳动火山引擎的大模型平台，调用豆包和 DeepSeek 等模型。 `国内可用`
- [阿里云百炼](https://bailian.console.aliyun.com) - 阿里云的大模型服务平台，调用 Qwen 全系列模型和搭建应用。 `国内可用`
- [智谱开放平台](https://bigmodel.cn) - 智谱 GLM 系列模型的官方 API，部分模型免费。 `国内可用`
- [Kimi 开放平台](https://platform.kimi.com) - 月之暗面 Kimi 模型的官方 API，长上下文能力强。 `国内可用`
- [OpenRouter](https://openrouter.ai) - 一个接口调用几百个模型，统一计费，有不少免费模型。
- [Groq](https://groq.com) - 推理速度极快的模型 API，开源模型每秒输出上千个词。
- [Replicate](https://replicate.com) - 用 API 运行成千上万个开源模型，按秒计费。
- [Together AI](https://www.together.ai) - 开源模型的推理和微调云平台。
- [Hugging Face](https://huggingface.co) - 全球最大的 AI 开源社区，模型、数据集和在线 Demo 应有尽有。 `免费`
- [魔搭 ModelScope](https://modelscope.cn) - 阿里牵头的中文模型社区，国内下载模型速度快，有免费算力。 `国内可用` `免费`
- [Ollama](https://ollama.com) - 一行命令在自己电脑上运行 Qwen、DeepSeek、Llama 等开源模型。 `免费` [`开源`](https://github.com/ollama/ollama)
- [LM Studio](https://lmstudio.ai) - 图形界面的本地大模型工具，搜索、下载、运行一步到位。 `免费`
- [vLLM](https://github.com/vllm-project/vllm) - 高吞吐的大模型推理引擎，生产环境部署的首选。 `免费` [`开源`](https://github.com/vllm-project/vllm)
- [Cherry Studio](https://www.cherry-ai.com) - 开源的桌面 AI 客户端，接入各家模型 API，内置知识库和智能体。 `国内可用` `免费` [`开源`](https://github.com/CherryHQ/cherry-studio)
- [LobeChat](https://lobehub.com) - 开源的现代化 AI 聊天框架，界面精美，可一键私有部署。 `免费` [`开源`](https://github.com/lobehub/lobe-chat)
- [Open WebUI](https://openwebui.com) - 开源的自托管 AI 聊天界面，可以搭配 Ollama 使用。 `免费` [`开源`](https://github.com/open-webui/open-webui)
- [Chatbox](https://chatboxai.app) - 全平台 AI 客户端，填上自己的 API Key 就能用。 `国内可用` [`开源`](https://github.com/chatboxai/chatbox)

### 📚 学习资源

- [提示工程指南](https://www.promptingguide.ai/zh) - 最全面的提示词工程教程，有中文版，从入门到智能体。 `免费` [`开源`](https://github.com/dair-ai/Prompt-Engineering-Guide)
- [Learn Prompting](https://learnprompting.org) - 系统的提示词课程，适合零基础入门。
- [Anthropic Academy](https://academy.claude.com) - Anthropic 官方的免费课程，学习用 Claude 和开发 AI 应用。 `免费`
- [DeepLearning.AI](https://www.deeplearning.ai) - 吴恩达创办的 AI 课程平台，有大量免费的大模型短课。
- [Hugging Face 课程](https://huggingface.co/learn) - 免费的开源 AI 课程：大模型、智能体、扩散模型等。 `免费`
- [Hugging Face Papers](https://huggingface.co/papers) - 每日热门 AI 论文，社区投票排序，附带代码和模型。 `免费`
- [LMArena 大模型竞技场](https://arena.ai) - 大模型竞技场，用户匿名投票的模型排行榜。 `免费`
- [Artificial Analysis](https://artificialanalysis.ai) - 对比各家模型的能力、速度和价格，选模型的好帮手。 `免费`
- [There's An AI For That](https://theresanaiforthat.com) - 收录上万款 AI 工具的英文目录，按任务查找。 `免费`
- [Product Hunt AI](https://www.producthunt.com/topics/artificial-intelligence) - 每天发现最新上线的 AI 产品。 `免费`

<!-- TOOLS:END -->

## English

**Luopan (罗盘, "compass")** is an open-source directory of 150+ AI tools, curated for Chinese-speaking users. Every tool is labeled with whether it works from mainland China without a VPN, whether it is free, and whether it is open source.

- Zero dependencies: a single Node.js script turns `data/tools.json` into a static site, with a page for every category and tool, plus a sitemap
- No third-party requests at runtime: favicons are downloaded at build time and self-hosted
- Instant search, filters, favorites and recently opened tools (stored in your browser only)
- Deploy your own copy to GitHub Pages, Vercel, Netlify or Cloudflare Pages in one step

Contributions welcome: add a tool by editing `data/tools.json` or [opening an issue](https://github.com/woodti/luopan/issues/new?template=submit-tool.yml).

## License

[MIT](LICENSE)
