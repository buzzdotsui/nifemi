import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './common/TiltCard';
import {
  Headset,
  Share2,
  PenLine,
  BarChart3,
  Sparkles,
  FolderKanban,
} from 'lucide-react';

const services = [
  {
    Icon: Headset,
    title: 'Virtual Assistant',
    desc: 'Comprehensive administrative support to keep your business running smoothly.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
    items: [
      'Email & calendar management',
      'Data entry & research',
      'Travel & meeting coordination',
      'Customer support & follow-ups',
      'Document preparation',
    ],
  },
  {
    Icon: Share2,
    title: 'Social Media Management',
    desc: 'End-to-end management of your social media presence to grow your brand.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
    items: [
      'Content creation & scheduling',
      'Community engagement',
      'Analytics & monthly reports',
      'Hashtag & trend research',
      'Paid ad campaign support',
    ],
  },
  {
    Icon: PenLine,
    title: 'Content Strategy',
    desc: 'Crafting a content roadmap that resonates with your audience and drives results.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
    items: [
      'Content calendar planning',
      'Brand voice development',
      'Caption copywriting',
      'Blog & newsletter writing',
      'Visual content direction',
    ],
  },
  {
    Icon: BarChart3,
    title: 'Analytics & Reporting',
    desc: 'Data-driven insights that help you understand performance and make smart decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    items: [
      'Weekly performance reports',
      'Competitor analysis',
      'Audience growth tracking',
      'Engagement rate analysis',
      'Strategy recommendations',
    ],
  },
  {
    Icon: Sparkles,
    title: 'Brand Building',
    desc: 'Establishing and strengthening your brand identity across all digital touchpoints.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
    items: [
      'Brand consistency audit',
      'Profile optimisation',
      'Bio & story crafting',
      'Influencer outreach support',
      'Online reputation management',
    ],
  },
  {
    Icon: FolderKanban,
    title: 'Project Coordination',
    desc: 'Keeping your projects on track with clear timelines, tasks, and communication.',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&q=80',
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
                  {/* Background image & gradient overlay */}
                  <div className="service-card-bg">
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                    />
                    <div className="service-card-overlay" />
                  </div>
                  
                  {/* Text content z-index wrapper */}
                  <div className="service-card-content">
                    <div className="service-icon">
                      <service.Icon size={26} strokeWidth={1.5} color="var(--gold)" />
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                    <ul className="service-list">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
