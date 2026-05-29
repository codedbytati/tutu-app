import { useMemo, useState } from 'react'

import { groupTransactionsByDate } from '@/utils/groupByDate'
import { ExtractItem } from '@/utils/types'

const ITEMS_PER_PAGE = 5

const parseDate = (date: string) => {
  const [day, month, year] = date.split('/')

  return new Date(Number(year), Number(month) - 1, Number(day))
}

const normalizeSearch = (value: string) => {
  return value.trim().toLowerCase()
}

const filterExtracts = (items: ExtractItem[], searchTerm: string) => {
  const normalizedSearch = normalizeSearch(searchTerm)

  if (!normalizedSearch) {
    return items
  }

  return items.filter((item) => {
    return [item.description, item.category, item.date]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch)
  })
}

type UseExtractListParams = {
  extracts: ExtractItem[]
}

export const useExtractList = ({ extracts }: UseExtractListParams) => {
  const [openSearchField, setOpenSearchField] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const orderedExtracts = useMemo(() => {
    return [...extracts].sort((leftItem, rightItem) => {
      return parseDate(rightItem.date).getTime() - parseDate(leftItem.date).getTime()
    })
  }, [extracts])

  const filteredExtracts = useMemo(() => {
    return filterExtracts(orderedExtracts, searchTerm)
  }, [orderedExtracts, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredExtracts.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const pageItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE

    return filteredExtracts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredExtracts, safeCurrentPage])

  const groupedExtracts = useMemo(() => {
    return groupTransactionsByDate(pageItems)
  }, [pageItems])

  return {
    groupedExtracts,
    filteredExtracts,
    totalPages,
    safeCurrentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    openSearchField,
    setOpenSearchField,
  }
}