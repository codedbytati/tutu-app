import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Select } from './Select';

type TransactionTypeOption = {
  value: 'EXPENSE' | 'INCOME' | 'TRANSFER';
  label: string;
};

const options: TransactionTypeOption[] = [
  { value: 'EXPENSE', label: 'Expense' },
  { value: 'INCOME', label: 'Income' },
  { value: 'TRANSFER', label: 'Transfer' },
];

type SelectDemoProps = {
  label: string;
  placeholder: string;
  disabled: boolean;
};

const SelectDemo = ({ label, placeholder, disabled }: SelectDemoProps) => {
  const [selected, setSelected] = useState<TransactionTypeOption | undefined>(options[0]);

  return (
    <div className="w-80">
      <Select
        label={label}
        options={options}
        value={selected}
        onChange={setSelected}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

const meta = {
  title: 'UI/Form/Select',
  component: SelectDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic native HTML select with consistent app styling. Pass options and mapping functions (getOptionLabel/getOptionKey) to reuse with any option shape.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible field label.',
    },
    placeholder: {
      control: 'text',
      description: 'Text displayed when no option is selected.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction with the select.',
    },
  },
  args: {
    label: 'Transaction type',
    placeholder: 'Choose a type',
    disabled: false,
  },
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
