import { useToggle } from 'react-use';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './Sort.module.scss';

const Sort = ({ value, onClickSort }) => {
  const [popup, setPopup] = useToggle(false);

  const list = [
    { name: 'alphabet', sortProperty: 'alphabet' },
    { name: 'price: low to high', sortProperty: 'price' },
    { name: 'price: high to low', sortProperty: '-price' },
  ];

  const onClickPopupItem = (item) => {
    onClickSort(item);
    setPopup();
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort__label} onClick={() => setPopup()}>
        <ArrowDropDownIcon className={popup ? styles.sort__rotate : ''} />
        <b>Sort by:</b>
        <span>{value.name}</span>
      </div>
      {popup && (
        <div className={styles.sort__popup}>
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                onClick={() => onClickPopupItem(item)}
                className={
                  value.sortProperty === item.sortProperty ? styles.active : ''
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
