import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../redux/slices/cartSlice';
import ButtonAdd from '../buttons/ButtonAdd';
import InfoToggle from '../infoToggle/InfoToggle';
import styles from './CardItem.module.scss';

const CardItem = ({
  id,
  category,
  title,
  subtitle = '',
  img,
  type,
  activeVariants,
}) => {
  const price =
    type[activeVariants.versionIndex].version[activeVariants.memoryIndex].price;

  const model = type[activeVariants.versionIndex].model;

  const memory =
    type[activeVariants.versionIndex].version[activeVariants.memoryIndex]
      .memory;

  const renderId = `${id}_${model.split(' ').join('')}_${Date.now()}_${memory}`;

  const itemForCart = {
    id,
    renderId,
    title,
    img,
    price,
    model,
    memory,
  };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);

  const itemCount = products.find(
    (item) => id === item.id && model === item.model && memory === item.memory,
  );

  const addItem = () => {
    dispatch(addProduct(itemForCart));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <Link to={`/${category}/${id}`}>
          <img className={styles.item__image} src={img} alt='product' />
          <div className={styles.item__titleBlock}>
            <h4 className={styles.item__title}>{title}</h4>
            <h5>{subtitle}</h5>
          </div>
        </Link>

        <InfoToggle id={id} type={type} activeVariants={activeVariants} />

        <div className={styles.item__bottom}>
          <div className={styles.item__price}>Price: {price}$</div>
          <ButtonAdd callback={addItem} count={itemCount?.count} />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
