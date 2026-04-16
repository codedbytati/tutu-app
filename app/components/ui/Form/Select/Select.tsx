import type { ChangeEvent, ReactNode } from 'react'
import { useId } from 'react'
import { ChevronsUpDownIcon } from 'lucide-react'

type SelectProps<TOption> = {
  label: string
  options: TOption[]
  value?: TOption
  onChange: (value: TOption) => void
  getOptionLabel: (option: TOption) => string
  getOptionKey: (option: TOption) => string | number
  placeholder?: string
  disabled?: boolean
  renderOption?: (option: TOption) => ReactNode
  renderValue?: (option: TOption | undefined) => ReactNode
}

export const Select = <TOption,>({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionKey,
  placeholder = 'Select an option',
  disabled = false,
}: SelectProps<TOption>) => {
  const fieldId = useId()
  const selectedValue = value ? String(getOptionKey(value)) : ''

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value
    const nextOption = options.find((option) => String(getOptionKey(option)) === nextValue)

    if (nextOption) {
      onChange(nextOption)
    }
  }

  return (
    <div className='flex flex-col gap-1 mt-2'>
      <label htmlFor={fieldId} className="font-medium text-gray-900">{label}</label>
      <select
        id={fieldId}
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className="rounded-md border border-gray-300 px-3 py-2 text-left text-gray-900 shadow-xs transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm/6"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={getOptionKey(option)} value={String(getOptionKey(option))}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  )
}
