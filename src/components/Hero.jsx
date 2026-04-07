import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function useTypedText(texts, resetKey, speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('typing');

  // Reset when language changes
  useEffect(() => {
    setDisplayed('');
    setIndex(0);
    setPhase('typing');
  }, [resetKey]);

  useEffect(() => {
    const current = texts[index] ?? '';
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          speed
        );
      } else {
        timeout = setTimeout(() => setPhase('erasing'), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          speed / 2
        );
      } else {
        setIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, index, texts, speed, pause]);

  return displayed;
}

function StatPill({ v, l, startDelay }) {
  const num    = parseInt(v);           // e.g. 3, 10, 15
  const suffix = v.replace(/\d/g, ''); // e.g. '+', '%'
  const [count, setCount] = useState(0);

  useEffect(() => {
    const wait = setTimeout(() => {
      const duration = 1400;
      let startTs = null;
      const tick = (ts) => {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setCount(Math.floor(ease * num));
        if (p < 1) requestAnimationFrame(tick);
        else setCount(num);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(wait);
  }, [num, startDelay]);

  return (
    <div className="stat-pill">
      <span className="stat-num">{count}{suffix}</span>
      <span className="stat-label">{l}</span>
    </div>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const typed = useTypedText(t.hero.roles, lang);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">

      {/* ── Ambient gradient blobs ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[140px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/7 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-[320px] h-[320px] bg-purple-500/5 rounded-full blur-[100px] animate-float-alt animation-delay-3000" />
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-fuchsia-600/4 rounded-full blur-[120px] animate-float animation-delay-1000" />
      </div>

      {/* ── Subtle dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

        {/* Left: main content */}
        <div className="flex-1 min-w-0">
          {/* Available badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 animate-fade-in animation-delay-200"
            style={{
              opacity: 0,
              background: 'rgba(16,185,129,0.08)',
              borderColor: 'rgba(16,185,129,0.22)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-400 text-xs font-semibold tracking-wide">{t.hero.available}</span>
          </div>

          <p
            className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in animation-delay-200"
            style={{ opacity: 0 }}
          >
            📍 {t.hero.location}
          </p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-tight animate-fade-in-up animation-delay-200"
            style={{ opacity: 0 }}
          >
            Miguel Angel
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%)',
              }}
            >
              Osorio Hernandez
            </span>
          </h1>

          {/* Typing role */}
          <div
            className="flex items-center gap-1 text-xl md:text-2xl text-slate-300 font-light mb-6 h-9 animate-fade-in animation-delay-400"
            style={{ opacity: 0 }}
          >
            <span>{typed}</span>
            <span className="w-[2px] h-6 bg-violet-400 rounded-full animate-pulse" />
          </div>

          <p
            className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-10 animate-fade-in animation-delay-600"
            style={{ opacity: 0 }}
          >
            {t.hero.description}
          </p>

          {/* Tech pills */}
          <div
            className="flex flex-wrap gap-2 mb-12 animate-fade-in animation-delay-600"
            style={{ opacity: 0 }}
          >
            {['React', 'Flutter', 'FastAPI', 'PHP', 'PostgreSQL', 'Firebase', 'AWS', 'Docker'].map(
              (tech) => (
                <span
                  key={tech}
                  className="relative px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:border-violet-500/50 hover:text-violet-200 hover:bg-violet-500/10 transition-all duration-200 cursor-default overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                  {tech}
                </span>
              )
            )}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in animation-delay-800"
            style={{ opacity: 0 }}
          >
            <a
              href="#projects"
              className="relative group flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {t.hero.cta_projects}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              {t.hero.cta_contact}
            </a>
          </div>
        </div>

        {/* Right: floating terminal card — desktop only */}
        <div
          className="hidden lg:flex flex-col flex-shrink-0 items-center w-[300px] gap-6 animate-fade-in animation-delay-800"
          style={{ opacity: 0 }}
        >
          <div className="terminal-card w-full rounded-2xl overflow-hidden">
            {/* Title bar */}
            <div
              className="flex items-center gap-1.5 px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-slate-600 text-[11px] font-mono">developer.js</span>
            </div>
            {/* Code */}
            <div className="p-5 font-mono text-[12px] leading-7 space-y-0.5">
              <div><span className="text-violet-400">const</span> <span className="text-sky-300">developer</span> <span className="text-slate-500">=</span> <span className="text-slate-400">{'{'}</span></div>
              <div className="pl-5"><span className="text-red-400">name</span><span className="text-slate-500">:</span> <span className="text-emerald-400">"Miguel"</span><span className="text-slate-600">,</span></div>
              <div className="pl-5"><span className="text-red-400">role</span><span className="text-slate-500">:</span> <span className="text-emerald-400">"Fullstack Dev"</span><span className="text-slate-600">,</span></div>
              <div className="pl-5">
                <span className="text-red-400">stack</span><span className="text-slate-500">: [</span>
              </div>
              <div className="pl-10"><span className="text-yellow-300">"React"</span><span className="text-slate-600">,</span></div>
              <div className="pl-10"><span className="text-yellow-300">"Flutter"</span><span className="text-slate-600">,</span></div>
              <div className="pl-10"><span className="text-yellow-300">"FastAPI"</span><span className="text-slate-600">,</span></div>
              <div className="pl-5"><span className="text-slate-500">]</span><span className="text-slate-600">,</span></div>
              <div className="pl-5"><span className="text-red-400">available</span><span className="text-slate-500">:</span> <span className="text-emerald-400">true</span><span className="text-slate-600">,</span></div>
              <div><span className="text-slate-400">{'}'}</span><span className="text-slate-600">;</span></div>
              <div className="pt-3 flex items-center gap-2 text-slate-600">
                <span className="text-violet-500">$</span>
                <span>{t.hero.ready_to_ship}</span>
                <span className="inline-block w-[7px] h-[13px] bg-violet-400 opacity-80 animate-pulse rounded-sm" />
              </div>
            </div>
          </div>

          {/* Stats below the card */}
          <div className="flex gap-3 w-full px-1">
            {t.hero.stats.map(({ v, l }, i) => (
              <StatPill key={l} v={v} l={l} startDelay={1000 + i * 150} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-1000" style={{ opacity: 0 }}>
        <span className="text-slate-600 text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-600/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
