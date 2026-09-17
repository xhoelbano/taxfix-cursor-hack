import confetti from 'canvas-confetti'

const BRAND = ['#86c440', '#14401f', '#e0a82e', '#2fb6a6', '#a7d96a']

// A tasteful burst, tuned to read well on a screen recording.
export function celebrate(originY = 0.5) {
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 42,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 180,
    origin: { x: 0.5, y: originY },
    colors: BRAND,
    disableForReducedMotion: true,
  })
}

// A bigger moment for closing a ring.
export function bigCelebrate() {
  const fire = (particleRatio: number, opts: confetti.Options) =>
    confetti({
      origin: { y: 0.55 },
      colors: BRAND,
      disableForReducedMotion: true,
      ...opts,
      particleCount: Math.floor(180 * particleRatio),
    })

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}
