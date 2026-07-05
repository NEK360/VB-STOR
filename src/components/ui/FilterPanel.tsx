'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { FilterState } from '@/types';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  availableBrands: string[];
  availableSizes: string[];
  availableColors: string[];
  totalCount: number;
}

const genderOptions = ['Мужской', 'Женский', 'Унисекс', 'Детский'];
const sortOptions: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'new', label: 'Новинки' },
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Дешевле' },
  { value: 'price_desc', label: 'Дороже' },
  { value: 'discount', label: 'По скидке' },
];

export default function FilterPanel({
  filters,
  onChange,
  isOpen,
  onClose,
  availableBrands,
  availableSizes,
  availableColors,
  totalCount,
}: FilterPanelProps) {
  const toggleArrayFilter = useCallback(
    (key: 'brand' | 'gender' | 'size' | 'color' | 'category', value: string) => {
      const current = filters[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onChange({ ...filters, [key]: next });
    },
    [filters, onChange]
  );

  const toggleBoolFilter = useCallback(
    (key: 'inStock' | 'isNew' | 'isSale' | 'isHit') => {
      onChange({ ...filters, [key]: !filters[key] });
    },
    [filters, onChange]
  );

  const clearAll = useCallback(() => {
    onChange({
      category: [],
      brand: [],
      gender: [],
      size: [],
      color: [],
      priceMin: undefined,
      priceMax: undefined,
      inStock: undefined,
      isNew: undefined,
      isSale: undefined,
      isHit: undefined,
      sortBy: 'new',
    });
  }, [onChange]);

  const hasActiveFilters =
    filters.brand.length > 0 ||
    filters.gender.length > 0 ||
    filters.size.length > 0 ||
    filters.color.length > 0 ||
    filters.inStock ||
    filters.isNew ||
    filters.isSale ||
    filters.isHit;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-zinc-100 pb-6 mb-6">
      <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">{title}</h3>
      {children}
    </div>
  );

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <span className="font-bold text-zinc-900">Фильтры</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-zinc-400 hover:text-black transition-colors"
            >
              Сбросить
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 rounded" aria-label="Закрыть">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Results count */}
        <div className="text-sm text-zinc-500 mb-6">
          Найдено: <span className="font-bold text-zinc-900">{totalCount}</span> товаров
        </div>

        {/* Sort */}
        <FilterSection title="Сортировка">
          <div className="space-y-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...filters, sortBy: opt.value })}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm rounded transition-colors',
                  filters.sortBy === opt.value
                    ? 'bg-black text-white'
                    : 'text-zinc-700 hover:bg-zinc-50'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Quick toggles */}
        <FilterSection title="Статус">
          {[
            { key: 'inStock' as const, label: 'В наличии' },
            { key: 'isNew' as const, label: 'Новинки' },
            { key: 'isSale' as const, label: 'Со скидкой' },
            { key: 'isHit' as const, label: 'Хиты продаж' },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-3 py-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={!!filters[key]}
                onChange={() => toggleBoolFilter(key)}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm text-zinc-700 group-hover:text-black transition-colors">{label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Brand */}
        {availableBrands.length > 0 && (
          <FilterSection title="Бренд">
            <div className="flex flex-wrap gap-2">
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleArrayFilter('brand', brand)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium border transition-all',
                    filters.brand.includes(brand)
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 text-zinc-600 hover:border-black'
                  )}
                >
                  {brand}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Gender */}
        <FilterSection title="Пол">
          <div className="flex flex-wrap gap-2">
            {genderOptions.map((g) => (
              <button
                key={g}
                onClick={() => toggleArrayFilter('gender', g)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium border transition-all',
                  filters.gender.includes(g)
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-200 text-zinc-600 hover:border-black'
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Size */}
        {availableSizes.length > 0 && (
          <FilterSection title="Размер">
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleArrayFilter('size', size)}
                  className={cn(
                    'min-w-[40px] h-9 px-2 text-sm font-medium border transition-all',
                    filters.size.includes(size)
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 text-zinc-700 hover:border-black'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Colors */}
        {availableColors.length > 0 && (
          <FilterSection title="Цвет">
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleArrayFilter('color', color)}
                  className={cn(
                    'px-3 py-1.5 text-xs border transition-all',
                    filters.color.includes(color)
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 text-zinc-600 hover:border-black'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </FilterSection>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white border border-zinc-100 overflow-hidden">
          {content}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[60] lg:hidden overflow-hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
