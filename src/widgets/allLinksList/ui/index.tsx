import { getLinksThunk } from "@/entities/links"
import { LinksList } from "@/entities/links"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { Pagination } from "@/shared/ui"
import { useEffect, useState } from "react"
import { PER_PAGE_ALLLINKS } from "@/shared/config"
import styles from "./styles.module.scss"
import { ImSpinner2 } from "react-icons/im"
import clsx from "clsx"

export const AllLinksList = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLinksThunk({ count: PER_PAGE_ALLLINKS, page: currentPage }))
  }, [currentPage, dispatch])

  const { links, paginationInfo, isError, isLoading } = useAppSelector(
    (state: AppState) => state.links.links
  )

  return (
    <div className={styles.allLinksList}>
      <h2 className={styles.allLinksList__heading}>Список ссылок</h2>
      <div className={styles.allLinksList__list}>
        {isLoading && (
          <ImSpinner2
            className={clsx(["spinner", styles.allLinksList__spinner])}
          />
        )}
        {isError && !isLoading && (
          <span className={clsx(["error", styles.allLinksList__error])}>
            Не удалось загрузить список ссылок. Проверьте подключение к
            интернету.
          </span>
        )}
        {!isError && <LinksList links={links} />}
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          perPage={PER_PAGE_ALLLINKS}
          totalCount={paginationInfo?.total!}
          siblingCount={1}
        />
      </div>
    </div>
  )
}
