import { Home, CreditCard, PiggyBank, Sparkles, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export type TabKey = 'home' | 'file' | 'spend' | 'refund' | 'coach'

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'file', label: 'File', icon: FileText },
  { key: 'spend', label: 'Spend', icon: CreditCard },
  { key: 'refund', label: 'Refund', icon: PiggyBank },
  { key: 'coach', label: 'Coach', icon: Sparkles },
]

export function TabBar({
  active,
  onChange,
  badges,
}: {
  active: TabKey
  onChange: (t: TabKey) => void
  badges?: Partial<Record<TabKey, number>>
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/5 bg-white/85 px-3 pb-6 pt-2 backdrop-blur-xl">
      <div className="flex items-stretch justify-around">
        {TABS.map(({ key, label, icon: Icon }) => {
          const on = active === key
          const badge = badges?.[key]
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <div className="relative">
                <Icon
                  size={23}
                  strokeWidth={on ? 2.6 : 2}
                  className={on ? 'text-forest' : 'text-muted'}
                />
                {!!badge && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 text-[10px] font-bold text-forest">
                    {badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-semibold ${on ? 'text-forest' : 'text-muted'}`}
              >
                {label}
              </span>
              {on && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute -bottom-0 h-1 w-8 rounded-full bg-lime"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
