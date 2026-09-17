import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useApp } from '../store/AppStore'
import { ActivityRings } from '../components/ActivityRings'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Icon } from '../lib/icons'

export function RefundScreen({ onOpen }: { onOpen: (id: string) => void }) {
  const { refund, transactions, pendingDetected } = useApp()
  const contributions = transactions.filter((t) => t.refundAdd > 0)
  const pct = Math.min(Math.round((refund.value / refund.goal) * 100), 100)

  return (
    <div className="px-5 pt-12">
      <div className="mb-3">
        <h1 className="text-xl font-extrabold text-forest">Refund</h1>
        <p className="text-[13px] text-muted">Your spending is building next year’s refund.</p>
      </div>

      {/* big refund ring */}
      <div className="flex justify-center">
        <ActivityRings rings={[refund]} size={220} stroke={24}>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            2026 refund
          </div>
          <AnimatedNumber
            value={refund.value}
            prefix="€"
            className="text-[30px] font-extrabold tabular text-forest"
          />
          <div className="text-[11px] text-muted">{pct}% of €{refund.goal.toLocaleString('de-DE')}</div>
        </ActivityRings>
      </div>

      {/* detected life events awaiting confirm */}
      {pendingDetected.length > 0 && (
        <div className="mt-4">
          <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
            Detected — tap to confirm
          </span>
          <div className="mt-2 space-y-2">
            {pendingDetected.map((ev) => (
              <motion.button
                key={ev.id}
                layout
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpen(ev.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-lime/15 p-3.5 text-left ring-1 ring-lime/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/25">
                  <Icon name={ev.icon} size={20} className="text-forest" />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-forest">{ev.title}</div>
                  <div className="text-[12px] text-muted">
                    Unlock +€{ev.refundAdd.toLocaleString('de-DE')}
                  </div>
                </div>
                <ChevronRight size={20} className="text-forest" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* contributions */}
      <div className="mt-5">
        <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
          What’s building your refund
        </span>
        <div className="mt-2 space-y-2">
          {contributions.length === 0 && (
            <div className="rounded-2xl bg-white p-4 text-[13px] text-muted shadow-cardsm">
              Spend with your card — deductible purchases show up here.
            </div>
          )}
          {contributions.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.2) }}
              className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-cardsm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream">
                <Icon name={t.icon} size={18} className="text-forest" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-forest">{t.name}</div>
                <div className="text-[12px] text-muted">{t.note}</div>
              </div>
              <div className="text-[15px] font-extrabold tabular text-forest">
                +€{t.refundAdd.toLocaleString('de-DE')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
