"use client";

import { useEffect, useState } from 'react'

import { createTransactionOnApi, deleteTransactionOnApi, loadTransactionsFromApi, updateTransactionOnApi } from '@/features/transactions/api'
import type { ExtractItem } from '@/utils/types'

const toInputDate = (date: string) => {
  const [day, month, year] = date.split('/')

  if (!day || !month || !year) {
    return date
  }

  return `${year}-${month}-${day}`
}

export const useTransactions = () => {
  const [mode, setMode] = useState<'none' | 'add' | 'edit' | 'delete'>('none')
  const [extracts, setExtracts] = useState<ExtractItem[]>([])
  const [balance, setBalance] = useState('0.00')
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | number | null>(null)

  const syncTransactions = async () => {
    const { transactions, balance: currentBalance } = await loadTransactionsFromApi()
    setExtracts(transactions)
    setBalance(currentBalance.toFixed(2))
  }

  useEffect(() => {
    void syncTransactions()
  }, [])

  const handleDeleteTransaction = async (id: string | number) => {
    await deleteTransactionOnApi(id)
    await syncTransactions()

    return undefined
  };

  const formatDate = (rawDate: string) => {
    const [year, month, day] = rawDate.split('-')

    if (!year || !month || !day) {
      return rawDate
    }

    return `${day}/${month}/${year}`
  }

  const handleAddTransaction = async (transaction: ExtractItem) => {
    const normalizedTransaction = {
      ...transaction,
      description: transaction.description.trim(),
      amount: transaction.amount.trim(),
      date: transaction.date,
    }

    await createTransactionOnApi(normalizedTransaction)
    await syncTransactions()
  }

  const handleEditTransaction = async (transaction: ExtractItem) => {
    const normalizedTransaction = {
      ...transaction,
      description: transaction.description.trim(),
      amount: transaction.amount.trim(),
      date: transaction.date,
    }

    if (selectedTransactionId === null) {
      return
    }

    await updateTransactionOnApi(selectedTransactionId, normalizedTransaction)
    await syncTransactions()
  }

  const [transaction, setTransaction] = useState<ExtractItem>({
    id: 0,
    description: '',
    type: 'EXPENSE',
    amount: '',
    date: '',
    category: 'Outros',
  })

  const resetForm = () => {
    setTransaction({
      id: 0,
      description: '',
      type: 'EXPENSE',
      amount: '',
      date: '',
      category: 'Outros',
    })
  }

  const handleClose = () => {
    setMode('none')
    setSelectedTransactionId(null)
    resetForm()
  }

  const handleSave = async () => {
    if (!transaction.date || !transaction.type || !transaction.description.trim() || !transaction.amount.trim()) {
      return
    }

    await handleAddTransaction({
      id: 0,
      date: transaction.date,
      type: transaction.type,
      description: transaction.description.trim(),
      amount: transaction.amount.trim(),
      category: transaction.category,
    })

    handleClose()
  }

  const handleOpenEdit = (item: ExtractItem) => {
    setSelectedTransactionId(item.id)
    setTransaction({
      id: item.id,
      category: item.category,
      description: item.description,
      type: item.type,
      amount: item.amount,
      date: toInputDate(item.date),
    })
    setMode('edit')
  }

  const handleOpenDelete = (id: string | number) => {
    setSelectedTransactionId(id)
    setMode('delete')
  }

  const handleSaveEdit = async () => {
    if (selectedTransactionId === null || !transaction.date || !transaction.type || !transaction.description.trim() || !transaction.amount.trim()) {
      return
    }

    await handleEditTransaction({
      ...transaction,
      id: selectedTransactionId,
    })

    handleClose()
  }

  const handleConfirmDelete = async () => {
    if (selectedTransactionId === null) {
      return
    }

    await handleDeleteTransaction(selectedTransactionId)
    handleClose()
  }

  return {
    onOpenEdit: handleOpenEdit,
    onOpenDelete: handleOpenDelete,
    onAddTransactionProps: {
      transaction,
      setTransaction,
      open: mode === "add",
      onOpen: () => setMode("add"),
      onAdd: handleSave,
      onClose: handleClose,
    },
    onEditTransactionProps: {
      transaction,
      setTransaction,
      open: mode === "edit",
      onAdd: handleSaveEdit,
      onClose: handleClose,
    },
    onDeleteTransactionProps: {
      open: mode === "delete",
      onDelete: handleConfirmDelete,
      onClose: handleClose,
    },
    mode,
    extracts,
    balance: balance,
    onDelete: handleDeleteTransaction,
    onEdit: handleEditTransaction,
    onAdd: handleSave,
    onClose: handleClose,
  }
}
