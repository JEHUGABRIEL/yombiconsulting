import { useState, useMemo } from 'react';
import { PRODUCTS, PRICE_MIN, PRICE_MAX } from '@/data/products';
import type { Product } from '@/types';

export function useProductFilters() {
  const [category,   setCategory]   = useState('Tous');
  const [query,      setQuery]      = useState('');
  const [brands,     setBrands]     = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  const toggleBrand = (brand: string) => {
    setBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setCategory('Tous');
    setQuery('');
    setBrands([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const hasActiveFilters =
    category !== 'Tous' ||
    query.trim() !== '' ||
    brands.length > 0 ||
    priceRange[0] > PRICE_MIN ||
    priceRange[1] < PRICE_MAX;

  const filteredProducts = useMemo<Product[]>(() => {
    return PRODUCTS.filter(p => {
      if (category !== 'Tous' && p.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!p.name.toLowerCase().includes(q) &&
            !p.brand.toLowerCase().includes(q) &&
            !p.desc.toLowerCase().includes(q)) return false;
      }
      if (brands.length > 0 && !brands.includes(p.brand)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [category, query, brands, priceRange]);

  return {
    category, setCategory,
    query,    setQuery,
    brands,   toggleBrand,
    priceRange, setPriceRange,
    hasActiveFilters, resetFilters,
    filteredProducts,
  };
}
