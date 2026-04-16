'use client'

import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext'
import { AddTransaction } from '../../features/transactions/components/AddTransaction'
import { Card } from './components/Card'
import { Text } from '@/app/components/ui'

type ExtractProps = {
  className: string,
}

export const Extract = ({ className }: ExtractProps) => {
  const { mode, extracts, onAddTransactionProps, onDelete, onOpenDelete, onClose } = useTransactionsContext()

  return (
    <div className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`}>
      <div className='flex justify-between items-center'>
        <Text appearance='h2'>Extrato</Text>
        <AddTransaction {...onAddTransactionProps} />
      </div>
      {
        extracts.map((item) => (
          <Card key={item.id} item={item} onDelete={onDelete} mode={mode} onClose={onClose} onOpenDelete={onOpenDelete} />
        ))
      }
    </div>
  )
}