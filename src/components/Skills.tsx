import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const vaSkills = [
  { name: 'Email & Calendar Management', percent: 95 },
  { name: 'Data Entry & Research', percent: 92 },
  { name: 'Customer Service', percent: 88 },
  { name: 'Document & Report Writing', percent: 85 },
  { name: 'Project Coordination', percent: 82 },
];

const smSkills = [
  { name: 'Content Creation & Copywriting', percent: 94 },
  { name: 'Social Media Strategy', percent: 91 },
  { name: 'Community Engagement', percent: 90 },
  { name: 'Analytics & Reporting', percent: 85 },
  { name: 'Brand Building', percent: 88 },
];

const toolTags = [
  'Google Workspace', 'Notion', 'Trello', 'Slack', 'Zoom',
  'Canva', 'Buffer', 'Hootsuite', 'Later', 'Meta Business Suite',
  'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook',
  'Mailchimp', 'Asana', 'ClickUp', 'Microsoft Office', 'Calendly',
];

function SkillBar({ name, percent, inView, index }: { name: string; percent: number; inView: boolean; index: number }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), index * 150 + 300);
      return () => clearTimeout(t);
    }
  }, [inView, animated, index]);

  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
    >
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className={`skill-bar-fill ${animated ? 'animated' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <div className="skills-header">
          <motion.span
            className="section-subtitle gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            My Expertise
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ marginTop: '0.75rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Skills & <span className="gradient-text">Tools</span>
          </motion.h2>
        </div>

        <div className="skills-container">
          {/* VA Skills */}
          <div>
            <p className="skills-group-title">Virtual Assistant Skills</p>
            {vaSkills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} percent={s.percent} inView={inView} index={i} />
            ))}
          </div>

          {/* SM Skills */}
          <div>
            <p className="skills-group-title">Social Media Skills</p>
            {smSkills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} percent={s.percent} inView={inView} index={i} />
            ))}
          </div>
        </div>

        {/* Tools */}
        <motion.div
          style={{ marginTop: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="skills-group-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Tools & Platforms
          </p>
          <div className="skills-tags">
            {toolTags.map((tool, i) => (
              <motion.span
                key={tool}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
