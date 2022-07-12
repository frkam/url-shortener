import { gql } from "graphql-request"

export const getLinksQuery = gql`
  query getLinks($first: Int!, $page: Int!) {
    short_urls(first: $first, page: $page) {
      data {
        clicks
        id
        url
        short_url
        created_at
        updated_at
      }

      paginatorInfo {
        currentPage
        hasMorePages
        total
        count
      }
    }
  }
`

export const getShortLinkQuery = gql`
  mutation getShortLink($url: String!) {
    shorten_url(url: $url) {
      short_url {
        clicks
        id
        url
        short_url
        created_at
        updated_at
      }
    }
  }
`
