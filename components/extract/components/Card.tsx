import { Dropdown, DropdownItem, Text } from '@/components/ui'
import { ExtractItem } from '@/utils/types'
import { getCategoryIcon } from '@/utils/getIcon'
import { formatMoneyForDisplay } from '@/utils/money'
import { MoreHorizontal } from 'lucide-react'

type CardProps = {
  item: ExtractItem,
  onOpenEdit: (item: ExtractItem) => void
  onOpenDelete: (id: number) => void
}

export const Card = ({ item, onOpenEdit, onOpenDelete }: CardProps) => {
  const valueClassName = [
    'm-0 shrink-0 text-end font-medium',
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
      <div className='flex justify-end'>
        <Dropdown ariaLabel='Mais ações da transação' label={<MoreHorizontal aria-hidden='true' className='size-5' strokeWidth={2.1} />}>
          <DropdownItem onClick={() => onOpenEdit(item)}>
            <Text appearance='body1'>Editar transação</Text>
          </DropdownItem>
          <DropdownItem onClick={() => onOpenDelete(item.id)}>
            <Text appearance='body1'>Excluir transação</Text>
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}