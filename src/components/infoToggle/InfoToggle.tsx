import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveModel,
  setActiveOption,
  TypeItemType,
  ActiveVariantsType,
} from '../../redux/slices/itemsSlice';
import { addProduct, selectCart } from '../../redux/slices/cartSlice';
import styles from './InfoToggle.module.scss';
import ButtonAdd from '../buttons/ButtonAdd';

interface InfoToggleInterface {
  id: string;
  type: TypeItemType[];
  title: string;
  img: string;
  category: string;
  activeVariants: ActiveVariantsType;
}
export type ActiveModelType = {
  newModelIndex: number;
  id: string;
};
export type ActiveOptionType = {
  newOptionIndex: number;
  id: string;
};

const InfoToggle = ({
  id,
  type,
  title,
  img,
  category,
  activeVariants,
}: InfoToggleInterface) => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectCart);

  const setModel = (index: number, id: string) => {
    dispatch(
      setActiveModel({ newModelIndex: index, id: id } as ActiveModelType),
    );
  };
  const setOption = (index: number, id: string) => {
    dispatch(
      setActiveOption({ newOptionIndex: index, id: id } as ActiveOptionType),
    );
  };

  const price =
    type[activeVariants.modelIndex].options[activeVariants.optionIndex].price;

  const model = type[activeVariants.modelIndex].model;

  const option =
    type[activeVariants.modelIndex].options[activeVariants.optionIndex].option;

  const renderId = `${id}_${model.split(' ').join('')}_${Date.now()}_${option}`;

  const itemForCart = {
    id,
    renderId,
    title,
    img,
    price,
    model,
    option,
    category,
  };
  const addItem = () => {
    dispatch(addProduct(itemForCart));
  };

  const itemCount = products.find(
    (item) => id === item.id && model === item.model && option === item.option,
  );

  return (
    <div className={styles.item}>
      <div className={styles.item__selector}>
        <ul>
          {type.map((item, index) => (
            <li
              key={index}
              onClick={() => setModel(index, id)}
              className={
                activeVariants.modelIndex === index ? styles.item__active : ''
              }
            >
              {item.model}
            </li>
          ))}
        </ul>

        <ul>
          {type[activeVariants.modelIndex].options.map((item, index) => (
            <li
              key={index}
              onClick={() => setOption(index, id)}
              className={
                activeVariants.optionIndex === index ? styles.item__active : ''
              }
            >
              {item.option}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.item__bottom}>
        <div className={styles.item__price}>Price: {price}$</div>
        <ButtonAdd callback={addItem} count={itemCount?.count} />
      </div>
    </div>
  );
};

export default InfoToggle;
