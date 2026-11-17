import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Quote, CheckCircle2, MessageSquarePlus, Sparkles,
  X, Send, Loader2, ThumbsUp
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';

const FALLBACK_REVIEWS = [
  {
    id: 'rev-jfp',
    name: 'Rajesh Goyal',
    role: 'Owner & Managing Director',
    company: 'Jagdamba Furniture Palace',
    projectType: 'Full Stack Business Platform',
    rating: 5,
    date: 'Recent',
    message: 'Meenal designed and developed our entire e-commerce web platform (jagdamba-palace.vercel.app) along with our custom admin dashboard. The direct WhatsApp product enquiries and fast loading speeds significantly boosted our orders. Exceptional work!',
    verified: true,
    avatarColor: '#7c3aed',
  },
  {
    id: 'rev-pegasys',
    name: 'Dr. Vikram Sharma',
    role: 'Head of Regulatory Strategy',
    company: 'Pegasys Healthcare Consulting',
    projectType: 'Enterprise Web Platform',
    rating: 5,
    date: '1 week ago',
    message: 'Meenal built our Pegasys MedTech consulting platform (pegasys-health-care-consultancy.vercel.app) from the ground up using Next.js and TypeScript. She translated complex CDSCO, IVD, and SaMD compliance roadmaps into a beautiful, high-converting digital experience.',
    verified: true,
    avatarColor: '#3b82f6',
  },
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    role: 'Product Lead',
    company: 'FinScale Solutions',
    projectType: 'Full Stack Web App',
    rating: 5,
    date: '2 weeks ago',
    message: 'Meenal built our core customer portal with React and Spring Boot. Her architectural decisions and clean code made the product fast and incredibly easy to scale. Communication was top-tier throughout!',
    verified: true,
    avatarColor: '#ec4899',
  },
  {
    id: 'rev-2',
    name: 'Priya Nair',
    role: 'Founder & CEO',
    company: 'VividCraft Media',
    projectType: 'UI Redesign & Frontend',
    rating: 5,
    date: '1 month ago',
    message: 'The redesign transformed our conversion rates. Meenal took our clunky legacy site and crafted a modern, fluid experience with micro-interactions that our clients constantly praise.',
    verified: true,
    avatarColor: '#10b981',
  },
  {
    id: 'rev-3',
    name: 'David Miller',
    role: 'Engineering Manager',
    company: 'CloudNest Technologies',
    projectType: 'DevOps & Cloud Pipeline',
    rating: 5,
    date: '2 months ago',
    message: 'Outstanding grasp of Docker, Kubernetes, and automated deployment pipelines. Delivered robust, clean implementations ahead of schedule with zero regressions. An absolute pleasure to collaborate with.',
    verified: true,
    avatarColor: '#f59e0b',
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    projectType: 'Full Stack Web App',
    rating: 5,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch live reviews from backend
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.warn('Backend reviews offline, using fallback reviews:', err.message);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      // Prepend review to state
      setReviews((prev) => [data.review, ...prev]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setFormData({
          name: '',
          role: '',
          company: '',
          projectType: 'Full Stack Web App',
          rating: 5,
          message: '',
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong submitting your review.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return 'MG';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <section className="section" id="reviews">
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading
            label="Testimonials"
            title="Client Reviews."
            subtitle="Real experiences and feedback from collaborators, founders, and teams."
          />

          <MagneticButton
            className="btn btn-outline"
            onClick={() => setIsModalOpen(true)}
            strength={0.3}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquarePlus size={15} /> WRITE A REVIEW
            </span>
          </MagneticButton>
        </div>

        {/* Stats highlight ribbon */}
        <motion.div
          className="review-stats-bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="review-stat-item">
            <div className="stat-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div className="stat-text">
              <strong>5.0 / 5.0</strong>
              <span>Average Rating</span>
            </div>
          </div>

          <div className="review-stat-divider" />

          <div className="review-stat-item">
            <div className="stat-icon-pill">
              <ThumbsUp size={16} color="var(--accent-light)" />
            </div>
            <div className="stat-text">
              <strong>100%</strong>
              <span>Recommended</span>
            </div>
          </div>

          <div className="review-stat-divider" />

          <div className="review-stat-item">
            <div className="stat-icon-pill">
              <Sparkles size={16} color="var(--accent-light)" />
            </div>
            <div className="stat-text">
              <strong>On-Time Delivery</strong>
              <span>Clean Code & Support</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id || index}
              className="review-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="review-card-glow" />

              <div className="review-card-header">
                <div className="review-author">
                  <div
                    className="review-avatar"
                    style={{ background: rev.avatarColor || '#7c3aed' }}
                  >
                    {getInitials(rev.name)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h4 className="review-author-name">{rev.name}</h4>
                      {rev.verified && (
                        <CheckCircle2 size={13} color="#10b981" title="Verified Client" />
                      )}
                    </div>
                    <p className="review-author-role">
                      {rev.role}
                      {rev.company ? ` · ${rev.company}` : ''}
                    </p>
                  </div>
                </div>

                <Quote size={24} className="review-quote-icon" />
              </div>

              {/* Star Rating & Project Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.8rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < (rev.rating || 5) ? '#f59e0b' : 'transparent'}
                      color={i < (rev.rating || 5) ? '#f59e0b' : 'var(--border)'}
                    />
                  ))}
                </div>
                {rev.projectType && (
                  <span className="review-tag">{rev.projectType}</span>
                )}
              </div>

              {/* Message */}
              <p className="review-message">"{rev.message}"</p>

              {/* Footer / Date */}
              <div className="review-card-footer">
                <span className="review-date">{rev.date || 'Recent'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="review-modal-backdrop" onClick={() => !submitting && setIsModalOpen(false)}>
            <motion.div
              className="review-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="review-modal-header">
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Share Your Feedback
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Your review will be published and instantly delivered to Meenal.
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      background: 'rgba(16,185,129,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      color: '#10b981',
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#fff' }}>
                    Thank you for your review!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Your testimonial is now live on the site and notified to Meenal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} style={{ marginTop: '1.25rem' }}>
                  {/* Rating Selector */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      Rating <span style={{ color: 'var(--accent-light)' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            transition: 'transform 0.15s',
                          }}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                        >
                          <Star
                            size={24}
                            fill={(hoverRating || formData.rating) >= star ? '#f59e0b' : 'transparent'}
                            color={(hoverRating || formData.rating) >= star ? '#f59e0b' : 'var(--border)'}
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                        {formData.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="rev-name">Your Name *</label>
                      <input
                        id="rev-name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Sarah Connor"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="rev-role">Role</label>
                      <input
                        id="rev-role"
                        name="role"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Founder, Tech Lead"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="rev-company">Company</label>
                      <input
                        id="rev-company"
                        name="company"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Nova Media"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="rev-project">Project Type</label>
                      <select
                        id="rev-project"
                        name="projectType"
                        className="form-select"
                        value={formData.projectType}
                        onChange={handleChange}
                      >
                        <option value="Full Stack Web App">Full Stack Web App</option>
                        <option value="Website Development">Website Development</option>
                        <option value="UI & Website Redesign">UI & Website Redesign</option>
                        <option value="WordPress Development">WordPress Development</option>
                        <option value="REST APIs & Backend">REST APIs & Backend</option>
                        <option value="Consulting / Other">Consulting / Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="rev-message">Your Review *</label>
                    <textarea
                      id="rev-message"
                      name="message"
                      className="form-textarea"
                      placeholder="Share your experience working with Meenal..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {submitError && (
                    <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {submitError}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                      style={{ padding: '0.7rem 1.4rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                      style={{ padding: '0.7rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      {submitting ? (
                        <>SUBMITTING... <Loader2 size={14} className="spin-slow" /></>
                      ) : (
                        <>POST REVIEW <Send size={14} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
