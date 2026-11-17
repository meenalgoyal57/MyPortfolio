import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mail, Phone, Link2, GitBranch, ExternalLink,
  CheckCircle2, AlertCircle, Loader2, SendHorizontal
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import { trackLeadSubmission, trackContactClick } from '../utils/analytics';

const contactInfo = [
  {
    label: 'Email',
    value: 'meenal486goyal@gmail.com',
    href: 'mailto:meenal486goyal@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+91 97287 30231',
    href: 'tel:+919728730231',
    icon: Phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/meenal-goyal',
    href: 'https://linkedin.com/in/meenal-goyal',
    icon: Link2,
  },
  {
    label: 'GitHub',
    value: 'github.com/meenalgoyal57',
    href: 'https://github.com/meenalgoyal57',
    icon: GitBranch,
  },
  {
    label: 'Upwork',
    value: 'Available on Upwork',
    href: '#',
    icon: ExternalLink,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', projectType: '', budget: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      trackLeadSubmission(form);
      setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
      setTimeout(() => setStatus('idle'), 10000);
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setStatusMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading
          label="Contact"
          title="Let's talk."
          subtitle="Tell me about your project."
        />

        <div className="contact-grid">
          {/* Contact info */}
          <div className="contact-info">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith('http');
              return (
                <motion.div
                  key={item.label}
                  className="contact-detail"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                >
                  <p className="contact-detail-label">
                    <Icon size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="contact-detail-value"
                  >
                    {item.value}
                  </a>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                padding: '1.5rem',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: 12,
                marginTop: '1rem',
              }}
            >
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-light)', fontWeight: 600, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                ● Currently available
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Open to freelance projects, collaborations and full-time opportunities.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  className="form-select"
                  value={form.projectType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select type</option>
                  <option value="website">Website Development</option>
                  <option value="fullstack">Full Stack App</option>
                  <option value="wordpress">WordPress</option>
                  <option value="redesign">UI Redesign</option>
                  <option value="seo-ads">SEO & Google Ads Campaigns</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="budget">Budget</label>
                <select
                  id="budget"
                  name="budget"
                  className="form-select"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select range</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1500">$500 – $1,500</option>
                  <option value="1500-5000">$1,500 – $5,000</option>
                  <option value="5000+">$5,000+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <MagneticButton
                className="btn btn-primary"
                strength={0.3}
                type="submit"
                disabled={status === 'submitting'}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {status === 'submitting' ? (
                    <>
                      SENDING... <Loader2 size={14} className="spin-slow" />
                    </>
                  ) : (
                    <>
                      SEND MESSAGE <Send size={14} />
                    </>
                  )}
                </span>
              </MagneticButton>

              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Direct Telegram notification
              </span>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.9rem 1.15rem',
                    borderRadius: 10,
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '0.15rem' }}>Message Sent!</strong>
                    <span>Your inquiry has been forwarded directly to Meenal's Telegram. You will receive a response soon.</span>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.9rem 1.15rem',
                    borderRadius: 10,
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{statusMsg || 'Unable to send message. Please verify backend is running or contact directly via email.'}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
