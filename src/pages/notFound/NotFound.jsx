import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <h1 className={styles.root}>
      <SentimentVeryDissatisfiedIcon fontSize='large' className={styles.icon} />
      Ooops <br />
      Page not found
    </h1>
  );
};

export default NotFound;
