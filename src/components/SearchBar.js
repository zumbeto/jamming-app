import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setIsValid(value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={styles['container']}>
      <form
        className={styles.search}
        onSubmit={handleSubmit}
      >
        <input
          className={styles['search-bar']}
          type='text'
          placeholder='Search...'
          value={query}
          onChange={handleChange}
        />
        <button
          className={styles['search-bar__btn']}
          disabled={!isValid}
          type='submit'
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
