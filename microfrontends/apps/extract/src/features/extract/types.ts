export type TransactionBackendType = 'Debit' | 'Credit'

export type TransactionDisplayType = 'EXPENSE' | 'INCOME'

export type TransactionCategory =
  | 'Salário'
  | 'Investimento'
  | 'Casa'
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Presente'
  | 'Outros'

export const expenseCategoryOptions: TransactionCategory[] = [
  'Casa',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Outros',
]

export const incomeCategoryOptions: TransactionCategory[] = [
  'Salário',
  'Investimento',
  'Presente',
  'Outros',
]

export const categoryOptionsByType: Record<TransactionBackendType, TransactionCategory[]> = {
  Debit: expenseCategoryOptions,
  Credit: incomeCategoryOptions,
}

export type ExtractItem = {
  id: string
  accountId: string
  category: TransactionCategory
  type: TransactionDisplayType
  description: string
  amount: string
  date: string
  backendType: TransactionBackendType
  attachmentName?: string
  attachmentUrl?: string
}

export type GroupedExtract = {
  label: string
  date: string
  items: ExtractItem[]
}

export type TransactionFormValues = {
  date: string
  value: string
  description: string
  category: TransactionCategory
  type: TransactionBackendType
}

export type TransactionEditorMode = 'create' | 'edit'

export type TransactionAttachment = {
  name: string
  mimeType: string
  dataUrl: string
}

export type TransactionApiRecord = {
  id?: string
  _id?: string
  accountId: string
  type: TransactionBackendType
  value: number
  from?: string
  to?: string
  anexo?: string
  urlAnexo?: string | null
  date?: string | Date
  createdAt?: string | Date
}

export type TransactionApiPayload = {
  accountId: string
  type: TransactionBackendType
  value: number
  from: string
  to: string
  anexo?: string
  urlAnexo?: string | null
  date?: string
}

export type TransactionEditorDraft = {
  transactionId: string | null
  mode: TransactionEditorMode
  isOpen: boolean
}

export type TransactionPayload = {
  values: TransactionFormValues
  attachment?: File | null
}