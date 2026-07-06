export type TransactionType = 'EXPENSE' | 'INCOME'

export type TransactionCategory =
  | 'Salário'
  | 'Investimento'
  | 'Casa'
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Presente'
  | 'Outros'

export type ExtractItem = {
  id: number
  category: TransactionCategory
  type: TransactionType
  description: string
  amount: string
  date: string
}

export type GroupedExtract = {
  label: string
  date: string
  items: ExtractItem[]
}