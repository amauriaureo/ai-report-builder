import { useDraggable } from '@dnd-kit/core'

const BLOCK_TYPES = [
  { type: 'summary', label: 'Resumo', icon: '📋', description: 'Resumo executivo' },
  { type: 'kpi', label: 'KPI', icon: '📊', description: 'Indicador principal' },
  { type: 'insight', label: 'Insight', icon: '💡', description: 'Análise estratégica' },
  {
    type: 'recommendation',
    label: 'Recomendação',
    icon: '🎯',
    description: 'Ação sugerida',
  },
]

function DraggableBlock({ type, label, icon, description }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { fromSidebar: true, type },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex cursor-grab items-center gap-3 rounded-lg border border-slate-600 bg-slate-800 p-3 transition-colors hover:border-indigo-500 hover:bg-slate-700 active:cursor-grabbing ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-medium text-slate-100">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-700 bg-slate-900 p-4">
      <h2 className="mb-1 text-lg font-semibold text-white">Blocos</h2>
      <p className="mb-4 text-xs text-slate-400">Arraste para o canvas</p>
      <div className="flex flex-col gap-2">
        {BLOCK_TYPES.map((block) => (
          <DraggableBlock key={block.type} {...block} />
        ))}
      </div>
    </aside>
  )
}
