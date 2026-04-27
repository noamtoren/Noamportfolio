import { useEffect, useState } from 'react';
import intakeStart from '../../assets/machon-intake-start-3x2.png';
import intakeMid from '../../assets/machon-intake-mid-3x2.png';
import recommendation from '../../assets/machon-recommendation-3x2.png';

// Pixel-sampled CTA button centers on the cropped 1024×682 PNGs:
//   intake-start  "להתחיל בקצב שלי" green button: image x=857, y=472 → (83.7%, 69.2%)
//   intake-mid    "המשך" green button:           image x=675, y=517 → (65.9%, 75.8%)
const START_BUTTON = { x: 83.7, y: 69.2 };
const CONTINUE_BUTTON = { x: 65.9, y: 75.8 };

const ZOOM_START = 1.6;
const ZOOM_CONTINUE = 1.8;

const PHASE_DURATIONS = {
  idle: 1100,
  cursorToStart: 850,
  clickStart: 200,
  zoomInStart: 600,
  pauseAtStart: 380,
  zoomOutMid: 600,
  midHold: 1500,
  cursorToContinue: 750,
  clickContinue: 200,
  zoomInContinue: 600,
  pauseAtContinue: 380,
  zoomOutRec: 600,
  recHold: 2400,
};

const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Phase =
  | 'idle'
  | 'cursorToStart'
  | 'clickStart'
  | 'zoomInStart'
  | 'pauseAtStart'
  | 'zoomOutMid'
  | 'midHold'
  | 'cursorToContinue'
  | 'clickContinue'
  | 'zoomInContinue'
  | 'pauseAtContinue'
  | 'zoomOutRec'
  | 'recHold';

function CursorIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="machonCursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M3 1.8 L19.2 14.8 L11.6 15.4 L8.2 23.4 L3 1.8 Z"
        fill="white"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#machonCursorShadow)"
      />
    </svg>
  );
}

export function MachonChiburCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');

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
        const order: Phase[] = [
          'idle',
          'cursorToStart',
          'clickStart',
          'zoomInStart',
          'pauseAtStart',
          'zoomOutMid',
          'midHold',
          'cursorToContinue',
          'clickContinue',
          'zoomInContinue',
          'pauseAtContinue',
          'zoomOutRec',
          'recHold',
        ];
        for (const p of order) {
          if (cancelled) return;
          setPhase(p);
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

  // Which screen is on top
  const showMid =
    phase === 'zoomOutMid' ||
    phase === 'midHold' ||
    phase === 'cursorToContinue' ||
    phase === 'clickContinue' ||
    phase === 'zoomInContinue' ||
    phase === 'pauseAtContinue';
  const showRec = phase === 'zoomOutRec' || phase === 'recHold';

  // Camera zoom
  const isZoomedStart = phase === 'zoomInStart' || phase === 'pauseAtStart';
  const isZoomedContinue = phase === 'zoomInContinue' || phase === 'pauseAtContinue';
  const scale = isZoomedStart ? ZOOM_START : isZoomedContinue ? ZOOM_CONTINUE : 1;

  // Camera origin — pinned to whichever target is active; switches at zoom=1
  const useContinueOrigin =
    phase === 'cursorToContinue' ||
    phase === 'clickContinue' ||
    phase === 'zoomInContinue' ||
    phase === 'pauseAtContinue' ||
    phase === 'zoomOutRec' ||
    phase === 'recHold';
  const originX = useContinueOrigin ? CONTINUE_BUTTON.x : START_BUTTON.x;
  const originY = useContinueOrigin ? CONTINUE_BUTTON.y : START_BUTTON.y;

  // Cursor
  const cursorVisible =
    phase === 'idle' ||
    phase === 'cursorToStart' ||
    phase === 'clickStart' ||
    phase === 'zoomInStart' ||
    phase === 'pauseAtStart' ||
    phase === 'cursorToContinue' ||
    phase === 'clickContinue' ||
    phase === 'zoomInContinue' ||
    phase === 'pauseAtContinue';
  const clickPulse = phase === 'clickStart' || phase === 'clickContinue';

  let cursorPos: { left: string; top: string };
  if (phase === 'idle') {
    cursorPos = { left: '20%', top: '85%' };
  } else if (useContinueOrigin) {
    cursorPos = { left: `${CONTINUE_BUTTON.x}%`, top: `${CONTINUE_BUTTON.y}%` };
  } else {
    cursorPos = { left: `${START_BUTTON.x}%`, top: `${START_BUTTON.y}%` };
  }

  return (
    <div className="relative w-full h-full bg-[#f3efe6] overflow-hidden" dir="ltr">
      {/* Camera */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${originY}%`,
          transition: `transform ${PHASE_DURATIONS.zoomInStart}ms ${EASING}`,
          willChange: 'transform',
        }}
      >
        <img
          src={intakeStart}
          alt="Machon Chibur — intake start"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        <img
          src={intakeMid}
          alt="Machon Chibur — intake question"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showMid ? 1 : 0,
            transition: `opacity ${PHASE_DURATIONS.zoomOutMid}ms ease-out`,
          }}
        />
        <img
          src={recommendation}
          alt="Machon Chibur — personalized recommendations"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showRec ? 1 : 0,
            transition: `opacity ${PHASE_DURATIONS.zoomOutRec}ms ease-out`,
          }}
        />
      </div>

      {/* Cursor */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorPos.top,
          left: cursorPos.left,
          transform: `translate(-2px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          opacity: cursorVisible ? 1 : 0,
          transition: `top ${PHASE_DURATIONS.cursorToStart}ms ${EASING}, left ${PHASE_DURATIONS.cursorToStart}ms ${EASING}, transform 200ms ease-out, opacity 240ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
