import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

interface CartSliceInterface {
  totalPrice: number;
  totalCount: number;
  products: ProductType[];
}

const initialState: CartSliceInterface = {
  totalPrice: 0,
  totalCount: 0,
  products: [],
};

const updateTotalPrice = (state: CartSliceInterface) =>
  (state.totalPrice = state.products.reduce((acc, product) => {
    return product.price * product.count + acc;
  }, 0));

const updateProductPrice = (product: ProductType) =>
  (product.productPrice = product.price * product.count);

const updateTotalCount = (state: CartSliceInterface) =>
  (state.totalCount = state.products.reduce((acc, product) => {
    return product.count + acc;
  }, 0));

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
      updateTotalPrice(state);
      updateTotalCount(state);
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
        updateTotalPrice(state);
        updateTotalCount(state);
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
        updateTotalPrice(state);
        updateTotalCount(state);
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
