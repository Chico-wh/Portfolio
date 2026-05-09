import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Github } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section ref={ref} className="relative has-grain overflow-hidden" style={{ background: '#00D278' }}>
      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-15%] z-0">
        <img src="background.png" alt="" aria-hidden className="w-full h-full object-cover"
          style={{ opacity: 0.06, filter: 'saturate(0) brightness(0.4)', mixBlendMode: 'multiply' }} />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #00D278 0%, #00a85e 50%, #008f52 100%)' }} />

      {/* Grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {[20, 40, 60, 80].map(p => (
          <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, width: 1, left: `${p}%`, background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>

      {/* Top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.15] z-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">
        <motion.div style={{ y: textY }} className="max-w-[860px]">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-px bg-white/50" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/50">Próximo passo</span>
            </div>

            <h2
              className="font-black leading-[0.95] tracking-[-0.04em] text-white uppercase"
              style={{ fontSize: 'clamp(2.6rem,7vw,7rem)' }}
            >
              Um problema real
              <br />merece uma solução
              <br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
                BEM FEITA.
              </span>
            </h2>

            <p className="mt-8 text-[1rem] leading-[1.7] text-white/60 max-w-[44ch]">
              Se você tem um projeto, uma ideia ou um sistema que precisa de atenção — vamos conversar. Back-end robusto, API bem desenhada ou stack completa: é só chamar.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5521975810063"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-[0.95rem] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: '#fff', color: '#00a85e' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                Chamar no WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Chico-wh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-[0.95rem] text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Github className="w-4 h-4" /> Ver GitHub
              </a>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}