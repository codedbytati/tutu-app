import { useEffect, useMemo } from 'react'

import ExtractList from './features/extract/ExtractList'
import { apiConfig, ensureApiSession } from './features/extract/api'
import { TransactionEditorDialog, type TransactionEditorDialogValues } from './features/extract/components/TransactionEditorDialog'
import { categoryOptionsByType, type ExtractItem } from './features/extract/types'
import { displayDateToInputDate, getTodayInputDate } from './features/extract/transformers'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  closeEditor,
  deleteTransaction,
  fetchTransactions,
  openCreateEditor,
  openEditEditor,
  saveTransaction,
  updateTransaction,
} from './features/extract/transactionsSlice'
import {
  selectCurrentTransaction,
  selectTransactionEditor,
  selectTransactionError,
  selectTransactionStatus,
  transactionsSelectors,
} from './features/extract/selectors'

const createDefaultValues = (): TransactionEditorDialogValues => ({
  date: getTodayInputDate(),
  value: '',
  description: '',
  category: categoryOptionsByType.Debit[0],
  type: 'Debit',
})

const mapTransactionToFormValues = (transaction: ExtractItem): TransactionEditorDialogValues => ({
  date: displayDateToInputDate(transaction.date),
  value: transaction.amount,
  description: transaction.description,
  category: transaction.category,
  type: transaction.backendType,
})

export default function App() {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector(transactionsSelectors.selectAll)
  const editor = useAppSelector(selectTransactionEditor)
  const selectedTransaction = useAppSelector(selectCurrentTransaction)
  const status = useAppSelector(selectTransactionStatus)
  const error = useAppSelector(selectTransactionError)
  const locationSearch = typeof window !== 'undefined' ? window.location.search : ''

  const urlTransactionId = useMemo(() => {
    const searchParams = new URLSearchParams(locationSearch)
    return searchParams.get('id')
  }, [locationSearch])

  const urlMode = useMemo(() => {
    const searchParams = new URLSearchParams(locationSearch)
    return searchParams.get('mode')
  }, [locationSearch])

  const initialValues = useMemo(() => {
    if (editor.mode === 'edit' && selectedTransaction) {
      return mapTransactionToFormValues(selectedTransaction)
    }

    return createDefaultValues()
  }, [editor.mode, selectedTransaction])

  const initialAttachment = useMemo(() => {
    if (!selectedTransaction) {
      return null
    }

    if (!selectedTransaction.attachmentName && !selectedTransaction.attachmentUrl) {
      return null
    }

    return {
      name: selectedTransaction.attachmentName ?? 'Anexo existente',
      url: selectedTransaction.attachmentUrl,
    }
  }, [selectedTransaction])

  useEffect(() => {
    void dispatch(fetchTransactions())
  }, [dispatch])

  useEffect(() => {
    if (!urlTransactionId) {
      return
    }

    if (urlMode === 'edit' && editor.transactionId !== urlTransactionId) {
      dispatch(openEditEditor(urlTransactionId))
      return
    }

    if (urlMode === 'delete') {
      void handleOpenDelete(urlTransactionId)
    }
  }, [dispatch, editor.transactionId, urlMode, urlTransactionId])

  const handleOpenDelete = async (id: string) => {
    const confirmed = window.confirm('Deseja excluir esta transação?')

    if (!confirmed) {
      return
    }

    await dispatch(deleteTransaction(id))

    if (editor.transactionId === id) {
      dispatch(closeEditor())
    }
  }

  const handleSubmitEditor = async (values: TransactionEditorDialogValues, attachment: File | null) => {
    if (editor.mode === 'edit' && editor.transactionId) {
      await dispatch(
        updateTransaction({
          id: editor.transactionId,
          values,
          attachment,
        }),
      ).unwrap()
    } else {
      await dispatch(
        saveTransaction({
          values,
          attachment,
        }),
      ).unwrap()
    }

    dispatch(closeEditor())
  }

  useEffect(() => {
    void ensureApiSession()
  }, [])

  return (
    <main className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(239,217,0,0.16),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-4 text-slate-900'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-5'>
        <ExtractList
          extracts={transactions}
          onOpenCreate={() => dispatch(openCreateEditor())}
          onOpenEdit={(item) => dispatch(openEditEditor(item.id))}
          onOpenDelete={(id) => {
            void handleOpenDelete(id)
          }}
        />

        <TransactionEditorDialog
          isOpen={editor.isOpen}
          mode={editor.mode}
          isSubmitting={status === 'saving'}
          initialValues={initialValues}
          initialAttachment={initialAttachment}
          onClose={() => dispatch(closeEditor())}
          onSubmit={handleSubmitEditor}
        />
      </div>
    </main>
  )
}
