export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Have a project in mind or want to collaborate? Reach out and I&apos;ll get
            back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:miguel@example.com"
              className="flex items-center gap-3 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send an Email
            </a>
            <a
              href="https://github.com/FOXYTHEPIRATE21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
