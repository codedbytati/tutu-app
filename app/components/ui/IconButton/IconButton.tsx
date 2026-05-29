import Link from 'next/link'

import { getIcon, IconType } from '@/utils/getIcon'
import { tv } from 'tailwind-variants'

const styled = tv({
  base: ['flex items-center p-3 border-1 border-gray-700 rounded-full',
    '[&_svg]:size-4 gap-2 cursor-pointer'
  ],
  variants: {
    appearance: {
      light: 'bg-white [&_svg]:text-black',
      dark: 'bg-black [&_svg]:text-white',
      danger: 'bg-danger [&_svg]:text-black border-none',
    },
  }
})

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
  const sharedProps = {
    'aria-label': label,
    className: styled({ appearance }),
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
      className={styled({ appearance })}
      onClick={onClick}
    >
      {getIcon(icon)}
    </button>
  )
}