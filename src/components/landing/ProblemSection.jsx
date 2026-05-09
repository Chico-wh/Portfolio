import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const ICON = {
  'Node.js':              `${ICON_BASE}/nodejs/nodejs-original.svg`,
  'NestJS':               `${ICON_BASE}/nestjs/nestjs-original.svg`,
  'Fastify':              `${ICON_BASE}/fastify/fastify-original.svg`,
  'Express':              `${ICON_BASE}/express/express-original.svg`,
  'GraphQL':              `${ICON_BASE}/graphql/graphql-plain.svg`,
  'RabbitMQ':             `${ICON_BASE}/rabbitmq/rabbitmq-original.svg`,
  'Kafka':                `${ICON_BASE}/apachekafka/apachekafka-original.svg`,
  'gRPC':                 `${ICON_BASE}/grpc/grpc-original.svg`,
  'Python':               `${ICON_BASE}/python/python-original.svg`,
  'Django':               `${ICON_BASE}/django/django-plain.svg`,
  'FastAPI':              `${ICON_BASE}/fastapi/fastapi-original.svg`,
  'Pandas':               `${ICON_BASE}/pandas/pandas-original.svg`,
  'NumPy':                `${ICON_BASE}/numpy/numpy-original.svg`,
  'SQLAlchemy':           `${ICON_BASE}/sqlalchemy/sqlalchemy-original.svg`,
  'Celery':               `${ICON_BASE}/python/python-original.svg`,
  'Pytest':               `${ICON_BASE}/pytest/pytest-original.svg`,
  'Pydantic':             `${ICON_BASE}/python/python-original.svg`,
  'Matplotlib':           `${ICON_BASE}/matplotlib/matplotlib-original.svg`,
  'TypeScript':           `${ICON_BASE}/typescript/typescript-original.svg`,
  'JavaScript':           `${ICON_BASE}/javascript/javascript-original.svg`,
  'Zod':                  `${ICON_BASE}/typescript/typescript-original.svg`,
  'ESLint':               `${ICON_BASE}/eslint/eslint-original.svg`,
  'Prettier':             `${ICON_BASE}/vscode/vscode-original.svg`,
  'PostgreSQL':           `${ICON_BASE}/postgresql/postgresql-original.svg`,
  'MySQL':                `${ICON_BASE}/mysql/mysql-original.svg`,
  'MongoDB':              `${ICON_BASE}/mongodb/mongodb-original.svg`,
  'Redis':                `${ICON_BASE}/redis/redis-original.svg`,
  'Prisma':               `${ICON_BASE}/prisma/prisma-original.svg`,
  'TypeORM':              `${ICON_BASE}/typescript/typescript-original.svg`,
  'Sequelize':            `${ICON_BASE}/sequelize/sequelize-original.svg`,
  'SQLite':               `${ICON_BASE}/sqlite/sqlite-original.svg`,
  'Elasticsearch':        `${ICON_BASE}/elasticsearch/elasticsearch-original.svg`,
  'Docker':               `${ICON_BASE}/docker/docker-original.svg`,
  'Docker Compose':       `${ICON_BASE}/docker/docker-original.svg`,
  'GitHub Actions':       `${ICON_BASE}/githubactions/githubactions-original.svg`,
  'Linux':                `${ICON_BASE}/linux/linux-original.svg`,
  'Nginx':                `${ICON_BASE}/nginx/nginx-original.svg`,
  'AWS':                  `${ICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  'Vercel':               `${ICON_BASE}/vercel/vercel-original.svg`,
  'Railway':              `${ICON_BASE}/railway/railway-original.svg`,
  'Git':                  `${ICON_BASE}/git/git-original.svg`,
  'GitHub':               `${ICON_BASE}/github/github-original.svg`,
  'Bash':                 `${ICON_BASE}/bash/bash-original.svg`,
  'React':                `${ICON_BASE}/react/react-original.svg`,
  'Next.js':              `${ICON_BASE}/nextjs/nextjs-original.svg`,
  'Tailwind CSS':         `${ICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  'Vite':                 `${ICON_BASE}/vite/vite-original.svg`,
  'HTML':                 `${ICON_BASE}/html5/html5-original.svg`,
  'CSS':                  `${ICON_BASE}/css3/css3-original.svg`,
  'Jest':                 `${ICON_BASE}/jest/jest-plain.svg`,
  'Vitest':               `${ICON_BASE}/vitest/vitest-original.svg`,
  'Swagger':              `${ICON_BASE}/swagger/swagger-original.svg`,
  'Postman':              `${ICON_BASE}/postman/postman-original.svg`,
  'VS Code':              `${ICON_BASE}/vscode/vscode-original.svg`,
};

const BLOCKS = [
  {
    num: '01',
    title: 'Back-end Node.js',
    body: 'Foco principal. Frameworks modernos, arquitetura limpa e APIs que aguentam pressão em produção.',
    tags: ['Node.js', 'NestJS', 'Fastify', 'Express', 'GraphQL', 'RabbitMQ', 'Kafka', 'gRPC'],
  },
  {
    num: '02',
    title: 'Python & Ecossistema',
    body: 'Da API ao dado. Django, REST Framework e Pandas no mesmo arsenal — back-end e análise sem separação.',
    tags: ['Python', 'Django', 'FastAPI', 'Pandas', 'NumPy', 'SQLAlchemy', 'Celery', 'Pytest', 'Pydantic', 'Matplotlib'],
  },
  {
    num: '03',
    title: 'TypeScript, JS & outras linguagens',
    body: 'Tipagem forte do início ao fim. Mais confiança no refactor, menos surpresa em runtime.',
    tags: ['TypeScript', 'JavaScript', 'Zod', 'ESLint', 'Prettier'],
  },
  {
    num: '04',
    title: 'Banco de dados',
    body: 'Relacional, NoSQL, cache e busca. O dado tem que estar seguro, indexado e rápido.',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM', 'Sequelize', 'SQLite', 'Elasticsearch'],
  },
  {
    num: '05',
    title: 'Infra & DevOps',
    body: 'Do repositório ao servidor em produção. Containers, pipelines e ambiente replicável.',
    tags: ['Docker', 'Docker Compose', 'GitHub Actions', 'Linux', 'Nginx', 'AWS', 'Vercel', 'Railway', 'Bash', 'Git'],
  },
  {
    num: '06',
    title: 'Front-end & Ferramentas',
    body: 'Interface funcional e stack completa: testes, documentação e entrega com qualidade.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML', 'CSS', 'Jest', 'Vitest', 'Swagger', 'Postman', 'VS Code'],
  },
];

