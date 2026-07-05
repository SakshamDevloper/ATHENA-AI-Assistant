import VoiceStrands from '../components/VoiceOrb/VoiceStrands'
import SplitText from '../components/ReactBits/SplitText'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'

export default function Voice() {
  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center overflow-hidden px-4 py-8">
      <StaggeredMenu
        position="right"
        isFixed={true}
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
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

      <div className="relative w-full max-w-[1080px]">
        <div className="relative mx-auto flex h-[min(78vh,720px)] w-full items-center justify-center overflow-hidden">
          <VoiceStrands state="listening" />
        </div>

        <div className="mt-8 text-center">
          <SplitText text="Listening..." className="text-3xl sm:text-4xl font-semibold text-white/90" delay={30} duration={1.05} />
          <p className="mt-3 text-sm text-white/50">Speak naturally to NexusAI and watch the live voice animation respond in real time.</p>
        </div>
      </div>
    </div>
  )
}
