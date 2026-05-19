import BlockShell from './BlockShell'
import KpiCard from './KpiCard'

export default function KpiBlock({ block, dragHandleProps }) {
  const { result, status } = block

  return (
    <BlockShell block={block} dragHandleProps={dragHandleProps}>
      {status === 'done' && result && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">{result.title}</h3>
          <KpiCard kpi={result.kpi_data} className="mb-3" />
          <p className="text-sm leading-relaxed text-slate-300">{result.content}</p>
        </div>
      )}
    </BlockShell>
  )
}
