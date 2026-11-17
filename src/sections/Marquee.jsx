import { techMarquee } from '../data/content';

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={`marquee-track ${reverse ? 'marquee-track--reverse' : ''}`}>
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-item-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-wrap">
        <MarqueeRow items={techMarquee} />
        <MarqueeRow items={[...techMarquee].reverse()} reverse />
      </div>
    </div>
  );
}
