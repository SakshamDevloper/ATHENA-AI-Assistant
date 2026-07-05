import { useRef } from 'react'
import { FaRocket, FaBrain, FaBolt, FaShieldAlt, FaMicrochip, FaCogs, FaDatabase, FaCloud, FaLock, FaPalette, FaRobot, FaSearch, FaCode, FaCloudSun, FaHistory, FaExchangeAlt, FaHeadphones } from 'react-icons/fa'
import { SiOpenai, SiGithub } from 'react-icons/si'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import SplitText from '../components/ReactBits/SplitText'
import ScrollFloat from '../components/ReactBits/ScrollFloat'
import GradientText from '../components/ReactBits/GradientText'
import ShinyText from '../components/ReactBits/ShinyText'
import BorderGlow from '../components/ReactBits/BorderGlow'
import RotatingText from '../components/ReactBits/RotatingText'
import DecryptedText from '../components/ReactBits/DecryptedText'
import GradualBlur from '../components/ReactBits/GradualBlur'
import MagicRings from '../components/ReactBits/MagicRings'
import BlurText from '../components/ReactBits/BlurText'
import CountUp from '../components/ReactBits/CountUp'
import StarBorder from '../components/ReactBits/StarBorder'
import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: FaBolt, title: 'Voice-First', color: '#5ed29c',
    desc: 'Natural voice interaction with real-time speech recognition, neural text-to-speech, and wake-word activation. The interface responds to your voice with low-latency streaming.',
    subs: [
      { icon: FaHeadphones, label: 'Real-Time STT', text: 'Web Speech API with continuous recognition, real-time transcription, and multi-language support' },
      { icon: FaRobot, label: 'Neural TTS', text: 'Natural-sounding female voice synthesis with Google TTS integration, configurable pitch and rate' },
      { icon: FaMicrochip, label: 'Wake Word', text: 'Custom wake word detection ("Hey Nexus") with SpeechRecognition-based continuous listening' },
      { icon: FaExchangeAlt, label: 'Silence Detection', text: 'Automatic 2-second silence detection triggers query submission for hands-free flow' },
    ]
  },
  {
    icon: FaBrain, title: 'Multi-Model AI', color: '#6366f1',
    desc: 'Seamlessly switch between multiple AI models mid-conversation. Each model brings unique strengths — from reasoning to creativity — routed through a unified interface.',
    subs: [
      { icon: SiOpenai, label: 'GPT-4o / GPT-4o-mini', text: 'OpenAI flagship models for broad reasoning, creativity, and complex task execution' },
      { icon: FaRocket, label: 'Llama 3.3 70B (Groq)', text: 'Blazing-fast inference on Groq hardware — ideal for low-latency conversations' },
      { icon: FaCloud, label: 'Gemini 1.5 Flash', text: 'Google multimodal model with native vision understanding and long-context windows' },
      { icon: FaDatabase, label: 'DeepSeek Chat', text: 'Open-weight model with strong coding benchmarks and structured reasoning' },
    ]
  },
  {
    icon: FaCogs, title: 'Agentic Tools', color: '#f472b6',
    desc: 'Real-time tool execution that extends AI capabilities beyond text. Search the web, check weather, retrieve facts, run code — all within the conversation.',
    subs: [
      { icon: FaSearch, label: 'Web Search', text: 'Live internet search via Tavily API with source citations and real-time content extraction' },
      { icon: FaCode, label: 'Code Execution', text: 'Multi-language code execution sandbox with output capture and error handling' },
      { icon: FaCloudSun, label: 'Weather & Facts', text: 'Real-time weather data retrieval, factual lookups, and knowledge graph queries' },
      { icon: FaHistory, label: 'Context-Aware Routing', text: 'Smart tool selection based on conversation context — no manual switching needed' },
    ]
  },
  {
    icon: FaShieldAlt, title: 'Persistent Memory', color: '#fbbf24',
    desc: 'Remembers who you are, what you prefer, and what you discussed. Cross-session memory ensures the assistant gets smarter with every interaction.',
    subs: [
      { icon: FaDatabase, label: 'Session Memory', text: 'Full conversation context maintained within each session for coherent multi-turn dialogue' },
      { icon: FaHistory, label: 'Conversation History', text: 'Browse, search, resume past conversations with timestamped history via MongoDB' },
      { icon: FaLock, label: 'User Preferences', text: 'Learns your model preferences, theme choices, and interaction patterns over time' },
      { icon: FaPalette, label: 'Cross-Session Recall', text: 'Relevant context persists across sessions — no need to repeat yourself' },
    ]
  },
]

