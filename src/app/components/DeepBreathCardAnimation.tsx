import { useEffect, useState } from 'react';
import deepbreathHome from '../../assets/deepbreath-home.png';
import deepbreathDashboard from '../../assets/deepbreath-dashboard.png';

// Frames pulled from canvas 335:3290 — the TWO leftmost in the canvas:
//   335:5866 "Home • Desktop"     1280×2311 → exported 568×1024
//   335:7020 "דשבורד • Desktop"   1280×2431 → exported 540×1024
// (Older 335:5207/335:3888 frames at x=0/1599 weren't actually leftmost —
//  the real leftmost two sit at x=-28208 / x=-26818 in the canvas.)
const HOME_RATIO = (1024 / 568) / (2 / 3); // 2.703
const HOME_VISIBLE = 100 / HOME_RATIO;     // 37.0

const DASH_RATIO = (1024 / 540) / (2 / 3); // 2.846
const DASH_VISIBLE = 100 / DASH_RATIO;     // 35.1

// Section geometry from Figma metadata for the new (correct) frames:
//   HOME (335:5866) children:
//     y=0-533    (0-23.1%)  Header
//     y=533-954  (23.1-41.3%) CTA — hero block with photo + video play
//     y=954-1706 (41.3-73.8%) Layout — "השליטה בידיים שלך" cards/carousel
//     y=1706-2311 (73.8-100%) Footer
//   DASHBOARD (335:7020) children:
//     y=0-437    (0-18.0%)   Header (with "בית" nav link)
//     y=437-477  (18.0-19.6%) Info+Indicator (70% progress bar)
//     y=477-538  (19.6-22.1%) Section Title ("דשבורד")
//     y=538-1786 (22.1-73.5%) Group 76 — charts, stats, timeline
//     y=1786-2431 (73.5-100%) Footer
const HOME_FOOTER_Y = 73.8;
const DASH_FOOTER_Y = 73.5;
const HOME_MAX_SCROLL = HOME_FOOTER_Y - HOME_VISIBLE;   // 36.8 — never exceed this
const DASH_MAX_SCROLL = DASH_FOOTER_Y - DASH_VISIBLE;   // 38.4 — never exceed this

// Targets:
const HOME_CAROUSEL_SCROLL = 36;          // shows the Layout/section3 nicely, footer just clipped off
const HOME_DASH_CARD_IMG_Y = 30;          // estimated y for the Dashboard card on home
const DASH_HOME_NAV_IMG_Y = 2.5;          // top header on dashboard ("בית" nav)
const DASH_END_SCROLL = DASH_MAX_SCROLL;  // scroll dashboard end-of-content (footer clipped)

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
            setHomeScroll(HOME_CAROUSEL_SCROLL);
          } else if (p === 'cursorPanLeft') {
            setCarouselPan(60);
          } else if (p === 'scrollBackToTop') {
            setHomeScroll(0);
            setCarouselPan(0);
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
  const carouselCursorY = imgToCardY(HOME_CAROUSEL_SCROLL + HOME_VISIBLE / 2, homeScroll, HOME_VISIBLE);
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
            transform: `translateY(${-homeScroll}%)`,
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