function Tag({ label }) {
  const icon = ICON[label];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -1, backgroundColor: 'rgba(0,210,120,0.13)', borderColor: 'rgba(0,210,120,0.3)', color: '#00D278' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.03em',
        background: 'rgba(0,210,120,0.06)',
        border: '1px solid rgba(0,210,120,0.13)',
        color: 'rgba(0,210,120,0.6)',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'all 0.2s',
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden
          width={12}
          height={12}
          style={{ objectFit: 'contain', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: 0.5 }}
        />
      )}
      {label}
    </motion.span>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section id = "stack" ref={ref} className="relative bg-[#0a100d] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,210,120,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">

        {/* Label */}
        <ScrollReveal className="mb-4">
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-[#00D278]" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/25">Stack técnica</span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <div className="overflow-hidden mb-20 lg:mb-28">
          <motion.h2
            style={{
              x: titleX,
              fontSize: 'clamp(2rem,5vw,4.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#fff',
            }}
          >
            Tecnologias que uso
            <br className="hidden lg:block" /> de verdade,{' '}
            <em className="not-italic" style={{ color: '#00D278' }}>não só no currículo.</em>
          </motion.h2>
        </div>

        {/* 6 blocks: 3 cols × 2 rows com bordas tipo tabela */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {BLOCKS.map(({ num, title, body, tags }, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(0,210,120,0.025)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-10 lg:p-12 cursor-default"
                style={{
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Number watermark */}
                <span
                  className="block font-black select-none mb-5"
                  style={{ fontSize: '4rem', color: 'rgba(0,210,120,0.05)', lineHeight: 0.9 }}
                >
                  {num}
                </span>

                <h3
                  className="font-bold text-white/85 group-hover:text-white transition-colors duration-300 leading-snug mb-3"
                  style={{ fontSize: 'clamp(0.95rem,1.3vw,1.15rem)' }}
                >
                  {title}
                </h3>

                <p className="text-[0.8rem] leading-[1.75] mb-6" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {body}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tags.map(tag => <Tag key={tag} label={tag} />)}
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-10 right-10 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(0,210,120,0.4), transparent)' }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}