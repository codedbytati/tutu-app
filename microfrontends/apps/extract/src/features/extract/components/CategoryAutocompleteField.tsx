import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

const makeInputStyle = tv({
  base: 'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-shadow focus-visible:border-slate-900 focus-visible:shadow-[0_0_0_4px_rgba(15,23,42,0.12)]',
  variants: {
    hasError: {
      true: 'border-red-500',
      false: '',
    },
  },
})

const makeListboxStyle = tv({
  base: 'absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-60 overflow-y-auto rounded-[1.125rem] border border-slate-200 bg-white p-2 shadow-[0_24px_48px_rgba(15,23,42,0.18)]',
})

const makeOptionStyle = tv({
  base: 'block w-full rounded-xl border-0 bg-transparent px-4 py-3 text-left text-slate-900 cursor-pointer',
  variants: {
    active: {
      true: 'bg-primary/20',
      false: 'hover:bg-primary/10',
    },
  },
})

type CategoryAutocompleteFieldProps = {
  label: string
  value: string
  options: string[]
  placeholder?: string
  error?: string
  helperText?: string
  onChange: (value: string) => void
}

export const CategoryAutocompleteField = ({
  label,
  value,
  options,
  placeholder,
  error,
  helperText,
  onChange,
}: CategoryAutocompleteFieldProps) => {
  const inputId = useId()
  const listboxId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const filteredOptions = useMemo(() => {
    const normalizedInput = inputValue.trim().toLowerCase()

    if (!normalizedInput) {
      return options
    }

    return options.filter((option) => option.toLowerCase().includes(normalizedInput))
  }, [inputValue, options])

  const commitValue = (nextValue: string) => {
    setInputValue(nextValue)
    onChange(nextValue)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length && event.key !== 'Escape') {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((currentIndex) => Math.min(currentIndex + 1, filteredOptions.length - 1))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0))
      return
    }

    if (event.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && filteredOptions[activeIndex]) {
        event.preventDefault()
        commitValue(filteredOptions[activeIndex])
      }
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  return (
    <div className='relative flex flex-col gap-2'>
      <label className='text-sm font-semibold text-slate-900' htmlFor={inputId}>
        {label}
      </label>

      <div className='relative'>
        <input
          ref={inputRef}
          id={inputId}
          className={makeInputStyle({ hasError: Boolean(error) })}
          type='text'
          value={inputValue}
          placeholder={placeholder}
          aria-autocomplete='list'
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-invalid={Boolean(error)}
          aria-describedby={helperText || error ? `${inputId}-hint ${inputId}-error` : `${inputId}-hint`}
          role='combobox'
          onChange={(event) => {
            const nextValue = event.target.value
            setInputValue(nextValue)
            onChange(nextValue)
            setIsOpen(true)
            setActiveIndex(0)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onBlur={(event) => {
            if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget as Node)) {
              return
            }

            window.setTimeout(() => {
              setIsOpen(false)
              setActiveIndex(-1)
            }, 120)
          }}
        />

        {isOpen && filteredOptions.length > 0 ? (
          <ul className={makeListboxStyle()} role='listbox' id={listboxId} aria-label={`${label} sugestões`}>
            {filteredOptions.map((option, index) => {
              const isActive = index === activeIndex

              return (
                <li key={option} role='option' aria-selected={value === option}>
                  <button
                    className={makeOptionStyle({ active: isActive })}
                    type='button'
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commitValue(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {option}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>

      <p className='m-0 text-sm leading-5 text-slate-500' id={`${inputId}-hint`}>
        {helperText ?? 'Use as setas para navegar pelas sugestões e Enter para confirmar.'}
      </p>

      {error ? (
        <p className='m-0 text-sm leading-5 text-red-600' id={`${inputId}-error`} role='alert'>
          {error}
        </p>
      ) : null}
    </div>
  )
}
