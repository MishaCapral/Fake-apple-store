import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type sortIdType = {
  name: string;
  sortProperty: string;
};

const initialState = {
  categories: ['All', 'IPhone', 'iPad', 'Mac', 'Apple Watch', 'Airpods'],
  categoryId: 'All',
  sortList: [
    { name: 'alphabet', sortProperty: 'alphabet' },
    { name: 'price: low to high', sortProperty: 'minPrice' },
    { name: 'price: high to low', sortProperty: '-minPrice' },
  ],
  sortId: {
    name: 'alphabet',
    sortProperty: 'alphabet',
  },
  page: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setSortId: (state, action: PayloadAction<sortIdType>) => {
      state.sortId = action.payload;
    },
    // setSearchParams: (state, action) => {
    //   console.log(action.payload.category);
    //   state.categoryId = action.payload.category;
    //   state.sortId = action.payload.sort;
    // },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = Number(action.payload);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const { setCategoryId, setSortId, setPage } = filterSlice.actions;

export default filterSlice.reducer;
