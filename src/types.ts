import type { LucideIcon } from 'lucide-react'

export type RingKey = 'refund' | 'cashback' | 'deduction'

export interface Ring {
  key: RingKey
  label: string
  unit: 'currency' | 'count'
  value: number
  goal: number
  color: string // hex
  track: string // hex track color
}

export interface DetectedEvent {
  id: string
  title: string // e.g. "New baby?"
  subtitle: string // e.g. "Pharmacy + diapers x3"
  detail: string // what confirming unlocks
  refundAdd: number // euros added to next year's refund on confirm
  icon: string // lucide key
  confirmed: boolean
}

export interface Merchant {
  id: string
  name: string
  category: string
  icon: LucideIcon
  amount: number
  cashbackRate: number // fraction, e.g. 0.03
  deductible: boolean
  refundAdd: number // euros added to next year's refund when purchased
  deductionAdd: number // euros counted toward the deductions ring
  note: string // secondary line shown on the transaction
  // Optional life-event detection triggered by this purchase
  detect?: Omit<DetectedEvent, 'confirmed'>
}

export interface Transaction {
  id: string
  name: string
  icon: string // lucide key
  amount: number
  cashback: number
  refundAdd: number
  deductible: boolean
  note: string
  time: string
}

export interface Deal {
  id: string
  title: string
  partner: string
  trigger: string // what spending pattern surfaced it
  icon: string
  stickerMonthly: number
  effectiveMonthly: number
  refundAdd: number
  blurb: string
  accepted: boolean
}

export interface Tip {
  id: string
  icon: string
  title: string
  body: string
}

export interface TaxReturn {
  year: number
  // ready = fileable now, inProgress = building from this year's spend, filed = done
  status: 'ready' | 'inProgress' | 'filed'
  amount: number // estimated (ready) / received (filed); inProgress reads the live ring
}
