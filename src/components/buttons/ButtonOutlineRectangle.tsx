import React from 'react';
import styles from './ButtonOutlineRectangle.module.scss';

type ButtonOutlineRectangleProps = {
  callback?: () => void;
  children?: JSX.Element | JSX.Element[];
};

const ButtonOutlineRectangle: React.FC<ButtonOutlineRectangleProps> = ({
  children,
  callback,
}) => {
  return (
    <div className={styles.button} onClick={callback}>
      {children}
    </div>
  );
};

export default ButtonOutlineRectangle;
