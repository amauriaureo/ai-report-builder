import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SummaryBlock from './blocks/SummaryBlock'
import KpiBlock from './blocks/KpiBlock'
import InsightBlock from './blocks/InsightBlock'
import RecommendationBlock from './blocks/RecommendationBlock'

const BLOCK_MAP = {
  summary: SummaryBlock,
  kpi: KpiBlock,
  insight: InsightBlock,
  recommendation: RecommendationBlock,
}

export default function Block({ block }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const Component = BLOCK_MAP[block.type]

  return (
    <div ref={setNodeRef} style={style}>
      <Component block={block} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}
