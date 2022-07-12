import { createAsyncThunk } from "@reduxjs/toolkit"
import { getShortLink } from "@/shared/api/links"
import { toast } from "react-toastify"

export const getShortLinkThunk = createAsyncThunk(
  "links/getShortenLink",
  async (link: string) => {
    try {
      const short_url = await getShortLink(link)
      return short_url
    } catch (error) {
      toast.error(
        "Не удалось сократить ссылку. Проверьте подключение к интернету!"
      )
      throw error
    }
  }
)

import { getLinks } from "@/shared/api/links"

export const getLinksThunk = createAsyncThunk(
  "links/getLinks",
  async ({ count, page }: { count: number; page: number }) => {
    try {
      const short_urls = await getLinks(count, page)
      return short_urls
    } catch (error) {
      throw error
    }
  }
)
