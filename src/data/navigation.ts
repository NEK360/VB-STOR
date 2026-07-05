// ============================================================
// VB STORE — НАВИГАЦИЯ
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
}

export const mainNavigation: NavItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Новинки', href: '/new', isNew: true },
  { label: 'Распродажа', href: '/sale' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Контакты', href: '/contacts' },
];

export default mainNavigation;
