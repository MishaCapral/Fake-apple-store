import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useAnimationControls } from 'framer-motion';
import styles from './Cart.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CartItem from '../../components/cartItem/CartItem';
import ButtonOutlineRectangle from '../../components/buttons/ButtonOutlineRectangle';
import ButtonFillRectangle from '../../components/buttons/ButtonFillRectangle';
import { clearAllProducts } from '../../redux/slices/cartSlice';
import EmptyCart from '../../components/emptyCart/EmptyCart';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPrice, totalCount } = useSelector(
    (state: any) => state.cart,
  );

  const controls = useAnimationControls();
  const clearAll = () => {
    //@ts-ignore
    setTimeout(() => dispatch(clearAllProducts()), 1100);
    controls.start({
      height: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cart}>
        {products.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <div className={styles.cart__top}>
              <h2 className={styles.cart__title}>
                <ShoppingCartIcon />
                Bucket
              </h2>
              <button onClick={clearAll} className={styles.cart__clear}>
                <DeleteIcon />
                <span>clear</span>
              </button>
            </div>

            <div className={styles.cart__items}>
              <motion.div animate={controls} transition={{ duration: 1 }}>
                {products &&
                  products.map((item) => (
                    <CartItem key={item.renderId} product={item} />
                  ))}
              </motion.div>
            </div>
          </div>
        )}

        <div className={styles.cart__bottom}>
          {!products && (
            <div className={styles.cart__bottom__details}>
              <span>
                amount of: <b>{totalCount} p.</b>
              </span>
              <span>
                Total price: <b>{totalPrice} $</b>
              </span>
            </div>
          )}

          <div className={styles.cart__bottom__buttons}>
            <ButtonOutlineRectangle callback={() => navigate(-1)}>
              <ArrowBackIosIcon fontSize='small' />
              <span>Back</span>
            </ButtonOutlineRectangle>
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
