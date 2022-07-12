import { usePagination } from "@/shared/lib"
import styles from "./styles.module.scss"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import clsx from "clsx"

interface IProps {
  totalCount: number
  siblingCount: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount,
  perPage,
  currentPage,
}: IProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    perPage,
  })

  if (!paginationRange) return null

  if (currentPage === 0 || paginationRange.length <= 1) return null

  const onPreviousPage = () => {
    onPageChange(currentPage - 1)
  }

  const onNextPage = () => {
    onPageChange(currentPage + 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li>
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className={styles.navigation__item}
          >
            <GrFormPrevious
              className={clsx(styles.navigation__icon, {
                [styles["navigation__icon--disabled"]]: currentPage === 1,
              })}
            />
          </button>
        </li>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === "...") {
            return (
              <li
                key={i}
                className={clsx(
                  styles.navigation__item,
                  styles["navigation__item--disabled"]
                )}
              >
                <BiDotsHorizontalRounded />
              </li>
            )
          }

          if (typeof pageNumber === "number") {
            return (
              <li key={i}>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={clsx(styles.navigation__item, {
                    [styles["navigation__item--active"]]:
                      currentPage === Number(pageNumber),
                  })}
                >
                  {pageNumber}
                </button>
              </li>
            )
          }
        })}
        <li>
          <button
            onClick={onNextPage}
            className={styles.navigation__item}
            disabled={currentPage === lastPage}
          >
            <GrFormNext
              className={clsx(styles.navigation__icon, {
                [styles["navigation__icon--disabled"]]:
                  currentPage === lastPage,
              })}
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}
