import React from 'react';
import { useToggle } from 'react-use';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './Sort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSortId } from '../../redux/slices/filterSlice';
// import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';

const Sort: React.FC = () => {
  //categoryId add to useSelector
  const { sortId, sortList } = useSelector(selectFilter);
  const dispatch = useDispatch();
  //const [searchParams, setSearchParams] = useSearchParams();
  const [popup, setPopup] = useToggle(false);

  const onClickPopupItem = (item) => {
    dispatch(setSortId(item));
    setPopup();
  };

  // * update URL when change category
  // useEffect(() => {
  //   setSearchParams((searchParams) => {
  //     searchParams.set('sort', sortId.sortProperty);
  //     return searchParams;
  //   });
  // }, [sortId, categoryId, setSearchParams]);

  // * Read query params from URL and update data
  // useEffect(() => {
  //   const queryParams = searchParams.get('sort');
  //   const queryItem = sortList.find(
  //     (item) => item.sortProperty === queryParams,
  //   );
  //   queryItem && dispatch(setSortId(queryItem));
  // }, [searchParams, sortList, dispatch]);

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
