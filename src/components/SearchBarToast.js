import styles from './SearchBarToast.module.css';

const SearchBarToast = ({ message, isVisible }) => {
  return <div className={`${styles['toast']} ${isVisible ? styles['show'] : ''}`}>{message}</div>;
};

export default SearchBarToast;
