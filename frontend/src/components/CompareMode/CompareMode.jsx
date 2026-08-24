import { useState } from 'react'
import { Bolt, Brain, Robot, Sparkles, Check } from '../../icons'

const modelConfig = {
  'gpt-4o-mini': { label: 'GPT-4o Mini', icon: Bolt, color: '#5ed29c' },
  'deepseek': { label: 'DeepSeek', icon: Brain, color: '#6366f1' },
  'llama-3.3': { label: 'Llama 3.3', icon: Robot, color: '#f472b6' },
  'gemini-flash': { label: 'Gemini Flash', icon: Sparkles, color: '#fbbf24' },
}

export function CompareToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
        enabled
          ? 'bg-accent/15 text-accent border border-accent/30'
          : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04] border border-transparent'
      }`}
      title={enabled ? 'Disable comparison mode' : 'Enable multi-model comparison'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5M8 3H3v5M12 20v-8M3 16l4 4 4-4M21 16l-4 4-4-4"/>
      </svg>
      Compare
    </button>
  )
}

export function ModelSelector({ selected, onChange }) {
  const modelIds = ['gpt-4o-mini', 'deepseek', 'llama-3.3', 'gemini-flash']
  return (
    <div className="flex flex-wrap gap-2">
      {modelIds.map(id => {
        const cfg = modelConfig[id]
        const Icon = cfg?.icon || Robot
        const isSelected = selected.includes(id)
        return (
          <button
            key={id}
            onClick={() => {
              if (selected.length <= 1 && isSelected) return
              onChange(isSelected ? selected.filter(s => s !== id) : [...selected, id])
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all border ${
              isSelected
                ? 'bg-white/[0.06] border-white/20 text-white/80'
                : 'bg-transparent border-white/[0.06] text-white/30 hover:text-white/50'
            }`}
          >
            <Icon size={12} className={isSelected ? '' : 'opacity-40'} />
            {cfg?.label || id}
            {isSelected && <Check size={10} className="text-accent" />}
          </button>
        )
      })}
    </div>
  )
}

export function CompareResults({ responses, consensus, onClose }) {
  const [activeTab, setActiveTab] = useState('consensus')
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!responses || responses.length === 0) return null

  const successful = responses.filter(r => r.content)
  const failed = responses.filter(r => r.error)

  return (
    <div className="border border-white/[0.08] rounded-2xl bg-white/[0.02] overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5ed29c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5M8 3H3v5M12 20v-8M3 16l4 4 4-4M21 16l-4 4-4-4"/>
          </svg>
          <span className="text-sm font-semibold text-white/80">Multi-Model Comparison</span>
          <span className="text-[10px] text-white/30 font-mono">
            {successful.length}/{responses.length} models responded
          </span>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white/60 text-sm px-2">✕</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] px-4">
        {consensus && (
          <button
            onClick={() => setActiveTab('consensus')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'consensus' ? 'text-accent border-accent' : 'text-white/30 border-transparent hover:text-white/60'
            }`}
          >
            Consensus
          </button>
        )}
        {successful.map(r => {
          const cfg = modelConfig[r.model]
          return (
            <button
              key={r.model}
              onClick={() => setActiveTab(r.model)}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === r.model ? 'text-white/80 border-white/30' : 'text-white/30 border-transparent hover:text-white/60'
              }`}
            >
              {cfg?.label || r.model}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        {activeTab === 'consensus' && consensus && (
          <div className="prose prose-sm prose-invert">
            <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-3">
              <p className="text-xs font-semibold text-accent mb-2">Synthesized Consensus</p>
              <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{consensus}</div>
            </div>
          </div>
        )}

        {activeTab !== 'consensus' && (
          <div>
            {successful.filter(r => r.model === activeTab).map(r => (
              <div key={r.model}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/30 font-mono">{r.model}</span>
                  <button
                    onClick={() => handleCopy(r.content, r.model)}
                    className="text-xs text-white/20 hover:text-accent transition-colors"
                  >
                    {copiedId === r.model ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="prose prose-sm prose-invert text-white/80 whitespace-pre-wrap text-sm leading-relaxed">
                  {r.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {failed.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <p className="text-[10px] text-white/20 mb-1">Failed models:</p>
            {failed.map(r => (
              <p key={r.model} className="text-[11px] text-red-400/60">{r.model}: {r.error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
