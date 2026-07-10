import { Search, X } from 'lucide-react'

type ExtractHeaderProps = {
  isSearchOpen: boolean
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onToggleSearch: () => void
  onOpenCreate: () => void
}

export const ExtractHeader = ({
  isSearchOpen,
  searchTerm,
  onSearchTermChange,
  onToggleSearch,
  onOpenCreate,
}: ExtractHeaderProps) => {
  return (
    <div className='mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
      <div className='flex max-w-135 flex-col gap-2'>
        <h2 className='m-0 text-[clamp(1.4rem,2vw,1.8rem)] font-bold leading-tight text-slate-900'>Extrato</h2>
        <p className='m-0 leading-7 text-slate-600'>Consulte os lançamentos, busque por conteúdo e abra o editor para criar ou ajustar a transação.</p>
      </div>

      <div className='flex flex-wrap items-center justify-end gap-3'>
        <button className='rounded-full border-0 cursor-pointer bg-[linear-gradient(135deg,#111827_0%,#334155_100%)] px-5 py-3 font-bold text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]' onClick={onOpenCreate} type='button'>
          Nova transação
        </button>

        <div className='relative h-11 w-full overflow-hidden md:w-[18rem]'>
          {isSearchOpen ? (
            <input
              aria-label='Pesquisar transações'
              className='h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 pr-14 text-sm text-slate-900 outline-none focus:border-slate-400'
              placeholder='Buscar por descrição, categoria ou data'
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
            />
          ) : null}

          <button className='absolute right-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-[14px] border-0 bg-primary px-4 py-2 font-semibold text-white' onClick={onToggleSearch} type='button'>
            {isSearchOpen ? <X size={18} aria-hidden='true' /> : <Search size={18} aria-hidden='true' />}
            <span>{isSearchOpen ? 'Fechar' : 'Buscar'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}