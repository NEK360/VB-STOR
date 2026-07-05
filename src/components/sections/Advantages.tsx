import { Shield, Truck, RefreshCw, Star } from 'lucide-react';
import { advantages } from '@/data/advantages';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { STORE_CONFIG } from '@/config/config';

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={28} strokeWidth={1.5} />,
  truck: <Truck size={28} strokeWidth={1.5} />,
  refresh: <RefreshCw size={28} strokeWidth={1.5} />,
  star: <Star size={28} strokeWidth={1.5} />,
};

export default function Advantages() {
  return (
    <section className="py-24 bg-zinc-950 text-white" aria-label="Наши преимущества">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-16 text-center">
          <div className="text-xs font-medium tracking-[0.4em] text-zinc-500 uppercase mb-4">
            Почему выбирают нас
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            НАШИ ПРЕИМУЩЕСТВА
          </h2>
        </FadeIn>

        {/* Advantages grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv) => (
            <StaggerItem key={adv.id}>
              <div className="group p-8 border border-zinc-800 hover:border-zinc-500 transition-colors duration-500">
                <div className="text-zinc-400 group-hover:text-white transition-colors duration-300 mb-6">
                  {iconMap[adv.icon]}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{adv.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{adv.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Delivery info */}
        <FadeIn delay={0.3} className="mt-16 p-8 border border-zinc-800 bg-zinc-900">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-2">Наш магазин</h3>
              <address className="not-italic text-zinc-400 text-sm">
                {STORE_CONFIG.address.full}
              </address>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-2">Способы доставки</h3>
              <div className="flex flex-wrap gap-2">
                {STORE_CONFIG.delivery.methods.map((m) => (
                  <span key={m} className="text-sm text-zinc-400 border border-zinc-700 px-3 py-1">
                    {m}
                  </span>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mt-2">{STORE_CONFIG.delivery.freePickup}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
