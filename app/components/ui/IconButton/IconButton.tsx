import { getIcon, IconType } from '@/utils/getIcon'
import { tv } from 'tailwind-variants'

const styled = tv({
  base: ['flex items-center p-3 border-1 border-gray-700 rounded-full',
    '[&_svg]:size-4 [&_svg]:text-gray-700 gap-2'
  ],
  variants: {
    appearance: {
      light: 'bg-white text-black',
      dark: 'bg-black text-white',
    },
  }
})

type IconButtonProps = {
  appearance?: 'light' | 'dark',
  icon?: IconType,
  label: string,
  onClick?: () => void
}

export const IconButton = ({
  appearance = 'light',
  icon,
  label,
  onClick
}: IconButtonProps) => {
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