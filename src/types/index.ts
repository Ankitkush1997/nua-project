export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export type StockLevel = 'available' | 'low' | 'sold_out';

export interface SizeOption {
  label: string;
  stock: StockLevel;
  quantity: number;
}

export interface ColourOption {
  name: string;
  hex: string;
}

export interface ProductVariant {
  colour: string;
  size: string;
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  colour: string;
  size: string;
  quantity: number;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  body: string;
}
