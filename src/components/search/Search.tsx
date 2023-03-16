import React from 'react';
import { useRef } from 'react';
import { useFavoriteContext } from '../../context/SearchContext';
import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search: React.FC = () => {
  //@ts-ignore
  const { input, setInput } = useFavoriteContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearInput = () => {
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <SearchIcon fontSize='medium' className={styles.search__searchIcon} />
      <input
        ref={inputRef}
        className={styles.search__input}
        placeholder='Search...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      {input && (
        <ClearIcon
          fontSize='medium'
          className={styles.search__clearIcon}
          onClick={clearInput}
        />
      )}
    </div>
  );
};

export default Search;
