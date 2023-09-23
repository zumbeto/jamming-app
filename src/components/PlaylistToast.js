import styles from './PlaylistToast.module.css';

const Toast = ({ message, isVisible }) => {
  return <div className={`${styles['toast']} ${isVisible ? styles['show'] : ''}`}>{message}</div>;
};

export default Toast;
