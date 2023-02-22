import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';
import styles from './Categories.module.scss';

const Categories = () => {
  const { categoryId, categories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(category))}
            className={categoryId === category ? styles.active : null}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
