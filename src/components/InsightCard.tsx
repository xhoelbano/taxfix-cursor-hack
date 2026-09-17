import type { Tip } from '../types'
import { Icon } from '../lib/icons'

export function InsightCard({ tip }: { tip: Tip }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-cardsm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream">
        <Icon name={tip.icon} size={20} className="text-forest" />
      </div>
      <div>
        <div className="text-[14px] font-bold leading-snug text-forest">{tip.title}</div>
        <div className="mt-1 text-[12px] leading-snug text-muted">{tip.body}</div>
      </div>
    </div>
  )
}
