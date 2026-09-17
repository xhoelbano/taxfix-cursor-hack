import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type {
  Ring,
  RingKey,
  Transaction,
  DetectedEvent,
  Deal,
  Tip,
  Merchant,
  TaxReturn,
} from '../types'
import {
  SPENDABLE_START,
  seedRings,
  seedTransactions,
  seedDetected,
  seedDeals,
  seedTips,
  seedReturns,
} from '../data/seed'
import { celebrate, bigCelebrate } from '../lib/confetti'

export interface Toast {
  id: string
  title: string
  sub?: string
  tone?: 'refund' | 'cashback' | 'deduction' | 'default'
}

interface AppState {
  spendable: number
  rings: Ring[]
  transactions: Transaction[]
  detected: DetectedEvent[]
  deals: Deal[]
  tips: Tip[]
  returns: TaxReturn[]
}

interface AppContextValue extends AppState {
  toasts: Toast[]
  // derived
  refund: Ring
  cashback: Ring
  deduction: Ring
  pendingDetected: DetectedEvent[]
  readyReturns: TaxReturn[]
  // actions
  makePurchase: (m: Merchant) => string | null
  confirmDetectedEvent: (id: string) => void
  dismissDetectedEvent: (id: string) => void
  acceptDeal: (id: string) => void
  fileReturn: (year: number) => void
  resetDemo: () => void
  dismissToast: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

function initialState(): AppState {
  return {
    spendable: SPENDABLE_START,
    rings: seedRings(),
    transactions: seedTransactions(),
    detected: seedDetected(),
    deals: seedDeals(),
    tips: seedTips(),
    returns: seedReturns(),
  }
}

let idc = 0
const uid = (p: string) => `${p}-${Date.now()}-${idc++}`
const round2 = (n: number) => Math.round(n * 100) / 100

function bumpRing(rings: Ring[], key: RingKey, delta: number) {
  let closed = false
  const next = rings.map((r) => {
    if (r.key !== key || delta === 0) return r
    const wasClosed = r.value >= r.goal
    const value = Math.max(0, round2(r.value + delta))
    if (!wasClosed && value >= r.goal) closed = true
    return { ...r, value }
  })
  return { rings: next, closed }
}

const ringLabel: Record<RingKey, string> = {
  refund: 'Refund',
  cashback: 'Cashback',
  deduction: 'Deductions',
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)
  const [toasts, setToasts] = useState<Toast[]>([])
  const ref = useRef(state)
  useEffect(() => {
    ref.current = state
  }, [state])

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = uid('toast')
      setToasts((t) => [...t, { ...toast, id }])
      window.setTimeout(() => dismissToast(id), 3000)
    },
    [dismissToast],
  )

  const commit = useCallback((next: AppState) => {
    ref.current = next
    setState(next)
  }, [])

  const makePurchase = useCallback(
    (m: Merchant): string | null => {
      const s = ref.current
      const cashbackEarned = round2(m.amount * m.cashbackRate)

      let rings = s.rings
      const closedRings: RingKey[] = []
      for (const [key, delta] of [
        ['refund', m.refundAdd],
        ['cashback', cashbackEarned],
        ['deduction', m.deductionAdd],
      ] as [RingKey, number][]) {
        const res = bumpRing(rings, key, delta)
        rings = res.rings
        if (res.closed) closedRings.push(key)
      }

      const tx: Transaction = {
        id: uid('tx'),
        name: m.name,
        icon: m.icon.displayName || m.name,
        amount: m.amount,
        cashback: cashbackEarned,
        refundAdd: m.refundAdd,
        deductible: m.deductible,
        note: m.note,
        time: 'Just now',
      }

      // Life-event detection (only once per event id)
      let detected = s.detected
      let detectId: string | null = null
      if (
        m.detect &&
        !s.detected.some((d) => d.id === m.detect!.id) 
      ) {
        detected = [...s.detected, { ...m.detect, confirmed: false }]
        detectId = m.detect.id
      }

      commit({
        ...s,
        spendable: round2(s.spendable - m.amount),
        rings,
        transactions: [tx, ...s.transactions],
        detected,
      })

      // Side effects (toasts + confetti)
      if (m.refundAdd > 0) {
        pushToast({
          title: `+€${m.refundAdd.toLocaleString('de-DE')} to your 2026 refund`,
          sub: m.name,
          tone: 'refund',
        })
        celebrate(0.4)
      } else if (cashbackEarned > 0 && !detectId) {
        pushToast({
          title: `+€${cashbackEarned.toFixed(2)} cashback`,
          sub: m.name,
          tone: 'cashback',
        })
      }

      if (closedRings.length) {
        window.setTimeout(() => {
          bigCelebrate()
          for (const key of closedRings) {
            pushToast({
              title: `${ringLabel[key]} ring closed!`,
              sub: 'Goal reached for this month',
              tone: key,
            })
          }
        }, 350)
      }

      return detectId
    },
    [commit, pushToast],
  )

  const confirmDetectedEvent = useCallback(
    (id: string) => {
      const s = ref.current
      const ev = s.detected.find((d) => d.id === id)
      if (!ev || ev.confirmed) return
      const { rings, closed } = bumpRing(s.rings, 'refund', ev.refundAdd)
      commit({
        ...s,
        rings,
        detected: s.detected.map((d) => (d.id === id ? { ...d, confirmed: true } : d)),
      })
      pushToast({
        title: `+€${ev.refundAdd.toLocaleString('de-DE')} unlocked`,
        sub: ev.title,
        tone: 'refund',
      })
      bigCelebrate()
      if (closed) {
        window.setTimeout(
          () => pushToast({ title: 'Refund ring closed!', sub: 'Goal reached', tone: 'refund' }),
          400,
        )
      }
    },
    [commit, pushToast],
  )

  const dismissDetectedEvent = useCallback(
    (id: string) => {
      const s = ref.current
      commit({ ...s, detected: s.detected.filter((d) => d.id !== id) })
    },
    [commit],
  )

  const acceptDeal = useCallback(
    (id: string) => {
      const s = ref.current
      const deal = s.deals.find((d) => d.id === id)
      if (!deal || deal.accepted) return
      const { rings } = bumpRing(s.rings, 'refund', deal.refundAdd)
      commit({
        ...s,
        rings,
        deals: s.deals.map((d) => (d.id === id ? { ...d, accepted: true } : d)),
      })
      pushToast({
        title: `+€${deal.refundAdd.toLocaleString('de-DE')} to your refund`,
        sub: deal.title,
        tone: 'refund',
      })
      celebrate(0.4)
    },
    [commit, pushToast],
  )

  const fileReturn = useCallback(
    (year: number) => {
      const s = ref.current
      const ret = s.returns.find((r) => r.year === year)
      if (!ret || ret.status !== 'ready') return
      commit({
        ...s,
        spendable: round2(s.spendable + ret.amount),
        returns: s.returns.map((r) => (r.year === year ? { ...r, status: 'filed' } : r)),
      })
      pushToast({
        title: `€${ret.amount.toLocaleString('de-DE')} added to your wallet`,
        sub: `${year} refund advanced`,
        tone: 'refund',
      })
      bigCelebrate()
    },
    [commit, pushToast],
  )

  const resetDemo = useCallback(() => {
    commit(initialState())
    setToasts([])
  }, [commit])

  const value = useMemo<AppContextValue>(() => {
    const byKey = (k: RingKey) => state.rings.find((r) => r.key === k)!
    return {
      ...state,
      toasts,
      refund: byKey('refund'),
      cashback: byKey('cashback'),
      deduction: byKey('deduction'),
      pendingDetected: state.detected.filter((d) => !d.confirmed),
      readyReturns: state.returns.filter((r) => r.status === 'ready'),
      makePurchase,
      confirmDetectedEvent,
      dismissDetectedEvent,
      acceptDeal,
      fileReturn,
      resetDemo,
      dismissToast,
    }
  }, [
    state,
    toasts,
    makePurchase,
    confirmDetectedEvent,
    dismissDetectedEvent,
    acceptDeal,
    fileReturn,
    resetDemo,
    dismissToast,
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