const stats = [
  { value: 5, suffix: '+', label: 'AI Models Integrated', color: '#5ed29c' },
  { value: 4, suffix: '+', label: 'Agentic Tools', color: '#6366f1' },
  { value: 99, suffix: '%', label: 'Uptime Reliability', color: '#f472b6' },
  { value: 200, suffix: 'ms', label: 'Avg Response Start', color: '#fbbf24' },
]

const extras = [
  { icon: FaCloud, title: 'Real-Time Streaming', desc: 'Token-by-token response streaming via Socket.IO so you see results instantly, not after full generation.', color: '#5ed29c' },
  { icon: FaHeadphones, title: 'Multi-Platform', desc: 'Fully responsive across desktop, tablet, and mobile with adaptive layouts and touch-friendly controls.', color: '#6366f1' },
  { icon: FaLock, title: 'Privacy First', desc: 'End-to-end encrypted conversations. Your data is never used for training. Open-source code for full transparency.', color: '#f472b6' },
  { icon: FaPalette, title: 'Fully Customizable', desc: 'Dark/light theme, model selection, UI preferences, voice settings — tailor every aspect to your workflow.', color: '#fbbf24' },
  { icon: FaGithub, title: 'Open Source', desc: 'Built in the open with a permissive license. Self-host, audit, extend, or contribute to the project.', color: '#5ed29c' },
  { icon: FaExchangeAlt, title: 'Model Agnostic', desc: 'Designed to support any LLM provider. Add new models through the router without touching frontend logic.', color: '#6366f1' },
]

const timeline = [
  { step: 1, title: 'You Speak or Type', desc: 'Input is captured via keyboard or Web Speech API. Voice input is transcribed in real-time with wake-word activation.', color: '#5ed29c' },
  { step: 2, title: 'Router Selects Model', desc: 'The LLM router picks the optimal model based on your preference, task complexity, and provider availability.', color: '#6366f1' },
  { step: 3, title: 'AI Processes & Streams', desc: 'The model processes your query with full context. Tools execute in parallel — web search, code, or data retrieval.', color: '#f472b6' },
  { step: 4, title: 'Response Delivered', desc: 'Results stream token-by-token to the UI. TTS audio plays for voice mode. Conversation saved to memory.', color: '#fbbf24' },
]

