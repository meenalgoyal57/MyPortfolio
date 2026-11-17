import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import AnimatedText from '../components/AnimatedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (started) return;
        setStarted(true);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, suffix, started]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="grid-2" style={{ gap: '5rem', alignItems: 'center' }}>
          {/* Left — Visual */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="about-visual">
              <div className="about-visual-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/meenal.jpg"
                  alt="Meenal Goyal — Full Stack Developer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Vignette & tint overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,16,22,0.92) 0%, rgba(15,16,22,0.2) 45%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
              <div className="about-badge about-badge--1">
                <Code2 size={14} className="about-badge-icon" style={{ color: 'var(--accent-light)' }} />
                Full Stack Developer
              </div>
              <div className="about-badge about-badge--2">
                <Briefcase size={14} className="about-badge-icon" style={{ color: 'var(--accent-light)' }} />
                Expandimo Technologies
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="about-right">
            <SectionHeading
              label="About"
              title="A developer who cares about the details."
            />

            <div className="about-large-text">
              <AnimatedText text="Design." tag="span" className="about-large-text" delay={0.0} />
              <br />
              <AnimatedText text="Code." tag="span" delay={0.05} />
              <br />
              <AnimatedText text="Performance." tag="span" delay={0.1} />
              <br />
              <AnimatedText text="Experience." tag="span" delay={0.15} />
            </div>

            <motion.p
              className="about-body"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              I build full-stack web experiences with a strong focus on clean interfaces,
              responsive design, scalable architecture and smooth user experiences. From idea
              to deployment, I care about every detail.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="about-stats"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={1} suffix="+" />
                </div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={10} suffix="+" />
                </div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={5} suffix="+" />
                </div>
                <div className="stat-label">Projects Built</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
