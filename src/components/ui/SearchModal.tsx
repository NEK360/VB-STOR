'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularQueries = ['Columbia', 'Adidas', 'Кроссовки зима', 'Утепленные'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results, history, addToHistory, clearHistory } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, setQuery]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  const handleProductClick = useCallback(
    (productName: string) => {
      addToHistory(productName);
      onClose();
    },
    [addToHistory, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Search input */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-100">
              <Search size={20} className="text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Поиск товаров, брендов..."
                className="flex-1 text-lg outline-none placeholder:text-zinc-300 text-zinc-900"
              />
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-black transition-colors p-1"
                aria-label="Закрыть поиск"
              >
                <X size={22} />
              </button>
            </div>

            {/* Results */}
            <div className="overflow-y-auto flex-1">
              {query && results.length > 0 && (
                <div className="p-4">
                  <div className="text-xs text-zinc-400 font-medium tracking-widest mb-3 px-2">РЕЗУЛЬТАТЫ</div>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => handleProductClick(product.name)}
                    >
                      <motion.div
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="relative w-14 h-14 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-zinc-900 truncate">{product.name}</div>
                          <div className="text-sm text-zinc-400">{product.brand}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-zinc-900">{formatPrice(product.price)}</div>
                          {product.oldPrice && (
                            <div className="text-xs text-zinc-400 line-through">{formatPrice(product.oldPrice)}</div>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-zinc-400">
                  <div className="text-4xl mb-3">🔍</div>
                  <div className="font-medium">По запросу «{query}» ничего не найдено</div>
                  <div className="text-sm mt-1">Попробуйте другой запрос</div>
                </div>
              )}

              {!query && (
                <div className="p-4">
                  {/* History */}
                  {history.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <div className="text-xs text-zinc-400 font-medium tracking-widest flex items-center gap-2">
                          <Clock size={12} />
                          ИСТОРИЯ
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-xs text-zinc-400 hover:text-black transition-colors"
                        >
                          Очистить
                        </button>
                      </div>
                      {history.map((h) => (
                        <button
                          key={h}
                          onClick={() => setQuery(h)}
                          className="w-full text-left px-3 py-2 text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors text-sm"
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular */}
                  <div>
                    <div className="text-xs text-zinc-400 font-medium tracking-widest mb-3 px-2 flex items-center gap-2">
                      <TrendingUp size={12} />
                      ПОПУЛЯРНЫЕ
                    </div>
                    <div className="flex flex-wrap gap-2 px-2">
                      {popularQueries.map((q) => (
                        <button
                          key={q}
                          onClick={() => setQuery(q)}
                          className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-sm rounded-full hover:bg-black hover:text-white transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
