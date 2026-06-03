import { useReducer, useEffect } from 'react';
import type { FakeStoreProduct } from '../types';

interface State {
  products: FakeStoreProduct[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'DONE'; products: FakeStoreProduct[] }
  | { type: 'ERROR'; error: string };

const initial: State = { products: [], loading: true, error: null };

function reducer(_: State, action: Action): State {
  if (action.type === 'DONE') return { products: action.products, loading: false, error: null };
  return { products: [], loading: false, error: action.error };
}

export function useProducts() {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    let cancelled = false;
    fetch('https://fakestoreapi.com/products')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load products');
        return r.json() as Promise<FakeStoreProduct[]>;
      })
      .then(products => { if (!cancelled) dispatch({ type: 'DONE', products }); })
      .catch(e => { if (!cancelled) dispatch({ type: 'ERROR', error: (e as Error).message }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}
