import { useSearchParams } from 'react-router-dom';
import { COLOURS, SIZES } from '../data/productData';

export function useVariantParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const colour = searchParams.get('colour') ?? COLOURS[0].name;
  const size = searchParams.get('size') ?? '';

  function setColour(name: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('colour', name);
      return next;
    }, { replace: true });
  }

  function setSize(label: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('size', label);
      return next;
    }, { replace: true });
  }

  const selectedSize = SIZES.find(s => s.label === size) ?? null;
  const isSoldOut = selectedSize?.stock === 'sold_out';
  const maxQty = selectedSize?.quantity ?? 1;

  return { colour, size, setColour, setSize, selectedSize, isSoldOut, maxQty };
}
