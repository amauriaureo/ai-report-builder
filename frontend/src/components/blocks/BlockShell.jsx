import { BLOCK_TYPE_LABELS } from '../../constants/blocks'
import { useGenerateBlock } from '../../hooks/useGenerateBlock'
import { useCanvasStore } from '../../store/canvasStore'

const TYPE_COLORS = {
  summary: 'border-blue-500',
  kpi: 'border-emerald-500',
  insight: 'border-amber-500',
  recommendation: 'border-purple-500',
}

export default function BlockShell({ block, dragHandleProps, children }) {
  const { updateContext, removeBlock } = useCanvasStore()
  const { generate } = useGenerateBlock()

  return (
    <div
      className={`rounded-xl border-l-4 bg-slate-800 shadow-lg ${TYPE_COLORS[block.type]}`}
    >
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab text-slate-400 hover:text-slate-200 active:cursor-grabbing"
            aria-label="Drag block"
            {...dragHandleProps}
          >
            ⠿
          </button>
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            {BLOCK_TYPE_LABELS[block.type]}
          </span>
        </div>
        <button
          type="button"
          onClick={() => removeBlock(block.id)}
          className="text-slate-500 hover:text-red-400"
          aria-label="Remove block"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        <label className="mb-1 block text-xs text-slate-400">Context</label>
        <textarea
          value={block.context}
          onChange={(e) => updateContext(block.id, e.target.value)}
          placeholder="e.g. Q1 revenue grew 20% vs Q4..."
          rows={2}
          className="mb-3 w-full resize-none rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => generate(block)}
          disabled={block.status === 'loading' || !block.context.trim()}
          className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {block.status === 'loading' ? 'Generating...' : 'Generate with AI'}
        </button>

        {block.status === 'error' && (
          <p className="mb-3 rounded-lg bg-red-900/40 px-3 py-2 text-sm text-red-300">
            Failed to generate content. Check the API and try again.
          </p>
        )}

        {children}
      </div>
    </div>
  )
}
