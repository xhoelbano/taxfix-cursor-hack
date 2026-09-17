import type { Ring } from '../types'

function fmt(r: Ring) {
  const v = r.value.toLocaleString('de-DE', { maximumFractionDigits: 0 })
  const g = r.goal.toLocaleString('de-DE', { maximumFractionDigits: 0 })
  return `€${v} / €${g}`
}

export function RingLegend({ rings }: { rings: Ring[] }) {
  const order: Ring['key'][] = ['refund', 'cashback', 'deduction']
  const ordered = order
    .map((k) => rings.find((r) => r.key === k))
    .filter(Boolean) as Ring[]

  return (
    <div className="grid grid-cols-3 gap-2">
      {ordered.map((r) => {
        const pct = Math.min(Math.round((r.value / r.goal) * 100), 100)
        return (
          <div key={r.key} className="rounded-2xl bg-white/70 px-3 py-2.5 text-left">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: r.color }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {r.label}
              </span>
            </div>
            <div className="mt-1 text-[13px] font-bold tabular text-forest">{pct}%</div>
            <div className="text-[10px] tabular text-muted">{fmt(r)}</div>
          </div>
        )
      })}
    </div>
  )
}
