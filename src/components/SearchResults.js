import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchResults.module.css';

library.add(faPlus, faMinus, faMusic);

const SearchResults = ({ activeView, tracks, onAdd }) => {
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
            onClick={() => onAdd(track)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
