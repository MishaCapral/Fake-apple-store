import { ProductType } from '../redux/slices/cartSlice';

const updateTotalPrice = (products: ProductType[]) => {
  const totalPrice = products.reduce((acc, product) => {
    return product.price * product.count + acc;
  }, 0);
  return totalPrice;
};

export default updateTotalPrice;
