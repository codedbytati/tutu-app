import Link from 'next/link'

import { getIcon, IconType } from '@/utils/getIcon'

type IconButtonProps = {
  appearance?: 'light' | 'dark' | 'danger',
  icon?: IconType,
  label: string,
  href?: string,
  onClick?: () => void
}

export const IconButton = ({
  appearance = 'light',
  icon,
  label,
  href,
  onClick
}: IconButtonProps) => {
  const className = [
    'flex items-center p-3 border-1 border-gray-700 rounded-full [&_svg]:size-4 gap-2 cursor-pointer',
    appearance === 'light'
      ? 'bg-white [&_svg]:text-black'
      : appearance === 'dark'
        ? 'bg-black [&_svg]:text-white'
        : 'bg-danger [&_svg]:text-black border-none',
  ].join(' ')

  const sharedProps = {
    'aria-label': label,
    className,
  }

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {getIcon(icon)}
      </Link>
    )
  }

  return (
    <button
      type='button'
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      {getIcon(icon)}
    </button>
  )
}