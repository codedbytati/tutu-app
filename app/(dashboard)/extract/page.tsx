'use client'

import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext'
import { Card } from './components/Card'
import { IconButton, Text } from '@/app/components/ui'
import { AddTransaction } from '@/app/features/transactions/components/AddTransaction'
import { EditTransaction } from '@/app/features/transactions/components/EditTransaction'
import { DeleteTransaction } from '@/app/features/transactions/components/DeleteTransaction'

type ExtractProps = {
  className: string,
}

export const Extract = ({ className }: ExtractProps) => {
  const {
    extracts,
    onOpenEdit,
    onOpenDelete,
    onAddTransactionProps,
    onEditTransactionProps,
    onDeleteTransactionProps,
  } = useTransactionsContext()

  return (
    <div className={className}>
      <AddTransaction {...onAddTransactionProps} />
      <div className='flex flex-col gap-3 p-6 bg-white rounded-4xl mt-6'>
        <div className='flex justify-between items-center'>
          <Text appearance='h2'>Extrato</Text>
          <IconButton icon='expand' label='Expandir seção de Extratos' />
        </div>
        <Text appearance='body1' className='text-gray-500'>Hoje</Text>
        {
          extracts.map((item) => (
            <Card key={item.id} item={item} onOpenEdit={onOpenEdit} onOpenDelete={onOpenDelete} />
          ))
        }
      </div>
      <EditTransaction {...onEditTransactionProps} />
      <DeleteTransaction {...onDeleteTransactionProps} />
    </div>
  )
}