export default function Features() {
  const navigate = useNavigate()
  const ringsRef = useRef(null)

  return (
    <div className="min-h-screen bg-bg-deep overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#5ed29c08,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#6366f108,_transparent_50%)]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
      </div>

      <StaggeredMenu
        position="right"
        isFixed={true}
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
          { label: 'Assistant', ariaLabel: 'Chat interface', link: '/assistant' },
          { label: 'Voice', ariaLabel: 'Voice assistant', link: '/voice' },
          { label: 'Partners', ariaLabel: 'View partners', link: '/partners' },
          { label: 'History', ariaLabel: 'View history', link: '/history' },
        ]}
        accentColor="#5ed29c"
        colors={['#0a0f0e', '#0d1412', '#111a17']}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#5ed29c"
        changeMenuColorOnOpen={true}
        displaySocials={false}
        displayItemNumbering={true}
      />

      {/* Decorative MagicRings */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-[1] pointer-events-none opacity-20">
        <MagicRings
          ref={ringsRef}
          ringCount={6}
          color="#5ed29c"
          colorTwo="#6366f1"
          speed={0.4}
          lineThickness={1.5}
          baseRadius={0.3}
          radiusStep={0.15}
          scaleRate={0.05}
          fadeIn={1}
          fadeOut={0.8}
          opacity={0.6}
          blur={3}
          followMouse
          mouseInfluence={0.15}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Hero */}
        <div className="text-center mb-24">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <ShinyText text="Everything NexusAI Can Do" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
            </div>
          </ScrollFloat>

          <SplitText
            text="A Feature-Rich AI Experience"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
            delay={40}
            duration={0.8}
            tag="h1"
          />

          <p className="text-base md:text-lg text-white/30 max-w-2xl mx-auto leading-relaxed mt-4 mb-6">
            From voice-first interaction to multi-model intelligence, NexusAI packs
            everything you need for modern AI-assisted workflows.
          </p>

          <div className="inline-flex items-center gap-2 text-white/20 text-sm">
            <span className="text-white/30">Start with</span>
            <RotatingText
              texts={['Voice', 'Chat', 'Search', 'Code']}
              rotationInterval={2000}
              staggerDuration={0.03}
              staggerFrom="center"
              splitBy="characters"
              mainClassName="text-accent font-semibold min-w-[80px] inline-block text-left"
              elementLevelClassName="text-accent"
            />
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="space-y-8 mb-28">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <ScrollFloat key={feat.title} animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
                <div className="group relative">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${feat.color}40, transparent, ${feat.color}20)` }} />
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${feat.color}30, transparent, ${feat.color}15)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-8 md:p-10 group-hover:border-white/[0.12] transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.04]">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-110" style={{ background: feat.color }} />
                        <div className="relative w-14 h-14 rounded-xl flex items-center justify-center border" style={{ borderColor: `${feat.color}30`, background: `${feat.color}08` }}>
                          <Icon size={24} color={feat.color} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[11px] font-mono font-medium" style={{ color: `${feat.color}80` }}>{(i + 1).toString().padStart(2, '0')}</span>
                          <span className="w-6 h-[1px]" style={{ background: `${feat.color}30` }} />
                          <h2 className="text-white font-bold text-xl">{feat.title}</h2>
                        </div>
                        <p className="text-white/35 text-sm md:text-base leading-relaxed max-w-2xl">{feat.desc}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {feat.subs.map((sub) => (
                        <div key={sub.label} className="rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]" style={{ borderColor: `${feat.color}12`, background: `${feat.color}04` }}>
                          <div className="flex items-center gap-2.5 mb-2">
                            <span style={{ color: feat.color }} className="text-xs"><sub.icon size={14} /></span>
                            <span className="text-white/70 text-xs font-semibold tracking-wide uppercase">{sub.label}</span>
                          </div>
                          <p className="text-white/30 text-xs leading-relaxed">{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFloat>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28">
          {stats.map((stat) => (
            <ScrollFloat key={stat.label} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent, ${stat.color}20)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 text-center group-hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: stat.color }}>
                    <CountUp to={stat.value} duration={2.5} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] animate-pulse" />
                <ShinyText text="From Input to Output" speed={3} shineColor="#f472b6" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                  How NexusAI Works
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Four steps from your query to a intelligent response.</p>
            </ScrollFloat>
          </div>

          <div className="relative">
            <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#5ed29c] via-[#6366f1] to-[#fbbf24] opacity-20 hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item) => (
                <ScrollFloat key={item.step} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
                  <div className="group relative flex items-start gap-6">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-700" style={{ background: item.color }} />
                      <div className="relative w-[46px] h-[46px] rounded-full flex items-center justify-center border text-sm font-bold" style={{ borderColor: `${item.color}40`, background: `${item.color}15`, color: item.color }}>
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <h3 className="text-white font-semibold text-base mb-1.5">{item.title}</h3>
                      <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollFloat>
              ))}
            </div>
          </div>
        </div>

        {/* Extras Grid */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                <ShinyText text="Also Includes" speed={3} shineColor="#6366f1" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#6366f1', '#f472b6', '#5ed29c', '#6366f1']} animationSpeed={6} direction="horizontal">
                  Beyond the Core
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Every detail crafted for a seamless experience.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((item) => {
              const Icon = item.icon
              return (
                <BorderGlow key={item.title} className="rounded-xl">
                  <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${item.color}15` }}>
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </BorderGlow>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <ScrollFloat animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
            <BlurText
              text="Ready to experience it?"
              className="text-3xl md:text-4xl font-display font-bold text-white mb-3"
              delay={80}
              animateBy="words"
              direction="top"
              threshold={0.2}
            />
            <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
              Pick your mode — voice or chat. No signup required.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <StarBorder
                as="button"
                onClick={() => navigate('/assistant')}
                color="#5ed29c"
                speed="6s"
                thickness={1}
                className="!rounded-full"
              >
                <span className="flex items-center gap-2 px-6 py-2 font-bold text-sm">
                  Start Chatting
                </span>
              </StarBorder>
              <button
                onClick={() => navigate('/voice')}
                className="bg-white/5 backdrop-blur-xl rounded-full px-8 py-3 text-sm text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105"
              >
                Try Voice
              </button>
            </div>
          </ScrollFloat>
        </div>
      </div>
    </div>
  )
}
