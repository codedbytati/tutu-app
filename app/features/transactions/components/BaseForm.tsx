import { Select, TextField } from '@/app/components/ui'
import { Dispatch, SetStateAction } from 'react'
import { ExtractItem, TransactionCategory, TransactionType } from '@/utils/types'

type BaseFormProps = {
  transaction: ExtractItem
  setTransaction: Dispatch<SetStateAction<ExtractItem>>
}

const transactionTypeOptions: Array<TransactionType> = ['EXPENSE', 'INCOME']

const transactionTypeLabel: Record<TransactionType, string> = {
  EXPENSE: 'Despesa',
  INCOME: 'Receita',
}

const transactionCategoryOptions: Array<TransactionCategory> = [
  'Salário',
  'Investimento',
  'Casa',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Presente',
  'Outros'
]

const transactionCategoryLabel: Record<TransactionCategory, string> = {
  'Salário': 'Salário',
  'Investimento': 'Investimento',
  'Casa': 'Casa',
  'Alimentação': 'Alimentação',
  'Transporte': 'Transporte',
  'Lazer': 'Lazer',
  'Presente': 'Presente',
  'Outros': 'Outros'
}

export const BaseForm = ({ transaction, setTransaction }: BaseFormProps) => {
  return (
    <>
      <TextField
        label='Data da transação'
        placeholder='Selecione a data'
        type='date'
        id='transaction-date'
        name='transaction-date'
        value={transaction.date}
        onChange={(event) => setTransaction({ ...transaction, date: event.target.value })}
      />
      <Select
        label='Tipo de transação'
        options={transactionTypeOptions}
        value={transaction.type}
        getOptionLabel={(option) => transactionTypeLabel[option]}
        getOptionKey={(option) => option}
        onChange={(value) => setTransaction({ ...transaction, type: value })}
      />
      <Select
        label='Categoria'
        options={transactionCategoryOptions}
        value={transaction.category}
        getOptionLabel={(option) => transactionCategoryLabel[option]}
        getOptionKey={(option) => option}
        onChange={(value) => setTransaction({ ...transaction, category: value })}
      />
      <TextField
        label='Descrição'
        placeholder='Digite a descrição'
        type='text'
        id='transaction-description'
        name='transaction-description'
        value={transaction.description}
        onChange={(event) => setTransaction({ ...transaction, description: event.target.value })}
      />
      <TextField
        label='Valor'
        placeholder='R$ 0,00'
        type='number'
        id='transaction-amount'
        name='transaction-amount'
        min={0}
        value={transaction.amount}
        onChange={(event) => setTransaction({ ...transaction, amount: event.target.value })}
      />
    </>
  )
}