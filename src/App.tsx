import { useEffect, useState, type ComponentType } from 'react'
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  LockKeyhole,
  MessageSquare,
  MonitorDot,
  Moon,
  Network,
  PackageOpen,
  Play,
  ShieldCheck,
  Sparkles,
  Sun,
  TerminalSquare,
  Workflow,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const downloadsRepo = 'https://github.com/lihuan6015-droid/yuanmind-downloads'
const latestRelease = `${downloadsRepo}/releases/latest`

type ThemeMode = 'light' | 'dark'

type JourneyStep = {
  label: string
  title: string
  body: string
}

type Feature = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  body: string
  details?: string[]
}

const journeySteps: JourneyStep[] = [
  {
    label: '输入',
    title: '把一次真实任务交给本机',
    body: '客户需求、会议录音、微信消息、链接和附件进入 YuanMind，先在本地被整理成任务上下文。',
  },
  {
    label: '装填',
    title: '自动带上场景能力与企业资产',
    body: '售前、交付、招聘等场景可装填对应 SOP、Skill 与上下文包，Agent 不再从空白聊天开始。',
  },
  {
    label: '执行',
    title: '桌面 Agent 会话形成可检查的过程',
    body: '对话、工具、文件、终端、预览和子 Agent 状态在一个 macOS 桌面窗口里收敛。',
  },
  {
    label: '产出',
    title: '输出可以交付的材料',
    body: 'HTML 原型、技术架构、客户简报、竞品战卡和行动项成为本地可复查的产物。',
  },
]

const productSurfaces: Feature[] = [
  {
    icon: MessageSquare,
    title: 'Agent 会话',
    body: '聊天、推理、工具和决策卡收敛在一个工作流里，适合长任务，不只是问答。',
    details: ['客户资料已读取', '售前场景包已装填', '待确认：生成客户简报'],
  },
  {
    icon: TerminalSquare,
    title: '右侧工作区',
    body: '文件树、终端、预览和子 Agent 同屏存在，让执行过程可见、可回到现场。',
    details: ['预览 HTML 原型', '查看任务文件树', '终端执行本地命令'],
  },
  {
    icon: Sparkles,
    title: '能力广场',
    body: '场景 Skill、外部工具和企业能力以可安装、可启用、可审计的方式进入本地 Agent。',
    details: ['售前专家团队', '企业 SOP 装填', '浏览器 / 文件 / 语音能力'],
  },
  {
    icon: FileText,
    title: '产物管理',
    body: 'Agent 生成的 HTML、Markdown、源码和链接不散落，统一沉淀为可浏览的产物库。',
    details: ['客户简报.md', '技术架构.ts', '竞品战卡.html'],
  },
]

