import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['projects', 'about', 'contact'];
    const intersecting = new Set();

    const update = () => {
      setActiveSection(ids.find((id) => intersecting.has(id)) ?? '');
    };

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            intersecting.add(id);
          } else {
            intersecting.delete(id);
          }
          update();
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const links = [
    { key: 'projects', label: t.nav.projects },
    { key: 'about',    label: t.nav.about    },
    { key: 'contact',  label: t.nav.contact  },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-white font-bold text-lg tracking-tight hover:text-violet-300 transition-colors duration-200"
        >
          Miguel<span className="text-violet-400">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ key, label }) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className={`text-sm transition-colors duration-200 relative group ${
                  activeSection === key ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-violet-400 transition-all duration-300 ${
                    activeSection === key ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
          {/* Language toggle */}
          <li>
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/60 transition-all duration-200 tracking-widest"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </li>
        </ul>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 transition-all duration-200 tracking-widest"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-slate-400 hover:text-white transition-colors duration-200 p-1"
          >
            {/* Animated hamburger */}
            <div className="relative w-5 h-[14px]">
              <span
                className={`absolute inset-x-0 h-[2px] bg-current rounded transition-all duration-300 ${
                  menuOpen ? 'top-[6px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute inset-x-0 h-[2px] bg-current rounded top-[6px] transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 h-[2px] bg-current rounded transition-all duration-300 ${
                  menuOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-5 bg-[#0a0a0f]/95 border-t border-white/5">
          {links.map(({ key, label }) => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === key ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
