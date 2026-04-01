import { getIcon, IconType } from '@/utils/getIcon'
import { Button as ButtonComponent } from 'react-bootstrap'
import { tv } from 'tailwind-variants'

const styled = tv({
  base: 'd-flex align-items-center',
  variants: {
    label: {
      true: 'gap-2 rounded-4',
      false: 'rounded-circle p-2'
    },
    size: {
      sm: '[&_svg]:size-3',
      md: '[&_svg]:size-4',
      lg: '[&_svg]:size-6'
    }
  }
})

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset',
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
  icon?: IconType,
  label?: string,
  size?: 'sm' | 'md' | 'lg',
  onClick?: () => void
}

export const Button = ({
  type = 'button',
  variant,
  icon,
  label,
  size = 'md',
  onClick
}: ButtonProps) => {
  return (
    <ButtonComponent
      type={type}
      variant={variant}
      className={styled({ label: !!label, size })}
      onClick={onClick}
    >
      {getIcon(icon)}
      {label}
    </ButtonComponent>
  )
}