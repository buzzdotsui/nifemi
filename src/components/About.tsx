import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="about-image-frame">
              {/* Tilted decorative border */}
              <div className="about-image-bg" />

              {/* Second glow border */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  transform: 'rotate(-2deg)',
                  pointerEvents: 'none',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              <div className="about-image-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Real photo */}
                <img
                  src="/nifemi.jpg"
                  alt="Akarakiri Nifemi — Virtual Assistant & Social Media Manager"
                  className="about-avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'grayscale(30%) contrast(1.08) brightness(0.92) sepia(12%)',
                  }}
                />

                {/* Gold duotone overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(201,168,76,0.04) 0%, rgba(0,0,0,0.35) 100%)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                  }}
                />

                {/* Bottom vignette for text-readability */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Pulsing border ring inside image */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 6,
                    borderRadius: 'calc(var(--radius-md) - 4px)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <motion.div
                className="about-badge-floating"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="num">2+</span>
                Years Experience
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="about-content">
            <motion.span
              className="about-label"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              About Me
            </motion.span>

            <motion.h2
              className="section-title"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              Your Remote{' '}
              <span className="gradient-text">Right-Hand</span> Professional
            </motion.h2>

            <motion.p
              className="about-text"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              Hi! I'm <strong style={{ color: 'var(--text-primary)' }}>Akarakiri Nifemi</strong>, a dedicated and highly-organised
              virtual assistant and social media manager passionate about helping businesses
              and entrepreneurs thrive online. I bring creativity, strategy, and reliability to every project I take on.
            </motion.p>

            <motion.p
              className="about-text"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              From managing your calendar and emails to crafting compelling social media content
              that drives real engagement — I handle the details so you can focus on the big picture.
            </motion.p>

            <motion.div
              className="about-highlights"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {[
                'Reliable, detail-oriented, and deadline-driven',
                'Expert in social media growth strategies',
                'Clear communication and proactive reporting',
                'Available across multiple time zones',
                'Passionate about client success',
              ].map((item) => (
                <div key={item} className="about-highlight-item">
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.a
                href="mailto:akarakirinifemi@gmail.com"
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
