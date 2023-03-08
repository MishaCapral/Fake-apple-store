import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: ['All', 'IPhone', 'iPad', 'Mac', 'Apple Watch', 'Airpods'],
  categoryId: 'All',
  sortList: [
    { name: 'alphabet', sortProperty: 'alphabet' },
    { name: 'price: low to high', sortProperty: 'price' },
    { name: 'price: high to low', sortProperty: '-price' },
  ],
  sortId: {
    name: 'alphabet',
    sortProperty: 'alphabet',
  },
  page: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSortId: (state, action) => {
      state.sortId = action.payload
    },
    setSearchParams: (state, action) => {
      state.categoryId = action.payload.category
      state.sortId = action.payload.sort
    },
    setPage: (state, action) => {
      state.page = Number(action.payload)
    }
  }

})

export const { setCategoryId, setSortId, setSearchParams, setPage } = filterSlice.actions

export default filterSlice.reducer