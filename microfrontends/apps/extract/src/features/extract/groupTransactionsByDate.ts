import type { ExtractItem, GroupedExtract } from './types'

const parseDateString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/')

  return new Date(Number(year), Number(month) - 1, Number(day))
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
  'dezembro',
]

const formatDateLabel = (dateStr: string, today: Date): string => {
  const transactionDate = parseDateString(dateStr)

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const transactionDateStart = new Date(
    transactionDate.getFullYear(),
    transactionDate.getMonth(),
    transactionDate.getDate(),
  )

  const diffTime = todayStart.getTime() - transactionDateStart.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  if (diffDays === 0) {
    return 'Hoje'
  }

  if (diffDays === 1) {
    return 'Ontem'
  }

  const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  if (diffDays <= 6) {
    return dayOfWeek[transactionDateStart.getDay()]
  }

  const day = transactionDateStart.getDate()
  const month = monthNames[transactionDateStart.getMonth()]
  const year = transactionDateStart.getFullYear()

  if (year !== todayStart.getFullYear()) {
    return `${day} de ${month} de ${year}`
  }

  return `${day} de ${month}`
}

export const groupTransactionsByDate = (
  items: ExtractItem[],
  today: Date = new Date(),
): GroupedExtract[] => {
  const grouped = items.reduce((acc, item) => {
    const existingGroup = acc.find((group) => group.date === item.date)

    if (existingGroup) {
      existingGroup.items.push(item)
    } else {
      acc.push({
        date: item.date,
        label: formatDateLabel(item.date, today),
        items: [item],
      })
    }

    return acc
  }, [] as GroupedExtract[])

  grouped.sort((leftGroup, rightGroup) => {
    return parseDateString(rightGroup.date).getTime() - parseDateString(leftGroup.date).getTime()
  })

  return grouped
}