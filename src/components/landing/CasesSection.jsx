import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, Github, Globe, Clock } from 'lucide-react';

const G = '#00D278';

// Para adicionar/editar projetos, mexa só neste array.
// media: { type: 'video' | 'image', src, poster } — sem media mostra um placeholder.
const PROJECTS = [
  {
    name: 'Vocaliza',
    kind: 'SaaS · IA para WhatsApp',
    url: 'https://www.vocalizai.com.br',
    urlLabel: 'vocalizai.com.br',
    media: { type: 'image', src: '/projects/vocaliza.png' },
    description:
      'Plataforma que atende e vende no WhatsApp em tempo real. Um chatbot de IA com voz humanizada responde cada lead em segundos, por texto ou áudio, tira dúvidas a partir da base de conhecimento do cliente (catálogo, FAQs) e agenda reuniões sozinho no Google Agenda.',
    highlights: [
      'Dashboard com funil de leads, taxa de conversão e reuniões agendadas',
      'Reengajamento automático e escolha de vozes para as respostas em áudio',
      'Base de conhecimento por cliente, ativação em minutos',
    ],
    stack: ['IA generativa', 'WhatsApp API', 'Google Agenda', 'Síntese de voz'],
  },
  {
    name: 'TTonTour',
    kind: 'Operadora de turismo',
    url: null, // ← coloque o link quando estiver no ar
    media: { type: 'video', src: '/projects/ttontour.mp4', poster: '/projects/ttontour.jpg' },
    description:
      'Site para uma operadora de turismo com tours e transfers em destinos como Cancún, Punta Cana, Cartagena e Rio de Janeiro. O cliente filtra por cidade e tipo de serviço, escolhe passageiros e data e monta o carrinho com o total calculado na hora.',
    highlights: [
      'Site bilíngue (PT/ES) com troca de idioma no topo',
      'Catálogo filtrável por cidade, tours e transfers',
      'Página de reserva com adultos/crianças e preço em tempo real',
    ],
    stack: ['React', 'Multi-idioma', 'Carrinho de reservas'],
  },
  {
    name: 'Personal Odonto',
    kind: 'Site institucional · Clínica',
    url: 'https://personal-odonto-one.vercel.app/',
    urlLabel: 'personal-odonto-one.vercel.app',
    media: null, // ← adicione { type: 'image', src: '/projects/odonto.png' } quando tiver print
    description:
      'Site que desenvolvi para uma clínica odontológica: apresenta a clínica e os tratamentos e leva o paciente direto para o contato e o agendamento, com layout leve e responsivo.',
    highlights: ['Publicado na Vercel', 'Responsivo, pensado para quem chega pelo celular'],
    stack: ['React', 'Vercel'],
  },
  {
    name: 'MarketFront',
    kind: 'Frontend · Agência de marketing',
    url: null,
    status: 'Em desenvolvimento',
    media: { type: 'video', src: '/projects/marketfront.mp4', poster: '/projects/marketfront.jpg' },
    description:
      'Frontend para uma agência de marketing em estágio inicial. Landing editorial com manifesto ("Percepção vende."), serviços, método, cases e diagnóstico, alternando seções claras e escuras com tipografia grande.',
    highlights: ['Seções de cases com cards por tipo de campanha', 'Direção visual própria, sem template'],
    stack: ['React', 'Tailwind', 'Framer Motion'],
  },
];

function Media({ media, name }) {
  const ref = useRef(null);

  // Só toca o vídeo quando está na tela
  useEffect(() => {
    const el = ref.current;
    if (!el || media?.type !== 'video') return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [media]);

  const frame = {
    borderRadius: 14, overflow: 'hidden', background: '#0a100d',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 30px 80px -30px rgba(0,210,120,0.18)',
  };

  return (
    <div style={frame}>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />)}
      </div>
      {media?.type === 'video' ? (
        <video ref={ref} src={media.src} poster={media.poster} muted loop playsInline preload="metadata"
          aria-label={`Demonstração do projeto ${name}`} style={{ display: 'block', width: '100%', height: 'auto' }} />
      ) : media?.type === 'image' ? (
        <img src={media.src} alt={`Captura do projeto ${name}`} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
      ) : (
        <div style={{ aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'rgba(255,255,255,0.25)' }}>
          <Globe size={28} />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      )}
    </div>
  );
}

function Project({ p, index }) {
  const flip = index % 2 === 1;
  const link = {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.7rem 1.3rem', borderRadius: 10,
    background: G, color: '#04130b', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
  };
  return (
    <ScrollReveal>
      <article className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}><Media media={p.media} name={p.name} /></div>
        <div className="lg:col-span-5">
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>{p.kind}</p>
          <h3 style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.05, marginBottom: 16 }}>{p.name}</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '58ch' }}>{p.description}</p>
          <ul style={{ margin: '18px 0', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
            {p.highlights.map(h => (
              <li key={h} style={{ display: 'flex', gap: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, marginTop: 8, flex: 'none' }} />{h}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
            {p.stack.map(s => (
              <span key={s} style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
            ))}
          </div>
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={link}>
              Visitar {p.urlLabel} <ArrowUpRight size={15} />
            </a>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              <Clock size={14} /> {p.status || 'Link em breve'}
            </span>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function CasesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const headlineX = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);

  return (
    <section id="projetos" ref={ref} className="relative bg-[#070b0a] overflow-hidden">
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 1, background: 'linear-gradient(to right, transparent, rgba(0,210,120,0.3), transparent)' }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">
        <div style={{ overflow: 'hidden', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <span style={{ width: 20, height: 1, background: G }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Portfólio</span>
          </div>
          <motion.h2 style={{ x: headlineX, fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff' }}>
            Projetos que resolvem problemas,{' '}
            <br className="hidden lg:block" />
            <em style={{ fontStyle: 'normal', color: G }}>não só preenchem o GitHub.</em>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gap: 'clamp(4rem,9vw,8rem)' }}>
          {PROJECTS.map((p, i) => <Project key={p.name} p={p} index={i} />)}
        </div>

        <ScrollReveal>
          <div style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center' }}>
            <a href="https://github.com/Chico-wh?tab=repositories" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 2rem', borderRadius: 12, border: '1px solid rgba(0,210,120,0.25)', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(0,210,120,0.75)', textDecoration: 'none' }}>
              <Github size={15} /> Ver mais no GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
