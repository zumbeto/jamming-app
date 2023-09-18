import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles['container']}>
      <input
        className={styles['search-bar']}
        type='text'
        placeholder='Search...'
      />
      <button className={styles['search-bar__btn']}>Search</button>
    </div>
  );
};

export default SearchBar;
