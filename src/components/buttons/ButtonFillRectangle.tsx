import React from 'react';
import styles from './ButtonFillRectangle.module.scss';

type ButtonFillRectangleProps = {
  children: JSX.Element[] | JSX.Element;
};

const ButtonFillRectangle: React.FC<ButtonFillRectangleProps> = ({
  children,
}) => {
  return <button className={styles.button}>{children}</button>;
};

export default ButtonFillRectangle;
