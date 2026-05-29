'use client'

import { AddTransaction } from '@/app/features/transactions/components/AddTransaction';
import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext';
import { Chart } from './components/Chart';
import { ShortExtract } from './components/ShortExtract';

export default function DashboardPage() {
  const { onAddTransactionProps, extracts } = useTransactionsContext()
    const recentTransactions = extracts.slice(0, 3)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-start'>
        <AddTransaction {...onAddTransactionProps} />
      </div>
      <Chart />
      <ShortExtract transactions={recentTransactions} />
    </div>
  );
}