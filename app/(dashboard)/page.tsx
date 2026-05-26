'use client'

import { AddTransaction } from '@/app/features/transactions/components/AddTransaction';
import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext';
import { Chart } from './components/Chart';
import { Extract } from './extract/page';

export default function DashboardPage() {
  const { onAddTransactionProps } = useTransactionsContext()

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-start'>
        <AddTransaction {...onAddTransactionProps} />
      </div>
      <Chart />
      <Extract />
    </div>
  );
}