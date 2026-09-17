import type { Ring, Transaction, DetectedEvent, Deal, Tip, TaxReturn } from '../types'
import { DEALS, TIPS } from './deals'

// Wallet starts empty — you unlock it by filing your return (the origin of the loop).
export const SPENDABLE_START = 0

// The advance you receive when you file the fileable year.
export const ADVANCE_AMOUNT = 5000

export function seedReturns(): TaxReturn[] {
  return [
    { year: 2026, status: 'inProgress', amount: 0 }, // builds from this year's spend (the rings)
    { year: 2025, status: 'ready', amount: ADVANCE_AMOUNT }, // fileable now -> advanced to wallet
    { year: 2024, status: 'filed', amount: 4120 },
    { year: 2023, status: 'filed', amount: 3480 },
  ]
}

export function seedRings(): Ring[] {
  return [
    {
      key: 'refund',
      label: 'Refund',
      unit: 'currency',
      value: 1240,
      goal: 5000,
      color: '#86c440',
      track: 'rgba(134,196,64,0.18)',
    },
    {
      key: 'cashback',
      label: 'Cashback',
      unit: 'currency',
      value: 16.2,
      goal: 25,
      color: '#e0a82e',
      track: 'rgba(224,168,46,0.18)',
    },
    {
      key: 'deduction',
      label: 'Deductions',
      unit: 'currency',
      value: 610,
      goal: 700,
      color: '#2fb6a6',
      track: 'rgba(47,182,166,0.18)',
    },
  ]
}

export function seedTransactions(): Transaction[] {
  return [
    {
      id: 't-seed-1',
      name: 'Coffee',
      icon: 'Coffee',
      amount: 3.8,
      cashback: 0.11,
      refundAdd: 0,
      deductible: false,
      note: 'Everyday spend',
      time: 'Today · 08:12',
    },
    {
      id: 't-seed-2',
      name: 'Deutsche Bahn',
      icon: 'TramFront',
      amount: 2.9,
      cashback: 0.09,
      refundAdd: 2.9,
      deductible: true,
      note: 'Commute — deductible',
      time: 'Today · 08:41',
    },
    {
      id: 't-seed-3',
      name: 'Groceries',
      icon: 'ShoppingCart',
      amount: 48.1,
      cashback: 1.44,
      refundAdd: 12,
      deductible: true,
      note: '+€12 to your 2026 refund',
      time: 'Yesterday · 18:20',
    },
  ]
}

export function seedDetected(): DetectedEvent[] {
  return []
}

export function seedDeals(): Deal[] {
  return DEALS.map((d) => ({ ...d }))
}

export function seedTips(): Tip[] {
  return TIPS.map((t) => ({ ...t }))
}
