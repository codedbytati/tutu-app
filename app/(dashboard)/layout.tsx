
'use client'

import { Header } from './components/Header'
import { Menu } from './components/Menu';
import { CurrentBalance } from './components/CurrentBalance';
import { data } from '@/utils/data';
import { TransactionsProvider } from '../features/transactions/context/TransactionsContext';
import { useTransactionsContext } from '../features/transactions/context/TransactionsContext';

function DashboardLayoutContent({ children }: Readonly<{ children: React.ReactNode }>) {
  const { balance } = useTransactionsContext()

  return (
    <div className='min-h-screen overflow-y-auto bg-[#f6f7fb] p-4 lg:p-6'>
      <div className='grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]'>
        <Menu className='hidden lg:flex lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]' />
        <div className='grid gap-4'>
          <Header
            className='w-full'
            name={data.name}
          />
          <div className='grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start'>
            <main className='min-w-0'>
              {children}
            </main>
            <CurrentBalance
              className='h-fit w-full xl:sticky xl:top-6'
              balance={balance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <TransactionsProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </TransactionsProvider>
  );
}
