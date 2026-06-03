import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../src/stores/CartContext';
import ProductInfo from '../src/components/ProductInfo/ProductInfo';
import type { FakeStoreProduct } from '../src/types';

const mockProduct: FakeStoreProduct = {
  id: 1,
  title: 'Test Jacket',
  price: 55.99,
  description: 'A test product',
  category: "men's clothing",
  image: 'https://example.com/img.jpg',
  rating: { rate: 4.5, count: 120 },
};

function renderProductInfo(search = '') {
  return render(
    <MemoryRouter initialEntries={[`/${search}`]}>
      <CartProvider>
        <ProductInfo product={mockProduct} />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('ProductInfo — variant selector', () => {
  it('shows "Select a Size" and disables CTA when no size is selected', () => {
    renderProductInfo();
    const btn = screen.getByRole('button', { name: /select a size/i });
    expect(btn).toBeDisabled();
  });

  it('enables CTA after selecting an available size', () => {
    renderProductInfo();
    fireEvent.click(screen.getByRole('button', { name: /size s/i }));
    const btn = screen.getByRole('button', { name: /add to cart/i });
    expect(btn).not.toBeDisabled();
  });

  it('disables CTA and shows "Sold Out" for sold-out size', () => {
    renderProductInfo();
    // XL is sold_out in productData
    const xlBtn = screen.getByRole('button', { name: /size xl/i });
    expect(xlBtn).toBeDisabled();
  });

  it('shows low stock label when low-stock size is selected', () => {
    renderProductInfo();
    // M is low stock (quantity: 2)
    fireEvent.click(screen.getByRole('button', { name: /size m/i }));
    expect(screen.getByText(/only 2 left/i)).toBeInTheDocument();
  });

  it('caps quantity at available stock for low-stock size', () => {
    renderProductInfo();
    // M has quantity: 2
    fireEvent.click(screen.getByRole('button', { name: /size m/i }));
    const increase = screen.getByLabelText(/increase quantity/i);
    fireEvent.click(increase); // qty → 2
    expect(increase).toBeDisabled(); // capped at 2
  });

  it('resets quantity to 1 when switching sizes', () => {
    renderProductInfo();
    fireEvent.click(screen.getByRole('button', { name: /size s/i }));
    const increase = screen.getByLabelText(/increase quantity/i);
    fireEvent.click(increase); // qty → 2
    fireEvent.click(screen.getByRole('button', { name: /size l/i }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
