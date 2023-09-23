import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddedTrackToast from './AddedTrackToast';
import styles from './SearchResults.module.css';

library.add(faPlus, faMinus, faMusic);

const SearchResults = ({ activeView, tracks, onAdd, playlistTracks }) => {
  const [addedTrackToastStatus, setAddedTrackToastStatus] = useState({});

  // Function to add a track to the playlist and show a toast message
  const handleAddTrack = (track) => {
    // Check if track is already in the playlist
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setAddedTrackToastStatus((prevState) => ({
        ...prevState,
        [track.id]: { isVisible: true, message: 'Track already in your playlist!' },
      }));
    } else {
      onAdd(track);
      setAddedTrackToastStatus((prevState) => ({
        ...prevState,
        [track.id]: { isVisible: true, message: 'Added to your playlist!' },
      }));
    }

    setTimeout(() => {
      setAddedTrackToastStatus((prevState) => ({
        ...prevState,
        [track.id]: { ...prevState[track.id], isVisible: false },
      }));
    }, 1500);
  };

  return (
    <ul
      className={styles['results']}
      data-active-view={activeView}
    >
      <h1 className={styles['results__heading']}>Search results</h1>
      {tracks.map((track) => (
        <li
          key={track.id}
          className={styles['results__item']}
        >
          <div className={styles['results__album-cover']}>
            <img
              src={track.album.images[0]?.url || './no-image.png'}
              className={styles['results__album-cover__img']}
              alt='Album cover'
            ></img>
          </div>
          <div className={styles['results__data']}>
            <h2 className={styles['results__title']}>{track.name}</h2>
            <p className={styles['results__description']}>{track.artists[0].name}</p>
          </div>
          <FontAwesomeIcon
            icon='plus'
            className={styles['results__icon']}
            onClick={() => handleAddTrack(track)}
          />
          <AddedTrackToast
            message={addedTrackToastStatus[track.id]?.message || ''}
            isVisible={!!addedTrackToastStatus[track.id]?.isVisible}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
