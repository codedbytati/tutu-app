import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Select } from './Select';

type TransactionTypeOption = {
  value: 'EXPENSE' | 'INCOME' | 'TRANSFER';
  label: string;
  helperText: string;
};

const options: TransactionTypeOption[] = [
  { value: 'EXPENSE', label: 'Expense', helperText: 'Money going out' },
  { value: 'INCOME', label: 'Income', helperText: 'Money coming in' },
  { value: 'TRANSFER', label: 'Transfer', helperText: 'Move between accounts' },
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
          'Generic select component built with Headless UI Listbox. Pass options and mapping functions (getOptionLabel/getOptionKey) to reuse with any option shape.',
      },
    },
  },
  tags: ['autodocs'],
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

export const PlaceholderState: Story = {
  render: (args) => {
    const PlaceholderDemo = () => {
      const [selected, setSelected] = useState<TransactionTypeOption | undefined>(undefined);

      return (
        <div className="w-80">
          <Select
            label={args.label}
            options={options}
            value={selected}
            onChange={setSelected}
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.value}
            placeholder={args.placeholder}
            disabled={args.disabled}
          />
        </div>
      );
    };

    return <PlaceholderDemo />;
  },
};

export const CustomOptionRendering: Story = {
  render: (args) => {
    const CustomRenderDemo = () => {
      const [selected, setSelected] = useState<TransactionTypeOption | undefined>(options[0]);

      return (
        <div className="w-80">
          <Select
            label={args.label}
            options={options}
            value={selected}
            onChange={setSelected}
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.value}
            placeholder={args.placeholder}
            disabled={args.disabled}
            renderOption={(option) => (
              <div className="flex flex-col">
                <span>{option.label}</span>
                <span className="text-xs opacity-70">{option.helperText}</span>
              </div>
            )}
            renderValue={(option) => (
              <div className="flex items-center gap-2">
                <span>{option?.label}</span>
                {option ? <span className="text-xs text-gray-500">({option.value})</span> : null}
              </div>
            )}
          />
        </div>
      );
    };

    return <CustomRenderDemo />;
  },
};
