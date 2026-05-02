// ─────────────────────────────────────────────────────────────
// CLEAN SHOP — Types centralisés
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

// ── Produits ─────────────────────────────────────────────────

export interface ProductSpec {
  label: string;
  value: string;
  icon?: ReactNode;
}

export type BadgeType = 'hot' | 'new' | 'verified';

export interface Product {
  id: number;
  name: string;
  brand: string;
  /** Prix en CFA (entier) pour les calculs */
  price: number;
  /** Prix formaté pour l'affichage */
  priceLabel: string;
  desc: string;
  icon: ReactNode;
  category: string;
  badge?: string;
  badgeType?: BadgeType;
  /** Fond sombre pour la vignette produit */
  darkBg?: boolean;
  /** Emojis de galerie */
  images: string[];
  specs: ProductSpec[];
  inStock: boolean;
  onSale?: boolean;
}

// ── Panier ───────────────────────────────────────────────────

export interface CartItem extends Product {
  quantity: number;
}

// ── Avis (Supabase) ──────────────────────────────────────────

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  product_id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  created_at?: string;
}

export interface ReviewFormData {
  user: string;
  rating: number;
  comment: string;
}

// ── Contact ──────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

// ── Filtres ──────────────────────────────────────────────────

export interface ProductFilters {
  category: string;
  searchQuery: string;
  brands: string[];
  priceRange: [number, number];
}
