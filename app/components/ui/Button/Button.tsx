import { getIcon, IconType } from '@/utils/getIcon'
import { tv } from 'tailwind-variants'

const styled = tv({
  base: 'flex items-center py-2 px-3 font-medium  border-1 border-gray-700 rounded-4xl cursor-pointer',
  variants: {
    appearance: {
      light: 'bg-white text-black',
      dark: 'bg-black text-white',
    },
    icon: {
      true: '[&_svg]:size-4 [&_svg]:text-gray-700 gap-2',
    }
  }
})

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset',
  appearance?: 'light' | 'dark',
  icon?: IconType,
  label: string,
  onClick?: () => void
}

export const Button = ({
  type = 'button',
  appearance = 'light',
  icon,
  label,
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={styled({ icon: !!icon, appearance })}
      onClick={onClick}
    >
      {getIcon(icon)}
      {label}
    </button>
  )
}