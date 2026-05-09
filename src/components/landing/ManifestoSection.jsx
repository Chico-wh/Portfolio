import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function ManifestoSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section id="filosofia" ref={ref} className="relative bg-[#070b0a] overflow-hidden">
      {/* Diagonal rule */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-[#00D278]/8" />

      {/* Subtle grid line */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[25, 50, 75].map(p => (
          <div key={p} style={{ position: 'absolute', left: 0, right: 0, height: 1, top: `${p}%`, background: 'rgba(0,210,120,0.03)' }} />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-24 items-center">

          {/* Left */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#00D278]" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/30">Filosofia</span>
            </div>
            <h2
              className="font-black leading-[1.0] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(1.8rem,3.8vw,3.4rem)' }}
            >
              Bom código não é só o que funciona.{' '}
              <em className="not-italic text-white/30">
                É o que escala, se mantém e resolve o problema certo.
              </em>
            </h2>
          </ScrollReveal>

          {/* Right */}
          <div className="flex flex-col gap-10">
            <ScrollReveal delay={0.12}>
              <p className="text-[1rem] leading-[1.8] text-white/40 max-w-[46ch]">
                Em um mercado cheio de soluções frágeis e arquiteturas apressadas, a diferença está em construir sistemas com clareza, consistência e foco no que realmente importa: entregar valor de forma sustentável.
              </p>
            </ScrollReveal>

            {/* Big word parallax */}
            <div className="overflow-hidden">
              <motion.div style={{ y: wordY }}>
                <ScrollReveal delay={0.2} y={20}>
                  <p
                    className="font-black leading-none tracking-[-0.04em] select-none"
                    style={{ fontSize: 'clamp(3.5rem,9vw,8.5rem)', color: '#00D278' }}
                  >
                    CÓDIGO
                    <br />
                    IMPORTA.
                  </p>
                </ScrollReveal>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}