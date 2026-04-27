import { useEffect, useState } from 'react';
import bodyMapBg from '../../assets/bella-bodymap-bg-v2.jpg';

type Hotspot = {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  tooltipDirection: 'left' | 'right';
};

// Positions are percentages of the original 1536×1024 image (no crop, since the
// inner screen is also 3:2). Re-anchored to the actual body parts in the photo.
const HOTSPOTS: Hotspot[] = [
  { id: 'back',    title: 'תמיכה בגב',       description: 'תמיכה בעמוד השדרה והגב התחתון',      position: { top: '31%', left: '70%' }, tooltipDirection: 'left'  },
  { id: 'hips',    title: 'תמיכה באגן',      description: 'יישור נכון של האגן והירכיים',         position: { top: '36%', left: '50%' }, tooltipDirection: 'right' },
  { id: 'belly',   title: 'תמיכה בבטן',      description: 'הקלה על תחושת המשקל',                 position: { top: '33%', left: '56%' }, tooltipDirection: 'left'  },
  { id: 'knees',   title: 'תמיכה בברכיים',  description: 'יישור נכון בין הרגליים',              position: { top: '60%', left: '32%' }, tooltipDirection: 'right' },
  { id: 'ankles',  title: 'תמיכה בקרסוליים', description: 'הפחתת נפיחות והרמה עדינה',            position: { top: '43%', left: '14%' }, tooltipDirection: 'right' },
];

type Phase = 'idle' | 'approach' | 'clicked' | 'release';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1400,
  approach: 1000,
  clicked: 1700,
  release: 850,
};

const ZOOM_BETWEEN = 1.18;
const ZOOM_IN = 1.5;

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

  // Phase machine
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

  // Click "press" pulse — fires at the start of clicked + release (= two distinct clicks per hotspot)
  useEffect(() => {
    if (phase === 'clicked' || phase === 'release') {
      setClickPulse(true);
      const t = setTimeout(() => setClickPulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const activeHotspot = HOTSPOTS[hotspotIdx];
  const isShowingTooltip = phase === 'clicked';

  const scale =
    phase === 'idle' ? 1 : phase === 'clicked' ? ZOOM_IN : ZOOM_BETWEEN;

  const cursorTarget =
    phase === 'idle' ? { top: '50%', left: '48%' } : activeHotspot.position;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f1eae2]">
      {/* Camera — image + dots scale together; transform-origin pinned to active hotspot
          so the active hotspot stays at its container-relative % through the zoom */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${activeHotspot.position.left} ${activeHotspot.position.top}`,
          transition: `transform 850ms ${EASING}, transform-origin 850ms ${EASING}`,
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

        {/* Hotspots — inverse-scaled so they remain a constant on-screen size */}
        {HOTSPOTS.map((h, i) => {
          const isActive = i === hotspotIdx && phase === 'clicked';
          return (
            <div
              key={h.id}
              className="absolute"
              style={{ top: h.position.top, left: h.position.left }}
            >
              <div
                className="relative"
                style={{
                  transform: `translate(-50%, -50%) scale(${1 / scale})`,
                  transition: `transform 850ms ${EASING}`,
                }}
              >
                {!isActive && (
                  <span
                    className="absolute -inset-[3px] rounded-full bg-white/30 animate-ping pointer-events-none"
                    style={{
                      animationDuration: '3.2s',
                      animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                    }}
                  />
                )}

                <span
                  className={`absolute -inset-[5px] rounded-full border border-[#2b2a28]/35 transition-all duration-300 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                />

                <div className="relative w-[18px] h-[18px] rounded-full bg-gradient-to-b from-white to-[#f6f4f1] border border-white/75 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.06),0_2px_5px_rgba(0,0,0,0.20)] flex items-center justify-center">
                  <span
                    className={`block w-[5px] h-[5px] rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-[#2b2a28]' : 'bg-[#2b2a28]/65'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Glass tooltip — outside camera (screen-space) */}
      <div
        className={`absolute w-[132px] rounded-[10px] border border-white/55 bg-gradient-to-b from-white/65 to-white/45 backdrop-blur-xl shadow-[0_10px_28px_rgba(43,42,40,0.22),0_2px_6px_rgba(43,42,40,0.10)] px-3 py-2.5 transition-all duration-300 ease-out pointer-events-none z-30 ${
          isShowingTooltip ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          top: activeHotspot.position.top,
          left:
            activeHotspot.tooltipDirection === 'right'
              ? `calc(${activeHotspot.position.left} + 18px)`
              : `calc(${activeHotspot.position.left} - 150px)`,
          transform: `translateY(-50%) ${
            isShowingTooltip
              ? 'translateX(0)'
              : activeHotspot.tooltipDirection === 'right'
                ? 'translateX(-6px)'
                : 'translateX(6px)'
          }`,
          direction: 'rtl',
        }}
      >
        <p className="text-[10.5px] font-semibold text-[#2b2a28] leading-tight tracking-tight mb-1">
          {activeHotspot.title}
        </p>
        <p className="text-[9.5px] text-[#2b2a28]/65 leading-[1.45]">
          {activeHotspot.description}
        </p>
      </div>

      {/* Virtual cursor — screen-space; tip lands on active hotspot's % position */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorTarget.top,
          left: cursorTarget.left,
          transform: `translate(-3px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          transition: `top 850ms ${EASING}, left 850ms ${EASING}, transform 200ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>

      {/* Inner screen edge highlight */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/15 z-50" />
    </div>
  );
}
