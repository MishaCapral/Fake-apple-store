import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './EmptyCart.module.scss';

const EmptyCart: React.FC = () => {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.emptyCart__iconWrapper}>
        <AddShoppingCartIcon
          fontSize='large'
          className={styles.emptyCart__icon}
        />
      </div>
      <h1>no items in cart</h1>
      <p>add something to continue</p>
      <p></p>
    </div>
  );
};

export default EmptyCart;
