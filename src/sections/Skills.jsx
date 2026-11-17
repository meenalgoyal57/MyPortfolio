import { motion } from 'framer-motion';
import { skillCategories } from '../data/content';
import SectionHeading from '../components/SectionHeading';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
};

export default function Skills() {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading
          label="Skills"
          title="Tools I work with."
          subtitle="A curated technology stack built for modern, scalable web development."
        />

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.label} className="skill-category" variants={itemVariants}>
              <p className="skill-cat-label">{cat.label}</p>
              <div className="skill-items">
                {cat.skills.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="skill-item-dot" />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '100px',
            border: '1px solid var(--border-hover)',
            background: 'rgba(124,58,237,0.06)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent-light)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Full Stack Capable
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: 400, lineHeight: 1.6 }}>
            Comfortable across the entire stack — from designing UIs to building APIs and deploying on cloud infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
