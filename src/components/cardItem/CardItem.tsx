import React from 'react';
import { Link } from 'react-router-dom';
import {
  ActiveVariantsType,
  TypeItemType,
} from '../../redux/slices/itemsSlice';
import InfoToggle from '../infoToggle/InfoToggle';
import styles from './CardItem.module.scss';

type CardItemProps = {
  id: string;
  category: string;
  title: string;
  img: string;
  type: TypeItemType[];
  activeVariants: ActiveVariantsType;
};

const CardItem: React.FC<CardItemProps> = ({
  id,
  category,
  title,
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
          </div>
        </Link>

        <InfoToggle
          id={id}
          type={type}
          activeVariants={activeVariants}
          title={title}
          img={img}
          category={category}
        />
      </div>
    </div>
  );
};

export default CardItem;
