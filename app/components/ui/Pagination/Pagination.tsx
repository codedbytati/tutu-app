"use client"

import { type ReactNode } from 'react'
import {
  makeNavigationButtonStyle,
  makePageButtonStyle,
} from './Pagination.styles'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  nextLabel?: ReactNode
  previousLabel?: ReactNode
  hideWhenSinglePage?: boolean
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  nextLabel = 'Próxima',
  previousLabel = 'Anterior',
  hideWhenSinglePage = true,
}: PaginationProps) => {
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  if (hideWhenSinglePage && totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
      <button
        type='button'
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={!hasPreviousPage}
        className={makeNavigationButtonStyle()}
      >
        {previousLabel}
      </button>
      <div className='flex flex-wrap items-center gap-2'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
          const isCurrentPage = page === currentPage

          return (
            <button
              key={page}
              type='button'
              onClick={() => onPageChange(page)}
              aria-current={isCurrentPage ? 'page' : undefined}
              className={makePageButtonStyle({ isSelected: isCurrentPage })}
            >
              {page}
            </button>
          )
        })}
      </div>
      <button
        type='button'
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={!hasNextPage}
        className={makeNavigationButtonStyle()}
      >
        {nextLabel}
      </button>
    </div>
  )
}