import { AddTransaction } from '@/features/transactions/components/AddTransaction'
import { useTransactionsContext } from '@/features/transactions/context/TransactionsContext'
import { Chart } from '@/components/dashboard/Chart'
import { ShortExtract } from '@/components/dashboard/ShortExtract'

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default function DashboardPage() {
  const { extracts } = useTransactionsContext()
  const recentTransactions = extracts.slice(0, 3)

  return (
    <div className='flex flex-col gap-4'>
      <Chart />
      <ShortExtract transactions={recentTransactions} />
    </div>
  )
}