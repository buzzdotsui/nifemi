import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './common/TiltCard';
import { Zap, Target, ShieldCheck, Radio } from 'lucide-react';

const whys = [
  {
    Icon: Zap,
    title: 'Fast Turnaround',
    desc: 'I respect your time. Tasks are delivered on schedule — no excuses, just results.',
    num: '01',
  },
  {
    Icon: Target,
    title: 'Goal-Oriented',
    desc: 'Every action I take is tied to your business goals — growth, efficiency, and success.',
    num: '02',
  },
  {
    Icon: ShieldCheck,
    title: 'Fully Confidential',
    desc: 'Your business information is handled with the utmost privacy and discretion.',
    num: '03',
  },
  {
    Icon: Radio,
    title: 'Always Reachable',
    desc: 'Clear, prompt communication across time zones. You will always know what is happening.',
    num: '04',
  },
];

export default function WhyMe() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" className="why-section" ref={ref}>
      <div className="container">
        <div className="why-header">
          <motion.span
            className="section-subtitle gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Why Choose Me
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ marginTop: '0.75rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            The <span className="gradient-text">Difference</span> I Make
          </motion.h2>
          <motion.p
            style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            More than a freelancer — a committed growth partner invested in your success.
          </motion.p>
        </div>

        <div className="why-grid">
          {whys.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
              style={{ height: '100%' }}
            >
              <TiltCard style={{ height: '100%' }}>
                <div className="why-card">
                  <span className="why-number">{w.num}</span>
                  <div className="why-icon-wrap">
                    <w.Icon size={28} strokeWidth={1.5} color="var(--gold)" />
                  </div>
                  <h3 className="why-card-title">{w.title}</h3>
                  <p className="why-card-desc">{w.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
