import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../search/Search';
import styles from './Header.module.scss';
import AppleIcon from '@mui/icons-material/Apple';
import ButtonCart from '../buttons/ButtonCart';

const Header: React.FC = () => {
  const { search } = useLocation();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to='/'>
            <AppleIcon className={styles.header__icon} />
          </Link>
          <div>
            <Link to='/'>
              <h1>Store.</h1>
            </Link>
            <p>The best way to buy the products you love</p>
          </div>
        </div>

        {search && (
          <div className={styles.header__search}>
            <Search />
          </div>
        )}
        <div className={styles.header__button}>
          <Link to='/cart'>
            <ButtonCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
