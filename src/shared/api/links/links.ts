import { graphQLClient } from "./base"
import { getLinksQuery, getShortLinkQuery } from "./queries"
import { IGetLinksResponse, IGetShortLinkResponse } from "./types"

export const getLinks = async (count: number, page: number) => {
  const response = await graphQLClient.request<IGetLinksResponse>(
    getLinksQuery,
    {
      first: count,
      page,
    }
  )
  return response.short_urls
}

export const getShortLink = async (url: string) => {
  const response = await graphQLClient.request<IGetShortLinkResponse>(
    getShortLinkQuery,
    { url }
  )

  return response.shorten_url.short_url
}
