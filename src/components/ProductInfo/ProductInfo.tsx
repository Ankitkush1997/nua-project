import { useState } from 'react';
import { COLOURS, SIZES } from '../../data/productData';
import { useAddToCart } from '../../hooks/useAddToCart';
import { useVariantParams } from '../../hooks/useVariantParams';
import type { FakeStoreProduct } from '../../types';
import styles from './ProductInfo.module.scss';

interface Props {
  product: FakeStoreProduct;
}

export default function ProductInfo({ product }: Props) {
  const { colour, size, setColour, setSize, selectedSize, isSoldOut, maxQty } = useVariantParams();
  const [qty, setQty] = useState(1);
  const { addToCart, status } = useAddToCart();

  const clampQty = (v: number) => Math.min(Math.max(1, v), maxQty);

  function handleSizeSelect(label: string) {
    setSize(label);
    setQty(1);
  }

  async function handleAddToCart() {
    if (!size || isSoldOut) return;
    await addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      colour,
      size,
      quantity: qty,
    });
  }

  const originalPrice = product.price * 1.35;

  const btnLabel =
    status === 'loading'
      ? 'Adding…'
      : status === 'success'
        ? '✓ Added to Cart'
        : status === 'error'
          ? 'Failed — Try Again'
          : isSoldOut
            ? 'Sold Out'
            : !size
              ? 'Select a Size'
              : 'Add to Cart';

  const showDelivery = !!size && !isSoldOut;

  return (
    <div className={styles.panel}>
      <div>
        <p className={styles.brand}>TrailCraft Outdoor</p>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.priceRow}>
          <span className={`${styles.price} ${styles.salePrice}`}>${product.price.toFixed(2)}</span>
          <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
          <span className={styles.saleBadge}>Sale</span>
        </div>
      </div>

      {/* Colour */}
      <div>
        <p className={styles.sectionLabel}>Colour</p>
        <div className={styles.swatches}>
          {COLOURS.map((c) => (
            <button
              key={c.name}
              className={`${styles.swatch}${colour === c.name ? ` ${styles.active}` : ''}`}
              style={{ background: c.hex }}
              onClick={() => setColour(c.name)}
              aria-label={c.name}
              title={c.name}
            />
          ))}
        </div>
        <p className={styles.colourName}>{colour}</p>
      </div>

      {/* Size */}
      <div>
        <p className={styles.sectionLabel}>Size</p>
        <div className={styles.sizes}>
          {SIZES.map((s) => (
            <button
              key={s.label}
              className={[
                styles.sizeBtn,
                s.label === size ? styles.active : '',
                s.stock === 'low' && s.label !== size ? styles.lowStock : '',
                s.stock === 'sold_out' ? styles.soldOut : '',
              ].join(' ')}
              disabled={s.stock === 'sold_out'}
              onClick={() => handleSizeSelect(s.label)}
              aria-label={`Size ${s.label}${s.stock === 'low' ? ', only ${s.quantity} left' : ''}${s.stock === 'sold_out' ? ', sold out' : ''}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {selectedSize?.stock === 'low' && (
          <p className={styles.lowStockLabel}>Only {selectedSize.quantity} left in stock</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <p className={styles.sectionLabel}>Quantity</p>
        <div className={styles.qtyRow}>
          <div className={styles.qtyControl}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQty(clampQty(qty - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.qtyValue}>{qty}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => setQty(clampQty(qty + 1))}
              disabled={qty >= maxQty || !size}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div>
        <button
          className={[styles.addBtn, styles[status]].join(' ')}
          disabled={!size || isSoldOut || status === 'loading'}
          onClick={handleAddToCart}
        >
          {btnLabel}
        </button>
        {showDelivery && (
          <p className={styles.delivery} style={{ marginTop: '0.75rem' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Estimated delivery: 3–5 business days
          </p>
        )}
      </div>
    </div>
  );
}
