import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import WhyMe from './components/WhyMe';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function App() {
  // Smooth cursor glow effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: '0',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.3s ease, top 0.3s ease',
      left: '-200px',
      top: '-200px',
    });
    document.body.appendChild(cursor);

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Skills />
          <WhyMe />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
