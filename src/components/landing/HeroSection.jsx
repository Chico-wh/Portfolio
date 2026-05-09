import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Terminal, Server, Database } from 'lucide-react';

const FLOATING_TAGS = [
  { text: 'NODE.JS',    top: '22%', left: '68%',  delay: 0    },
  { text: 'REST API',   top: '55%', left: '72%',  delay: 0.15 },
  { text: 'POSTGRESQL', top: '35%', left: '80%',  delay: 0.3  },
  { text: 'DOCKER',     top: '70%', left: '62%',  delay: 0.1  },
  { text: 'TYPESCRIPT', top: '15%', left: '58%',  delay: 0.22 },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
  item: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  },
};

function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    .then(r => r.json())
    .then(data => {
      const hiddenRepos = ["Portfolio", "my-Portfolio","Chico-wh","chico-wh"];

      const filtered = Array.isArray(data)
        ? data
            .filter(repo => !repo.fork)
            .filter(repo => !hiddenRepos.includes(repo.name))
            .slice(0, 4)
        : [];

      setRepos(filtered);
    })
    .catch(() => setRepos([]))
    .finally(() => setLoading(false));
}, [username]);

return { repos, loading };
}

const LANG_COLOR = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python:     '#3776AB',
  Java:       '#ED8B00',
  Go:         '#00ADD8',
  Rust:       '#CE422B',
  CSS:        '#264de4',
  HTML:       '#E34C26',
  default:    '#8b8b8b',
};

function RepoCard({ repo, delay }) {
  const lang = repo.language || 'Other';
  const color = LANG_COLOR[lang] || LANG_COLOR.default;
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'block',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,210,120,0.35)';
        e.currentTarget.style.background = 'rgba(0,210,120,0.04)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Terminal size={13} color="rgba(0,210,120,0.8)" />
        {repo.name}
      </p>
      <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, minHeight: 32 }}>
        {repo.description || 'Sem descrição'}
      </p>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>{lang}</span>
        {repo.stargazers_count > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)' }}>⭐ {repo.stargazers_count}</span>
        )}
      </div>
    </motion.a>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { repos, loading } = useGitHubRepos('Chico-wh');

  return (
    <section
      ref={ref}
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#070b0a' }}
    >
      {/* BG video with parallax */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          src="/videos/drone.mp4"
          aria-hidden="true"
          autoPlay muted loop playsInline preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, filter: 'saturate(0.4) brightness(0.7)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,210,120,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,11,10,0.7) 0%, transparent 50%, #070b0a 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,11,10,0.85) 0%, rgba(7,11,10,0.3) 50%, transparent 100%)' }} />
      </motion.div>

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden>
        {[20, 40, 60, 80].map(p => (
          <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, width: 1, left: `${p}%`, background: 'rgba(0,210,120,0.025)' }} />
        ))}
        {[25, 50, 75].map(p => (
          <div key={p} style={{ position: 'absolute', left: 0, right: 0, height: 1, top: `${p}%`, background: 'rgba(0,210,120,0.018)' }} />
        ))}
      </div>

      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', top: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(0,210,120,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', bottom: '5%', left: '-5%', background: 'radial-gradient(circle, rgba(0,160,100,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* Floating tags */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {FLOATING_TAGS.map(({ text, top, left, delay }) => (
          <motion.span
            key={text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1.5, duration: 1 }}
            style={{ position: 'absolute', top, left, fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,210,120,0.12)' }}
          >
            {text}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity, position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 1440, margin: '0 auto', padding: '7rem 3rem 4rem', width: '100%' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'center' }}>

          {/* Left: headline */}
          <motion.div variants={stagger.container} initial="initial" animate="animate">

            <motion.div variants={stagger.item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem' }}>
              <span style={{ width: 32, height: 1, background: '#00D278' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                Full Stack · Foco em Back-end
              </span>
            </motion.div>

            <motion.h1
              variants={stagger.item}
              style={{ fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', textTransform: 'uppercase', fontSize: 'clamp(3rem,8.5vw,8rem)', marginBottom: '2rem' }}
            >
              <span style={{ display: 'block' }}>Luis</span>
              <span style={{ display: 'block' }}>Felipe</span>
              <span style={{ display: 'block' }}>Santos</span>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.25)' }}>Barbosa.</span>
            </motion.h1>

            <motion.p
              variants={stagger.item}
              style={{ maxWidth: '44ch', lineHeight: 1.7, color: 'rgba(255,255,255,0.38)', fontWeight: 300, fontSize: 'clamp(0.9rem,1.3vw,1.05rem)', marginBottom: '2.5rem' }}
            >
              Desenvolvedor full stack com foco em back-end — APIs robustas, arquitetura limpa e sistemas que escalam.
            </motion.p>

            <motion.div variants={stagger.item} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: '3rem' }}>
              <a
                href="https://github.com/Chico-wh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 1.5rem',
                  borderRadius: 12, fontWeight: 700, color: '#070b0a', fontSize: '0.88rem', letterSpacing: '0.01em',
                  background: '#00D278', textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#00f08a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#00D278'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Github size={16} /> Ver GitHub <ArrowRight size={15} />
              </a>
              <a
                href="#projetos"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 1.5rem',
                  borderRadius: 12, fontWeight: 600, fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                Ver projetos
              </a>
            </motion.div>

            <motion.div
              variants={stagger.item}
              style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', maxWidth: 460 }}
            >
              {[
                { icon: <Server size={14} color="#00D278" />, n: 'Back-end', l: 'foco principal' },
                { icon: <Database size={14} color="#00D278" />, n: 'APIs REST', l: 'design & build' },
                { icon: <Terminal size={14} color="#00D278" />, n: 'Full Stack', l: 'end to end' },
              ].map(({ icon, n, l }) => (
                <div key={n}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>{icon}<p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{n}</p></div>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: GitHub repos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <Github size={13} color="rgba(0,210,120,0.6)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
                Repositórios recentes
              </span>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ height: 90, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
                ))}
              </div>
            ) : repos.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>Nenhum repositório público encontrado.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {repos.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} delay={i * 0.1 + 1} />
                ))}
              </div>
            )}

            <motion.a
              href="https://github.com/Chico-wh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: '0.75rem', padding: '0.65rem', borderRadius: 10,
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(0,210,120,0.6)', textDecoration: 'none',
                border: '1px solid rgba(0,210,120,0.12)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00D278'; e.currentTarget.style.borderColor = 'rgba(0,210,120,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,210,120,0.6)'; e.currentTarget.style.borderColor = 'rgba(0,210,120,0.12)'; }}
            >
              Ver todos os repositórios <ArrowRight size={12} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 0', background: 'rgba(7,11,10,0.6)', backdropFilter: 'blur(8px)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 0, userSelect: 'none', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {Array(6).fill(['NODE.JS', 'POSTGRESQL', 'REST APIs', 'TYPESCRIPT', 'DOCKER', 'PRISMA', 'FASTIFY', 'MONGODB']).flat().map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', flexShrink: 0 }}>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>{item}</span>
              <span style={{ color: 'rgba(0,210,120,0.3)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
    </section>
  );
}