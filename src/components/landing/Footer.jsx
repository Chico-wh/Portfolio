import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const QUICK = [
  { label: 'Início',      href: '#hero'     },
  { label: 'Filosofia',   href: '#filosofia' },
  { label: 'Stack',       href: '#stack'    },
  { label: 'Projetos',    href: '#projetos' },
  { label: 'Contato',     href: '#contato'  },
];

const SOCIAL = [
  { label: 'GitHub',    href: 'https://github.com/Chico-wh' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/luis-felipe-santos-barbosa-1029b1408/' },
  { label: 'Instagram', href: 'https://www.instagram.com/eu_chico.21/' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070b0a] border-t border-white/[0.04]">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,210,120,0.2), transparent)' }} />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div>
            <a href="#hero" className="block select-none mb-4">
              <p className="font-black text-white tracking-[-0.04em]" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
                Luis Felipe
              </p>
              <p className="font-black tracking-[-0.03em]" style={{ fontSize: '1.6rem', lineHeight: 1, color: '#00D278' }}>
                Santos Barbosa
              </p>
            </a>

            <p className="text-[0.85rem] text-white/25 leading-relaxed max-w-[28ch]">
              Desenvolvedor full stack com foco em back-end. APIs, sistemas e código que dura.
            </p>

            <a
              href="https://wa.me/5521975810063"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold transition-colors"
              style={{ color: 'rgba(0,210,120,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00D278'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,210,120,0.5)'}
            >
              Iniciar projeto <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/15 mb-5">Navegação</p>
            <ul className="space-y-3">
              {QUICK.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.85rem] text-white/30 hover:text-white transition-colors duration-250"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/15 mb-5">Redes sociais</p>
            <ul className="space-y-3">
              {SOCIAL.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.85rem] text-white/30 hover:text-white transition-colors duration-250"
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] text-white/15">
            © {new Date().getFullYear()} Luis Felipe Santos Barbosa. Todos os direitos reservados.
          </p>
          <p className="text-[9px] italic" style={{ color: 'rgba(0,210,120,0.12)' }}>
            Desenvolvido com React · Framer Motion · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}