import React, { useState } from 'react';
import SearchBarToast from './SearchBarToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTimes);

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchBarToastMessage, setSearchBarToastMessage] = useState('');
  const [showSearchBarToast, setShowSearchBarToast] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  // Function to handle the search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the onSearch prop if the query is not empty
    if (query.trim()) {
      const hasResults = await onSearch(query);
      if (!hasResults) {
        setSearchBarToastMessage(`No results found for "${query}".`);
        setShowSearchBarToast(true);
        setTimeout(() => {
          setShowSearchBarToast(false);
        }, 3000);
      }
    } else {
      setSearchBarToastMessage('Please enter a search query.');
      setShowSearchBarToast(true);
      setTimeout(() => {
        setShowSearchBarToast(false);
      }, 3000);
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
        {query && (
          <FontAwesomeIcon
            icon='times'
            className={styles['search-clear-icon']}
            onClick={() => setQuery('')}
          />
        )}
        <button
          className={styles['search-bar__btn']}
          type='submit'
        >
          Search
        </button>
      </form>
      <SearchBarToast
        message={searchBarToastMessage}
        isVisible={showSearchBarToast}
      />
    </div>
  );
};

export default SearchBar;
