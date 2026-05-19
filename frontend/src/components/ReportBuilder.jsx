import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import Sidebar from './Sidebar'
import Canvas from './Canvas'

const PALETTE_LABELS = {
  summary: 'Resumo',
  kpi: 'KPI',
  insight: 'Insight',
  recommendation: 'Recomendação',
}

export default function ReportBuilder() {
  const { blocks, addBlock, reorderBlocks } = useCanvasStore()
  const [activeDrag, setActiveDrag] = useState(null)

  const handleDragStart = (event) => {
    const { active } = event
    if (active.data.current?.fromSidebar) {
      setActiveDrag(PALETTE_LABELS[active.data.current.type])
    } else {
      const block = blocks.find((b) => b.id === active.id)
      if (block) setActiveDrag(PALETTE_LABELS[block.type])
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveDrag(null)

    if (active.data.current?.fromSidebar) {
      if (over) {
        addBlock(active.data.current.type)
      }
      return
    }

    if (active.id !== over?.id && over) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(arrayMove(blocks, oldIndex, newIndex))
      }
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-slate-950">
          <Canvas />
        </main>
      </div>

      <DragOverlay>
        {activeDrag ? (
          <div className="rounded-lg border border-indigo-500 bg-slate-800 px-4 py-3 shadow-xl">
            <p className="font-medium text-white">{activeDrag}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
