import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Miguel Angel Osorio Hernandez
        </p>
      </footer>
    </div>
  );
}
