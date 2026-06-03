import { useState } from 'react';
import { SPECS, REVIEWS } from '../../data/productData';
import styles from './ProductDetails.module.scss';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.item}>
      <button
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {title}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`${styles.panel}${open ? ` ${styles.open}` : ''}`} aria-hidden={!open}>
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
}

interface Props {
  description: string;
}

export default function ProductDetails({ description }: Props) {
  return (
    <section className={styles.section} aria-label="Product details">
      <AccordionItem title="Description" defaultOpen>
        <p>{description}</p>
      </AccordionItem>

      <AccordionItem title="Specifications">
        <table className={styles.specsTable}>
          <tbody>
            {SPECS.map(s => (
              <tr key={s.label}>
                <td>{s.label}</td>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AccordionItem>

      <AccordionItem title={`Reviews (${REVIEWS.length})`}>
        <div className={styles.reviews}>
          {REVIEWS.map(r => (
            <div key={r.author} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewer}>{r.author}</span>
                <span className={styles.reviewDate}>{r.date}</span>
              </div>
              <div className={styles.stars} aria-label={`${r.rating} out of 5 stars`}>
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </section>
  );
}
