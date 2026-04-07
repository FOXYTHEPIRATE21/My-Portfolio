import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

function ContactCard({ icon, label, value, href, color }) {
  const [hovered, setHovered] = useState(false);
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300"
        style={{
          background: hovered ? rgba(0.09) : rgba(0.04),
          border: `1px solid ${hovered ? rgba(0.35) : rgba(0.14)}`,
          transform: hovered ? 'translateX(6px)' : 'translateX(0)',
          boxShadow: hovered ? `0 12px 40px ${rgba(0.18)}` : 'none',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: hovered ? rgba(0.18) : rgba(0.08),
            border: `1px solid ${rgba(0.25)}`,
            color,
          }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-white font-semibold text-sm truncate">{value}</p>
        </div>
        <div className="ml-auto flex-shrink-0" style={{ color, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.2s' }}>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [leftRef,  leftVisible]  = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();

  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&to=miguel.osorio2177%40gmail.com&su=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-28 px-6 border-t border-white/5 relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-violet-600/5 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-indigo-600/4 rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: heading + availability + contact cards */}
          <div ref={leftRef} className={`reveal-left ${leftVisible ? 'visible' : ''}`}>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
              {t.contact.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-[15px]">{t.contact.description}</p>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-8"
              style={{
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <div>
                <p className="text-emerald-400 text-sm font-semibold leading-tight">{t.contact.availability}</p>
                <p className="text-emerald-600 text-xs leading-tight mt-0.5">{t.contact.availability_text}</p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="space-y-3 mb-6">
              <ContactCard
                href="https://mail.google.com/mail/?view=cm&to=miguel.osorio2177%40gmail.com"
                label={t.contact.label}
                value={t.contact.email_value}
                color="#8b5cf6"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <ContactCard
                href="https://github.com/FOXYTHEPIRATE21"
                label={t.contact.github}
                value="github.com/FOXYTHEPIRATE21"
                color="#10b981"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                }
              />
              <ContactCard
                href="https://www.linkedin.com/in/miguel-angel-osorio-hernandez-18a133341"
                label={t.contact.linkedin}
                value="linkedin.com/in/miguel-angel-osorio-hernandez"
                color="#0ea5e9"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
              />
            </div>

            {/* Response time */}
            <p className="text-slate-600 text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.contact.response_time}
            </p>
          </div>

          {/* Right: contact form */}
          <div ref={rightRef} className={`reveal-right ${rightVisible ? 'visible' : ''}`}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-7 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3 className="text-white font-semibold text-lg mb-1">{t.contact.form_title}</h3>

              {/* Name */}
              <div>
                <label className="block text-slate-500 text-[11px] font-medium uppercase tracking-widest mb-1.5">
                  {t.contact.name_label}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(139,92,246,0.5)';
                    e.target.style.boxShadow   = '0 0 0 3px rgba(139,92,246,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow   = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-500 text-[11px] font-medium uppercase tracking-widest mb-1.5">
                  {t.contact.email_label}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(139,92,246,0.5)';
                    e.target.style.boxShadow   = '0 0 0 3px rgba(139,92,246,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow   = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-500 text-[11px] font-medium uppercase tracking-widest mb-1.5">
                  {t.contact.message_label}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(139,92,246,0.5)';
                    e.target.style.boxShadow   = '0 0 0 3px rgba(139,92,246,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow   = 'none';
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="relative w-full group flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                {sent ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.contact.sent}
                  </>
                ) : (
                  <>
                    {t.contact.send_label}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
