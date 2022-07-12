import { linksActions } from "@/entities/links"
import { useAppDispatch } from "@/shared/lib"
import { AllLinksList } from "@/widgets/allLinksList"
import { MyLinksList } from "@/widgets/myLinksList"
import { useEffect } from "react"
import styles from "./styles.module.scss"

export const UrlShortener = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(linksActions.startConnecting())
  }, [dispatch])

  return (
    <section className={styles.urlShortener}>
      <MyLinksList />
      <AllLinksList />
    </section>
  )
}
