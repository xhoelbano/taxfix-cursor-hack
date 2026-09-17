import { motion } from 'framer-motion'
import { Car, Check, TrendingDown } from 'lucide-react'
import type { Deal } from '../types'

export function DealCard({ deal, onAccept }: { deal: Deal; onAccept: (id: string) => void }) {
  const save = deal.stickerMonthly - deal.effectiveMonthly
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forestDark p-5 text-white shadow-card">
      <div className="flex items-center gap-2 text-lime">
        <TrendingDown size={16} />
        <span className="text-[11px] font-bold uppercase tracking-widest">{deal.trigger}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <Car size={24} className="text-lime" />
        </div>
        <div>
          <div className="text-xl font-extrabold">{deal.title}</div>
          <div className="text-[12px] text-white/70">{deal.partner}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="text-[11px] uppercase tracking-wide text-white/60">Sticker monthly</div>
          <div className="mt-0.5 text-xl font-bold tabular text-white/70 line-through">
            €{deal.stickerMonthly}
          </div>
        </div>
        <div className="rounded-2xl bg-lime/15 p-3 ring-1 ring-lime/40">
          <div className="text-[11px] uppercase tracking-wide text-lime">After deduction</div>
          <div className="mt-0.5 text-xl font-extrabold tabular text-lime">
            €{deal.effectiveMonthly}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
        <span className="text-[13px] text-white/80">Save €{save}/mo · adds to refund</span>
        <span className="text-lg font-extrabold text-lime">
          +€{deal.refundAdd.toLocaleString('de-DE')}
        </span>
      </div>

      <p className="mt-3 text-[13px] leading-snug text-white/75">{deal.blurb}</p>

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={deal.accepted}
        onClick={() => onAccept(deal.id)}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-bold transition ${
          deal.accepted ? 'bg-lime/20 text-lime' : 'bg-lime text-forest'
        }`}
      >
        {deal.accepted ? (
          <>
            <Check size={18} /> Added to your refund
          </>
        ) : (
          'Get this deal'
        )}
      </motion.button>
    </div>
  )
}
