'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useTransactions } from '../hooks/useTransactions'

type TransactionsContextType = ReturnType<typeof useTransactions>

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const transactionsState = useTransactions()

  return (
    <TransactionsContext.Provider value={transactionsState}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactionsContext must be used within TransactionsProvider')
  }
  return context
}
