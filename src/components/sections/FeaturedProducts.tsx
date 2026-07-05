'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import QuickView from '@/components/ui/QuickView';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/PageTransition';
import type { Product } from '@/types';

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const featured = getFeaturedProducts();

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
        <div>
          <div className="text-xs font-medium tracking-[0.4em] text-zinc-400 uppercase mb-3">
            Выбор редакции
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 leading-tight">
            ЛУЧШИЕ<br />МОДЕЛИ
          </h2>
        </div>
        <Link href="/catalog">
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors group"
            whileHover={{ x: 4 }}
          >
            Весь каталог
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Link>
      </FadeIn>

      {/* Grid */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {featured.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard
              product={product}
              onQuickView={handleQuickView}
              priority={i < 4}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <QuickView product={quickViewProduct} onClose={handleCloseQuickView} />
    </section>
  );
}
