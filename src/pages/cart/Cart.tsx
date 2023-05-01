import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useAnimationControls } from 'framer-motion';
import { Dialog, DialogActions } from '@mui/material';
import { useToggle } from 'react-use';
import { clearAllProducts, selectCart } from '../../redux/slices/cartSlice';
import styles from './Cart.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CartItem from '../../components/cartItem/CartItem';
import ButtonOutlineRectangle from '../../components/buttons/ButtonOutlineRectangle';
import ButtonFillRectangle from '../../components/buttons/ButtonFillRectangle';
import EmptyCart from '../../components/emptyCart/EmptyCart';
import useDidMountEffect from '../../utils/useDidMountEffect';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPrice, totalCount } = useSelector(selectCart);

  const [openModal, setOpenModal] = useToggle(false);

  const controls = useAnimationControls();

  useDidMountEffect(() => {
    const json = JSON.stringify(products);
    localStorage.setItem('cart', json);
  }, [products]);

  const clearAll = () => {
    setOpenModal();

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
              <button onClick={setOpenModal} className={styles.cart__clear}>
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
          {totalCount > 0 && (
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
            {products.length !== 0 && (
              <Link to='/cart/ordering'>
                <ButtonFillRectangle>
                  <span>Pay now</span>
                </ButtonFillRectangle>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={setOpenModal}>
        <div className={styles.modal}>
          <p>Are you sure you want to empty your shopping cart?</p>

          <DialogActions sx={{ justifyContent: 'space-around' }}>
            <ButtonOutlineRectangle callback={clearAll}>
              <span>yes</span>
            </ButtonOutlineRectangle>
            <ButtonOutlineRectangle callback={setOpenModal}>
              <span>no</span>
            </ButtonOutlineRectangle>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Cart;
