# VB STORE — PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          — Root layout
│   ├── page.tsx            — Home page
│   ├── globals.css         — Global styles
│   ├── catalog/
│   │   └── page.tsx        — Catalog page
│   ├── product/[id]/
│   │   └── page.tsx        — Product page
│   ├── favorites/
│   │   └── page.tsx        — Favorites page
│   ├── contacts/
│   │   └── page.tsx        — Contacts page
│   ├── reviews/
│   │   └── page.tsx        — Reviews page
│   ├── sale/
│   │   └── page.tsx        — Sale page
│   ├── new/
│   │   └── page.tsx        — New arrivals page
│   └── api/
│       ├── health/         — Health check
│       └── contact/        — Contact form API
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Advantages.tsx
│   │   ├── Reviews.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── QuickView.tsx
│   │   ├── SearchModal.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── CustomCursor.tsx
│   └── animations/
│       ├── SmoothScroll.tsx
│       └── PageTransition.tsx
├── data/
│   ├── products.ts
│   ├── categories.ts
│   ├── brands.ts
│   ├── reviews.ts
│   ├── faq.ts
│   ├── advantages.ts
│   ├── contacts.ts
│   ├── banners.ts
│   ├── hero.ts
│   ├── navigation.ts
│   ├── footer.ts
│   ├── delivery.ts
│   ├── social.ts
│   └── settings.ts
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useFavorites.ts
│   ├── useRecentlyViewed.ts
│   ├── useSearch.ts
│   └── useCart.ts
├── types/
│   └── index.ts
├── utils/
│   ├── cn.ts
│   ├── products.ts
│   └── format.ts
├── config/
│   └── config.ts
└── services/
    ├── email.ts
    └── analytics.ts
```
