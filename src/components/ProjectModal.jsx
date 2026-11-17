import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, ArrowRight } from 'lucide-react';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const contentVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.25 } },
};

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div className="modal-inner" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
          <button className="modal-close" onClick={onClose}>
            <X size={14} /> CLOSE
          </button>

          <div className="modal-meta">
            <span className="tag">{project.category}</span>
            <span className="tag">{project.num}</span>
          </div>

          <h1 className="modal-title">{project.title}</h1>

          <p className="modal-desc">{project.overview}</p>

          <div className="project-tags" style={{ marginBottom: '2.5rem' }}>
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <p className="modal-section-title">The Challenge</p>
          <p className="modal-detail">{project.challenge}</p>

          <p className="modal-section-title">The Solution</p>
          <p className="modal-detail">{project.solution}</p>

          <p className="modal-section-title">My Role</p>
          <p className="modal-detail">{project.role}</p>

          <p className="modal-section-title">Key Features</p>
          <ul className="modal-features">
            {project.features.map((f) => <li key={f}>{f}</li>)}
          </ul>

          <div className="modal-links">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Project <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                GitHub <GitBranch size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
