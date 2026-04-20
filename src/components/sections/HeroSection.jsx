import PropTypes from 'prop-types';
import GradientText from '../ui/GradientText';
import GradientButton from '../ui/GradientButton';
import Skeleton from '../ui/Skeleton';
import styles from './HeroSection.module.css';

function HeroSkeleton() {
  return (
    <section className={styles.hero} aria-busy="true">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.skeletonHeadline}>
            <Skeleton width="70%" height="56px" radius="12px" />
            <Skeleton width="80%" height="56px" radius="12px" />
          </div>
          <div className={styles.skeletonSub}>
            <Skeleton width="72%" height="16px" />
            <Skeleton width="56%" height="16px" />
          </div>
          <Skeleton width={180} height={48} radius="999px" />
        </div>
      </div>
    </section>
  );
}

function renderSubheadline(parts) {
  if (!Array.isArray(parts)) return null;
  return parts.map((part, i) =>
    part.bold ? (
      <strong key={i}>{part.text}</strong>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

function HeroSection({ data, loading }) {
  if (loading || !data) return <HeroSkeleton />;

  return (
    <section id="top" className={styles.hero}>
      <div className="container">
        <div className={styles.inner}>
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>{data.headlinePrefix}</span>
            <GradientText className={styles.headlineLine}>{data.headlineGradient}</GradientText>
          </h1>
          <p className={styles.subheadline}>{renderSubheadline(data.subheadlineParts)}</p>
          <div className={styles.ctaRow}>
            <GradientButton href={data.cta?.href ?? '#'} size="md" variant="soft">
              {data.cta?.label}
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  data: PropTypes.shape({
    headlinePrefix: PropTypes.string,
    headlineGradient: PropTypes.string,
    subheadlineParts: PropTypes.array,
    cta: PropTypes.shape({ label: PropTypes.string, href: PropTypes.string }),
  }),
  loading: PropTypes.bool,
};

export default HeroSection;
