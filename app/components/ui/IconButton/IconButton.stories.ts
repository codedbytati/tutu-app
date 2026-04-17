import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { IconButton } from './IconButton';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon-only button built with Tailwind classes via tailwind-variants. It supports light and dark appearances, optional icons, and click actions.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label used by aria-label.',
    },
    appearance: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Visual style variant.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, 'add', 'edit', 'delete'],
      description: 'Icon rendered inside the button.',
    },
    onClick: {
      action: 'clicked',
      description: 'Triggered when the user clicks the icon button.',
    },
  },
  args: {
    label: 'Add transaction',
    appearance: 'light',
    icon: 'add',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    appearance: 'light',
    icon: 'add',
    label: 'Add transaction',
  },
};

export const Dark: Story = {
  args: {
    appearance: 'dark',
    icon: 'edit',
    label: 'Edit transaction',
  },
};

export const DeleteAction: Story = {
  args: {
    appearance: 'light',
    icon: 'delete',
    label: 'Delete transaction',
  },
};
