import type {
  ExtractItem,
  TransactionApiPayload,
  TransactionApiRecord,
  TransactionBackendType,
  TransactionCategory,
  TransactionDisplayType,
  TransactionFormValues,
  TransactionPayload,
} from './types'

const normalizeAccountId = (value: string | undefined | null) => {
  return value?.trim() || 'local-account'
}

const formatDateToDisplay = (value: string | Date | undefined) => {
  if (!value) {
    return new Date().toLocaleDateString('pt-BR')
  }

  if (typeof value === 'string' && value.includes('/')) {
    return value
  }

  const parsedDate = typeof value === 'string' ? new Date(value) : value

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date().toLocaleDateString('pt-BR')
  }

  return parsedDate.toLocaleDateString('pt-BR')
}

const mapBackendTypeToDisplayType = (type: TransactionBackendType): TransactionDisplayType => {
  return type === 'Debit' ? 'EXPENSE' : 'INCOME'
}

const mapDisplayTypeToBackendType = (type: TransactionDisplayType): TransactionBackendType => {
  return type === 'EXPENSE' ? 'Debit' : 'Credit'
}

const normalizeCategory = (category: string): TransactionCategory => {
  return category as TransactionCategory
}

export const getTodayInputDate = () => {
  return new Date().toISOString().slice(0, 10)
}

export const displayDateToInputDate = (value: string) => {
  if (!value) {
    return getTodayInputDate()
  }

  if (value.includes('-')) {
    return value.slice(0, 10)
  }

  const [day, month, year] = value.split('/')

  if (!day || !month || !year) {
    return getTodayInputDate()
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export const createApiPayload = (
  values: TransactionFormValues,
  accountId: string,
  attachment?: { name: string; dataUrl: string } | null,
): TransactionApiPayload => {
  const parsedValue = Number(values.value)
  const signedValue = values.type === 'Debit' ? -Math.abs(parsedValue) : Math.abs(parsedValue)

  return {
    accountId: normalizeAccountId(accountId),
    type: values.type,
    value: signedValue,
    from: values.category,
    to: values.description,
    date: values.date,
    anexo: attachment?.name,
    urlAnexo: attachment?.dataUrl ?? null,
  }
}

export const mapApiRecordToTransaction = (
  record: TransactionApiRecord,
  fallback?: Partial<TransactionPayload['values']> & { attachmentName?: string; attachmentUrl?: string },
): ExtractItem => {
  const id = String(record.id ?? record._id ?? crypto.randomUUID())
  const backendType = record.type
  const displayType = mapBackendTypeToDisplayType(backendType)
  const amount = Math.abs(record.value).toFixed(2)
  const category = normalizeCategory(String(record.from ?? fallback?.category ?? 'Outros'))

  return {
    id,
    accountId: normalizeAccountId(record.accountId),
    backendType,
    type: displayType,
    category,
    description: String(record.to ?? fallback?.description ?? ''),
    amount,
    date: formatDateToDisplay(record.date ?? record.createdAt ?? fallback?.date),
    attachmentName: record.anexo ?? fallback?.attachmentName,
    attachmentUrl: record.urlAnexo ?? fallback?.attachmentUrl,
  }
}

export const mapTransactionToApiRecord = (
  payload: TransactionPayload,
  accountId: string,
  attachment?: { name: string; dataUrl: string } | null,
): TransactionApiPayload => {
  return createApiPayload(payload.values, accountId, attachment)
}

export const getDisplayTypeFromBackend = mapBackendTypeToDisplayType
export const getBackendTypeFromDisplay = mapDisplayTypeToBackendType
