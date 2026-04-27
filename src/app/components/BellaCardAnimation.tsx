import { useEffect, useState } from 'react';
import bodyMapBg from '../../assets/bella-bodymap-bg-v2.jpg';

type Hotspot = {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  tooltipDirection: 'left' | 'right';
};

const HOTSPOTS: Hotspot[] = [
  { id: 'back', title: 'תמיכה בגב', description: 'תמיכה בעמוד השדרה ובאזור הגב התחתון', position: { top: '24%', left: '70%' }, tooltipDirection: 'left' },
  { id: 'hips', title: 'תמיכה באגן', description: 'יישור נכון של האגן והירכיים', position: { top: '34%', left: '47%' }, tooltipDirection: 'right' },
  { id: 'belly', title: 'תמיכה בבטן', description: 'הקלה על תחושת המשקל', position: { top: '32%', left: '56%' }, tooltipDirection: 'right' },
  { id: 'knees', title: 'תמיכה בברכיים', description: 'יישור נכון בין הרגליים', position: { top: '62%', left: '36%' }, tooltipDirection: 'right' },
  { id: 'ankles', title: 'תמיכה בקרסוליים', description: 'הפחתת נפיחות והרמה עדינה', position: { top: '44%', left: '14%' }, tooltipDirection: 'right' },
];

type Phase = 'idle' | 'approach' | 'clicked' | 'release';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1500,
  approach: 1100,
  clicked: 1700,
  release: 900,
};

const ZOOM_BETWEEN = 1.2;
const ZOOM_IN = 1.55;

function CursorIcon() {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.28))' }}
    >
      <path
        d="M2 1 L19 14 L11 14 L7 22 L2 1 Z"
        fill="white"
        stroke="#131313"
        strokeWidth="1.6"
        strokeLinejoin="round"
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

  // Brief click "press" pulse at the start of clicked + release phases
  useEffect(() => {
    if (phase === 'clicked' || phase === 'release') {
      setClickPulse(true);
      const t = setTimeout(() => setClickPulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const activeHotspot = HOTSPOTS[hotspotIdx];
  const isShowingTooltip = phase === 'clicked';

  // Scale: idle=1.0 (full wide, only at start), clicked=ZOOM_IN, otherwise ZOOM_BETWEEN
  const scale =
    phase === 'idle' ? 1 : phase === 'clicked' ? ZOOM_IN : ZOOM_BETWEEN;

  // Cursor target in % of container
  const cursorTarget =
    phase === 'idle' ? { top: '52%', left: '48%' } : activeHotspot.position;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f1eae2]">
      {/* Zoom container — image + hotspot dots scale together */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${activeHotspot.position.left} ${activeHotspot.position.top}`,
          transition:
            'transform 800ms cubic-bezier(0.22,1,0.36,1), transform-origin 1000ms cubic-bezier(0.45,0.05,0.55,0.95)',
        }}
      >
        <img
          src={bodyMapBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.04]" />

        {HOTSPOTS.map((h) => (
          <div
            key={h.id}
            className="absolute"
            style={{
              top: h.position.top,
              left: h.position.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span
              className="absolute inset-0 -m-0.5 rounded-full bg-white/30 animate-ping pointer-events-none"
              style={{
                animationDuration: '2.8s',
                animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
              }}
            />
            <div className="relative w-4 h-4 rounded-full border border-white/60 bg-white/90 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.18)] flex items-center justify-center">
              <span className="block w-1 h-1 rounded-full bg-[#2b2a28]/75" />
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip — outside the zoom container, screen-space */}
      <div
        className={`absolute w-[140px] px-3 py-2 rounded-lg border border-white/55 bg-white/55 backdrop-blur-md shadow-[0_6px_20px_rgba(43,42,40,0.20)] transition-all duration-300 ease-out pointer-events-none z-30 ${
          isShowingTooltip ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          top: activeHotspot.position.top,
          left:
            activeHotspot.tooltipDirection === 'right'
              ? `calc(${activeHotspot.position.left} + 22px)`
              : `calc(${activeHotspot.position.left} - 162px)`,
          transform: `translateY(-50%) ${
            isShowingTooltip
              ? 'translateX(0)'
              : activeHotspot.tooltipDirection === 'right'
                ? 'translateX(-4px)'
                : 'translateX(4px)'
          }`,
          direction: 'rtl',
        }}
      >
        <p className="text-[10px] font-semibold text-[#131313] mb-0.5 leading-tight">
          {activeHotspot.title}
        </p>
        <p className="text-[9px] text-[rgba(19,19,19,0.75)] leading-snug">
          {activeHotspot.description}
        </p>
      </div>

      {/* Virtual cursor — screen-space, tweens between hotspot positions */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorTarget.top,
          left: cursorTarget.left,
          transform: `translate(-2px, -1px) scale(${clickPulse ? 0.85 : 1})`,
          transition: `top ${
            phase === 'approach' ? 1050 : 500
          }ms cubic-bezier(0.45,0.05,0.55,0.95), left ${
            phase === 'approach' ? 1050 : 500
          }ms cubic-bezier(0.45,0.05,0.55,0.95), transform 180ms ease-out`,
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
