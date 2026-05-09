import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

// Irregular bento grid: items with different span sizes
const SERVICES = [
  {
    id: 'estrategia',
    label: '01',
    title: 'Estratégia de marca',
    desc: 'Posicionamento, arquitetura e mensagem. A base antes da criação.',
    wide: true,
    // Brand strategy: people around a table planning/whiteboarding
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&fit=crop',
  },
  {
    id: 'campanhas',
    label: '02',
    title: 'Campanhas publicitárias',
    desc: 'Conceito, direção de arte e produção para alto impacto.',
    wide: false,
    // Advertising/art direction: bold visual production
    img: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80&fit=crop',
  },
  {
    id: 'midia',
    label: '03',
    title: 'Mídia paga',
    desc: 'Meta, Google, TikTok, LinkedIn — com segmentação cirúrgica.',
    wide: false,
    // Paid media / digital ads: analytics dashboard on laptop
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop',
  },
  {
    id: 'social',
    label: '04',
    title: 'Gestão de social media',
    desc: 'Conteúdo estratégico que constrói audiência e autoridade.',
    wide: false,
    // Social media: person creating content with phone
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&fit=crop',
  },
  {
    id: 'landing',
    label: '05',
    title: 'Landing pages',
    desc: 'Páginas rápidas e otimizadas para converter visitante em lead.',
    wide: false,
    // Landing page / web design: designer working on UI
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80&fit=crop',
  },
  {
    id: 'funis',
    label: '06',
    title: 'Funis & remarketing',
    desc: 'Jornada de compra completa do topo ao fechamento.',
    wide: false,
    // Funnel / conversion: ecommerce / checkout flow
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop',
  },
  {
    id: 'criativa',
    label: '07',
    title: 'Direção criativa',
    desc: 'Identidade visual, tom de voz e estética de marca consistente.',
    wide: true,
    // Creative direction: moodboard / visual identity flat lay
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&fit=crop',
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="servicos" className="relative bg-[#F7F3EA] overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-end mb-16 lg:mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-[#FF3B30]" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#070707]/30">Serviços</span>
            </div>
            <h2 className="font-black leading-[1.0] tracking-[-0.04em] text-[#070707]"
              style={{ fontSize: 'clamp(2rem,4.5vw,4rem)' }}
            >
              Da ideia à campanha.
              <br />
              <span style={{ color: '#FF3B30' }}>120px</span>{' '}
              <span className="text-[#8A8A8A]">ao resultado.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[0.95rem] leading-[1.8] text-[#070707]/45 max-w-[42ch] lg:ml-auto">
              Cada serviço faz parte de um sistema criativo integrado. Não entregamos peças avulsas — construímos comunicação com coerência e intenção.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento irregular grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.06} className={s.wide ? 'sm:col-span-2' : ''}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                animate={{
                  opacity: hovered === null ? 1 : hovered === i ? 1 : 0.45,
                  scale: hovered === i ? 1.01 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white border border-[#070707]/[0.07] hover:border-[#FF3B30]/25 transition-colors duration-400 cursor-default rounded-lg overflow-hidden"
              >
                {/* Photo */}
                <div className="relative w-full overflow-hidden"
                  style={{ height: s.wide ? '220px' : '160px' }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle gradient overlay so text below reads cleanly */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  {/* Label line */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#070707]/18 group-hover:text-[#FF3B30]/50 transition-colors duration-300">
                      {s.label}
                    </span>
                    <span className="w-4 h-4 rounded-full border border-[#070707]/10 group-hover:border-[#FF3B30]/30 group-hover:bg-[#FF3B30]/5 transition-all duration-400" />
                  </div>

                  <h3 className="font-bold text-[#070707]/85 group-hover:text-[#070707] transition-colors duration-300 leading-snug mb-3"
                    style={{ fontSize: s.wide ? 'clamp(1.2rem,1.8vw,1.5rem)' : '1.05rem' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.7] text-[#070707]/38">{s.desc}</p>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-600 rounded-full"
                  style={{ background: 'linear-gradient(to right,#FF3B30,#FF6A00)' }} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA inline */}
        <ScrollReveal delay={0.3} className="mt-10 flex justify-center">
          <a href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[0.9rem] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,59,48,0.35)] hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#FF3B30,#cc2a20)' }}
          >
            Falar sobre meu projeto <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}