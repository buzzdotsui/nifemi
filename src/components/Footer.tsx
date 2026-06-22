import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <motion.div
          className="footer-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="gradient-text">Nifemi</span>
        </motion.div>

        <ul className="footer-links">
          {['hero', 'about', 'services', 'skills', 'contact'].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <p className="footer-copy">
          &copy; {year} Akarakiri Nifemi. Crafted with ✦ passion.
        </p>
      </div>
    </footer>
  );
}
