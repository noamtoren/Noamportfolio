import { useEffect, useState } from 'react';

const QUERY = 'sprinkler systems';

type Row = { unit: string; total: string; flex: string | null; groupBuy: 'join' | 'start' };

const ROWS: Row[] = [
  { unit: '$20.00', total: '$4,000.00', flex: null,        groupBuy: 'start' },
  { unit: '$18.00', total: '$3,600.00', flex: null,        groupBuy: 'start' },
  { unit: '$25.00', total: '$5,000.00', flex: '$4,500.00', groupBuy: 'join'  },
  { unit: '$20.00', total: '$4,000.00', flex: null,        groupBuy: 'start' },
  { unit: '$13.00', total: '$2,600.00', flex: '$2,100.00', groupBuy: 'join'  },
  { unit: '$20.00', total: '$4,000.00', flex: '$3,500.00', groupBuy: 'join'  },
  { unit: '$22.00', total: '$4,400.00', flex: null,        groupBuy: 'start' },
  { unit: '$24.00', total: '$4,800.00', flex: '$4,300.00', groupBuy: 'join'  },
];

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

const ZOOM = 1.8;
const ZOOM_ORIGIN = { x: '24%', y: '30%' };

const TYPING_MS = 70;

const PHASE_DURATIONS = {
  idle: 1000,
  cursorMove: 800,
  click: 200,
  focused: 280,
  zoomIn: 650,
  pauseAfterTyping: 450,
  zoomOut: 650,
  results: 2400,
};

const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

