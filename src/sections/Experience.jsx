import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    period: 'JUL 2026 — PRESENT',
    company: 'Expandimo Technologies',
    role: 'Full Stack Developer',
    type: 'Full-time',
    isCurrent: true,
    desc: 'Architecting and engineering modern responsive web platforms, scalable RESTful APIs, and performant backend services. Collaborating across the complete software delivery cycle — from system architecture and state management to cloud deployment and Core Web Vitals optimisation.',
  },
  {
    period: 'JAN 2026 — JUL 2026',
    company: 'TestingXperts',
    role: 'Software Engineer — QA & Test Automation',
    type: 'Associate',
    isCurrent: false,
    desc: 'Designed, implemented, and executed automated test suites and end-to-end quality assurance pipelines for enterprise web applications. Performed functional, integration, regression, and API testing to detect vulnerabilities early and guarantee rock-solid system stability.',
  },
  {
    period: 'JUL 2025 — DEC 2025',
    company: 'Infosys Springboard',
    role: 'Software Engineering Trainee',
    type: 'Certification Programme',
    isCurrent: false,
    desc: 'Completed a specialised enterprise software engineering curriculum covering full-stack web architectures, object-oriented design in Java, Spring Boot microservices, relational database schema design, and modern frontend development with agile methodologies.',
  },
];

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

          {entries.map((entry, i) => (
            <div className="timeline-item" key={entry.company}>
              <div
                className="timeline-dot"
                style={entry.isCurrent ? { background: 'var(--accent-light)', boxShadow: '0 0 14px var(--accent-glow)' } : {}}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              >
                <p className="timeline-period">
                  {entry.period}
                  {entry.isCurrent && (
                    <span style={{
                      marginLeft: '0.6rem',
                      fontSize: '0.6rem',
                      padding: '2px 8px',
                      borderRadius: 20,
                      background: 'rgba(124,58,237,0.18)',
                      color: 'var(--accent-light)',
                      letterSpacing: '0.08em',
                      verticalAlign: 'middle',
                      fontWeight: 700,
                    }}>● CURRENT</span>
                  )}
                </p>
                <h3 className="timeline-company">{entry.company}</h3>
                <p className="timeline-role">
                  {entry.role}
                  <span style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.68rem',
                    padding: '2px 10px',
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    verticalAlign: 'middle',
                  }}>{entry.type}</span>
                </p>
                <p className="timeline-desc">{entry.desc}</p>
              </motion.div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
