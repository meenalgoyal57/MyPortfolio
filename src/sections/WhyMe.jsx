import { motion } from 'framer-motion';
import { Monitor, Code2, Sparkles, MessageCircle } from 'lucide-react';
import { whyItems } from '../data/content';
import SectionHeading from '../components/SectionHeading';

const iconMap = {
  monitor: Monitor,
  code: Code2,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function WhyMe() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          label="Why Me"
          title="Built different."
          subtitle="The qualities that define how I approach every project."
        />

        <motion.div
          className="why-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {whyItems.map((item, i) => {
            const Icon = iconMap[item.icon] || Monitor;
            return (
              <motion.div key={item.title} className="why-block" custom={i} variants={blockVariants}>
                <div className="why-icon">
                  <Icon size={18} />
                </div>
                <h4 className="why-title">{item.title}</h4>
                <p className="why-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
