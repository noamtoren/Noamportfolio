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
// Tooltip direction flips to 'left' when the dot sits on the right half so the
// tooltip stays inside the frame after zoom.
const HOTSPOTS: Hotspot[] = [
  { id: 'back',    title: 'תמיכה בגב',       description: 'תמיכה בעמוד השדרה ובאזור הגב התחתון', position: { top: '16.7%', left: '59.5%' }, tooltipDirection: 'left'  },
  { id: 'hips',    title: 'תמיכה באגן',      description: 'יישור נכון של האגן והירכיים',         position: { top: '19.8%', left: '44.8%' }, tooltipDirection: 'right' },
  { id: 'belly',   title: 'תמיכה בבטן',      description: 'הקלה על תחושת המשקל',                 position: { top: '45.3%', left: '54.7%' }, tooltipDirection: 'left'  },
  { id: 'knees',   title: 'תמיכה בברכיים',  description: 'יישור נכון בין הרגליים',              position: { top: '55.8%', left: '29.1%' }, tooltipDirection: 'right' },
  { id: 'ankles',  title: 'תמיכה בקרסוליים', description: 'הפחתת נפיחות והרמה עדינה',           position: { top: '25.9%', left: '13.4%' }, tooltipDirection: 'right' },
];

type Phase = 'idle' | 'approach' | 'clicked' | 'release';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 700,
  approach: 900,
  clicked: 2200,
  release: 700,
};

const ZOOM_IN = 1.4;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

function CursorIcon() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 22 26"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <filter id="bellaCursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M3 1.8 L19.2 14.8 L11.6 15.4 L8.2 23.4 L3 1.8 Z"
        fill="white"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#bellaCursorShadow)"
      />
    </svg>
  );
}

export function BellaCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hotspotIdx, setHotspotIdx] = useState(0);
  const [clickPulse, setClickPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (phase === 'idle') setPhase('approach');
      else if (phase === 'approach') setPhase('clicked');
      else if (phase === 'clicked') setPhase('release');
      else if (phase === 'release') {
        setHotspotIdx((idx) => (idx + 1) % HOTSPOTS.length);
        setPhase('approach');
      }
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, hotspotIdx]);

  // Two cursor "presses" — one at click, one at release (closes tooltip)
  useEffect(() => {
    if (phase === 'clicked' || phase === 'release') {
      setClickPulse(true);
      const t = setTimeout(() => setClickPulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const activeHotspot = HOTSPOTS[hotspotIdx];
  const scale = phase === 'clicked' ? ZOOM_IN : 1;
  const isShowingTooltip = phase === 'clicked';
  const cursorTarget =
    phase === 'idle' ? { top: '50%', left: '48%' } : activeHotspot.position;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f1eae2]" dir="ltr">
      {/* Camera — origin pinned to active hotspot, only scales (never pans).
          Origin can change during approach (scale === 1) without visual effect. */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${activeHotspot.position.left} ${activeHotspot.position.top}`,
          transition: `transform 800ms ${EASING}, transform-origin 600ms ${EASING}`,
          willChange: 'transform, transform-origin',
        }}
      >
        <img
          src={bodyMapBg}
          alt="Pregnancy pillow feature highlights"
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/[0.06]" />

        {/* Hotspots — anchor point is zero-size; dot inverse-scales so it stays
            constant on screen, tooltip scales with the camera so the click
            "magnifies" it into legibility. */}
        {HOTSPOTS.map((h, i) => {
          const isActive = i === hotspotIdx && isShowingTooltip;
          const dotOpacity =
            phase === 'clicked' && i !== hotspotIdx ? 0 : 1;
          return (
            <div
              key={h.id}
              className="absolute"
              style={{
                top: h.position.top,
                left: h.position.left,
                width: 0,
                height: 0,
                zIndex: isActive ? 30 : 20,
              }}
            >
              {/* Dot — inverse-scaled wrapper keeps screen size constant */}
              <div
                className="relative"
                style={{
                  transform: `translate(-50%, -50%) scale(${1 / scale})`,
                  transition: `transform 800ms ${EASING}, opacity 250ms ease-out`,
                  opacity: dotOpacity,
                }}
              >
                {/* Soft halo + slow pulse, hidden on the active dot during click */}
                {!isActive && (
                  <>
                    <span className="absolute inset-0 -m-0.5 rounded-full bg-white/25 pointer-events-none" />
                    <span
                      className="absolute inset-0 -m-0.5 rounded-full bg-white/35 animate-ping pointer-events-none"
                      style={{ animationDuration: '2.8s', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
                    />
                  </>
                )}

                <div
                  className={`relative w-4 h-4 rounded-full border border-white/60 bg-white/90 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] flex items-center justify-center transition-transform duration-300 ease-out ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  <span className="block w-1 h-1 rounded-full bg-[#2b2a28]/70" />
                </div>
              </div>

              {/* Glass tooltip — scales with camera (becomes readable on zoom) */}
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

      {/* Virtual cursor — screen-space; tip lands on active hotspot's % position.
          Pinned at the dot's % even during zoom because transformOrigin is on
          that same point, so the dot doesn't move on screen during scale. */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorTarget.top,
          left: cursorTarget.left,
          transform: `translate(-3px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          transition: `top 800ms ${EASING}, left 800ms ${EASING}, transform 200ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>

      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/15 z-50" />
    </div>
  );
}