function CursorIcon() {
  return (
    <svg width="16" height="19" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
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

const SearchIcon = ({ size = 7 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="#131313" strokeWidth="1.4" strokeOpacity="0.55" />
    <path d="m11 11 3 3" stroke="#131313" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.55" />
  </svg>
);

const FilterIcon = ({ size = 6 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M4 8h8M6 12h4" stroke="#131313" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PlusIcon = ({ size = 6, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = ({ size = 6 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="#131313" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Caret({ heightEm = 0.85 }: { heightEm?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.7px',
        height: `${heightEm}em`,
        background: '#131313',
        marginLeft: '0.5px',
        verticalAlign: 'middle',
        animation: 'supplyNetCaret 0.85s steps(2) infinite',
      }}
    />
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

  const isInputFocused =
    phase === 'click' ||
    phase === 'focused' ||
    phase === 'zoomIn' ||
    phase === 'typing' ||
    phase === 'pauseAfterTyping';
  const isZoomed = phase === 'zoomIn' || phase === 'typing' || phase === 'pauseAfterTyping';
  const scale = isZoomed ? ZOOM : 1;
  const showResults = phase === 'zoomOut' || phase === 'results';
  const showCaret =
    phase === 'focused' ||
    phase === 'zoomIn' ||
    phase === 'typing' ||
    phase === 'pauseAfterTyping';
  const cursorAtSearch =
    phase !== 'idle';
  const cursorVisible =
    phase === 'idle' ||
    phase === 'cursorMove' ||
    phase === 'click' ||
    phase === 'focused' ||
    phase === 'zoomOut' ||
    phase === 'results';
  const clickPulse = phase === 'click';

  const cursorPos = cursorAtSearch ? { left: '24%', top: '30%' } : { left: '70%', top: '70%' };

  const renderTitle = (
    <div className="relative leading-tight">
      <div
        style={{
          opacity: showResults ? 0 : 1,
          transition: 'opacity 280ms ease-out',
        }}
      >
        <h2 className="text-[14px] font-semibold tracking-tight text-[#131313] whitespace-nowrap leading-tight">
          What are you looking for ?
        </h2>
        <p className="text-[7px] text-[#A0A6B8] mt-0.5">Find the best suppliers</p>
      </div>
      <h2
        className="absolute top-0 left-0 text-[14px] font-semibold tracking-tight text-[#131313] whitespace-nowrap leading-tight"
        style={{
          opacity: showResults ? 1 : 0,
          transition: 'opacity 280ms ease-out',
        }}
      >
        {QUERY}
      </h2>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-white overflow-hidden" dir="ltr">
      {/* Camera */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${ZOOM_ORIGIN.x} ${ZOOM_ORIGIN.y}`,
          transition: `transform ${PHASE_DURATIONS.zoomIn}ms ${EASING}`,
          willChange: 'transform',
        }}
      >
        {/* Top nav */}
        <div className="flex items-center justify-between px-2.5 pt-1.5 pb-1.5 border-b border-black/[0.06] flex-shrink-0">
          <span className="text-[5.5px] tracking-[0.2em] font-semibold text-[#131313]">SUPPLY NET</span>
          <div className="flex items-center gap-2.5">
            <span className="text-[5.5px] text-[#131313] font-medium">Home</span>
            <span className="text-[5.5px] text-[#131313]/40">projects</span>
            <span className="text-[5.5px] text-[#131313]/40">About Us</span>
            <span className="text-[5.5px] text-[#131313]/40">Help</span>
          </div>
          <span className="text-[5.5px] text-[#131313]/40">My Account</span>
        </div>

        {/* Title row */}
        <div className="px-2.5 pt-2 pb-1.5 flex items-start justify-between flex-shrink-0">
          {renderTitle}
          <div className="flex items-center gap-1">
            <span className="bg-[#131313] text-white text-[5.5px] font-medium px-1.5 py-1 rounded-[2px] flex items-center gap-1 leading-none">
              <PlusIcon size={5} /> Add a file
            </span>
            <span className="border border-[#131313]/15 text-[#131313] text-[5.5px] font-medium px-1.5 py-1 rounded-[2px] flex items-center gap-1 leading-none">
              <DownloadIcon size={5} /> Download PDF Report
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-2.5 flex items-center gap-3 border-b border-black/[0.06] flex-shrink-0">
          <span className="text-[6px] font-medium text-[#131313] border-b border-[#131313] py-1 -mb-px">Overview</span>
          <span className="text-[6px] text-[#131313]/40 py-1">History</span>
          <span className="text-[6px] text-[#131313]/40 py-1">Buying group</span>
        </div>

        {/* Search row */}
        <div className="px-2 py-1.5 bg-[#ECEEF0] flex-shrink-0">
          <div className="flex items-center gap-1">
            {/* Search input */}
            <div
              className={`flex-[2_1_0] flex items-center gap-1 bg-white px-1.5 py-1 rounded-[2px] transition-all duration-150 ${
                isInputFocused
                  ? 'ring-1 ring-[#131313]/35 shadow-[0_0_0_2px_rgba(19,19,19,0.06)]'
                  : 'ring-1 ring-transparent'
              }`}
            >
              <SearchIcon size={6} />
              <span className="text-[6px] leading-none text-[#131313] flex items-center min-h-[6px] flex-1 overflow-hidden whitespace-nowrap">
                {!isInputFocused && typedLen === 0 && !showResults ? (
                  <span className="text-[#131313]/30">Search for products</span>
                ) : (
                  <>
                    <span>{showResults ? QUERY : QUERY.slice(0, typedLen)}</span>
                    {showCaret && <Caret />}
                  </>
                )}
              </span>
            </div>

            {/* Quantity */}
            <div className="px-1.5 py-1 bg-white rounded-[2px] flex flex-col flex-1 min-w-0">
              <span className="text-[4.5px] text-[#A0A6B8] leading-none mb-[1px] truncate">Quantity</span>
              <span className="text-[6px] leading-none truncate">
                {showResults ? <span className="text-[#131313]">200</span> : <span className="text-[#A0A6B8]">Number</span>}
              </span>
            </div>

            {/* Date */}
            <div className="px-1.5 py-1 bg-white rounded-[2px] flex flex-col flex-1 min-w-0">
              <span className="text-[4.5px] text-[#A0A6B8] leading-none mb-[1px] truncate">Required delivery date</span>
              <span className="text-[6px] leading-none truncate">
                {showResults ? <span className="text-[#131313]">12/30/2025</span> : <span className="text-[#A0A6B8]">mm/dd/yyyy</span>}
              </span>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1 bg-white px-1.5 py-1 rounded-[2px]">
              <FilterIcon size={5} />
              <span className="text-[6px] text-[#131313]">Filter</span>
            </div>
          </div>
        </div>

        {/* Results table */}
        <div
          className="flex-1 overflow-hidden min-h-0"
          style={{
            opacity: showResults ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
        >
          <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.8fr_0.8fr_0.95fr] gap-1 px-2.5 py-1 text-[4.5px] uppercase tracking-[0.1em] text-[#A0A6B8] font-medium">
            <span>SUPPLIERS</span>
            <span>MAIL</span>
            <span>UNIT PRICE</span>
            <span>TOTAL PRICE</span>
            <span>FLEXIBLE PRICE</span>
            <span className="text-right">BUYING GROUP</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1.2fr_0.7fr_0.8fr_0.8fr_0.95fr] gap-1 px-2.5 py-[3px] border-t border-black/[0.04] items-center"
            >
              <span className="text-[5.5px] text-[#131313]">Business Name</span>
              <span className="text-[5.5px] text-[#131313]/70 truncate">example@email.com</span>
              <span className="text-[5.5px] text-[#131313] tabular-nums">{r.unit}</span>
              <span className="text-[5.5px] text-[#131313] tabular-nums">{r.total}</span>
              <span className="text-[5.5px] text-[#131313] tabular-nums">{r.flex || '-'}</span>
              <div className="flex justify-end">
                {r.groupBuy === 'join' ? (
                  <span className="text-[4.5px] font-medium bg-[#131313] text-white px-1.5 py-[2px] rounded-[2px] inline-flex items-center gap-0.5 leading-none whitespace-nowrap">
                    Join a group buy <span className="text-[5.5px] leading-none">→</span>
                  </span>
                ) : (
                  <span className="text-[4.5px] font-medium bg-[#ECEEF0] text-[#131313]/40 px-1.5 py-[2px] rounded-[2px] leading-none whitespace-nowrap">
                    Start a group buy
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor — screen space */}
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
