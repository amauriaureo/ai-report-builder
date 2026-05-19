import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useCanvasStore } from '../store/canvasStore'
import Block from './Block'
import ExportPdfButton from './ExportPdfButton'

function CanvasDropZone({ children }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-full flex-1 overflow-y-auto p-6 transition-colors ${
        isOver ? 'bg-indigo-950/30' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default function Canvas() {
  const { blocks } = useCanvasStore()

  return (
    <CanvasDropZone>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Report</h1>
          <ExportPdfButton />
        </div>

        {blocks.length === 0 && (
          <div className="flex min-h-64 items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50">
            <p className="text-slate-400">Drag blocks from the sidebar to get started</p>
          </div>
        )}

        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {blocks.map((block) => (
              <Block key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </div>
    </CanvasDropZone>
  )
}
