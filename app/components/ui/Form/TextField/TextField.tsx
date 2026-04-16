import type { ChangeEvent } from 'react'

type TextFieldProps = {
  label: string,
  placeholder: string,
  type?: 'text' | 'number' | 'date',
  id?: string,
  name?: string,
  value?: string | number,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  min?: number | string,
  max?: number | string,
  step?: number | string,
}

export const TextField = ({
  label,
  placeholder,
  type = 'text',
  id,
  name,
  value,
  onChange,
  min,
  max,
  step,
}: TextFieldProps) => {
  const fieldId = id ?? 'textfield'

  return (
    <div className="flex flex-col gap-1 mt-2">
      <label htmlFor={fieldId} className="font-medium text-gray-900">
        {label}
      </label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
        <input
          id={fieldId}
          name={name ?? fieldId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          inputMode={type === 'number' ? 'decimal' : undefined}
          min={type === 'number' || type === 'date' ? min : undefined}
          max={type === 'number' || type === 'date' ? max : undefined}
          step={type === 'number' ? step ?? 0.01 : step}
          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  )
}
