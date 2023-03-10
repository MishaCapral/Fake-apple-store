import { useFavoriteContext } from '../../context/SearchContext';
import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = () => {
  const { input, setInput } = useFavoriteContext();
  return (
    <div className={styles.search}>
      <SearchIcon fontSize='medium' className={styles.search__searchIcon} />
      <input
        className={styles.search__input}
        placeholder='Search...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      {input && (
        <ClearIcon
          fontSize='medium'
          className={styles.search__clearIcon}
          onClick={() => setInput('')}
        />
      )}
    </div>
  );
};

export default Search;
