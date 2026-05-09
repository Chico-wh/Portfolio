import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const SERVICES = [
  'API REST',
  'Back-end Node.js',
  'Back-end Python / Django',
  'Banco de dados & modelagem',
  'Integração de sistemas',
  'Automação & scripts',
  'Deploy & infraestrutura',
  'Full stack (front + back)',
  'Consultoria técnica',
  'Outro',
];

export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', whatsapp: '', service: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mnjwgevv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Algo deu errado. Tente novamente ou me chame no WhatsApp.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  const inp = "w-full bg-transparent border-b border-white/[0.1] focus:border-[#00D278] py-4 text-[0.95rem] text-white placeholder:text-white/20 outline-none transition-colors duration-300";

  return (
    <section id="contato" className="relative bg-[#070b0a] overflow-hidden">
      {/* BG texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="background.png" alt="" aria-hidden className="w-full h-full object-cover opacity-[0.05]"
          style={{ filter: 'saturate(0.3) blur(4px)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,210,120,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-28 items-start">

          {/* Left */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#00D278]" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/25">Contato</span>
            </div>
            <h2 className="font-black leading-[1.0] tracking-[-0.04em] text-white"
              style={{ fontSize: 'clamp(2rem,4vw,3.8rem)' }}
            >
              Vamos construir
              <br />algo{' '}
              <em className="not-italic" style={{ color: '#00D278' }}>bem feito</em>
              <br />juntos.
            </h2>
            <p className="mt-7 text-[0.95rem] leading-[1.8] text-white/35 max-w-[38ch]">
              Tem um projeto, uma ideia ou um sistema que precisa de atenção? Me conta. Respondo rápido e sem enrolação.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                'Resposta em até 24h',
                'Orçamento sem compromisso',
                'Direto com o dev, sem intermediário',
              ].map(t => (
                <li key={t} className="flex items-center gap-3 text-[0.875rem] text-white/35">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00D278' }} />
                  {t}
                </li>
              ))}
            </ul>

            {/* WhatsApp direto */}
            <a
              href="https://wa.me/5521975810063"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-[0.85rem] font-semibold transition-colors"
              style={{ color: 'rgba(0,210,120,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00D278'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,210,120,0.5)'}
            >
              Ou chame direto no WhatsApp <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.14}>
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center p-16 rounded-2xl border border-white/[0.07] bg-white/[0.02] min-h-[400px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'rgba(0,210,120,0.1)', border: '1px solid rgba(0,210,120,0.2)' }}>
                  <CheckCircle className="w-7 h-7" style={{ color: '#00D278' }} />
                </div>
                <h3 className="text-2xl font-bold text-white">Mensagem enviada.</h3>
                <p className="mt-2.5 text-[0.9rem] text-white/30">Te respondo em breve. Pode checar o WhatsApp também.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-0">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {[
                    { name: 'name',     label: 'Nome',     type: 'text',  ph: 'Seu nome',        required: true  },
                    { name: 'email',    label: 'E-mail',   type: 'email', ph: 'seu@email.com',   required: true  },
                    { name: 'whatsapp', label: 'WhatsApp', type: 'text',  ph: '(21) 99999-9999', required: false },
                  ].map(({ name, label, type, ph, required }) => (
                    <div key={name} className="mb-8">
                      <label className="block text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 mb-1">
                        {label} {required && <span style={{ color: '#00D278' }}>*</span>}
                      </label>
                      <input name={name} type={type} value={form[name]} onChange={set}
                        required={required} placeholder={ph} className={inp} />
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <label className="block text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 mb-1">
                    Tipo de projeto
                  </label>
                  <select name="service" value={form.service} onChange={set}
                    className={inp + ' appearance-none cursor-pointer'}
                    style={{ WebkitAppearance: 'none', background: 'transparent' }}
                  >
                    <option value="" style={{ background: '#0a100d' }}>Selecione</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#0a100d' }}>{s}</option>)}
                  </select>
                </div>

                <div className="mb-10">
                  <label className="block text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 mb-1">
                    Mensagem <span style={{ color: '#00D278' }}>*</span>
                  </label>
                  <textarea name="message" value={form.message} onChange={set} rows={3} required
                    placeholder="Descreva o projeto ou o problema que precisa resolver..."
                    className={inp + ' resize-none'} />
                </div>

                {error && (
                  <p className="mb-4 text-[0.8rem] text-red-400">{error}</p>
                )}

                <button type="submit" disabled={sending}
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[#070b0a] text-[0.95rem] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40"
                  style={{ background: '#00D278' }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.boxShadow = '0 0 40px rgba(0,210,120,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {sending
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                    : <>Enviar mensagem <ArrowRight className="w-4 h-4" /></>
                  }
                </button>

              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}