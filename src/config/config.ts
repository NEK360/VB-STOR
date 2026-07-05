// ============================================================
// VB STORE — MAIN CONFIGURATION
// Все настройки магазина хранятся здесь.
// Изменяйте только этот файл для обновления контактов и настроек.
// ============================================================

export const STORE_CONFIG = {
  name: 'VB STORE',
  tagline: 'Брендовая обувь нового уровня',
  description: 'Премиальный магазин брендовых кроссовок, одежды и аксессуаров',
  logo: '/images/icons/logo.svg',

  // Контакты
  contacts: {
    phone: '+7 918 797-02-30',
    phoneLink: 'tel:+79187970230',
    telegram: '@VB_STORE_IZOB',
    telegramUrl: 'https://t.me/VB_STORE_IZOB',
    whatsapp: '+7 918 797-02-30',
    whatsappUrl: 'https://wa.me/79187970230',
    max: 'MAX',
    maxUrl: 'https://max.ru/u/f9LHodD0cOLiz9hM5Ii73GJeJgs6spgpPuF5_fOcYWQ28roZNJxwUZYSd5Y',
    email: 'vbshop456@gmail.com',
    vk: '',
    vkUrl: '',
  },

  // Адрес
  address: {
    city: 'г. Изобильный',
    region: 'Ставропольский край',
    street: 'ул. Кирова, 2Г',
    full: 'г. Изобильный, Ставропольский край, ул. Кирова, 2Г',
    mapUrl: 'https://yandex.ru/maps/?text=Изобильный+ул+Кирова+2Г',
  },

  // Валюта
  currency: 'RUB',
  currencySymbol: '₽',

  // SEO
  seo: {
    title: 'VB STORE — Брендовые кроссовки и одежда',
    description:
      'Интернет-магазин брендовых кроссовок Columbia, Adidas и других премиальных марок. Доставка по всей России.',
    keywords: 'кроссовки, брендовая обувь, Columbia, Adidas, купить кроссовки',
    ogImage: '/images/hero/og-image.jpg',
    twitterCard: 'summary_large_image',
    canonicalUrl: 'https://vbstore.ru',
  },

  // Доставка
  delivery: {
    methods: ['Почта России', 'СДЭК', 'Boxberry'],
    freePickup: 'Бесплатная доставка в ПВЗ Wildberries в г. Изобильный',
    description: 'Доставка в любую точку Российской Федерации',
  },

  // Гарантия
  guarantee: '30 дней',

  // Возврат
  returnPolicy: '14 дней',

  // Способы оплаты
  paymentMethods: ['Наличными', 'Банковской картой', 'Через Wildberries'],

  // Email для заявок
  orderEmail: 'vbshop456@gmail.com',

  // Социальные сети
  social: {
    telegram: 'https://t.me/VB_STORE_IZOB',
    whatsapp: 'https://wa.me/79187970230',
    max: 'https://max.ru/u/f9LHodD0cOLiz9hM5Ii73GJeJgs6spgpPuF5_fOcYWQ28roZNJxwUZYSd5Y',
  },
} as const;

export type StoreConfig = typeof STORE_CONFIG;
