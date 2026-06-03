import { useCallback, useState } from 'react';
import { useCart } from '../stores/CartContext';
import type { CartItem } from '../types';

type AddToCartStatus = 'idle' | 'loading' | 'success' | 'error';

export function useAddToCart() {
  const { dispatch } = useCart();
  const [status, setStatus] = useState<AddToCartStatus>('idle');

  const addToCart = useCallback(
    async (item: CartItem) => {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 600));
      if (Math.random() < 0.2) {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2500);
        return;
      }
      dispatch({ type: 'ADD_ITEM', payload: item });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    },
    [dispatch],
  );

  return { addToCart, status };
}
