import styles from './ButtonCircle.module.scss';

const ButtonCircle = ({ children, callback }) => {
  return (
    <div onClick={callback} className={styles.button}>
      {children}
    </div>
  );
};

export default ButtonCircle;
