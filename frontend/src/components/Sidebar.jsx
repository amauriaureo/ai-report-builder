import { useDraggable } from '@dnd-kit/core'
import { BLOCK_PALETTE } from '../constants/blocks'
import { useUiStore } from '../store/uiStore'

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
      <div className="min-w-0">
        <p className="font-medium text-slate-100">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  )
}

function SidebarToggle() {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      title="Collapse blocks panel"
      aria-label="Collapse blocks panel"
      aria-expanded={true}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-600 text-slate-300 transition-colors hover:border-indigo-500 hover:bg-slate-800 hover:text-white"
    >
      <span className="text-base font-semibold leading-none" aria-hidden="true">
        &lt;
      </span>
    </button>
  )
}

export default function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)

  return (
    <aside
      className={`flex shrink-0 flex-col border-r border-slate-700 bg-slate-900 transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-12' : 'w-64'
      }`}
    >
      {collapsed ? (
        <div className="flex h-full flex-col items-center py-3">
          <button
            type="button"
            onClick={toggleSidebar}
            title="Expand blocks panel"
            aria-label="Expand blocks panel"
            aria-expanded={false}
            className="flex flex-col items-center gap-3 rounded-md p-1 text-slate-300 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-600 text-base font-semibold hover:border-indigo-500 hover:bg-slate-800">
              &gt;
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest text-slate-500"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Blocks
            </span>
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col overflow-hidden p-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-white">Blocks</h2>
            <SidebarToggle />
          </div>

          <p className="mb-4 text-xs text-slate-400">Drag onto the canvas</p>

          <div className="flex flex-col gap-2 overflow-y-auto">
            {BLOCK_PALETTE.map((block) => (
              <DraggableBlock key={block.type} {...block} />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
