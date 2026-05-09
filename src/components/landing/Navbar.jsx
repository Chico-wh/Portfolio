import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

const NAV = [
  { label: 'Início',    href: '#hero'     },
  { label: 'Filosofia', href: '#filosofia' },
  { label: 'Stack',     href: '#stack'    },
  { label: 'Projetos',  href: '#projetos' },
  { label: 'Contato',   href: '#contato'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#070b0a]/95 backdrop-blur-2xl border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo — nome em texto */}
            <a href="#hero" className="select-none group flex items-center gap-1.5">
              <span
                className="font-black tracking-[-0.04em] text-white transition-colors duration-300"
                style={{ fontSize: '1.1rem', lineHeight: 1 }}
              >
                Luis Felipe
              </span>
              <span
                className="font-black tracking-[-0.04em] transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: '1.1rem', lineHeight: 1, color: '#00D278' }}
              >
                .dev
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0">
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  className="relative px-4 py-2 text-[12.5px] font-medium text-white/40 hover:text-white/90 transition-colors duration-250 tracking-[0.01em] group"
                >
                  {label}
                  <span className="absolute bottom-1.5 left-4 right-4 h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                    style={{ background: '#00D278' }} />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* CTA desktop */}
              <a href="#contato"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold text-white border border-white/[0.15] transition-all duration-300 tracking-[0.01em]"
                style={{ transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00D278'; e.currentTarget.style.color = '#00D278'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
              >
                Contato
                <ArrowUpRight className="w-3 h-3" />
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(v => !v)}
                className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
                aria-label="menu"
              >
                <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-[16px]'}`} />
                <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: '#070b0a' }}
          >
            {/* Mobile header */}
            <div className="h-16 border-b border-white/[0.05] flex items-center px-5 justify-between">
              <span className="font-black tracking-[-0.04em]" style={{ fontSize: '1.1rem' }}>
                Luis Felipe<span style={{ color: '#00D278' }}>.dev</span>
              </span>
              <button onClick={() => setOpen(false)} className="p-1 text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col px-5 pt-8 flex-1">
              {NAV.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-6 border-b border-white/[0.05] font-black text-white/75 hover:text-white tracking-[-0.03em] transition-colors group"
                  style={{ fontSize: '2.2rem' }}
                >
                  {label}
                  <ArrowUpRight className="w-6 h-6 text-white/15 transition-colors group-hover:text-[#00D278]" />
                </motion.a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="p-5 pb-10">
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-[#070b0a] text-base"
                style={{ background: '#00D278' }}
              >
                Entrar em contato <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}