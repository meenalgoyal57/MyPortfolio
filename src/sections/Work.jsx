import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import SectionHeading from '../components/SectionHeading';
import ProjectModal from '../components/ProjectModal';

// Project visual previews
function ProjectVisual({ type }) {
  const gradients = {
    pegasys: 'linear-gradient(135deg, rgba(28,79,145,0.25) 0%, rgba(229,167,46,0.12) 100%)',
    techex: 'linear-gradient(135deg, rgba(235,104,52,0.22) 0%, rgba(13,27,51,0.92) 100%)',
    jagdamba: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(124,58,237,0.06) 100%)',
  };

  const labels = {
    pegasys: { title: 'Pegasys', sub: 'Healthcare Regulatory Advisory Platform' },
    techex: { title: 'TechEx AI', sub: 'Shopify Plus & Digital Commerce Agency' },
    jagdamba: { title: 'Jagdamba Palace', sub: 'Furniture Business & E-Commerce Platform' },
  };

  const urls = {
    pegasys: 'pegasys-health-care-consultancy.vercel.app',
    techex: 'www.techexai.com',
    jagdamba: 'jagdamba-palace.vercel.app',
  };

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: 300,
      background: gradients[type] || gradients.techex,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1rem',
      position: 'relative',
      padding: '1.5rem',
    }}>
      {/* Mock browser chrome */}
      <div style={{
        width: '88%', background: 'var(--bg-primary)',
        borderRadius: '12px', border: '1px solid var(--border)',
        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
      }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.75rem', display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginLeft: '0.5rem', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
              {urls[type] || 'www.techexai.com'}
            </span>
          </div>
        </div>

        {type === 'pegasys' && (
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f2c45a', letterSpacing: '0.05em' }}>
                PEGASYS MEDTECH
              </span>
              <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 10, background: 'rgba(229,167,46,0.15)', color: '#f2c45a' }}>
                CDSCO / IVD / SaMD
              </span>
            </div>
            <div style={{ height: 13, background: 'var(--border)', borderRadius: 4, width: '75%' }} />
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
              {['Science', 'Regulation', 'Evidence', 'Approval'].map((step, idx) => (
                <div key={step} style={{ flex: 1, padding: '4px', background: 'rgba(28,79,145,0.25)', border: '1px solid rgba(242,196,90,0.2)', borderRadius: 6, textAlign: 'center' }}>
                  <span style={{ fontSize: '0.58rem', color: '#93c5fd', display: 'block' }}>0{idx + 1}</span>
                  <span style={{ fontSize: '0.6rem', color: '#fff', fontWeight: 600 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'techex' && (
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EB6834', letterSpacing: '0.05em' }}>
                TECHEX <span style={{ color: '#fff' }}>AI</span>
              </span>
              <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 10, background: 'rgba(235,104,52,0.15)', color: '#EB6834' }}>
                Shopify Plus · Headless
              </span>
            </div>
            <div style={{ height: 13, background: 'var(--border)', borderRadius: 4, width: '70%' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.2rem' }}>
              {[
                { val: '10K+', lbl: 'Stores Built' },
                { val: '3X', lbl: 'Avg Growth' },
                { val: '98%', lbl: 'Satisfaction' },
              ].map(stat => (
                <div key={stat.lbl} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(235,104,52,0.2)', borderRadius: 6, padding: '0.4rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#EB6834', fontWeight: 700, display: 'block' }}>{stat.val}</span>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>{stat.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'jagdamba' && (
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.05em' }}>
                JAGDAMBA FURNITURE
              </span>
              <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 10, background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                ● Store Live
              </span>
            </div>
            <div style={{ height: 13, background: 'var(--border)', borderRadius: 4, width: '65%' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.2rem' }}>
              {['Sofas', 'Beds', 'Decor'].map(item => (
                <div key={item} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.4rem', textAlign: 'center' }}>
                  <div style={{ height: 26, background: 'rgba(124,58,237,0.15)', borderRadius: 4, marginBottom: '0.3rem' }} />
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
        {labels[type]?.sub}
      </p>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.76, 0, 0.24, 1] } }),
};

export default function Work() {
  const [activeModal, setActiveModal] = useState(null);

  const activeProject = projects.find(p => p.id === activeModal);

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="work-header">
          <SectionHeading
            label="Work"
            title="Selected Work"
            subtitle="A selection of projects I've designed, developed and deployed."
          />
        </div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              onClick={() => setActiveModal(project.id)}
              style={{ marginBottom: '1.5rem' }}
            >
              <div className="project-card-inner">
                {/* Info */}
                <div className="project-info">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="project-category">{project.category}</span>
                      <span className="project-num">{project.num}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.shortDesc}</p>
                  </div>
                  <div>
                    <div className="project-tags" style={{ marginBottom: '1.25rem' }}>
                      {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          <ExternalLink size={12} /> LIVE PROJECT
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          <GitBranch size={12} /> GITHUB
                        </a>
                      )}
                      <button className="project-link" style={{ background: 'none', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setActiveModal(project.id); }}>
                        DETAILS <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="project-visual">
                  <div className="project-visual-inner">
                    <ProjectVisual type={project.visual} />
                  </div>
                  <div className="project-overlay">
                    <span className="project-overlay-text">VIEW PROJECT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
