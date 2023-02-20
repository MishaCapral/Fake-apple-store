import styles from './ButtonFillRectangle.module.scss';

function ButtonFillRectangle({ children }) {
  return <div className={styles.button}>{children}</div>;
}

export default ButtonFillRectangle;
