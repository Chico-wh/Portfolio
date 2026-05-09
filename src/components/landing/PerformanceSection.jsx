import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const METRICS = [
  { value: 12,  suffix: '+', prefix: '',  label: 'Repositórios públicos',   sublabel: 'projetos no GitHub'              },
  { value: 3,   suffix: '+', prefix: '',  label: 'Anos de experiência',      sublabel: 'desenvolvimento de software'     },
  { value: 100, suffix: '%', prefix: '',  label: 'Foco em back-end',         sublabel: 'APIs, banco de dados, servidores' },
  { value: 5,   suffix: '+', prefix: '',  label: 'Tecnologias dominadas',    sublabel: 'Node, Postgres, Docker e mais'   },
];

function Counter({ value, suffix, prefix, inView }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = value % 1 !== 0;
    const duration = 1400;
    const steps = 50;
    const inc = value / steps;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const v = Math.min(inc * i, value);
      setCurrent(isDecimal ? parseFloat(v.toFixed(1)) : Math.floor(v));
      if (i >= steps) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <span className="font-black text-white tracking-[-0.04em]" style={{ fontSize: 'clamp(2.8rem,5.5vw,5rem)', lineHeight: 1 }}>
      {prefix}{current}{suffix}
    </span>
  );
}

export default function PerformanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#070b0a]">
      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-15%] z-0">
        <img src="background.png" alt="" aria-hidden className="w-full h-full object-cover"
          style={{ opacity: 0.08, filter: 'saturate(0.3) brightness(0.7)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b0a] via-transparent to-[#070b0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a]/60 to-[#070b0a]/60" />
      </motion.div>

      {/* Green accent top */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #00D278, transparent)' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        {/* Layout: headline left, metrics right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* Left: headline */}
          <ScrollReveal className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#00D278]" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/25">Stack & Números</span>
            </div>
            <h2 className="font-black leading-[1.05] tracking-[-0.04em] text-white mb-6"
              style={{ fontSize: 'clamp(1.8rem,3.8vw,3.2rem)' }}
            >
              Tecnologia sem propósito vira complexidade.{' '}
              <em className="not-italic text-white/30">Simplicidade bem executada vira produto.</em>
            </h2>
            <p className="text-[0.88rem] leading-[1.8] text-white/30 max-w-[38ch]">
              Cada número reflete escolhas técnicas deliberadas — não quantidade, mas qualidade de entrega.
            </p>
          </ScrollReveal>

          {/* Right: 2x2 metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06]">
            {METRICS.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group bg-[#070b0a] hover:bg-[#0d1410] transition-colors duration-400 p-8 lg:p-10 flex flex-col gap-3 h-full relative overflow-hidden">
                  <Counter value={m.value} suffix={m.suffix} prefix={m.prefix} inView={inView} />
                  <p className="text-[0.8rem] font-semibold text-white/50 leading-snug">{m.label}</p>
                  <p className="text-[0.72rem] text-white/20">{m.sublabel}</p>
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00D278]/20 group-hover:bg-[#00D278]/60 transition-colors duration-300" />
                  {/* Bottom line on hover */}
                  <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: 'linear-gradient(to right, #00D278, transparent)' }} />
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}