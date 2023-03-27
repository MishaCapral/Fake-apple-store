import { ProductType } from '../redux/slices/cartSlice';

const updateTotalCount = (products: ProductType[]) => {
  const totalCount = products.reduce((acc, product) => {
    return product.count + acc;
  }, 0);
  return totalCount;
};

export default updateTotalCount;
