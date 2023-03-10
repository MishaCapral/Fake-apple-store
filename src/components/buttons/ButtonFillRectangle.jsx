import styles from './ButtonFillRectangle.module.scss';

const ButtonFillRectangle = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default ButtonFillRectangle;
