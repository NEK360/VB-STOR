// ============================================================
// VB STORE — ANALYTICS SERVICE
// Архитектура для подключения аналитики
// ============================================================

// TODO: Подключить реальные трекеры по необходимости

type AnalyticsEvent = {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

// Google Analytics 4
export function trackGA4Event(data: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.gtag) {
    w.gtag('event', data.event, data);
  }
}

// Яндекс Метрика
export function trackYM(goalId: string) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.ym) {
    w.ym(process.env.NEXT_PUBLIC_YM_ID, 'reachGoal', goalId);
  }
}

// Meta Pixel
export function trackMetaPixel(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.fbq) {
    w.fbq('track', event, data);
  }
}

// Общий трекер событий
export function trackEvent(data: AnalyticsEvent) {
  trackGA4Event(data);
  trackYM(data.event);
  trackMetaPixel(data.event, data);
}

// Трекинг просмотра товара
export function trackProductView(productId: string, productName: string, price: number) {
  trackEvent({
    event: 'view_item',
    category: 'Product',
    label: productName,
    value: price,
    item_id: productId,
  });
}

// Трекинг добавления в избранное
export function trackAddToWishlist(productId: string, productName: string) {
  trackEvent({
    event: 'add_to_wishlist',
    category: 'Product',
    label: productName,
    item_id: productId,
  });
}

// Трекинг отправки заявки
export function trackOrderSubmit(productId?: string, productName?: string) {
  trackEvent({
    event: 'generate_lead',
    category: 'Order',
    label: productName || 'General inquiry',
    item_id: productId,
  });
}
