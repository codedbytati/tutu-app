export type RuntimeApiConfig = {
  baseUrl: string
  username: string
  email: string
  password: string
}

export type RuntimeSession = {
  token: string
  accountId: string
}

const DEFAULT_BASE_URL = 'http://localhost:3001'
const DEFAULT_USERNAME = 'Bytebank Demo'
const DEFAULT_EMAIL = 'demo@bytebank.local'
const DEFAULT_PASSWORD = 'Bytebank123!'

type RuntimeImportMetaEnv = ImportMetaEnv & Record<string, string | undefined>

const readEnvValue = (key: string) => {
  return ((import.meta.env as RuntimeImportMetaEnv)[key] ?? '').trim()
}

export const apiConfig: RuntimeApiConfig = {
  baseUrl: readEnvValue('VITE_API_BASE_URL') || DEFAULT_BASE_URL,
  username: readEnvValue('VITE_API_USERNAME') || DEFAULT_USERNAME,
  email: readEnvValue('VITE_API_EMAIL') || DEFAULT_EMAIL,
  password: readEnvValue('VITE_API_PASSWORD') || DEFAULT_PASSWORD,
}

export const hasRemoteApiConfig = Boolean(apiConfig.username && apiConfig.password)

let runtimeSession: RuntimeSession | null = null
let runtimeSessionPromise: Promise<RuntimeSession> | null = null

const delay = async (milliseconds: number) => {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  token?: string
}

const readErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string }
    return payload.message ?? response.statusText
  } catch {
    return response.statusText
  }
}

export async function requestJson<T>(path: string, options: RequestOptions = {}) {
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

async function registerOrAuthenticateUser() {
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

async function fetchAccountId(token: string) {
  const response = await requestJson<{ result?: { account?: Array<{ id?: string }> } }>('/account', {
    token,
  })

  const accountId = response.result?.account?.[0]?.id

  if (!accountId) {
    throw new Error('Não foi possível localizar a conta do usuário autenticado')
  }

  return accountId
}

async function bootstrapSessionWithRetry() {
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

export async function ensureApiSession() {
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

export function clearApiSession() {
  runtimeSession = null
}

export async function requestApiJson<T>(path: string, options: RequestOptions = {}) {
  const session = await ensureApiSession()
  return requestJson<T>(path, {
    ...options,
    token: session.token,
  })
}