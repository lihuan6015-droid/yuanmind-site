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
  Workflow,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const downloadsRepo = 'https://github.com/lihuan6015-droid/yuanmind-downloads'
const latestRelease = `${downloadsRepo}/releases/latest`
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

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
    label: '安排',
    title: '一句话把任务交给猿工分身',
    body: '客户需求、会议纪要、微信消息、链接和附件进入 YuanMind，先在本机整理成可执行的任务现场。',
  },
  {
    label: '装填',
    title: '带上专家团队与企业资产',
    body: '售前、交付、招聘、运营等场景可装填对应专家团队、SOP、Skill 和企业上下文。',
  },
  {
    label: '执行',
    title: '分身推进，过程可检查',
    body: '对话、工具、文件、预览、子 Agent 状态在同一个桌面窗口里收敛，长期任务不再像黑盒。',
  },
  {
    label: '决策',
    title: '关键判断回到人类手里',
    body: '涉及价格、承诺范围、风险判断时，Agent 暂停等待确认；产物和经验再沉淀回本地。',
  },
]

const productSurfaces: Feature[] = [
  {
    icon: FileText,
    title: '明早客户评审前，先把专家团队叫进来',
    body: '把客户资料、会议纪要和竞品链接交给 YuanMind，售前专家团队会并行推进原型、简报和竞品战卡。',
    details: ['一键启动售前专家团队', '生成 HTML 原型与客户简报', '人类确认关键取舍'],
  },
  {
    icon: Workflow,
    title: '复杂工作不再从 Prompt 开始',
    body: '能力广场预置不同领域的专家团队和一站式技能，用户选择工作场景，而不是从零理解工具链。',
    details: ['招聘：JD 拆解与简历初筛', '销售：客户跟进与续约风险', '运营：活动复盘与周报生成'],
  },
  {
    icon: Bot,
    title: '你的猿工办公室，正在形成',
    body: 'YuanMind 不只让 Agent 执行任务，也给用户一个可感知的工作伙伴。猿工状态让长期任务不再冷冰冰。',
    details: ['休息、分析、执行、待决策', '任务推进有轻量反馈', '未来同事分身协作流转'],
  },
  {
    icon: MessageSquare,
    title: '在微信或 IM 里安排工作，桌面端继续执行',
    body: '当你不在电脑前，可以通过企业 IM 给自己的猿工分身安排任务；回到桌面时，过程和产物还在同一个本地现场。',
    details: ['IM 是入口，桌面是现场', '上下文回到本地会话', '记忆沉淀默认等你确认'],
  },
  {
    icon: Network,
    title: '企业能力进入本机，但员工不是被监控对象',
    body: 'OA、CRM、企业知识库和业务系统未来会作为能力包装填进本地 Agent，帮助员工完成真实工作。',
    details: ['CRM 客户背景自动带入', '交付 SOP 与历史案例装填', '企业只接收结构化事件'],
  },
  {
    icon: Brain,
    title: '每次判断，都会让下一次更快开始',
    body: '用户确认过的判断、踩坑、偏好和方法论会变成个人认知资产，让过去的你在未来任务里自然回来。',
    details: ['召回上次同类客户风险点', '复用你常用的方案结构', '保存前由你确认或改写'],
  },
]

