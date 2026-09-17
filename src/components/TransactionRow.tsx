import { motion } from 'framer-motion'
import type { Transaction } from '../types'
import { Icon } from '../lib/icons'

export function TransactionRow({ tx, index = 0 }: { tx: Transaction; index?: number }) {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2) }}
      className="flex items-center gap-3 py-2.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-cardsm">
        <Icon name={tx.icon} size={18} className="text-forest" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-[14px] font-bold text-forest">{tx.name}</span>
          <span className="text-[14px] font-bold tabular text-ink">
            −€{tx.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`truncate text-[12px] ${
              tx.refundAdd > 0 ? 'font-semibold text-forest' : 'text-muted'
            }`}
          >
            {tx.note}
          </span>
          {tx.cashback > 0 && (
            <span className="ml-2 shrink-0 rounded-full bg-cashback/15 px-1.5 py-0.5 text-[10px] font-bold text-cashback">
              +€{tx.cashback.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
