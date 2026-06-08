# YuanMind 官网

这是 YuanMind 官网项目，用于维护产品介绍页、下载入口、品牌素材和后续部署配置。

## 仓库边界

- `yuanmind-site`：官网源码仓库，可以设为私有。
- `yuanmind-downloads`：公开安装包下载仓库，只用于 README、版本说明和 GitHub Releases assets。
- YuanMind 产品源码不在本仓库，也不在 `yuanmind-downloads` 中公开。

当前下载入口指向：

```txt
https://github.com/lihuan6015-droid/yuanmind-downloads/releases/latest
```

等安装包完成签名、公证和真机验收后，再把官网按钮切换到具体 latest asset 直链。

## 本地运行

```bash
pnpm install
pnpm dev
```

构建检查：

```bash
pnpm build
pnpm lint
```

## 设计语言

官网必须严格贴合 YuanMind 产品视觉语言：

- macOS 26 Liquid Glass 质感
- 亮色强调色 `#0A5BC4`
- 暗色强调色 `#34D399`
- 强调色只用于按钮、焦点、选中、链接和进行中状态
- 玻璃只用于外壳、浮层、卡片控件
- 正文、说明、代码、表格和长文必须保持不透明可读
- 禁用霓虹紫蓝、AI 渐变、SaaS dashboard 感和大面积彩色铺底

## 素材目录

品牌 SVG 已从 YuanMind 主项目复制到：

```txt
public/brand/
```

后续产品截图请放在：

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

## 后续发布节奏

1. 先在本仓库打磨官网叙事、视觉和动效。
2. 官网满意后部署到云服务器或静态托管平台。
3. 安装包完成签名、公证、真机验证后，上传到 `yuanmind-downloads` 的 GitHub Releases。
4. 再把官网下载按钮切换到对应安装包直链。
