'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Text } from '@/components/ui'
import { formatMoneyForDisplay } from '@/utils/money'

type CurrentBalanceProps = {
  balance: string,
  className: string
}

export const CurrentBalance = ({ balance, className }: CurrentBalanceProps) => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className={`${className} rounded-4xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm`}>
      <Text appearance='h2'>Saldo atual</Text>
      <div className='flex items-center gap-3 mt-2'>
        <Text appearance='h3' className={`text-xl transition-all duration-75 ${isHidden ? 'select-none blur-sm' : ''}`}>
          {formatMoneyForDisplay(balance)}
        </Text>
        <button
          type='button'
          onClick={() => setIsHidden((currentValue) => !currentValue)}
          className='border-0 bg-transparent p-0 leading-none'
          aria-label={isHidden ? 'Mostrar saldo' : 'Ocultar saldo'}
        >
          {isHidden ? <EyeOff aria-hidden='true' className='h-5 w-5 cursor-pointer' strokeWidth={2} /> : <Eye aria-hidden='true' className='h-5 w-5 cursor-pointer' strokeWidth={2} />}
        </button>
      </div>
    </div>
  )
}