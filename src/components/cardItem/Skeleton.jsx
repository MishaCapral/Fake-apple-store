import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './CardItem.module.scss';

const SkeletonItem = () => (
  <div className={styles.wrapper}>
    <ContentLoader
      className={styles.item}
      speed={2}
      width={280}
      height={407}
      viewBox='0 0 280 407'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect x='34' y='0' rx='11' ry='11' width='220' height='200' />
      <rect x='46' y='216' rx='10' ry='10' width='188' height='27' />
      <rect x='0' y='260' rx='10' ry='10' width='280' height='88' />
      <rect x='167' y='359' rx='27' ry='27' width='108' height='45' />
      <rect x='5' y='365' rx='10' ry='10' width='116' height='27' />
    </ContentLoader>
  </div>
);

export default SkeletonItem;
