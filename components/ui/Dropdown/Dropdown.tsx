import { useState, type ReactNode } from 'react'

type DropdownProps = {
  children: ReactNode
  label?: ReactNode
  ariaLabel?: string
}

type DropdownItemProps = {
  children: ReactNode
  onClick?: () => void
}

const Dropdown = ({ children, label, ariaLabel }: DropdownProps) => {
  const accessibleLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative inline-block'>
      <button
        type='button'
        aria-label={accessibleLabel}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className='cursor-pointer rounded-full p-2 transition-colors hover:bg-secondary focus-visible:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25'
      >
        {label}
      </button>
      {isOpen ? (
        <div className='absolute right-0 z-20 mt-2 flex min-w-44 flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-2xl'>
          {children}
        </div>
      ) : null}
    </div>
  )
}

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className='w-full cursor-pointer rounded-md px-3 py-2 text-left transition-colors hover:bg-secondary focus:bg-primary focus-visible:bg-primary focus-visible:outline-none'
    >
      {children}
    </button>
  )
}

export { Dropdown, DropdownItem }