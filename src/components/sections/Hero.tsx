'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { heroSlides } from '@/data/hero';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];
  const easing: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Главный баннер">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {heroSlides.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: easing }}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easing }}
          >
            {slide.badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold tracking-[0.2em] px-4 py-2 mb-6">
                {slide.badge}
              </div>
            )}
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easing }}
            className="text-white/60 text-sm font-medium tracking-[0.4em] uppercase mb-4"
          >
            {slide.subtitle}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easing }}
            className="text-white font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
          >
            {slide.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easing }}
            className="text-white/70 text-lg mb-10 max-w-xl"
          >
            {slide.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easing }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={slide.ctaPrimary.href}>
              <motion.div
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold tracking-widest text-sm hover:bg-zinc-100 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {slide.ctaPrimary.label}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
            <Link href={slide.ctaSecondary.href}>
              <motion.div
                className="inline-flex items-center gap-3 border border-white/50 text-white px-8 py-4 font-medium tracking-widest text-sm hover:bg-white/10 hover:border-white transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {slide.ctaSecondary.label}
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="relative overflow-hidden rounded-full"
            aria-label={`Слайд ${i + 1}`}
          >
            <div className="w-8 h-1 bg-white/30 rounded-full" />
            {i === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 text-white/50 flex flex-col items-center gap-2 z-10"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-[0.3em] rotate-90 origin-center whitespace-nowrap mb-2">SCROLL</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
