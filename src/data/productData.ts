import type { ColourOption, SizeOption, Spec, Review } from '../types';

export const COLOURS: ColourOption[] = [
  { name: 'Forest Green', hex: '#3a5a40' },
  { name: 'Slate Grey', hex: '#6b7280' },
  { name: 'Burnt Orange', hex: '#c2410c' },
];

export const SIZES: SizeOption[] = [
  { label: 'XS', stock: 'available', quantity: 8 },
  { label: 'S', stock: 'available', quantity: 12 },
  { label: 'M', stock: 'low', quantity: 2 },
  { label: 'L', stock: 'available', quantity: 6 },
  { label: 'XL', stock: 'sold_out', quantity: 0 },
  { label: 'XXL', stock: 'low', quantity: 1 },
];

export const SPECS: Spec[] = [
  { label: 'Material', value: '100% Merino Wool' },
  { label: 'Weight', value: '320 g/m²' },
  { label: 'Fit', value: 'Regular' },
  { label: 'Care', value: 'Machine wash cold' },
  { label: 'Origin', value: 'Made in Portugal' },
  { label: 'Season', value: 'All-season' },
];

export const REVIEWS: Review[] = [
  {
    author: 'James T.',
    rating: 5,
    date: '12 Apr 2025',
    body: 'Exceptionally warm without the bulk. Wore it on a 3-day trail in the Dolomites — performed brilliantly.',
  },
  {
    author: 'Sara M.',
    rating: 4,
    date: '3 Mar 2025',
    body: 'Great quality but runs slightly large. Size down if you prefer a fitted look.',
  },
  {
    author: 'Luca B.',
    rating: 5,
    date: '18 Feb 2025',
    body: 'Worth every penny. The colour is exactly as shown and the merino is incredibly soft.',
  },
];

export const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
  'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80',
];

export const SALE_ORIGINAL_PRICE = 189;
