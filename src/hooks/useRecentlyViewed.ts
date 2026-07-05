'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>(
    'vbstore_recently_viewed',
    []
  );

  const addToRecentlyViewed = useCallback(
    (productId: string) => {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered].slice(0, MAX_ITEMS);
      });
    },
    [setRecentlyViewed]
  );

  return { recentlyViewed, addToRecentlyViewed };
}
