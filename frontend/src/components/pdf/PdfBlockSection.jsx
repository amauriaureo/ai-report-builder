import { BLOCK_TYPE_LABELS } from '../../constants/blocks'
import { PDF_BORDER_COLORS, PDF_THEME } from '../../constants/pdfTheme'
import KpiCard from '../blocks/KpiCard'

const TITLE_COLORS = {
  summary: PDF_THEME.text,
  kpi: PDF_THEME.text,
  insight: PDF_THEME.amber,
  recommendation: PDF_THEME.purple,
}

export default function PdfBlockSection({ block }) {
  const { result, type } = block
  if (!result) return null

  return (
    <article
      style={{
        marginBottom: 24,
        borderRadius: 12,
        borderLeft: `4px solid ${PDF_BORDER_COLORS[type]}`,
        backgroundColor: PDF_THEME.cardBg,
        padding: 20,
      }}
    >
      <p
        style={{
          margin: '0 0 8px',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: PDF_THEME.textMuted,
        }}
      >
        {BLOCK_TYPE_LABELS[type]}
      </p>
      <h2
        style={{
          margin: '0 0 12px',
          fontSize: 18,
          fontWeight: 600,
          color: TITLE_COLORS[type],
        }}
      >
        {result.title}
      </h2>

      {type === 'kpi' && result.kpi_data && (
        <KpiCard kpi={result.kpi_data} forPdf />
      )}

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.6,
          color: PDF_THEME.textMuted,
        }}
      >
        {result.content}
      </p>
    </article>
  )
}
