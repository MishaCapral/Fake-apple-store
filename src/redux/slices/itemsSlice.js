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
    setActiveVariant: (state, action) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(state => state.id === action.payload.id)
      item.activeVariants.versionIndex = action.payload.newVersionIndex
      state.items = existingItems
    },
    setActiveMemory: (state, action) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(state => state.id === action.payload.id)
      item.activeVariants.memoryIndex = action.payload.newMemoryIndex
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

export const { setItems, setItem, setActiveVariant, setActiveMemory } = itemsSlice.actions

export default itemsSlice.reducer