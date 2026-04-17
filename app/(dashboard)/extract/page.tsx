'use client'

import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext'
import { Card } from './components/Card'
import { IconButton, Text } from '@/app/components/ui'
import { AddTransaction } from '@/app/features/transactions/components/AddTransaction'

type ExtractProps = {
  className: string,
}

export const Extract = ({ className }: ExtractProps) => {
  const { mode, extracts, onDelete, onOpenDelete, onClose, onAddTransactionProps } = useTransactionsContext()

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
            <Card key={item.id} item={item} onDelete={onDelete} mode={mode} onClose={onClose} onOpenDelete={onOpenDelete} />
          ))
        }
      </div>
    </div>
  )
}