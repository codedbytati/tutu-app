import { getIcon, IconType } from '../../../utils/getIcon'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset',
  appearance?: 'light' | 'dark' | 'accent',
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
    appearance === 'accent'
      ? 'border-0 bg-[linear-gradient(135deg,#111827_0%,#334155_100%)] px-5 py-3 font-bold text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)] hover:border-0 hover:bg-[linear-gradient(135deg,#111827_0%,#334155_100%)] hover:text-white'
      : '',
    icon ? `[&_svg]:size-4 ${appearance === 'accent' ? '[&_svg]:text-white' : '[&_svg]:text-gray-700'}` : '',
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