import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current || !timelineRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top 70%',
      end: 'bottom 70%',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.height = `${self.progress * 100}%`;
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section className="section" id="experience">
      <div className="container" style={{ maxWidth: 800 }}>
        <SectionHeading
          label="Experience"
          title="Where I've worked."
        />

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-progress" ref={progressRef} />
          <div className="timeline-item">
            <div className="timeline-dot" />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="timeline-period">2026 — PRESENT</p>
              <h3 className="timeline-company">Expandimo Technologies</h3>
              <p className="timeline-role">Full Stack Developer</p>
              <p className="timeline-desc">
                Working as a Full Stack Developer, contributing to the design, development and
                delivery of modern web applications. Involved in building scalable backend
                services, responsive frontend interfaces and maintaining production systems.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
