'use client'

import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'
import { getTodayInfo } from '@/utils/date'
import { tv } from 'tailwind-variants'
import { Text } from '@/app/components/ui'

const styled = tv({
  base: 'text-2xl transition-all duration-50',
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
  const { date, weekday } = getTodayInfo()
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className={`${className} bg-white rounded-4xl p-4`}>
      <Text appearance='h2'>Saldo atual</Text>
      <Text appearance='microtext'>Atualização: {`${weekday}, ${date}`}</Text>
      <div className='flex items-center gap-3 mt-2'>
        <Text appearance='h3' className={styled({ isHidden })}>
          {`R$ ${balance}`}
        </Text>
        <button
          type='button'
          onClick={() => setIsHidden((currentValue) => !currentValue)}
          className='border-0 bg-transparent p-0 leading-none'
          aria-label={isHidden ? 'Mostrar saldo' : 'Ocultar saldo'}
        >
          {isHidden ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
    </div>
  )
}