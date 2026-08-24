import { useState, useEffect } from 'react'
import { Sparkles } from '../../icons'

export default function Suggestions({ messages, onSelect }) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!messages || messages.length < 2) {
      setSuggestions([])
      return
    }

    if (dismissed) return

    const lastMsg = messages[messages.length - 1]
    if (lastMsg?.role !== 'assistant' || lastMsg?.streaming) return

    const timer = setTimeout(() => {
      setLoading(true)
      fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(-6) }),
      })
        .then(r => r.json())
        .then(data => {
          setSuggestions(data.suggestions || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 1000)

    return () => clearTimeout(timer)
  }, [messages, dismissed])

  if (suggestions.length === 0 && !loading) return null
  if (dismissed) return null

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={10} className="text-accent/60" />
        <span className="text-[10px] text-white/20 font-mono">Suggested next steps</span>
        <button
          onClick={() => setDismissed(true)}
          className="ml-auto text-[9px] text-white/15 hover:text-white/40 transition-colors"
        >
          Dismiss
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-28 rounded-lg bg-white/[0.03] border border-white/[0.04] shimmer"
            />
          ))
        ) : (
          suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => { onSelect?.(s); setDismissed(true) }}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-accent/20 transition-all text-left"
            >
              <span className="text-[10px] text-white/30 group-hover:text-accent/60 transition-colors">→</span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors leading-tight">{s}</span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
