import { useMemo } from "react"

interface IProps {
  currentPage: number
  perPage: number
  siblingCount: number
  totalCount: number
}

const moreElements = "..."

const getRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => i + start)
}

export const usePagination = ({
  currentPage,
  perPage,
  siblingCount,
  totalCount,
}: IProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / perPage)

    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return getRange(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = getRange(1, leftItemCount)

      return [...leftRange, moreElements, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = getRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, moreElements, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex)
      return [
        firstPageIndex,
        moreElements,
        ...middleRange,
        moreElements,
        lastPageIndex,
      ]
    }
  }, [currentPage, perPage, siblingCount, totalCount])

  return paginationRange
}
