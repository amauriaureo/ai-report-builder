import { PDF_EXPORT_WIDTH_PX } from '../../constants/pdfExport'
import { PDF_THEME } from '../../constants/pdfTheme'
import { useCanvasStore } from '../../store/canvasStore'
import { hasGeneratedContent } from '../../utils/exportPdf'
import PdfBlockSection from './PdfBlockSection'

export default function ReportPdfDocument() {
  const blocks = useCanvasStore((s) => s.blocks)
  const generated = blocks.filter((b) => b.status === 'done' && b.result)

  if (!hasGeneratedContent(blocks)) return null

  return (
    <div
      id="pdf-export-root"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: PDF_EXPORT_WIDTH_PX,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'visible',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          width: PDF_EXPORT_WIDTH_PX,
          padding: '40px',
          backgroundColor: PDF_THEME.pageBg,
          color: PDF_THEME.text,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <header
          style={{
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: `1px solid ${PDF_THEME.border}`,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: PDF_THEME.text,
            }}
          >
            Analytics Report
          </h1>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 14,
              color: PDF_THEME.textMuted,
            }}
          >
            {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
          </p>
        </header>

        {generated.map((block) => (
          <PdfBlockSection key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
