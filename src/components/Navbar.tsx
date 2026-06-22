import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['Home', 'About', 'Services', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-logo">
          <span className="gradient-text">Nifemi</span>
        </div>

        <ul className="nav-links">
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
            >
              <span
                className="nav-link"
                onClick={() => scrollTo(item === 'Home' ? 'hero' : item)}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          className="nav-cta"
          onClick={() => scrollTo('Contact')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hire Me
        </motion.button>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.3s' }} />
          <span style={{ opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.3s' }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile open"
            initial={{ x: 280 }}
            animate={{ x: 0 }}
            exit={{ x: 280 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {navItems.map((item) => (
              <span
                key={item}
                className="nav-mobile-link"
                onClick={() => scrollTo(item === 'Home' ? 'hero' : item)}
              >
                {item}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
