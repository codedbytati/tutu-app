import { ElementType, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type TextAppearance = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'microtext'

const semanticTag: Record<TextAppearance, 'h1' | 'h2' | 'h3' | 'p' | 'small'> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body2: 'p',
  microtext: 'small'
}

type TextProps = {
  appearance: TextAppearance
  children: ReactNode
  as?: keyof HTMLElementTagNameMap
  className?: string
}

const styled = tv({
  base: 'm-0',
  variants: {
    appearance: {
      h1: 'text-3xl font-medium',
      h2: 'text-2xl font-medium',
      h3: 'text-xl font-medium',
      body1: 'text-base font-normal',
      body2: 'text-sm font-normal',
      microtext: 'text-xs font-normal'

    }
  }
})

export const Text = ({ children, appearance, className, as }: TextProps) => {
  const Component = (as ?? semanticTag[appearance]) as ElementType

  return (
    <Component className={styled({ appearance, className })}>{children}</Component>
  )
}