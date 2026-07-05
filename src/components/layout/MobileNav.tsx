'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Heart, Tag, Phone } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useFavorites } from '@/hooks/useFavorites';

const mobileNavItems = [
  { label: 'Главная', href: '/', icon: Home },
  { label: 'Каталог', href: '/catalog', icon: Grid3X3 },
  { label: 'Скидки', href: '/sale', icon: Tag },
  { label: 'Избранное', href: '/favorites', icon: Heart },
  { label: 'Контакты', href: '/contacts', icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-zinc-100 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isFavorites = item.href === '/favorites';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 relative',
                isActive ? 'text-black' : 'text-zinc-400'
              )}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                {isFavorites && favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-black rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
