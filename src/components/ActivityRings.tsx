import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Ring } from '../types'

interface RingSpec {
  ring: Ring
  radius: number
}

/**
 * Apple-Fitness-style concentric activity rings.
 * Order (outer -> inner): refund, cashback, deduction.
 */
export function ActivityRings({
  rings,
  size = 260,
  stroke = 22,
  children,
}: {
  rings: Ring[]
  size?: number
  stroke?: number
  children?: ReactNode
}) {
  const order: Ring['key'][] = ['refund', 'cashback', 'deduction']
  const ordered = order
    .map((k) => rings.find((r) => r.key === k))
    .filter(Boolean) as Ring[]

  const center = size / 2
  const gap = stroke + 8
  const specs: RingSpec[] = ordered.map((ring, i) => ({
    ring,
    radius: center - stroke / 2 - i * gap - 4,
  }))

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {specs.map(({ ring }) => (
            <linearGradient
              key={ring.key}
              id={`grad-${ring.key}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={ring.color} stopOpacity={0.85} />
              <stop offset="100%" stopColor={ring.color} />
            </linearGradient>
          ))}
          <filter id="ringGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>

        <g transform={`rotate(-90 ${center} ${center})`}>
          {specs.map(({ ring, radius }) => {
            const c = 2 * Math.PI * radius
            const frac = Math.min(ring.value / ring.goal, 1)
            const offset = c * (1 - frac)
            const closed = ring.value >= ring.goal
            return (
              <g key={ring.key}>
                {/* track */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={ring.track}
                  strokeWidth={stroke}
                />
                {/* progress */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={`url(#grad-${ring.key})`}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={c}
                  filter="url(#ringGlow)"
                  initial={false}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ strokeDashoffset: offset }}
                />
                {closed && (
                  <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    initial={{ opacity: 0.0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1.1, repeat: 1 }}
                  />
                )}
              </g>
            )
          })}
        </g>
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  )
}
