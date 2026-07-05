import { FaRobot, FaGoogle, FaRocket, FaCheckCircle, FaCog, FaServer, FaLightbulb, FaArrowRight } from 'react-icons/fa'
import { SiAnthropic, SiMistralai, SiOpenai, SiMeta } from 'react-icons/si'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import SplitText from '../components/ReactBits/SplitText'
import ScrollFloat from '../components/ReactBits/ScrollFloat'
import GradientText from '../components/ReactBits/GradientText'
import ShinyText from '../components/ReactBits/ShinyText'
import LogoLoop from '../components/ReactBits/LogoLoop'
import RotatingText from '../components/ReactBits/RotatingText'
import DecryptedText from '../components/ReactBits/DecryptedText'
import CountUp from '../components/ReactBits/CountUp'
import BlurText from '../components/ReactBits/BlurText'
import StarBorder from '../components/ReactBits/StarBorder'
import LaserFlow from '../components/ReactBits/LaserFlow'
import { useNavigate } from 'react-router-dom'

const partnerLogos = [
  { node: <FaRobot size={28} className="neon-logo text-white/40" style={{ animationDelay: '0s' }} /> },
  { node: <FaGoogle size={28} className="neon-logo text-white/40" style={{ animationDelay: '0.5s' }} /> },
  { node: <SiAnthropic size={28} className="neon-logo text-white/40" style={{ animationDelay: '1s' }} /> },
  { node: <SiMistralai size={28} className="neon-logo text-white/40" style={{ animationDelay: '1.5s' }} /> },
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '2s' }}>DS</span> },
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '2.5s' }}>LLM</span> },
]

const providers = [
  {
    name: 'OpenAI',
    icon: <SiOpenai size={24} />,
    models: 'GPT-4o, GPT-4o-mini',
    color: '#5ed29c',
    tag: 'Production',
    desc: 'Industry-leading language models with broad reasoning, creativity, and tool-use capabilities. OpenAI powers the most complex reasoning tasks with state-of-the-art performance across benchmarks.',
    strengths: ['Reasoning & logic', 'Creative writing', 'Tool/function calling', 'Broad knowledge base'],
    useCase: 'Complex reasoning tasks, content generation, and general-purpose chat with highest accuracy.',
    status: 'Active',
  },
  {
    name: 'Groq',
    icon: <FaRocket size={24} />,
    models: 'Llama 3.3 70B',
    color: '#6366f1',
    tag: 'Fastest',
    desc: 'Blazing-fast inference through custom LPU hardware. Groq delivers sub-100ms response times on Llama models, making it ideal for real-time conversational AI with minimal latency.',
    strengths: ['Lowest latency', 'Open-weight models', 'Cost-effective', 'Scalable infrastructure'],
    useCase: 'Real-time voice conversations, streaming chat, and latency-sensitive applications.',
    status: 'Active',
  },
  {
    name: 'Google',
    icon: <FaGoogle size={24} />,
    models: 'Gemini 1.5 Flash',
    color: '#f472b6',
    tag: 'Multimodal',
    desc: 'Google\'s multimodal model with native vision understanding, long-context windows (up to 1M tokens), and seamless integration with Google Cloud services.',
    strengths: ['Vision understanding', 'Long context (1M tokens)', 'Multimodal inputs', 'Cloud integration'],
    useCase: 'Multimodal analysis — images, long documents, and tasks requiring large context windows.',
    status: 'Active',
  },
  {
    name: 'DeepSeek',
    icon: <span className="text-xl font-black">DS</span>,
    models: 'DeepSeek Chat',
    color: '#fbbf24',
    tag: 'Open-Weight',
    desc: 'A powerful open-weight model that rivals proprietary systems in coding and reasoning benchmarks. DeepSeek offers strong performance with full model transparency.',
    strengths: ['Coding benchmarks', 'Structured reasoning', 'Open weights', 'Research-grade'],
    useCase: 'Code generation, debugging, mathematical reasoning, and technical problem-solving.',
    status: 'Active',
  },
  {
    name: 'Anthropic',
    icon: <SiAnthropic size={24} />,
    models: 'Claude (coming soon)',
    color: '#5ed29c',
    tag: 'Safety-First',
    desc: 'Safety-focused AI labs creating Claude — models designed for nuanced reasoning, careful instruction following, and constitutionally aligned responses.',
    strengths: ['Safety alignment', 'Nuanced reasoning', 'Instruction following', 'Long-form writing'],
    useCase: 'Complex analysis, content moderation, legal/document review, and safety-critical applications.',
    status: 'Coming Soon',
  },
  {
    name: 'Mistral',
    icon: <SiMistralai size={24} />,
    models: 'Mistral (coming soon)',
    color: '#6366f1',
    tag: 'Efficient',
    desc: 'French AI lab pushing the frontier of efficient, high-performance open-source models. Mistral delivers competitive performance with smaller, faster architectures.',
    strengths: ['Model efficiency', 'Small footprint', 'Open-source', 'Multi-language'],
    useCase: 'Edge deployment, specialized fine-tuning, and scenarios requiring fast, lightweight models.',
    status: 'Coming Soon',
  },
]

const metrics = [
  { value: 6, suffix: '', label: 'Active Providers', color: '#5ed29c', desc: 'Integrated and tested' },
  { value: 4, suffix: '+', label: 'Active Models', color: '#6366f1', desc: 'Available right now' },
  { value: 99, suffix: '%', label: 'Routing Reliability', color: '#f472b6', desc: 'Smart fallback ensures uptime' },
  { value: 200, suffix: '+', label: 'Daily Requests', color: '#fbbf24', desc: 'And growing every day' },
]

