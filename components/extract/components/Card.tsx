import { Text } from '@/components/ui'
import { ExtractItem } from '@/utils/types'
import { getCategoryIcon } from '@/utils/getIcon'
import { formatMoneyForDisplay } from '@/utils/money'

type CardProps = {
  item: ExtractItem,
}

export const Card = ({ item }: CardProps) => {
  const valueClassName = [
    'm-0 shrink-0 text-end font-semibold',
    item.type === 'EXPENSE' ? 'text-red-600' : 'text-lime-700',
  ].join(' ')

  return (
    <div className='flex items-center gap-3'>
      <div className='shrink-0 bg-black rounded-full text-white p-2'>
        {getCategoryIcon(item.category)}
      </div>
      <Text appearance='body1' className='ml-10 flex-1 text-start'>
        {item.description}
      </Text>
      <Text appearance='body1' className={valueClassName}>
        {formatMoneyForDisplay(item.amount)}
      </Text>
    </div>
  )
}