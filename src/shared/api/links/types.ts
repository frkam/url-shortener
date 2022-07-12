export interface ILink {
  id: string
  url: string
  short_url: string
  clicks: number
  created_at: string
  updated_at: string
}

export interface ILinkSocket extends ILink {
  hash: string
}

export interface IPaginatorInfo {
  currentPage: number
  hasMorePages: boolean
  total: number
  count: number
}

export interface IShortUrls {
  data: ILink[]
  paginatorInfo: IPaginatorInfo
}

export interface IGetLinksResponse {
  short_urls: IShortUrls
}

export interface IGetShortLinkResponse {
  shorten_url: {
    short_url: ILink
  }
}
