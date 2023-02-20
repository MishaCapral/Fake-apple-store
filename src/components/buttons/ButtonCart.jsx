import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './ButtonCart.module.scss';

function ButtonCart() {
  return (
    <div className={styles.cart}>
      <span>520 $</span>
      <div className={styles.cart__delimiter}></div>
      <ShoppingCartIcon />
      <span>3</span>
    </div>
  );
}

export default ButtonCart;
