type dataProps = {
  id: number,
  name: string,
  balance: string,
  extract: {
    id: number,
    description: string,
    type: 'EXPENSE' | 'INCOME',
    amount: string,
    date: string
  }[]
}

export const data: dataProps = {
  id: 1,
  name: 'Ana Marcela',
  balance: '2500',
  extract: [
    {
      id: 1,
      description: 'Mercado',
      type: 'EXPENSE',
      amount: '36.50',
      date: '04/09/2025'
    },
    {
      id: 2,
      description: 'Salário do mês de setembro do segundo trabalho',
      type: 'INCOME',
      amount: '120',
      date: '04/10/2025'
    }
  ]
}