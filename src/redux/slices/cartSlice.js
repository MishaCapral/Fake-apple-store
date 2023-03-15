import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  products: []
}

const updateTotalPrice = (state) => state.totalPrice = state.products.reduce((acc, product) => { return (product.price * product.count) + acc }, 0)

const updateProductPrice = (product) => product.productPrice = product.price * product.count

const updateTotalCount = (state) => state.totalCount = state.products.reduce((acc, product) => { return product.count + acc }, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const findItem = state.products.find(product => action.payload.id === product.id && action.payload.model === product.model && action.payload.memory === product.memory);

      if (findItem) {
        findItem.count++
        updateProductPrice(findItem)
      } else {
        state.products.push({ ...action.payload, count: 1, productPrice: action.payload.price });
      }
      updateTotalPrice(state)
      updateTotalCount(state)
    },
    subtractProduct: (state, action) => {
      const findItem = state.products.find(product => action.payload.id === product.id && action.payload.model === product.model && action.payload.memory === product.memory);

      findItem.count > 1 && findItem.count--
      updateProductPrice(findItem)
      updateTotalPrice(state)
      updateTotalCount(state)

    },
    deleteProduct: (state, action) => {
      const findItem = state.products.find(product => action.payload.id === product.id && action.payload.model === product.model && action.payload.memory === product.memory);

      const index = state.products.indexOf(findItem);
      state.products.splice(index, 1);
      updateTotalPrice(state)
      updateTotalCount(state)

    },
    clearAllProducts: (state, action) => {
      state.products = []
      state.totalPrice = 0
      state.totalCount = 0
    }

  }

})

export const { addProduct, subtractProduct, deleteProduct, clearAllProducts } = cartSlice.actions

export default cartSlice.reducer