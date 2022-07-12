import { configureStore } from "@reduxjs/toolkit"
import { linksSlice } from "@/entities/links"
import { linksMiddleware } from "./middlewares"

export const store = configureStore({
  reducer: {
    links: linksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([linksMiddleware])
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
