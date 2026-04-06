export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Building things that matter
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            I&apos;m a Fullstack Developer based in Colombia with a focus on delivering
            complete, production-ready solutions. I work across the entire stack —
            crafting mobile apps with Flutter, building high-performance APIs with
            FastAPI, and deploying infrastructure on AWS and Firebase.
          </p>
          <p className="text-slate-400 leading-relaxed">
            I enjoy tackling complex problems — from real-time systems and role-based
            architectures to automation pipelines and responsive admin dashboards.
            My goal is always the same: clean code, reliable systems, shipped on time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Frontend', items: ['React', 'Flutter'] },
            { label: 'Backend', items: ['FastAPI', 'PHP'] },
            { label: 'Database', items: ['PostgreSQL'] },
            { label: 'Cloud & Tools', items: ['Firebase', 'AWS', 'Cloudflare', 'Docker'] },
          ].map(({ label, items }) => (
            <div
              key={label}
              className="bg-white/3 border border-white/8 rounded-xl p-4 hover:border-violet-500/30 transition-colors duration-200"
            >
              <p className="text-violet-400 text-xs font-medium uppercase tracking-wider mb-3">
                {label}
              </p>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="text-slate-300 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
