import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import close from '../../assets/close.svg';
import Loader from '../Loader';
import { NotificationManager } from 'react-notifications';

const Modal = ({ id, setModalActive }) => {
  const [image, setImage] = useState('');
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const modalRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch(
      `https://tzfrontend.herokuapp.com/images/${id}`
    ).then((res) => res.json());
    setImage(response);
  };
  const fetchComments = async () => {
    const response = await fetch(
      `https://tzfrontend.herokuapp.com/comments/${id}`
    ).then((res) => res.json());
    setComments(response);
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [id]);

  const validateDate = () => {
    return name && desc;
  };

  const onSubmit = async () => {
    const data = { name, description: desc, image_id: id };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    const response = await fetch(
      'https://tzfrontend.herokuapp.com/comments/add/',
      options
    );

    if (response.status === 200) {
      NotificationManager.success('Комментарий добавлен');
    } else {
      NotificationManager.error('Ошибка при добавлении комментария');
    }
    setName('');
    setDesc('');
    fetchComments();
  };

  return image ? (
    <div
      onClick={(e) => {
        if (!modalRef.current.contains(e.target)) {
          setModalActive(false);
        }
      }}
      className={style.container}
    >
      <div ref={modalRef} className={style.row}>
        <img
          onClick={() => setModalActive(false)}
          src={close}
          className={style.close}
          alt="close"
        />
          <div className={style.img}>
            <img src={image.src} alt="modal item" />
          </div>
          <div className={style.left}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ваш комментарий"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              onClick={() => {
                if (!validateDate()) {
                  NotificationManager.warning('Заполните поля ввода');
                } else {
                  onSubmit();
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit}
            >
              Оставить комментарий
            </button>
          </div>

        <div className={style.right}>
          {comments.length &&
            comments.map((comment) => {
              return (
                comment.name &&
                comment.description && (
                  <div key={comment.name}>
                    <span className={style.name}>{comment.name}</span>
                    <p className={style.desc}>{comment.description}</p>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Modal;
