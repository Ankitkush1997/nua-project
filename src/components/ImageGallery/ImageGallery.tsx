import { useState, useRef } from 'react';
import styles from './ImageGallery.module.scss';

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed || !mainRef.current) return;
    const { left, top, width, height } = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    mainRef.current.style.setProperty('--zoom-x', `${x}%`);
    mainRef.current.style.setProperty('--zoom-y', `${y}%`);
  }

  function handleClick() {
    setZoomed(z => !z);
  }

  return (
    <div className={styles.gallery}>
      <div
        ref={mainRef}
        className={`${styles.mainWrap}${zoomed ? ` ${styles.zoomed}` : ''}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          className={styles.mainImg}
          src={images[active]}
          alt={alt}
          width={800}
          height={800}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map((src, i) => (
          <button
            key={src}
            className={`${styles.thumb}${i === active ? ` ${styles.active}` : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" width={72} height={72} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <div className={styles.dots} aria-hidden="true">
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot}${i === active ? ` ${styles.active}` : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
