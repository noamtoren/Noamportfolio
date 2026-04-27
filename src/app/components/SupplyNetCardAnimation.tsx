import { useEffect, useState } from 'react';
import searchEmptyState from '../../assets/supplynet-search-empty.png';
import searchResultsState from '../../assets/supplynet-search-results.png';
import buyingMatching from '../../assets/supplynet-buying-matching.png';

const QUERY = 'sprinkler systems';

// All coordinates are % of the rendered card. Pixel-sampled from the empty
// PNG (3024×2070), then converted to container-% (image aspect 1.461 vs
// container 1.5 → image_y * 1.0262).
//   Search input white box: image y=750-820 → container y=37.2-40.6
//   Search icon at image x≈9%; placeholder text starts at image x≈12%.
const SEARCH_INPUT = {
  clickX: 10,
  clickY: 39,
  // White mask that covers the "Search for products" placeholder text
  maskLeft: 11,
  maskTop: 37.4,
  maskWidth: 23.4,
  maskHeight: 3,
  // Where the typed text starts (offset within the mask, just after the icon)
  textPaddingLeft: 0.5,
};

// Topmost "Join a group buy" button on the results PNG, pixel-sampled and
// converted to container-%: x=2510-2850 (88.6% center), y=1305-1350 (64.1%
// image → 65.8% container).
const JOIN_BUTTON = { x: 88.6, y: 65.8 };

const ZOOM = 3;
const TYPING_MS = 75;

const PHASE_DURATIONS = {
  idle: 900,
  cursorMove: 750,
  click: 180,
  focused: 280,
  zoomIn: 700,
  pauseAfterTyping: 500,
  zoomOut: 700,
  results: 1900,
  cursorToJoin: 700,
  clickJoin: 180,
  matchingFade: 380,
  matching: 2400,
};

const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Phase =
  | 'idle'
  | 'cursorMove'
  | 'click'
  | 'focused'
  | 'zoomIn'
  | 'typing'
  | 'pauseAfterTyping'
  | 'zoomOut'
  | 'results'
  | 'cursorToJoin'
  | 'clickJoin'
  | 'matching';

function CursorIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="supplyCursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M3 1.8 L19.2 14.8 L11.6 15.4 L8.2 23.4 L3 1.8 Z"
        fill="white"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#supplyCursorShadow)"
      />
    </svg>
  );
}

export function SupplyNetCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedLen, setTypedLen] = useState(0);

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
        setPhase('idle');
        setTypedLen(0);
        await wait(PHASE_DURATIONS.idle);
        if (cancelled) return;

        setPhase('cursorMove');
        await wait(PHASE_DURATIONS.cursorMove);
        if (cancelled) return;

        setPhase('click');
        await wait(PHASE_DURATIONS.click);
        if (cancelled) return;

        setPhase('focused');
        await wait(PHASE_DURATIONS.focused);
        if (cancelled) return;

        setPhase('zoomIn');
        await wait(PHASE_DURATIONS.zoomIn);
        if (cancelled) return;

        setPhase('typing');
        for (let i = 1; i <= QUERY.length; i++) {
          setTypedLen(i);
          await wait(TYPING_MS);
          if (cancelled) return;
        }

        setPhase('pauseAfterTyping');
        await wait(PHASE_DURATIONS.pauseAfterTyping);
        if (cancelled) return;

        setPhase('zoomOut');
        await wait(PHASE_DURATIONS.zoomOut);
        if (cancelled) return;

        setPhase('results');
        await wait(PHASE_DURATIONS.results);
        if (cancelled) return;

        setPhase('cursorToJoin');
        await wait(PHASE_DURATIONS.cursorToJoin);
        if (cancelled) return;

        setPhase('clickJoin');
        await wait(PHASE_DURATIONS.clickJoin);
        if (cancelled) return;

        setPhase('matching');
        await wait(PHASE_DURATIONS.matching);
      }
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const isZoomed = phase === 'zoomIn' || phase === 'typing' || phase === 'pauseAfterTyping';
  const scale = isZoomed ? ZOOM : 1;
  const showResults =
    phase === 'zoomOut' ||
    phase === 'results' ||
    phase === 'cursorToJoin' ||
    phase === 'clickJoin';
  const showMatching = phase === 'matching';
  const showMask =
    phase === 'click' ||
    phase === 'focused' ||
    phase === 'zoomIn' ||
    phase === 'typing' ||
    phase === 'pauseAfterTyping';
  const showCaret =
    phase === 'focused' || phase === 'zoomIn' || phase === 'typing';
  const cursorVisible =
    phase === 'idle' ||
    phase === 'cursorMove' ||
    phase === 'click' ||
    phase === 'focused' ||
    phase === 'cursorToJoin' ||
    phase === 'clickJoin';
  const clickPulse = phase === 'click' || phase === 'clickJoin';

  let cursorPos: { left: string; top: string };
  if (phase === 'idle') {
    cursorPos = { left: '70%', top: '70%' };
  } else if (
    phase === 'cursorToJoin' ||
    phase === 'clickJoin' ||
    phase === 'matching'
  ) {
    cursorPos = { left: `${JOIN_BUTTON.x}%`, top: `${JOIN_BUTTON.y}%` };
  } else {
    cursorPos = { left: `${SEARCH_INPUT.clickX}%`, top: `${SEARCH_INPUT.clickY}%` };
  }

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Camera — scales toward the start of the search input during typing */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${SEARCH_INPUT.clickX}% ${SEARCH_INPUT.clickY}%`,
          transition: `transform ${PHASE_DURATIONS.zoomIn}ms ${EASING}`,
          willChange: 'transform',
        }}
      >
        <img
          src={searchEmptyState}
          alt="Supply Net — empty state"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        <img
          src={searchResultsState}
          alt="Supply Net — results state"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showResults ? 1 : 0,
            transition: 'opacity 320ms ease-out',
          }}
        />
        <img
          src={buyingMatching}
          alt="Supply Net — joined buying group"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showMatching ? 1 : 0,
            transition: `opacity ${PHASE_DURATIONS.matchingFade}ms ease-out`,
          }}
        />

        {/* White mask + typed text — wipes the "Search for products"
            placeholder once the input gains focus, then we type our own query. */}
        {showMask && (
          <div
            className="absolute bg-white flex items-center"
            style={{
              left: `${SEARCH_INPUT.maskLeft}%`,
              top: `${SEARCH_INPUT.maskTop}%`,
              width: `${SEARCH_INPUT.maskWidth}%`,
              height: `${SEARCH_INPUT.maskHeight}%`,
              paddingLeft: `${SEARCH_INPUT.textPaddingLeft}%`,
              fontSize: '4.5px',
              lineHeight: 1,
              color: '#131313',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            <span>{QUERY.slice(0, typedLen)}</span>
            {showCaret && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.7px',
                  height: '0.85em',
                  background: '#131313',
                  marginLeft: '0.3px',
                  verticalAlign: 'middle',
                  animation: 'supplyNetCaret 0.85s steps(2) infinite',
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Cursor — screen space, glued to whichever target is active */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorPos.top,
          left: cursorPos.left,
          transform: `translate(-2px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          opacity: cursorVisible ? 1 : 0,
          transition: `top ${PHASE_DURATIONS.cursorMove}ms ${EASING}, left ${PHASE_DURATIONS.cursorMove}ms ${EASING}, transform 200ms ease-out, opacity 240ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
