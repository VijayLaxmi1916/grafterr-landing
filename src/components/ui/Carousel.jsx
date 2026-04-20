import PropTypes from 'prop-types';
import useCarousel from '../../hooks/useCarousel';
import styles from './Carousel.module.css';

function Arrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`${styles.arrow} ${styles[direction]}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {direction === 'prev' ? (
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

function Carousel({
  items,
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  showArrows = true,
  showDots = false,
  transitionMs = 300,
  gap = 24,
  ariaLabel = 'Carousel',
}) {
  const { index, itemsPerView: visible, isStart, isEnd, next, prev, touchHandlers, maxIndex } =
    useCarousel(items.length, itemsPerView);

  const slideWidth = `calc((100% - ${gap * (visible - 1)}px) / ${visible})`;
  const translate = `calc(${-index} * (${slideWidth} + ${gap}px))`;
  const showControls = showArrows && maxIndex > 0;

  return (
    <div className={styles.wrapper} aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        className={styles.viewport}
        onTouchStart={touchHandlers.onTouchStart}
        onTouchEnd={touchHandlers.onTouchEnd}
      >
        <ul
          className={styles.track}
          style={{
            transform: `translate3d(${translate}, 0, 0)`,
            transitionDuration: `${transitionMs}ms`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, i) => (
            <li
              key={item.id ?? i}
              className={styles.slide}
              style={{ flex: `0 0 ${slideWidth}` }}
              aria-hidden={i < index || i >= index + visible}
            >
              {renderItem(item, i)}
            </li>
          ))}
        </ul>
      </div>

      {showControls ? (
        <div className={styles.controls}>
          <Arrow direction="prev" onClick={prev} disabled={isStart} />
          <Arrow direction="next" onClick={next} disabled={isEnd} />
        </div>
      ) : null}

      {showDots && maxIndex > 0 ? (
        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`${styles.dot} ${dotIdx === index ? styles.activeDot : ''}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerView: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
  transitionMs: PropTypes.number,
  gap: PropTypes.number,
  ariaLabel: PropTypes.string,
};

export default Carousel;
