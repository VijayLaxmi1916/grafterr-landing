import PropTypes from 'prop-types';
import GradientText from '../ui/GradientText';
import Carousel from '../ui/Carousel';
import ProductCard from '../ui/ProductCard';
import Skeleton from '../ui/Skeleton';
import FloatingShape from '../ui/FloatingShape';
import styles from './FeaturesSection.module.css';

function FeaturesSkeleton() {
  return (
    <section className={styles.features} aria-busy="true" id="products">
      <div className="container">
        <div className={styles.header}>
          <Skeleton width="70%" height="44px" radius="10px" />
          <Skeleton width="55%" height="44px" radius="10px" />
          <Skeleton width="70%" height="14px" />
          <Skeleton width="60%" height="14px" />
          <div className={styles.divider} aria-hidden="true" />
        </div>
        <div className={styles.skeletonGrid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton width="40%" height="22px" radius="6px" />
              <Skeleton width="100%" height="260px" radius="14px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ data, loading }) {
  if (loading || !data) return <FeaturesSkeleton />;

  const shapes = data.shapes ?? [];
  const carouselConfig = data.carousel ?? {};

  return (
    <section id="products" className={styles.features}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.titleWrap}>
            {shapes
              .filter((s) => s.position === 'left')
              .map((shape, i) => (
                <FloatingShape
                  key={`left-${i}`}
                  type={shape.type}
                  color={shape.color}
                  className={styles.shapeLeft}
                />
              ))}
            <h2 className={styles.title}>
              {data.titlePrefix} <GradientText>{data.titleAccent}</GradientText>{' '}
              {data.titleSuffix}
            </h2>
            {shapes
              .filter((s) => s.position === 'right')
              .map((shape, i) => (
                <FloatingShape
                  key={`right-${i}`}
                  type={shape.type}
                  color={shape.color}
                  className={styles.shapeRight}
                />
              ))}
          </div>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <div className={styles.divider} aria-hidden="true" />
        </header>

        <Carousel
          items={data.products ?? []}
          renderItem={(product) => <ProductCard product={product} />}
          itemsPerView={carouselConfig.itemsPerView}
          showArrows={carouselConfig.showArrows !== false}
          showDots={carouselConfig.showDots === true}
          transitionMs={carouselConfig.transitionMs ?? 300}
          gap={24}
          ariaLabel="Grafterr products"
        />
      </div>
    </section>
  );
}

FeaturesSection.propTypes = {
  data: PropTypes.shape({
    titlePrefix: PropTypes.string,
    titleAccent: PropTypes.string,
    titleSuffix: PropTypes.string,
    subtitle: PropTypes.string,
    shapes: PropTypes.array,
    products: PropTypes.array,
    carousel: PropTypes.object,
  }),
  loading: PropTypes.bool,
};

export default FeaturesSection;
