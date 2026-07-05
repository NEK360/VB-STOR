// ============================================================
// VB STORE — HERO СЕКЦИЯ
// ============================================================

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'НОВАЯ КОЛЛЕКЦИЯ',
    subtitle: 'Columbia Winter 2024',
    description: 'Брендовые кроссовки для тех, кто выбирает качество',
    image: 'https://basket-12.wbbasket.ru/vol1795/part179547/179547019/images/big/1.webp',
    ctaPrimary: { label: 'Смотреть каталог', href: '/catalog' },
    ctaSecondary: { label: 'Новинки', href: '/new' },
    badge: 'Скидки до 40%',
  },
  {
    id: 'slide-2',
    title: 'ADIDAS',
    subtitle: 'Winter Collection',
    description: 'Комфорт и стиль в каждом шаге',
    image: 'https://basket-12.wbbasket.ru/vol1799/part179904/179904960/images/big/1.webp',
    ctaPrimary: { label: 'Купить сейчас', href: '/catalog' },
    ctaSecondary: { label: 'Распродажа', href: '/sale' },
    badge: '-40%',
  },
];

export const heroContent = {
  mainTitle: 'VB STORE',
  mainSubtitle: 'БРЕНДОВАЯ ОБУВЬ',
  tagline: 'Кроссовки мирового уровня',
  description: 'Columbia · Adidas · и другие бренды',
  ctaPrimary: { label: 'Смотреть каталог', href: '/catalog' },
  ctaSecondary: { label: 'Новинки', href: '/new' },
};

export default heroContent;
