'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import { STORE_CONFIG } from '@/config/config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import OrderForm from '@/components/ui/OrderForm';

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  const contactLinks = [
    {
      label: 'WhatsApp',
      value: STORE_CONFIG.contacts.whatsapp,
      href: STORE_CONFIG.contacts.whatsappUrl,
      color: 'bg-green-500 hover:bg-green-600',
      icon: <MessageCircle size={20} />,
    },
    {
      label: 'Telegram',
      value: STORE_CONFIG.contacts.telegram,
      href: STORE_CONFIG.contacts.telegramUrl,
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: <MessageCircle size={20} />,
    },
    {
      label: 'MAX',
      value: 'Написать в MAX',
      href: STORE_CONFIG.contacts.maxUrl,
      color: 'bg-zinc-800 hover:bg-black',
      icon: <ExternalLink size={20} />,
    },
    {
      label: 'Телефон',
      value: STORE_CONFIG.contacts.phone,
      href: STORE_CONFIG.contacts.phoneLink,
      color: 'bg-zinc-700 hover:bg-zinc-800',
      icon: <Phone size={20} />,
    },
  ];

  return (
    <section className="py-24 bg-white" aria-label="Контакты">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <FadeIn>
            <div className="text-xs font-medium tracking-[0.4em] text-zinc-400 uppercase mb-4">
              Связаться с нами
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 mb-8 leading-tight">
              КОНТАКТЫ
            </h2>

            <StaggerContainer className="space-y-3">
              {contactLinks.map((link) => (
                <StaggerItem key={link.label}>
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 text-white transition-colors ${link.color} group`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="opacity-80 group-hover:opacity-100">{link.icon}</div>
                    <div>
                      <div className="text-xs font-bold tracking-widest opacity-70 mb-0.5">{link.label}</div>
                      <div className="font-medium">{link.value}</div>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Email */}
            <div className="mt-6 flex items-center gap-3 text-zinc-600">
              <Mail size={18} className="flex-shrink-0" />
              <a href={`mailto:${STORE_CONFIG.contacts.email}`} className="hover:text-black transition-colors">
                {STORE_CONFIG.contacts.email}
              </a>
            </div>

            {/* Address */}
            <div className="mt-3 flex items-start gap-3 text-zinc-600">
              <MapPin size={18} className="flex-shrink-0 mt-0.5" />
              <address className="not-italic text-sm leading-relaxed">
                {STORE_CONFIG.address.city}<br />
                {STORE_CONFIG.address.region}<br />
                {STORE_CONFIG.address.street}
              </address>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={0.2}>
            <div className="bg-zinc-950 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
              <p className="text-zinc-400 text-sm mb-8">
                Заполните форму — мы свяжемся с вами в ближайшее время
              </p>
              <OrderForm onSuccess={() => setShowForm(false)} theme="dark" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
