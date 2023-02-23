import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk(
  'items/getItems',
  async (args) => {
    const { category, sortBy, order, search, pagination } = args;
    const { data } = await axios.get(
      `https://63ea86464ade1a6f23a941b2.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${pagination}`
    )
    return data
  }

)