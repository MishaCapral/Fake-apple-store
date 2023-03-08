import { Link } from 'react-router-dom';
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
          <div className={styles.item__price}>
            Price:{' '}
            {
              type[activeVariants.versionIndex].version[
                activeVariants.memoryIndex
              ].price
            }
            $
          </div>
          <ButtonAdd />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
