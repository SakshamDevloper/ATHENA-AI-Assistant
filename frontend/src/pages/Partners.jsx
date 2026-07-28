import { FaRobot, FaGoogle, FaRocket, FaCheckCircle, FaCog, FaServer, FaLightbulb, FaArrowRight, FaChartBar, FaDatabase, FaCloud, FaShieldAlt, FaBolt, FaDollarSign, FaMicrochip, FaGlobe, FaQuestionCircle, FaBook, FaCode, FaStar, FaTachometerAlt } from 'react-icons/fa'
import { SiAnthropic, SiMistralai, SiOpenai, SiMeta, SiMongodb, SiRedis, SiFirebase, SiCloudinary, SiNetlify, SiGithub } from 'react-icons/si'
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
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '2.5s' }}>MM</span> },
  { node: <span className="neon-logo text-xl font-black text-white/40 font-display tracking-widest" style={{ animationDelay: '3s' }}>LLM</span> },
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
  {
    name: 'MiniMax',
    icon: <span className="text-xl font-black">MM</span>,
    models: 'MiniMax-Text-01',
    color: '#ec4899',
    tag: 'Ultra-Context',
    desc: 'Cutting-edge language models with massive context windows up to 4 million tokens. MiniMax handles incredibly long documents, extensive codebases, and massive conversation histories without losing context.',
    strengths: ['4M token context window', 'Long document parsing', 'Extensive codebase analysis', 'Consistent context recall'],
    useCase: 'Processing entire books, code repositories, or ultra-long audio transcripts.',
    status: 'Active',
  },
]

const metrics = [
  { value: 7, suffix: '', label: 'Active Providers', color: '#5ed29c', desc: 'Integrated and tested' },
  { value: 9, suffix: '+', label: 'Active Models', color: '#6366f1', desc: 'Available right now' },
  { value: 99, suffix: '%', label: 'Routing Reliability', color: '#f472b6', desc: 'Smart fallback ensures uptime' },
  { value: 500, suffix: '+', label: 'Daily Requests', color: '#fbbf24', desc: 'And growing every day' },
  { value: 4, suffix: 'M', label: 'Max Context', color: '#a855f7', desc: 'Largest context window available' },
  { value: 200, suffix: 'ms', label: 'Fastest Latency', color: '#14b8a6', desc: 'Groq-powered response times' },
  { value: 12, suffix: '', label: 'Infra Partners', color: '#ec4899', desc: 'Powering the stack' },
  { value: 90, suffix: '%', label: 'Cost Reduction', color: '#5ed29c', desc: 'vs single-provider solutions' },
]

