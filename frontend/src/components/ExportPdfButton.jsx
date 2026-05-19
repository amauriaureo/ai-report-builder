import { useState } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { exportReportPdf, hasGeneratedContent } from '../utils/exportPdf'

function PdfIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <polyline points="9 15 12 18 15 15" />
    </svg>
  )
}

export default function ExportPdfButton() {
  const blocks = useCanvasStore((s) => s.blocks)
  const canExport = hasGeneratedContent(blocks)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const title = canExport
    ? 'Export as PDF'
    : 'Generate with AI before exporting your PDF'

  const handleExport = async () => {
    if (!canExport || exporting) return
    setExporting(true)
    setExportError(null)
    try {
      await exportReportPdf()
    } catch (err) {
      console.error('PDF export failed:', err)
      setExportError(err?.message || 'PDF export failed')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        title={exporting ? 'Exporting...' : title}
        disabled={!canExport || exporting}
        onClick={handleExport}
        className="flex items-center justify-center rounded-lg border border-slate-600 p-2 text-slate-300 transition-colors hover:border-indigo-500 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-600 disabled:hover:bg-transparent disabled:hover:text-slate-600"
        aria-label={title}
      >
        <PdfIcon />
      </button>
      {exportError && (
        <p className="max-w-48 text-right text-xs text-red-400">{exportError}</p>
      )}
    </div>
  )
}
