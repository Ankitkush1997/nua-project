import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; colour: string; size: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: number; colour: string; size: string; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, colour, size, quantity } = action.payload;
      const existing = state.items.findIndex(
        i => i.productId === productId && i.colour === colour && i.size === size
      );
      if (existing !== -1) {
        const items = [...state.items];
        items[existing] = { ...items[existing], quantity: items[existing].quantity + quantity };
        return { items };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          i => !(i.productId === action.payload.productId && i.colour === action.payload.colour && i.size === action.payload.size)
        ),
      };
    case 'UPDATE_QTY':
      return {
        items: state.items.map(i =>
          i.productId === action.payload.productId && i.colour === action.payload.colour && i.size === action.payload.size
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    default:
      return state;
  }
}

function loadCart(): CartState {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
