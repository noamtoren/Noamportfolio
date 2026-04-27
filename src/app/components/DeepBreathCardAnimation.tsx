import { useEffect, useState } from 'react';
import deepbreathHome from '../../assets/deepbreath-home.png';
import deepbreathDashboard from '../../assets/deepbreath-dashboard.png';

// Frames pulled from canvas 335:3290 — the TWO leftmost in the canvas:
//   335:5866 "Home • Desktop"     1280×2311 → exported 568×1024
//   335:7020 "דשבורד • Desktop"   1280×2431 → exported 540×1024
const HOME_RATIO = (1024 / 568) / (2 / 3); // 2.703
const HOME_VISIBLE = 100 / HOME_RATIO;     // 37.0

const DASH_RATIO = (1024 / 540) / (2 / 3); // 2.846
const DASH_VISIBLE = 100 / DASH_RATIO;     // 35.1

// Section geometry from Figma metadata:
//   HOME (335:5866) children:
//     y=0-533    (0-23.1%)  Header
//     y=533-954  (23.1-41.3%) CTA — hero block
//     y=954-1706 (41.3-73.8%) Layout — "השליטה בידיים שלך" carousel
//     y=1706-2311 (73.8-100%) Footer
//   DASHBOARD (335:7020) children:
//     y=0-437    (0-18.0%)   Header (with "בית" nav)
//     y=437-477  (18.0-19.6%) 70% indicator
//     y=477-538  (19.6-22.1%) Section title "דשבורד"
//     y=538-1786 (22.1-73.5%) Group 76 — main content
//     y=1786-2431 (73.5-100%) Footer
const HOME_FOOTER_Y = 73.8;
const DASH_FOOTER_Y = 73.5;
const HOME_MAX_SCROLL = HOME_FOOTER_Y - HOME_VISIBLE;   // 36.8
const DASH_MAX_SCROLL = DASH_FOOTER_Y - DASH_VISIBLE;   // 38.4

// Scroll target that puts the carousel ("השליטה בידיים שלך") in the viewport
// without leaking the footer.
const HOME_CAROUSEL_SCROLL = 36;

// Dashboard nav "בית" position in image %, derived from metadata for the
// nav-Link cluster inside Header / Container / Content / Column:
//   Column abs (472, 42); rightmost Link at relative (269, 13), w=65, h=32 →
//   abs center ≈ (773.5, 71). In a 1280×2431 frame: (60.4%, 2.9%).
const DASH_HOME_NAV_IMG_X = 60.4;
const DASH_HOME_NAV_IMG_Y = 2.9;

// Dashboard end-of-content scroll target.
const DASH_END_SCROLL = DASH_MAX_SCROLL;

const EASING = 'cubic-bezier(0.45, 0, 0.55, 1)';

function imgToCardY(imgY: number, scrollPct: number, visiblePct: number): number {
  return ((imgY - scrollPct) / visiblePct) * 100;
}

type Phase =
  | 'idle'
  | 'scrollToCarousel'
  | 'cursorEnterCarousel'
  | 'cursorPanLeft'
  | 'clickDashCard'
  | 'crossfadeToDash'
  | 'dashIdle'
  | 'dashScrollDown'
  | 'dashHold'
  | 'dashScrollUp'
  | 'cursorToHomeNav'
  | 'clickHomeNav'
  | 'crossfadeToHome';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1000,
  scrollToCarousel: 1700,
  cursorEnterCarousel: 700,
  cursorPanLeft: 1300,
  clickDashCard: 220,
  crossfadeToDash: 480,
  dashIdle: 800,
  dashScrollDown: 2200,
  dashHold: 900,
  dashScrollUp: 2000,
  cursorToHomeNav: 800,
  clickHomeNav: 220,
  crossfadeToHome: 480,
};

