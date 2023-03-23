import React from 'react';
import ErrorSample from '../../components/error/ErrorSample';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <ErrorSample text='Page not Found' />
    </div>
  );
};

export default NotFound;
