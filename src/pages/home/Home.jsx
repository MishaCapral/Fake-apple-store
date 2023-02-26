import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../api/getItems';
import qs from 'qs';
import { useFavoriteContext } from '../../context/SearchContext';
import CardItem from '../../components/cardItem/CardItem';
import SkeletonItem from '../../components/cardItem/Skeleton';
import Categories from '../../components/categories/Categories';
import PaginationBlock from '../../components/pagination/PaginationBlock';
import Sort from '../../components/sort/Sort';
import styles from './Home.module.scss';
import ErrorSample from '../../components/error/ErrorSample';
import { setSearchParams } from '../../redux/slices/filterSlice';
import { setPage } from '../../redux/slices/paginationSlice';

//import store from '../assets/store.json';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.items);
  const { categoryId, sortId, sortList } = useSelector((state) => state.filter);
  const { page } = useSelector((state) => state.pagination);
  const { debouncedInput } = useFavoriteContext();

  const fetchItems = () => {
    const sortBy = sortId.sortProperty.replace('-', '');
    const order = sortId.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId === 'All' ? '' : `category=${categoryId}`;
    const search = debouncedInput ? `&search=${debouncedInput}` : '';
    const pagination = `&page=${page}&limit=6`;

    dispatch(getItems({ category, sortBy, order, search, pagination }));
  };

  useEffect(() => {
    if (window.location.search) {
      const paramsFromUrl = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      const sort = sortList.find(
        (item) => item.sortProperty === paramsFromUrl.sort,
      );

      dispatch(setSearchParams({ ...paramsFromUrl, sort }));
      dispatch(setPage(paramsFromUrl.page));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, [categoryId, sortId, debouncedInput, page]);

  useEffect(() => {
    const searchParams = qs.stringify(
      { category: categoryId, sort: sortId.sortProperty, page },
      { addQueryPrefix: true },
    );
    navigate(searchParams);
  }, [categoryId, sortId, page, navigate]);

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
                    id={item.id}
                    title={item.title}
                    subtitle={item?.subtitle}
                    img={item.img}
                    memory={item.memory}
                    version={item.version}
                    price={item.price}
                    activeVariants={item.activeVariants}
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
