import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

function Skeleton({ width = '100%', height = '1em', radius = 'var(--radius-sm)', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.skeleton} ${className}`.trim()}
      style={{ width, height, borderRadius: radius }}
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.string,
  className: PropTypes.string,
};

export default Skeleton;
