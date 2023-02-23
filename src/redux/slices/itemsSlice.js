import { createSlice } from "@reduxjs/toolkit"
import { getItems } from "../../api/getItems"

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: 'loading' | 'succsess' | 'error',

  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: {
    [getItems.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [getItems.fulfilled]: (state, action) => {
      state.status = 'succsess'
      state.items = action.payload
    },
    [getItems.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []

    }
  }
})

export const { setItems } = itemsSlice.actions

export default itemsSlice.reducer