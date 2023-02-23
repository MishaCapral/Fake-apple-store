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
  }
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
    }
  }

})

export const { setCategoryId, setSortId } = filterSlice.actions

export default filterSlice.reducer