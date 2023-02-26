import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import { useParams } from 'react-router';
import getItem from '../../api/getItem';
import styles from './ItemDetails.module.scss';
import InfoToggle from '../../components/infoToggle/InfoToggle';
import ButtonAdd from '../../components/buttons/ButtonAdd';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CircularProgress, Dialog, DialogActions } from '@mui/material';

function ItemDetails() {
  let { id } = useParams();
  const [item, setItem] = useState();
  const [openModal, setOpenModal] = useToggle(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const item = await getItem(id);
        setItem(item);
      } catch (error) {
        console.log(error);
        alert('something went wrong');
        <Navigate to='/' />;
      }
    }
    fetchItem();
  }, [id]);

  if (!item) {
    return (
      <div className={styles.loader}>
        <CircularProgress color='inherit' />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img src={item.img} alt='product' onClick={setOpenModal} />
        <Link to='/'>
          <div className={styles.imageContainer__navigate}>
            <KeyboardBackspaceIcon />
          </div>
        </Link>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoContainer__shell}>
          <h1>{item.title}</h1>
          <p className={styles.infoContainer__description}>
            {item.description}
          </p>
          <InfoToggle
            version={item.version}
            memory={item.memory}
            activeVariants={item.activeVariants}
          />
          <div className={styles.infoContainer__bottom}>
            <p className={styles.infoContainer__price}>Price: {item.price} $</p>
            <ButtonAdd />{' '}
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={setOpenModal}>
        <div className={styles.modal}>
          <img src={item.img} alt='product' />
          <DialogActions>
            <CloseIcon className={styles.modal__close} onClick={setOpenModal} />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default ItemDetails;
