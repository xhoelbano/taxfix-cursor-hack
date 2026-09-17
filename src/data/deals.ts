import type { Deal, Tip } from '../types'

// The hero coach deal, surfaced by a detected long commute.
export const DEALS: Deal[] = [
  {
    id: 'bmw-lease',
    title: 'BMW i4 lease',
    partner: 'Partner offer',
    trigger: 'Detected: long commute (38 km each way)',
    icon: 'Car',
    stickerMonthly: 599,
    effectiveMonthly: 389,
    refundAdd: 2520,
    blurb:
      'Because your commute makes the car deductible, the effective monthly cost drops and your refund goes up.',
    accepted: false,
  },
]

export const TIPS: Tip[] = [
  {
    id: 'home-office',
    icon: 'Home',
    title: "You're €140 from the next home-office bracket",
    body: 'A bit more tracked home-office spend unlocks a higher flat deduction. No jargon — just what to do next.',
  },
  {
    id: 'transit-pass',
    icon: 'TramFront',
    title: 'An annual transit pass beats pay-as-you-go',
    body: 'At your commute frequency, a yearly ticket is fully deductible and cheaper overall.',
  },
  {
    id: 'insurance',
    icon: 'ShieldCheck',
    title: 'Your income protection premiums are deductible',
    body: 'Link the policy once and we auto-add it to next year’s refund every month.',
  },
]
