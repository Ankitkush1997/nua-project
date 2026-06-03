import { act, renderHook } from '@testing-library/react';
import { useAddToCart } from '../src/hooks/useAddToCart';
import { CartProvider } from '../src/stores/CartContext';
import type { CartItem } from '../src/types';

const item: CartItem = {
  productId: 1,
  title: 'Jacket',
  image: '',
  price: 55,
  colour: 'Forest Green',
  size: 'M',
  quantity: 1,
};

describe('useAddToCart', () => {
  it('starts with idle status', () => {
    const { result } = renderHook(() => useAddToCart(), { wrapper: CartProvider });
    expect(result.current.status).toBe('idle');
  });

  it('transitions to loading then success or error', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);

    const { result } = renderHook(() => useAddToCart(), { wrapper: CartProvider });

    let promise: Promise<void>;
    act(() => {
      promise = result.current.addToCart(item);
    });

    expect(result.current.status).toBe('loading');
    await act(async () => {
      await promise;
    });
    expect(result.current.status).toBe('success');

    vi.restoreAllMocks();
  });

  it('sets error status on simulated failure', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const { result } = renderHook(() => useAddToCart(), { wrapper: CartProvider });

    await act(async () => {
      await result.current.addToCart(item);
    });
    expect(result.current.status).toBe('error');

    vi.restoreAllMocks();
  });
});
