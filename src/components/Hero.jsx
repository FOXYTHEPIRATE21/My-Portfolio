export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full">
        <div className="animate-fade-in-up">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
            Based in Colombia
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Miguel Angel
            <br />
            <span className="text-violet-400">Osorio Hernandez</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-6 font-light">
            Fullstack Developer
          </p>
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-10">
            I build scalable web and mobile applications — from real-time
            systems to cloud-native backends. Clean code, modern stack, shipped fast.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            {['React', 'Flutter', 'FastAPI', 'PHP', 'PostgreSQL', 'Firebase', 'AWS', 'Docker'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              )
            )}
          </div>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
