import { useState } from 'react'

import { formatMoneyForDisplay } from '../money'
import type { ExtractItem } from '../types'
import styles from '../extract.module.css'
import {
  Banknote,
  BusFront,
  CircleHelp,
  Gift,
  House,
  ChartColumn,
  Landmark,
  MoreHorizontal,
  PartyPopper,
  PencilLine,
  Trash2,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

const categoryIconByType: Record<ExtractItem['category'], LucideIcon> = {
  'Alimentação': UtensilsCrossed,
  'Salário': Banknote,
  'Investimento': ChartColumn,
  'Casa': House,
  'Transporte': BusFront,
  'Lazer': PartyPopper,
  'Presente': Gift,
  'Outros': CircleHelp,
}

type ExtractCardProps = {
  item: ExtractItem
  onOpenEdit: (item: ExtractItem) => void
  onOpenDelete: (id: number) => void
}

export const ExtractCard = ({ item, onOpenEdit, onOpenDelete }: ExtractCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const amountClass = item.type === 'EXPENSE' ? styles.amountExpense : styles.amountIncome
  const CategoryIcon = categoryIconByType[item.category]

  return (
    <div className={styles.card}>
      <div className={styles.avatar} aria-hidden='true'>
        <CategoryIcon size={16} strokeWidth={2.4} aria-hidden='true' />
      </div>

      <p className={styles.description}>{item.description}</p>

      <p className={amountClass}>{formatMoneyForDisplay(item.amount)}</p>

      <div className={styles.actions}>
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type='button'
          aria-label='Mais ações da transação'
        >
          <MoreHorizontal size={16} strokeWidth={2.4} aria-hidden='true' />
        </button>
        {isMenuOpen ? (
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                setIsMenuOpen(false)
                onOpenEdit(item)
              }}
              type='button'
            >
              <PencilLine size={16} aria-hidden='true' />
              <span>Editar transação</span>
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                setIsMenuOpen(false)
                onOpenDelete(item.id)
              }}
              type='button'
            >
              <Trash2 size={16} aria-hidden='true' />
              <span>Excluir transação</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}