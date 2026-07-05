import Link from 'next/link';
import { FadeIn } from '@/components/animations/PageTransition';
import { mainNavigation } from '@/data/navigation';
import { STORE_CONFIG } from '@/config/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <FadeIn className="lg:col-span-1">
            <div className="text-3xl font-black tracking-[0.2em] mb-4">VB.STORE</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Премиальный магазин брендовых кроссовок Columbia, Adidas и других мировых марок.
            </p>
            <div className="flex gap-3">
              <Link
                href={STORE_CONFIG.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold"
                aria-label="Telegram"
              >
                TG
              </Link>
              <Link
                href={STORE_CONFIG.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </Link>
              <Link
                href={STORE_CONFIG.contacts.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold"
                aria-label="MAX"
              >
                MX
              </Link>
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn delay={0.1}>
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-500 mb-6">НАВИГАЦИЯ</div>
            <ul className="space-y-3">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-white transition-all duration-200 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-500 mb-6">КОНТАКТЫ</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={STORE_CONFIG.contacts.phoneLink} className="text-zinc-400 hover:text-white transition-colors">
                  {STORE_CONFIG.contacts.phone}
                </a>
              </li>
              <li>
                <a href={STORE_CONFIG.contacts.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                  {STORE_CONFIG.contacts.telegram}
                </a>
              </li>
              <li>
                <a href={`mailto:${STORE_CONFIG.contacts.email}`} className="text-zinc-400 hover:text-white transition-colors">
                  {STORE_CONFIG.contacts.email}
                </a>
              </li>
            </ul>
          </FadeIn>

          {/* Address & Delivery */}
          <FadeIn delay={0.3}>
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-500 mb-6">АДРЕС</div>
            <address className="not-italic text-zinc-400 text-sm space-y-1 mb-6">
              <div>{STORE_CONFIG.address.city}</div>
              <div>{STORE_CONFIG.address.region}</div>
              <div>{STORE_CONFIG.address.street}</div>
            </address>
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-500 mb-3">ДОСТАВКА</div>
            <ul className="space-y-1 text-xs text-zinc-500">
              {STORE_CONFIG.delivery.methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">© {year} VB STORE. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <span>Гарантия {STORE_CONFIG.guarantee}</span>
            <span>Возврат {STORE_CONFIG.returnPolicy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
