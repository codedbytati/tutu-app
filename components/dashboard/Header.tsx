'use client'

import { useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { Menu } from './Menu'
import { Avatar, Text } from '@/components/ui'

type HeaderProps = {
  name: string
  className: string
}

export const Header = ({ name, className }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className={`flex rounded-[2rem] border border-white/70 bg-white/90 px-6 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm ${className}`}>
      <div className='h-full flex items-center pr-4 sm:hidden'>
        <button
          type='button'
          onClick={() => setIsMobileMenuOpen(true)}
          className='rounded-circle bg-slate-100 p-2 transition-colors hover:bg-slate-200'
          aria-label='Abrir menu de navegação'
        >
          <MenuIcon aria-hidden='true' className='size-5' strokeWidth={2.1} />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-black/30 sm:hidden'>
          <div className='h-full w-72 bg-slate-100 p-4'>
            <div className='mb-2 flex justify-end'>
              <button
                type='button'
                onClick={() => setIsMobileMenuOpen(false)}
                className='rounded-circle bg-white p-2 shadow-sm'
                aria-label='Fechar menu de navegação'
              >
                  <X aria-hidden='true' className='size-5' strokeWidth={2.1} />
              </button>
            </div>
            <Menu className='h-full' />
          </div>
        </div>
      )}
      <div className='flex items-center gap-3'>
        <Avatar size='xl' photoToken='https://avatars.githubusercontent.com/u/56259137' title={name} />
        <div className='flex flex-col'>
          <Text appearance='body1' className='text-slate-500'>Boas vindas de volta!</Text>
          <Text appearance='h1'>{name}</Text>
        </div>
      </div>
    </header>
  )
}