'use client';

import { useState, useCallback, useMemo } from 'react';
import { products } from '@/data/products';
import { searchProducts } from '@/utils/products';
import { useLocalStorage } from './useLocalStorage';
import type { Product } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useLocalStorage<string[]>('vbstore_search_history', []);

  const results = useMemo<Product[]>(() => {
    if (!query.trim()) return [];
    return searchProducts(products, query).slice(0, 8);
  }, [query]);

  const addToHistory = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      setHistory((prev) => {
        const filtered = prev.filter((h) => h !== q);
        return [q, ...filtered].slice(0, 5);
      });
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    isOpen,
    openSearch,
    closeSearch,
    history,
    addToHistory,
    clearHistory,
  };
}
