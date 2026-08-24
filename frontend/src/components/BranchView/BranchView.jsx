import { useState, useEffect } from 'react'
import { Brain, ChevronRight } from '../../icons'

export default function BranchView({ sessionId, currentMessageId, onSwitchSession, onClose }) {
  const [tree, setTree] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/api/branches/tree/${sessionId}`)
      .then(r => r.json())
      .then(data => { setTree(data.tree); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sessionId])

  const createBranch = async () => {
    if (!currentMessageId) return
    try {
      const res = await fetch('/api/branches', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ parentSessionId: sessionId, parentMessageId: currentMessageId }),
      })
      const data = await res.json()
      if (data.session) {
        onSwitchSession?.(data.session.id)
      }
    } catch {}
  }

  function renderNode(node, depth = 0) {
    if (!node) return null
    const isActive = node.id === sessionId
    return (
      <div key={node.id} className="relative">
        <div className="flex items-center gap-2 py-1.5">
          {depth > 0 && (
            <div className="w-4 shrink-0 flex items-center justify-center">
              <div className="w-px h-full bg-white/[0.06] absolute top-0 left-2" />
              <ChevronRight size={8} className="text-white/20" />
            </div>
          )}
          <button
            onClick={() => onSwitchSession?.(node.id)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all flex-1 text-left ${
              isActive
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Brain size={12} className="shrink-0" />
            <span className="truncate">{node.title || 'Untitled'}</span>
            <span className="text-[9px] text-white/20 ml-auto">{node.messageCount} msgs</span>
          </button>
        </div>
        {node.children?.map(child => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 z-50 bg-surface-95 backdrop-blur-xl border-l border-border-color flex flex-col animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-color">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5ed29c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v12M18 9v12M6 3l12 6M6 15l12-6"/>
          </svg>
          <span className="text-sm font-semibold text-white/80">Conversation Tree</span>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white/60 text-sm px-2">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tree ? (
          <div className="space-y-1">
            {renderNode(tree)}
          </div>
        ) : (
          <p className="text-xs text-white/20 text-center py-8">Start a conversation to see branches</p>
        )}
      </div>

      {currentMessageId && (
        <div className="p-3 border-t border-border-color">
          <button
            onClick={createBranch}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <span className="text-lg leading-none text-accent">+</span>
            Branch from this message
          </button>
        </div>
      )}
    </div>
  )
}
