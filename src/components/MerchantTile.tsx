import { motion } from 'framer-motion'
import type { Merchant } from '../types'

export function MerchantTile({
  merchant,
  onPay,
}: {
  merchant: Merchant
  onPay: (m: Merchant) => void
}) {
  const Icon = merchant.icon
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onPay(merchant)}
      className="flex flex-col items-start gap-2 rounded-2xl bg-white p-3 text-left shadow-cardsm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream">
        <Icon size={20} className="text-forest" strokeWidth={2.2} />
      </div>
      <div className="w-full">
        <div className="truncate text-[13px] font-bold text-forest">{merchant.name}</div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold tabular text-muted">
            €{merchant.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
          {merchant.deductible && (
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: '#2fb6a6' }}
              title="Deductible"
            />
          )}
        </div>
      </div>
    </motion.button>
  )
}
