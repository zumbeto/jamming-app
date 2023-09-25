import React from 'react';
import styles from './ScrollToTopBtn.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faMusic, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPlus, faMinus, faMusic, faChevronUp);

const ScrollToTopBtn = ({ scrollToTop, showScrollTopButton }) => {
  return (
    <button
      className={`${styles.btn} ${showScrollTopButton ? styles.show : ''}`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon='chevron-up' />
    </button>
  );
};

export default ScrollToTopBtn;
