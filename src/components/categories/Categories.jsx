import styles from './Categories.module.scss';

const categories = ['All', 'IPhone', 'iPad', 'Mac', 'Apple Watch', 'Airpods'];

const Categories = ({ value, onClickCategory }) => {
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(category)}
            className={value === category ? styles.active : null}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
