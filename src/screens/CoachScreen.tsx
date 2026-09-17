import { useApp } from '../store/AppStore'
import { DealCard } from '../components/DealCard'
import { InsightCard } from '../components/InsightCard'

export function CoachScreen() {
  const { deals, tips, acceptDeal } = useApp()

  return (
    <div className="px-5 pt-12">
      <div className="mb-3">
        <h1 className="text-xl font-extrabold text-forest">Coach</h1>
        <p className="text-[13px] text-muted">
          Tax-smart deals and tips, personalized from your spending.
        </p>
      </div>

      <div className="space-y-3">
        {deals.map((d) => (
          <DealCard key={d.id} deal={d} onAccept={acceptDeal} />
        ))}
      </div>

      <div className="mt-5">
        <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
          Plain-language tips
        </span>
        <div className="mt-2 space-y-2.5">
          {tips.map((t) => (
            <InsightCard key={t.id} tip={t} />
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-muted">
        Figures illustrative — the advance, deductions and deals are simulated in this prototype.
      </p>
    </div>
  )
}
