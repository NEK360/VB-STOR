// ============================================================
// VB STORE — GLOBAL TYPES
// ============================================================

export interface Product {
  id: string;
  wbId: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  sizes: ProductSize[];
  colors: string[];
  gender: 'Мужской' | 'Женский' | 'Унисекс' | 'Детский';
  season?: string;
  material?: string;
  inStock: boolean;
  isNew?: boolean;
  isHit?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  isLastSize?: boolean;
  tags?: string[];
  wildberriesUrl?: string;
  purchaseMethod: PurchaseMethod[];
  rating?: number;
  reviewCount?: number;
  articul?: string;
  storeAvailable?: boolean;
}

export interface ProductSize {
  size: number | string;
  insole?: string;
  barcode?: string;
  inStock: boolean;
}

export type PurchaseMethod = 'wildberries' | 'order' | 'whatsapp' | 'telegram' | 'max' | 'phone';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  count?: number;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  photo?: string;
  date: string;
  productName?: string;
  verified?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  cta?: string;
}

export interface ContactInfo {
  phone: string;
  telegram: string;
  telegramUrl: string;
  whatsapp: string;
  whatsappUrl: string;
  max: string;
  maxUrl: string;
  email: string;
  address: string;
  city: string;
  region: string;
}

export interface FilterState {
  category: string[];
  brand: string[];
  gender: string[];
  size: string[];
  color: string[];
  priceMin?: number;
  priceMax?: number;
  season?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isHit?: boolean;
  sortBy: SortOption;
}

export type SortOption = 'new' | 'popular' | 'price_asc' | 'price_desc' | 'discount';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  productName?: string;
  productId?: string;
  size?: string;
}
