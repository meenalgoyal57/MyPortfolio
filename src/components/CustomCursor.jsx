import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const viewRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const [mode, setMode] = useState('default'); // default | button | view

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        const offset = mode === 'view' ? 40 : 18;
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`;
      }
      if (viewRef.current) {
        viewRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 8}px)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    // hover targets
    const addHoverListeners = () => {
      document.querySelectorAll('button, a, .btn, .magnetic-btn').forEach((el) => {
        el.addEventListener('mouseenter', () => setMode('button'));
        el.addEventListener('mouseleave', () => setMode('default'));
      });
      document.querySelectorAll('.project-visual').forEach((el) => {
        el.addEventListener('mouseenter', () => setMode('view'));
        el.addEventListener('mouseleave', () => setMode('default'));
      });
    };

    // slight delay to allow DOM to render
    const timer = setTimeout(addHoverListeners, 800);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      clearTimeout(timer);
    };
  }, [mode]);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${mode === 'button' ? 'expanded' : ''} ${mode === 'view' ? 'view-mode' : ''}`}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10000, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-light)', transition: 'width .2s, height .2s' }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${mode === 'button' ? 'expanded' : ''} ${mode === 'view' ? 'view-mode' : ''}`}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, width: mode === 'view' ? 80 : mode === 'button' ? 60 : 36, height: mode === 'view' ? 80 : mode === 'button' ? 60 : 36, borderRadius: '50%', border: `1.5px solid rgba(167,139,250,${mode === 'view' ? 0.6 : 0.4})`, background: mode === 'view' ? 'rgba(124,58,237,0.12)' : 'transparent', transition: 'width .35s cubic-bezier(.76,0,.24,1), height .35s cubic-bezier(.76,0,.24,1), border-color .2s, background .2s' }}
      />
      <div
        ref={viewRef}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10001, fontFamily: 'var(--font-display)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent-light)', textTransform: 'uppercase', opacity: mode === 'view' ? 1 : 0, transition: 'opacity .2s' }}
      >
        VIEW
      </div>
    </>
  );
}
