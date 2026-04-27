import { useEffect, useState } from 'react';
import deepbreathHome from '../../assets/deepbreath-home.png';
import deepbreathDashboard from '../../assets/deepbreath-dashboard.png';

// Home PNG: 555×1024 (aspect 0.542). In 3:2 container scaled to width:
//   image height = container_w / 0.542 ≈ 1.846 × container_w
//   container height = 0.667 × container_w
//   ratio = 2.769 (image_h / container_h). Visible at any time = 36.1% of image.
const HOME_RATIO = (1024 / 555) / (2 / 3);
const HOME_VISIBLE = 100 / HOME_RATIO;

// Dashboard PNG: 310×1024 (aspect 0.303). Even taller per width.
//   ratio = 4.952. Visible = 20.2% of image at any time.
const DASH_RATIO = (1024 / 310) / (2 / 3);
const DASH_VISIBLE = 100 / DASH_RATIO;

// Visual targets (image y%) sampled visually from the PNGs:
//   HOME — Dashboard card sits in the welcome section just below hero (≈ 32%).
//          Section 3 ("השליטה בידיים שלך") is the third stripe down (≈ 55%).
//   DASHBOARD — "בית" nav link is in the top header (≈ 2%). The page bottom
//          (just above footer) is around y≈82%.
const HOME_DASH_CARD_IMG_Y = 32;
const HOME_SECTION3_IMG_Y = 55;
const DASH_HOME_NAV_IMG_Y = 2.5;
const DASH_END_IMG_Y = 80;

// Convert image y% to container y% given current scrollPct
function imgToCardY(imgY: number, scrollPct: number, visiblePct: number): number {
  return ((imgY - scrollPct) / visiblePct) * 100;
}

const EASING = 'cubic-bezier(0.45, 0, 0.55, 1)';

type Phase =
  | 'idle'
  | 'scrollToSection3'
  | 'cursorEnterCarousel'
  | 'cursorPanLeft'
  | 'scrollBackToTop'
  | 'cursorToDashCard'
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
  scrollToSection3: 1700,
  cursorEnterCarousel: 700,
  cursorPanLeft: 1500,
  scrollBackToTop: 1700,
  cursorToDashCard: 700,
  clickDashCard: 220,
  crossfadeToDash: 480,
  dashIdle: 800,
  dashScrollDown: 2200,
  dashHold: 900,
  dashScrollUp: 2000,
  cursorToHomeNav: 700,
  clickHomeNav: 220,
  crossfadeToHome: 480,
};

const STEPS: Phase[] = [
  'idle',
  'scrollToSection3',
  'cursorEnterCarousel',
  'cursorPanLeft',
  'scrollBackToTop',
  'cursorToDashCard',
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
          // Phase-specific state changes
          if (p === 'idle' || p === 'crossfadeToHome') {
            setHomeScroll(0);
            setDashScroll(0);
            setCarouselPan(0);
          } else if (p === 'scrollToSection3') {
            setHomeScroll(HOME_SECTION3_IMG_Y - HOME_VISIBLE / 2);
          } else if (p === 'cursorPanLeft') {
            setCarouselPan(60);
          } else if (p === 'scrollBackToTop') {
            setHomeScroll(0);
            setCarouselPan(0);
          } else if (p === 'dashScrollDown') {
            setDashScroll(DASH_END_IMG_Y - DASH_VISIBLE);
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

  const onHome = phase === 'idle' || phase === 'scrollToSection3' ||
                 phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft' ||
                 phase === 'scrollBackToTop' || phase === 'cursorToDashCard' ||
                 phase === 'clickDashCard' || phase === 'crossfadeToHome';
  const onDash = phase === 'crossfadeToDash' || phase === 'dashIdle' ||
                 phase === 'dashScrollDown' || phase === 'dashHold' ||
                 phase === 'dashScrollUp' || phase === 'cursorToHomeNav' ||
                 phase === 'clickHomeNav';

  // Cursor target — in CONTAINER coords (% of card)
  // Carousel cursor: enters from right (x=88%) and pans leftward
  const carouselCursorX = 88 - carouselPan * 0.6; // 88 → 28
  // Section 3 carousel row in viewport: image y=55% with current home scroll
  const carouselCursorY = imgToCardY(HOME_SECTION3_IMG_Y, homeScroll, HOME_VISIBLE);
  // Dashboard card on home: image y=32% at home top (scroll=0): container y=imgToCardY(32, 0, 36.1)
  const dashCardCardY = imgToCardY(HOME_DASH_CARD_IMG_Y, homeScroll, HOME_VISIBLE);
  // "Home" nav on dashboard: image y=2.5% at dash top (scroll=0)
  const homeNavCardY = imgToCardY(DASH_HOME_NAV_IMG_Y, dashScroll, DASH_VISIBLE);

  let cursorTarget: { x: number; y: number } | null = null;
  if (phase === 'idle' || phase === 'scrollToSection3' || phase === 'scrollBackToTop') {
    cursorTarget = { x: 50, y: 50 };
  } else if (phase === 'cursorEnterCarousel' || phase === 'cursorPanLeft') {
    cursorTarget = { x: carouselCursorX, y: carouselCursorY };
  } else if (phase === 'cursorToDashCard' || phase === 'clickDashCard') {
    cursorTarget = { x: 50, y: dashCardCardY };
  } else if (phase === 'dashIdle' || phase === 'dashScrollDown' ||
             phase === 'dashHold' || phase === 'dashScrollUp') {
    cursorTarget = { x: 50, y: 50 };
  } else if (phase === 'cursorToHomeNav' || phase === 'clickHomeNav') {
    cursorTarget = { x: 70, y: homeNavCardY };
  }

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'clickDashCard' || phase === 'clickHomeNav';

  const cursorPos = cursorTarget
    ? { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` }
    : { left: '50%', top: '50%' };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Home page */}
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
            transform: `translateY(${-homeScroll * HOME_RATIO}%)`,
            transition: `transform ${PHASE_DURATIONS.scrollToSection3}ms ${EASING}`,
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
            transform: `translateY(${-dashScroll * DASH_RATIO}%)`,
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
