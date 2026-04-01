import { EyeIcon } from 'lucide-react'
import { getTodayInfo } from '@/utils/date'

type CurrentBalanceProps = {
  data: {
    balance: string
  },
  className: string
}

export const CurrentBalance = ({ data, className }: CurrentBalanceProps) => {
  const { date, weekday } = getTodayInfo()

  return (
    <div className={`${className} bg-white rounded-2xl p-4`}>
      <h2 className='m-0'>Saldo</h2>
      <p className="text-xs">Atualização: {`${weekday}, ${date}`}</p>
      <div className='flex items-center gap-2'>
        <p className="text-3xl font-normal m-0">{`R$ ${data.balance}`}</p>
        <EyeIcon size={25} />
      </div>
    </div>
  )
}