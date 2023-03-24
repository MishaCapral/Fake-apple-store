import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCartLocalStorage from '../../utils/getCartLocalStorage';
import { updateProductPrice } from '../../utils/updateProductPrice';
import updateTotalCount from '../../utils/updateTotalCount';
import updateTotalPrice from '../../utils/updateTotalPrice';
import { RootState } from '../store';

export type ProductType = {
  count: number;
  renderId?: string;
  productPrice: number;
  id: string;
  img: string;
  model: string;
  option: string;
  price: number;
  title: string;
  category: string;
};

export type ItemForCartType = {
  id: string;
  model: string;
  option: string;
  renderId?: string;
  title?: string;
  img?: string;
  price?: number;
};

export interface CartSliceInterface {
  totalPrice: number;
  totalCount: number;
  products: ProductType[];
}

const { totalPrice, totalCount, products } = getCartLocalStorage();

const initialState: CartSliceInterface = {
  totalPrice,
  totalCount,
  products,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ItemForCartType>) => {
      const findItem = state.products.find(
        (product) =>
          action.payload.id === product.id &&
          action.payload.model === product.model &&
          action.payload.option === product.option,
      );

      if (findItem) {
        findItem.count++;
        updateProductPrice(findItem);
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
          //@ts-ignore
          productPrice: action.payload.price,
        });
      }
      state.totalPrice = updateTotalPrice(state.products);
      state.totalCount = updateTotalCount(state.products);
    },
    subtractProduct: (state, action: PayloadAction<ItemForCartType>) => {
      const findItem = state.products.find(
        (product) =>
          action.payload.id === product.id &&
          action.payload.model === product.model &&
          action.payload.option === product.option,
      );

      if (findItem) {
        findItem.count > 1 && findItem.count--;
        updateProductPrice(findItem);
        state.totalPrice = updateTotalPrice(state.products);
        state.totalCount = updateTotalCount(state.products);
      }
    },
    deleteProduct: (state, action: PayloadAction<ItemForCartType>) => {
      const findItem = state.products.find(
        (product) =>
          action.payload.id === product.id &&
          action.payload.model === product.model &&
          action.payload.option === product.option,
      );
      if (findItem) {
        const index = state.products.indexOf(findItem);
        state.products.splice(index, 1);
        state.totalPrice = updateTotalPrice(state.products);
        state.totalCount = updateTotalCount(state.products);
      }
    },
    clearAllProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { addProduct, subtractProduct, deleteProduct, clearAllProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
