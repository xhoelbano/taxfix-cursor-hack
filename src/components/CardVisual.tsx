import { Wifi } from 'lucide-react'
import { AnimatedNumber } from './AnimatedNumber'

export function CardVisual({ spendable }: { spendable: number }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forestDark p-5 text-white shadow-card">
      {/* glow */}
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-lime/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-lime/10 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <span className="text-lg font-extrabold lowercase tracking-tight">taxfix</span>
        <Wifi size={20} className="rotate-90 text-white/80" />
      </div>

      <div className="relative mt-6">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-lime/90">
          Spendable now
        </div>
        <div className="mt-0.5 text-3xl font-extrabold tabular">
          <AnimatedNumber value={spendable} decimals={2} prefix="€ " />
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white/85">
          <span className="text-lg tracking-[0.2em]">····</span>
          <span className="text-lg tracking-[0.2em]">····</span>
          <span className="text-lg tracking-[0.2em]">····</span>
          <span className="text-sm font-semibold tabular">4218</span>
        </div>
        <div className="h-7 w-11 rounded-md bg-gradient-to-br from-yellow-200/90 to-yellow-500/80" />
      </div>
    </div>
  )
}
