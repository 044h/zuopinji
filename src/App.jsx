import { useState, useEffect, lazy, Suspense } from 'react'
import { FaWeixin, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft, FaCamera, FaVideo, FaPen, FaUsers, FaChevronRight, FaUser } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import './App.css'
import Galaxy from './components/Galaxy'
import BorderGlow from './components/BorderGlow'
import { useGSAPAnimations } from './hooks/useGSAP'
import { LazyImage } from './components/LazyImage'
import './components/LazyImage.css'
import ProjectModal from './components/ProjectModal'
import './components/ProjectModal.css'
import './components/PhotographyGallery.css'

const AIGCGallery = lazy(() => import('./components/AIGCGallery'))
const PhotographyGallery = lazy(() => import('./components/PhotographyGallery'))
const BrandGallery = lazy(() => import('./components/BrandGallery'))
const GraphicGallery = lazy(() => import('./components/GraphicGallery'))

// 禁用浏览器滚动恢复，确保刷新后回到顶部
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

const data = {
  name: '胡铭航',
  nameEn: 'Hu Minghang',
  title: '视觉设计师',
  contact: {
    phone: '+86 15858628789',
    email: '1164789088@qq.com',
    location: '浙江·杭州'
  },
  education: {
    school: '浙江财经大学东方学院',
    major: '广告学',
    period: '2023 — 2027',
    courses: ['广告策划', '品牌传播', '消费者行为学', '新媒体营销', '视觉传达'],
    activities: ['院学生会宣传部干事', '校级广告创意大赛二等奖']
  },
  experience: [
    {
      company: '台州市创农机械有限公司',
      position: '新媒体运营助理',
      period: '2025.07 — 2025.09',
      achievements: [
        '负责抖音、视频号官方账号内容策划与日常更新，累计产出短视频 30+ 条',
        '独立完成产品宣传文案撰写与图文排版',
        '协助搭建用户私域社群',
        '参与品牌视觉物料整理，完成季度产品手册内容编排'
      ]
    },
    {
      company: '栖光影像工作室',
      position: '摄影助理',
      period: '2024.07 — 2024.08',
      achievements: [
        '协助商业静物与人像拍摄 20+ 场',
        '负责现场布光、场地搭建与器材管理',
        '协助完成约 1500 张图片初修与统一调色',
        '校园主题写真作品入选工作室官方作品集'
      ]
    }
  ],
  stats: [
    { value: '30+', label: '短视频产出' },
    { value: '20+', label: '商业拍摄' },
    { value: '1500+', label: '图片处理' },
    { value: '2年+', label: '实践经验' }
  ],
  skills: [
    { 
      title: '策略思维', 
      titleEn: 'Strategy Thinking',
      tags: ['品牌策略', '市场洞察', '用户研究', '传播策划']
    },
    { 
      title: '视觉设计', 
      titleEn: 'Visual Design',
      tags: ['品牌设计', '包装设计', '广告创意', 'UI/UX设计']
    },
    { 
      title: '技术应用', 
      titleEn: 'Tech Application',
      tags: ['AIGC创意', '设计软件精通', '动效设计']
    },
    { 
      title: '内容创作', 
      titleEn: 'Content Creation',
      tags: ['新媒体策划', '文案撰写', '摄影摄像', '视频剪辑']
    }
  ],
  projects: [
    { title: '商业传播策划', category: '品牌设计', desc: '品牌策略、创意方案与传播规划', type: 'brand', cover: '/分类/商业传播策划/商业传播策划封面.jpg' },
    { title: 'AIGC作品', category: 'AI设计', desc: 'AI生成艺术与创意视觉作品', type: 'aigc', cover: '/分类/aigc/aigc封面.jpg' },
    { title: '摄影摄像', category: '摄影', desc: '人像摄影与产品摄影作品', type: 'photography', cover: '/分类/摄影摄像/摄影摄像封面.jpg' },
    { title: '平面设计', category: '视觉设计', desc: '海报、包装与视觉传达设计', type: 'graphic', cover: '/分类/平面设计/平面设计封面.jpg' }
  ],
  about: '广告学的学习让我习惯从受众与场景出发去思考表达，而新媒体运营与摄影的实践，让我把这种思考落到了具体的画面与文字里。我相信好的传播不在于声量大，而在于是否真诚、是否准确。'
}

