'use client'

import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { Text } from '@/app/components/ui'
import { formatMoneyForDisplay } from '@/utils/money'

const styled = tv({
  base: 'text-xl transition-all duration-50',
  variants: {
    isHidden: {
      true: 'select-none blur-sm',
    }
  }
})

type CurrentBalanceProps = {
  balance: string,
  className: string
}

export const CurrentBalance = ({ balance, className }: CurrentBalanceProps) => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className={`${className} bg-white rounded-4xl p-4`}>
      <Text appearance='h2'>Saldo atual</Text>
      <div className='flex items-center gap-3 mt-2'>
        <Text appearance='h3' className={styled({ isHidden })}>
          {formatMoneyForDisplay(balance)}
        </Text>
        <button
          type='button'
          onClick={() => setIsHidden((currentValue) => !currentValue)}
          className='border-0 bg-transparent p-0 leading-none'
          aria-label={isHidden ? 'Mostrar saldo' : 'Ocultar saldo'}
        >
          {isHidden ? <EyeClosedIcon size={20} className='cursor-pointer' /> : <EyeIcon size={20} className='cursor-pointer' />}
        </button>
      </div>
    </div>
  )
}