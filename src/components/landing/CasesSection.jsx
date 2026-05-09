import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, Github, Star, GitFork, Terminal } from 'lucide-react';

const LANG_COLOR = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python:     '#3776AB',
  CSS:        '#264de4',
  HTML:       '#E34C26',
  Shell:      '#89e051',
  default:    '#555',
};

// Map language to a back-end category label
function getCategory(lang, name, desc) {
  const s = `${name} ${desc || ''}`.toLowerCase();
  if (s.includes('api') || s.includes('rest') || s.includes('server')) return 'API';
  if (s.includes('auth') || s.includes('jwt') || s.includes('login')) return 'Auth';
  if (s.includes('db') || s.includes('database') || s.includes('sql') || s.includes('mongo')) return 'Database';
  if (s.includes('docker') || s.includes('deploy') || s.includes('ci')) return 'DevOps';
  if (s.includes('front') || s.includes('ui') || s.includes('react') || s.includes('next')) return 'Front-end';
  if (lang === 'TypeScript' || lang === 'JavaScript') return 'Node.js';
  if (lang === 'Python') return 'Python';
  if (lang === 'Java') return 'Java';
  return 'Back-end';
}

function SkeletonCard({ wide }) {
  return (
    <div
      style={{
        gridColumn: wide ? 'span 2' : 'span 1',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        aspectRatio: wide ? '16/7' : '4/3',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    />
  );
}

function CaseCard({ repo, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? '-8%' : '8%', index % 2 === 0 ? '8%' : '-8%']);

  const lang = repo.language || 'Other';
  const color = LANG_COLOR[lang] || LANG_COLOR.default;
  const cat = getCategory(lang, repo.name, repo.description);

  // Alternate layouts: first card wide, last card tall, rest normal
  const isWide = index === 0;
  const isTall = index === 5;

  return (
    <ScrollReveal
      delay={index * 0.07}
      style={{ gridColumn: isWide ? 'span 2' : 'span 1' }}
    >
      <motion.a
        ref={ref}
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 16,
          background: '#0a100d',
          cursor: 'pointer',
          textDecoration: 'none',
          aspectRatio: isTall ? '3/4' : isWide ? '16/7' : '4/3',
        }}
      >
        {/* Animated code grid bg */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', opacity: 0.06 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: 0, bottom: 0, width: 1,
              left: `${(i + 1) * 12}%`,
              background: '#00D278',
            }} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              top: `${(i + 1) * 16}%`,
              background: '#00D278',
            }} />
          ))}
        </div>

        {/* Language colored glow */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 70% 60% at 70% 60%, ${color}11 0%, transparent 70%)`,
        }} />

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(7,11,10,0.97) 0%, rgba(7,11,10,0.4) 50%, rgba(7,11,10,0.15) 100%)',
        }} />

        {/* Hover green tint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(0,210,120,0.1), transparent)',
          }}
        />

        {/* Top: category badge + arrow */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.09)',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          }}>
            {cat}
          </span>
        </div>

        <div style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.09)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowUpRight size={14} color="rgba(255,255,255,0.5)" />
        </div>

        {/* Bottom: info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '1.5rem' }}>
          {/* Language dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{lang}</span>
            {repo.stargazers_count > 0 && (
              <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Star size={10} /> {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <GitFork size={10} /> {repo.forks_count}
              </span>
            )}
          </div>

          <h3 style={{ fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 8, fontSize: 'clamp(1rem,1.5vw,1.25rem)', letterSpacing: '-0.02em' }}>
            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
          </h3>

          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.6, maxWidth: '40ch' }}>
            {repo.description || 'Repositório sem descrição — acesse para mais detalhes.'}
          </p>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.74rem', fontWeight: 600, color: 'rgba(0,210,120,0.5)' }}>
            <Terminal size={11} /> Ver repositório <ArrowUpRight size={11} />
          </div>
        </div>

        {/* Hover border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            borderRadius: 16,
            border: '1px solid rgba(0,210,120,0.25)',
            pointerEvents: 'none',
          }}
        />
      </motion.a>
    </ScrollReveal>
  );
}

export default function CasesSection() {
  const ref = useRef(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const headlineX = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);

  useEffect(() => {
    fetch('https://api.github.com/users/Chico-wh/repos?sort=updated&per_page=20')
      .then(r => r.json())
      .then(data => {
        const filtered = Array.isArray(data)
          ? data.filter(r => !r.fork).slice(0, 6)
          : [];
        setRepos(filtered);
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projetos" ref={ref} className="relative bg-[#070b0a] overflow-hidden">
      {/* Subtle top accent */}
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 1, background: 'linear-gradient(to right, transparent, rgba(0,210,120,0.3), transparent)' }} />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        {/* Header */}
        <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <span style={{ width: 20, height: 1, background: '#00D278' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              Portfólio
            </span>
          </div>
          <motion.h2
            style={{ x: headlineX, fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff' }}
          >
            Projetos que resolvem problemas,{' '}
            <br className="hidden lg:block" />
            <em style={{ fontStyle: 'normal', color: '#00D278' }}>não só preenchem o GitHub.</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {loading
            ? [true, false, false, false, false, true].map((wide, i) => <SkeletonCard key={i} wide={wide} />)
            : repos.length === 0
              ? (
                <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.2)' }}>
                  <Github size={32} style={{ margin: '0 auto 1rem' }} />
                  <p>Nenhum repositório público encontrado.</p>
                </div>
              )
              : repos.map((repo, i) => <CaseCard key={repo.id} repo={repo} index={i} />)
          }
        </div>

        {/* Footer CTA */}
        <ScrollReveal>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="https://github.com/Chico-wh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '0.85rem 2rem', borderRadius: 12,
                border: '1px solid rgba(0,210,120,0.2)',
                fontSize: '0.82rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(0,210,120,0.6)', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00D278'; e.currentTarget.style.borderColor = 'rgba(0,210,120,0.4)'; e.currentTarget.style.background = 'rgba(0,210,120,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,210,120,0.6)'; e.currentTarget.style.borderColor = 'rgba(0,210,120,0.2)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <Github size={15} /> Ver todos no GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
    </section>
  );
}