import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './ListingPage.module.scss';

export default function ListingPage() {
  const { products, loading, error } = useProducts();

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.error}>
          <h2>Failed to load products</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {!loading && <h1 className={styles.heading}>All Products</h1>}
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImg} />
                <div className={styles.skeletonBody}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonCategory}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonTitle1}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonTitle2}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonPrice}`} />
                </div>
              </div>
            ))
          : products.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </main>
  );
}
