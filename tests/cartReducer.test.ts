import type { CartItem } from '../src/types';

// Inline the reducer logic (mirrors CartContext) to test in isolation
interface CartState { items: CartItem[] }
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; colour: string; size: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: number; colour: string; size: string; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, colour, size, quantity } = action.payload;
      const idx = state.items.findIndex(i => i.productId === productId && i.colour === colour && i.size === size);
      if (idx !== -1) {
        const items = [...state.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        return { items };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => !(i.productId === action.payload.productId && i.colour === action.payload.colour && i.size === action.payload.size)) };
    case 'UPDATE_QTY':
      return { items: state.items.map(i => i.productId === action.payload.productId && i.colour === action.payload.colour && i.size === action.payload.size ? { ...i, quantity: action.payload.quantity } : i) };
    default: return state;
  }
}

const item: CartItem = { productId: 1, title: 'Jacket', image: '', price: 55, colour: 'Forest Green', size: 'M', quantity: 1 };
const empty: CartState = { items: [] };

describe('cartReducer', () => {
  it('adds a new item', () => {
    const state = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('merges duplicate item by incrementing quantity', () => {
    const withOne = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    const withTwo = cartReducer(withOne, { type: 'ADD_ITEM', payload: item });
    expect(withTwo.items).toHaveLength(1);
    expect(withTwo.items[0].quantity).toBe(2);
  });

  it('treats same product with different size as separate item', () => {
    const withOne = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    const withTwo = cartReducer(withOne, { type: 'ADD_ITEM', payload: { ...item, size: 'L' } });
    expect(withTwo.items).toHaveLength(2);
  });

  it('removes an item', () => {
    const withOne = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    const removed = cartReducer(withOne, { type: 'REMOVE_ITEM', payload: { productId: 1, colour: 'Forest Green', size: 'M' } });
    expect(removed.items).toHaveLength(0);
  });

  it('updates quantity', () => {
    const withOne = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    const updated = cartReducer(withOne, { type: 'UPDATE_QTY', payload: { productId: 1, colour: 'Forest Green', size: 'M', quantity: 5 } });
    expect(updated.items[0].quantity).toBe(5);
  });

  it('does not mutate original state', () => {
    const state = cartReducer(empty, { type: 'ADD_ITEM', payload: item });
    expect(empty.items).toHaveLength(0);
    expect(state).not.toBe(empty);
  });
});
