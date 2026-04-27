import { useEffect, useState } from 'react';
import bodyMapBg from '../../assets/bella-bodymap-bg-v2.jpg';

type Hotspot = {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  tooltipDirection: 'left' | 'right';
};

// Percentages of the original 1536×1024 photo. Inner screen is 3:2 so positions
// land directly on the body parts. Values are derived from the case-study
// hotspots that already sit correctly, reprojected from the case-study's 16:9
// crop into the original-image (3:2) coordinate space.
const HOTSPOTS: Hotspot[] = [
  { id: 'back',    title: 'תמיכה בגב',       description: 'תמיכה בעמוד השדרה ובאזור הגב התחתון', position: { top: '28%', left: '70%' }, tooltipDirection: 'left'  },
  { id: 'hips',    title: 'תמיכה באגן',      description: 'יישור נכון של האגן והירכיים',          position: { top: '37%', left: '47%' }, tooltipDirection: 'right' },
  { id: 'belly',   title: 'תמיכה בבטן',      description: 'הקלה על תחושת המשקל',                  position: { top: '35%', left: '56%' }, tooltipDirection: 'left'  },
  { id: 'knees',   title: 'תמיכה בברכיים',  description: 'יישור נכון בין הרגליים',               position: { top: '60%', left: '36%' }, tooltipDirection: 'right' },
  { id: 'ankles',  title: 'תמיכה בקרסוליים', description: 'הפחתת נפיחות והרמה עדינה',            position: { top: '45%', left: '14%' }, tooltipDirection: 'right' },
];

type Phase = 'idle' | 'approach' | 'clicked' | 'release';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1300,
  approach: 950,
  clicked: 1900,
  release: 850,
};

// Single zoom value: identity at rest, modest zoom-in on click.
const ZOOM_IN = 1.3;

const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

function CursorIcon() {
  return (
    <svg
      width="22"
      height="26"
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

  // Two distinct cursor "presses" — first opens the tooltip, second closes it
  useEffect(() => {
    if (phase === 'clicked' || phase === 'release') {
      setClickPulse(true);
      const t = setTimeout(() => setClickPulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const activeHotspot = HOTSPOTS[hotspotIdx];

  // Scale: 1 everywhere except 'clicked' (zoom-in). No mid-pan zoom — origin only
  // changes during approach (when scale === 1, so the change is visually invisible).
  const scale = phase === 'clicked' ? ZOOM_IN : 1;
  const isShowingTooltip = phase === 'clicked';
  const cursorTarget =
    phase === 'idle' ? { top: '50%', left: '48%' } : activeHotspot.position;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f1eae2]">
      {/* Camera — origin pinned to active hotspot, only scales (never pans) */}
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
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.08] pointer-events-none" />

        {/* Hotspots + their tooltips. Each hotspot anchor is a zero-size point;
            the dot is inverse-scaled (constant on-screen size) and the tooltip
            scales with the camera (so the click "magnifies" it into legibility). */}
        {HOTSPOTS.map((h, i) => {
          const isActive = i === hotspotIdx && phase === 'clicked';
          // During clicked phase, fade out non-active hotspots so they don't
          // sit on top of the active hotspot's tooltip
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
                zIndex: isActive ? 25 : 10,
              }}
            >
              {/* Dot — inverse-scaled, fades out on non-active during clicked */}
              <div
                className="relative"
                style={{
                  transform: `translate(-50%, -50%) scale(${1 / scale})`,
                  transition: `transform 800ms ${EASING}, opacity 250ms ease-out`,
                  opacity: dotOpacity,
                }}
              >
                {!isActive && (
                  <span
                    className="absolute -inset-[3px] rounded-full bg-white pointer-events-none"
                    style={{
                      animation: 'bellaHotspotPulse 2.6s ease-out infinite',
                    }}
                  />
                )}

                <div className="relative w-[16px] h-[16px] rounded-full bg-white border border-white/80 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <span
                    className={`block w-[4px] h-[4px] rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-[#2b2a28]' : 'bg-[#2b2a28]/70'
                    }`}
                  />
                </div>
              </div>

              {/* Tooltip — inside the camera, scales with zoom-in. Sits at z 30 so
                  it always lifts above any other hotspot dot at the same depth. */}
              <div
                className={`absolute rounded-[8px] border border-white/55 bg-gradient-to-b from-white/70 to-white/50 backdrop-blur-md shadow-[0_4px_14px_rgba(43,42,40,0.22),0_1px_3px_rgba(43,42,40,0.10)] px-2.5 py-2 transition-[opacity,transform] duration-300 ease-out pointer-events-none z-30 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  top: '50%',
                  width: '116px',
                  ...(h.tooltipDirection === 'right'
                    ? { left: '24px' }
                    : { right: '24px' }),
                  transform: `translateY(-50%) ${
                    isActive
                      ? 'translateX(0)'
                      : h.tooltipDirection === 'right'
                        ? 'translateX(-3px)'
                        : 'translateX(3px)'
                  }`,
                  direction: 'rtl',
                }}
              >
                <p className="text-[9px] font-semibold text-[#2b2a28] leading-tight tracking-tight mb-[3px]">
                  {h.title}
                </p>
                <p className="text-[8px] text-[#2b2a28]/70 leading-[1.4]">
                  {h.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Virtual cursor — screen-space; tip lands on active hotspot's % position */}
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
