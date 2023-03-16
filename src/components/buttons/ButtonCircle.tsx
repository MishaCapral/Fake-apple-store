import React from 'react';
import styles from './ButtonCircle.module.scss';

type ButtonCircleProps = {
  callback?: () => void;
  children: JSX.Element | JSX.Element[];
};

const ButtonCircle: React.FC<ButtonCircleProps> = ({ children, callback }) => {
  return (
    <div onClick={callback} className={styles.button}>
      {children}
    </div>
  );
};

export default ButtonCircle;
