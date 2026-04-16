import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable button styled with Tailwind classes via tailwind-variants. Supports appearance, button type, and optional icon.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed inside the button.',
    },
    appearance: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Visual style variant.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'Native HTML button type.',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, 'add', 'edit', 'delete'],
      description: 'Optional leading icon.',
    },
    onClick: {
      action: 'clicked',
      description: 'Triggered when the user clicks the button.',
    },
  },
  args: {
    label: 'Open extract',
    appearance: 'light',
    type: 'button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    appearance: 'light',
    label: 'Transfer',
  },
};

export const Dark: Story = {
  args: {
    appearance: 'dark',
    label: 'Deposit',
  },
};

export const WithAddIcon: Story = {
  args: {
    icon: 'add',
    label: 'Add transaction',
  },
};

export const WithEditIcon: Story = {
  args: {
    icon: 'edit',
    label: 'Edit transaction',
  },
};

export const WithDeleteIcon: Story = {
  args: {
    icon: 'delete',
    label: 'Delete transaction',
  },
};
