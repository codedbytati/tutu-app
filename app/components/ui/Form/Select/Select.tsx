import type { ReactNode } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
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
  renderOption,
  renderValue,
}: SelectProps<TOption>) => {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {label ? <Label className="block text-sm/6 font-medium text-gray-900">{label}</Label> : null}
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {value
              ? renderValue?.(value) ?? <span className="block truncate">{getOptionLabel(value)}</span>
              : <span className="block truncate text-gray-400">{placeholder}</span>}
          </span>
          <ChevronsUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={getOptionKey(option)}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-primary data-focus:text-white data-focus:outline-hidden"
            >
              {({ selected }) => (
                <>
                  <span className={selected ? 'block truncate font-semibold' : 'block truncate font-normal'}>
                    {renderOption?.(option) ?? getOptionLabel(option)}
                  </span>
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
