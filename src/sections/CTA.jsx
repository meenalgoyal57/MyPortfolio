import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function CTA() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg-glow" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="cta-eyebrow">Have an idea?</p>

          <h2 className="cta-title">
            LET'S BUILD<br />
            <span style={{ color: 'var(--accent-light)' }}>SOMETHING GREAT.</span>
          </h2>

          <p className="cta-subtitle">
            Have a website or web application in mind? Let's turn your idea into
            a polished digital experience.
          </p>

          <MagneticButton
            className="btn btn-primary"
            onClick={scrollToContact}
            strength={0.5}
          >
            START A PROJECT <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* subtle animated grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
