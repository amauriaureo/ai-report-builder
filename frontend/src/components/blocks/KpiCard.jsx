import { PDF_THEME } from '../../constants/pdfTheme'

const TREND_CLASS = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  neutral: 'text-slate-400',
}

const TREND_COLOR = {
  up: PDF_THEME.emerald,
  down: PDF_THEME.red,
  neutral: PDF_THEME.slate,
}

function TrendArrow({ trend, className = 'h-4 w-4', color }) {
  const stroke = color || 'currentColor'
  if (trend === 'up') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M5 12l7-7 7 7"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (trend === 'down') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7 7 7-7"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function KpiCard({ kpi, className = '', forPdf = false }) {
  if (!kpi) return null

  const trend = kpi.trend || 'neutral'

  if (forPdf) {
    const trendColor = TREND_COLOR[trend] || TREND_COLOR.neutral
    return (
      <div
        style={{
          backgroundColor: PDF_THEME.kpiBg,
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: PDF_THEME.textMuted,
            margin: 0,
          }}
        >
          {kpi.label}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'flex-end',
            gap: 12,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1,
              color: PDF_THEME.text,
              flexShrink: 0,
            }}
          >
            {kpi.value}
          </span>
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: 4,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 1,
              color: trendColor,
              flexShrink: 0,
            }}
          >
            <TrendArrow trend={trend} className="h-4 w-4" color={trendColor} />
            <span style={{ whiteSpace: 'nowrap' }}>{kpi.delta}</span>
          </span>
        </div>
      </div>
    )
  }

  const trendClass = TREND_CLASS[trend] || TREND_CLASS.neutral

  return (
    <div className={`rounded-lg bg-slate-900 p-4 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {kpi.label}
      </p>
      <div className="mt-2 flex flex-row flex-nowrap items-end gap-3">
        <span className="shrink-0 text-3xl font-bold leading-none text-white">
          {kpi.value}
        </span>
        <span
          className={`flex shrink-0 flex-row flex-nowrap items-center gap-1 text-sm font-medium leading-none ${trendClass}`}
        >
          <TrendArrow trend={trend} className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">{kpi.delta}</span>
        </span>
      </div>
    </div>
  )
}
