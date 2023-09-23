import './Playlist.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Playlist.module.css';

library.add(faPlus, faMinus, faMusic);

const Playlist = ({ activeView, name, tracks, onNameChange, onRemove, onSave }) => {
  return (
    <ul
      className={styles['playlist']}
      data-active-view={activeView}
    >
      <h1 className={styles['playlist__heading']}>{name}</h1>
      <div className={styles['playlist__input']}>
        <input
          type='text'
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className={styles['playlist__input__text']}
        />
      </div>
      {tracks.map((track) => (
        <li
          key={track.id}
          className={styles['playlist__item']}
        >
          <div className={styles['playlist__album-cover']}>
            <img
              src={track.album.images[0]?.url || './no-image.png'}
              className={styles['playlist__album-cover__img']}
              alt='Album cover'
            />
          </div>
          <div className={styles['playlist__data']}>
            <h2 className={styles['playlist__title']}>{track.name}</h2>
            <p className={styles['playlist__description']}>{track.artists[0].name}</p>
          </div>
          <FontAwesomeIcon
            icon='minus'
            className={styles['playlist__icon']}
            onClick={() => onRemove(track)}
          />
        </li>
      ))}
      <button
        className={styles['playlist__button']}
        onClick={onSave}
      >
        Save to Spotify
      </button>
    </ul>
  );
};

export default Playlist;
