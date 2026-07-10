import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

type TransactionDialogProps = {
  isOpen: boolean
  title: string
  eyebrow: string
  description: ReactNode
  onClose: () => void
  children: ReactNode
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const backdropClassName = 'fixed inset-0 z-[80] grid place-items-center bg-slate-950/64 p-6'
const dialogClassName = 'max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-4xl border border-slate-300/30 bg-slate-50 p-7 shadow-[0_30px_120px_rgba(15,23,42,0.32)]'
const buttonBaseClassName = 'rounded-full border-0 px-5 py-3 font-bold transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(239,217,0,0.22)]'

export const TransactionDialog = ({
  isOpen,
  title,
  eyebrow,
  description,
  onClose,
  children,
}: TransactionDialogProps) => {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(focusableSelector)
      firstFocusable?.focus()
    })
  }, [isOpen])

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)

    if (!focusableElements || focusableElements.length === 0) {
      return
    }

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement

    if (event.shiftKey && activeElement === firstFocusable) {
      event.preventDefault()
      lastFocusable.focus()
      return
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault()
      firstFocusable.focus()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={backdropClassName} role='presentation' onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={dialogClassName}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onKeyDown={trapFocus}
      >
        <header className='flex items-start justify-between gap-4'>
          <div>
            <p className='mb-1 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-slate-500'>{eyebrow}</p>
            <h2 className='m-0 text-[clamp(1.4rem,2.2vw,2rem)] leading-tight text-slate-900' id={titleId}>
              {title}
            </h2>
          </div>

          <button className={`${buttonBaseClassName} bg-slate-200 text-slate-900`} type='button' onClick={onClose} aria-label='Fechar formulário de transação'>
            Fechar
          </button>
        </header>

        <p className='m-0 mb-6 mt-4 leading-7 text-slate-600' id={descriptionId}>
          {description}
        </p>

        {children}
      </div>
    </div>
  )
}