const STEPS: Phase[] = [
  'idle',
  'scrollToCarousel',
  'cursorEnterCarousel',
  'cursorPanLeft',
  'clickDashCard',
  'crossfadeToDash',
  'dashIdle',
  'dashScrollDown',
  'dashHold',
  'dashScrollUp',
  'cursorToHomeNav',
  'clickHomeNav',
  'crossfadeToHome',
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
  const [homeScroll, setHomeScroll] = useState(0);
  const [dashScroll, setDashScroll] = useState(0);
  // Horizontal carousel pan in pseudo-image-x % (cursor moves from right to left)
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
          if (p === 'idle' || p === 'crossfadeToHome') {
            setHomeScroll(0);
            setDashScroll(0);
            setCarouselPan(0);
          } else if (p === 'scrollToCarousel') {
            setHomeScroll(HOME_CAROUSEL_SCROLL);
          } else if (p === 'cursorPanLeft') {
            setCarouselPan(60);
          } else if (p === 'dashScrollDown') {
            setDashScroll(DASH_END_SCROLL);
          } else if (p === 'dashScrollUp') {
            setDashScroll(0);
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

  const onHome = phase === 'idle' || phase === 'scrollToCarousel' ||
                 phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft' ||
                 phase === 'clickDashCard' || phase === 'crossfadeToHome';
  const onDash = phase === 'crossfadeToDash' || phase === 'dashIdle' ||
                 phase === 'dashScrollDown' || phase === 'dashHold' ||
                 phase === 'dashScrollUp' || phase === 'cursorToHomeNav' ||
                 phase === 'clickHomeNav';

  // Carousel cursor X: enters from RTL start (right, x=85%) and pans left to ~25%
  const carouselCursorX = 85 - carouselPan;
  // Carousel cursor Y: middle of the carousel row in the viewport. Carousel
  // section spans image y=41.3–73.8. With scroll=36, top-of-viewport is at
  // image y=36, so center of viewport (50% container y) is at image y≈54.5%
  // — close to the middle of the carousel.
  const carouselCursorY = 70; // container y%, near vertical middle of carousel band

  // "בית" nav on dashboard at scroll=0
  const dashHomeNavCardY = imgToCardY(DASH_HOME_NAV_IMG_Y, dashScroll, DASH_VISIBLE);

  let cursorTarget: { x: number; y: number } | null = null;
  if (phase === 'idle' || phase === 'scrollToCarousel') {
    cursorTarget = { x: 50, y: 50 };
  } else if (phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft') {
    cursorTarget = { x: carouselCursorX, y: carouselCursorY };
  } else if (phase === 'clickDashCard') {
    // Click happens at the cursor's last carousel position
    cursorTarget = { x: carouselCursorX, y: carouselCursorY };
  } else if (phase === 'dashIdle' || phase === 'dashScrollDown' ||
             phase === 'dashHold' || phase === 'dashScrollUp') {
    cursorTarget = { x: 50, y: 50 };
  } else if (phase === 'cursorToHomeNav' || phase === 'clickHomeNav') {
    cursorTarget = { x: DASH_HOME_NAV_IMG_X, y: dashHomeNavCardY };
  }

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'clickDashCard' || phase === 'clickHomeNav';

  const cursorPos = cursorTarget
    ? { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` }
    : { left: '50%', top: '50%' };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Home */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: onHome ? 1 : 0, transition: `opacity ${PHASE_DURATIONS.crossfadeToDash}ms ease-out` }}
      >
        <img
          src={deepbreathHome}
          alt="Deep Breath — homepage"
          className="absolute inset-x-0 top-0 w-full select-none"
          draggable={false}
          style={{
            transform: `translateY(${-homeScroll}%)`,
            transition: `transform ${PHASE_DURATIONS.scrollToCarousel}ms ${EASING}`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Dashboard */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: onDash ? 1 : 0, transition: `opacity ${PHASE_DURATIONS.crossfadeToDash}ms ease-out` }}
      >
        <img
          src={deepbreathDashboard}
          alt="Deep Breath — dashboard"
          className="absolute inset-x-0 top-0 w-full select-none"
          draggable={false}
          style={{
            transform: `translateY(${-dashScroll}%)`,
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
