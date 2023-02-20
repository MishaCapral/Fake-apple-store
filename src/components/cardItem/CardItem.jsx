import ButtonAdd from '../buttons/ButtonAdd';
import styles from './CardItem.module.scss';

const CardItem = ({ title, subtitle = '', img, version, memory, price }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <img className={styles.item__image} src={img} alt='product' />
        <div className={styles.item__titleBlock}>
          <h4 className={styles.item__title}>{title}</h4>
          <h5>{subtitle}</h5>
        </div>
        <div className={styles.item__selector}>
          <ul>
            {version.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            {/* <li className='active'>Global</li> */}
          </ul>
          <ul>
            {memory.map((item, index) => (
              <li key={index}>{item}GB</li>
            ))}
            {/* <li className='active'>128GB</li> */}
          </ul>
        </div>
        <div className={styles.item__bottom}>
          <div className={styles.item__price}>from {price} $</div>
          <ButtonAdd />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
