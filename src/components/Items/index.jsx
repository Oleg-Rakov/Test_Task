import { useEffect, useState } from 'react';
import styles from './style.module.css';

const Items = ({ setModalActive, setActiveItem }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://tzfrontend.herokuapp.com/images/'
      ).then((res) => res.json());
      setItems(response);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      {items.map((item) => {
        return (
          <div key={item.image_id} className={styles.item}>
            <img
              onClick={() => {
                setModalActive(true);
                setActiveItem(item.image_id);
              }}
              src={item.src}
              alt="item"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Items;
