'use client'

import { useState } from 'react'
import { AddTransaction } from '../../features/transactions/components/AddTransaction'
import { Card } from './components/Card'


type ExtractProps = {
  data: {
    id: number
    description: string
    type: 'EXPENSE' | 'INCOME'
    amount: string
    date: string
  }[],
  className: string
}

export const Extract = ({ data, className }: ExtractProps) => {
  const [extracts, setExtracts] = useState(data)

  const handleDeleteTransaction = (id: number) => {
    setExtracts((currentExtracts) => currentExtracts.filter((item) => item.id !== id))
  }

  return (
    <div className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`}>
      <div className='flex justify-between items-center'>
        <h2 className='fs-4 m-0'>Extrato</h2>
        <AddTransaction />
      </div>
      {
        extracts.map((item) => (
          <Card key={item.id} item={item} onDelete={handleDeleteTransaction} />
        ))
      }
    </div>
  )
}