import React from 'react';
import styles from './LogoBar.module.css';

const LogoBar = () => {
  return (
    <div className={styles['logo-bar']}>
      <h1 className={styles['logo-bar__heading']}>
        Ja<span>mmm</span>ing
      </h1>
    </div>
  );
};

export default LogoBar;
