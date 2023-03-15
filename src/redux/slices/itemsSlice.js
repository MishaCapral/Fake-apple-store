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
    },
    setItem: (state, action) => {
      state.items = action.payload
    },
    setActiveModel: (state, action) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(state => state.id === action.payload.id)
      item.activeVariants.modelIndex = action.payload.newModelIndex
      state.items = existingItems
    },
    setActiveOption: (state, action) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(state => state.id === action.payload.id)
      item.activeVariants.optionIndex = action.payload.newOptionIndex
      state.items = existingItems
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

export const { setItems, setItem, setActiveModel, setActiveOption } = itemsSlice.actions

export default itemsSlice.reducer