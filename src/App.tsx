import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './stores/CartContext';
import Header from './components/Header/Header';
import CartDrawer from './components/CartDrawer/CartDrawer';
import ListingPage from './pages/ListingPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <Header onCartOpen={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
