import { Link } from 'react-router-dom';
import InfoToggle from '../infoToggle/InfoToggle';
import styles from './CardItem.module.scss';

const CardItem = ({ id, category, title, img, type, activeVariants }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <Link to={`/${category}/${id}`}>
          <img className={styles.item__image} src={img} alt='product' />
          <div className={styles.item__titleBlock}>
            <h4 className={styles.item__title}>{title}</h4>
          </div>
        </Link>

        <InfoToggle
          id={id}
          type={type}
          activeVariants={activeVariants}
          title={title}
          img={img}
        />
      </div>
    </div>
  );
};

export default CardItem;
