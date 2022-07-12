import { ILink } from "@/shared/api/links"
import styles from "./styles.module.scss"
import { Link } from "../link/index"

interface IProps {
  links: ILink[]
}

export const LinksList = ({ links }: IProps) => {
  return (
    <ul className={styles.linksList}>
      {links.map((link) => {
        return (
          <Link
            key={link.url}
            id={link.id}
            clicks={link.clicks}
            url={link.url}
            short_url={link.short_url}
          />
        )
      })}
    </ul>
  )
}
