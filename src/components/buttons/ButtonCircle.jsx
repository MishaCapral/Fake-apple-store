import React from 'react';
import styles from './ButtonCircle.module.scss';

function ButtonCircle({ children }) {
  return <div className={styles.button}>{children}</div>;
}

export default ButtonCircle;
