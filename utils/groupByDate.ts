import { ExtractItem } from './types'

export type GroupedByDate = {
  label: string
  date: string
  items: ExtractItem[]
}

const parseDateString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

const monthNames = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

const formatDateLabel = (dateStr: string, today: Date): string => {
  const transactionDate = parseDateString(dateStr)
  
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const transactionDateStart = new Date(transactionDate.getFullYear(), transactionDate.getMonth(), transactionDate.getDate())
  
  const diffTime = todayStart.getTime() - transactionDateStart.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  
  if (diffDays === 0) {
    return 'Hoje'
  }
  if (diffDays === 1) {
    return 'Ontem'
  }
  
  // Format with day name if within last week
  const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  if (diffDays <= 6) {
    return dayOfWeek[transactionDateStart.getDay()]
  }
  
  // Format as "D de MMM" or "D de MMM de YYYY" if different year
  const day = transactionDateStart.getDate()
  const month = monthNames[transactionDateStart.getMonth()]
  const year = transactionDateStart.getFullYear()
  
  if (year !== todayStart.getFullYear()) {
    return `${day} de ${month} de ${year}`
  }
  
  return `${day} de ${month}`
}

export const groupTransactionsByDate = (items: ExtractItem[], today: Date = new Date()): GroupedByDate[] => {
  // Group by date
  const grouped = items.reduce((acc, item) => {
    const existing = acc.find(group => group.date === item.date)
    if (existing) {
      existing.items.push(item)
    } else {
      acc.push({
        date: item.date,
        label: formatDateLabel(item.date, today),
        items: [item]
      })
    }
    return acc
  }, [] as GroupedByDate[])

  // Sort by date (newest first)
  grouped.sort((a, b) => {
    const dateA = parseDateString(a.date)
    const dateB = parseDateString(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return grouped
}
