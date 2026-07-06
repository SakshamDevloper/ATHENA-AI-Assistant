import { useRef } from 'react'
import { FaRocket, FaBrain, FaBolt, FaShieldAlt, FaMicrochip, FaCogs, FaDatabase, FaCloud, FaLock, FaPalette, FaRobot, FaSearch, FaCode, FaCloudSun, FaHistory, FaExchangeAlt, FaHeadphones, FaGlobe, FaFileAlt, FaLayerGroup, FaChartBar, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaServer, FaMobileAlt, FaStar } from 'react-icons/fa'
import { SiOpenai, SiGithub, SiReact, SiTailwindcss, SiMongodb, SiRedis, SiFirebase, SiSocketdotio, SiVite } from 'react-icons/si'
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
  {
    icon: FaLock, title: 'Secure Authentication', color: '#ec4899',
    desc: 'Safe and reliable user sessions powered by Firebase Auth, securing your workspace, preferences, and personal memory dashboard from unauthorized access.',
    subs: [
      { icon: SiGithub, label: 'Google OAuth', text: 'One-click sign-in using your Google Account for instant, passwordless entry' },
      { icon: FaLock, label: 'Email / Password', text: 'Traditional signup and login with secure credential hashing and verification' },
      { icon: FaShieldAlt, label: 'Token-Based Auth', text: 'Stateful sessions validated via Firebase ID tokens verified on the backend' },
      { icon: FaHistory, label: 'Protected Routes', text: 'Restricts workspace pages, memory viewer, and conversation history to active users' },
    ]
  },
  {
    icon: FaCode, title: 'Markdown & Rich Rendering', color: '#3b82f6',
    desc: 'Enjoy clean, beautiful formatting of complex response payloads. Whether writing scripts, analyzing data tables, or reading code, it displays flawlessly.',
    subs: [
      { icon: FaCode, label: 'Syntax Highlighting', text: 'Rich visual styling for over 190+ programming languages powered by highlight.js' },
      { icon: FaBolt, label: 'One-Click Copy', text: 'Quickly copy code snippets directly to your clipboard with inline copy indicators' },
      { icon: FaDatabase, label: 'Structured Tables', text: 'Beautifully parsed markdown tables, bulleted lists, and heading hierarchies' },
      { icon: FaPalette, label: 'Vibrant Layouts', text: 'Glassmorphic panel containers and clean, readable typography designed for focus' },
    ]
  },
  {
    icon: FaGlobe, title: 'Multi-Language Support', color: '#a855f7',
    desc: 'Communicate in your preferred language. NexusAI understands and responds in multiple languages with native-level fluency across all supported AI models.',
    subs: [
      { icon: FaGlobe, label: '40+ Languages', text: 'Supports English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, and 30+ more' },
      { icon: FaRobot, label: 'Automatic Detection', text: 'Language auto-detection routes your input to the right linguistic model without manual selection' },
      { icon: FaExchangeAlt, label: 'Mixed-Language', text: 'Seamless handling of code-switching and mixed-language conversations within a single session' },
      { icon: FaHeadphones, label: 'Multi-Lingual TTS', text: 'Text-to-speech output supports multiple languages with natural intonation and pronunciation' },
    ]
  },
  {
    icon: FaFileAlt, title: 'File & Media Analysis', color: '#eab308',
    desc: 'Upload and analyze documents, images, and code files. Extract insights, generate summaries, and ask questions about your content in real time.',
    subs: [
      { icon: FaFileAlt, label: 'Document Parsing', text: 'Extract and analyze text from PDFs, DOCX, TXT, and code files with structured output' },
      { icon: FaRobot, label: 'Image Understanding', text: 'Vision-capable models analyze uploaded images, diagrams, screenshots, and photographs' },
      { icon: FaCode, label: 'Code Review', text: 'Upload source files for AI-powered code review, bug detection, and optimization suggestions' },
      { icon: FaCloud, label: 'Cloud Storage', text: 'Files stored securely via Cloudinary with shareable links and persistent access across sessions' },
    ]
  },
  {
    icon: FaLayerGroup, title: 'Workspace Organization', color: '#14b8a6',
    desc: 'Keep your AI workspace tidy. Multiple conversation threads, categorized memories, and searchable history make information retrieval effortless.',
    subs: [
      { icon: FaHistory, label: 'Session Grouping', text: 'Organize conversations into named sessions with tags, timestamps, and quick-resume capability' },
      { icon: FaSearch, label: 'Full-Text Search', text: 'Search across all past conversations, memories, and saved responses with instant results' },
      { icon: FaStar, label: 'Favorites & Bookmarks', text: 'Star important messages and bookmark critical responses for quick reference later' },
      { icon: FaDatabase, label: 'Export & Backup', text: 'Export conversation histories as JSON or markdown for offline backup and sharing' },
    ]
  },
]

