import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const labelVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

export default function SectionHeading({ label, title, subtitle, centered = false }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{ textAlign: centered ? 'center' : 'left' }}
    >
      {label && (
        <motion.p className="section-label" variants={labelVariants} style={{ justifyContent: centered ? 'center' : 'flex-start' }}>
          {label}
        </motion.p>
      )}
      <motion.h2 className="section-title" variants={titleVariants}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="section-subtitle" variants={subtitleVariants} style={{ margin: centered ? '0 auto' : undefined }}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
