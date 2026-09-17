import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { DetectedEvent } from '../types'
import { Icon } from '../lib/icons'

export function DetectionSheet({
  event,
  onConfirm,
  onDismiss,
}: {
  event: DetectedEvent | null
  onConfirm: (id: string) => void
  onDismiss: (id: string) => void
}) {
  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/40"
            onClick={() => onDismiss(event.id)}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white p-6 pb-8 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.4)]"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/10" />

            <div className="flex items-center gap-2 text-lime">
              <Sparkles size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Pattern detected
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                <Icon name={event.icon} size={28} className="text-forest" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-forest">{event.title}</div>
                <div className="text-[13px] text-muted">{event.subtitle}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-cream p-4">
              <div className="text-[13px] text-ink">{event.detail}</div>
              <div className="mt-2 text-2xl font-extrabold text-forest">
                +€{event.refundAdd.toLocaleString('de-DE')}{' '}
                <span className="text-[13px] font-semibold text-muted">to your 2026 refund</span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => onDismiss(event.id)}
                className="flex-1 rounded-2xl bg-black/5 py-3.5 text-[15px] font-bold text-muted"
              >
                Not now
              </button>
              <button
                onClick={() => onConfirm(event.id)}
                className="flex-[2] rounded-2xl bg-forest py-3.5 text-[15px] font-bold text-white"
              >
                Yes, unlock it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
