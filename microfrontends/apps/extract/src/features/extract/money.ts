const parseMoneyToNumber = (value: string): number => {
  if (!value) {
    return 0
  }

  let cleaned = value.trim()

  if (cleaned.includes(',') && cleaned.includes('.')) {
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.')
    } else {
      cleaned = cleaned.replace(/,/g, '')
    }
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }

  return Number(cleaned) || 0
}

export const formatMoneyForDisplay = (value: number | string): string => {
  const numberValue = typeof value === 'string' ? parseMoneyToNumber(value) : value

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue)
}