export const makeNavigationButtonStyle = () =>
  'cursor-pointer rounded-full border border-transparent bg-transparent px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-secondary'

export const makePageButtonStyle = ({ isSelected }: { isSelected: boolean }) =>
  [
    'bg-transparent min-w-10 cursor-pointer rounded-full p-2 text-sm font-medium transition-colors',
    isSelected ? 'bg-primary' : 'hover:bg-secondary',
  ].join(' ')
