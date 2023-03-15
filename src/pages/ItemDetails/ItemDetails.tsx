import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useToggle } from 'react-use';
import { useNavigate, useParams } from 'react-router';
import { setItem } from '../../redux/slices/itemsSlice';
import { CircularProgress, Dialog, DialogActions } from '@mui/material';
import getItem from '../../api/getItem';
import styles from './ItemDetails.module.scss';
import InfoToggle from '../../components/infoToggle/InfoToggle';
import ButtonAdd from '../../components/buttons/ButtonAdd';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ItemDetails: React.FC = () => {
  let { id } = useParams();
  const [openModal, setOpenModal] = useToggle(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useDispatch();
  const { items } = useSelector((state: any) => state.items);

  if (items.length === 0) {
    const fetchItem = async () => {
      try {
        const item = await getItem(id);
        dispatch(setItem([item]));
      } catch (error) {
        console.log(error);
        alert('something went wrong');
        <Navigate to='/' />;
      }
    };
    fetchItem();
  }
  const item = items.find((item: any) => item.id === id);

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
        <div className={styles.imageContainer__navigate}>
          <KeyboardBackspaceIcon onClick={goBack} />
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoContainer__shell}>
          <h1>{item.title}</h1>
          <p className={styles.infoContainer__description}>
            {item.description}
          </p>
          <InfoToggle
            id={id}
            type={item.type}
            activeVariants={item.activeVariants}
          />

          <div className={styles.infoContainer__bottom}>
            <p className={styles.infoContainer__price}>
              Price:{' '}
              {
                item.type[item.activeVariants.versionIndex].version[
                  item.activeVariants.memoryIndex
                ].price
              }{' '}
              $
            </p>
            <ButtonAdd />
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
};

export default ItemDetails;
