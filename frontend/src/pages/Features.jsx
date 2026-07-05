import { FaRocket, FaBrain, FaBolt, FaShieldAlt } from 'react-icons/fa'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import SplitText from '../components/ReactBits/SplitText'
import ScrollFloat from '../components/ReactBits/ScrollFloat'
import GradientText from '../components/ReactBits/GradientText'
import ShinyText from '../components/ReactBits/ShinyText'
import BorderGlow from '../components/ReactBits/BorderGlow'

const features = [
  { icon: FaBolt, title: 'Voice-First', desc: 'Speak naturally with real-time speech recognition and synthesis. The waves respond to your voice, making every interaction feel alive and immediate.', color: '#5ed29c' },
  { icon: FaBrain, title: 'Multi-Model AI', desc: 'Switch between GPT-4o, DeepSeek, Llama, Gemini and more mid-conversation. Each model brings unique strengths to your workflow.', color: '#6366f1' },
  { icon: FaRocket, title: 'Agentic Tools', desc: 'Search the web, check weather, look up facts, run code — AI does the heavy lifting. Real-time tool execution with transparent results.', color: '#f472b6' },
  { icon: FaShieldAlt, title: 'Persistent Memory', desc: 'Remembers your preferences, context, and conversation history across sessions. Your assistant learns and adapts over time.', color: '#fbbf24' },
]

const extras = [
  { title: 'Real-Time Streaming', desc: 'Responses stream token-by-token so you see results instantly, not wait for full generation.', color: '#5ed29c' },
  { title: 'Multi-Platform', desc: 'Works seamlessly across desktop and mobile with a responsive, dark-first UI.', color: '#6366f1' },
  { title: 'Privacy First', desc: 'Your data stays yours. End-to-end encryption and no training on your conversations.', color: '#f472b6' },
  { title: 'Open Source', desc: 'Built with transparency. Customize, extend, and self-host as needed.', color: '#fbbf24' },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-bg-deep overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#5ed29c08,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#6366f108,_transparent_50%)]" />
      </div>

      <StaggeredMenu
        position="right"
        isFixed={true}
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
          { label: 'Assistant', ariaLabel: 'Chat interface', link: '/assistant' },
          { label: 'Voice', ariaLabel: 'Voice assistant', link: '/voice' },
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <ShinyText text="Core Features" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
          </div>
          <SplitText
            text="What Makes NexusAI Different"
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            delay={40}
            duration={0.8}
            tag="h1"
          />
          <p className="text-base md:text-lg text-white/30 max-w-2xl mx-auto leading-relaxed mt-4">
            A next-generation AI assistant built for modern workflows —
            combining voice, multi-model intelligence, real-time tools,
            and persistent memory in one seamless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-28">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <div key={feat.title} className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${feat.color}40, transparent, ${feat.color}20)` }} />
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${feat.color}30, transparent, ${feat.color}15)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-8 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-110" style={{ background: feat.color }} />
                      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center border" style={{ borderColor: `${feat.color}30`, background: `${feat.color}08` }}>
                        <Icon size={22} color={feat.color} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-mono font-medium" style={{ color: `${feat.color}80` }}>{(i + 1).toString().padStart(2, '0')}</span>
                        <span className="w-6 h-[1px]" style={{ background: `${feat.color}30` }} />
                        <h3 className="text-white font-semibold text-lg">{feat.title}</h3>
                      </div>
                      <p className="text-white/35 text-sm md:text-base leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mb-12">
          <ScrollFloat animationDuration={1.2} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                More Power, Less Friction
              </GradientText>
            </h2>
            <p className="text-white/30 max-w-xl mx-auto">Everything you need, nothing you don't.</p>
          </ScrollFloat>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {extras.map((item) => (
            <BorderGlow key={item.title} className="rounded-xl">
              <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${item.color}15` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  )
}