const differentiators: Feature[] = [
  {
    icon: Network,
    title: '连接内部系统',
    body: '未来可把 CRM、知识库、IM 与企业 SOP 装填进员工本地 Agent，形成最后一公里场景能力。',
  },
  {
    icon: LockKeyhole,
    title: '本地数据主权',
    body: 'YuanMind 不把员工原始对话和文件上传到自己的云端。模型、目录和上传边界由用户控制。',
  },
  {
    icon: Brain,
    title: '认知资产复利',
    body: '个人洞察、场景经验和企业方法论可以被召回、校准、复用，而不是每次任务重新开始。',
  },
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    const savedTheme = window.localStorage.getItem('yuanmind-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#17171A' : '#F4F5F7')
    window.localStorage.setItem('yuanmind-theme', theme)
  }, [theme])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.from('.app-window', {
        y: 40,
        opacity: 0,
        rotateX: 8,
        duration: 1.1,
        delay: 0.15,
        ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray<HTMLElement>('.journey-step').forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
          },
          x: index % 2 === 0 ? -24 : 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        })
      })

      gsap.to('.showcase-track', {
        xPercent: -42,
        ease: 'none',
        scrollTrigger: {
          trigger: '.surface-showcase',
          start: 'top top',
          end: '+=1100',
          scrub: 0.8,
          pin: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <header className="site-nav" aria-label="主导航">
        <a className="brand-mark" href="#top" aria-label="YuanMind 首页">
          <img src="/brand/logo-yuanmind.svg" alt="" />
          <span>YuanMind</span>
        </a>
        <nav>
          <a href="#story">任务闭环</a>
          <a href="#trust">数据主权</a>
          <a href="#download">下载</a>
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? '切换到明亮主题' : '切换到黑暗主题'}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="nav-download" href={latestRelease} target="_blank" rel="noreferrer">
            <Download size={16} />
            <span>内测下载</span>
          </a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">本地优先桌面 AgentOS</p>
          <h1>YuanMind</h1>
          <p className="hero-lead">
            把强大的 Agent runtime 变成普通知识工作者真正能用的桌面工作台。
            连接企业能力，守住本地数据主权，让个人认知资产持续复利。
          </p>
          <div className="hero-actions" aria-label="主要操作">
            <a className="primary-action" href={latestRelease} target="_blank" rel="noreferrer">
              <Download size={18} />
              下载内测版
            </a>
            <a className="secondary-action" href="#story">
              观看任务闭环
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="release-note">
            安装包将通过公开 GitHub Releases 提供下载。源码仓库保持私有。
          </p>
        </div>

        <div className="hero-product" aria-label="YuanMind 产品界面示意">
          <ProductWindow />
        </div>

        <a className="scroll-cue" href="#story" aria-label="向下滚动">
          <ChevronDown size={22} />
        </a>
      </section>

      <section id="story" className="section story-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">从输入到产出</p>
          <h2>一次真实任务，不再从空白聊天开始。</h2>
          <p>
            YuanMind 的首个叙事场景是售前实时原型生成。它展示的不是一项单点功能，
            而是桌面 Agent、场景 Skill、企业资产、产物管理和信任边界如何一起工作。
          </p>
        </div>
        <div className="journey-grid">
          {journeySteps.map((step) => (
            <article className="journey-step glass-card" key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className="workflow-strip" data-reveal>
          <span>客户资料</span>
          <ArrowRight size={18} />
          <span>本地 Agent</span>
          <ArrowRight size={18} />
          <span>技能与企业资产</span>
          <ArrowRight size={18} />
          <span>可交付产物</span>
        </div>
      </section>

      <section className="surface-showcase" aria-label="产品界面长廊">
        <div className="showcase-intro">
          <p className="eyebrow">真实桌面产品</p>
          <h2>不是 SaaS 套壳，也不是另一个聊天框。</h2>
          <p>
            它把对话、文件、终端、预览、场景能力和产物管理放回同一个工作现场，
            让长期任务可以执行、可以检查，也可以在下一次继续接上。
          </p>
        </div>
        <div className="showcase-viewport">
          <div className="showcase-track">
            {productSurfaces.map((surface) => {
              const Icon = surface.icon
              return (
                <article className="surface-card glass-card" key={surface.title}>
                  <Icon size={28} strokeWidth={1.7} />
                  <h3>{surface.title}</h3>
                  <p>{surface.body}</p>
                  <ul className="surface-preview" aria-label={`${surface.title} 示例`}>
                    {surface.details?.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section differentiator-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">差异化竞争力</p>
          <h2>我们关心的不是“AI 很强”，而是它能否进入你的真实工作世界。</h2>
        </div>
        <div className="differentiator-grid">
          {differentiators.map((item) => {
            const Icon = item.icon
            return (
              <article className="differentiator glass-card" key={item.title} data-reveal>
                <Icon size={26} strokeWidth={1.7} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="trust" className="section trust-section">
        <div className="trust-copy" data-reveal>
          <p className="eyebrow">反监控契约</p>
          <h2>企业获得能力复利，不获得员工私有原文。</h2>
          <p>
            YuanMind 的信任边界不是角落里的隐私声明，而是产品架构的一部分。
            本地分析、用户授权后流动、企业侧只接收结构化事件，三层边界必须清楚可见。
          </p>
        </div>
        <div className="boundary-map glass-card" data-reveal>
          <BoundaryNode icon={MonitorDot} title="本机工作世界" body="会话、文件、产物和个人认知资产优先留在本地。" />
          <BoundaryLine label="用户授权" />
          <BoundaryNode icon={ShieldCheck} title="YuanMind 桌面端" body="负责整理、执行、预览、校准和本地记忆。" />
          <BoundaryLine label="结构化事件" />
          <BoundaryNode icon={Building2} title="企业能力层" body="分发 SOP/Skill，接收非个人原文的组织级事件。" />
        </div>
      </section>

      <section className="section compounding-section">
        <div className="compounding-visual glass-card" data-reveal aria-label="认知资产复利示意">
          <img className="compounding-art" src="/brand/cognitive-compounding.png" alt="" />
          <div className="compounding-rings" aria-hidden="true" />
          <div className="compounding-core">
            <img src="/brand/logo-yuanmind.svg" alt="" />
            <span>YuanMind</span>
          </div>
          <div className="memory-card card-a">
            <strong>个人洞察</strong>
            <span>判断、偏好、踩坑</span>
          </div>
          <div className="memory-card card-b">
            <strong>场景经验</strong>
            <span>售前、交付、招聘</span>
          </div>
          <div className="memory-card card-c">
            <strong>企业 SOP</strong>
            <span>方法论与资产装填</span>
          </div>
          <div className="memory-card card-d">
            <strong>校准回环</strong>
            <span>用户确认后再复用</span>
          </div>
        </div>
        <div className="section-heading" data-reveal>
          <p className="eyebrow">双向复利</p>
          <h2>让过去的判断，被未来的任务自然接回。</h2>
          <p>
            一次任务结束后，有价值的经验不应该只留在聊天历史里。
            YuanMind 希望把个人洞察、企业方法论和场景能力变成可以持续召回、校准和复用的资产。
          </p>
        </div>
      </section>

      <section id="download" className="section download-section">
        <div className="download-panel glass-card" data-reveal>
          <div>
            <p className="eyebrow">公开下载，源码私有</p>
            <h2>安装包将从 GitHub Releases 分发。</h2>
            <p>
              当前官网先指向公开下载仓库。等 macOS / Windows 安装包完成签名、公证和真机验收后，
              我们再把按钮切到对应 latest asset 直链。
            </p>
          </div>
          <div className="download-actions">
            <a className="primary-action" href={latestRelease} target="_blank" rel="noreferrer">
              <Download size={18} />
              查看最新版本
            </a>
            <a className="secondary-action" href={downloadsRepo} target="_blank" rel="noreferrer">
              <PackageOpen size={18} />
              下载仓库
            </a>
          </div>
          <div className="platforms" aria-label="平台状态">
            <span><CheckCircle2 size={16} /> macOS 内测优先</span>
            <span>Windows 待打包验收</span>
            <span>Linux 规划中</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <img src="/brand/yuanmind-os-light.svg" alt="" />
          <p>YuanMind 是私有源码的本地优先桌面 AgentOS。官网可私有维护，公开仓库仅用于安装包下载。</p>
        </div>
        <a className="deerflow-signature" href="https://deerflow.tech" target="_blank" rel="noreferrer">
          Created By Deerflow
        </a>
      </footer>
    </main>
  )
}

function ProductWindow() {
  return (
    <div className="app-window">
      <div className="window-chrome">
        <span className="traffic red" />
        <span className="traffic yellow" />
        <span className="traffic green" />
        <div className="window-title">YuanMind · 售前原型</div>
      </div>
      <div className="window-body">
        <aside className="window-sidebar">
          <img src="/brand/logo-yuanmind.svg" alt="" />
          <span className="side-active"><Bot size={15} /> 会话</span>
          <span><Workflow size={15} /> 自动任务</span>
          <span><Sparkles size={15} /> 能力广场</span>
          <span><ShieldCheck size={15} /> 数据主权</span>
        </aside>
        <section className="window-chat">
          <div className="chat-line assistant">
            <strong>YuanMind</strong>
            <p>我已读取客户资料，并装填售前场景包。是否生成原型与客户简报？</p>
          </div>
          <div className="chat-line user">
            <p>生成一版适合明早评审的方案。</p>
          </div>
          <div className="decision-card">
            <span><Play size={14} /> 正在执行</span>
            <h4>售前专家团队</h4>
            <p>设计 Agent、开发 Agent、简报 Agent 已并行启动。</p>
          </div>
          <div className="composer">输入任务、拖入文件或选择场景能力...</div>
        </section>
        <aside className="window-workspace">
          <div className="workspace-tabs">
            <span>文件</span>
            <span className="active">预览</span>
            <span>终端</span>
          </div>
          <div className="preview-card">
            <span>HTML Prototype</span>
            <div className="preview-screen">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="artifact-list">
            <p>客户简报.md</p>
            <p>技术架构.ts</p>
            <p>竞品战卡.html</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function BoundaryNode({
  icon: Icon,
  title,
  body,
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  body: string
}) {
  return (
    <div className="boundary-node">
      <Icon size={24} strokeWidth={1.7} />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

function BoundaryLine({ label }: { label: string }) {
  return (
    <div className="boundary-line" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

export default App
