'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { reviews } from '@/data/reviews';
import { FadeIn } from '@/components/animations/PageTransition';
import { formatDate } from '@/utils/format';

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="py-24 bg-zinc-50" aria-label="Отзывы покупателей">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-medium tracking-[0.4em] text-zinc-400 uppercase mb-3">
              Что говорят покупатели
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 leading-tight">ОТЗЫВЫ</h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={18}
                    className={
                      s <= Math.round(avgRating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-200 fill-zinc-200'
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-700">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-zinc-400">({reviews.length} отзывов)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 border border-zinc-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
              aria-label="Назад"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 border border-zinc-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
              aria-label="Вперед"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </FadeIn>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex-shrink-0 w-72 sm:w-80 bg-white p-6 border border-zinc-100"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= review.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-200 fill-zinc-200'
                    }
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-zinc-700 text-sm leading-relaxed mb-6 line-clamp-5">{review.text}</p>

              {/* Footer */}
              <div className="border-t border-zinc-100 pt-4 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
                    {review.name}
                    {review.verified && (
                      <CheckCircle size={13} className="text-green-500" />
                    )}
                  </div>
                  {review.productName && (
                    <div className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{review.productName}</div>
                  )}
                </div>
                <div className="text-xs text-zinc-400 whitespace-nowrap">{formatDate(review.date)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
