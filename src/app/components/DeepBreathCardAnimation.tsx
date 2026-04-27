import { useEffect, useState } from 'react';
import deepbreathHome from '../../assets/deepbreath-home.png';
import deepbreathDashboard from '../../assets/deepbreath-dashboard.png';

// Home PNG: 555×1024 (aspect 0.542). In 3:2 container scaled to width:
//   image height = container_w / 0.542 = 1.846 × container_w
//   container height = 0.667 × container_w
//   image overflows vertically; visible portion = 36.1% of image height
const HOME_RATIO = (1024 / 555) / (2 / 3); // 2.769
const HOME_VISIBLE = 100 / HOME_RATIO;     // 36.1

// Dashboard PNG: 310×1024 (aspect 0.303). Even taller relative to width.
const DASH_RATIO = (1024 / 310) / (2 / 3); // 4.952
const DASH_VISIBLE = 100 / DASH_RATIO;     // 20.2

// Cards row on home, in image y%: section "השאלון בידיים שלך" sits roughly at y=40-50%
const HOME_CARDS_Y = 30; // scrollPct that puts the cards row near top-center of viewport
const DASH_SCROLL_TARGET = 14; // small downward nudge on the dashboard

const EASING = 'cubic-bezier(0.45, 0, 0.55, 1)';

type Phase =
  | 'idle'
  | 'scrollToCards'
  | 'cursorEnterCarousel'
  | 'cursorPanLeft'
  | 'cursorClickCard'
  | 'crossfadeToDash'
  | 'dashIdle'
  | 'dashScrollDown'
  | 'dashHold';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1100,
  scrollToCards: 1700,
  cursorEnterCarousel: 700,
  cursorPanLeft: 1700,
  cursorClickCard: 220,
  crossfadeToDash: 480,
  dashIdle: 900,
  dashScrollDown: 1700,
  dashHold: 1500,
};

const STEPS: Phase[] = [
  'idle',
  'scrollToCards',
  'cursorEnterCarousel',
  'cursorPanLeft',
  'cursorClickCard',
  'crossfadeToDash',
  'dashIdle',
  'dashScrollDown',
  'dashHold',
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
  const [homeScrollPct, setHomeScrollPct] = useState(0);
  const [dashScrollPct, setDashScrollPct] = useState(0);
  // Horizontal carousel pan: 0 = right (RTL start), 100 = left (RTL end)
  const [carouselPan, setCarouselPan] = useState(0);

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
          if (p === 'idle') {
            setHomeScrollPct(0);
            setDashScrollPct(0);
            setCarouselPan(0);
          } else if (p === 'scrollToCards') {
            setHomeScrollPct(HOME_CARDS_Y);
          } else if (p === 'cursorPanLeft') {
            setCarouselPan(100);
          } else if (p === 'dashScrollDown') {
            setDashScrollPct(DASH_SCROLL_TARGET);
          }
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

  const showHome = phase === 'idle' || phase === 'scrollToCards' ||
                   phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft' ||
                   phase === 'cursorClickCard';
  const showDash = phase === 'crossfadeToDash' || phase === 'dashIdle' ||
                   phase === 'dashScrollDown' || phase === 'dashHold';

  // Cursor target — in CONTAINER coords (% of card)
  // For RTL carousel: start at right edge (x≈90%), pan to left edge (x≈10%)
  const carouselCursorX = 90 - carouselPan * 0.8;       // 90 → 10
  const carouselCursorY = 50;                            // middle of card row in viewport
  const dashboardCardX = 16;                             // approximate "Dashboard" card x in carousel after pan

  let cursorTarget: { x: number; y: number } | null = null;
  if (phase === 'idle' || phase === 'scrollToCards') {
    cursorTarget = { x: 50, y: 50 };
  } else if (phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft') {
    cursorTarget = { x: carouselCursorX, y: carouselCursorY };
  } else if (phase === 'cursorClickCard') {
    cursorTarget = { x: dashboardCardX, y: carouselCursorY };
  }

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'cursorClickCard';

  const cursorPos = cursorTarget
    ? { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` }
    : { left: '50%', top: '50%' };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Home — full image scrolling vertically */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: showHome ? 1 : 0, transition: `opacity ${PHASE_DURATIONS.crossfadeToDash}ms ease-out` }}
      >
        <img
          src={deepbreathHome}
          alt="Deep Breath — homepage"
          className="absolute inset-x-0 top-0 w-full select-none"
          draggable={false}
          style={{
            transform: `translateY(${-homeScrollPct * HOME_RATIO}%)`,
            transition: `transform ${PHASE_DURATIONS.scrollToCards}ms ${EASING}`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Dashboard */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: showDash ? 1 : 0, transition: `opacity ${PHASE_DURATIONS.crossfadeToDash}ms ease-out` }}
      >
        <img
          src={deepbreathDashboard}
          alt="Deep Breath — dashboard"
          className="absolute inset-x-0 top-0 w-full select-none"
          draggable={false}
          style={{
            transform: `translateY(${-dashScrollPct * DASH_RATIO}%)`,
            transition: `transform ${PHASE_DURATIONS.dashScrollDown}ms ${EASING}`,
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
          transform: `translate(-2px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          opacity: cursorVisible ? 1 : 0,
          transition: `top ${PHASE_DURATIONS.cursorPanLeft}ms ${EASING}, left ${PHASE_DURATIONS.cursorPanLeft}ms ${EASING}, transform 200ms ease-out, opacity 240ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
