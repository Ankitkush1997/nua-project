import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import styles from './ProductPage.module.scss';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.skeleton}>
          {/* Left: image + thumbnail strip */}
          <div className={styles.skeletonLeft}>
            <div className={styles.skeletonImg} />
            <div className={styles.skeletonThumbs}>
              {[0,1,2,3].map(i => <div key={i} className={styles.skeletonThumb} />)}
            </div>
          </div>
          {/* Right: exact mirror of ProductInfo sections */}
          <div className={styles.skeletonRight}>
            {/* 1. Brand + title + price row */}
            <div className={styles.skeletonHeading}>
              <div className={styles.skeletonBrand} />
              <div className={styles.skeletonTitle1} />
              <div className={styles.skeletonTitle2} />
              <div className={styles.skeletonPrice} />
            </div>

            {/* 2. Colour section */}
            <div className={styles.skeletonColour}>
              <div className={styles.skeletonLabel} />
              <div className={styles.skeletonSwatches}>
                {[0,1,2].map(i => <div key={i} className={styles.skeletonSwatch} />)}
              </div>
              <div className={styles.skeletonColourName} />
            </div>

            {/* 3. Size section */}
            <div className={styles.skeletonSizeSection}>
              <div className={styles.skeletonLabel} />
              <div className={styles.skeletonSizes}>
                {[0,1,2,3,4,5].map(i => <div key={i} className={styles.skeletonSize} />)}
              </div>
            </div>

            {/* 4. Quantity section */}
            <div className={styles.skeletonQty}>
              <div className={styles.skeletonLabel} />
              <div className={styles.skeletonQtyBox} />
            </div>

            {/* 5. CTA button */}
            <div className={styles.skeletonBtn} />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={styles.page}>
        <div className={styles.error}>
          <h2>Failed to load product</h2>
          <p>{error ?? 'Something went wrong. Please try again.'}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.backLink}>← All Products</Link>
      <div className={styles.grid}>
        <ImageGallery images={[product.image]} alt={product.title} />
        <ProductInfo product={product} />
      </div>
      <ProductDetails description={product.description} />
    </main>
  );
}
