import { useApp } from '../store/AppStore'
import { CardVisual } from '../components/CardVisual'
import { MerchantTile } from '../components/MerchantTile'
import { TransactionRow } from '../components/TransactionRow'
import { MERCHANTS } from '../data/merchants'
import type { Merchant } from '../types'

export function SpendScreen({ onDetect }: { onDetect: (id: string) => void }) {
  const { spendable, makePurchase, transactions } = useApp()

  const pay = (m: Merchant) => {
    const detectId = makePurchase(m)
    if (detectId) {
      // let the purchase toast / animation land, then reveal the detection
      window.setTimeout(() => onDetect(detectId), 550)
    }
  }

  return (
    <div className="px-5 pt-12">
      <div className="mb-3">
        <h1 className="text-xl font-extrabold text-forest">Spend</h1>
        <p className="text-[13px] text-muted">Tap to pay — we tag the tax value instantly.</p>
      </div>

      <CardVisual spendable={spendable} />

      <div className="mb-2 mt-5 flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
          Pay a merchant
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-deduction" /> deductible
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {MERCHANTS.map((m) => (
          <MerchantTile key={m.id} merchant={m} onPay={pay} />
        ))}
      </div>

      <div className="mt-5">
        <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
          Recent activity
        </span>
        <div className="mt-1 divide-y divide-black/5">
          {transactions.slice(0, 4).map((tx, i) => (
            <TransactionRow key={tx.id} tx={tx} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
