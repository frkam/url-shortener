import { UrlShortener } from "./url-shortener"
import { Header } from "@/widgets/header"
import { ToastContainer } from "react-toastify"
import styles from "./index.module.scss"
import "react-toastify/dist/ReactToastify.css"

export const Routing = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <UrlShortener />
      </main>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: "1.6rem" }}
      />
    </>
  )
}
