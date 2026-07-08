import { useState } from 'react'

import { formatMoneyForDisplay } from '../money'
import type { ExtractItem } from '../types'
import { tv } from 'tailwind-variants'
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

const makeCardAmountStyle = tv({
  base: 'm-0 shrink-0 whitespace-nowrap font-semibold',
  variants: {
    type: {
      EXPENSE: 'text-red-600',
      INCOME: 'text-emerald-700',
    },
  },
})

const makeCardDropdownStyle = tv({
  base: 'absolute right-0 z-20 mt-2 flex min-w-44 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_48px_rgba(15,23,42,0.22)]',
})

const makeCardDropdownItemStyle = tv({
  base: 'flex w-full items-center gap-2 rounded-xl border-0 bg-transparent px-3 py-2 text-left text-slate-900 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none',
})

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
  onOpenDelete: (id: string) => void
}

export const ExtractCard = ({ item, onOpenEdit, onOpenDelete }: ExtractCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const CategoryIcon = categoryIconByType[item.category]

  return (
    <div className='flex items-center gap-3 rounded-2xl px-0 py-0'>
      <div className='grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-white' aria-hidden='true'>
        <CategoryIcon size={16} strokeWidth={2.4} aria-hidden='true' />
      </div>

      <p className='m-0 flex-1 text-start text-slate-900'>{item.description}</p>

      <p className={makeCardAmountStyle({ type: item.type })}>{formatMoneyForDisplay(item.amount)}</p>

      <div className='relative inline-block'>
        <button
          className='rounded-full border-0 bg-transparent p-2 text-slate-900 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none'
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type='button'
          aria-label='Mais ações da transação'
        >
          <MoreHorizontal size={16} strokeWidth={2.4} aria-hidden='true' />
        </button>
        {isMenuOpen ? (
          <div className={makeCardDropdownStyle()}>
            <button
              className={makeCardDropdownItemStyle()}
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
              className={makeCardDropdownItemStyle()}
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