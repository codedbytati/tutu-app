'use client'

import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'
import { getTodayInfo } from '@/utils/date'
import { tv } from 'tailwind-variants'

const styled = tv({
  base: 'text-2xl font-normal m-0 transition-all duration-100',
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
  const [isHidden, setIsHidden] = useState(true)

  return (
    <div className={`${className} bg-white rounded-4xl p-4`}>
      <h2 className='fs-4 m-0'>Saldo</h2>
      <p className="text-xs">Atualização: {`${weekday}, ${date}`}</p>
      <div className='flex items-center gap-3'>
        <p className={styled({ isHidden })}>
          {`R$ ${balance}`}
        </p>
        <button
          type='button'
          onClick={() => setIsHidden((currentValue) => !currentValue)}
          className='border-0 bg-transparent p-0 leading-none'
          aria-label={isHidden ? 'Mostrar saldo' : 'Ocultar saldo'}
        >
          {isHidden ? <EyeClosedIcon size={25} /> : <EyeIcon size={25} />}
        </button>
      </div>
    </div>
  )
}