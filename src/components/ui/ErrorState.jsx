import PropTypes from 'prop-types';
import GradientButton from './GradientButton';
import styles from './ErrorState.module.css';

function ErrorState({ title = "We couldn't load this section", message, onRetry }) {
  return (
    <div role="alert" className={styles.wrapper}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v5m0 3.5v.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {message ? <p className={styles.message}>{message}</p> : null}
      {onRetry ? (
        <GradientButton onClick={onRetry} size="md">
          Retry
        </GradientButton>
      ) : null}
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorState;
