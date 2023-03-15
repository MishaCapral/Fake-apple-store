import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { setCategoryId } from '../../redux/slices/filterSlice';
import styles from './Categories.module.scss';

const CategoriesButtons = () => {
  const { category } = useParams();
  const { categories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryId(category));
  }, [category, dispatch]);

  return (
    <div className={styles.categories}>
      {categories.map((categoryItem, index) => (
        <NavLink
          key={index}
          to={`/${categoryItem}`}
          className={styles.categories__button}
        >
          {categoryItem}
        </NavLink>
      ))}
    </div>
  );
};

export default CategoriesButtons;
