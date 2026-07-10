import type { Dispatch, SetStateAction } from 'react'
import { ExtractItem } from '@/utils/types'
import { BaseForm } from './BaseForm'
import { TransactionDialog } from '@/components/ui'

type AddTransactionProps = {
  transaction: ExtractItem
  setTransaction: Dispatch<SetStateAction<ExtractItem>>
  open: boolean
  onAdd: () => void
  onOpen: () => void
  onClose: () => void
}

export const AddTransaction = ({ open, transaction, setTransaction, onAdd, onClose, onOpen }: AddTransactionProps) => {
  if (!open) {
    return <button className='rounded-full border-0 bg-[linear-gradient(135deg,#111827_0%,#334155_100%)] px-5 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)] cursor-pointer' onClick={onOpen} type='button'>
      Nova transação
    </button>
  }

  return (
    <TransactionDialog
      isOpen={open}
      title='Adicionar transação'
      eyebrow='Nova transação'
      description='Preencha os campos da transação e confirme para registrar a movimentação.'
      onClose={onClose}
    >
      <div className='flex flex-col gap-5'>
          <BaseForm transaction={transaction} setTransaction={setTransaction} />

          <div className='flex flex-wrap justify-end gap-3 pt-1'>
            <button
              className='rounded-full border-0 bg-slate-200 px-5 py-3 font-bold text-slate-900 transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(239,217,0,0.22)]'
              type='button'
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className='rounded-full border-0 bg-linear-to-r from-primary to-[#f7c948] px-5 py-3 font-bold text-slate-900 transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(239,217,0,0.22)] disabled:cursor-progress disabled:opacity-70'
              type='button'
              onClick={onAdd}
            >
              Adicionar transação
            </button>
          </div>
        </div>
    </TransactionDialog>
  )
}