const benchmarks = [
  { model: 'GPT-4o', provider: 'OpenAI', latency: '1.2s', mmlu: '88.7', humaneval: '92.1', gsm8k: '95.4', costPer1k: '$0.01', bestFor: 'Complex reasoning, creative writing, tool calling', color: '#5ed29c' },
  { model: 'GPT-4o Mini', provider: 'OpenAI', latency: '0.4s', mmlu: '82.0', humaneval: '87.2', gsm8k: '87.1', costPer1k: '$0.002', bestFor: 'Fast general chat, cost-sensitive tasks', color: '#5ed29c' },
  { model: 'o1 (Preview)', provider: 'OpenAI', latency: '3.0s', mmlu: '92.3', humaneval: '94.8', gsm8k: '96.6', costPer1k: '$0.03', bestFor: 'Advanced math, science, deep chain-of-thought', color: '#5ed29c' },
  { model: 'Llama 3.3 70B', provider: 'Groq', latency: '0.2s', mmlu: '86.0', humaneval: '81.7', gsm8k: '89.0', costPer1k: '$0.0005', bestFor: 'Real-time voice, low-latency chat, streaming', color: '#6366f1' },
  { model: 'Llama 3.1 8B', provider: 'Groq', latency: '0.1s', mmlu: '73.0', humaneval: '72.6', gsm8k: '81.2', costPer1k: '$0.0001', bestFor: 'Simple Q&A, classification, high-throughput tasks', color: '#6366f1' },
  { model: 'Gemini 1.5 Flash', provider: 'Google', latency: '0.6s', mmlu: '78.5', humaneval: '79.4', gsm8k: '83.3', costPer1k: '$0.0003', bestFor: 'Multimodal analysis, long docs (1M context)', color: '#f472b6' },
  { model: 'Gemini 1.5 Pro', provider: 'Google', latency: '1.0s', mmlu: '85.9', humaneval: '84.1', gsm8k: '90.8', costPer1k: '$0.005', bestFor: 'Enterprise multimodal, video understanding', color: '#f472b6' },
  { model: 'Gemini 2.0 Flash', provider: 'Google', latency: '0.5s', mmlu: '87.5', humaneval: '88.3', gsm8k: '92.1', costPer1k: '$0.0004', bestFor: 'Next-gen reasoning, agentic workflows', color: '#f472b6' },
  { model: 'DeepSeek Chat', provider: 'DeepSeek', latency: '0.8s', mmlu: '79.2', humaneval: '83.6', gsm8k: '84.1', costPer1k: '$0.001', bestFor: 'Code generation, debugging, math reasoning', color: '#fbbf24' },
  { model: 'DeepSeek V2', provider: 'DeepSeek', latency: '0.6s', mmlu: '81.3', humaneval: '85.0', gsm8k: '86.7', costPer1k: '$0.0005', bestFor: 'Improved coding, structured output, research', color: '#fbbf24' },
  { model: 'MiniMax-Text-01', provider: 'MiniMax', latency: '1.0s', mmlu: '81.5', humaneval: '78.9', gsm8k: '86.2', costPer1k: '$0.008', bestFor: 'Entire codebases, books, 4M token windows', color: '#ec4899' },
  { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency: '1.1s', mmlu: '88.8', humaneval: '90.5', gsm8k: '93.2', costPer1k: '$0.008', bestFor: 'Safety-critical analysis, legal review, nuanced writing', color: '#5ed29c' },
  { model: 'Mistral Large', provider: 'Mistral', latency: '0.7s', mmlu: '84.0', humaneval: '81.2', gsm8k: '85.5', costPer1k: '$0.004', bestFor: 'Multi-language, edge deployment, fine-tuning', color: '#6366f1' },
]

