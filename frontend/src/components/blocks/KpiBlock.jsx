import BlockShell from './BlockShell'

const TREND_ICONS = {
  up: '↑',
  down: '↓',
  neutral: '→',
}

const TREND_COLORS = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  neutral: 'text-slate-400',
}

export default function KpiBlock({ block, dragHandleProps }) {
  const { result, status } = block
  const kpi = result?.kpi_data

  return (
    <BlockShell block={block} dragHandleProps={dragHandleProps}>
      {status === 'done' && result && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">{result.title}</h3>
          {kpi && (
            <div className="mb-3 rounded-lg bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {kpi.label}
              </p>
              <div className="mt-1 flex items-end gap-3">
                <span className="text-3xl font-bold text-white">{kpi.value}</span>
                <span
                  className={`text-sm font-medium ${TREND_COLORS[kpi.trend] || TREND_COLORS.neutral}`}
                >
                  {TREND_ICONS[kpi.trend] || TREND_ICONS.neutral} {kpi.delta}
                </span>
              </div>
            </div>
          )}
          <p className="text-sm leading-relaxed text-slate-300">{result.content}</p>
        </div>
      )}
    </BlockShell>
  )
}
