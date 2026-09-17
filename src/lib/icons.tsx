import {
  Coffee,
  TramFront,
  ShoppingCart,
  Baby,
  Cross,
  Gem,
  Laptop,
  HeartHandshake,
  Fuel,
  Car,
  Home,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  Coffee,
  TramFront,
  ShoppingCart,
  Baby,
  Cross,
  Gem,
  Laptop,
  HeartHandshake,
  Fuel,
  Car,
  Home,
  ShieldCheck,
  Sparkles,
}

export function Icon({
  name,
  className,
  size,
  strokeWidth,
}: {
  name: string
  className?: string
  size?: number
  strokeWidth?: number
}) {
  const Cmp = MAP[name] ?? Sparkles
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />
}
