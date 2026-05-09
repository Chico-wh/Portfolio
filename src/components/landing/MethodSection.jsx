import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const BG3 = 'background.png';

const STEPS = [
  { num: '01', title: 'Diagnóstico',          micro: 'Marca, mercado, público, objetivos. Análise antes da execução.' },
  { num: '02', title: 'Posicionamento',        micro: 'Onde a marca quer estar e como ela vai ocupar esse espaço.' },
  { num: '03', title: 'Direção criativa',      micro: 'Conceito, linguagem visual, tom de voz e sistema estético.' },
  { num: '04', title: 'Execução multicanal',   micro: 'Campanhas, peças, conteúdo e mídia integrados e coerentes.' },
  { num: '05', title: 'Otimização',            micro: 'Dados, ajustes de rota e melhoria contínua de resultados.' },
];

export default function MethodSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0,1], ['-12%','12%']);

  return (
    <section id="metodo" ref={ref} className="relative bg-[#070707] overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-12%] z-0 pointer-events-none">
        <img src={BG3} alt="" aria-hidden className="w-full h-full object-cover"
          style={{ opacity:0.07, filter:'saturate(0.4) brightness(0.7)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]" />
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        {/* Header */}
        <ScrollReveal className="mb-20 lg:mb-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-[#FF3B30]" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/25">Método</span>
          </div>
          <h2 className="font-black leading-[1.0] tracking-[-0.04em] text-white max-w-[600px]"
            style={{ fontSize:'clamp(2rem,4.5vw,4rem)' }}
          >
            Método antes da criação.{' '}
            <span className="text-white/25">Criação antes</span>
            {' '}da mídia.{' '}
            <em className="not-italic" style={{ color:'#FF3B30' }}>Mídia antes da escala.</em>
          </h2>
        </ScrollReveal>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-white/[0.06]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5">
            {STEPS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative flex flex-col">
                  {/* Node */}
                  <div className="relative flex items-center mb-8 lg:mb-10">
                    <div className="w-[42px] h-[42px] rounded-full border border-white/[0.1] bg-[#070707] flex items-center justify-center z-10 group-hover:border-[#FF3B30]/50 group-hover:bg-[#FF3B30]/10 transition-all duration-400">
                      <span className="text-[10px] font-black text-white/30 group-hover:text-[#FF3B30] transition-colors duration-300 tracking-[0.05em]">
                        {s.num}
                      </span>
                    </div>
                    {/* Mobile connector */}
                    {i < 4 && <div className="lg:hidden ml-4 flex-1 h-px bg-white/[0.06]" />}
                  </div>

                  <h3 className="text-[1.05rem] font-bold text-white/75 group-hover:text-white transition-colors duration-300 mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-[0.8rem] leading-[1.7] text-white/25">{s.micro}</p>

                  {/* Bottom accent */}
                  <div className="mt-5 h-px w-0 bg-[#FF3B30] group-hover:w-full transition-all duration-600" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}