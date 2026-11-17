import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const reveal = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay } },
});

// Parallax floating cards data
const floatingCards = [
  { top: '15%', left: '10%', text: 'React + Spring Boot', delay: '0s' },
  { top: '45%', right: '5%', text: 'REST APIs', delay: '1.2s' },
  { top: '70%', left: '15%', text: 'Full Stack', delay: '0.6s' },
  { bottom: '15%', right: '15%', text: 'Cloud Ready', delay: '1.8s' },
];

export default function Hero() {
  const visualRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!visualRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      visualRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2, paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="hero-content">
          {/* Label */}
          <motion.div
            className="hero-label"
            variants={reveal(0.2)}
            initial="hidden"
            animate="visible"
          >
            <span className="hero-label-dot" />
            Full Stack Developer
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="hero-greeting"
            variants={reveal(0.35)}
            initial="hidden"
            animate="visible"
          >
            Hi, I'm Meenal.
          </motion.p>

          {/* Name */}
          <motion.h1
            className="hero-name"
            variants={reveal(0.45)}
            initial="hidden"
            animate="visible"
          >
            Meenal Goyal
          </motion.h1>

          {/* Headline */}
          <motion.div variants={reveal(0.55)} initial="hidden" animate="visible">
            <h2 className="hero-headline">
              I build digital experiences<br />
              <em>that work beautifully.</em>
            </h2>
          </motion.div>

          {/* Desc */}
          <motion.p
            className="hero-desc"
            variants={reveal(0.65)}
            initial="hidden"
            animate="visible"
          >
            Full Stack Developer currently working at Expandimo Technologies,
            building modern, responsive and scalable web applications.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-cta" variants={reveal(0.75)} initial="hidden" animate="visible">
            <MagneticButton
              className="btn btn-primary"
              onClick={() => scrollTo('work')}
            >
              VIEW MY WORK <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton
              className="btn btn-outline"
              onClick={() => scrollTo('contact')}
            >
              LET'S TALK <ArrowRight size={15} />
            </MagneticButton>
          </motion.div>

          {/* Availability */}
          <motion.div className="hero-avail" variants={reveal(0.85)} initial="hidden" animate="visible">
            <span className="hero-avail-dot" />
            Currently available for freelance projects
          </motion.div>
        </div>

        {/* Right visual */}
        <div className="hero-visual">
          <div ref={visualRef} style={{ width: '100%', height: '100%', position: 'relative', transition: 'transform 0.15s ease-out' }}>
            <div className="hero-grid" />
            <div className="hero-glow" />
            <div className="hero-ring hero-ring--3" />
            <div className="hero-ring hero-ring--1">
              {/* Orbit dots */}
              {[0, 90, 180, 270].map((deg, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 8, height: 8,
                    background: i === 0 ? 'var(--accent)' : 'var(--border)',
                    borderRadius: '50%',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(200px) translateY(-4px)`,
                    boxShadow: i === 0 ? '0 0 10px var(--accent-glow)' : undefined,
                  }}
                />
              ))}
            </div>
            <div className="hero-ring hero-ring--2" />

            {/* Floating cards */}
            <div style={{ position: 'absolute', inset: 0 }}>
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="floating-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    position: 'absolute',
                    top: card.top,
                    left: card.left,
                    right: card.right,
                    bottom: card.bottom,
                    animationDelay: card.delay,
                  }}
                >
                  <span className="floating-card-dot" />
                  {card.text}
                </motion.div>
              ))}
            </div>

            {/* Center element - Profile Portrait */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                style={{
                  width: 114,
                  height: 114,
                  borderRadius: '50%',
                  border: '2.5px solid var(--accent)',
                  padding: '3px',
                  background: 'rgba(15, 16, 22, 0.95)',
                  boxShadow: '0 0 35px rgba(124, 58, 237, 0.6), 0 0 75px rgba(124, 58, 237, 0.25)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7, type: 'spring', stiffness: 160 }}
              >
                <img
                  src="/meenal.jpg"
                  alt="Meenal Goyal"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line" />
      </motion.div>

      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '50%', height: '70%',
          background: 'radial-gradient(ellipse at 20% 30%, rgba(124, 58, 237, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
