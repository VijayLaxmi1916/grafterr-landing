import PropTypes from 'prop-types';
import styles from './GradientText.module.css';

function GradientText({ children, as: Tag = 'span', className = '' }) {
  return <Tag className={`${styles.gradient} ${className}`.trim()}>{children}</Tag>;
}

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  className: PropTypes.string,
};

export default GradientText;
