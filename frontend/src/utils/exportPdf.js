import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { PDF_EXPORT_WIDTH_PX } from '../constants/pdfExport'
import { PDF_THEME } from '../constants/pdfTheme'

function fillPageBackground(pdf, width, height) {
  const hex = PDF_THEME.pageBg.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  pdf.setFillColor(r, g, b)
  pdf.rect(0, 0, width, height, 'F')
}

const MAX_CANVAS_HEIGHT = 14000

export function hasGeneratedContent(blocks) {
  return blocks.some((b) => b.status === 'done' && b.result)
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTimeout(resolve, 50))
    })
  })
}

function getCaptureScale(element) {
  const height = element.scrollHeight || element.offsetHeight
  const scale = 2
  if (height * scale > MAX_CANVAS_HEIGHT) {
    return Math.max(1, MAX_CANVAS_HEIGHT / height)
  }
  return scale
}

export async function exportReportPdf() {
  await waitForPaint()

  const root = document.getElementById('pdf-export-root')
  if (!root) {
    throw new Error('PDF export container not found. Generate at least one block first.')
  }

  const scale = getCaptureScale(root)

  const canvas = await html2canvas(root, {
    scale,
    backgroundColor: '#020617',
    useCORS: true,
    logging: false,
    width: PDF_EXPORT_WIDTH_PX,
    windowWidth: PDF_EXPORT_WIDTH_PX,
    scrollX: 0,
    scrollY: 0,
    onclone: (clonedDoc) => {
      const cloned = clonedDoc.getElementById('pdf-export-root')
      if (cloned) {
        cloned.style.opacity = '1'
        cloned.style.zIndex = '1'
        cloned.style.left = '0'
        cloned.style.top = '0'
      }
    },
  })

  if (!canvas.width || !canvas.height) {
    throw new Error('PDF capture failed: empty canvas. Try again.')
  }

  const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const imgData = canvas.toDataURL('image/jpeg', 0.92)

  let heightLeft = imgHeight
  let position = 0

  fillPageBackground(pdf, pageWidth, pageHeight)
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position -= pageHeight
    pdf.addPage()
    fillPageBackground(pdf, pageWidth, pageHeight)
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(`analytics-report-${new Date().toISOString().slice(0, 10)}.pdf`)
}
