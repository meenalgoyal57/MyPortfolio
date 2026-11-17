import { motion } from 'framer-motion';
import { ArrowUp, GitBranch, Link2, Mail, Phone } from 'lucide-react';
import { navLinks, contactDetails } from '../data/content';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer-name">MEENAL GOYAL</p>
            <p className="footer-role">FULL STACK DEVELOPER</p>
            <p className="footer-company">Currently at Expandimo Technologies</p>

            <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <a
                href={`mailto:${contactDetails.email}`}
                style={{
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'color 0.2s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Mail size={13} /> {contactDetails.email}
              </a>
              <a
                href={contactDetails.phoneHref}
                style={{
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'color 0.2s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Phone size={13} /> {contactDetails.phone}
              </a>
            </div>
          </div>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Meenal Goyal. All rights reserved.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href={`mailto:${contactDetails.email}`} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} aria-label="Email">
              <Mail size={16} />
            </a>
            <a href={contactDetails.phoneHref} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} aria-label="Phone">
              <Phone size={16} />
            </a>
            <a href="https://github.com/meenalgoyal57" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} aria-label="GitHub">
              <GitBranch size={16} />
            </a>
            <a href="https://linkedin.com/in/meenal-goyal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} aria-label="LinkedIn">
              <Link2 size={16} />
            </a>
            <motion.button
              className="back-to-top"
              onClick={scrollTop}
              whileHover={{ y: -3 }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

