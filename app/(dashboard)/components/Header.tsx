'use client'

import { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { Menu } from '../components/Menu'
import { Avatar, Text } from '@/app/components/ui'

type HeaderProps = {
  name: string
  className: string
}

export const Header = ({ name, className }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className={`flex px-6 py-4 bg-white rounded-4xl ${className}`}>
      <div className='h-full flex items-center pr-4 sm:hidden'>
        <button
          type='button'
          onClick={() => setIsMobileMenuOpen(true)}
          className='bg-gray-100 rounded-circle p-2'
          aria-label='Abrir menu de navegação'
        >
          <MenuIcon size={20} />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-black/30 sm:hidden'>
          <div className='h-full w-72 bg-gray-100 p-4'>
            <div className='mb-2 flex justify-end'>
              <button
                type='button'
                onClick={() => setIsMobileMenuOpen(false)}
                className='rounded-circle bg-white p-2'
                aria-label='Fechar menu de navegação'
              >
                <XIcon size={20} />
              </button>
            </div>
            <Menu className='h-full' />
          </div>
        </div>
      )}
      <div className='flex items-center gap-3'>
        <Avatar size='xl' photoToken='https://avatars.githubusercontent.com/u/56259137' title={name} />
        <div className='flex flex-col'>
          <Text appearance='body1' className='text-gray-300'>Boas vindas de volta!</Text>
          <Text appearance='h1'>{name}</Text>
        </div>
      </div>
    </header>
  )
}