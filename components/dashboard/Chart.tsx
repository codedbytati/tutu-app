'use client'

import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

import { Text } from '@/components/ui'
import { useTransactionsContext } from '@/features/transactions/context/TransactionsContext'
import { formatMoneyForDisplay, parseMoneyToNumber } from '@/utils/money'

const monthLabelFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: 'numeric',
})

const parseDate = (date: string) => {
  const [day, month, year] = date.split('/')

  if (!day || !month || !year) {
    return new Date(date)
  }

  return new Date(Number(year), Number(month) - 1, Number(day))
}

const getMonthKey = (date: string) => {
  const parsedDate = parseDate(date)

  return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}`
}

const getMonthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)

  return monthLabelFormatter.format(date)
}

export const Chart = () => {
  const { extracts } = useTransactionsContext()

  const groupedByMonth = extracts.reduce(
    (accumulator, item) => {
      const monthKey = getMonthKey(item.date)
      const entry = accumulator.get(monthKey) ?? { income: 0, expense: 0 }
      const amount = parseMoneyToNumber(item.amount)

      if (item.type === 'INCOME') {
        entry.income += amount
      } else {
        entry.expense += amount
      }

      accumulator.set(monthKey, entry)
      return accumulator
    },
    new Map<string, { income: number; expense: number }>(),
  )

  const monthKeys = Array.from(groupedByMonth.keys()).sort(
    (leftMonth, rightMonth) => new Date(`${leftMonth}-01`).getTime() - new Date(`${rightMonth}-01`).getTime(),
  )

  const categories = monthKeys.map(getMonthLabel)
  const expenseSeries = monthKeys.map((monthKey) => groupedByMonth.get(monthKey)?.expense ?? 0)
  const incomeSeries = monthKeys.map((monthKey) => groupedByMonth.get(monthKey)?.income ?? 0)

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
    },
    colors: ['#16a34a', '#ef4444'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.2,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
      axisBorder: {
        color: '#e5e7eb',
      },
      axisTicks: {
        color: '#e5e7eb',
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatMoneyForDisplay(value),
      },
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6,
      },
    },
  }

  const series = [
    {
      name: 'Entradas',
      data: incomeSeries,
    },
    {
      name: 'Saídas',
      data: expenseSeries,
    },
  ]

  return (
    <div className='flex flex-col gap-3 rounded-4xl border border-white/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm'>
      <div className='mb-4 flex flex-wrap items-start justify-between gap-3'>
        <div>
          <Text appearance='h2'>Despesas do ano</Text>
        </div>
      </div>

      {categories.length > 0 ? (
        <ReactApexChart options={options} series={series} type='area' height={280} />
      ) : (
        <div className='flex h-70 items-center justify-center rounded-3xl border border-dashed border-slate-200 text-sm text-slate-500'>
          Adicione transações para visualizar o histórico.
        </div>
      )}
    </div>
  )
}