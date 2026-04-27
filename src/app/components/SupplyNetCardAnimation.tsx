import { useEffect, useState } from 'react';
import searchEmptyState from '../../assets/supplynet-search-empty.png';
import searchResultsState from '../../assets/supplynet-search-results.png';

type Phase = 'empty' | 'zoomIn' | 'typing' | 'pauseAfterTyping' | 'zoomOut' | 'results';

const QUERY = 'sprinkler systems';

// Search input position in the empty PNG (% of image, image is object-cover top).
// Center of the input field is the zoom origin.
const SEARCH_INPUT = {
  // Box that masks the placeholder (slightly inside the input frame).
  maskLeft: '11.4%',
  maskTop: '40.5%',
  maskWidth: '21.8%',
  maskHeight: '3.6%',
  // Where the typed text starts (after the search icon).
  textPaddingLeft: '4%',
};

const ZOOM = 2.6;
const ZOOM_ORIGIN_X = '22.4%'; // center of search input
const ZOOM_ORIGIN_Y = '42.3%';

const TYPING_MS = 70;

const PHASE_DURATIONS = {
  empty: 1300,
  zoomIn: 700,
  pauseAfterTyping: 450,
  zoomOut: 700,
  results: 2400,
};

const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

export function SupplyNetCardAnimation() {
  const [phase, setPhase] = useState<Phase>('empty');
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
        setPhase('empty');
        setTypedLen(0);
        await wait(PHASE_DURATIONS.empty);
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
  // Results PNG fades in during zoom-out, stays for results phase.
  const showResults = phase === 'zoomOut' || phase === 'results';
  // Mask + typed text — visible during zoom-in (input "focus") and typing.
  // Hidden during zoom-out so the cross-fade reveals the real results state.
  const showTypingMask =
    phase === 'zoomIn' || phase === 'typing' || phase === 'pauseAfterTyping';
  const showCaret = phase === 'zoomIn' || phase === 'typing';

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${ZOOM_ORIGIN_X} ${ZOOM_ORIGIN_Y}`,
          transition: `transform ${PHASE_DURATIONS.zoomIn}ms ${EASING}`,
          willChange: 'transform',
        }}
      >
        <img
          src={searchEmptyState}
          alt="Supply Net — empty search"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        <img
          src={searchResultsState}
          alt="Supply Net — search results"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showResults ? 1 : 0,
            transition: 'opacity 320ms ease-out',
          }}
        />

        {/* Typing mask — covers the placeholder while we type our own query */}
        {showTypingMask && (
          <div
            className="absolute bg-white flex items-center"
            style={{
              left: SEARCH_INPUT.maskLeft,
              top: SEARCH_INPUT.maskTop,
              width: SEARCH_INPUT.maskWidth,
              height: SEARCH_INPUT.maskHeight,
              paddingLeft: SEARCH_INPUT.textPaddingLeft,
              fontSize: '6px',
              lineHeight: 1,
              color: '#131313',
            }}
          >
            <span>{QUERY.slice(0, typedLen)}</span>
            {showCaret && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.4px',
                  height: '0.85em',
                  background: '#131313',
                  marginLeft: '0.5px',
                  verticalAlign: 'middle',
                  animation: 'supplyNetCaret 0.85s steps(2) infinite',
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