const integrationSteps = [
  { step: 1, title: 'Unified API', desc: 'All providers are accessed through a single REST API endpoint. The frontend never needs to know which model is running.', color: '#5ed29c' },
  { step: 2, title: 'Smart Router', desc: 'The LLM router evaluates task complexity, latency requirements, and your selected preference to pick the optimal model.', color: '#6366f1' },
  { step: 3, title: 'Automatic Fallback', desc: 'If a provider is unavailable, the router seamlessly falls back to the next best model without interrupting your conversation.', color: '#f472b6' },
  { step: 4, title: 'Unified Streaming', desc: 'Every provider streams responses token-by-token through the same Socket.IO interface — consistent UX regardless of backend.', color: '#fbbf24' },
]

export default function Partners() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-deep overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#6366f108,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#5ed29c08,_transparent_50%)]" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
      </div>

      {/* LaserFlow background decoration */}
      <div className="fixed bottom-0 left-0 w-full h-[300px] z-[1] pointer-events-none opacity-15">
        <LaserFlow
          color="#5ed29c"
          flowSpeed={0.25}
          wispDensity={0.6}
          fogIntensity={0.3}
          horizontalSizing={1.2}
          verticalSizing={0.8}
          wispIntensity={3}
        />
      </div>

      <StaggeredMenu
        position="right"
        isFixed={true}
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
          { label: 'Assistant', ariaLabel: 'Chat interface', link: '/assistant' },
          { label: 'Voice', ariaLabel: 'Voice assistant', link: '/voice' },
          { label: 'Features', ariaLabel: 'View features', link: '/features' },
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <ShinyText text="Powered By" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
            </div>
          </ScrollFloat>

          <SplitText
            text="Industry-Leading AI Providers"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
            delay={40}
            duration={0.8}
            tag="h1"
          />

          <p className="text-base md:text-lg text-white/30 max-w-2xl mx-auto leading-relaxed mt-4 mb-6">
            NexusAI integrates the world's best AI models into a single, unified interface.
            Switch between providers mid-conversation with zero friction.
          </p>

          <div className="inline-flex items-center gap-2 text-white/20 text-sm">
            <span className="text-white/30">Currently routing through</span>
            <RotatingText
              texts={['OpenAI', 'Groq', 'Google', 'DeepSeek']}
              rotationInterval={2200}
              staggerDuration={0.04}
              staggerFrom="center"
              splitBy="characters"
              mainClassName="text-accent font-semibold min-w-[90px] inline-block text-left"
              elementLevelClassName="text-accent"
            />
          </div>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {providers.map((p, i) => (
            <ScrollFloat key={p.name} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative h-full">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${p.color}40, transparent, ${p.color}20)` }} />
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${p.color}30, transparent, ${p.color}15)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-110" style={{ background: p.color }} />
                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center border" style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
                          <span style={{ color: p.color }}>{p.icon}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base">{p.name}</h3>
                        <p className="text-[11px] text-white/30 font-mono mt-0.5">{p.models}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 border shrink-0" style={{ borderColor: `${p.color}25`, color: p.color, background: `${p.color}08` }}>
                      {p.tag}
                    </span>
                  </div>

                  <p className="text-white/35 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

                  <div className="space-y-1.5 mb-5">
                    {p.strengths.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <FaCheckCircle size={10} style={{ color: p.color }} className="shrink-0 opacity-60" />
                        <span className="text-white/30 text-xs">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.04] mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaLightbulb size={11} className="text-white/20" />
                        <span className="text-white/25 text-[11px] leading-tight max-w-[180px]">{p.useCase}</span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-1 rounded-full" style={{ background: p.status === 'Active' ? '#5ed29c15' : '#fbbf2415', color: p.status === 'Active' ? '#5ed29c' : '#fbbf24' }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-28">
          {metrics.map((m) => (
            <ScrollFloat key={m.label} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${m.color}40, transparent, ${m.color}20)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 text-center group-hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: m.color }}>
                    <CountUp to={m.value} duration={2.5} suffix={m.suffix} />
                  </p>
                  <p className="text-sm font-medium text-white/60 mb-0.5">{m.label}</p>
                  <p className="text-[11px] text-white/25">{m.desc}</p>
                </div>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* LogoLoop */}
        <div className="mb-28">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <p className="text-center text-xs text-white/20 mb-10 uppercase tracking-[0.2em] font-medium">
              Trusted Providers in Production
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
        </div>

        {/* How Integration Works */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                <ShinyText text="Behind the Router" speed={3} shineColor="#6366f1" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                  How Model Integration Works
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Every provider plugs into the same smart routing layer.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {integrationSteps.map((step) => (
              <ScrollFloat key={step.step} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" style={{ background: `linear-gradient(135deg, ${step.color}20, transparent, ${step.color}10)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.1] transition-all duration-500">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-sm font-bold" style={{ background: `${step.color}15`, color: step.color }}>
                      {step.step}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollFloat>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <ScrollFloat animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
            <BlurText
              text="Try the Router Yourself"
              className="text-3xl md:text-4xl font-display font-bold text-white mb-3"
              delay={80}
              animateBy="words"
              direction="top"
              threshold={0.2}
            />
            <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
              Switch between AI models mid-conversation and see which one works best.
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
                  Open Assistant
                  <FaArrowRight size={12} />
                </span>
              </StarBorder>
              <button
                onClick={() => navigate('/voice')}
                className="bg-white/5 backdrop-blur-xl rounded-full px-8 py-3 text-sm text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105"
              >
                Try Voice Mode
              </button>
            </div>
          </ScrollFloat>
        </div>
      </div>
    </div>
  )
}
