import styles from './MobileNav.module.css';

const MobileNav = ({ setActiveView }) => {
  const handleClick = (view) => {
    setActiveView(view);
  };

  return (
    <div className={styles['mobile-nav']}>
      <button
        onClick={() => handleClick('results')}
        className={styles['mobile-nav__item']}
      >
        Results
      </button>
      <button
        onClick={() => handleClick('playlist')}
        className={styles['mobile-nav__item']}
      >
        Playlist
      </button>
    </div>
  );
};

export default MobileNav;
