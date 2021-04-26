import { useState } from 'react';
import Footer from '../components/Footer';
import Items from '../components/Items';
import Modal from '../components/Modal';
import style from './style.module.css';

const MainPage = () => {
  const [modal, setModalActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  return (
    <>
      {modal && <Modal setModalActive={setModalActive} id={activeItem} />}
      <h1 className={style.title}>TEST APP</h1>
      <Items setActiveItem={setActiveItem} setModalActive={setModalActive} />
      <Footer />
    </>
  );
};

export default MainPage;
