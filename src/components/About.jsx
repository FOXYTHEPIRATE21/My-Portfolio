import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

// Skill category accent colors
const SKILL_COLORS = {
  0: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)' },
  1: { color: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.22)' },
  2: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)' },
  3: { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.22)' },
  4: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)' },
  5: { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.22)'  },
};

export default function About() {
  const { t } = useLanguage();
  const [statsRef, statsVisible]   = useScrollReveal();
  const [leftRef,  leftVisible]    = useScrollReveal();
  const [rightRef, rightVisible]   = useScrollReveal();

  return (
    <section id="about" className="py-28 px-6 border-t border-white/5 relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-violet-600/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* ── Stats bar ── */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20 reveal ${statsVisible ? 'visible' : ''}`}
        >
          {t.about.stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="relative group rounded-2xl p-5 text-center overflow-hidden hover-lift"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)';
                e.currentTarget.style.background  = 'rgba(139,92,246,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background  = 'rgba(255,255,255,0.025)';
              }}
            >
              {/* shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/4 to-transparent" />
              <p
                className="text-3xl font-black mb-1"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Two-column main content ── */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: bio */}
          <div ref={leftRef} className={`reveal-left ${leftVisible ? 'visible' : ''}`}>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
              {t.about.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-7 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5 text-[15px]">{t.about.p1}</p>
            <p className="text-slate-400 leading-relaxed mb-8 text-[15px]">{t.about.p2}</p>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="relative group inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/25 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.hero.cta_contact}
              </a>
              <a
                href="https://github.com/FOXYTHEPIRATE21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: skill grid */}
          <div
            ref={rightRef}
            className={`grid grid-cols-2 gap-3 reveal-right ${rightVisible ? 'visible' : ''}`}
          >
            {t.about.skills.map(({ label, items }, i) => {
              const accent = SKILL_COLORS[i] ?? SKILL_COLORS[0];
              return (
                <div
                  key={label}
                  className="group rounded-2xl p-4 transition-all duration-300 hover-lift"
                  style={{
                    background: accent.bg,
                    border: `1px solid ${accent.border}`,
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-1.5 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent.color }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: accent.color }}
                    >
                      {label}
                    </p>
                  </div>
                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-[11px] rounded-lg font-medium text-slate-300 transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
