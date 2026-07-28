import { useState } from 'react'
import { ArrowRight, Sparkles, Bolt } from '../icons'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../components/Auth/AuthModal'
import { useAuth } from '../hooks/useAuth'
import SplitText from '../components/ReactBits/SplitText'
import BlurText from '../components/ReactBits/BlurText'
import ShinyText from '../components/ReactBits/ShinyText'
import GradientText from '../components/ReactBits/GradientText'
import CountUp from '../components/ReactBits/CountUp'
import ScrollFloat from '../components/ReactBits/ScrollFloat'
import StarBorder from '../components/ReactBits/StarBorder'
import TextType from '../components/ReactBits/TextType'
import Hyperspeed from '../components/ReactBits/Hyperspeed'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import LogoLoop from '../components/ReactBits/LogoLoop'
import BorderGlow from '../components/ReactBits/BorderGlow'
import SplashCursor from '../components/ReactBits/SplashCursor'
import { FaGoogle, FaRocket, FaBrain, FaBolt, FaShieldAlt, FaArrowRight } from 'react-icons/fa'
import { FaRobot } from 'react-icons/fa6'
import { SiAnthropic, SiMistralai } from 'react-icons/si'

const features = [
  { icon: FaBolt, title: 'Voice-First', desc: 'Speak naturally with real-time speech recognition and synthesis.', color: '#5ed29c' },
  { icon: FaBrain, title: 'Multi-Model AI', desc: 'Switch between GPT-4o, DeepSeek, Llama, Gemini and more mid-conversation.', color: '#6366f1' },
  { icon: FaRocket, title: 'Agentic Tools', desc: 'Search the web, check weather, look up facts -- AI does the work.', color: '#f472b6' },
  { icon: FaShieldAlt, title: 'Persistent Memory', desc: 'Remembers your preferences, context, and conversation history.', color: '#fbbf24' },
]

const modelNames = ['GPT-4o', 'DeepSeek', 'Llama', 'Gemini']

const partnerLogos = [
  { node: <FaRobot size={28} className="neon-logo text-white/40" style={{ animationDelay: '0s' }} /> },
  { node: <FaGoogle size={28} className="neon-logo text-white/40" style={{ animationDelay: '0.5s' }} /> },
  { node: <SiAnthropic size={28} className="neon-logo text-white/40" style={{ animationDelay: '1s' }} /> },
  { node: <SiMistralai size={28} className="neon-logo text-white/40" style={{ animationDelay: '1.5s' }} /> },
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '2s' }}>DS</span> },
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '2.5s' }}>LLM</span> },
]

const hyperspeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 526344,
    islandColor: 657930,
    background: 0,
    shoulderLines: 1250072,
    brokenLines: 1250072,
    leftCars: [14177983, 6770850, 12732332],
    rightCars: [242627, 941733, 3294549],
    sticks: 242627,
  }
}

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-bg-deep overflow-x-hidden relative">
      {/* Fullscreen Hyperspeed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* Splash Cursor */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <SplashCursor
          TRANSPARENT={true}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          RAINBOW_MODE={false}
          COLOR="#5ed29c"
        />
      </div>

      {/* StaggeredMenu Navigation */}
      <StaggeredMenu
        position="right"
        isFixed={true}
        logoUrl="/brand/logo.svg"
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
          { label: 'Features', ariaLabel: 'View features', link: '/features' },
          { label: 'Partners', ariaLabel: 'View partners', link: '/partners' },
          { label: 'Voice', ariaLabel: 'Voice assistant', link: '/voice' },
          { label: 'Assistant', ariaLabel: 'Chat interface', link: '/assistant' },
          ...(user ? [] : [{ label: 'Sign In', ariaLabel: 'Sign in to your account', link: '#signin' }]),
        ]}
        accentColor="#5ed29c"
        colors={['#120F17', '#1e1d2a', '#2d2b3e']}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#5ed29c"
        changeMenuColorOnOpen={true}
        displaySocials={false}
        displayItemNumbering={false}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-5 py-2 mb-8 border border-white/10">
            <Sparkles size={12} className="text-accent" />
            <ShinyText text="Multi-Modal AI Assistant" speed={3} shineColor="#5ed29c" className="text-xs text-white/60" />
          </div>

          <div className="mb-4">
            <SplitText
              text="Your Intelligent"
              className="text-[clamp(44px,9vw,80px)] font-display font-extrabold text-white leading-[1.05] tracking-tight"
              delay={40}
              duration={1}
              splitType="chars"
              from={{ opacity: 0, y: 60, rotateX: -20 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.05}
              rootMargin="-50px"
            />
          </div>

          <div className="text-[clamp(44px,9vw,80px)] font-display font-extrabold leading-[1.05] tracking-tight mb-6">
            <GradientText
              colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']}
              animationSpeed={6}
              direction="horizontal"
            >
              Voice & Chat Agent
            </GradientText>
          </div>

          <BlurText
            text="Talk or type to NexusAI -- powered by multiple LLMs, agentic tools, and persistent memory. Your smart thinking partner for work, research, and creativity."
            className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
            delay={80}
            animateBy="words"
            direction="top"
            threshold={0.2}
          />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/assistant')}
              className="group relative overflow-hidden rounded-full px-8 py-3.5 font-bold text-sm transition-all duration-500 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-[#6366f1] to-accent bg-[length:200%_100%] animate-gradient-fast" />
              <span className="absolute inset-[1px] rounded-full bg-bg-deep z-[1]" />
              <span className="absolute inset-[1px] rounded-full bg-gradient-to-r from-accent/10 via-[#6366f1]/10 to-accent/10 bg-[length:200%_100%] animate-gradient-fast z-[1]" />
              <span className="relative z-[2] flex items-center gap-2">
                <Bolt size={16} className="text-accent group-hover:rotate-12 transition-transform duration-300" />
                <span className="bg-gradient-to-r from-accent via-[#6366f1] to-accent bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-fast">
                  Start Chatting
                </span>
                <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent/60 rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent/60 rounded-br-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#6366f1]/60 rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#6366f1]/60 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </button>
            <button
              onClick={() => navigate('/voice')}
              className="bg-white/5 backdrop-blur-xl rounded-full px-8 py-3.5 text-sm text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105"
            >
              Voice
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16 mt-16">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white"><CountUp to={5} duration={2.5} /></p>
              <p className="text-sm md:text-base text-white/40 mt-2">AI Models</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white"><CountUp to={3} duration={2.5} delay={0.2} /></p>
              <p className="text-sm md:text-base text-white/40 mt-2">Agent Tools</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white"><CountUp to={100} duration={2.5} delay={0.4} suffix="%" /></p>
              <p className="text-sm md:text-base text-white/40 mt-2">Private</p>
            </div>
          </div>

          <div className="mt-8">
            <TextType
              text={modelNames}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={2000}
              loop={true}
              className="text-sm text-white/30 inline-block"
              cursorClassName="text-accent"
            />
          </div>
        </div>
      </section>

      {/* Partners Preview */}
      <section id="partners" className="relative py-20 z-10 bg-bg-deep">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
              <ShinyText text="Ecosystem" speed={3} shineColor="#6366f1" className="text-xs text-white/50" />
            </div>
          </ScrollFloat>
          <ScrollFloat animationDuration={1.2} ease="back.inOut(2)" stagger={0.03}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                Powered by Top AI Providers
              </GradientText>
            </h2>
            <p className="text-white/30 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
              OpenAI, Groq, Google, DeepSeek, Anthropic, Mistral — all routed through a single smart layer.
            </p>
          </ScrollFloat>
          <LogoLoop
            logos={partnerLogos}
            speed={100}
            direction="left"
            logoHeight={40}
            gap={80}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#050807"
          />
          <div className="mt-10">
            <button onClick={() => navigate('/partners')} className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-accent transition-colors group">
              View all providers
              <FaArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="relative px-6 py-20 z-10 bg-bg-deep overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none" style={{ background: 'radial-gradient(circle, #5ed29c 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto relative z-[1]">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <ShinyText text="Capabilities" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                  What NexusAI Offers
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Voice-first interaction, multi-model AI, agentic tools, and persistent memory — in one seamless experience.
              </p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div key={feat.title} className="group relative">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${feat.color}40, transparent, ${feat.color}20)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 text-center group-hover:border-white/[0.12] transition-all duration-500">
                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border" style={{ borderColor: `${feat.color}30`, background: `${feat.color}08` }}>
                      <Icon size={20} color={feat.color} />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1.5">{feat.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/features')} className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-accent transition-colors group">
              Explore all features in detail
              <FaArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 text-center z-10 bg-bg-deep">
        <BorderGlow
          className="rounded-3xl max-w-2xl mx-auto p-12 md:p-16"
          backgroundColor="#0a0f0e"
          borderRadius={24}
          glowColor="152 55 44"
          glowIntensity={0.8}
          edgeSensitivity={15}
          animated={true}
          colors={['rgba(94,210,156,0.4)', 'rgba(99,102,241,0.3)', 'rgba(244,114,182,0.3)']}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
            No signup required. Start chatting with NexusAI instantly.
          </p>
          <StarBorder
            as="button"
            onClick={() => navigate('/assistant')}
            color="#5ed29c"
            speed="6s"
            thickness={1}
            className="!rounded-full"
          >
            <span className="flex items-center gap-2 px-6 py-2 font-bold text-sm">
              Launch NexusAI
              <ArrowRight size={16} />
            </span>
          </StarBorder>
        </BorderGlow>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-white/5 z-10 bg-bg-deep">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">NexusAI — Final Year Project</p>
          <div className="flex items-center gap-6">
            <a href="/features" className="text-xs text-white/20 hover:text-white/40 transition-colors">Features</a>
            <a href="/partners" className="text-xs text-white/20 hover:text-white/40 transition-colors">Partners</a>
            <button onClick={() => setAuthOpen(true)} className="text-xs text-white/20 hover:text-white/40 transition-colors">
              {user ? user.email : 'Sign In'}
            </button>
          </div>
        </div>
      </footer>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  )
}
