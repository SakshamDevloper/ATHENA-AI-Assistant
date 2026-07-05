import Strands from '../ReactBits/Strands'

export default function VoiceStrands({
  state = 'idle',
  liveAmplitude = 0,
  liveHueShift = 0
}) {
  const isAsleep = state === 'idle'

  const intensity = isAsleep ? 0.7 : 0.85
  const speed = isAsleep ? 0.6 : 0.7
  const glow = isAsleep ? 1.7 : 2.2
  const waveAmp = isAsleep ? 1.2 : 1.4

  const mod = 1 + (liveAmplitude - 0.1) * 0.15
  const steadyAmp = Math.max(0.6, Math.min(1.6, waveAmp * mod))

  return (
    <div className="w-[min(90vw,840px)] h-[min(60vh,500px)] relative">
      <Strands
        colors={['#5ed29c', '#22d3ee', '#6366f1', '#8B5CF6']}
        count={3}
        speed={speed}
        amplitude={steadyAmp}
        waviness={2.5}
        thickness={0.65}
        glow={glow}
        taper={5}
        spread={1.4}
        intensity={intensity}
        saturation={1.3}
        opacity={0.85}
        scale={1.5}
        hueShift={liveHueShift}
      />
    </div>
  )
}
