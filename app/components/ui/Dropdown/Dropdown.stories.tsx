import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MoreVerticalIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { fn } from 'storybook/test'

import { Dropdown, DropdownItem } from './Dropdown'

type DropdownDemoProps = {
  label: ReactNode
}

const DropdownDemo = ({ label }: DropdownDemoProps) => {
  const onEdit = fn()
  const onDelete = fn()
  const onDuplicate = fn()

  return (
    <div className='min-h-52'>
      <Dropdown label={label}>
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
  },
  args: {
    label: <MoreVerticalIcon size={20} />,
  },
} satisfies Meta<typeof DropdownDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
