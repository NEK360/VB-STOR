'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { mainNavigation } from '@/data/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/utils/cn';
import SearchModal from '@/components/ui/SearchModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { totalItems } = useCart();
  const { isOpen, openSearch, closeSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-100 shadow-sm'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex items-center justify-between transition-all duration-300', isScrolled ? 'h-16' : 'h-20')}>
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                className={cn(
                  'font-black tracking-[0.2em] transition-colors duration-300',
                  isScrolled ? 'text-black text-xl' : 'text-white text-2xl'
                )}
                whileHover={{ scale: 1.02 }}
              >
                VB<span className="text-zinc-400">.</span>STORE
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 group',
                      isScrolled ? 'text-zinc-700 hover:text-black' : 'text-white/80 hover:text-white'
                    )}
                    whileHover={{ y: -1 }}
                  >
                    {item.label}
                    {item.isNew && (
                      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    )}
                    <motion.div
                      className={cn('absolute bottom-0 left-4 right-4 h-px', isScrolled ? 'bg-black' : 'bg-white')}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Phone */}
              <Link
                href="tel:+79187970230"
                className={cn(
                  'hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors duration-300',
                  isScrolled ? 'text-zinc-600 hover:text-black' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone size={14} />
                <span className="hidden xl:inline">+7 918 797-02-30</span>
              </Link>

              {/* Search */}
              <button
                onClick={openSearch}
                className={cn(
                  'p-2 transition-colors duration-300 rounded-lg',
                  isScrolled ? 'text-zinc-700 hover:text-black hover:bg-zinc-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Поиск"
              >
                <Search size={20} />
              </button>

              {/* Favorites */}
              <Link
                href="/favorites"
                className={cn(
                  'relative p-2 transition-colors duration-300 rounded-lg',
                  isScrolled ? 'text-zinc-700 hover:text-black hover:bg-zinc-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label={`Избранное (${favorites.length})`}
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                className={cn(
                  'relative p-2 transition-colors duration-300 rounded-lg',
                  isScrolled ? 'text-zinc-700 hover:text-black hover:bg-zinc-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label={`Корзина (${totalItems})`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMenu}
                className={cn(
                  'lg:hidden p-2 transition-colors duration-300 rounded-lg',
                  isScrolled ? 'text-zinc-700 hover:text-black hover:bg-zinc-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-40 bg-black flex flex-col pt-20 px-6 pb-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 mt-8">
              {mainNavigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-zinc-800 text-white text-2xl font-medium tracking-wide hover:text-zinc-400 transition-colors"
                  >
                    {item.label}
                    {item.isNew && (
                      <span className="text-xs bg-white text-black px-2 py-0.5 font-bold tracking-widest">NEW</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8 flex flex-col gap-3">
              <a href="tel:+79187970230" className="text-zinc-400 text-sm">+7 918 797-02-30</a>
              <a href="https://t.me/VB_STORE_IZOB" className="text-zinc-400 text-sm">@VB_STORE_IZOB</a>
              <a href="mailto:vbshop456@gmail.com" className="text-zinc-400 text-sm">vbshop456@gmail.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isOpen} onClose={closeSearch} />
    </>
  );
}
