import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { ensureApiSession, requestApiJson } from './api'
import { fileToDataUrl } from './file'
import { createApiPayload, mapApiRecordToTransaction } from './transformers'
import type { RootState } from '../../store'
import type {
  ExtractItem,
  TransactionApiRecord,
  TransactionEditorDraft,
  TransactionPayload,
} from './types'

type SaveTransactionArgs = TransactionPayload

type TransactionsState = {
  editor: TransactionEditorDraft
  status: 'idle' | 'loading' | 'saving'
  error: string | null
}

const transactionsAdapter = createEntityAdapter<ExtractItem>()

const initialState = transactionsAdapter.getInitialState<TransactionsState>({
  editor: {
    isOpen: false,
    mode: 'create',
    transactionId: null,
  },
  status: 'idle',
  error: null,
})

const buildAttachmentPayload = async (attachment?: File | null) => {
  if (!attachment) {
    return null
  }

  const dataUrl = await fileToDataUrl(attachment)

  return {
    name: attachment.name,
    dataUrl,
  }
}

const selectExistingTransaction = (state: RootState, id: string) => {
  return state.transactions.entities[id]
}

export const fetchTransactions = createAsyncThunk<ExtractItem[], void, { rejectValue: string }>(
  'transactions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const session = await ensureApiSession()
      const response = await requestApiJson<{ result?: { transactions?: TransactionApiRecord[] } }>(
        `/account/${session.accountId}/statement`,
      )
      const transactions = response.result?.transactions ?? []

      return transactions.map((transaction) => mapApiRecordToTransaction(transaction))
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Falha ao carregar transações')
    }
  },
)

export const saveTransaction = createAsyncThunk<ExtractItem, SaveTransactionArgs, { rejectValue: string }>(
  'transactions/save',
  async ({ values, attachment }, { rejectWithValue }) => {
    const attachmentPayload = await buildAttachmentPayload(attachment)
    const session = await ensureApiSession()
    const payload = createApiPayload(values, session.accountId, attachmentPayload)
    const fallbackRecord: TransactionApiRecord = {
      ...payload,
      id: crypto.randomUUID(),
      accountId: session.accountId,
    }

    try {
      const response = await requestApiJson<{ result?: TransactionApiRecord }>(`/account/transaction`, {
        method: 'POST',
        body: payload,
      })

      return mapApiRecordToTransaction(response.result ?? fallbackRecord, {
        category: values.category,
        description: values.description,
        date: values.date,
        attachmentName: attachmentPayload?.name,
        attachmentUrl: attachmentPayload?.dataUrl,
      })
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Falha ao salvar a transação')
    }
  },
)

export const updateTransaction = createAsyncThunk<ExtractItem, { id: string; values: SaveTransactionArgs['values']; attachment?: File | null }, { rejectValue: string }>(
  'transactions/update',
  async ({ id, values, attachment }, { rejectWithValue, getState }) => {
    const currentTransaction = selectExistingTransaction(getState() as RootState, id)
    const attachmentPayload = await buildAttachmentPayload(attachment)
    const session = await ensureApiSession()
    const payload = createApiPayload(values, session.accountId, attachmentPayload)
    const preservedAttachmentName = attachmentPayload?.name ?? currentTransaction?.attachmentName
    const preservedAttachmentUrl = attachmentPayload?.dataUrl ?? currentTransaction?.attachmentUrl
    const fallbackRecord: TransactionApiRecord = {
      ...payload,
      id,
      accountId: session.accountId,
      anexo: preservedAttachmentName,
      urlAnexo: preservedAttachmentUrl,
    }

    try {
      const response = await requestApiJson<{ result?: TransactionApiRecord }>(`/account/transaction/${id}`, {
        method: 'PUT',
        body: payload,
      })

      return mapApiRecordToTransaction(response.result ?? fallbackRecord, {
        category: values.category,
        description: values.description,
        date: values.date,
        attachmentName: preservedAttachmentName,
        attachmentUrl: preservedAttachmentUrl,
      })
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Falha ao atualizar a transação')
    }
  },
)

export const deleteTransaction = createAsyncThunk<string, string, { rejectValue: string }>(
  'transactions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await requestApiJson<null>(`/account/transaction/${id}`, {
        method: 'DELETE',
      })

      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Falha ao remover a transação')
    }
  },
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    openCreateEditor(state) {
      state.editor = {
        isOpen: true,
        mode: 'create',
        transactionId: null,
      }
      state.error = null
    },
    openEditEditor(state, action: { payload: string }) {
      state.editor = {
        isOpen: true,
        mode: 'edit',
        transactionId: action.payload,
      }
      state.error = null
    },
    closeEditor(state) {
      state.editor.isOpen = false
      state.editor.transactionId = null
      state.editor.mode = 'create'
    },
    setTransactions(state, action: { payload: ExtractItem[] }) {
      transactionsAdapter.setAll(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        transactionsAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload ?? action.error.message ?? 'Falha ao carregar transações'
      })
      .addCase(saveTransaction.pending, (state) => {
        state.status = 'saving'
        state.error = null
      })
      .addCase(saveTransaction.fulfilled, (state, action) => {
        transactionsAdapter.addOne(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveTransaction.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload ?? action.error.message ?? 'Falha ao salvar a transação'
      })
      .addCase(updateTransaction.pending, (state) => {
        state.status = 'saving'
        state.error = null
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        transactionsAdapter.upsertOne(state, action.payload)
        state.status = 'idle'
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload ?? action.error.message ?? 'Falha ao atualizar a transação'
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.status = 'saving'
        state.error = null
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        transactionsAdapter.removeOne(state, action.payload)
        state.status = 'idle'
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload ?? action.error.message ?? 'Falha ao remover a transação'
      })
  },
})

export const { openCreateEditor, openEditEditor, closeEditor, setTransactions } = transactionsSlice.actions

export const transactionsReducer = transactionsSlice.reducer

export { transactionsAdapter }
