'use client'

import { useTransactionsContext } from '@/app/features/transactions/context/TransactionsContext'
import { Pagination, Text } from '@/app/components/ui'
import { EditTransaction } from '@/app/features/transactions/components/EditTransaction'
import { DeleteTransaction } from '@/app/features/transactions/components/DeleteTransaction'
import { Card } from './components/Card'
import { ExtractHeader } from './components/ExtractHeader'
import { useExtractList } from './hooks/useExtractList'

type ExtractListProps = {
  className?: string,
}

export const ExtractList = ({ className }: ExtractListProps) => {
  const {
    extracts,
    onOpenEdit,
    onOpenDelete,
    onEditTransactionProps,
    onDeleteTransactionProps,
  } = useTransactionsContext()
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
    <div className={className}>
      <div className='flex flex-col gap-3 rounded-4xl bg-white p-6'>
        <ExtractHeader
          isSearchOpen={openSearchField}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onToggleSearch={() => setOpenSearchField((currentValue) => !currentValue)}
        />

        {groupedExtracts.map((group) => (
          <div key={group.date} className='flex flex-col gap-3'>
            <Text appearance='body2' className='text-gray-500'>
              {group.label}
            </Text>
            {group.items.map((item) => (
              <Card key={item.id} item={item} onOpenEdit={onOpenEdit} onOpenDelete={onOpenDelete} />
            ))}
          </div>
        ))}

        {filteredExtracts.length === 0 && (
          <div className='rounded-3xl border border-dashed border-slate-200 px-4 py-8 text-center'>
            <Text appearance='body2' className='text-slate-500'>
              Nenhuma transação encontrada para esta busca.
            </Text>
          </div>
        )}

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <EditTransaction {...onEditTransactionProps} />
      <DeleteTransaction {...onDeleteTransactionProps} />
    </div>
  )
}
