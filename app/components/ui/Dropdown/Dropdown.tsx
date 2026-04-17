import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import type { ReactNode } from 'react'

type DropdownProps = {
  children: ReactNode
  label?: ReactNode
}

type DropdownItemProps = {
  children: ReactNode
  onClick?: () => void
}

const Dropdown = ({ children, label }: DropdownProps) => {
  return (
    <Menu>
      <MenuButton className='cursor-pointer rounded-full p-2 transition-colors hover:bg-secondary focus-visible:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25'>
        {label}
      </MenuButton>
      <MenuItems anchor="bottom" className="mt-2 flex min-w-44 flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-2xl focus:outline-none">
        {children}
      </MenuItems>
    </Menu>
  )
}

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  return (
    <MenuItem>
      <button
        onClick={onClick}
        className='w-full cursor-pointer rounded-md px-3 py-2 text-left transition-colors hover:bg-secondary focus:bg-primary focus-visible:bg-primary focus-visible:outline-none'
      >
        {children}
      </button>
    </MenuItem>
  )
}

export { Dropdown, DropdownItem }