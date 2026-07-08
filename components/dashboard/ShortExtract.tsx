import type { ExtractItem } from '@/utils/types';
import { IconButton, Text } from '@/components/ui';
import { Card } from '../extract/components/Card';

type ShortExtractProps = {
  transactions: ExtractItem[]
}

export const ShortExtract = ({ transactions }: ShortExtractProps) => {
  return (
    <section className='rounded-4xl border border-white/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <Text appearance='h2'>Extratos recentes</Text>
        <IconButton icon='expand' label='Expandir seção de Extratos' href='/extract' />
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {transactions.map((item) => (
          <Card key={String(item.id)} item={item} />
        ))}
      </div>
    </section>
  )
}