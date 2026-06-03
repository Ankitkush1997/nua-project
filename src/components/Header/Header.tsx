import { useCart } from '../../stores/CartContext';
import styles from './Header.module.scss';

interface Props {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: Props) {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.logo}>NuaCraft</span>
        <button className={styles.cartBtn} onClick={onCartOpen} aria-label={`Cart, ${totalItems} items`}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}
