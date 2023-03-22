import { useDispatch } from 'react-redux';
import { motion, useAnimationControls } from 'framer-motion';
import {
  addProduct,
  subtractProduct,
  deleteProduct,
  ProductType,
} from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import styles from './CartItem.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ButtonCircle from '../buttons/ButtonCircle';

const CartItem = ({ product }) => {
  const { id, title, img, model, option, productPrice, count, category } =
    product as ProductType;

  const dispatch = useDispatch();

  const plusProduct = () => dispatch(addProduct({ id, option, model }));
  const minusProduct = () => dispatch(subtractProduct({ id, option, model }));

  const controls = useAnimationControls();
  const removeProduct = () => {
    setTimeout(() => dispatch(deleteProduct({ id, option, model })), 800);
    controls.start({
      opacity: 0,
      height: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    });
  };

  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'linear', duration: 0.5 }}
    >
      <motion.div animate={controls} transition={{ duration: 0.7 }}>
        <div className={styles.item}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <div className={styles.item__descriptionWrapper}>
                <div className={styles.item__img}>
                  <Link to={`/${category}/${id}`}>
                    <img src={img} alt='cart product' />
                  </Link>
                </div>

                <div className={styles.item__info}>
                  <Link to={`/${category}/${id}`}>
                    <h3>{title}</h3>
                  </Link>

                  <p>{model}</p>
                  <p>{option}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={5}>
              <div className={styles.item__countPriceWrapper}>
                <div className={styles.item__count}>
                  <ButtonCircle callback={minusProduct}>
                    <RemoveIcon fontSize='small' />
                  </ButtonCircle>

                  <span>{count}</span>

                  <ButtonCircle callback={plusProduct}>
                    <AddIcon fontSize='small' />
                  </ButtonCircle>
                </div>
                <p className={styles.item__price}>
                  <span>{productPrice} $</span>
                </p>
              </div>
            </Grid>

            <Grid item xs={2}>
              <div className={styles.item__remove}>
                <ButtonCircle callback={removeProduct}>
                  <CloseIcon fontSize='small' />
                </ButtonCircle>
              </div>
            </Grid>
          </Grid>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartItem;
