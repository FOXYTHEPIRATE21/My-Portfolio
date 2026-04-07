import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

// Static metadata — not translated
const PROJECT_META = [
  {
    stack: ['Flutter', 'Firebase Auth', 'Cloudflare', 'WebSockets'],
    color: '#8b5cf6',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    stack: ['FastAPI', 'PostgreSQL', 'CI/CD', 'REST APIs'],
    color: '#10b981',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    stack: ['React', 'PHP', 'PostgreSQL'],
    color: '#3b82f6',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    stack: ['Flutter', 'Audio Streaming', 'Firebase'],
    color: '#ec4899',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    stack: ['React', 'FastAPI', 'PostgreSQL'],
    color: '#f59e0b',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7m0 0l-9-5m9 5l9-5" />
      </svg>
    ),
  },
  {
    stack: ['Remix', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    color: '#f97316',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    stack: ['React', 'Node.js', 'PostgreSQL'],
    color: '#14b8a6',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    stack: ['FastAPI', 'Angular', 'PostgreSQL'],
    color: '#06b6d4',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    stack: ['Laravel', 'MySQL', 'Blade'],
    color: '#ef4444',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    stack: ['Laravel', 'React', 'MySQL'],
    color: '#eab308',
    icon: (cls) => (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

function rgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function ProjectModal({ project, meta, onClose, isClosing, labels }) {
  const { color } = meta;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${
        isClosing ? 'modal-overlay-out' : 'modal-overlay-in'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className={`relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d0d18] border border-white/10 rounded-t-3xl sm:rounded-2xl flex flex-col ${
          isClosing ? 'modal-content-out' : 'modal-content-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div
          className="relative flex items-start gap-4 p-6 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${rgba(color, 0.2)} 0%, transparent 65%)`,
            borderBottom: `1px solid ${rgba(color, 0.12)}`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: rgba(color, 0.15), border: `1.5px solid ${rgba(color, 0.3)}`, color }}
          >
            {meta.icon('w-7 h-7')}
          </div>
          <div className="pr-10 pt-1">
            <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-md border"
              style={{ color, backgroundColor: rgba(color, 0.12), borderColor: rgba(color, 0.25) }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-7">
          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">{labels.overview}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">{labels.tech_stack}</p>
            <div className="flex flex-wrap gap-2">
              {meta.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-lg border font-medium"
                  style={{ color, backgroundColor: rgba(color, 0.1), borderColor: rgba(color, 0.25) }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">{labels.screenshots}</p>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl border border-white/6 flex flex-col items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${rgba(color, 0.05)}, ${rgba(color, 0.01)})` }}
                >
                  <svg className="w-5 h-5" style={{ color: rgba(color, 0.25) }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-700 text-[11px]">{labels.screenshot} {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────
const TOTAL = PROJECT_META.length; // 10
const AUTO_INTERVAL = 4000;

// ─── Carousel Card ───────────────────────────────────────────────────────────
function CarouselCard({ project, meta, offset, onCenterClick, onSideClick, viewLabel, isPaused }) {
  const { color } = meta;
  const [hovered, setHovered] = useState(false);

  const isCenter  = offset === 0;
  const isAdjacent = Math.abs(offset) === 1;

  const scale   = isCenter   ? (hovered ? 1.015 : 1) : isAdjacent ? (hovered ? 0.88 : 0.83) : 0.66;
  const opacity = isCenter   ? 1 : isAdjacent ? (hovered ? 0.78 : 0.55) : Math.abs(offset) === 2 ? 0.15 : 0;
  const zIdx    = isCenter   ? 30 : isAdjacent ? 20 : 10;
  const visible = Math.abs(offset) <= 2;

  return (
    <div
      className="absolute top-0 left-1/2 select-none"
      style={{
        width: '380px',
        transform: `translateX(calc(-50% + ${offset * 420}px)) scale(${scale})`,
        opacity,
        zIndex: zIdx,
        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
        transformOrigin: 'center top',
        willChange: visible ? 'transform, opacity' : 'auto',
        pointerEvents: (isCenter || isAdjacent) ? 'auto' : 'none',
        cursor: (isCenter || isAdjacent) ? 'pointer' : 'default',
      }}
      onClick={isCenter ? onCenterClick : isAdjacent ? onSideClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient glow behind center card */}
      {isCenter && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: '-28px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at 50% 50%, ${rgba(color, 0.38)}, transparent 65%)`,
            filter: 'blur(22px)',
            zIndex: -1,
            animation: !isPaused ? 'glowPulse 2.5s ease-in-out infinite' : 'none',
          }}
        />
      )}

      {/* Card body */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          border: `1px solid ${isCenter ? rgba(color, hovered ? 0.65 : 0.42) : rgba(color, hovered ? 0.28 : 0.1)}`,
          background: `linear-gradient(160deg, ${rgba(color, isCenter ? 0.13 : 0.04)} 0%, #0a0a0f 58%)`,
          transition: 'border-color 0.3s ease',
          boxShadow: isCenter
            ? `0 24px 60px ${rgba(color, hovered ? 0.22 : 0.14)}`
            : 'none',
        }}
      >
        {/* Top accent stripe */}
        <div
          style={{
            height: '1px',
            background: `linear-gradient(90deg, ${color} 0%, transparent 80%)`,
            opacity: isCenter ? 1 : 0.35,
          }}
        />

        <div className="p-5 flex flex-col gap-2.5">
          {/* Tag + icon row */}
          <div className="flex items-center justify-between">
            <span
              className="px-2 py-0.5 text-[11px] font-semibold rounded-md border tracking-wide"
              style={{ color, backgroundColor: rgba(color, 0.1), borderColor: rgba(color, 0.2) }}
            >
              {project.tag}
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: rgba(color, hovered ? 0.18 : 0.09),
                border: `1px solid ${rgba(color, hovered ? 0.32 : 0.16)}`,
                color,
                transition: 'background-color 0.25s, border-color 0.25s',
              }}
            >
              {meta.icon(isCenter ? 'w-4 h-4' : 'w-3.5 h-3.5')}
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-white leading-snug"
            style={{ fontSize: isCenter ? '1.1rem' : '0.875rem' }}
          >
            {project.title}
          </h3>

          {/* Description — center only */}
          {isCenter && (
            <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-4">
              {project.description}
            </p>
          )}

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1">
            {meta.stack.slice(0, isCenter ? 4 : 2).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 text-[10px] text-slate-500 bg-white/4 rounded border border-white/6"
              >
                {tech}
              </span>
            ))}
            {!isCenter && meta.stack.length > 2 && (
              <span className="px-1.5 py-0.5 text-[10px] text-slate-700 rounded border border-white/4">
                +{meta.stack.length - 2}
              </span>
            )}
          </div>

          {/* CTA — center card */}
          {isCenter && (
            <div
              className="flex items-center gap-1.5 text-[11px] font-bold"
              style={{
                color,
                opacity: hovered ? 1 : 0.6,
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}
            >
              <span>{viewLabel}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}

          {/* Nav hint — adjacent cards */}
          {isAdjacent && (
            <div
              className="flex items-center gap-1"
              style={{ opacity: hovered ? 0.55 : 0, transition: 'opacity 0.2s ease', color }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={offset < 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                />
              </svg>
              <span className="text-[10px] font-medium" style={{ color }}>
                {offset < 0 ? 'prev' : 'next'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useLanguage();
  const [sectionRef, sectionVisible] = useScrollReveal();
  const [centerIdx, setCenterIdx]     = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isClosing, setIsClosing]     = useState(false);
  const [carouselHover, setCarouselHover] = useState(false);

  const modalOpen = selectedIdx !== null;
  const isPaused  = carouselHover || modalOpen;

  const advance = useCallback((dir) => {
    setCenterIdx((prev) => (prev + dir + TOTAL) % TOTAL);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => advance(1), AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, advance]);

  const openModal = (idx) => {
    setSelectedIdx(idx);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedIdx(null);
      setIsClosing(false);
      document.body.style.overflow = '';
    }, 220);
  };

  // ESC to close modal
  useEffect(() => {
    if (!modalOpen) return;
    const fn = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [modalOpen]);

  // Arrow keys to navigate carousel
  useEffect(() => {
    if (modalOpen) return;
    const fn = (e) => {
      if (e.key === 'ArrowLeft')  advance(-1);
      if (e.key === 'ArrowRight') advance(1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [advance, modalOpen]);

  const labels = {
    view_details: t.projects.view_details,
    overview:     t.projects.modal_overview,
    tech_stack:   t.projects.modal_stack,
    screenshots:  t.projects.modal_screenshots,
    screenshot:   t.projects.screenshot,
  };

  const activeColor = PROJECT_META[centerIdx].color;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div ref={sectionRef} className={`mb-16 reveal ${sectionVisible ? 'visible' : ''}`}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t.projects.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.projects.title}</h2>
        </div>

        {/* Carousel stage */}
        <div
          className="relative"
          onMouseEnter={() => setCarouselHover(true)}
          onMouseLeave={() => setCarouselHover(false)}
        >
          <div className="relative h-[430px] overflow-hidden">
            {Array.from({ length: TOTAL }).map((_, idx) => {
              let offset = (idx - centerIdx + TOTAL) % TOTAL;
              if (offset > TOTAL / 2) offset -= TOTAL;
              return (
                <CarouselCard
                  key={idx}
                  project={t.projects.items[idx]}
                  meta={PROJECT_META[idx]}
                  offset={offset}
                  onCenterClick={() => openModal(idx)}
                  onSideClick={() => advance(offset > 0 ? 1 : -1)}
                  viewLabel={labels.view_details}
                  isPaused={isPaused}
                />
              );
            })}
          </div>

          {/* Left arrow */}
          <button
            onClick={() => advance(-1)}
            className="absolute -left-5 top-[45%] -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,10,15,0.92)',
              border: `1px solid rgba(255,255,255,0.08)`,
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = rgba(activeColor, 0.5);
              e.currentTarget.style.boxShadow = `0 0 12px ${rgba(activeColor, 0.25)}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => advance(1)}
            className="absolute -right-5 top-[45%] -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,10,15,0.92)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = rgba(activeColor, 0.5);
              e.currentTarget.style.boxShadow = `0 0 12px ${rgba(activeColor, 0.25)}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterIdx(i)}
              style={{
                width: i === centerIdx ? '20px' : '5px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: i === centerIdx ? PROJECT_META[i].color : 'rgba(255,255,255,0.12)',
                transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        {!isPaused && (
          <div className="mt-3 mx-auto w-28 h-px bg-white/5 rounded-full overflow-hidden">
            <div
              key={centerIdx}
              className="h-full rounded-full"
              style={{
                backgroundColor: activeColor,
                animation: `progressBar ${AUTO_INTERVAL}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedIdx !== null && (
        <ProjectModal
          project={t.projects.items[selectedIdx]}
          meta={PROJECT_META[selectedIdx]}
          onClose={closeModal}
          isClosing={isClosing}
          labels={labels}
        />
      )}
    </section>
  );
}
