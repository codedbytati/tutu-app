import styles from './extract.module.css'
import { useExtractList } from './useExtractList'
import type { ExtractItem } from './types'
import { ExtractCard } from './components/ExtractCard'
import { ExtractHeader } from './components/ExtractHeader'

export type ExtractListProps = {
  extracts: ExtractItem[]
  onOpenEdit: (item: ExtractItem) => void
  onOpenDelete: (id: number) => void
  className?: string
}

export default function ExtractList({
  extracts,
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
    <div className={`${styles.shell} ${className ?? ''}`.trim()}>
      <section className={styles.panel}>
        <ExtractHeader
          isSearchOpen={openSearchField}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onToggleSearch={() => setOpenSearchField((currentValue) => !currentValue)}
        />

        <div className={styles.group}>
          {groupedExtracts.map((group) => (
            <div key={group.date} className={styles.groupBlock}>
              <p className={styles.groupLabel}>{group.label}</p>
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
            <div className={styles.emptyState}>
              Nenhuma transação encontrada para esta busca.
            </div>
          ) : null}
        </div>

        <div className={styles.pagination}>
          <button
            className={`${styles.paginationButton} ${safeCurrentPage <= 1 ? styles.paginationButtonDisabled : ''}`.trim()}
            disabled={safeCurrentPage <= 1}
            onClick={() => setCurrentPage((currentPage) => Math.max(1, currentPage - 1))}
            type='button'
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`${styles.paginationButton} ${safeCurrentPage === page ? styles.paginationButtonActive : ''}`.trim()}
              onClick={() => setCurrentPage(page)}
              type='button'
            >
              {page}
            </button>
          ))}

          <button
            className={`${styles.paginationButton} ${safeCurrentPage >= totalPages ? styles.paginationButtonDisabled : ''}`.trim()}
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