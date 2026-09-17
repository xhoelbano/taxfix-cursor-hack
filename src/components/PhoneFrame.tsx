import type { ReactNode } from 'react'

/** A clean phone mockup so the prototype records well on a laptop. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="relative h-[812px] w-[390px] rounded-[3rem] border-[10px] border-black/85 bg-cream shadow-[0_40px_120px_-30px_rgba(0,0,0,0.65)]">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-30 h-7 w-40 -translate-x-1/2 rounded-b-3xl bg-black/85" />
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-cream">
          {children}
        </div>
      </div>
    </div>
  )
}
