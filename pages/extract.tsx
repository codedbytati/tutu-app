import { DeleteTransaction } from '@/features/transactions/components/DeleteTransaction'
import { EditTransaction } from '@/features/transactions/components/EditTransaction'
import { useTransactionsContext } from '@/features/transactions/context/TransactionsContext'

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default function ExtractPage() {
  const {
    onEditTransactionProps,
    onDeleteTransactionProps,
  } = useTransactionsContext()

  return (
    <div className='flex flex-col gap-4'>
      <iframe
        title='Extract microfrontend'
        src='http://localhost:5001'
        className='h-225 w-full border-0'
      />
      <EditTransaction {...onEditTransactionProps} />
      <DeleteTransaction {...onDeleteTransactionProps} />
    </div>
  )
}