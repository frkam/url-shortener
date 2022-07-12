import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILink, ILinkSocket } from "@/shared/api/links"
import { getShortLinkThunk, getLinksThunk } from "./thunks"
import { IPaginatorInfo, IShortUrls } from "@/shared/api/links"

interface IMyLinks {
  links: ILink[]
  isError: boolean
  isLoading: boolean
}

interface ILinks extends IMyLinks {
  paginationInfo: IPaginatorInfo | null
}

interface IInitialState {
  links: ILinks
  myLinks: IMyLinks
  isEstablishingConnection: boolean
  isConnected: boolean
}

const initialState: IInitialState = {
  links: {
    links: [],
    isError: false,
    isLoading: false,
    paginationInfo: null,
  },
  myLinks: {
    links: [],
    isError: false,
    isLoading: false,
  },
  isEstablishingConnection: false,
  isConnected: false,
}

export const slice = createSlice({
  name: "links",
  initialState,
  reducers: {
    startConnecting: (state: IInitialState) => {
      state.isEstablishingConnection = true
    },
    connectionEstablished: (state: IInitialState) => {
      state.isConnected = true
      state.isEstablishingConnection = true
    },
    disconnect: (state: IInitialState) => {
      state.isEstablishingConnection = false
    },
    updateClicksData: (
      state: IInitialState,
      action: PayloadAction<ILinkSocket>
    ) => {
      const indexOfClickedLinkInAllLinks = state.links.links.findIndex(
        (link) => link.url === action.payload.url
      )

      const indexOfClickedLinkInMyLinks = state.myLinks.links.findIndex(
        (link) => {
          return link.url === action.payload.url
        }
      )

      if (indexOfClickedLinkInAllLinks >= 0) {
        state.links.links[indexOfClickedLinkInAllLinks] = action.payload
      }

      if (indexOfClickedLinkInMyLinks >= 0) {
        state.myLinks.links[indexOfClickedLinkInMyLinks] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getShortLinkThunk.fulfilled,
      (state, action: PayloadAction<ILink>) => {
        const isLinkInList =
          state.myLinks.links.filter((link) => link.id === action.payload.id)
            .length > 0
        if (!isLinkInList) {
          state.myLinks.links.unshift(action.payload)
        } else {
          const indexLinkInArray = state.myLinks.links.findIndex(
            (link) => link.id === action.payload.id
          )
          state.myLinks.links.splice(indexLinkInArray, 1)
          state.myLinks.links.unshift(action.payload)
        }
        state.myLinks.isLoading = false
        state.myLinks.isError = false
      }
    )
    builder.addCase(getShortLinkThunk.rejected, (state) => {
      state.myLinks.isError = true
      state.myLinks.isLoading = false
    })
    builder.addCase(getShortLinkThunk.pending, (state) => {
      state.myLinks.isLoading = true
    })
    builder.addCase(getLinksThunk.pending, (state) => {
      state.links.isLoading = true
    })
    builder.addCase(
      getLinksThunk.fulfilled,
      (state, action: PayloadAction<IShortUrls>) => {
        state.links.links = action.payload.data
        state.links.paginationInfo = action.payload.paginatorInfo
        state.links.isError = false
        state.links.isLoading = false
      }
    )
    builder.addCase(getLinksThunk.rejected, (state) => {
      state.links.links = []
      state.links.isError = true
      state.links.isLoading = false
    })
  },
})

export const sliceActions = slice.actions