const stats = [
  { value: 9, suffix: '+', label: 'AI Models Integrated', color: '#5ed29c' },
  { value: 6, suffix: '+', label: 'Agentic Tools', color: '#6366f1' },
  { value: 99, suffix: '%', label: 'Uptime Reliability', color: '#f472b6' },
  { value: 200, suffix: 'ms', label: 'Avg Response Start', color: '#fbbf24' },
  { value: 40, suffix: '+', label: 'Supported Languages', color: '#a855f7' },
  { value: 500, suffix: 'K', label: 'Tokens Processed Daily', color: '#14b8a6' },
  { value: 4, suffix: 'M', label: 'Max Context Tokens', color: '#ec4899' },
  { value: 190, suffix: '+', label: 'Syntax Highlighted Languages', color: '#3b82f6' },
]

const extras = [
  { icon: FaCloud, title: 'Real-Time Streaming', desc: 'Token-by-token response streaming via Socket.IO so you see results instantly, not after full generation.', color: '#5ed29c' },
  { icon: FaHeadphones, title: 'Multi-Platform', desc: 'Fully responsive across desktop, tablet, and mobile with adaptive layouts and touch-friendly controls.', color: '#6366f1' },
  { icon: FaLock, title: 'Privacy First', desc: 'End-to-end encrypted conversations. Your data is never used for training. Open-source code for full transparency.', color: '#f472b6' },
  { icon: FaPalette, title: 'Fully Customizable', desc: 'Dark/light theme, model selection, UI preferences, voice settings — tailor every aspect to your workflow.', color: '#fbbf24' },
  { icon: SiGithub, title: 'Open Source', desc: 'Built in the open with a permissive license. Self-host, audit, extend, or contribute to the project.', color: '#5ed29c' },
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12">
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

        {/* Deep Description */}
        <div className="mb-6">
          <div className="max-w-5xl mx-auto">
            {/* Hero Quote Block */}
            <div className="relative mb-6">
              <div className="absolute -top-6 -left-4 text-6xl md:text-8xl font-bold text-white/[0.02] select-none pointer-events-none leading-none">"</div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed tracking-wide">
                  NexusAI represents a paradigm shift in the design and architecture of conversational artificial intelligence assistants. Built as a comprehensive AI operating system, it integrates voice processing, multi-model orchestration, tool execution, persistent memory, and secure authentication into a unified, cohesive experience.
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <p className="text-xs text-white/30 font-mono">AN AI OPERATING SYSTEM — GREATER THAN THE SUM OF ITS PARTS</p>
                </div>
              </div>
            </div>

            {/* Feature Deep Dive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #5ed29c40, transparent, #5ed29c20)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#5ed29c15' }}>
                      <span className="text-xs" style={{ color: '#5ed29c' }}>01</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Voice-First Interaction</p>
                      <p className="text-[10px] text-white/30">Canvas VoiceOrb • Real-Time STT • Neural TTS</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">The VoiceOrb is a real-time canvas visualization with four distinct states: idle, listening, thinking, and speaking. Continuous speech recognition captures audio with interim results displayed on screen, while a configurable two-second silence threshold triggers automatic query submission. The speech synthesis pipeline begins playback the instant the first tokens arrive, eliminating the latency penalty traditionally associated with text-to-speech conversion. Parallel streaming architecture enables voice responses that begin almost immediately after the user finishes speaking.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #6366f140, transparent, #6366f120)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#6366f115' }}>
                      <span className="text-xs" style={{ color: '#6366f1' }}>02</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Multi-Model AI Routing</p>
                      <p className="text-[10px] text-white/30">5 Providers • Intelligent Selection • Auto Fallback</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">The LLM router maintains persistent connections to OpenAI, Groq, Google Gemini, DeepSeek, and MiniMax, each offering distinct capabilities optimized for different query types. Evaluation criteria include task complexity, latency requirements, cost sensitivity, and provider availability. The router evaluates and selects the optimal provider in milliseconds, with automatic fallback chains that activate transparently during outages. Users experience seamless conversations spanning multiple providers without noticeable transitions.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #f472b640, transparent, #f472b620)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f472b615' }}>
                      <span className="text-xs" style={{ color: '#f472b6' }}>03</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Agentic Tool Execution</p>
                      <p className="text-[10px] text-white/30">Web Search • Weather • Wikipedia • Extensible</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">When the language model detects a need for external data, it emits a structured tool call intercepted by the tool executor. The executor runs the requested tool — web search via Tavily, weather via OpenWeatherMap, or Wikipedia summaries — captures the result, and feeds it back into the model's context. This enables complex multi-step workflows within a single conversational turn. The standardized tool interface means any developer can add new tools without modifying the core platform.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #fbbf2440, transparent, #fbbf2420)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fbbf2415' }}>
                      <span className="text-xs" style={{ color: '#fbbf24' }}>04</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Persistent Memory System</p>
                      <p className="text-[10px] text-white/30">Redis Cache • MongoDB Storage • Cross-Session Recall</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">Short-term session context stored in Redis for fast access during active conversations. Long-term memory persisted in MongoDB for cross-session recall. The system captures conversation history, user preferences, model selection patterns, theme choices, and interaction behaviors. On return, relevant context loads automatically so the assistant picks up where you left off. The memory panel provides full visibility with the ability to view, search, and delete individual memories.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #ec489940, transparent, #ec489920)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ec489915' }}>
                      <span className="text-xs" style={{ color: '#ec4899' }}>05</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Secure Authentication</p>
                      <p className="text-[10px] text-white/30">Firebase Auth • Google OAuth • Protected Routes</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">Built on Firebase Auth with Google OAuth for one-click access and email/password authentication. Firebase ID tokens verified on the backend for every API call ensure only authenticated users access protected resources. Auth state persists across page loads via React context. Protected routes secure the assistant workspace, memory viewer, and conversation history, while landing and feature pages remain publicly accessible for exploration.</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: 'linear-gradient(135deg, #3b82f640, transparent, #3b82f620)' }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 h-full group-hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3b82f615' }}>
                      <span className="text-xs" style={{ color: '#3b82f6' }}>06</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Markdown & Rich Rendering</p>
                      <p className="text-[10px] text-white/30">Syntax Highlighting • Code Copy • Structured Tables</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">react-markdown parses AI response text into beautifully formatted content. highlight.js provides syntax highlighting across 190+ programming languages. Code blocks include one-click copy buttons. The system handles very long code blocks with horizontal scrolling, deeply nested lists, tables with irregular column counts, and mixed content types. Glassmorphic panel containers and carefully chosen typography emphasize readability without sacrificing the futuristic aesthetic.</p>
                </div>
              </div>
            </div>

            {/* Streaming & Architecture Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { value: null, text: 'Instant', label: 'First Token', sub: 'Streaming via Socket.IO', color: '#5ed29c' },
                { value: 190, suffix: '+', label: 'Highlight Languages', sub: 'Powered by highlight.js', color: '#6366f1' },
                { value: 1, suffix: 'M', label: 'Max Context Tokens', sub: 'Gemini-powered analysis', color: '#f472b6' },
                { value: 100, suffix: '%', label: 'Open Source', sub: 'MIT License, fully auditable', color: '#fbbf24' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-4 text-center">
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value !== null ? <CountUp to={stat.value} duration={2.5} suffix={stat.suffix} /> : stat.text}
                  </p>
                  <p className="text-white/60 text-xs font-medium mt-1">{stat.label}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Architecture & Philosophy */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">The Platform Foundation</span>
                <span className="flex-1 h-[1px] bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c]" />
                    Real-Time Streaming Architecture
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">Tokens stream from the language model to the browser in real time via Socket.IO, rendering each token as it arrives. The first tokens appear within milliseconds of query submission, and the response grows incrementally on screen. For voice conversations, the text-to-speech engine begins speaking while the model continues generating, dramatically reducing perceived latency. This eliminates the blank staring period that plagues non-streaming AI interfaces.</p>
                </div>
                <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                    Responsive & Adaptive Design
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">The layout adapts dynamically across devices. The sidebar collapses into a bottom navigation bar on small screens. Touch interactions are optimized with swipe gestures, finger-sized tap targets, and virtual keyboard handling. The dark theme reduces eye strain during extended use, with carefully selected color contrasts that meet WCAG accessibility standards while maintaining the futuristic NexusAI brand identity.</p>
                </div>
                <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
                    Performance Optimization
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">React virtualization and memoization minimize re-renders and DOM manipulations for smooth scrolling with long conversation histories. Socket.IO connections use automatic reconnection, heartbeat monitoring, and backpressure handling. Backend connection pooling, request caching, and asynchronous processing handle multiple concurrent users. Database operations use indexed queries and batch operations for minimal latency.</p>
                </div>
                <div className="rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6">
                  <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    Open Source & Community Driven
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">The entire codebase is available under the MIT license for audit, modification, and extension. Feature requests and bug reports are managed through GitHub Issues. Pull requests are reviewed and merged regularly with contribution guidelines ensuring quality. The community has already contributed documentation, bug fixes, new features, and provider integrations, demonstrating the power of open-source collaboration.</p>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="relative mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">What's Next</span>
                <span className="flex-1 h-[1px] bg-white/10" />
              </div>
              <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center md:text-left">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3" style={{ background: '#5ed29c15' }}>
                      <span className="text-sm" style={{ color: '#5ed29c' }}>01</span>
                    </div>
                    <p className="text-white font-semibold text-sm mb-2">File Upload & Analysis</p>
                    <p className="text-white/35 text-xs leading-relaxed">Upload images, PDFs, and documents for AI-powered analysis, extraction, and summarization. Leverages multimodal capabilities of supported providers for document understanding and visual reasoning.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3" style={{ background: '#6366f115' }}>
                      <span className="text-sm" style={{ color: '#6366f1' }}>02</span>
                    </div>
                    <p className="text-white font-semibold text-sm mb-2">Custom Tools & Extensions</p>
                    <p className="text-white/35 text-xs leading-relaxed">Visual interface for defining new tools without programming knowledge. Chrome extension for browser-wide AI assistance. Mobile apps for iOS and Android with push notifications and offline support.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3" style={{ background: '#f472b615' }}>
                      <span className="text-sm" style={{ color: '#f472b6' }}>03</span>
                    </div>
                    <p className="text-white font-semibold text-sm mb-2">Local LLM & Admin Dashboard</p>
                    <p className="text-white/35 text-xs leading-relaxed">Fully offline operation through Ollama and LM Studio. Enterprise admin dashboard with usage statistics, API key management, system monitoring, and multi-user administration for organizational deployments.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Block */}
            <div className="relative text-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-bold text-white/[0.02] select-none pointer-events-none leading-none">"</div>
              <p className="text-base md:text-lg text-white/60 font-light italic max-w-3xl mx-auto leading-relaxed">
                NexusAI is not a platform that extracts value from its users through data collection or vendor lock-in. It is a tool that empowers its users by giving them access to the best AI capabilities available, with full transparency and complete control.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-white/20 font-mono">
                <span>ACCESSIBLE</span>
                <span className="w-4 h-[1px] bg-white/10" />
                <span>TRANSPARENT</span>
                <span className="w-4 h-[1px] bg-white/10" />
                <span>USER-CONTROLLED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="space-y-6 mb-6">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <ScrollFloat key={feat.title} animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
                <div className="group relative">
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${feat.color}40, transparent, ${feat.color}20)` }} />
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${feat.color}30, transparent, ${feat.color}15)` }} />
                  <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 group-hover:border-white/[0.12] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.04]">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat) => (
            <ScrollFloat key={stat.label} animationDuration={0.8} ease="back.inOut(2)" stagger={0.03}>
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent, ${stat.color}20)` }} />
                <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 text-center group-hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                    <CountUp to={stat.value} duration={2.5} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-6">
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
                  <div className="group relative flex items-start gap-4">
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
        <div className="mb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                <ShinyText text="Powered By" speed={3} shineColor="#14b8a6" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#14b8a6', '#a855f7', '#5ed29c', '#14b8a6']} animationSpeed={6} direction="horizontal">
                  Built on Modern Tech
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">The stack that powers every interaction.</p>
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: SiReact, label: 'React 18', sub: 'UI Framework', color: '#61dafb' },
              { icon: SiVite, label: 'Vite 5', sub: 'Build Tool', color: '#646cff' },
              { icon: SiTailwindcss, label: 'Tailwind CSS', sub: 'Styling', color: '#06b6d4' },
              { icon: FaCogs, label: 'Zustand', sub: 'State Management', color: '#f59e0b' },
              { icon: FaNodeJs, label: 'Node.js', sub: 'Runtime', color: '#339933' },
              { icon: SiSocketdotio, label: 'Socket.IO', sub: 'Real-Time', color: '#010101' },
              { icon: SiMongodb, label: 'MongoDB', sub: 'Database', color: '#47A248' },
              { icon: SiRedis, label: 'Redis', sub: 'Cache Layer', color: '#DC382D' },
              { icon: SiFirebase, label: 'Firebase', sub: 'Authentication', color: '#FFCA28' },
              { icon: FaPython, label: 'Python', sub: 'Scripting', color: '#3776AB' },
              { icon: FaDocker, label: 'Docker', sub: 'Containerization', color: '#2496ED' },
              { icon: FaGitAlt, label: 'Git', sub: 'Version Control', color: '#F05032' },
            ].map((tech) => {
              const TechIcon = tech.icon
              return (
                <ScrollFloat key={tech.label} animationDuration={0.6} ease="back.inOut(2)" stagger={0.02}>
                  <div className="group relative">
                    <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" style={{ background: `linear-gradient(135deg, ${tech.color}30, transparent, ${tech.color}15)` }} />
                    <div className="relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-5 text-center group-hover:border-white/[0.12] transition-all duration-500">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: `${tech.color}12` }}>
                        <TechIcon size={20} style={{ color: tech.color }} />
                      </div>
                      <p className="text-white font-semibold text-sm">{tech.label}</p>
                      <p className="text-white/30 text-[10px] mt-0.5">{tech.sub}</p>
                    </div>
                  </div>
                </ScrollFloat>
              )
            })}
          </div>
        </div>

        {/* Comparison */}
        <div className="mb-6">
          <div className="text-center mb-14">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" stagger={0.03}>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
                <ShinyText text="Why NexusAI" speed={3} shineColor="#ec4899" className="text-xs text-white/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                <GradientText colors={['#ec4899', '#a855f7', '#6366f1', '#ec4899']} animationSpeed={6} direction="horizontal">
                  NexusAI vs Alternatives
                </GradientText>
              </h2>
              <p className="text-white/30 max-w-xl mx-auto">See how we compare against other AI assistant platforms.</p>
            </ScrollFloat>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-4 pr-6 text-white font-semibold text-sm">Capability</th>
                  <th className="py-4 pr-6 text-accent font-semibold text-sm">NexusAI</th>
                  <th className="py-4 pr-6 text-white/40 font-semibold text-sm">ChatGPT</th>
                  <th className="py-4 pr-6 text-white/40 font-semibold text-sm">Claude</th>
                  <th className="py-4 pr-6 text-white/40 font-semibold text-sm">Gemini</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Voice Input/Output', ours: 'Built-in STT/TTS', chatgpt: 'Paid addon', claude: 'None', gemini: 'App only' },
                  { feature: 'Model Choice', ours: '5+ providers', chatgpt: 'OpenAI only', claude: 'Anthropic only', gemini: 'Google only' },
                  { feature: 'Web Search', ours: 'Real-time via Tavily', chatgpt: 'Paid (Browse)', claude: 'None', gemini: 'Via extensions' },
                  { feature: 'Code Execution', ours: 'Sandboxed runtime', chatgpt: 'Limited', claude: 'Limited', gemini: 'Limited' },
                  { feature: 'Memory Persistence', ours: 'MongoDB + Redis', chatgpt: 'Conversation only', claude: 'Conversation only', gemini: 'Conversation only' },
                  { feature: 'Open Source', ours: 'Fully open', chatgpt: 'Proprietary', claude: 'Proprietary', gemini: 'Proprietary' },
                  { feature: 'Offline Mode', ours: 'Works without API', chatgpt: 'Online only', claude: 'Online only', gemini: 'Online only' },
                  { feature: 'Cost', ours: 'Your API keys', chatgpt: '$20/mo + usage', claude: '$20/mo + usage', gemini: 'Free tier limited' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                    <td className="py-3.5 pr-6 text-white/60 text-sm">{row.feature}</td>
                    <td className="py-3.5 pr-6 text-accent text-sm font-medium">{row.ours}</td>
                    <td className="py-3.5 pr-6 text-white/30 text-sm">{row.chatgpt}</td>
                    <td className="py-3.5 pr-6 text-white/30 text-sm">{row.claude}</td>
                    <td className="py-3.5 pr-6 text-white/30 text-sm">{row.gemini}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p className="text-sm text-white/40 mb-6 max-w-sm mx-auto">
              Pick your mode — voice or chat. No signup required.
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
