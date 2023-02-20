import styles from './ButtonOutlineRectangle.module.scss';

function ButtonOutlineRectangle({ children }) {
  return <div className={styles.button}>{children}</div>;
}

export default ButtonOutlineRectangle;
