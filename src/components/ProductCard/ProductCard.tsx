import { Link } from 'react-router-dom';
import type { FakeStoreProduct } from '../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: FakeStoreProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={product.image} alt={product.title} width={400} height={400} loading="lazy" decoding="async" />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.rating}>
            <span>★</span>{product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>
    </Link>
  );
}
