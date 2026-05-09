import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { X, Check } from 'lucide-react';

const LEFT = [
  'Posts soltos sem fio condutor',
  'Campanhas sem conceito',
  'Anúncios sem funil de conversão',
  'Site institucional parado',
  'Design sem consistência',
  'Métricas sem interpretação',
];

const RIGHT = [
  'Narrativa de marca construída',
  'Campanhas integradas e com conceito',
  'Mídia com segmentação e jornada',
  'Landing pages que convertem',
  'Identidade visual consistente',
  'Dados que guiam decisões',
];

export default function ComparisonSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] });
  const leftX  = useTransform(scrollYProgress, [0,1], ['-3%','3%']);
  const rightX = useTransform(scrollYProgress, [0,1], ['3%','-3%']);

  return (
    <section ref={ref} className="relative bg-[#F7F3EA] overflow-hidden">
      {/* Vertical center rule */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#070707]/6 hidden lg:block" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-5 h-px bg-[#FF3B30]" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#070707]/30">Perspectiva</span>
            <span className="w-5 h-px bg-[#FF3B30]" />
          </div>
          <h2 className="font-black leading-[1.0] tracking-[-0.04em] text-[#070707]"
            style={{ fontSize:'clamp(1.8rem,4vw,3.5rem)' }}
          >
            O mesmo investimento pode{' '}
            <em className="not-italic text-[#FF3B30]">gerar resultados bem diferentes.</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">

          {/* Left – Common */}
          <motion.div style={{ x: leftX }}>
            <ScrollReveal>
              <div className="p-8 lg:p-10 rounded-xl border border-[#070707]/8 bg-white/50">
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#8A8A8A] mb-6">
                  Comunicação comum
                </p>
                <ul className="space-y-4">
                  {LEFT.map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-[0.9rem] text-[#070707]/40">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-[#070707]/15 flex items-center justify-center">
                        <X className="w-2.5 h-2.5 text-[#8A8A8A]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Right – Directed */}
          <motion.div style={{ x: rightX }}>
            <ScrollReveal delay={0.1}>
              <div className="p-8 lg:p-10 rounded-xl border border-[#FF3B30]/20 bg-[#070707] relative overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background:'radial-gradient(circle, rgba(255,59,48,0.1) 0%, transparent 70%)' }} />

                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#FF3B30]/60 mb-6 relative z-10">
                  Comunicação com direção
                </p>
                <ul className="space-y-4 relative z-10">
                  {RIGHT.map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-[0.9rem] text-white/75">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/30 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#FF3B30]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}