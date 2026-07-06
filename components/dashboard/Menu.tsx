"use client"

import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChartColumn, House, Settings2, ArrowLeftRight } from 'lucide-react'

import { Text } from '@/components/ui'

type MenuProps = {
  className: string
}

const menuItems = [
  {
    href: '/',
    label: 'Início',
    icon: House
  },
  {
    href: '/extract',
    label: 'Extrato',
    icon: ArrowLeftRight
  },
  {
    href: '/investimentos',
    label: 'Investimento',
    icon: ChartColumn
  },
  {
    href: '/servicos',
    label: 'Outros serviços',
    icon: Settings2
  }
]

export const Menu = ({ className }: MenuProps) => {
  const { pathname } = useRouter()

  return (
    <nav className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`} aria-label='Navegação principal'>
      {menuItems.map(({ href, label, icon }) => {
        const isActive = pathname === href
        const Icon = icon

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-lg p-3 transition-colors cursor-pointer ${
              isActive ? 'bg-primary' : 'hover:bg-secondary'
            }`}
          >
            <Icon aria-hidden='true' className='size-5 shrink-0' strokeWidth={2.1} />
            <Text appearance='body1' className='font-semibold'>{label}</Text>
          </Link>
        )
      })}
    </nav>
  )
}