import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../api/getItems';
import CardItem from '../../components/cardItem/CardItem';
import SkeletonItem from '../../components/cardItem/Skeleton';
import Categories from '../../components/categories/Categories';
import PaginationBlock from '../../components/pagination/PaginationBlock';
import Sort from '../../components/sort/Sort';
import { useFavoriteContext } from '../../context/SearchContext';
import styles from './Home.module.scss';
import ErrorSample from '../../components/error/ErrorSample';

//import store from '../assets/store.json';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.items);
  const { categoryId, sortId } = useSelector((state) => state.filter);
  const { page } = useSelector((state) => state.pagination);
  const { debouncedInput } = useFavoriteContext();

  useEffect(() => {
    const sortBy = sortId.sortProperty.replace('-', '');
    const order = sortId.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId === 'All' ? '' : `category=${categoryId}`;
    const search = debouncedInput ? `&search=${debouncedInput}` : '';
    const pagination = `&page=${page}&limit=6`;

    dispatch(getItems({ category, sortBy, order, search, pagination }));

    window.scrollTo(0, 0);
  }, [categoryId, sortId, debouncedInput, page, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <Categories />
        <Sort />
      </div>

      {status === 'error' ? (
        <div className={styles.content__error}>
          <ErrorSample text='failed to load page' />
        </div>
      ) : (
        <div>
          <h2 className={styles.content__title}>
            {categoryId === 'All' ? 'All products' : categoryId}
          </h2>

          <div className={styles.content__items}>
            {status === 'loading'
              ? [...new Array(6)].map((_, index) => (
                  <SkeletonItem key={index} />
                ))
              : items.map((item) => (
                  <CardItem
                    key={item.id}
                    title={item.title}
                    subtitle={item?.subtitle}
                    img={item.img}
                    memory={item.memory}
                    version={item.version}
                    price={item.price}
                  />
                ))}
          </div>
          <div className={styles.pagination}>
            <PaginationBlock />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
