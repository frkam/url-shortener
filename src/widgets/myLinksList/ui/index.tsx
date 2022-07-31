import { LinksList } from "@/entities/links"
import { ShortenLink } from "@/features/shortenLink"
import { useAppSelector } from "@/shared/lib"
import { Pagination } from "@/shared/ui"
import { useMemo, useState } from "react"
import { PER_PAGE_MYLINKS } from "@/shared/config"
import styles from "./styles.module.scss"

export const MyLinksList = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { links } = useAppSelector((state) => state.links.myLinks)

  const myLinks = links.map((link, i) => {
    return { ...link, id: (i + 1).toString() }
  })

  const currentPageLinks = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PER_PAGE_MYLINKS
    const lastPageIndex = firstPageIndex + PER_PAGE_MYLINKS
    return myLinks.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, myLinks])

  return (
    <div className={styles.myLinksList}>
      <ShortenLink />
      {currentPageLinks.length > 0 && (
        <>
          <h2 className={styles.myLinksList__heading}>Мои ссылки</h2>
          <div className={styles.myLinksList__list}>
            <LinksList links={currentPageLinks} />
            <Pagination
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              perPage={PER_PAGE_MYLINKS}
              totalCount={links.length}
              siblingCount={1}
            />
          </div>
        </>
      )}
    </div>
  )
}
