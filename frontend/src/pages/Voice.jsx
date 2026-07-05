import { useEffect, useRef, useState, useCallback } from 'react'
import VoiceStrands from '../components/VoiceOrb/VoiceStrands'
import SplitText from '../components/ReactBits/SplitText'
import StaggeredMenu from '../components/ReactBits/StaggeredMenu'
import { useWakeWord } from '../hooks/useWakeWord'
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer'
import { useSpeechSynthesis } from './useSpeechSynthesis'

export default function Voice() {
  const [voiceState, setVoiceState] = useState('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [responseText, setResponseText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activated, setActivated] = useState(false)

  const audio = useAudioAnalyzer()
  const synth = useSpeechSynthesis()

  const silenceTimerRef = useRef(null)
  const wokenTimeRef = useRef(null)

  const sendQuery = useCallback(async (text) => {
    const clean = text.replace(/\b(hi|hey)\s*nexus\b/gi, '').trim()
    if (!clean) return

    setIsProcessing(true)
    setStatusMsg('Thinking...')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          content: clean,
          model: 'llama-3.3',
          history: [],
        }),
      })

      const data = await res.json()
      const reply = data.fullContent || data.content || ''

      if (reply) {
        setResponseText(reply)
        setStatusMsg('')
        const prefVoice = synth.voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
        synth.speak(reply, { voice: prefVoice || synth.selectedVoice, rate: 1.05, pitch: 1.1 })
      }
      wokenTimeRef.current = Date.now()
    } catch {
      setResponseText('Sorry, something went wrong.')
      wokenTimeRef.current = Date.now()
    } finally {
      setIsProcessing(false)
    }
  }, [synth])

  const wake = useWakeWord({
    onWake: () => {
      wokenTimeRef.current = Date.now()
      setResponseText('')
      setVoiceState('listening')
      setStatusMsg('Listening...')
      audio.start().catch(() => {})
    },
    onSleep: () => {
      setVoiceState('idle')
      setStatusMsg('')
    }
  })

  const handleActivate = useCallback(() => {
    setActivated(true)
    setStatusMsg('Say "Hi Nexus"')
    wake.start()
  }, [wake])

  const handleStop = useCallback(() => {
    audio.stop()
    wake.stop()
    setVoiceState('idle')
    setStatusMsg('')
    setResponseText('')
    setActivated(false)
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
    silenceTimerRef.current = null
  }, [audio, wake])

  const handleToggle = useCallback(() => {
    if (voiceState !== 'idle') {
      handleStop()
    } else if (activated) {
      handleStop()
    } else {
      handleActivate()
    }
  }, [voiceState, activated, handleStop, handleActivate])

  const toggleRef = useRef(handleToggle)
  toggleRef.current = handleToggle

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault()
        toggleRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!audio.isActive || isProcessing) return
    if (audio.amplitude > 0.05) {
      setVoiceState('speaking')
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
    } else {
      setVoiceState('listening')
      if (wokenTimeRef.current && !silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          silenceTimerRef.current = null
          const transcript = wake.transcriptRef.current.trim()
          if (transcript) {
            sendQuery(transcript)
            wake.transcriptRef.current = ''
          }
        }, 2000)
      }
    }
  }, [audio.isActive, audio.amplitude, isProcessing, wake, sendQuery])

  useEffect(() => {
    if (!audio.isActive) {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current)
        silenceTimerRef.current = null
      }
    }
  }, [audio.isActive])

  useEffect(() => {
    return () => {
      audio.stop()
      wake.stop()
    }
  }, [])

  const active = voiceState !== 'idle'
  const hueShift = audio.frequency * 0.4
  const displayText = responseText || statusMsg

  if (!activated) {
    return (
      <div className="min-h-screen bg-bg-deep flex items-center justify-center overflow-hidden px-4 py-8 select-none">
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
        <div className="flex flex-col items-center gap-6">
          <VoiceStrands state="idle" />
          <button
            onClick={handleActivate}
            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-lg font-medium transition-all hover:scale-105"
          >
            Tap to Activate Voice
          </button>
          <p className="text-sm text-white/40">Grant microphone access when prompted</p>
        </div>
      </div>
    )
  }

  if (wake.isBlocked && !wake.isListening && !audio.isActive) {
    return (
      <div className="min-h-screen bg-bg-deep flex items-center justify-center overflow-hidden px-4 py-8 select-none">
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
        <div className="flex flex-col items-center gap-4">
          <VoiceStrands state="idle" />
          <p className="text-lg text-white/60">Microphone access denied</p>
          <p className="text-sm text-white/30">Allow mic access in your browser settings, then refresh</p>
          <button onClick={handleActivate} className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-sm transition-all">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center overflow-hidden px-4 py-8 select-none">
      <StaggeredMenu
        position="right"
        isFixed={true}
        items={[
          { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
          { label: 'Assistant', ariaLabel: 'Chat interface', link: '/assistant' },
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
        <div className="relative mx-auto flex flex-col items-center justify-center" onClick={active ? undefined : handleToggle}>
          <VoiceStrands
            state={voiceState}
            liveAmplitude={audio.amplitude}
            liveHueShift={hueShift}
          />

          <div className="mt-3 text-center max-w-2xl">
            <SplitText
              text={displayText}
              className={`text-2xl sm:text-3xl font-semibold ${responseText ? 'text-white/90' : 'text-white/80'}`}
              delay={30}
              duration={1.05}
              tag="h2"
            />
            {!wake.isListening && !active && !isProcessing && !responseText && (
              <button
                onClick={(e) => { e.stopPropagation(); handleActivate() }}
                className="mt-4 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-sm transition-all"
              >
                Reconnect Mic
              </button>
            )}
            {active && !responseText && !isProcessing && (
              <p className="mt-3 text-xs text-white/30">Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60 text-[11px] font-mono">Space</kbd> to stop</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
