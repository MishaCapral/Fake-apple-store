import AddIcon from '@mui/icons-material/Add';
import style from './ButtonAdd.module.scss';

function ButtonAdd() {
  return (
    <div className={style.button}>
      <AddIcon />
      <span className={style.button__text}>Add</span>
      <i className={style.button__indicator}>2</i>
    </div>
  );
}

export default ButtonAdd;
