import axios from 'axios';
import { useEffect, useState } from 'react';
import CardItem from '../../components/cardItem/CardItem';
import SkeletonItem from '../../components/cardItem/Skeleton';
import Categories from '../../components/categories/Categories';
import PaginationBlock from '../../components/pagination/PaginationBlock';
import Sort from '../../components/sort/Sort';
import { useFavoriteContext } from '../../context/SearchContext';
import styles from './Home.module.scss';

//import store from '../assets/store.json';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setcategoryId] = useState('All');
  const [sortId, setSortId] = useState({
    name: 'alphabet',
    sortProperty: 'alphabet',
  });
  const { debouncedInput } = useFavoriteContext();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    const sortBy = sortId.sortProperty.replace('-', '');
    const order = sortId.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId === 'All' ? '' : `category=${categoryId}`;
    const search = debouncedInput ? `&search=${debouncedInput}` : '';
    const pagination = `&page=${page}&limit=6`;

    axios
      .get(
        `https://63ea86464ade1a6f23a941b2.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${pagination}`,
      )
      .then((response) => {
        setItems(response.data);
      })
      // setItems(store);
      .then(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [categoryId, sortId, debouncedInput, page]);

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <Categories
          value={categoryId}
          onClickCategory={(i) => setcategoryId(i)}
        />
        <Sort value={sortId} onClickSort={(i) => setSortId(i)} />
      </div>
      <h2 className={styles.content__title}>
        {categoryId === 'All' ? 'All products' : categoryId}
      </h2>
      <div className={styles.content__items}>
        {loading
          ? [...new Array(6)].map((_, index) => <SkeletonItem key={index} />)
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
        <PaginationBlock page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Home;
