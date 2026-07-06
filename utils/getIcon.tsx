import { TransactionCategory } from './types'
import {
  ArrowUpRight,
  ChartColumn,
  CircleHelp,
  House,
  Landmark,
  MoreHorizontal,
  PencilLine,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
  type LucideIcon,
} from 'lucide-react'

type IconComponent = LucideIcon

export type IconType = 'add' | 'edit' | 'delete' | 'expand' | 'more' | 'search' | 'close'

export const getIcon = (icon?: IconType) => {
  const iconOptions: { [key in IconType]: IconComponent } = {
    add: Plus,
    edit: PencilLine,
    delete: Trash2,
    expand: ArrowUpRight,
    more: MoreHorizontal,
    search: Search,
    close: X,
  }

  const Icon = icon ? iconOptions[icon] : null

  return Icon ? <Icon aria-hidden='true' /> : null
}

export const getCategoryIcon = (category: TransactionCategory) => {
  const categoryIcons: { [key in TransactionCategory]: IconComponent } = {
    'Alimentação': ShoppingCart,
    'Salário': Landmark,
    'Investimento': ChartColumn,
    'Casa': House,
    'Transporte': ArrowUpRight,
    'Lazer': MoreHorizontal,
    'Presente': CircleHelp,
    'Outros': CircleHelp,
  }

  const Icon = categoryIcons[category] || null

  return Icon ? <Icon aria-hidden='true' /> : null
}