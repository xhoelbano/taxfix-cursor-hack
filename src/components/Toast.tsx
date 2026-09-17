import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp, Coins, Target } from 'lucide-react'
import type { Toast as ToastT } from '../store/AppStore'

const toneMap = {
  refund: { color: '#86c440', bg: 'bg-forest', text: 'text-white', Icon: TrendingUp },
  cashback: { color: '#e0a82e', bg: 'bg-forest', text: 'text-white', Icon: Coins },
  deduction: { color: '#2fb6a6', bg: 'bg-forest', text: 'text-white', Icon: Target },
  default: { color: '#86c440', bg: 'bg-forest', text: 'text-white', Icon: TrendingUp },
}

export function ToastStack({ toasts }: { toasts: ToastT[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-10 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          const tone = toneMap[t.tone ?? 'default']
          const I = tone.Icon
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              className={`flex w-full max-w-[320px] items-center gap-3 rounded-2xl ${tone.bg} px-4 py-3 shadow-card`}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: `${tone.color}26` }}
              >
                <I size={18} style={{ color: tone.color }} />
              </div>
              <div className="min-w-0">
                <div className={`text-[14px] font-bold leading-tight ${tone.text}`}>{t.title}</div>
                {t.sub && <div className="truncate text-[12px] text-white/70">{t.sub}</div>}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
