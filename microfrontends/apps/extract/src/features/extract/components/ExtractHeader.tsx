import styles from '../extract.module.css'
import { Search, X } from 'lucide-react'

type ExtractHeaderProps = {
  isSearchOpen: boolean
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onToggleSearch: () => void
}

export const ExtractHeader = ({
  isSearchOpen,
  searchTerm,
  onSearchTermChange,
  onToggleSearch,
}: ExtractHeaderProps) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Extratos</h2>

      <div className={styles.searchBox}>
        {isSearchOpen ? (
          <input
            aria-label='Pesquisar transações'
            className={styles.searchInput}
            placeholder='Buscar por descrição, categoria ou data'
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />
        ) : null}

        <button className={styles.searchButton} onClick={onToggleSearch} type='button'>
          {isSearchOpen ? <X size={18} aria-hidden='true' /> : <Search size={18} aria-hidden='true' />}
          <span>{isSearchOpen ? 'Fechar' : 'Buscar'}</span>
        </button>
      </div>
    </div>
  )
}