import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CartItem from '../../components/cartItem/CartItem';
import ButtonOutlineRectangle from '../../components/buttons/ButtonOutlineRectangle';
import ButtonFillRectangle from '../../components/buttons/ButtonFillRectangle';

const Cart = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cart}>
        <div className={styles.cart__top}>
          <h2 className={styles.cart__title}>
            <ShoppingCartIcon />
            Bucket
          </h2>
          <div className={styles.cart__clear}>
            <DeleteIcon />
            <span>clear</span>
          </div>
        </div>

        <div className={styles.cart__items}>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className={styles.cart__bottom}>
          <div className={styles.cart__bottom__details}>
            <span>
              amount of: <b>3 p.</b>
            </span>
            <span>
              Total price: <b>900 $</b>
            </span>
          </div>
          <div className={styles.cart__bottom__buttons}>
            <Link to={-1}>
              <ButtonOutlineRectangle>
                <ArrowBackIosIcon fontSize='small' />
                <span>Back</span>
              </ButtonOutlineRectangle>
            </Link>

            <ButtonFillRectangle>
              <span>Pay now</span>
            </ButtonFillRectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
