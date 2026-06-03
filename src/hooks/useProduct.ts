import { useReducer, useEffect } from 'react';
import type { FakeStoreProduct } from '../types';

interface State {
  product: FakeStoreProduct | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'DONE'; product: FakeStoreProduct }
  | { type: 'ERROR'; error: string };

const initial: State = { product: null, loading: true, error: null };

function reducer(_: State, action: Action): State {
  if (action.type === 'DONE') return { product: action.product, loading: false, error: null };
  return { product: null, loading: false, error: action.error };
}

export function useProduct(id: number) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load product');
        return r.json() as Promise<FakeStoreProduct>;
      })
      .then(product => { if (!cancelled) dispatch({ type: 'DONE', product }); })
      .catch(e => { if (!cancelled) dispatch({ type: 'ERROR', error: (e as Error).message }); });
    return () => { cancelled = true; };
  }, [id]);

  return state;
}
