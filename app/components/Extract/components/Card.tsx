import { EditTransaction } from '../../EditTransaction'
import { DeleteTransaction } from '../../DeleteTransaction'
import { formatDateWithWeekday } from '@/utils/date'

type CardProps = {
  item: {
    id: number
    description: string
    type: 'EXPENSE' | 'INCOME'
    amount: string
    date: string
  },
  onDelete: (id: number) => void
}

export const Card = ({ item, onDelete }: CardProps) => {
  return (
    <div className='flex items-start justify-between rounded-2xl py-3 px-4 bg-gray-100'>
      <div>
        <p className='m-0 text-gray-600 text-xs pb-2'>{formatDateWithWeekday(item.date)}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-end gap-4'>
            <div>
              <p className='m-0 text-gray-600'>{item.description}</p>
              <p className='m-0 font-semibold'>{item.type === 'EXPENSE' ? 'Despesa' : 'Receita'}</p>
            </div>
            <p className='m-0 text-gray-600'>{item.type === 'EXPENSE' && '-'}{`R$${item.amount}`}</p>
          </div>
        </div>
      </div>
      <div className='flex gap-1'>
        <EditTransaction />
        <DeleteTransaction onDelete={() => onDelete(item.id)} />
      </div>
    </div>
  )
}