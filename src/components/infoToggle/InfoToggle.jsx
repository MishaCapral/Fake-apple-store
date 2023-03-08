import { useDispatch } from 'react-redux';
import {
  setActiveVariant,
  setActiveMemory,
} from '../../redux/slices/itemsSlice';
import styles from './InfoToggle.module.scss';

const InfoToggle = ({ id, type, activeVariants }) => {
  const dispatch = useDispatch();

  const setVersion = (index, id) => {
    dispatch(setActiveVariant({ newVersionIndex: index, id: id }));
  };
  const setMemory = (index, id) => {
    dispatch(setActiveMemory({ newMemoryIndex: index, id: id }));
  };

  return (
    <div className={styles.item__selector}>
      <ul>
        {type.map((item, index) => (
          <li
            key={index}
            onClick={() => setVersion(index, id)}
            className={
              activeVariants.versionIndex === index ? styles.item__active : ''
            }
          >
            {item.model}
          </li>
        ))}
      </ul>

      <ul>
        {type[activeVariants.versionIndex].version.map((x, index) => (
          <li
            key={index}
            onClick={() => setMemory(index, id)}
            className={
              activeVariants.memoryIndex === index ? styles.item__active : ''
            }
          >
            {x.memory}GB
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoToggle;
