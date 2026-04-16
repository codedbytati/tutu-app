import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { TextField } from './TextField';

const meta = {
  title: 'UI/Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable input field for text, money-style numeric values, and dates. Supports controlled usage through value/onChange and optional min/max/step constraints.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label rendered above the input.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty.',
    },
    type: {
      control: 'inline-radio',
      options: ['text', 'number', 'date'],
      description: 'Native HTML input type.',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    id: {
      control: 'text',
      description: 'Input id used by the label htmlFor.',
    },
    name: {
      control: 'text',
      description: 'Input name attribute for forms.',
    },
    value: {
      control: 'text',
      description: 'Controlled input value.',
    },
    min: {
      control: 'text',
      description: 'Minimum value for number/date types.',
    },
    max: {
      control: 'text',
      description: 'Maximum value for number/date types.',
    },
    step: {
      control: 'text',
      description: 'Step for number/date inputs (defaults to 0.01 for number).',
    },
    onChange: {
      action: 'changed',
      description: 'Triggered on user input change.',
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Type a description',
    type: 'text',
    value: '',
    onChange: fn(),
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: 'Description',
    placeholder: 'Type a description',
    type: 'text',
    value: 'Lunch with clients',
  },
};

export const Money: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    value: '150.75',
    min: 0,
    step: 0.01,
  },
};

export const Date: Story = {
  args: {
    label: 'Transaction date',
    placeholder: 'Select a date',
    type: 'date',
    value: '2026-04-16',
    min: '2020-01-01',
    max: '2030-12-31',
  },
};

export const EmptyState: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add notes',
    type: 'text',
    value: '',
  },
};
