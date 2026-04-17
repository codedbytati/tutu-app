// import { EditTransaction } from '../../../features/transactions/components/EditTransaction'
// import { DeleteTransaction } from '../../../features/transactions/components/DeleteTransaction'
// import { formatDateWithWeekday } from '@/utils/date'
// import { useTransactions } from '@/app/features/transactions/hooks/useTransactions'
import { IconButton, Text } from '@/app/components/ui'
import { CarTaxiFrontIcon, MoreVerticalIcon } from 'lucide-react'

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

export const Card = ({ item }: CardProps) => {
  // const { onAddTransactionProps } = useTransactions()

  return (
    <div className='flex items-center gap-3'>
      <div className='shrink-0 bg-black rounded-full text-white p-2'>
        <CarTaxiFrontIcon size={20} />
      </div>
      <Text appearance='body1' className='ml-10 flex-1 text-start'>
        {item.description}
      </Text>
      <Text
        appearance='body1'
        className={`m-0 shrink-0 text-end font-medium ${item.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}
      >
        {`R$${item.amount}`}
      </Text>
      <div className='flex justify-end'>
        <IconButton label='Mais ações' icon='more' />
      </div>
      {/* <div className='flex gap-1'>
        <EditTransaction
          {...onAddTransactionProps}
        />
        <DeleteTransaction
          open={mode === 'delete'}
          onClose={onClose}
          onOpenDelete={onOpenDelete}
          onDelete={() => onDelete(item.id)}
        />
      </div> */}
    </div>
  )
}