const techPartners = [
  { icon: SiMongodb, name: 'MongoDB Atlas', desc: 'Durable long-term storage for conversations, memories, and user profiles', color: '#47A248' },
  { icon: SiRedis, name: 'Redis', desc: 'In-memory session cache for low-latency context retrieval across conversations', color: '#DC382D' },
  { icon: SiFirebase, name: 'Firebase Auth', desc: 'Secure authentication with Google OAuth and email/password login flows', color: '#FFCA28' },
  { icon: SiCloudinary, name: 'Cloudinary', desc: 'Media storage and optimization for file uploads and rich content delivery', color: '#3448C5' },
  { icon: SiNetlify, name: 'Netlify', desc: 'Frontend deployment with global CDN, serverless functions, and edge caching', color: '#00AD9F' },
  { icon: SiGithub, name: 'GitHub', desc: 'Open-source repository hosting with CI/CD, issue tracking, and community contributions', color: '#ffffff' },
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
        displayItemNumbering={false}
      />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-8">
        {/* Hero */}
        <div className="text-center mb-6">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-4 border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <ShinyText text="Powered By" speed={3} shineColor="#5ed29c" className="text-xs text-white/50" />
            </div>
          </ScrollFloat>

          <SplitText
            text="Industry-Leading AI Providers"
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2"
            delay={40}
            duration={0.8}
            tag="h1"
          />

          <p className="text-sm md:text-base text-white/30 max-w-2xl mx-auto leading-relaxed mt-3 mb-4">
            NexusAI integrates the world's best AI models into a single, unified interface.
            Switch between providers mid-conversation with zero friction.
          </p>

          <div className="inline-flex items-center gap-2 text-white/20 text-sm">
            <span className="text-white/30">Currently routing through</span>
            <RotatingText
              texts={['OpenAI', 'Groq', 'Google', 'DeepSeek', 'MiniMax']}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {providers.map((p, i) => (
            <ScrollFloat key={p.name} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative h-full">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${p.color}40, transparent, ${p.color}20)` }} />
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${p.color}30, transparent, ${p.color}15)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-5 h-full group-hover:border-white/[0.12] transition-all duration-500 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-110" style={{ background: p.color }} />
                        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center border" style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
                          <span style={{ color: p.color }}>{p.icon}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{p.name}</h3>
                        <p className="text-[10px] text-white/30 font-mono mt-0.5">{p.models}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider rounded-full px-2 py-0.5 border shrink-0" style={{ borderColor: `${p.color}25`, color: p.color, background: `${p.color}08` }}>
                      {p.tag}
                    </span>
                  </div>

                  <p className="text-white/35 text-xs leading-relaxed mb-3 flex-1 group-hover:text-white/45 transition-all duration-500">{p.desc}</p>

                  <div className="space-y-1 mb-3">
                    {p.strengths.map((s) => (
                      <div key={s} className="flex items-center gap-2 group/strength transition-all duration-300 hover:translate-x-1">
                        <FaCheckCircle size={9} style={{ color: p.color }} className="shrink-0 opacity-60 group-hover/strength:opacity-100 transition-all duration-300" />
                        <span className="text-white/30 text-[11px] group-hover/strength:text-white/50 transition-all duration-300">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/[0.04] mt-auto group-hover:border-white/[0.08] transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaLightbulb size={10} className="text-white/20 group-hover:text-white/40 transition-all duration-500" />
                        <span className="text-white/25 text-[10px] leading-tight max-w-[180px] group-hover:text-white/40 transition-all duration-500">{p.useCase}</span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: p.status === 'Active' ? '#5ed29c15' : '#fbbf2415', color: p.status === 'Active' ? '#5ed29c' : '#fbbf24' }}>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map((m) => (
            <ScrollFloat key={m.label} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${m.color}40, transparent, ${m.color}20)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 text-center group-hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: m.color }}>
                    <CountUp to={m.value} duration={2.5} suffix={m.suffix} />
                  </p>
                  <p className="text-sm font-medium text-white/60 mb-0.5">{m.label}</p>
                  <p className="text-[11px] text-white/25">{m.desc}</p>
                </div>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* Deep Description */}
        <div className="mb-6">
          <div className="max-w-5xl mx-auto">
            {/* Intro Block */}
            <div className="relative mb-6">
              <div className="absolute -top-6 -left-4 text-6xl md:text-8xl font-bold text-white/[0.02] select-none pointer-events-none leading-none">"</div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed tracking-wide">
                  The NexusAI multi-model ecosystem represents a fundamental shift in how conversational artificial intelligence is architected and delivered. Rather than locking users into a single provider or model, NexusAI embraces diversity at every layer of the stack, enabling a fluid and adaptive intelligence that can route across reasoning paradigms, latency profiles, cost structures, and capability sets.
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <p className="text-xs text-white/30 font-mono">CORE PHILOSOPHY — ORCHESTRATION, NOT ISOLATION</p>
                </div>
              </div>
            </div>

            {/* Provider Deep Dives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { id: 'O', name: 'OpenAI — GPT-4o & GPT-4o Mini', tags: 'Reasoning Depth • Creative Writing • Tool Calling', desc: 'Exceptional performance on complex reasoning tasks and multi-step tool calling sequences. GPT-4o achieves 88.7 MMLU and 92.1 HumanEval, with response latencies of 1.2 seconds. The optimal choice for tasks demanding the highest accuracy and nuanced comprehension, though at a premium per-token cost. GPT-4o Mini offers 82.0 MMLU at 0.4s latency for cost-sensitive workloads at one-fifth the price.', color: '#5ed29c' },
                { id: 'G', name: 'Groq — Llama 3.3 70B', tags: 'Lowest Latency • Real-Time Voice • LPU Hardware', desc: 'Custom LPU hardware delivers sub-200ms response times that are indistinguishable from human reaction times. Achieves 86.0 MMLU at the lowest cost per token of any major provider. The ideal backend for real-time voice conversations where every millisecond matters. Groq\'s deterministic temporal instruction set eliminates GPU memory bottlenecks entirely.', color: '#6366f1' },
                { id: 'Ge', name: 'Google — Gemini 1.5 Flash & Pro', tags: 'Multimodal • 1M Token Context • Vision Understanding', desc: 'Native multimodality trained from the ground up, not bolted on. Processes text, images, audio, and video within a single unified architecture. The 1M token context window enables processing entire books or comprehensive codebases in a single pass. Gemini 2.0 Flash pushes next-gen reasoning with 87.5 MMLU at just 0.5s latency and $0.0004 per 1K tokens.', color: '#f472b6' },
                { id: 'D', name: 'DeepSeek — Chat & V2', tags: 'Code Generation • Open-Weight • Research-Grade', desc: 'Open-weight models that rival proprietary systems in coding and reasoning. DeepSeek Chat scores 83.6 HumanEval with full model transparency — every architecture innovation published for community audit. Mixture-of-experts routing and attention mechanism optimization deliver competitive performance at one-tenth the cost of GPT-4o.', color: '#fbbf24' },
                { id: 'M', name: 'MiniMax — Text-01', tags: '4M Token Context • Ultra-Long Documents', desc: 'Pushes context windows to four million tokens — enough to ingest the entire Harry Potter series multiple times over. Sparse attention patterns reduce quadratic complexity to near-linear scaling with context length. Eliminates the need for complex RAG pipelines or sliding window approximations. Unmatched for legal document analysis and large-scale code review.', color: '#ec4899' },
                { id: 'C', name: 'Anthropic — Claude 3.5 Sonnet', tags: 'Safety-First • Constitutional AI • Nuanced Reasoning', desc: 'Constitutional AI training produces models significantly less likely to generate harmful or biased outputs. Claude 3.5 Sonnet scores 88.8 MMLU with superior performance on nuanced judgment, careful instruction following, and long-form analytical writing. Red-teaming and adversarial testing ensure reliability in safety-critical applications.', color: '#5ed29c' },
              ].map((dc) => (
                <div key={dc.id} className="group relative">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${dc.color}40, transparent, ${dc.color}20)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] group-hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" style={{ background: `${dc.color}15`, color: dc.color }}>{dc.id}</div>
                      <div>
                        <p className="text-white font-semibold text-sm transition-all duration-500 group-hover:text-white/90">{dc.name}</p>
                        <p className="text-[10px] text-white/30 transition-all duration-500 group-hover:text-white/40">{dc.tags}</p>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed transition-all duration-500 group-hover:text-white/55">{dc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { value: 99, suffix: '%', label: 'Routing Reliability', sub: 'Automatic fallback ensures uptime', color: '#5ed29c' },
                { value: 90, suffix: '%', label: 'Cost Reduction', sub: 'vs single-provider approach', color: '#6366f1' },
                { value: 200, suffix: 'ms', label: 'Fastest Latency', sub: 'Groq-powered voice responses', color: '#f472b6' },
                { value: 4, suffix: 'M', label: 'Max Context Window', sub: 'MiniMax handles entire codebases', color: '#fbbf24' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-4 text-center">
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                    <CountUp to={stat.value} duration={2.5} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/60 text-xs font-medium mt-1">{stat.label}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Architecture Section */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">The Routing Engine</span>
                <span className="flex-1 h-[1px] bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="group relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-500 hover:scale-[1.02]">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] transition-all duration-500 group-hover:scale-150" />
                    Intelligent Provider Selection
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-all duration-500">The router evaluates user preference, query complexity, provider latency, token cost, and capability requirements in milliseconds. Persistent connections with automatic health checking and circuit breaker patterns prevent cascading failures. Each query is individually routed to the optimal provider based on real-time conditions.</p>
                </div>
                <div className="group relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-500 hover:scale-[1.02]">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] transition-all duration-500 group-hover:scale-150" />
                    Automatic Fallback Chains
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-all duration-500">Primary providers configured with backup chains that activate transparently during outages. Exponential backoff, jitter, and timeout management handle transient failures gracefully. The user experiences a continuous streaming response even as the backend seamlessly switches between providers with zero noticeable interruption.</p>
                </div>
                <div className="group relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-500 hover:scale-[1.02]">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] transition-all duration-500 group-hover:scale-150" />
                    Security & Data Minimization
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-all duration-500">Each provider receives only the information necessary for the current query. API keys are stored server-side in environment variables, never exposed to the browser. All communication occurs over TLS with request signing and audit logging. The entire backend can be self-hosted for strict data residency requirements.</p>
                </div>
                <div className="group relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-500 hover:scale-[1.02]">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] transition-all duration-500 group-hover:scale-150" />
                    Cost Optimization Engine
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-all duration-500">Simple queries are automatically routed to low-cost providers like Groq or Gemini Flash, reserving premium providers for complex reasoning tasks. This intelligent distribution reduces overall API costs by up to ninety percent. Token usage and cost accumulation are tracked across all providers with full visibility.</p>
                </div>
              </div>
            </div>

            {/* Why Multi-Model Block */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">Why Multi-Model Architecture</span>
                <span className="flex-1 h-[1px] bg-white/10" />
              </div>
              <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: '01', title: 'Vendor Independence', desc: 'No single provider lock-in. Switch models instantly. Competitive pricing pressure keeps costs low. Access the latest innovations without migration overhead.', color: '#5ed29c' },
                { num: '02', title: 'Synthesized Capabilities', desc: 'The reasoning depth of GPT-4o, the speed of Groq, the multimodality of Gemini, the coding of DeepSeek, the context of MiniMax, and the safety of Claude — all in one interface.', color: '#6366f1' },
                { num: '03', title: 'Future-Proof Architecture', desc: 'Standardized adapter pattern means adding new providers takes hours, not weeks. Local LLM support and ensemble routing are on the roadmap without architectural changes.', color: '#f472b6' },
              ].map((item) => (
                <div key={item.num} className="group text-center md:text-left">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" style={{ background: `${item.color}15` }}>
                    <span className="text-sm transition-all duration-500" style={{ color: item.color }}>{item.num}</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-2 transition-all duration-500 group-hover:text-white/90">{item.title}</p>
                  <p className="text-white/35 text-xs leading-relaxed transition-all duration-500 group-hover:text-white/50">{item.desc}</p>
                </div>
              ))}
                </div>
              </div>
            </div>

            {/* Closing Quote */}
            <div className="relative text-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-bold text-white/[0.02] select-none pointer-events-none leading-none">"</div>
              <p className="text-base md:text-lg text-white/60 font-light italic max-w-3xl mx-auto leading-relaxed">
                The true power of NexusAI lies not in any single provider or model, but in the orchestration layer that intelligently routes each query to the optimal destination — a synthesis of capabilities that no single model can match.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-white/20 font-mono">
                <span>ARCHITECTURAL DIVERSITY</span>
                <span className="w-4 h-[1px] bg-white/10" />
                <span>OPERATIONAL RESILIENCE</span>
                <span className="w-4 h-[1px] bg-white/10" />
                <span>INTELLIGENT ORCHESTRATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* LogoLoop */}
        <div className="mb-6">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
            <p className="text-center text-xs text-white/20 mb-6 uppercase tracking-[0.2em] font-medium">
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

        {/* Performance Benchmarks */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-4 py-1.5 mb-3 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                <ShinyText text="Performance Data" speed={3} shineColor="#14b8a6" className="text-xs text-white/50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                <GradientText colors={['#14b8a6', '#5ed29c', '#6366f1', '#14b8a6']} animationSpeed={6} direction="horizontal">
                  Model Performance Benchmarks
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Standard benchmark scores across all integrated providers.</p>
            </ScrollFloat>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 text-white font-semibold text-xs uppercase tracking-wider">Model</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">Provider</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">Latency</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">MMLU</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">HumanEval</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">GSM8K</th>
                  <th className="py-3 pr-4 text-white/60 font-semibold text-xs uppercase tracking-wider">Cost / 1K</th>
                  <th className="py-3 text-white/60 font-semibold text-xs uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b) => (
                  <tr key={b.model} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <td className="py-2.5 pr-4 text-white font-medium text-xs whitespace-nowrap">{b.model}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: `${b.color}15`, color: b.color }}>
                        {b.provider}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-white/60 text-xs whitespace-nowrap">{b.latency}</td>
                    <td className="py-2.5 pr-4 text-white/60 text-xs">{b.mmlu}</td>
                    <td className="py-2.5 pr-4 text-white/60 text-xs">{b.humaneval}</td>
                    <td className="py-2.5 pr-4 text-white/60 text-xs">{b.gsm8k}</td>
                    <td className="py-2.5 pr-4 text-white/60 text-xs whitespace-nowrap">{b.costPer1k}</td>
                    <td className="py-2.5 text-white/35 text-[11px] max-w-[200px] leading-snug">{b.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-white/25 justify-center">
            <span>MMLU: Knowledge reasoning</span>
            <span className="text-white/10">|</span>
            <span>HumanEval: Code generation</span>
            <span className="text-white/10">|</span>
            <span>GSM8K: Math problem solving</span>
            <span className="text-white/10">|</span>
            <span>Latency measured as avg time to first token</span>
          </div>
        </div>

        {/* Technology Partners */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                <ShinyText text="Infrastructure" speed={3} shineColor="#a855f7" className="text-xs text-white/50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                <GradientText colors={['#a855f7', '#ec4899', '#14b8a6', '#a855f7']} animationSpeed={6} direction="horizontal">
                  Technology Partners
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">The infrastructure stack that powers NexusAI behind the scenes.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {techPartners.map((tp) => {
              const TpIcon = tp.icon
              return (
                <ScrollFloat key={tp.name} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
                  <div className="group relative h-full">
                    <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" style={{ background: `linear-gradient(135deg, ${tp.color}20, transparent, ${tp.color}10)` }} />
                    <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.1] transition-all duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${tp.color}12` }}>
                          <TpIcon size={20} style={{ color: tp.color }} />
                        </div>
                        <h3 className="text-white font-semibold text-sm">{tp.name}</h3>
                      </div>
                      <p className="text-white/35 text-xs leading-relaxed">{tp.desc}</p>
                    </div>
                  </div>
                </ScrollFloat>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                <ShinyText text="Common Questions" speed={3} shineColor="#fbbf24" className="text-xs text-white/50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                <GradientText colors={['#fbbf24', '#f472b6', '#5ed29c', '#fbbf24']} animationSpeed={6} direction="horizontal">
                  Provider Integration FAQ
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Answers to the most common questions about our multi-model setup.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {[
              { q: 'How does the router decide which model to use?', a: 'The LLM router evaluates task complexity, the active model selector preference, and provider availability. If your preferred model is down, it automatically falls back to the next best option without any interruption.', color: '#5ed29c' },
              { q: 'Can I use multiple providers in one conversation?', a: 'Yes! You can switch between providers mid-conversation using the model selector dropdown. Each message can use a different model, and the full conversation context is preserved across switches.', color: '#6366f1' },
              { q: 'Do I need API keys for every provider?', a: 'No. NexusAI works with just one provider. You can start with a single API key (e.g., Groq free tier) and add more later. The router only activates providers you have configured.', color: '#f472b6' },
              { q: 'Which provider is best for voice conversations?', a: 'Groq (Llama 3.3) offers the lowest latency at ~200ms, making it ideal for real-time voice. For complex reasoning tasks, GPT-4o provides the highest accuracy at ~1.2s.', color: '#fbbf24' },
              { q: 'How do you ensure data privacy across providers?', a: 'All API calls are routed through your own backend. Your API keys stay server-side, never exposed to the browser. Providers receive only the current message context, not your full history.', color: '#a855f7' },
              { q: 'Can I add custom models or providers?', a: 'Yes. The tool registry and LLM router are extensible. Add a new provider by implementing the provider interface in the backend — no frontend changes needed.', color: '#14b8a6' },
            ].map((faq) => (
              <ScrollFloat key={faq.q} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" style={{ background: `linear-gradient(135deg, ${faq.color}15, transparent, ${faq.color}8)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.1] transition-all duration-500">
                    <div className="flex items-start gap-3">
                      <FaQuestionCircle size={14} style={{ color: faq.color }} className="mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{faq.q}</h3>
                        <p className="text-white/35 text-xs leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollFloat>
            ))}
          </div>
        </div>

        {/* How Integration Works */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                <ShinyText text="Behind the Router" speed={3} shineColor="#6366f1" className="text-xs text-white/50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                <GradientText colors={['#5ed29c', '#6366f1', '#f472b6', '#5ed29c']} animationSpeed={6} direction="horizontal">
                  How Model Integration Works
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">Every provider plugs into the same smart routing layer.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
              className="text-2xl md:text-3xl font-display font-bold text-white mb-2"
              delay={80}
              animateBy="words"
              direction="top"
              threshold={0.2}
            />
            <p className="text-sm text-white/40 mb-6 max-w-sm mx-auto">
              Switch between AI models mid-conversation and see which one works best.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
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
