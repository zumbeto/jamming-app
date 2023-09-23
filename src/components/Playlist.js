import './Playlist.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Playlist.module.css';

library.add(faPlus, faMinus, faMusic);

const Playlist = ({ activeView }) => {
  return (
    <ul
      className={styles['playlist']}
      data-active-view={activeView}
    >
      <h1 className={styles['playlist__heading']}>Playlist</h1>
      <div className={styles['playlist__input']}>
        <input
          type='text'
          placeholder='New playlist'
          className={styles['playlist__input__text']}
        />
      </div>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <li className={styles['playlist__item']}>
        <div className={styles['playlist__album-cover']}>
          <img
            src='./no-image.png'
            className={styles['playlist__album-cover__img']}
            alt='Album cover'
          ></img>
        </div>
        <div className={styles['playlist__data']}>
          <h2 className={styles['playlist__title']}>2Pac</h2>
          <p className={styles['playlist__description']}>Hit Em Up</p>
        </div>
        <FontAwesomeIcon
          icon='minus'
          className={styles['playlist__icon']}
        />
      </li>
      <button className={styles['playlist__button']}>Create</button>
    </ul>
  );
};

export default Playlist;
