import { ProductType } from '../redux/slices/cartSlice';

export const updateProductPrice = (product: ProductType) =>
  (product.productPrice = product.price * product.count);
