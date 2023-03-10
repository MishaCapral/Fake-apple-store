import AddIcon from '@mui/icons-material/Add';
import style from './ButtonAdd.module.scss';

const ButtonAdd = ({ callback, count }) => {
  return (
    <button className={style.button} onClick={callback}>
      <AddIcon />
      <span className={style.button__text}>Add</span>
      <i className={style.button__indicator}>{count ? count : '0'}</i>
    </button>
  );
};

export default ButtonAdd;
