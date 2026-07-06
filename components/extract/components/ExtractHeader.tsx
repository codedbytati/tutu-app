import { IconButton, Text, TextField } from '@/components/ui'
import { tv } from 'tailwind-variants'

const makeSearchFieldStyle = tv({
  base: 'absolute inset-0 flex items-center justify-end transition-all duration-200 ease-out',
  variants: {
    isOpen: {
      true: 'translate-x-0 opacity-100',
      false: 'pointer-events-none translate-x-6 opacity-0',
    },
  },
})

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
    <div className='flex items-center justify-between gap-4'>
      <Text appearance='h2'>Extratos</Text>

      <div className='relative h-11 w-full max-w-[18rem] shrink-0 overflow-hidden'>
        <div className={makeSearchFieldStyle({ isOpen: isSearchOpen })}>
          <TextField
            variant='compact'
            label='Pesquisar transações'
            placeholder='Buscar por descrição, categoria ou data'
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            className='w-full pr-12'
            containerClassName='h-11 w-full'
          />
        </div>

        <div className='absolute inset-y-0 right-0 z-10 flex items-center'>
          <IconButton
            icon={isSearchOpen ? 'close' : 'search'}
            label={isSearchOpen ? 'Fechar filtro' : 'Filtrar transações'}
            onClick={onToggleSearch}
          />
        </div>
      </div>
    </div>
  )
}