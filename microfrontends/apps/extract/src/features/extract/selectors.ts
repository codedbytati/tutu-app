import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../../store'
import { transactionsAdapter } from './transactionsSlice'

export const transactionsSelectors = transactionsAdapter.getSelectors<RootState>(
  (state) => state.transactions,
)

export const selectTransactionEditor = (state: RootState) => state.transactions.editor

export const selectTransactionError = (state: RootState) => state.transactions.error

export const selectTransactionStatus = (state: RootState) => state.transactions.status

export const selectCurrentTransaction = createSelector(
  [transactionsSelectors.selectEntities, selectTransactionEditor],
  (entities, editor) => {
    if (!editor.transactionId) {
      return undefined
    }

    return entities[editor.transactionId]
  },
)
