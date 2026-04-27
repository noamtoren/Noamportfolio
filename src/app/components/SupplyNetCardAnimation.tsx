import { useEffect, useState } from 'react';

type Result = {
  supplier: string;
  price: string;
  groupBuy: 'join' | 'start';
};

const QUERY = 'sprinkler systems';

const RESULTS: Result[] = [
  { supplier: 'AcmeSupply',     price: '$20.00', groupBuy: 'start' },
  { supplier: 'BuildPro',       price: '$18.00', groupBuy: 'start' },
  { supplier: 'MetroMaterials', price: '$25.00', groupBuy: 'join'  },
  { supplier: 'CityIron',       price: '$13.00', groupBuy: 'join'  },
  { supplier: 'PrimeSource',    price: '$22.00', groupBuy: 'start' },
];

const TYPING_MS = 80;
const PRE_TYPE_DELAY = 600;
const POST_TYPE_DELAY = 380;
const ROW_STAGGER = 130;
const HOLD_MS = 2200;

function SearchIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#131313" strokeWidth="1.4" strokeOpacity="0.55" />
      <path d="m11 11 3 3" stroke="#131313" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

export function SupplyNetCardAnimation() {
  const [typedLen, setTypedLen] = useState(0);
  const [shownResults, setShownResults] = useState(0);

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
        setTypedLen(0);
        setShownResults(0);
        await wait(PRE_TYPE_DELAY);
        if (cancelled) return;

        for (let i = 1; i <= QUERY.length; i++) {
          setTypedLen(i);
          await wait(TYPING_MS);
          if (cancelled) return;
        }

        await wait(POST_TYPE_DELAY);
        if (cancelled) return;

        for (let i = 1; i <= RESULTS.length; i++) {
          setShownResults(i);
          await wait(ROW_STAGGER);
          if (cancelled) return;
        }

        await wait(HOLD_MS);
      }
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const typedText = QUERY.slice(0, typedLen);
  const isTyping = typedLen < QUERY.length;

  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex flex-col">
      {/* Wordmark bar */}
      <div className="px-3 py-1.5 border-b border-black/[0.06] flex items-center justify-between flex-shrink-0">
        <span className="text-[7px] tracking-[0.22em] font-semibold text-[#131313]">SUPPLY NET</span>
        <div className="flex items-center gap-2">
          <span className="text-[6px] tracking-wider text-[#131313]/40">HOME</span>
          <span className="text-[6px] tracking-wider text-[#131313]/40">PROJECTS</span>
          <span className="text-[6px] tracking-wider text-[#131313]/40">HELP</span>
        </div>
      </div>

      {/* Title row */}
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between flex-shrink-0">
        <h2 className="text-[11px] font-semibold text-[#131313] tracking-tight">
          {QUERY}
          {isTyping && (
            <span
              className="inline-block w-[1px] h-[10px] bg-[#131313] align-middle ml-[1px]"
              style={{ animation: 'supplyNetCaret 0.9s steps(2, end) infinite' }}
            />
          )}
        </h2>
        <div className="flex items-center gap-1">
          <span className="text-[6px] bg-[#131313] text-white px-1.5 py-[2px] rounded-[2px]">+ Add file</span>
          <span className="text-[6px] border border-[#131313]/20 text-[#131313] px-1.5 py-[2px] rounded-[2px]">PDF</span>
        </div>
      </div>

      {/* Search row */}
      <div className="px-3 pb-2 flex-shrink-0">
        <div className="rounded-[3px] bg-[#F2F0EC] px-2 py-1 flex items-center gap-1.5">
          <SearchIcon />
          <span className="text-[8px] text-[#131313] leading-none">
            {typedText || <span className="text-[#131313]/30">Search…</span>}
          </span>
        </div>
      </div>

      {/* Results header */}
      <div className="px-3 pb-1 grid grid-cols-[1fr_auto_56px] gap-x-2 text-[6px] uppercase tracking-[0.12em] text-[#131313]/45 flex-shrink-0">
        <span>Supplier</span>
        <span>Price</span>
        <span className="text-right">Group buy</span>
      </div>

      {/* Results rows */}
      <div className="flex-1 overflow-hidden">
        {RESULTS.map((r, i) => {
          const visible = i < shownResults;
          return (
            <div
              key={r.supplier}
              className="grid grid-cols-[1fr_auto_56px] gap-x-2 px-3 py-1 border-t border-black/[0.04] items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(3px)',
                transition: 'opacity 240ms ease-out, transform 240ms ease-out',
              }}
            >
              <span className="text-[8px] text-[#131313] truncate">{r.supplier}</span>
              <span className="text-[8px] text-[#131313] tabular-nums">{r.price}</span>
              <div className="flex justify-end">
                {r.groupBuy === 'join' ? (
                  <span className="text-[6px] font-medium bg-[#131313] text-white px-1.5 py-[3px] rounded-[2px] inline-flex items-center gap-0.5 leading-none whitespace-nowrap">
                    Join group <span className="text-[7px] leading-none">→</span>
                  </span>
                ) : (
                  <span className="text-[6px] font-medium bg-[#ECEEF0] text-[#131313]/40 px-1.5 py-[3px] rounded-[2px] leading-none whitespace-nowrap">
                    Start group
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
