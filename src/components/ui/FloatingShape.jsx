import PropTypes from 'prop-types';
import styles from './FloatingShape.module.css';

function FloatingShape({
  type = 'circle',
  color = 'teal',
  top,
  left,
  size,
  className = '',
  ariaHidden = true,
}) {
  const inlineStyle = {};
  if (top !== undefined) inlineStyle.top = top;
  if (left !== undefined) inlineStyle.left = left;
  if (size !== undefined) {
    inlineStyle.width = size;
    inlineStyle.height = type === 'rectangle' ? size * 0.9 : size;
  }

  return (
    <span
      aria-hidden={ariaHidden}
      className={[styles.shape, styles[type], styles[color], className].filter(Boolean).join(' ')}
      style={inlineStyle}
    />
  );
}

FloatingShape.propTypes = {
  type: PropTypes.oneOf(['circle', 'rectangle', 'triangle']),
  color: PropTypes.oneOf(['teal', 'coral']),
  top: PropTypes.string,
  left: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

export default FloatingShape;
