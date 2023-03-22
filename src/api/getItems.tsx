import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemInterface } from '../redux/slices/itemsSlice';

export const getItems = createAsyncThunk<
  ItemInterface[],
  Record<string, string>
>('items/getItems', async (args) => {
  const { category, sortBy, order, search, pagination } = args;
  const { data } = await axios.get<ItemInterface[]>(
    `https://63ea86464ade1a6f23a941b2.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${pagination}`,
  );
  return data;
});
