import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { CategoryAutocompleteField } from './CategoryAutocompleteField'
import {
  categoryOptionsByType,
  expenseCategoryOptions,
  incomeCategoryOptions,
  type TransactionBackendType,
  type TransactionEditorMode,
  type TransactionFormValues,
} from '../types'

const transactionCategories = [
  'Salário',
  'Investimento',
  'Casa',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Presente',
  'Outros',
] as const

const transactionSchema = z.object({
  date: z
    .string()
    .min(1, 'Informe a data da transação')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use uma data válida'),
  value: z
    .string()
    .min(1, 'Informe o valor')
    .refine((entry) => {
      const numberValue = Number(String(entry).replace(',', '.'))
      return Number.isFinite(numberValue) && numberValue > 0
    }, 'O valor precisa ser maior que zero'),
  description: z.string().trim().min(3, 'Descreva a transação com pelo menos 3 caracteres'),
  category: z.enum(transactionCategories),
  type: z.enum(['Debit', 'Credit']),
})

export type TransactionEditorDialogValues = TransactionFormValues

type TransactionEditorDialogProps = {
  isOpen: boolean
  mode: TransactionEditorMode
  isSubmitting: boolean
  initialValues: TransactionEditorDialogValues
  initialAttachment?: {
    name: string
    url?: string
  } | null
  onClose: () => void
  onSubmit: (values: TransactionEditorDialogValues, attachment: File | null) => void | Promise<void>
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const defaultAttachmentLabel = 'Nenhum arquivo selecionado'

const backdropClassName = 'fixed inset-0 z-[80] grid place-items-center bg-slate-950/64 p-6'
const dialogClassName = 'max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-slate-300/30 bg-slate-50 p-7 shadow-[0_30px_120px_rgba(15,23,42,0.32)]'
const sectionLabelClassName = 'text-sm font-semibold text-slate-900'
const inputClassName = 'w-full min-h-12 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-shadow focus-visible:border-slate-900 focus-visible:shadow-[0_0_0_4px_rgba(239,217,0,0.22)]'
const textareaClassName = `${inputClassName} min-h-32 resize-y`
const buttonBaseClassName = 'rounded-full border-0 px-5 py-3 font-bold transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(239,217,0,0.22)]'

export const TransactionEditorDialog = ({
  isOpen,
  mode,
  isSubmitting,
  initialValues,
  initialAttachment,
  onClose,
  onSubmit,
}: TransactionEditorDialogProps) => {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFileLabel, setSelectedFileLabel] = useState<string>(defaultAttachmentLabel)

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionEditorDialogValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  })

  const selectedType = watch('type')

  const categoryOptions = useMemo(() => {
    return categoryOptionsByType[selectedType as TransactionBackendType] ?? categoryOptionsByType.Debit
  }, [selectedType])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    reset(initialValues)
    setSelectedFile(null)
    setSelectedFileLabel(initialAttachment?.name ?? defaultAttachmentLabel)

    window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(focusableSelector)
      firstFocusable?.focus()
    })
  }, [initialAttachment?.name, initialValues, isOpen, reset])

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

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
    setSelectedFileLabel(file?.name ?? initialAttachment?.name ?? defaultAttachmentLabel)
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
            <p className='mb-1 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-slate-500'>{mode === 'create' ? 'Nova transação' : 'Editar transação'}</p>
            <h2 className='m-0 text-[clamp(1.4rem,2.2vw,2rem)] leading-tight text-slate-900' id={titleId}>
              {mode === 'create' ? 'Adicionar transação' : 'Atualizar transação'}
            </h2>
          </div>

          <button className={`${buttonBaseClassName} bg-slate-200 text-slate-900`} type='button' onClick={onClose} aria-label='Fechar formulário de transação'>
            Fechar
          </button>
        </header>

        <p className='m-0 mb-6 mt-4 leading-7 text-slate-600' id={descriptionId}>
          Preencha os campos obrigatórios, escolha a categoria sugerida e anexe um comprovante se quiser.
        </p>

        <form className='flex flex-col gap-5' onSubmit={handleSubmit(async (values) => {
          await onSubmit(values, selectedFile)
        })}>
          <div className='grid gap-4 md:grid-cols-2'>
            <label className='flex flex-col gap-2'>
              <span className={sectionLabelClassName}>Data</span>
              <input className={`${inputClassName} ${errors.date ? 'border-red-500' : ''}`.trim()} type='date' {...register('date')} aria-invalid={Boolean(errors.date)} />
              {errors.date ? (
                <span className='text-sm leading-5 text-red-600' role='alert'>
                  {errors.date.message}
                </span>
              ) : null}
            </label>

            <label className='flex flex-col gap-2'>
              <span className={sectionLabelClassName}>Valor</span>
              <input
                className={`${inputClassName} ${errors.value ? 'border-red-500' : ''}`.trim()}
                type='number'
                min='0.01'
                step='0.01'
                inputMode='decimal'
                placeholder='0,00'
                {...register('value')}
                aria-invalid={Boolean(errors.value)}
              />
              {errors.value ? (
                <span className='text-sm leading-5 text-red-600' role='alert'>
                  {errors.value.message}
                </span>
              ) : null}
            </label>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <label className='flex flex-col gap-2'>
              <span className={sectionLabelClassName}>Tipo</span>
              <select className={`${inputClassName} ${errors.type ? 'border-red-500' : ''}`.trim()} {...register('type')} aria-invalid={Boolean(errors.type)}>
                <option value='Debit'>Despesa</option>
                <option value='Credit'>Receita</option>
              </select>
              {errors.type ? (
                <span className='text-sm leading-5 text-red-600' role='alert'>
                  {errors.type.message}
                </span>
              ) : null}
            </label>

            <Controller
              control={control}
              name='category'
              render={({ field, fieldState }) => (
                <CategoryAutocompleteField
                  label='Categoria'
                  value={field.value}
                  options={categoryOptions}
                  placeholder='Digite para filtrar categorias'
                  helperText='As sugestões mudam conforme o tipo de transação.'
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <label className='flex flex-col gap-2'>
            <span className={sectionLabelClassName}>Descrição</span>
            <textarea className={`${textareaClassName} ${errors.description ? 'border-red-500' : ''}`.trim()} rows={4} placeholder='Descreva a transação' {...register('description')} aria-invalid={Boolean(errors.description)} />
            {errors.description ? (
              <span className='text-sm leading-5 text-red-600' role='alert'>
                {errors.description.message}
              </span>
            ) : null}
          </label>

          <label className='flex flex-col gap-2'>
            <span className={sectionLabelClassName}>Anexo</span>
            <input
              className={inputClassName}
              type='file'
              accept='image/*,.pdf,.doc,.docx'
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
            />
            <span className='text-sm leading-5 text-slate-500'>
              {selectedFileLabel}
            </span>

            {initialAttachment?.url && !selectedFile ? (
              <a className='w-fit font-semibold text-slate-900 underline' href={initialAttachment.url} target='_blank' rel='noreferrer'>
                Abrir anexo atual
              </a>
            ) : null}
          </label>

          <div className='flex flex-wrap justify-end gap-3 pt-1'>
            <button className={`${buttonBaseClassName} bg-slate-200 text-slate-900`} type='button' onClick={onClose}>
              Cancelar
            </button>

            <button className={`${buttonBaseClassName} bg-linear-to-r from-primary to-[#f7c948] text-slate-900 disabled:cursor-progress disabled:opacity-70`} type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : mode === 'create' ? 'Adicionar transação' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
