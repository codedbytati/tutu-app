import { getIcon, IconType } from '@/utils/getIcon'

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
  const className = [
    'flex items-center gap-2 py-2 px-6 font-medium border-1 border-gray-700 rounded-4xl cursor-pointer transition-all duration-200 hover:bg-primary hover:text-black hover:border-primary',
    appearance === 'light' ? 'bg-white text-black' : 'bg-black text-white',
    icon ? '[&_svg]:size-4 [&_svg]:text-gray-700' : '',
  ].join(' ')

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {getIcon(icon)}
      {label}
    </button>
  )
}