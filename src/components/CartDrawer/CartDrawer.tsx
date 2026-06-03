import { useEffect } from 'react';
import { useCart } from '../../stores/CartContext';
import styles from './CartDrawer.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { state, dispatch, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function updateQty(productId: number, colour: string, size: string, quantity: number) {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, colour, size, quantity } });
  }

  function remove(productId: number, colour: string, size: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, colour, size } });
  }

  return (
    <>
      <div className={`${styles.overlay}${open ? ` ${styles.visible}` : ''}`} onClick={onClose} aria-hidden="true" />

      <div
        className={`${styles.drawer}${open ? ` ${styles.open}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <h2>Cart ({totalItems})</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.items}>
          {state.items.length === 0 ? (
            <div className={styles.empty}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={`${item.productId}-${item.colour}-${item.size}`} className={styles.item}>
                <img className={styles.itemImg} src={item.image} alt={item.title} loading="lazy" />
                <div className={styles.itemBody}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemMeta}>
                    {item.colour} · Size {item.size}
                  </p>
                  <div className={styles.itemRow}>
                    <div className={styles.qtyControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.productId, item.colour, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.productId, item.colour, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button className={styles.removeBtn} onClick={() => remove(item.productId, item.colour, item.size)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}
