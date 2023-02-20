import styles from './CartItem.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ButtonCircle from '../buttons/ButtonCircle';

function CartItem() {
  return (
    <div className={styles.item}>
      <div className={styles.item__img}>
        <img
          src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
          alt='Pizza'
        />
      </div>
      <div className={styles.item__info}>
        <h3>Title</h3>
        <p>description</p>
      </div>
      <div className={styles.item__count}>
        <ButtonCircle>
          <RemoveIcon fontSize='small' />
        </ButtonCircle>

        <b>2</b>

        <ButtonCircle>
          <AddIcon fontSize='small' />
        </ButtonCircle>
      </div>
      <div className={styles.item__price}>
        <b>770 $</b>
      </div>
      <div className={styles.item__remove}>
        <ButtonCircle>
          <CloseIcon fontSize='small' />
        </ButtonCircle>
      </div>
    </div>
  );
}

export default CartItem;
