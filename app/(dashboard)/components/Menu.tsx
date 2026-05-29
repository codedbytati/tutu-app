"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Text } from '@/app/components/ui'
import { ArrowLeftRightIcon, ChartSplineIcon, HomeIcon, SettingsIcon } from 'lucide-react'

type MenuProps = {
  className: string
}

const menuItems = [
  {
    href: '/',
    label: 'Início',
    Icon: HomeIcon
  },
  {
    href: '/extract',
    label: 'Extrato',
    Icon: ArrowLeftRightIcon
  },
  {
    href: '/investimentos',
    label: 'Investimento',
    Icon: ChartSplineIcon
  },
  {
    href: '/servicos',
    label: 'Outros serviços',
    Icon: SettingsIcon
  }
]

export const Menu = ({ className }: MenuProps) => {
  const pathname = usePathname()

  return (
    <nav className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`} aria-label='Navegação principal'>
      {menuItems.map(({ href, label, Icon }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-lg p-3 transition-colors cursor-pointer ${
              isActive ? 'bg-primary' : 'hover:bg-secondary'
            }`}
          >
            <Icon size={20} />
            <Text appearance='body1' className='font-semibold'>{label}</Text>
          </Link>
        )
      })}
    </nav>
  )
}