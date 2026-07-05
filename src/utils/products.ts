// ============================================================
// VB STORE — PRODUCT UTILITIES
// ============================================================

import type { Product, FilterState } from '@/types';

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.category.length > 0 && !filters.category.includes(product.category)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) return false;
    if (filters.size.length > 0) {
      const productSizes = product.sizes.map((s) => String(s.size));
      if (!filters.size.some((s) => productSizes.includes(s))) return false;
    }
    if (filters.color.length > 0) {
      if (!filters.color.some((c) => product.colors.includes(c))) return false;
    }
    if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.isNew && !product.isNew) return false;
    if (filters.isSale && !product.isSale) return false;
    if (filters.isHit && !product.isHit) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: FilterState['sortBy']): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'discount':
      return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'popular':
      return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    case 'new':
    default:
      return sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }
}

export function getSimilarProducts(product: Product, allProducts: Product[], limit = 4): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand ||
          p.category === product.category ||
          p.tags?.some((t) => product.tags?.includes(t)))
    )
    .slice(0, limit);
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.articul?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

export function getUniqueValues<T extends keyof Product>(
  products: Product[],
  key: T
): string[] {
  const values = new Set<string>();
  products.forEach((p) => {
    const val = p[key];
    if (Array.isArray(val)) {
      (val as string[]).forEach((v) => values.add(v));
    } else if (val !== undefined && val !== null) {
      values.add(String(val));
    }
  });
  return Array.from(values).sort();
}
