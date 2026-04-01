type TodayInfo = {
  date: string
  weekday: string
}

export const getTodayInfo = (date = new Date()): TodayInfo => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const weekday = date
    .toLocaleDateString('pt-BR', { weekday: 'long' })
    .toLowerCase()

  return {
    date: `${day}/${month}/${year}`,
    weekday
  }
}