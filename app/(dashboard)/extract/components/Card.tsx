import { Dropdown, DropdownItem, Text } from '@/app/components/ui'
import { MoreVerticalIcon } from 'lucide-react'
import { ExtractItem } from '@/utils/types'
import { getCategoryIcon } from '@/utils/getIcon'
import { formatMoneyForDisplay } from '@/utils/money'

type CardProps = {
  item: ExtractItem,
  onOpenEdit: (item: ExtractItem) => void
  onOpenDelete: (id: number) => void
}

export const Card = ({ item, onOpenEdit, onOpenDelete }: CardProps) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='shrink-0 bg-black rounded-full text-white p-2'>
        {getCategoryIcon(item.category)}
      </div>
      <Text appearance='body1' className='ml-10 flex-1 text-start'>
        {item.description}
      </Text>
      <Text
        appearance='body1'
        className={`m-0 shrink-0 text-end font-medium ${item.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}
      >
        {formatMoneyForDisplay(item.amount)}
      </Text>
      <div className='flex justify-end'>
        <Dropdown label={<MoreVerticalIcon size={20} />}>
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