function GalaxyDivider() {
  return (
    <div className="cosmic-divider">
      <div className="nebula-glow"></div>
      <div className="stardust-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="stardust" style={{
            '--delay': `${Math.random() * 3}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--size': `${1 + Math.random() * 2.5}px`,
            '--duration': `${2.5 + Math.random() * 2}s`
          }}></div>
        ))}
      </div>
      <svg className="orbit-svg" viewBox="0 0 800 80" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="10%" stopColor="rgba(100, 100, 140, 0.2)"/>
            <stop offset="30%" stopColor="rgba(120, 120, 160, 0.35)"/>
            <stop offset="50%" stopColor="rgba(140, 130, 180, 0.5)"/>
            <stop offset="70%" stopColor="rgba(120, 120, 160, 0.35)"/>
            <stop offset="90%" stopColor="rgba(100, 100, 140, 0.2)"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path className="orbit-path outer" d="M 20 65 Q 400 -10 780 65" fill="none" stroke="url(#orbitGradient)" strokeWidth="1" opacity="0.25"/>
        <path className="orbit-path middle" d="M 60 65 Q 400 20 740 65" fill="none" stroke="url(#orbitGradient)" strokeWidth="1.2" opacity="0.35"/>
        <path className="orbit-path inner" d="M 100 65 Q 400 45 700 65" fill="none" stroke="url(#orbitGradient)" strokeWidth="1.5" filter="url(#glow)"/>
        <circle className="divider-planet" cx="400" cy="58" r="5" fill="rgba(150, 140, 180, 0.7)" filter="url(#glow)"/>
      </svg>
    </div>
  )
}

function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero">
      <div className="hero-mask" />
      <div className="hero-video-container">
        {!videoError ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero-video" 
            preload="metadata"
            onError={() => setVideoError(true)}
          >
            <source src="/分类/背景/首屏背景.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="hero-video-error">视频加载失败</div>
        )}
        <div className="hero-overlay" />
      </div>

      <nav className={`hero-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <img src="/分类/avatar/q版头像.png" alt="头像" className="nav-avatar" />
          <div className="nav-logo">HMH</div>
        </div>
        <div className="nav-right">
          <a href="#about">关于</a>
          <a href="#projects">作品</a>
          <a href="#skills">能力</a>
          <a href="#contact">联系</a>
        </div>
      </nav>

      <div className="hero-main">
        <div className="hero-text">
          <div className="hero-category">DESIGNER</div>
          <h1 className="hero-title">
            胡铭航
          </h1>
          <p className="hero-subtitle">
            视觉设计师 / AI设计师 / 品牌设计师
          </p>
          <p className="hero-description">
            用视觉讲述故事，让品牌触达人心
          </p>
          <div className="hero-cta">
            <a href="#contact" className="cta-button">联系我</a>
            <a href="#projects" className="cta-link">查看作品</a>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-shape" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <div className="section-tag">ABOUT</div>
          <h2>关于我</h2>
        </div>

        <BorderGlow
          className="about-glow-card"
          backgroundColor="#12121a"
          borderRadius={16}
          glowRadius={30}
          glowIntensity={0.8}
          edgeSensitivity={40}
          glowColor="260 70 70"
          colors={['#a78bfa', '#c4b5fd', '#818cf8']}
          animated={true}
        >
          <div className="about-card">
            <div className="about-avatar">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#ffffff" strokeWidth="2"/>
                <circle cx="8" cy="9" r="1.5" fill="#ffffff"/>
                <circle cx="16" cy="9" r="1.5" fill="#ffffff"/>
                <path d="M7 13 Q12 18 17 13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="about-body">
              <p className="about-text">{data.about}</p>
            </div>
          </div>
        </BorderGlow>

        <div className="about-info">
          <div className="info-card">
            <FaUser className="info-icon" />
            <div className="info-content">
              <div className="info-label">姓名</div>
              <div className="info-value">{data.name}</div>
            </div>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <div className="info-content">
              <div className="info-label">邮箱</div>
              <div className="info-value">{data.contact.email}</div>
            </div>
          </div>
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-content">
              <div className="info-label">位置</div>
              <div className="info-value">{data.contact.location}</div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {data.stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">EXPERIENCE</div>
          <h2>经历</h2>
        </div>

        <div className="education-card">
          <div className="edu-header">
            <div className="edu-period">{data.education.period}</div>
            <div className="edu-degree">Bachelor</div>
          </div>
          <h3>{data.education.school}</h3>
          <p className="edu-major">{data.education.major}</p>
          <div className="edu-details">
            <div className="edu-courses">
              <span className="detail-label">主修课程</span>
              <div className="course-tags">
                {data.education.courses.map((c, i) => <span key={i} className="tag">{c}</span>)}
              </div>
            </div>
            <div className="edu-activities">
              <span className="detail-label">校园经历</span>
              <ul>
                {data.education.activities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="timeline">
          {data.experience.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="exp-header">
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-duration">{exp.period.includes('2025') ? '3 MOS' : '2 MOS'}</div>
                </div>
                <h3>{exp.company}</h3>
                <p className="exp-position">{exp.position}</p>
                <ul className="exp-achievements">
                  {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({ onBrandClick, onAIGCClick, onPhotoClick, onGraphicClick }) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">WORKS</div>
          <h2>精选项目</h2>
        </div>
        <div className="projects-grid">
          {data.projects.map((project, i) => (
            <div 
              key={i} 
              className="project-card" 
              onClick={() => {
                if (project.type === 'brand') onBrandClick()
                else if (project.type === 'aigc') onAIGCClick()
                else if (project.type === 'photography') onPhotoClick()
                else if (project.type === 'graphic') onGraphicClick()
              }}
            >
              <div className="project-image">
                <div className="planet-container">
                  <div className={`planet-bg ${project.type === 'graphic' ? 'planet-bg-scale' : ''} ${project.type === 'brand' ? 'planet-bg-scale-sm' : ''}`} style={{ backgroundImage: `url(${project.cover})` }} />
                  <div className="planet-glow"></div>
                  <div className="planet-ring"></div>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="planet-star" style={{
                      '--delay': `${Math.random() * 3}s`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }} />
                  ))}
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-link">
                  查看详情 <FaChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">SKILLS</div>
          <h2>核心能力</h2>
        </div>
        <div className="skills-section">
          {data.skills.map((skill, i) => (
            <div key={i} className="skill-item">
              <div className="skill-title-row">
                <span className="skill-title">{skill.title}</span>
                <span className="skill-title-en">{skill.titleEn}</span>
              </div>
              <div className="skill-tags">
                {skill.tags.map((tag, j) => (
                  <span key={j} className="skill-tag">
                    {tag}
                    {j < skill.tags.length - 1 && <span className="tag-divider">|</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-bg">
        <div className="contact-particles" />
      </div>
      <div className="container contact-content">
        <div className="section-tag">CONTACT</div>
        <h2>建立联系</h2>
        <p className="contact-subtitle">期待与您交流合作</p>
        
        <div className="contact-methods">
          <a href={`tel:${data.contact.phone}`} className="contact-method">
            <FiPhone />
            <span>{data.contact.phone}</span>
          </a>
          <a href={`mailto:${data.contact.email}`} className="contact-method">
            <FaEnvelope />
            <span>{data.contact.email}</span>
          </a>
          <div className="contact-method">
            <FaMapMarkerAlt />
            <span>{data.contact.location}</span>
          </div>
        </div>

        <div className="contact-footer">
          <p className="copyright">© 2026 胡铭航. All rights reserved.</p>
          <p className="credit">Designed with precision</p>
        </div>
      </div>
    </section>
  )
}

function App() {
  const containerRef = useGSAPAnimations()
  const [showBrandGallery, setShowBrandGallery] = useState(false)
  const [showAIGCGallery, setShowAIGCGallery] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [showGraphicGallery, setShowGraphicGallery] = useState(false)
  
  return (
    <div className="app" ref={containerRef}>
      <div className="galaxy-background">
        <Galaxy
          density={1.3}
          hueShift={240}
          glowIntensity={0.15}
          saturation={0.3}
          speed={0.2}
          starSpeed={0.3}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
          mouseRepulsion={false}
          mouseInteraction={false}
          transparent={true}
          resolutionScale={0.5}
        />
      </div>
      <Hero />
      <GalaxyDivider />
      <About />
      <GalaxyDivider />
      <Experience />
      <GalaxyDivider />
      <Projects 
        onBrandClick={() => setShowBrandGallery(true)}
        onAIGCClick={() => setShowAIGCGallery(true)}
        onPhotoClick={() => setShowPhotoGallery(true)}
        onGraphicClick={() => setShowGraphicGallery(true)}
      />
      <GalaxyDivider />
      <Skills />
      <GalaxyDivider />
      <Contact />
      <Suspense fallback={<div className="gallery-loading">加载中...</div>}>
        <BrandGallery 
          isOpen={showBrandGallery} 
          onClose={() => setShowBrandGallery(false)} 
        />
        <AIGCGallery 
          isOpen={showAIGCGallery} 
          onClose={() => setShowAIGCGallery(false)} 
        />
        <PhotographyGallery 
          isOpen={showPhotoGallery} 
          onClose={() => setShowPhotoGallery(false)} 
        />
        <GraphicGallery 
          isOpen={showGraphicGallery} 
          onClose={() => setShowGraphicGallery(false)} 
        />
      </Suspense>
    </div>
  )
}

export default App