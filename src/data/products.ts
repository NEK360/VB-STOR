// ============================================================
// VB STORE — КАТАЛОГ ТОВАРОВ
// ============================================================
// ВСТАВЬТЕ СЮДА СВОЙ КАТАЛОГ
// Используйте только этот файл.
// Не изменяйте компоненты.
// Компоненты автоматически построят каталог.
// ============================================================

import type { Product } from '@/types';

// ============================================================
// ДАННЫЕ КАТАЛОГА
// (Данные из Wildberries, обработаны и структурированы)
// ============================================================

export const products: Product[] = [
  // ─── Columbia 179547019 ───────────────────────────────────
  {
    id: 'columbia-179547019',
    wbId: '179547019',
    name: 'Кроссовки утепленные',
    brand: 'Columbia',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Columbia — идеальный выбор для зимнего сезона. Эти мужские кроссовки идеально подходят для зимних условий. Они обеспечат надежную защиту от холода и влаги, благодаря своей утепленной конструкции. Черный цвет кроссовок придает им стильный и элегантный вид. Плотная подошва обеспечивает максимальное сцепление с поверхностью и надежную поддержку ноги. При выборе размера: Размер 41 — 26 см, 42 — 27 см, 43 — 27,5 см, 44 — 28 см, 45 — 28,5 см, 46 — 29,5 см.',
    price: 4990,
    oldPrice: 7990,
    discount: 38,
    images: [
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/5.webp',
    ],
    sizes: [
      { size: 41, insole: '26 см', barcode: '2038705054736', inStock: true },
      { size: 42, insole: '27 см', barcode: '2038705054743', inStock: true },
      { size: 43, insole: '27,5 см', barcode: '2038705054750', inStock: true },
      { size: 44, insole: '28 см', barcode: '2038705054767', inStock: true },
      { size: 45, insole: '28,5 см', barcode: '2038705054774', inStock: true },
      { size: 46, insole: '29,5 см', barcode: '2038705065640', inStock: true },
    ],
    colors: ['черный', 'темно-серый', 'черный меланж', 'серый меланж', 'красный'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: true,
    isHit: true,
    isSale: true,
    isFeatured: true,
    tags: ['зима', 'утепленные', 'columbia', 'мужские', 'кроссовки'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179547019/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.8,
    reviewCount: 124,
    articul: '179547019',
  },

  // ─── Columbia 179547368 ───────────────────────────────────
  {
    id: 'columbia-179547368',
    wbId: '179547368',
    name: 'Кроссовки утепленные',
    brand: 'Columbia',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Columbia — идеальный выбор для зимнего сезона. Эти мужские теплые кроссовки идеально подходят для зимних условий. Надежная защита от холода и влаги, благодаря утепленной конструкции. Мягкая и уютная термо-подкладка делает их особенно приятными для носки.',
    price: 5290,
    oldPrice: 8490,
    discount: 38,
    images: [
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/5.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/6.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547368/images/big/7.webp',
    ],
    sizes: [
      { size: 41, insole: '26 см', barcode: '2038705064261', inStock: true },
      { size: 42, insole: '27 см', barcode: '2038705064278', inStock: true },
      { size: 43, insole: '27,5 см', barcode: '2038705064285', inStock: true },
      { size: 44, insole: '28 см', barcode: '2038705064292', inStock: true },
      { size: 45, insole: '28,5 см', barcode: '2038705064308', inStock: true },
      { size: 46, insole: '29,5 см', barcode: '2038705064315', inStock: true },
    ],
    colors: ['черный', 'светло-серый', 'яркий оранжевый', 'темно-серый', 'темно-серый меланж'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: true,
    isHit: false,
    isSale: true,
    isFeatured: true,
    tags: ['зима', 'утепленные', 'columbia', 'мужские', 'термо'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179547368/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.7,
    reviewCount: 89,
    articul: '179547368',
  },

  // ─── Columbia 179547625 ───────────────────────────────────
  {
    id: 'columbia-179547625',
    wbId: '179547625',
    name: 'Кроссовки утепленные',
    brand: 'Columbia',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Columbia — стильный выбор для холодного сезона. Высококачественные тканевые и текстильные материалы обеспечивают долговечность и комфорт при ношении. Columbia — известный бренд, который изготавливает качественные и стильные виды обуви.',
    price: 5490,
    oldPrice: 8990,
    discount: 39,
    images: [
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/5.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/6.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179547/179547625/images/big/7.webp',
    ],
    sizes: [
      { size: 41, insole: '26 см', barcode: '2038705074109', inStock: true },
      { size: 42, insole: '27 см', barcode: '2038705074116', inStock: true },
      { size: 43, insole: '27,5 см', barcode: '2038705074123', inStock: true },
      { size: 44, insole: '28 см', barcode: '2038705074130', inStock: true },
      { size: 45, insole: '28,5 см', barcode: '2038705074147', inStock: true },
      { size: 46, insole: '29,5 см', barcode: '2038705074154', inStock: true },
    ],
    colors: ['черный', 'темно-серый', 'светло-серый', 'красный'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: false,
    isHit: true,
    isSale: true,
    isFeatured: false,
    tags: ['зима', 'утепленные', 'columbia', 'мужские'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179547625/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.9,
    reviewCount: 156,
    articul: '179547625',
  },

  // ─── Columbia 179548048 ───────────────────────────────────
  {
    id: 'columbia-179548048',
    wbId: '179548048',
    name: 'Кроссовки утепленные',
    brand: 'Columbia',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Columbia — надежная защита от холода и влаги. Сочетание прочных материалов с качественной резиновой подошвой гарантирует долговечность и высокую износостойкость.',
    price: 5190,
    oldPrice: 8290,
    discount: 37,
    images: [
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/5.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/6.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548048/images/big/7.webp',
    ],
    sizes: [
      { size: 41, insole: '26 см', barcode: '2038705105476', inStock: true },
      { size: 42, insole: '27 см', barcode: '2038705105483', inStock: true },
      { size: 43, insole: '27,5 см', barcode: '2038705105490', inStock: true },
      { size: 44, insole: '28 см', barcode: '2038705105506', inStock: true },
      { size: 45, insole: '28,5 см', barcode: '2038705105513', inStock: true },
      { size: 46, insole: '29,5 см', barcode: '2038705105520', inStock: true },
    ],
    colors: ['синий', 'темно-синий джинсовый', 'черный меланж', 'темно-серый', 'светло-серый'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: true,
    isHit: false,
    isSale: true,
    isFeatured: true,
    tags: ['зима', 'утепленные', 'columbia', 'мужские', 'синий'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179548048/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.6,
    reviewCount: 67,
    articul: '179548048',
  },

  // ─── Columbia 179548279 ───────────────────────────────────
  {
    id: 'columbia-179548279',
    wbId: '179548279',
    name: 'Кроссовки утепленные',
    brand: 'Columbia',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Columbia в стильном сером цвете. Надежная защита от холода. Высококачественные материалы. Удобная посадка. Отличный выбор для активного образа жизни в зимний период.',
    price: 4890,
    oldPrice: 7790,
    discount: 37,
    images: [
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/5.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/6.webp',
      'https://basket-12.wbbasket.ru/vol1795/part179548/179548279/images/big/7.webp',
    ],
    sizes: [
      { size: 41, insole: '26 см', barcode: '2038705110203', inStock: true },
      { size: 42, insole: '27 см', barcode: '2038705110210', inStock: true },
      { size: 43, insole: '27,5 см', barcode: '2038705110227', inStock: true },
      { size: 44, insole: '28 см', barcode: '2038705110234', inStock: true },
      { size: 45, insole: '28,5 см', barcode: '2038705110241', inStock: true },
      { size: 46, insole: '29,5 см', barcode: '2038705110258', inStock: true },
    ],
    colors: ['серый', 'светло-серый', 'темно-серый', 'черный', 'оранжевый неон'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: false,
    isHit: false,
    isSale: true,
    isFeatured: false,
    tags: ['зима', 'утепленные', 'columbia', 'мужские', 'серый'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179548279/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.5,
    reviewCount: 43,
    articul: '179548279',
  },

  // ─── Adidas 179904960 ─────────────────────────────────────
  {
    id: 'adidas-179904960',
    wbId: '179904960',
    name: 'Кроссовки утепленные Adidas',
    brand: 'adidas',
    category: 'Кроссовки',
    description:
      'Кроссовки утепленные Adidas — идеальный выбор для зимнего сезона. Эти мужские кроссовки обеспечат надежную защиту от холода и влаги. Черный цвет придает стильный и элегантный вид. Плотная подошва обеспечивает максимальное сцепление с поверхностью. При выборе размера: 41 — 26 см, 42 — 27 см, 43 — 27,5 см, 44 — 28 см, 45 — 28,5 см, 46 — 29,5 см.',
    price: 5990,
    oldPrice: 9990,
    discount: 40,
    images: [
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/2.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/3.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/4.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/5.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/6.webp',
      'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/7.webp',
    ],
    sizes: [
      { size: 41, barcode: '2038718266058', inStock: true },
      { size: 42, barcode: '2038718266065', inStock: true },
      { size: 43, barcode: '2038718266072', inStock: true },
      { size: 44, barcode: '2038718266089', inStock: true },
      { size: 45, barcode: '2038718266096', inStock: true },
      { size: 46, barcode: '2038718266102', inStock: true },
    ],
    colors: ['черный', 'серый', 'темно-серый', 'графит', 'черный графит'],
    gender: 'Мужской',
    season: 'Зима',
    material: 'Текстиль',
    inStock: true,
    isNew: true,
    isHit: true,
    isSale: true,
    isFeatured: true,
    tags: ['зима', 'утепленные', 'adidas', 'мужские', 'адидас'],
    wildberriesUrl: `https://www.wildberries.ru/catalog/179904960/detail.aspx`,
    purchaseMethod: ['wildberries', 'order', 'whatsapp', 'telegram'],
    storeAvailable: true,
    rating: 4.9,
    reviewCount: 203,
    articul: '179904960',
  },
];

// ============================================================
// ЭКСПОРТ ВСПОМОГАТЕЛЬНЫХ ДАННЫХ
// ============================================================

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isFeatured);

export const getNewProducts = (): Product[] =>
  products.filter((p) => p.isNew);

export const getSaleProducts = (): Product[] =>
  products.filter((p) => p.isSale);

export const getHitProducts = (): Product[] =>
  products.filter((p) => p.isHit);

export default products;
