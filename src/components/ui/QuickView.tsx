'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Star, ShoppingBag, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';
import { STORE_CONFIG } from '@/config/config';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const nextImage = useCallback(() => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  }, [product]);

  const prevImage = useCallback(() => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product]);

  const easing: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: easing }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-x-[10%] lg:inset-y-[5%] z-[90] bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl max-w-5xl mx-auto"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors shadow-md"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>

            {/* Images */}
            <div className="relative md:w-1/2 bg-zinc-50 flex-shrink-0 h-64 md:h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {product.images[activeImageIndex] && (
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={`${product.name} — ${activeImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    aria-label="Следующее фото"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={cn(
                      'relative w-12 h-12 flex-shrink-0 border-2 transition-all',
                      i === activeImageIndex ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              {/* Brand */}
              <div className="text-xs text-zinc-400 font-medium tracking-[0.3em] uppercase mb-2">
                {product.brand}
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-zinc-900 mb-3">{product.name}</h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s <= Math.round(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-zinc-200 fill-zinc-200'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500">{product.reviewCount} отзывов</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-zinc-900">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-base text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
                )}
                {product.discount && (
                  <span className="bg-red-50 text-red-600 text-sm font-bold px-2 py-0.5">-{product.discount}%</span>
                )}
              </div>

              {/* Stock status */}
              {product.storeAvailable && (
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  В наличии в магазине
                </div>
              )}

              {/* Sizes */}
              <div className="mb-6">
                <div className="text-xs font-medium text-zinc-500 tracking-widest mb-3">РАЗМЕР</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.barcode ?? s.size}
                      onClick={() => setSelectedSize(String(s.size))}
                      disabled={!s.inStock}
                      className={cn(
                        'min-w-[42px] h-9 px-2 border text-sm font-medium transition-all',
                        selectedSize === String(s.size)
                          ? 'border-black bg-black text-white'
                          : s.inStock
                          ? 'border-zinc-200 hover:border-black text-zinc-700'
                          : 'border-zinc-100 text-zinc-300 cursor-not-allowed line-through'
                      )}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <div className="mt-2 text-xs text-zinc-400">
                    {product.sizes.find((s) => String(s.size) === selectedSize)?.insole
                      ? `Стелька: ${product.sizes.find((s) => String(s.size) === selectedSize)?.insole}`
                      : ''}
                  </div>
                )}
              </div>

              {/* Buy buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                {product.wildberriesUrl && (
                  <a
                    href={product.wildberriesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors"
                  >
                    <ShoppingBag size={16} />
                    Купить на Wildberries
                    <ExternalLink size={14} />
                  </a>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={STORE_CONFIG.contacts.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={13} />
                    WhatsApp
                  </a>
                  <a
                    href={STORE_CONFIG.contacts.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
                  >
                    <MessageCircle size={13} />
                    Telegram
                  </a>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-2.5 border text-sm font-medium transition-all',
                      isFavorite(product.id)
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'border-zinc-200 text-zinc-700 hover:border-black'
                    )}
                  >
                    <Heart size={16} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
                    {isFavorite(product.id) ? 'В избранном' : 'В избранное'}
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 text-sm font-medium text-zinc-700 hover:border-black transition-colors"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
