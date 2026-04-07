import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '#projects', label: t.nav.projects },
    { href: '#about',    label: t.nav.about    },
    { href: '#contact',  label: t.nav.contact  },
  ];

  const socialLinks = [
    {
      href: 'https://mail.google.com/mail/?view=cm&to=miguel.osorio2177%40gmail.com',
      label: 'Email',
      external: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: 'https://github.com/FOXYTHEPIRATE21',
      label: 'GitHub',
      external: true,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/in/miguel-angel-osorio-hernandez-18a133341',
      label: 'LinkedIn',
      external: true,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
              >
                M
              </div>
              <span className="font-bold text-white text-[15px]">Miguel Osorio</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-[220px]">
              {t.footer.tagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ background: 'rgba(16,185,129,0.07)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-[11px] font-semibold">{t.footer.available}</span>
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-5">{t.footer.nav_title}</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span
                      className="block h-px bg-violet-400 transition-all duration-300"
                      style={{ width: '0px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.width = '16px')}
                      onMouseLeave={(e) => (e.currentTarget.style.width = '0px')}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-5">{t.footer.social_title}</p>
            <div className="space-y-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-violet-400 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)';
                      e.currentTarget.style.background  = 'rgba(139,92,246,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-300 text-sm transition-colors duration-200">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8 w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.18) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)',
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-[13px]">
            © {year} Miguel Angel Osorio Hernandez — {t.footer.copyright}
          </p>
          <p className="text-slate-700 text-xs flex items-center gap-1.5">
            {t.footer.built_with}
            <span className="text-violet-700">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
