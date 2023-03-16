import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './ButtonCart.module.scss';

const ButtonCart: React.FC = () => {
  const { totalPrice, totalCount } = useSelector((state: any) => state.cart);
  return (
    <div className={styles.cart}>
      <span>{totalPrice} $</span>
      <div className={styles.cart__delimiter}></div>
      <ShoppingCartIcon />
      <span>{totalCount}</span>
    </div>
  );
};

export default ButtonCart;
