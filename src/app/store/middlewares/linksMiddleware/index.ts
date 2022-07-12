import { Middleware } from "@reduxjs/toolkit"
import { echo } from "@/shared/api/links/base"
import { ILinkSocket } from "@/shared/api/links"
import { linksActions } from "@/entities/links"
import { toast } from "react-toastify"

export const middleware: Middleware = (store) => {
  return (next) => (action) => {
    if (linksActions.startConnecting.match(action)) {
      echo.connector.socket.on("connect", () => {
        store.dispatch(linksActions.connectionEstablished())
      })

      echo.connector.socket.on("disconnect", () => {
        toast.error(
          "Невозможно обновление данных о ссылках. Проверьте подключение к интернету!"
        )
        store.dispatch(linksActions.disconnect())
      })

      echo
        .channel("btti_database_short_urls")
        .listen(
          ".new_click",
          (data: { short_url: ILinkSocket; socket: null }) => {
            const linkData = {
              ...data.short_url,
              id: data.short_url.id.toString(),
            }

            store.dispatch(linksActions.updateClicksData(linkData))
          }
        )
    }
    next(action)
  }
}
