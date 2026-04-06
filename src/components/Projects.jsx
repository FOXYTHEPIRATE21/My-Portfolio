const projects = [
  {
    title: 'Taxi App',
    tag: 'Main Project',
    description:
      'Uber-like platform with real-time location tracking. Supports role-based access for admins, drivers, and users — with SMS verification for drivers and live communication via WebSockets.',
    stack: ['Flutter', 'Firebase Auth', 'Cloudflare', 'WebSockets'],
    github: 'https://github.com/FOXYTHEPIRATE21',
    demo: null,
  },
  {
    title: 'Trading Automation Tool',
    tag: 'Backend',
    description:
      'Automated trading strategy engine with REST APIs and CI/CD pipelines. Handles live market data ingestion and position management with a robust PostgreSQL data layer.',
    stack: ['FastAPI', 'PostgreSQL', 'CI/CD'],
    github: 'https://github.com/FOXYTHEPIRATE21',
    demo: null,
  },
  {
    title: 'School Admin System',
    tag: 'Web App',
    description:
      'Responsive web-based admin panel for managing school data. Full CRUD operations across students, courses, and staff — built with a React frontend and PHP/PostgreSQL backend.',
    stack: ['React', 'PHP', 'PostgreSQL'],
    github: 'https://github.com/FOXYTHEPIRATE21',
    demo: null,
  },
];

function ProjectCard({ project }) {
  return (
    <div className="group relative flex flex-col bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/15 text-violet-400 rounded-md border border-violet-500/20">
          {project.tag}
        </span>
      </div>
      <h3 className="text-white font-semibold text-xl mb-3">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs text-slate-400 bg-white/5 rounded border border-white/8"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium rounded-lg transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white/3 border border-white/8 text-slate-600 text-sm font-medium rounded-lg cursor-not-allowed">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Projects</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
