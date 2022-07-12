import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss"

interface IProps {
  id: string
  url: string
  short_url: string
  clicks: number
}

export const Link = ({ id, url, short_url, clicks }: IProps) => {
  const [animation, setAnimation] = useState<boolean>(false)
  const firstClickValue = useRef<number>(clicks)

  useEffect(() => {
    if (clicks !== firstClickValue.current) {
      setAnimation(true)
    }
  }, [clicks])

  return (
    <li className={styles.linksList__row}>
      <span className={styles.linksList__id}>{id}</span>
      <div className={styles.linksList__url}>
        <a target="_blank" href={url}>
          {url}
        </a>
      </div>
      <div className={styles.linksList__shortUrl}>
        <a href={short_url} target="_blank">
          Короткая ссылка
        </a>
      </div>
      <div className={styles["linksList__clicks-wrapper"]}>
        <span>{clicks ? clicks : 0}</span>
        <div
          className={clsx(styles.linksList__clicks, {
            [styles["link-click"]]: animation,
          })}
          onAnimationEnd={() => {
            setAnimation(false)
          }}
        />
      </div>
    </li>
  )
}
