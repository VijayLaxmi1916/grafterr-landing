import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.media}>
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
