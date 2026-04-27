import { useEffect, useState } from 'react';
import searchEmptyState from '../../assets/supplynet-search-empty.png';
import searchResultsState from '../../assets/supplynet-search-results.png';

const QUERY = 'sprinkler systems';

// All coordinates are % of the rendered card. Pixel-sampled from the empty
// PNG (3024×2070), then converted to container-% (image aspect 1.461 vs
// container 1.5 → image_y * 1.0262).
//   Search input white box: image y=750-820 → container y=37.2-40.6
//   Search icon at image x≈9%; placeholder text starts at image x≈12%.
// Zoom origin sits at the start of the input so the input stays in view and
// the cursor "click" lands on the search-icon side; the typed text grows
// rightward into the input.
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
  results: 2400,
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
  | 'results';

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
  const showResults = phase === 'zoomOut' || phase === 'results';
  // Mask covers the placeholder from click onward, hidden once we cross-fade
  // to the results PNG (which already has the typed query baked in).
  const showMask =
    phase === 'click' ||
    phase === 'focused' ||
    phase === 'zoomIn' ||
    phase === 'typing' ||
    phase === 'pauseAfterTyping';
  const showCaret =
    phase === 'focused' || phase === 'zoomIn' || phase === 'typing';
  const cursorAtSearch = phase !== 'idle';
  const cursorVisible =
    phase === 'idle' ||
    phase === 'cursorMove' ||
    phase === 'click' ||
    phase === 'focused';
  const clickPulse = phase === 'click';

  const cursorPos = cursorAtSearch
    ? { left: `${SEARCH_INPUT.clickX}%`, top: `${SEARCH_INPUT.clickY}%` }
    : { left: '70%', top: '70%' };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Camera — scales toward the start of the search input */}
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

        {/* White mask + typed text — covers the placeholder when the input
            "gets focus" so the original placeholder is gone, and we type our
            own query in its place. */}
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

      {/* Cursor — screen space, sits at the zoom origin so it stays glued to
          the input regardless of scale. */}
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
