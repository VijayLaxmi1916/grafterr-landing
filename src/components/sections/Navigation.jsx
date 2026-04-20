import { useState } from 'react';
import PropTypes from 'prop-types';
import GradientButton from '../ui/GradientButton';
import Skeleton from '../ui/Skeleton';
import styles from './Navigation.module.css';

function NavigationSkeleton() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className="container">
        <div className={styles.inner}>
          <Skeleton width={140} height={32} radius="8px" />
          <div className={styles.links}>
            <Skeleton width={70} height={16} />
            <Skeleton width={80} height={16} />
          </div>
          <Skeleton width={140} height={44} radius="999px" />
        </div>
      </div>
    </nav>
  );
}

function Navigation({ data, loading }) {
  const [open, setOpen] = useState(false);

  if (loading || !data) return <NavigationSkeleton />;

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className="container">
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} aria-label={data.logo?.alt ?? 'Grafterr'}>
            <img src={data.logo?.src} alt={data.logo?.alt ?? 'Grafterr'} />
          </a>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div id="primary-menu" className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
            <ul className={styles.links}>
              {data.links?.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <GradientButton href={data.cta?.href ?? '#'} size="sm">
              {data.cta?.label}
            </GradientButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string }),
    links: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string.isRequired, href: PropTypes.string.isRequired })
    ),
    cta: PropTypes.shape({ label: PropTypes.string, href: PropTypes.string }),
  }),
  loading: PropTypes.bool,
};

export default Navigation;
