export default function Navbar() {
  const links = ['Projects', 'About', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight">
          Miguel<span className="text-violet-400">.</span>
        </span>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
