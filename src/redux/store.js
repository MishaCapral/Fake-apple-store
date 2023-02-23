import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import pagination from './slices/paginationSlice'
import items from './slices/itemsSlice'

export const store = configureStore({
  reducer: {
    items,
    filter,
    pagination
  },
})