import styles from "./styles.module.scss"

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__image}
        src="https://static.tildacdn.com/tild6637-3530-4532-a334-623539376431/Group_642.svg"
        alt="logo_profilance"
      />
      <h1 className={styles.header__heading}>Сокращатель</h1>
    </header>
  )
}
