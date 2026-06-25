import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import TiltCard from './common/TiltCard';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Social Media', 'Branding', 'Content', 'Strategy'];

const projects = [
  {
    title: 'Fashion Brand Launch',
    category: 'Social Media',
    desc: 'Full social media rollout for a luxury fashion label — growing from 0 to 12K followers in 3 months.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    tags: ['Instagram', 'Content Creation', 'Growth'],
  },
  {
    title: 'E-Commerce Rebrand',
    category: 'Branding',
    desc: 'Complete brand identity refresh — new voice, visual direction, and profile optimisation across platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    tags: ['Brand Identity', 'Visual Design', 'Copy'],
  },
  {
    title: 'Wellness Blog Series',
    category: 'Content',
    desc: 'Wrote and scheduled a 12-part wellness blog series that increased organic traffic by 45%.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    tags: ['Blog Writing', 'SEO', 'Newsletter'],
  },
  {
    title: 'Tech Startup Social Audit',
    category: 'Strategy',
    desc: 'In-depth audit and 90-day content strategy that doubled engagement rate for a SaaS startup.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
    tags: ['Analytics', 'Strategy', 'Competitor Research'],
  },
  {
    title: 'Restaurant Grand Opening',
    category: 'Social Media',
    desc: 'Managed the full social media campaign for a restaurant launch — content, reels, and influencer outreach.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    tags: ['Campaign', 'Reels', 'Influencer'],
  },
  {
    title: 'Coaching Brand Identity',
    category: 'Branding',
    desc: 'Developed brand guidelines and social presence for a life coaching business, establishing authority online.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    tags: ['Personal Brand', 'LinkedIn', 'Authority'],
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="portfolio-section" ref={ref}>
      <div className="container">
        <div className="portfolio-header">
          <motion.span
            className="section-subtitle gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            My Work
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ marginTop: '0.75rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: 520, margin: '1rem auto 0' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A selection of projects where I've helped brands grow, engage, and convert through strategic virtual assistance and social media management.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`portfolio-filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <TiltCard>
                  <div className="portfolio-card">
                    <div className="portfolio-card-image">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                      <div className="portfolio-card-overlay">
                        <motion.div
                          className="portfolio-card-overlay-icon"
                          whileHover={{ scale: 1.15 }}
                        >
                          <ExternalLink size={22} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </div>
                    <div className="portfolio-card-body">
                      <span className="portfolio-card-category">{project.category}</span>
                      <h3 className="portfolio-card-title">{project.title}</h3>
                      <p className="portfolio-card-desc">{project.desc}</p>
                      <div className="portfolio-card-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="portfolio-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
