import React, { useState } from 'react';
import styles from './Playlist.module.css';
import PlaylistToast from './PlaylistToast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPlus, faMinus, faTimes);

const Playlist = ({ activeView, name, tracks, onNameChange, onRemove, onSave, onClear }) => {
  const [playlistToastMessage, setPlaylistToastMessage] = useState('');
  const [showPlaylistToast, setShowPlaylistToast] = useState(false);

  const handleSaveToSpotify = async () => {
    if (!name || tracks.length === 0) {
      // Check if the playlist has a name and tracks
      if (!name) {
        setPlaylistToastMessage('Please provide a name for your playlist!');
      } else {
        setPlaylistToastMessage('Your playlist is empty. Add some tracks!');
      }
      setShowPlaylistToast(true);
      setTimeout(() => setShowPlaylistToast(false), 3000);
      return;
    }

    await onSave();
    setPlaylistToastMessage('Playlist saved to Spotify successfully!');
    setShowPlaylistToast(true);
    setTimeout(() => setShowPlaylistToast(false), 3000);
  };

  const handleClearPlaylist = () => {
    onClear();
    setPlaylistToastMessage('Playlist cleared!');
    setShowPlaylistToast(true);
    setTimeout(() => setShowPlaylistToast(false), 3000);
  };

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
        {name && (
          <FontAwesomeIcon
            icon='times'
            className={styles['playlist-clear-icon']}
            onClick={() => onNameChange('')}
          />
        )}
      </div>
      <div className={styles['playlist__buttons']}>
        <button
          className={styles['playlist__button']}
          onClick={handleSaveToSpotify}
        >
          Save to Spotify
        </button>
        <button
          className={styles['playlist__button']}
          onClick={handleClearPlaylist}
        >
          Clear Playlist
        </button>
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

      <PlaylistToast
        message={playlistToastMessage}
        isVisible={showPlaylistToast}
      />
    </ul>
  );
};

export default Playlist;
