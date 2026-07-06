import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MoreVerticalIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { fn } from 'storybook/test'

import { Dropdown, DropdownItem } from './Dropdown'

type DropdownDemoProps = {
  label: ReactNode
  ariaLabel?: string
}

const DropdownDemo = ({ label, ariaLabel }: DropdownDemoProps) => {
  const onEdit = fn()
  const onDelete = fn()
  const onDuplicate = fn()

  return (
    <div className='min-h-52'>
      <Dropdown ariaLabel={ariaLabel} label={label}>
        <DropdownItem onClick={onEdit}>Editar transação</DropdownItem>
        <DropdownItem onClick={onDuplicate}>Duplicar transação</DropdownItem>
        <DropdownItem onClick={onDelete}>Excluir transação</DropdownItem>
      </Dropdown>
    </div>
  )
}

const meta = {
  title: 'UI/Dropdown',
  component: DropdownDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown menu built with Headless UI using composition. Render actions with DropdownItem as children of Dropdown.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    label: {
      control: false,
      description: 'Trigger label shown in the dropdown button.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for icon-only triggers.',
    },
  },
  args: {
    label: <MoreVerticalIcon size={20} />,
    ariaLabel: 'Mais ações da transação',
  },
} satisfies Meta<typeof DropdownDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
