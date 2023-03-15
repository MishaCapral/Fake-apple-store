import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styles from './ErrorSample.module.scss';

type ErrorSampleProps = {
  text: string;
};

const ErrorSample: React.FC<ErrorSampleProps> = ({ text }) => {
  return (
    <div className={styles.error}>
      <h1>
        <SentimentVeryDissatisfiedIcon
          fontSize='large'
          className={styles.error_icon}
        />
        Ooops
      </h1>
      <p>Something gone wrong</p>
      <p>{text}</p>
    </div>
  );
};

export default ErrorSample;
