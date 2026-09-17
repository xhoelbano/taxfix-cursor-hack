import { motion } from 'framer-motion'
import { RotateCcw, ChevronRight, CreditCard, Baby, FileText } from 'lucide-react'
import { useApp } from '../store/AppStore'
import { ActivityRings } from '../components/ActivityRings'
import { RingLegend } from '../components/RingLegend'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { TransactionRow } from '../components/TransactionRow'
import type { TabKey } from '../components/TabBar'

export function HomeScreen({ go }: { go: (t: TabKey) => void }) {
  const {
    rings,
    refund,
    cashback,
    spendable,
    transactions,
    pendingDetected,
    readyReturns,
    resetDemo,
  } = useApp()
  const pending = pendingDetected[0]
  const fileable = readyReturns[0]

  // Priority of the next-best-action: file your return -> confirm a life event -> spend.
  const action = fileable
    ? {
        icon: <FileText size={20} className="text-forest" />,
        title: `File your ${fileable.year} return`,
        body: `Get €${fileable.amount.toLocaleString('de-DE')} in your wallet today`,
        go: 'file' as const,
      }
    : pending
      ? {
          icon: <Baby size={20} className="text-forest" />,
          title: pending.title,
          body: `Confirm to unlock +€${pending.refundAdd.toLocaleString('de-DE')}`,
          go: 'refund' as const,
        }
      : {
          icon: <CreditCard size={20} className="text-forest" />,
          title: 'Grow your refund today',
          body: 'Every purchase quietly builds next year’s refund',
          go: 'spend' as const,
        }

  return (
    <div className="px-5 pt-12">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] text-muted">Good evening,</div>
          <div className="text-xl font-extrabold text-forest">Alex</div>
        </div>
        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-muted shadow-cardsm"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* rings hero */}
      <div className="mt-4 flex justify-center">
        <ActivityRings rings={rings} size={252}>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            2026 refund
          </div>
          <AnimatedNumber
            value={refund.value}
            prefix="€"
            className="text-[32px] font-extrabold tabular text-forest"
          />
          <div className="text-[11px] text-muted">
            of €{refund.goal.toLocaleString('de-DE')} goal
          </div>
        </ActivityRings>
      </div>

      <div className="mt-4">
        <RingLegend rings={rings} />
      </div>

      {/* stat cards */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => go('spend')}
          className="rounded-2xl bg-gradient-to-br from-forest to-forestDark p-4 text-left text-white shadow-card"
        >
          <div className="text-[11px] font-semibold uppercase tracking-wide text-lime/90">
            Spendable now
          </div>
          <AnimatedNumber
            value={spendable}
            decimals={2}
            prefix="€"
            className="mt-0.5 block text-2xl font-extrabold tabular"
          />
          <div className="mt-1 flex items-center gap-1 text-[12px] text-white/70">
            <CreditCard size={13} /> Tap to spend
          </div>
        </button>
        <div className="rounded-2xl bg-white p-4 shadow-cardsm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Cashback · month
          </div>
          <AnimatedNumber
            value={cashback.value}
            decimals={2}
            prefix="€"
            className="mt-0.5 block text-2xl font-extrabold tabular text-forest"
          />
          <div className="mt-1 text-[12px] text-muted">
            of €{cashback.goal} goal
          </div>
        </div>
      </div>

      {/* next best action */}
      <motion.button
        layout
        onClick={() => go(action.go)}
        className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-lime/15 p-4 text-left ring-1 ring-lime/40"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/25">
          {action.icon}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-forest">{action.title}</div>
          <div className="text-[12px] text-muted">{action.body}</div>
        </div>
        <ChevronRight size={20} className="text-forest" />
      </motion.button>

      {/* recent activity */}
      <div className="mt-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
            Recent activity
          </span>
        </div>
        <div className="divide-y divide-black/5">
          {transactions.slice(0, 5).map((tx, i) => (
            <TransactionRow key={tx.id} tx={tx} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
