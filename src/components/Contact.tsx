import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: integrate with EmailJS, Formspree, etc.
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hi Nifemi,\n\nMy name is ${form.name}.\n\n${form.message}\n\nFrom: ${form.email}`
    );
    window.location.href = `mailto:akarakirinifemi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="contact-label">Get in Touch</span>
            <h2 className="contact-title">
              Let's Work{' '}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="contact-desc">
              Ready to take your business to the next level? Whether you need virtual assistance,
              social media management, or content strategy — I'm here to help. Let's connect!
            </p>

            <div className="contact-details">
              {[
                { icon: '📧', label: 'Email', value: 'akarakirinifemi@gmail.com', href: 'mailto:akarakirinifemi@gmail.com' },
                { icon: '📱', label: 'Phone / WhatsApp', value: '08166340477', href: 'tel:+2348166340477' },
                { icon: '🌍', label: 'Location', value: 'Nigeria — Available Remotely Worldwide', href: undefined },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="contact-detail-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-detail-icon">{item.icon}</div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact-detail-value" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-detail-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Find Me On
              </p>
              <div className="contact-social">
                {[
                  { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
                  { label: 'Twitter', icon: '𝕏', href: 'https://twitter.com' },
                  { label: 'Instagram', icon: '◈', href: 'https://instagram.com' },
                  { label: 'WhatsApp', icon: '✆', href: 'https://wa.me/2348166340477' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title={s.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                className="form-input"
                type="text"
                name="subject"
                placeholder="What do you need help with?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                name="message"
                placeholder="Tell me about your project, goals, and how I can help..."
                required
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {sent && (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Opening your email client... Talk soon!
              </motion.div>
            )}

            <motion.button
              id="contact-submit"
              type="submit"
              className="form-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message ✦
            </motion.button>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
              I typically respond within 24 hours. WhatsApp me for urgent requests!
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
