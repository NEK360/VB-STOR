'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { CartItem, Product } from '@/types';

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>('vbstore_cart', []);

  const addToCart = useCallback(
    (product: Product, size: string, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.product.id === product.id && item.size === size
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, size, quantity }];
      });
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (productId: string, size: string) => {
      setCart((prev) =>
        prev.filter((item) => !(item.product.id === productId && item.size === size))
      );
    },
    [setCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  return { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice };
}
