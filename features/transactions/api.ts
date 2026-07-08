import type { ExtractItem, TransactionCategory, TransactionType } from '@/utils/types'

type RuntimeApiConfig = {
  baseUrl: string
  username: string
  email: string
  password: string
}

type RuntimeSession = {
  token: string
  accountId: string
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  token?: string
}

type ApiTransactionRecord = {
  id?: string
  _id?: string
  accountId: string
  type: 'Debit' | 'Credit'
  value: number
  from?: string
  to?: string
  anexo?: string
  urlAnexo?: string | null
  date?: string | Date
}

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
const DEFAULT_USERNAME = 'Bytebank Demo'
const DEFAULT_EMAIL = 'demo@bytebank.local'
const DEFAULT_PASSWORD = 'Bytebank123!'

const apiConfig: RuntimeApiConfig = {
  baseUrl: DEFAULT_BASE_URL,
  username: DEFAULT_USERNAME,
  email: DEFAULT_EMAIL,
  password: DEFAULT_PASSWORD,
}

let runtimeSession: RuntimeSession | null = null
let runtimeSessionPromise: Promise<RuntimeSession> | null = null

const delay = async (milliseconds: number) => {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

const readErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string }
    return payload.message ?? response.statusText
  } catch {
    return response.statusText
  }
}

const requestJson = async <T>(path: string, options: RequestOptions = {}) => {
  const headers = new Headers()
  headers.set('Accept', 'application/json')

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const fetchOptions: RequestInit = {
    method: options.method ?? 'GET',
    headers,
  }

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
    fetchOptions.body = JSON.stringify(options.body)
  }

  const response = await fetch(`${apiConfig.baseUrl}${path}`, fetchOptions)

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  if (response.status === 204) {
    return null as T
  }

  return (await response.json()) as T
}

const parseDate = (value: string | Date | undefined) => {
  if (!value) {
    return new Date()
  }

  return typeof value === 'string' ? new Date(value) : value
}

const formatDateToDisplay = (value: string | Date | undefined) => {
  const date = parseDate(value)

  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString('pt-BR')
  }

  return date.toLocaleDateString('pt-BR')
}

const mapBackendTypeToDisplayType = (type: 'Debit' | 'Credit'): TransactionType => {
  return type === 'Debit' ? 'EXPENSE' : 'INCOME'
}

const normalizeCategory = (value: string | undefined): TransactionCategory => {
  const category = value as TransactionCategory | undefined

  return category ?? 'Outros'
}

const mapRecordToTransaction = (record: ApiTransactionRecord): ExtractItem => {
  return {
    id: String(record.id ?? record._id ?? crypto.randomUUID()),
    category: normalizeCategory(record.from),
    type: mapBackendTypeToDisplayType(record.type),
    description: String(record.to ?? ''),
    amount: Math.abs(record.value).toFixed(2),
    date: formatDateToDisplay(record.date),
  }
}

const createPayload = (transaction: ExtractItem, accountId: string) => {
  const parsedAmount = Number(transaction.amount)
  const signedAmount = transaction.type === 'EXPENSE' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount)

  return {
    accountId,
    type: transaction.type === 'EXPENSE' ? 'Debit' : 'Credit',
    value: signedAmount,
    from: transaction.category,
    to: transaction.description,
    date: transaction.date,
  }
}

const registerOrAuthenticateUser = async () => {
  const credentialPayload = {
    username: apiConfig.username,
    email: apiConfig.email,
    password: apiConfig.password,
  }

  await fetch(`${apiConfig.baseUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentialPayload),
  }).catch(() => undefined)

  const authResponse = await fetch(`${apiConfig.baseUrl}/user/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email: apiConfig.email, password: apiConfig.password }),
  })

  if (!authResponse.ok) {
    throw new Error(await readErrorMessage(authResponse))
  }

  const authPayload = (await authResponse.json()) as { result?: { token?: string } }
  const token = authPayload.result?.token

  if (!token) {
    throw new Error('Não foi possível autenticar o usuário de demonstração')
  }

  return token
}

const fetchAccountId = async (token: string) => {
  const response = await requestJson<{ result?: { account?: Array<{ id?: string }> } }>('/account', {
    token,
  })

  const accountId = response.result?.account?.[0]?.id

  if (!accountId) {
    throw new Error('Não foi possível localizar a conta do usuário autenticado')
  }

  return accountId
}

const bootstrapSessionWithRetry = async () => {
  const maximumAttempts = 8

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      const token = await registerOrAuthenticateUser()
      const accountId = await fetchAccountId(token)

      return { token, accountId }
    } catch (error) {
      if (attempt === maximumAttempts) {
        throw error
      }

      await delay(1000 * attempt)
    }
  }

  throw new Error('Não foi possível inicializar a sessão da API')
}

export const ensureApiSession = async () => {
  if (runtimeSession) {
    return runtimeSession
  }

  if (!runtimeSessionPromise) {
    runtimeSessionPromise = bootstrapSessionWithRetry()
      .then((session) => {
        runtimeSession = session
        return session
      })
      .finally(() => {
        runtimeSessionPromise = null
      })
  }

  return runtimeSessionPromise
}

export const loadTransactionsFromApi = async () => {
  const session = await ensureApiSession()
  const response = await requestJson<{ result?: { transactions?: ApiTransactionRecord[] } }>(
    `/account/${session.accountId}/statement`,
    {
      token: session.token,
    },
  )

  const transactions = (response.result?.transactions ?? []).map(mapRecordToTransaction)

  transactions.sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })

  return {
    session,
    transactions,
    balance: transactions.reduce((accumulator, transaction) => {
      const amount = Number(transaction.amount)
      return transaction.type === 'INCOME' ? accumulator + amount : accumulator - amount
    }, 0),
  }
}

export const createTransactionOnApi = async (transaction: ExtractItem) => {
  const session = await ensureApiSession()
  const payload = createPayload(transaction, session.accountId)

  await requestJson('/account/transaction', {
    method: 'POST',
    body: payload,
    token: session.token,
  })
}

export const updateTransactionOnApi = async (id: string | number, transaction: ExtractItem) => {
  const session = await ensureApiSession()
  const payload = createPayload(transaction, session.accountId)

  await requestJson(`/account/transaction/${id}`, {
    method: 'PUT',
    body: payload,
    token: session.token,
  })
}

export const deleteTransactionOnApi = async (id: string | number) => {
  const session = await ensureApiSession()

  await requestJson(`/account/transaction/${id}`, {
    method: 'DELETE',
    token: session.token,
  })
}
