# YuanMind 官网项目级 Agent 说明

> **同步约束**：`CLAUDE.md` 与 `AGENTS.md` 内容必须完全一致。任一文件更新后，必须同步复制另一份。
> **项目角色**：维护 YuanMind 官网、品牌叙事、下载入口与部署配置。
> **重要边界**：本项目不是 YuanMind 产品源码仓库。

## 0. 仓库边界

- `yuanmind-site`：官网源码仓库，可以设为私有。用于官网页面、视觉资产、SEO、部署脚本和文档。
- `yuanmind-downloads`：公开安装包下载仓库，只用于 README、安装说明、校验和、GitHub Releases assets。
- YuanMind 产品源码位于独立私有仓库，本项目不得复制、公开或推断其源码实现。
- 官网可以引用从产品仓复制过来的品牌素材和用户后续提供的产品截图，但不要依赖主产品仓的运行路径。

## 1. 视觉铁律

官网必须严格对标 YuanMind 产品设计语言，而不是做通用 SaaS landing page。

- 方向：macOS 26 Liquid Glass，克制、清晰、原生桌面质感。
- 亮色强调色：`#0A5BC4`。
- 暗色强调色：`#34D399`。
- 强调色只用于交互发生处：按钮、链接、焦点、选中、进行中状态。
- 玻璃用于外壳、浮层、卡片控件和产品截图容器。
- 正文、代码、说明、表格和长文本必须保持不透明可读。
- 禁用霓虹紫蓝、AI 渐变、大面积彩色铺底、陶土橙主视觉、廉价数据大屏、SaaS dashboard 感。
- 字体使用系统字体栈，不引入 web font。
- 图标优先使用 `lucide-react`，禁用 emoji 作为 UI 图标。

## 2. 内容叙事

官网叙事主线：

1. YuanMind 是本地优先桌面 AgentOS。
2. 它把强大的 Agent runtime 翻译成普通用户能使用的桌面工作台。
3. 首个核心场景用“从输入到产出的真实任务闭环”表达。
4. 差异化竞争力是连接内部系统、本地数据主权、认知资产复利。
5. 反监控契约是主叙事的一部分，不是角落里的隐私 badge。

注意措辞：

- 可以说“YuanMind 不把员工原始对话和文件上传到自己的云端”。
- 不要说“所有模型推理永不上云”，因为用户可自带云端 LLM provider。
- 不要提前承诺未完成验收的平台安装包、热更新、完整企业驾驶舱或移动端。
- 下载按钮在安装包未上传前指向 Releases 页，不要伪造具体安装包链接。

## 3. 素材约定

品牌素材位于：

```txt
public/brand/
```

后续产品截图位于：

```txt
public/screenshots/
```

建议命名：

- `hero-app-light.png`
- `hero-app-dark.png`
- `chat-right-sidebar-light.png`
- `settings-liquid-glass-light.png`
- `artifacts-preview-light.png`
- `capability-plaza-light.png`

下载相关说明或 manifest 位于：

```txt
public/downloads/
```

## 4. 工程规则

- 入口 HTML 必须保留为 `index.html`。
- 修改前先确认当前仓库是 `yuanmind-site`，不要误改 `/Users/circlelee/develop/YuanMind`。
- 优先保持静态站能力，避免引入服务器端依赖。
- 首版技术栈为 Vite + React + TypeScript + GSAP + lucide-react。
- 动效必须有 `prefers-reduced-motion` 降级。
- 玻璃必须有 `prefers-reduced-transparency` 或不支持 `backdrop-filter` 的可读 fallback。
- 每次声称完成前必须运行 `pnpm build`，涉及样式/代码质量时运行 `pnpm lint`。

## 5. GitHub 与发布

- 官网远端：`https://github.com/lihuan6015-droid/yuanmind-site.git`。
- 下载仓库远端：`https://github.com/lihuan6015-droid/yuanmind-downloads.git`。
- `yuanmind-site` 可以设为私有。
- `yuanmind-downloads` 应保持公开，方便外部人员下载安装包。
- 未来安装包上传到 `yuanmind-downloads` Releases 后，官网 CTA 再切换到具体 latest asset 直链。
