import styles from './InfoToggle.module.scss';

const InfoToggle = ({ version, memory, activeVariants }) => {
  return (
    <div className={styles.item__selector}>
      <ul>
        {version.map((item, index) => (
          <li
            key={index}
            className={
              activeVariants.versionIndex === index ? styles.item__active : ''
            }
          >
            {item.type}
          </li>
        ))}
      </ul>

      <ul>
        {memory.map((x, index) => (
          <li
            key={index}
            className={
              activeVariants.memoryIndex === index ? styles.item__active : ''
            }
          >
            {x.type}GB
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoToggle;
