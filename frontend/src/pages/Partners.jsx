import { FaRobot, FaGoogle, FaRocket } from 'react-icons/fa'
import { SiAnthropic, SiMistralai, SiOpenai, SiMeta } from 'react-icons/si'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import SplitText from '../components/ReactBits/SplitText'
import ScrollFloat from '../components/ReactBits/ScrollFloat'
import GradientText from '../components/ReactBits/GradientText'
import ShinyText from '../components/ReactBits/ShinyText'
import LogoLoop from '../components/ReactBits/LogoLoop'

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
    desc: 'Industry-leading language models with broad reasoning, creativity, and tool-use capabilities.',
  },
  {
    name: 'Groq',
    icon: <FaRocket size={24} />,
    models: 'Llama 3.3 70B',
    color: '#6366f1',
    desc: 'Blazing-fast inference with open-weight Llama models, optimized for low-latency conversations.',
  },
  {
    name: 'Google',
    icon: <FaGoogle size={24} />,
    models: 'Gemini 1.5 Flash',
    color: '#f472b6',
    desc: 'Google\'s multimodal model with native vision and long-context understanding.',
  },
  {
    name: 'DeepSeek',
    icon: <span className="text-xl font-black">DS</span>,
    models: 'DeepSeek Chat',
    color: '#fbbf24',
    desc: 'Powerful open-source model with strong coding and reasoning performance.',
  },
  {
    name: 'Anthropic',
    icon: <SiAnthropic size={24} />,
    models: 'Claude (coming soon)',
    color: '#5ed29c',
    desc: 'Safety-focused AI with nuanced reasoning and careful instruction following.',
  },
  {
    name: 'Mistral',
    icon: <SiMistralai size={24} />,
    models: 'Mistral (coming soon)',
    color: '#6366f1',
    desc: 'Efficient, high-performance open-source models for specialized tasks.',
  },
]

export default function Partners() {
  return (
    <div className="min-h-screen bg-bg-deep overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#6366f108,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#5ed29c08,_transparent_50%)]" />
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <ShinyText text="Powered By" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
          </div>
          <SplitText
            text="Industry-Leading AI Providers"
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            delay={40}
            duration={0.8}
            tag="h1"
          />
          <p className="text-base md:text-lg text-white/30 max-w-2xl mx-auto leading-relaxed mt-4">
            NexusAI integrates with the world's best AI models and services,
            so you always get the right intelligence for the job.
          </p>
        </div>

        <div className="mb-20">
          <ScrollFloat animationDuration={1.2} ease="back.inOut(2)" stagger={0.03}>
            <p className="text-center text-xs text-white/20 mb-10 uppercase tracking-[0.2em] font-medium">
              Supported Providers
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p, i) => (
            <div key={p.name} className="group relative">
              <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${p.color}40, transparent, ${p.color}20)` }} />
              <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${p.color}30, transparent, ${p.color}15)` }} />
              <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-110" style={{ background: p.color }} />
                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center border" style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
                      <span style={{ color: p.color }}>{p.icon}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">{p.name}</h3>
                    <p className="text-[11px] text-white/30 font-mono">{p.models}</p>
                  </div>
                </div>
                <p className="text-white/35 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
