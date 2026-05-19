/** Hex colors for PDF export — html2canvas does not support Tailwind v4 oklch tokens */
export const PDF_THEME = {
  pageBg: '#020617',
  cardBg: '#1e293b',
  kpiBg: '#0f172a',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  border: '#334155',
  emerald: '#34d399',
  red: '#f87171',
  slate: '#94a3b8',
  blue: '#3b82f6',
  amber: '#fbbf24',
  purple: '#c084fc',
}

export const PDF_BORDER_COLORS = {
  summary: PDF_THEME.blue,
  kpi: PDF_THEME.emerald,
  insight: PDF_THEME.amber,
  recommendation: PDF_THEME.purple,
}
