import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/content';
import SectionHeading from '../components/SectionHeading';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Services() {
  return (
    <section className="section" id="services" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading
          label="Services"
          title="What I can build for you."
          subtitle="From concept to deployment — full-stack development tailored to your needs."
        />

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className="service-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <span className="service-number">{service.num}</span>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
              <div className="service-arrow">
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
