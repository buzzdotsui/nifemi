import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './common/TiltCard';

const services = [
  {
    icon: '🤖',
    title: 'Virtual Assistant',
    desc: 'Comprehensive administrative support to keep your business running smoothly.',
    items: [
      'Email & calendar management',
      'Data entry & research',
      'Travel & meeting coordination',
      'Customer support & follow-ups',
      'Document preparation',
    ],
  },
  {
    icon: '📱',
    title: 'Social Media Management',
    desc: 'End-to-end management of your social media presence to grow your brand.',
    items: [
      'Content creation & scheduling',
      'Community engagement',
      'Analytics & monthly reports',
      'Hashtag & trend research',
      'Paid ad campaign support',
    ],
  },
  {
    icon: '✍️',
    title: 'Content Strategy',
    desc: 'Crafting a content roadmap that resonates with your audience and drives results.',
    items: [
      'Content calendar planning',
      'Brand voice development',
      'Caption copywriting',
      'Blog & newsletter writing',
      'Visual content direction',
    ],
  },
  {
    icon: '📊',
    title: 'Analytics & Reporting',
    desc: 'Data-driven insights that help you understand performance and make smart decisions.',
    items: [
      'Weekly performance reports',
      'Competitor analysis',
      'Audience growth tracking',
      'Engagement rate analysis',
      'Strategy recommendations',
    ],
  },
  {
    icon: '🎯',
    title: 'Brand Building',
    desc: 'Establishing and strengthening your brand identity across all digital touchpoints.',
    items: [
      'Brand consistency audit',
      'Profile optimisation',
      'Bio & story crafting',
      'Influencer outreach support',
      'Online reputation management',
    ],
  },
  {
    icon: '⚡',
    title: 'Project Coordination',
    desc: 'Keeping your projects on track with clear timelines, tasks, and communication.',
    items: [
      'Task management & tracking',
      'Team coordination',
      'Deadline management',
      'Workflow optimisation',
      'Reporting & documentation',
    ],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <div className="services-header">
          <motion.span
            className="section-subtitle gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What I Offer
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ marginTop: '0.75rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Services <span className="gradient-text">Designed</span> for Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Premium services tailored to help you save time, grow your audience, and scale your business.
          </motion.p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 * i + 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ height: '100%' }}
            >
              <TiltCard style={{ height: '100%' }}>
                <div className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-list">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
