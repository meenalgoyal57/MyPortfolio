import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/content';

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08 + 0.3, duration: 0.5, ease: [0.76, 0, 0.24, 1] } }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

const mobileLinkVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.07 + 0.1, duration: 0.45, ease: [0.76, 0, 0.24, 1] } }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <motion.div
              className="navbar-logo"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={navVariants}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              MEENAL <span>GOYAL</span>
            </motion.div>

            {/* Desktop links */}
            <ul className="navbar-links">
              {navLinks.map((link, i) => (
                <motion.li key={link} custom={i + 1} initial="hidden" animate="visible" variants={navVariants}>
                  <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link); }}>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Availability */}
            <motion.div
              className="navbar-availability"
              custom={navLinks.length + 1}
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <span className="availability-dot" />
              AVAILABLE FOR FREELANCE
            </motion.div>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                className="mobile-menu-link"
                custom={i}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                onClick={() => scrollTo(link)}
              >
                {link}
              </motion.div>
            ))}
            <motion.div
              custom={navLinks.length}
              variants={mobileLinkVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}
            >
              <span className="availability-dot" />
              AVAILABLE FOR FREELANCE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
