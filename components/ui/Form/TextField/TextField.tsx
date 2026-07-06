import type { ChangeEvent } from 'react'

type TextFieldProps = {
  label?: string,
  placeholder: string,
  type?: 'text' | 'number' | 'date',
  id?: string,
  name?: string,
  value?: string | number,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  min?: number | string,
  max?: number | string,
  step?: number | string,
  variant?: 'default' | 'compact',
  className?: string,
  containerClassName?: string,
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
  variant = 'default',
  className,
  containerClassName,
}: TextFieldProps) => {
  const fieldId = id ?? 'textfield'
  const wrapperClassName = variant === 'default' ? 'mt-2 flex flex-col gap-1' : ''
  const labelClassName = variant === 'compact' ? 'font-medium text-gray-900 sr-only' : 'font-medium text-gray-900'
  const containerClassNameResolved = variant === 'default'
    ? 'flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary'
    : 'flex items-center rounded-full border-2 border-slate-200 bg-white px-4 py-2 transition-colors focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100'
  const inputClassName = variant === 'default'
    ? 'block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
    : 'block min-w-0 grow bg-transparent py-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none'

  return (
    <div className={`${wrapperClassName} ${containerClassName ?? ''}`.trim()}>
      {label ? (
        <label
          htmlFor={fieldId}
          className={labelClassName}
        >
          {label}
        </label>
      ) : null}

      <div className={containerClassNameResolved}>
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
          className={`${inputClassName} ${className ?? ''}`.trim()}
        />
      </div>
    </div>
  )
}
