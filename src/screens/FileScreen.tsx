import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  Loader2,
  Wallet,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../store/AppStore'
import { Icon } from '../lib/icons'
import type { TabKey } from '../components/TabBar'

type Step = 'list' | 'form' | 'submitting' | 'done'

const INCOME = 52000
const DEDUCTIONS = [
  { icon: 'TramFront', label: 'Commute (Pendlerpauschale)', amount: 1240 },
  { icon: 'Home', label: 'Home office', amount: 720 },
  { icon: 'Cross', label: 'Health & insurance', amount: 980 },
  { icon: 'Laptop', label: 'Work equipment', amount: 610 },
  { icon: 'HeartHandshake', label: 'Donations', amount: 300 },
]

export function FileScreen({ go }: { go: (t: TabKey) => void }) {
  const { returns, refund, fileReturn } = useApp()
  const [step, setStep] = useState<Step>('list')
  const [year, setYear] = useState<number>(2025)

  const ready = returns.find((r) => r.status === 'ready')

  const startFiling = (y: number) => {
    setYear(y)
    setStep('form')
  }

  const submit = () => {
    setStep('submitting')
    window.setTimeout(() => {
      fileReturn(year)
      setStep('done')
    }, 1500)
  }

  const finish = () => {
    setStep('list')
    go('spend')
  }

  // ---------- SUBMITTING ----------
  if (step === 'submitting') {
    return (
      <div className="flex h-[720px] flex-col items-center justify-center px-8 text-center">
        <Loader2 size={46} className="animate-spin text-forest" />
        <div className="mt-5 text-lg font-extrabold text-forest">Filing your {year} return…</div>
        <div className="mt-1 text-[13px] text-muted">
          Submitting to the Finanzamt with all your tracked expenses.
        </div>
      </div>
    )
  }

  // ---------- DONE ----------
  if (step === 'done') {
    return (
      <div className="flex h-[720px] flex-col items-center justify-center px-7 text-center">
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 220 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-lime/20"
        >
          <CheckCircle2 size={48} className="text-forest" />
        </motion.div>
        <div className="mt-5 text-[13px] font-bold uppercase tracking-widest text-lime">
          Return filed
        </div>
        <div className="mt-1 text-[26px] font-extrabold leading-tight text-forest">
          You’re getting
          <br />€{returns.find((r) => r.year === year)?.amount.toLocaleString('de-DE')} back
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-forest px-4 py-3 text-white">
          <Wallet size={18} className="text-lime" />
          <span className="text-[14px] font-semibold">Advanced to your wallet now</span>
        </div>
        <p className="mt-3 text-[13px] text-muted">
          No waiting months for the Finanzamt — spend it today.
        </p>
        <button
          onClick={finish}
          className="mt-6 w-full rounded-2xl bg-lime py-3.5 text-[15px] font-bold text-forest"
        >
          Go spend it
        </button>
      </div>
    )
  }

  // ---------- FORM ----------
  if (step === 'form') {
    const estimate = returns.find((r) => r.year === year)?.amount ?? 0
    return (
      <div className="px-5 pt-12">
        <button
          onClick={() => setStep('list')}
          className="mb-2 flex items-center gap-1 text-[13px] font-semibold text-muted"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-extrabold text-forest">File your {year} return</h1>
        <div className="flex items-center gap-1.5 text-[13px] text-lime">
          <Sparkles size={14} /> Pre-filled from your tracked spending
        </div>

        {/* profile / income */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-cardsm">
          <Row label="Name" value="Alex Müller" />
          <Row label="Tax ID" value="•• 123 456 789" />
          <Row label="Employment income" value={`€${INCOME.toLocaleString('de-DE')}`} />
        </div>

        {/* deductions auto-filled */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-bold uppercase tracking-wide text-muted">
              Deductions found
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-forest">
              <Check size={13} /> auto-filled
            </span>
          </div>
          <div className="space-y-2">
            {DEDUCTIONS.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-cardsm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream">
                  <Icon name={d.icon} size={18} className="text-forest" />
                </div>
                <span className="flex-1 text-[13px] font-semibold text-forest">{d.label}</span>
                <span className="text-[14px] font-bold tabular text-forest">
                  €{d.amount.toLocaleString('de-DE')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* estimate */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forestDark p-5 text-white shadow-card">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-lime">
            Estimated refund
          </div>
          <div className="mt-0.5 text-4xl font-extrabold tabular">
            €{estimate.toLocaleString('de-DE')}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
            <ShieldCheck size={13} className="text-lime" /> Advanced to your wallet the moment you file
          </div>
        </div>

        <button
          onClick={submit}
          className="mt-4 w-full rounded-2xl bg-lime py-4 text-[16px] font-extrabold text-forest"
        >
          Submit return
        </button>
        <p className="mt-2 text-center text-[11px] text-muted">
          Mockup — figures illustrative for this prototype.
        </p>
      </div>
    )
  }

  // ---------- LIST ----------
  return (
    <div className="px-5 pt-12">
      <h1 className="text-xl font-extrabold text-forest">File</h1>
      <p className="text-[13px] text-muted">Your tax returns, year by year.</p>

      {ready && (
        <motion.button
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          onClick={() => startFiling(ready.year)}
          className="mt-4 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forestDark p-5 text-left text-white shadow-card"
        >
          <div className="flex items-center gap-2 text-lime">
            <Sparkles size={15} />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {ready.year} · ready to file
            </span>
          </div>
          <div className="mt-2 text-[13px] text-white/80">Estimated refund</div>
          <div className="text-4xl font-extrabold tabular">
            €{ready.amount.toLocaleString('de-DE')}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5">
            <span className="text-[13px] font-semibold">Review &amp; file — get it today</span>
            <ChevronRight size={18} className="text-lime" />
          </div>
        </motion.button>
      )}

      <div className="mt-4 space-y-2">
        {returns
          .filter((r) => r.status !== 'ready')
          .map((r) => {
            const inProgress = r.status === 'inProgress'
            const value = inProgress ? refund.value : r.amount
            return (
              <button
                key={r.year}
                onClick={() => inProgress && go('refund')}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-cardsm"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    inProgress ? 'bg-lime/20' : 'bg-cream'
                  }`}
                >
                  {inProgress ? (
                    <Loader2 size={18} className="text-forest" />
                  ) : (
                    <Check size={18} className="text-forest" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-forest">{r.year}</div>
                  <div className="text-[12px] text-muted">
                    {inProgress ? 'Building from this year’s spend' : 'Filed'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-extrabold tabular text-forest">
                    €{value.toLocaleString('de-DE', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted">
                    {inProgress ? 'so far' : 'received'}
                  </div>
                </div>
              </button>
            )
          })}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-2 last:border-0">
      <span className="text-[13px] text-muted">{label}</span>
      <span className="text-[13px] font-semibold text-forest">{value}</span>
    </div>
  )
}
