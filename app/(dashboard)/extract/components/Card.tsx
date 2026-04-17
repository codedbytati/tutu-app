import { EditTransaction } from '../../../features/transactions/components/EditTransaction'
import { DeleteTransaction } from '../../../features/transactions/components/DeleteTransaction'
import { type NewTransactionInput } from '@/app/features/transactions/hooks/useTransactions'
import { Dropdown, DropdownItem, Text } from '@/app/components/ui'
import { CarTaxiFrontIcon, MoreVerticalIcon } from 'lucide-react'
import { useState } from 'react'

type CardProps = {
  item: {
    id: number
    description: string
    type: 'EXPENSE' | 'INCOME'
    amount: string
    date: string
  },
  onEdit: (transaction: NewTransactionInput) => void
  onDelete: (id: number) => void
}

const toInputDate = (date: string) => {
  const [day, month, year] = date.split('/')

  if (!day || !month || !year) {
    return date
  }

  return `${year}-${month}-${day}`
}

export const Card = ({ item, onEdit, onDelete }: CardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [transaction, setTransaction] = useState<NewTransactionInput>({
    id: item.id,
    description: item.description,
    type: item.type,
    amount: item.amount,
    date: toInputDate(item.date),
  })

  const handleOpenEdit = () => {
    setTransaction({
      id: item.id,
      description: item.description,
      type: item.type,
      amount: item.amount,
      date: toInputDate(item.date),
    })
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    onEdit({ ...transaction, id: item.id })
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    onDelete(item.id)
    setIsDeleteOpen(false)
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='shrink-0 bg-black rounded-full text-white p-2'>
        <CarTaxiFrontIcon size={20} />
      </div>
      <Text appearance='body1' className='ml-10 flex-1 text-start'>
        {item.description}
      </Text>
      <Text
        appearance='body1'
        className={`m-0 shrink-0 text-end font-medium ${item.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}
      >
        {`R$${item.amount}`}
      </Text>
      <div className='flex justify-end'>
        <Dropdown label={<MoreVerticalIcon size={20} />}>
          <DropdownItem onClick={handleOpenEdit}>
            <Text appearance='body1'>Editar transação</Text>
          </DropdownItem>
          <DropdownItem onClick={() => setIsDeleteOpen(true)}>
            <Text appearance='body1'>Excluir transação</Text>
          </DropdownItem>
        </Dropdown>
      </div>
      <EditTransaction
        transaction={transaction}
        setTransaction={setTransaction}
        open={isEditOpen}
        onAdd={handleSaveEdit}
        onClose={() => setIsEditOpen(false)}
      />
      <DeleteTransaction
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  )
}