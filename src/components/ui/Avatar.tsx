import { initials } from '@/lib/utils'

interface AvatarProps {
  name: string
  color: string
  size?: number
}

export function Avatar({ name, color, size = 32 }: AvatarProps) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
