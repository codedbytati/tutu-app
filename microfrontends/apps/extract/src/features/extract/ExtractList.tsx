import { tv } from 'tailwind-variants'

import { useExtractList } from './useExtractList'
import type { ExtractItem } from './types'
import { ExtractCard } from './components/ExtractCard'
import { ExtractHeader } from './components/ExtractHeader'

const makePanelStyle = tv({
  base: 'rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm',
})

const makeGroupLabelStyle = tv({
  base: 'm-0 text-sm font-semibold text-slate-500',
})

const makeEmptyStateStyle = tv({
  base: 'rounded-3xl border border-dashed border-slate-200 px-5 py-8 text-center text-slate-500',
})

const makePaginationButtonStyle = tv({
  base: 'min-w-11 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-900 transition-colors disabled:cursor-not-allowed disabled:opacity-45',
  variants: {
    active: {
      true: 'border-primary bg-primary text-white',
      false: 'hover:bg-secondary',
    },
  },
})

export type ExtractListProps = {
  extracts: ExtractItem[]
  onOpenCreate: () => void
  onOpenEdit: (item: ExtractItem) => void
  onOpenDelete: (id: string) => void
  className?: string
}

export default function ExtractList({
  extracts,
  onOpenCreate,
  onOpenEdit,
  onOpenDelete,
  className,
}: ExtractListProps) {
  const {
    groupedExtracts,
    filteredExtracts,
    totalPages,
    safeCurrentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    openSearchField,
    setOpenSearchField,
  } = useExtractList({ extracts })

  return (
    <div className={`flex flex-col gap-5 ${className ?? ''}`.trim()}>
      <section className={makePanelStyle()}>
        <ExtractHeader
          isSearchOpen={openSearchField}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onToggleSearch={() => setOpenSearchField((currentValue) => !currentValue)}
          onOpenCreate={onOpenCreate}
        />

        <div className='flex flex-col gap-4'>
          {groupedExtracts.map((group) => (
            <div key={group.date} className='flex flex-col gap-3'>
              <p className={makeGroupLabelStyle()}>{group.label}</p>
              {group.items.map((item) => (
                <ExtractCard
                  key={item.id}
                  item={item}
                  onOpenEdit={onOpenEdit}
                  onOpenDelete={onOpenDelete}
                />
              ))}
            </div>
          ))}

          {filteredExtracts.length === 0 ? (
            <div className={makeEmptyStateStyle()}>
              Nenhuma transação encontrada para esta busca.
            </div>
          ) : null}
        </div>

        <div className='flex flex-wrap items-center justify-center gap-2 pt-1'>
          <button
            className={makePaginationButtonStyle({ active: false })}
            disabled={safeCurrentPage <= 1}
            onClick={() => setCurrentPage((currentPage) => Math.max(1, currentPage - 1))}
            type='button'
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={makePaginationButtonStyle({ active: safeCurrentPage === page })}
              onClick={() => setCurrentPage(page)}
              type='button'
            >
              {page}
            </button>
          ))}

          <button
            className={makePaginationButtonStyle({ active: false })}
            disabled={safeCurrentPage >= totalPages}
            onClick={() => setCurrentPage((currentPage) => Math.min(totalPages, currentPage + 1))}
            type='button'
          >
            Próxima
          </button>
        </div>
      </section>
    </div>
  )
}