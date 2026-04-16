import { EditTransaction } from '../../../features/transactions/components/EditTransaction'
import { DeleteTransaction } from '../../../features/transactions/components/DeleteTransaction'
import { formatDateWithWeekday } from '@/utils/date'
import { useTransactions } from '@/app/features/transactions/hooks/useTransactions'

type CardProps = {
  item: {
    id: number
    description: string
    type: 'EXPENSE' | 'INCOME'
    amount: string
    date: string
  },
  mode: 'none' | 'add' | 'edit' | 'delete'
  onDelete: (id: number) => void
  onClose: () => void
  onOpenDelete: () => void
}

export const Card = ({ mode, item, onDelete, onOpenDelete, onClose }: CardProps) => {
  const { onAddTransactionProps } = useTransactions()

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
        <EditTransaction
          {...onAddTransactionProps}
        />
        <DeleteTransaction
          open={mode === 'delete'}
          onClose={onClose}
          onOpenDelete={onOpenDelete}
          onDelete={() => onDelete(item.id)}
        />
      </div>
    </div>
  )
}