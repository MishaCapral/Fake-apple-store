import { ProductType } from '../redux/slices/cartSlice';
import updateTotalCount from './updateTotalCount';
import updateTotalPrice from './updateTotalPrice';

const getCartLocalStorage = () => {
  const json = localStorage.getItem('cart');
  const products: ProductType[] = json ? JSON.parse(json) : [];
  const totalCount = updateTotalCount(products);
  const totalPrice = updateTotalPrice(products);
  return {
    totalPrice,
    totalCount,
    products,
  };
};

export default getCartLocalStorage;
