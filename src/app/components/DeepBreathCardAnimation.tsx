import { useEffect, useState } from 'react';
import deepbreathHome from '../../assets/deepbreath-home.png';

// PNG dims: 555×1024 (aspect 0.542). Inside a 3:2 container scaled to width:
//   image scaled height = container_w / 0.542 ≈ 1.846 × container_w
//   container height = container_w × 2/3 ≈ 0.667 × container_w
//   ratio = 2.769 (image_h / container_h). Visible portion of image at any
//   time is 100/2.769 ≈ 36.1% of full image height.
const IMG_OVER_CONT = (1024 / 555) / (2 / 3);
const VISIBLE_PCT = 100 / IMG_OVER_CONT;

// Max scrollable portion (image y % at top of viewport when fully scrolled
// to the bottom). At 100% - VISIBLE_PCT we'd hit the bottom edge.
const SCROLL_MAX = 100 - VISIBLE_PCT;

const EASING = 'cubic-bezier(0.45, 0, 0.55, 1)';

type Phase =
  | 'idle'
  | 'scrollDown1' | 'scrollDown2' | 'scrollDown3'
  | 'pauseBottom'
  | 'scrollUp1'   | 'scrollUp2'   | 'scrollUp3'
  | 'topPause';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1300,
  scrollDown1: 1800,
  scrollDown2: 1800,
  scrollDown3: 1800,
  pauseBottom: 1100,
  scrollUp1: 1500,
  scrollUp2: 1500,
  scrollUp3: 1500,
  topPause: 700,
};

const STEPS: Phase[] = [
  'idle',
  'scrollDown1', 'scrollDown2', 'scrollDown3',
  'pauseBottom',
  'scrollUp1', 'scrollUp2', 'scrollUp3',
  'topPause',
];

function CursorIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="dbCursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M3 1.8 L19.2 14.8 L11.6 15.4 L8.2 23.4 L3 1.8 Z"
        fill="white"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#dbCursorShadow)"
      />
    </svg>
  );
}

export function DeepBreathCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });

    async function run() {
      while (!cancelled) {
        for (const p of STEPS) {
          if (cancelled) return;
          setPhase(p);
          if (p === 'idle' || p === 'topPause') setScrollPct(0);
          else if (p === 'scrollDown1') setScrollPct(SCROLL_MAX * 0.33);
          else if (p === 'scrollDown2') setScrollPct(SCROLL_MAX * 0.66);
          else if (p === 'scrollDown3' || p === 'pauseBottom') setScrollPct(SCROLL_MAX);
          else if (p === 'scrollUp1') setScrollPct(SCROLL_MAX * 0.66);
          else if (p === 'scrollUp2') setScrollPct(SCROLL_MAX * 0.33);
          else if (p === 'scrollUp3') setScrollPct(0);
          await wait(PHASE_DURATIONS[p]);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Cursor floats at viewport center while reading
  const cursorPos = { left: '50%', top: '50%' };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={deepbreathHome}
          alt="Deep Breath — homepage"
          className="absolute inset-x-0 top-0 w-full select-none"
          draggable={false}
          style={{
            transform: `translateY(${-scrollPct * IMG_OVER_CONT}%)`,
            transition: `transform ${PHASE_DURATIONS.scrollDown1}ms ${EASING}`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Cursor */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorPos.top,
          left: cursorPos.left,
          transform: 'translate(-2px, -2px)',
          transition: `top 700ms ${EASING}, left 700ms ${EASING}`,
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
