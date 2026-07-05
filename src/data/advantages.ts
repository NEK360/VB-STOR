// ============================================================
// VB STORE — ПРЕИМУЩЕСТВА
// ============================================================

import type { Advantage } from '@/types';

export const advantages: Advantage[] = [
  {
    id: 'guarantee',
    title: 'Гарантия 30 дней',
    description: 'На каждую модель кроссовок действует гарантия 30 дней.',
    icon: 'shield',
  },
  {
    id: 'delivery',
    title: 'Доставка по России',
    description:
      'Доставка в любую точку РФ. Почта России, СДЭК, Boxberry. Бесплатная доставка в ПВЗ Wildberries в г. Изобильный.',
    icon: 'truck',
  },
  {
    id: 'return',
    title: 'Возврат 14 дней',
    description: 'Если товар не подошёл — вы можете оформить возврат в течение 14 дней.',
    icon: 'refresh',
  },
  {
    id: 'original',
    title: 'Оригинальные товары',
    description: 'Только оригинальные брендовые кроссовки от проверенных поставщиков.',
    icon: 'star',
  },
];

export default advantages;
