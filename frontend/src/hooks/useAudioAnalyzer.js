import { useRef, useState, useCallback, useEffect } from 'react'

export function useAudioAnalyzer() {
  const [amplitude, setAmplitude] = useState(0)
  const [frequency, setFrequency] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const streamRef = useRef(null)
  const animRef = useRef(null)
  const smoothAmpRef = useRef(0)
  const activeRef = useRef(false)

  const start = useCallback(async () => {
    if (activeRef.current) return
    activeRef.current = true

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx

      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 128
      analyserRef.current = analyser

      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)
      setIsActive(true)

      const update = () => {
        if (!activeRef.current) return
        analyser.getByteFrequencyData(data)

        let sum = 0
        for (let i = 0; i < data.length; i++) sum += data[i]
        const rawAmp = sum / data.length / 255

        smoothAmpRef.current = smoothAmpRef.current * 0.96 + rawAmp * 0.04

        let fSum = 0, wSum = 0
        for (let i = 0; i < data.length; i++) {
          fSum += data[i] * i
          wSum += data[i]
        }
        const freq = wSum > 0 ? fSum / wSum / data.length : 0

        setAmplitude(smoothAmpRef.current)
        setFrequency(freq)
        animRef.current = requestAnimationFrame(update)
      }

      update()
    } catch (err) {
      console.error('Audio analyzer error:', err)
      activeRef.current = false
    }
  }, [])

  const stop = useCallback(() => {
    activeRef.current = false
    if (animRef.current) cancelAnimationFrame(animRef.current)
    if (audioCtxRef.current) audioCtxRef.current.close()
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    setIsActive(false)
    setAmplitude(0)
    setFrequency(0)
    smoothAmpRef.current = 0
  }, [])

  useEffect(() => () => stop(), [stop])

  return { amplitude, frequency, isActive, start, stop }
}