const enterpriseStories: Feature[] = [
  {
    icon: Network,
    title: 'OA、CRM、知识库，变成可调用的企业能力',
    body: '未来的 YuanMind 会把内部系统从“要人去查”变成“Agent 分身可装填、可调用、可回到现场”的能力包。',
    details: ['销售任务带上 CRM 与历史报价', '交付任务带上 SOP 与案例库', '管理者看到组织级推进事件'],
  },
  {
    icon: MessageSquare,
    title: '桌面端 + IM，给每个员工一个自然语言入口',
    body: '用户可以在桌面端或微信、飞书、钉钉等 IM 中安排工作；执行仍围绕本地 Agent 会话展开。',
    details: ['外出时先让猿工整理材料', '回到电脑继续检查过程', '跨终端上下文保持一致'],
  },
  {
    icon: LockKeyhole,
    title: '企业获得能力复利，不获得员工私有原文',
    body: '员工的原始文件、私有对话和个人判断优先留在本机；企业侧接收的是授权后的结构化事件。',
    details: ['不展示个人原始文件', '不读取员工私有对话', 'CEO / Admin 也不能越权'],
  },
  {
    icon: Brain,
    title: '人类判断沉淀为资产，不被聊天历史吞掉',
    body: '每次任务结束后，有价值的判断可回到个人认知资产；被审核的经验再进入组织能力库。',
    details: ['个人洞察由用户确认', '组织经验进入 Skill / SOP', '下一次任务自动装填回来'],
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
        xPercent: -58,
        ease: 'none',
        scrollTrigger: {
          trigger: '.surface-showcase',
          start: 'top top',
          end: '+=1500',
          scrub: 0.8,
          pin: true,
        },
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.compound-panel',
            start: 'top 76%',
          },
        })
        .from('.compound-chip.personal', {
          x: -20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power2.out',
        })
        .from(
          '.compound-chip.enterprise',
          {
            x: 20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .from(
          '.compound-core-panel',
          {
            scale: 0.94,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.out',
          },
          '-=0.1',
        )
        .to('.flow-line', {
          scaleX: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        })
        .from(
          '.trust-rail',
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.15',
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <header className="site-nav" aria-label="主导航">
        <a className="brand-mark" href="#top" aria-label="YuanMind 首页">
          <img src={assetPath('brand/logo-yuanmind.svg')} alt="" />
          <span>YuanMind</span>
        </a>
        <nav>
          <a href="#story">工作范式</a>
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
          <p className="eyebrow">AI 时代的企业工作范式</p>
          <h1>YuanMind</h1>
          <p className="hero-lead">
            让每个人拥有本地优先的猿工分身，把专家团队、企业知识库和业务系统带进真实工作现场。
            Agent 自主推进复杂任务，人类保留判断、授权和最终决策。
          </p>
          <div className="hero-actions" aria-label="主要操作">
            <a className="primary-action" href={latestRelease} target="_blank" rel="noreferrer">
              <Download size={18} />
              下载内测版
            </a>
            <a className="secondary-action" href="#story">
              看猿工如何工作
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="release-note">
            安装包将通过公开 GitHub Releases 分发；产品源码和核心仓库保持私有。
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
          <p className="eyebrow">从安排到决策</p>
          <h2>一个客户评审，如何被猿工分身接住。</h2>
          <p>
            周一早上，你把客户需求、会议纪要和竞品链接交给 YuanMind。
            猿工分身会装填售前专家团队和企业资产，先把方案推进到可检查状态，
            再把关键判断交还给真实的人。
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
          <span>自然语言安排</span>
          <ArrowRight size={18} />
          <span>猿工分身执行</span>
          <ArrowRight size={18} />
          <span>专家团队装填</span>
          <ArrowRight size={18} />
          <span>人类确认决策</span>
        </div>
      </section>

      <section className="surface-showcase" aria-label="产品界面长廊">
        <div className="showcase-intro">
          <p className="eyebrow">真实桌面产品</p>
          <h2>不是 SaaS 套壳，也不是另一个聊天框。</h2>
          <p>
            它让你把一次客户评审、招聘筛选或周报复盘交给一个可检查、可继续的本地工作现场。
            功能不再被解释为按钮，而是变成可以直接调用的工作故事。
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

      <section className="section enterprise-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">企业工作现场</p>
          <h2>让企业能力进入每个人的猿工分身，而不是停在系统后台。</h2>
          <p>
            未来的 YuanMind 会把 OA、CRM、企业知识库、业务系统和 IM 入口连接成可装填的能力。
            员工用自然语言安排分身工作，分身之间流转问题和实施，人类负责判断与拍板。
          </p>
        </div>
        <div className="enterprise-grid">
          {enterpriseStories.map((item) => {
            const Icon = item.icon
            return (
              <article className="enterprise-story glass-card" key={item.title} data-reveal>
                <Icon size={26} strokeWidth={1.7} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.details?.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section id="trust" className="section trust-section">
        <div className="trust-copy" data-reveal>
          <p className="eyebrow">本地数据主权</p>
          <h2>员工敢把真实思考交给 AI，企业才会得到真正的能力复利。</h2>
          <p>
            YuanMind 的信任边界不是角落里的隐私声明，而是产品架构的一部分。
            原始内容留在本机，授权后才流动，企业只接收结构化组织事件。
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
        <CompoundPanel />
        <div className="section-heading" data-reveal>
          <p className="eyebrow">双向复利</p>
          <h2>每次任务结束，都不只是多一段聊天记录。</h2>
          <p>
            用户确认过的判断回到个人认知资产；企业审核过的经验进入组织能力库。
            下一次任务开始时，过去的你和团队的最佳实践会一起被装填回来。
          </p>
        </div>
      </section>

      <section id="download" className="section download-section">
        <div className="download-panel glass-card" data-reveal>
          <div>
            <p className="eyebrow">内测版下载</p>
            <h2>先把猿工分身带回你的电脑。</h2>
            <p>
              当前官网先指向公开下载仓库。等 macOS / Windows 安装包完成签名、公证和真机验收后，
              下载按钮会切到对应 latest asset 直链。
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
          <img src={assetPath('brand/yuanmind-os-light.svg')} alt="" />
          <p>YuanMind 是本地优先的桌面 AgentOS。官网可私有维护，公开仓库仅用于安装包下载。</p>
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
        <div className="window-title">YuanMind · 猿工办公室</div>
      </div>
      <div className="window-body">
        <aside className="window-sidebar">
          <img src={assetPath('brand/logo-yuanmind.svg')} alt="" />
          <span className="side-active"><Bot size={15} /> 会话</span>
          <span><Workflow size={15} /> 自动任务</span>
          <span><Sparkles size={15} /> 能力广场</span>
          <span><ShieldCheck size={15} /> 数据主权</span>
        </aside>
        <section className="window-chat">
          <div className="chat-line assistant">
            <strong>YuanMind</strong>
            <p>我已读取客户资料，并装填 CRM 背景、售前专家团队和交付 SOP。</p>
          </div>
          <div className="chat-line user">
            <p>先生成一版适合明早评审的方案。</p>
          </div>
          <div className="decision-card">
            <span><Play size={14} /> 正在执行</span>
            <h4>猿工分身已启动</h4>
            <p>设计、架构、简报和竞品分析正在并行推进；价格承诺会等待你确认。</p>
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

function CompoundPanel() {
  const personalChips = ['客户风险判断', '方案结构偏好', '踩坑记录', '方法论']
  const enterpriseChips = ['CRM 背景', 'OA 流程', '企业知识库', '场景 SOP']

  return (
    <div className="compound-panel glass-card" data-reveal aria-label="认知资产双向复利示意">
      <div className="compound-column personal-side" aria-label="个人认知资产">
        <span className="compound-label">个人侧</span>
        {personalChips.map((chip) => (
          <span className="compound-chip personal" key={chip}>
            {chip}
          </span>
        ))}
      </div>

      <div className="compound-core-panel">
        <img src={assetPath('brand/logo-yuanmind.svg')} alt="" />
        <strong>YuanMind</strong>
        <p>待你确认</p>
        <span className="decision-pill">保留这条判断</span>
      </div>

      <div className="compound-column enterprise-side" aria-label="企业能力库">
        <span className="compound-label">组织侧</span>
        {enterpriseChips.map((chip) => (
          <span className="compound-chip enterprise" key={chip}>
            {chip}
          </span>
        ))}
      </div>

      <span className="flow-line flow-in" aria-hidden="true" />
      <span className="flow-line flow-out" aria-hidden="true" />
      <div className="trust-rail">
        <ShieldCheck size={16} />
        <span>原始内容留在本机 · 授权后才流动 · 企业只接收结构化事件</span>
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
