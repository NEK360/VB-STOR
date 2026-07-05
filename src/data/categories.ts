// ============================================================
// VB STORE — КАТЕГОРИИ
// ============================================================

import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'sneakers',
    name: 'Кроссовки',
    slug: 'krossovki',
    image: '/images/categories/sneakers.jpg',
  },
  {
    id: 'clothing',
    name: 'Одежда',
    slug: 'odezhda',
    image: '/images/categories/clothing.jpg',
  },
  {
    id: 'accessories',
    name: 'Аксессуары',
    slug: 'aksessuary',
    image: '/images/categories/accessories.jpg',
  },
];

export default categories;
