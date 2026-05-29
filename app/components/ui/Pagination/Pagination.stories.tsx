import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Pagination } from './Pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Controlled pagination for design-system usage. The parent owns the page state, while the component handles page controls, labels, and the selected-page styling.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Current selected page.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Total number of pages to display.',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Called when the user navigates to another page.',
    },
    nextLabel: {
      control: 'text',
      description: 'Label for the next-page button.',
    },
    previousLabel: {
      control: 'text',
      description: 'Label for the previous-page button.',
    },
    hideWhenSinglePage: {
      control: 'boolean',
      description: 'Hides the pagination when there is only one page.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    currentPage: 1,
    totalPages: 5,
    nextLabel: 'Próxima',
    previousLabel: 'Anterior',
    hideWhenSinglePage: true,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const InteractivePagination = (args: Story['args']) => {
  const [currentPage, setCurrentPage] = useState(args?.currentPage ?? 1)

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page)
        args?.onPageChange?.(page)
      }}
    />
  )
}

export const Default: Story = {
  render: InteractivePagination,
}

export const MiddlePage: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 3,
    totalPages: 5,
  },
}

export const LastPage: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 5,
    totalPages: 5,
  },
}

export const SinglePageHidden: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
}