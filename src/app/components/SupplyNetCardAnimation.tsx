import { useEffect, useState } from 'react';
import searchEmptyState from '../../assets/supplynet-search-empty.png';
import searchResultsState from '../../assets/supplynet-search-results.png';

const EMPTY_HOLD = 1700;
const RESULTS_HOLD = 2800;
const FADE_MS = 550;

export function SupplyNetCardAnimation() {
  const [showResults, setShowResults] = useState(false);

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
        setShowResults(false);
        await wait(EMPTY_HOLD);
        if (cancelled) return;
        setShowResults(true);
        await wait(RESULTS_HOLD);
      }
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
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
          transition: `opacity ${FADE_MS}ms ease-out`,
        }}
      />
    </div>
  );
}
