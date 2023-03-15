import React from 'react';
import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../api/getItems';
import { useFavoriteContext } from '../../context/SearchContext';
import CardItem from '../../components/cardItem/CardItem';
import SkeletonItem from '../../components/cardItem/Skeleton';
import CategoriesButtons from '../../components/categoriesButtons/CategoriesButtons';
import PaginationBlock from '../../components/pagination/PaginationBlock';
import Sort from '../../components/sort/Sort';
import styles from './Categories.module.scss';
import ErrorSample from '../../components/error/ErrorSample';

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state: any) => state.items);
  const { categoryId, sortId, page } = useSelector(
    (state: any) => state.filter,
  );

  //@ts-ignore
  const { debouncedInput } = useFavoriteContext();

  const getProperties = useCallback(() => {
    const sortBy = sortId.sortProperty.replace('-', '');

    const order = sortId.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId === 'All' ? '' : `category=${categoryId}`;

    const search = debouncedInput ? `&title=${debouncedInput}` : '';
    const pagination = `&page=${page}&limit=6`;
    return { sortBy, order, category, search, pagination };
  }, [categoryId, page, debouncedInput, sortId]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    //@ts-ignore
    dispatch(getItems(getProperties()));
  }, [getProperties, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <CategoriesButtons />
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
                    category={item.category}
                    title={item.title}
                    subtitle={item?.subtitle}
                    img={item.img}
                    type={item.type}
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

export default Categories;
