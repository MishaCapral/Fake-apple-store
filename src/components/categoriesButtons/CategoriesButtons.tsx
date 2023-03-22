import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice';
import styles from './Categories.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, Navigation } from 'swiper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';

const CategoriesButtons: React.FC = () => {
  const { category } = useParams();
  const { categories } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    if (category) {
      dispatch(setCategoryId(category));
    }
  }, [category, dispatch]);

  return (
    <div className={styles.categories}>
      <button onClick={() => swiperRef.current?.slidePrev()}>
        <ArrowForwardIosIcon />
      </button>

      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          740: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className={styles.categories__swiper}
      >
        {categories.map((categoryItem, index) => (
          <SwiperSlide
            key={index}
            className={
              category === categoryItem
                ? styles.categories__categoryActiveLink
                : styles.categories__categoryLink
            }
          >
            <Link
              className={styles.categories__categoryNavLink}
              to={`/${categoryItem}`}
            >
              {categoryItem}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={() => swiperRef.current?.slideNext()}>
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default CategoriesButtons;
