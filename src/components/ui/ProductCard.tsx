'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export default function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(product.id);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  }, [product.images.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  }, []);

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(product.id);
    },
    [product.id, toggleFavorite]
  );

  const handleQuickView = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onQuickView?.(product);
    },
    [product, onQuickView]
  );

  return (
    <motion.div
      className="group relative bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-zinc-50 aspect-[3/4]">
          {/* Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="w-full h-full"
              >
                {product.images[currentImageIndex] && (
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} — вид ${currentImageIndex + 1}`}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 tracking-widest">
                NEW
              </span>
            )}
            {product.isSale && product.discount && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 tracking-widest">
                -{product.discount}%
              </span>
            )}
            {product.isHit && (
              <span className="bg-zinc-800 text-white text-[10px] font-bold px-2 py-1 tracking-widest">
                HIT
              </span>
            )}
          </div>

          {/* Stock badge */}
          {product.storeAvailable && (
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[9px] font-bold px-2 py-1 tracking-wide text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                В наличии
              </div>
            </div>
          )}

          {/* Hover actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-3 left-3 right-3 flex gap-2 z-10"
              >
                <motion.button
                  onClick={handleQuickView}
                  className="flex-1 bg-black text-white text-xs font-medium py-2.5 flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors"
                  whileTap={{ scale: 0.97 }}
                  aria-label="Быстрый просмотр"
                >
                  <Eye size={13} />
                  Быстрый просмотр
                </motion.button>
                <motion.button
                  onClick={handleFavorite}
                  className={cn(
                    'w-10 flex items-center justify-center text-xs transition-colors',
                    favorite ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-100'
                  )}
                  whileTap={{ scale: 0.9 }}
                  aria-label={favorite ? 'Убрать из избранного' : 'В избранное'}
                >
                  <Heart size={15} fill={favorite ? 'currentColor' : 'none'} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {product.images.slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-1 h-1 rounded-full transition-all duration-300',
                    i === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-4 pb-1">
          {/* Brand */}
          <div className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-1">
            {product.brand}
          </div>

          {/* Name */}
          <div className="font-medium text-zinc-900 text-sm leading-tight mb-2 line-clamp-2">
            {product.name}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs text-zinc-500">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {/* Sizes preview */}
          {product.sizes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((s) => (
                <span
                  key={s.barcode ?? s.size}
                  className="text-[10px] px-1.5 py-0.5 border border-zinc-200 text-zinc-500"
                >
                  {s.size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 text-zinc-400">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Buy button - only on hover */}
      <AnimatePresence>
        {isHovered && product.wildberriesUrl && (
          <motion.a
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            href={product.wildberriesUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors overflow-hidden"
          >
            <ShoppingBag size={13} />
            Купить на Wildberries
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
