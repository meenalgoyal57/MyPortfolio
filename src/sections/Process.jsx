import { motion } from 'framer-motion';
import { processSteps } from '../data/content';
import SectionHeading from '../components/SectionHeading';

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Process() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading
          label="Process"
          title="How I work."
          subtitle="A clear, collaborative process from discovery to delivery."
          centered
        />

        <motion.div
          className="process-grid"
          style={{ marginTop: '4rem', borderRadius: 16, overflow: 'hidden' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {processSteps.map((step, i) => (
            <motion.div key={step.num} className="process-step" custom={i} variants={stepVariants}>
              <p className="process-step-num">{step.num} —</p>
              <h4 className="process-step-title">{step.title}</h4>
              <p className="process-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
