import { useState, useEffect, useRef, useCallback } from 'react'

export function useWakeWord({ onWake, onSleep } = {}) {
  const [isListening, setIsListening] = useState(false)
  const [wakeDetected, setWakeDetected] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const recogRef = useRef(null)
  const onWakeRef = useRef(onWake)
  const onSleepRef = useRef(onSleep)
  const wokenRef = useRef(false)
  const transcriptRef = useRef('')

  useEffect(() => {
    onWakeRef.current = onWake
    onSleepRef.current = onSleep
  }, [onWake, onSleep])

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    setIsBlocked(false)

    const r = new SR()
    r.lang = 'en-US'
    r.continuous = true
    r.interimResults = true

    r.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript.toLowerCase().trim()
        if (event.results[i].isFinal) {
          transcriptRef.current += ' ' + text
          if (!wokenRef.current && (text.includes('hi nexus') || text.includes('hey nexus'))) {
            wokenRef.current = true
            setWakeDetected(true)
            onWakeRef.current?.()
          }
        }
      }
    }

    r.onend = () => setIsListening(false)
    r.onerror = (e) => {
      if (e.error === 'not-allowed') setIsBlocked(true)
    }

    try {
      r.start()
      setIsListening(true)
    } catch {
      setIsBlocked(true)
    }

    recogRef.current = r
  }, [])

  const stop = useCallback(() => {
    wokenRef.current = false
    if (recogRef.current) recogRef.current.stop()
    setIsListening(false)
    setWakeDetected(false)
    transcriptRef.current = ''
  }, [])

  useEffect(() => {
    return () => {
      if (recogRef.current) recogRef.current.stop()
    }
  }, [])

  return { isListening, wakeDetected, isBlocked, transcriptRef, start, stop }
}
