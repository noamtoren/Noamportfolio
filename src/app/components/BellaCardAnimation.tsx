import { useEffect, useState } from 'react';
import bodyMapBg from '../../assets/bella-bodymap-bg-v2.jpg';

type Hotspot = {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  tooltipDirection: 'left' | 'right';
};

// Reprojected from the case study's 16:9 positions back to the original 3:2
// image coords (the home card frame is 3:2 — image fills exactly, no crop).
// orig_y = case_y * 0.844 + 7.79; X stays unchanged.
const HOTSPOTS: Hotspot[] = [
  { id: 'back',    title: 'תמיכה בגב',       description: 'תמיכה בעמוד השדרה ובאזור הגב התחתון', position: { top: '16.7%', left: '59.5%' }, tooltipDirection: 'right' },
  { id: 'hips',    title: 'תמיכה באגן',      description: 'יישור נכון של האגן והירכיים',         position: { top: '19.8%', left: '44.8%' }, tooltipDirection: 'right' },
  { id: 'belly',   title: 'תמיכה בבטן',      description: 'הקלה על תחושת המשקל',                 position: { top: '45.3%', left: '54.7%' }, tooltipDirection: 'right' },
  { id: 'knees',   title: 'תמיכה בברכיים',  description: 'יישור נכון בין הרגליים',              position: { top: '55.8%', left: '29.1%' }, tooltipDirection: 'right' },
  { id: 'ankles',  title: 'תמיכה בקרסוליים', description: 'הפחתת נפיחות והרמה עדינה',           position: { top: '25.9%', left: '13.4%' }, tooltipDirection: 'right' },
];

const STEP_DURATION = 2200;

export function BellaCardAnimation() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % HOTSPOTS.length);
    }, STEP_DURATION);
    return () => clearTimeout(t);
  }, [activeIdx]);

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#f1eae2]"
      dir="ltr"
    >
      <img
        src={bodyMapBg}
        alt="Pregnancy pillow feature highlights"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-out scale-[1.04]"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/[0.06]" />

      {HOTSPOTS.map((h, i) => {
        const isActive = i === activeIdx;
        return (
          <div
            key={h.id}
            className="absolute"
            style={{ top: h.position.top, left: h.position.left, zIndex: isActive ? 30 : 20 }}
          >
            {/* Soft steady halo */}
            <span className="absolute inset-0 -m-0.5 rounded-full bg-white/25 pointer-events-none" />
            {/* Slow gentle pulse */}
            <span
              className="absolute inset-0 -m-0.5 rounded-full bg-white/35 animate-ping pointer-events-none"
              style={{ animationDuration: '2.8s', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
            />

            {/* Hotspot dot */}
            <div
              className={`relative w-4 h-4 rounded-full border border-white/60 bg-white/90 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] flex items-center justify-center transition-transform duration-300 ease-out ${
                isActive ? 'scale-110' : ''
              }`}
            >
              <span className="block w-1 h-1 rounded-full bg-[#2b2a28]/70" />
            </div>

            {/* Glass tooltip */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${
                h.tooltipDirection === 'right' ? 'left-6' : 'right-6'
              } w-28 px-2 py-1.5 rounded-md border border-white/50 bg-white/40 backdrop-blur-md shadow-[0_4px_12px_rgba(43,42,40,0.18)] transition-all duration-200 pointer-events-none ${
                isActive ? 'opacity-100 translate-x-0' : `opacity-0 ${h.tooltipDirection === 'right' ? '-translate-x-1' : 'translate-x-1'}`
              }`}
              style={{ direction: 'rtl' }}
            >
              <p className="text-[8px] font-semibold text-[#131313] mb-0.5 leading-tight">
                {h.title}
              </p>
              <p className="text-[7px] text-[rgba(19,19,19,0.75)] leading-snug">
                {h.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
