import BlockShell from './BlockShell'

export default function SummaryBlock({ block, dragHandleProps }) {
  const { result, status } = block

  return (
    <BlockShell block={block} dragHandleProps={dragHandleProps}>
      {status === 'done' && result && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">{result.title}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{result.content}</p>
        </div>
      )}
    </BlockShell>
  )
}
