import { useToggle } from 'react-use';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './Sort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortId } from '../../redux/slices/filterSlice';

const Sort = () => {
  const { sortId, sortList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [popup, setPopup] = useToggle(false);

  const onClickPopupItem = (item) => {
    dispatch(setSortId(item));
    setPopup();
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort__label} onClick={() => setPopup()}>
        <ArrowDropDownIcon className={popup ? styles.sort__rotate : ''} />
        <b>Sort by:</b>
        <span>{sortId.name}</span>
      </div>
      {popup && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                onClick={() => onClickPopupItem(item)}
                className={
                  sortId.sortProperty === item.sortProperty ? styles.active : ''
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
