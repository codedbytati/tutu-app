import { ExtractItem } from '@/utils/types';
import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext';
import { IconButton, Text } from '@/app/components/ui';
import { Card } from '../extract/components/Card';

type ShortExtractProps = {
  transactions: ExtractItem[]
}

export const ShortExtract = ({ transactions }: ShortExtractProps) => {
  const { onOpenEdit, onOpenDelete } = useTransactionsContext()

  return (
    <section className='rounded-4xl bg-white p-6'>
      <div className='flex items-center justify-between'>
        <Text appearance='h2'>Extratos recentes</Text>
        <IconButton icon='expand' label='Expandir seção de Extratos' href='/extract' />
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {transactions.map((item) => (
          <Card key={item.id} item={item} onOpenEdit={onOpenEdit} onOpenDelete={onOpenDelete} />
        ))}
      </div>
    </section>
  )
}