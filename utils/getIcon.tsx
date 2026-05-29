import { AppleIcon, ArrowUpRightIcon, BanknoteArrowUpIcon, CarTaxiFrontIcon, GemIcon, GiftIcon, HouseHeartIcon, MoreVerticalIcon, PencilIcon, PlusIcon, ScrollTextIcon, Search, Trash2Icon, VolleyballIcon, XIcon } from 'lucide-react'
import { TransactionCategory } from './types'

export type IconType = 'add' | 'edit' | 'delete' | 'expand' | 'more' | 'search' | 'close'

export const getIcon = (icon?: IconType) => {
  const iconOptions: { [key in IconType]: React.ReactNode } = {
    add: <PlusIcon />,
    edit: <PencilIcon />,
    delete: <Trash2Icon />,
    expand: <ArrowUpRightIcon />,
    more: <MoreVerticalIcon />,
    search: <Search />,
    close: <XIcon />
  }

  return icon ? iconOptions[icon] : null
}

export const getCategoryIcon = (category: TransactionCategory) => {
  const categoryIcons: { [key in TransactionCategory]: React.ReactNode } = {
    'Alimentação': <AppleIcon size={20} />,
    'Salário': <BanknoteArrowUpIcon size={20} />,
    'Investimento': <GemIcon size={20} />,
    'Casa': <HouseHeartIcon size={20} />,
    'Transporte': <CarTaxiFrontIcon size={20} />,
    'Lazer': <VolleyballIcon size={20} />,
    'Presente': <GiftIcon size={20} />,
    'Outros': <ScrollTextIcon size={20} />,
  }

  return categoryIcons[category] || null
}