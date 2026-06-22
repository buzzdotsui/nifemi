import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

// Animated typewriter for roles
import { useEffect, useState } from 'react';

const roles = [
  'Virtual Assistant',
  'Social Media Manager',
  'Digital Strategist',
  'Content Creator',
];

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span>
      <span className="gradient-text">{displayed}</span>
      <span
        style={{
          color: 'var(--gold)',
          animation: 'pulse 1s ease-in-out infinite',
          marginLeft: 2,
        }}
      >
        |
      </span>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <ParticleCanvas />

      {/* Gradient vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.03) 0%, transparent 50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-badge-dot" />
          Available for Freelance Projects
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="hero-title-line" style={{ color: 'var(--text-primary)' }}>
            Akarakiri
          </span>
          <span className="hero-title-line gradient-text">Nifemi</span>
        </motion.h1>

        {/* Dynamic role */}
        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Typewriter />
          <br />
          <span style={{ fontSize: '0.95rem', display: 'block', marginTop: '0.5rem' }}>
            Helping businesses grow with smart virtual assistance &amp; powerful social media presence.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            className="btn-primary"
            id="hero-hire-btn"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me ✦
          </motion.button>
          <motion.button
            className="btn-secondary"
            id="hero-services-btn"
            onClick={() => scrollTo('services')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Services
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {[
            { num: '50+', label: 'Projects Done' },
            { num: '30+', label: 'Happy Clients' },
            { num: '2+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-number">{stat.num}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
