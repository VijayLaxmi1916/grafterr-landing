import PropTypes from 'prop-types';
import styles from './GradientButton.module.css';

function GradientButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['solid', 'outline', 'soft']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default GradientButton;
