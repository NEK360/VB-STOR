'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OrderFormData } from '@/types';
import { trackOrderSubmit } from '@/services/analytics';

interface OrderFormProps {
  onSuccess?: () => void;
  theme?: 'light' | 'dark';
  productName?: string;
  productId?: string;
}

export default function OrderForm({
  onSuccess,
  theme = 'light',
  productName,
  productId,
}: OrderFormProps) {
  const [form, setForm] = useState<OrderFormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
    productName: productName || '',
    productId: productId || '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const isDark = theme === 'dark';

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Введите имя';
    if (!form.phone.trim()) newErrors.phone = 'Введите телефон';
    else if (!/^[\+]?[\d\s\-\(\)]{10,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Некорректный номер';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productName, productId }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        trackOrderSubmit(productId, productName);
        setForm({ name: '', phone: '', email: '', comment: '', productName: productName || '', productId: productId || '' });
        onSuccess?.();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = cn(
    'w-full px-4 py-3 text-sm transition-all duration-200 outline-none border',
    isDark
      ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white'
      : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-black'
  );

  const labelClass = cn(
    'block text-xs font-medium tracking-widest mb-2',
    isDark ? 'text-zinc-400' : 'text-zinc-500'
  );

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center gap-4"
      >
        <CheckCircle size={48} className="text-green-500" />
        <h3 className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-zinc-900')}>
          Заявка отправлена!
        </h3>
        <p className={cn('text-sm', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
          Мы свяжемся с вами в ближайшее время.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {productName && (
        <div className={cn('text-xs mb-4 p-3 border', isDark ? 'border-zinc-700 text-zinc-300' : 'border-zinc-200 text-zinc-600')}>
          Товар: <span className="font-bold">{productName}</span>
        </div>
      )}

      <div>
        <label htmlFor="order-name" className={labelClass}>ИМЯ *</label>
        <input
          id="order-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Ваше имя"
          className={cn(inputClass, errors.name && 'border-red-500')}
          required
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="order-phone" className={labelClass}>ТЕЛЕФОН *</label>
        <input
          id="order-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+7 (___) ___-__-__"
          className={cn(inputClass, errors.phone && 'border-red-500')}
          required
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="order-email" className={labelClass}>EMAIL</label>
        <input
          id="order-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="email@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="order-comment" className={labelClass}>КОММЕНТАРИЙ</label>
        <textarea
          id="order-comment"
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          placeholder="Размер, цвет, вопросы..."
          rows={3}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-red-500 text-sm"
          >
            <AlertCircle size={16} />
            Ошибка отправки. Попробуйте позвонить напрямую.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full py-4 font-bold text-sm tracking-widest transition-all disabled:opacity-60 disabled:cursor-not-allowed',
          isDark
            ? 'bg-white text-black hover:bg-zinc-100'
            : 'bg-black text-white hover:bg-zinc-800'
        )}
      >
        {loading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
      </button>

      <p className={cn('text-xs text-center', isDark ? 'text-zinc-600' : 'text-zinc-400')}>
        Нажимая кнопку, вы соглашаетесь с условиями обработки данных
      </p>
    </form>
  );
}
