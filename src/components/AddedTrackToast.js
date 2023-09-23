import React from 'react';
import styles from './AddedTrackToast.module.css';

const AddedTrackToast = ({ message, isVisible }) => {
  return <div className={`${styles['toast']} ${isVisible ? styles['show'] : ''}`}>{message}</div>;
};

export default AddedTrackToast;
