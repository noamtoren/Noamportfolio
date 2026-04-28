import type { ReactNode } from 'react';
import kobePoster from '../../assets/kobe-poster.png';
import israelFlag from '../../assets/62542f660fa3bba0da99ce087f58a22bf4518361.png';

interface ShelfSceneProps {
  hoveredItem: string | null;
  setHoveredItem: (s: string | null) => void;
  vinylHovered: boolean;
  setVinylHovered: (v: boolean) => void;
  toggleItem: (s: string) => void;
  handleVinylClick: () => void;
  currentTime: string;
}

// ─── Tooltip primitive (kept consistent with the existing dark UI chip) ───
function Tooltip({
  visible,
  position,
  children,
}: {
  visible: boolean;
  position: 'above' | 'below' | 'left';
  children: ReactNode;
}) {
  if (!visible) return null;
  const base = {
    position: 'absolute' as const,
    background: 'rgba(23, 23, 23, 0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: 8,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '10px 16px',
    pointerEvents: 'none' as const,
    zIndex: 30,
    color: '#fff',
    fontSize: 13,
    lineHeight: 1.45,
    maxWidth: 240,
    whiteSpace: 'normal' as const,
  };
  const placement: Record<typeof position, React.CSSProperties> =
    position === 'above'
      ? {
          above: {
            bottom: '108%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'tooltipSlideUp 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          } as React.CSSProperties,
          below: {} as React.CSSProperties,
          left: {} as React.CSSProperties,
        }
      : position === 'below'
      ? {
          above: {} as React.CSSProperties,
          below: {
            top: '108%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'tooltipSlideDown 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          } as React.CSSProperties,
          left: {} as React.CSSProperties,
        }
      : {
          above: {} as React.CSSProperties,
          below: {} as React.CSSProperties,
          left: {
            right: '108%',
            top: '0%',
            animation: 'tooltipSlideUpLeft 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          } as React.CSSProperties,
        };
  return <div style={{ ...base, ...placement[position] }}>{children}</div>;
}

// ─── Reusable hotspot pulse (brass dot, runs 3 times then stops) ───
function HotspotPulse({ delay = 0 }: { delay?: number }) {
  return (
    <span
      aria-hidden
      className="hotspot-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

// ─── Live analog clock (hands rotate to currentTime) ───
function AnalogClock({ time, hovered }: { time: string; hovered: boolean }) {
  // Parse "hh:mm AM/PM" string to compute hand angles.
  let hourAngle = 0;
  let minuteAngle = 0;
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (m) {
    const hh = parseInt(m[1], 10) % 12;
    const mm = parseInt(m[2], 10);
    minuteAngle = mm * 6;
    hourAngle = hh * 30 + mm * 0.5;
  }
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Bezel */}
      <circle cx="50" cy="50" r="48" fill="#FAF7F2" stroke="#1A1715" strokeWidth="3" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="0.5" />
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const x1 = 50 + Math.sin(a) * 42;
        const y1 = 50 - Math.cos(a) * 42;
        const x2 = 50 + Math.sin(a) * 38;
        const y2 = 50 - Math.cos(a) * 38;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1A1715"
            strokeWidth={i % 3 === 0 ? 1.6 : 0.8}
            strokeLinecap="round"
          />
        );
      })}
      {/* Hands */}
      <g
        style={{
          transformOrigin: '50px 50px',
          transition: hovered ? 'transform 250ms ease-out' : 'transform 800ms ease-out',
        }}
      >
        {/* Hour */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="#1A1715"
          strokeWidth="2.6"
          strokeLinecap="round"
          style={{ transformOrigin: '50px 50px', transform: `rotate(${hourAngle}deg)` }}
        />
        {/* Minute */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#1A1715"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ transformOrigin: '50px 50px', transform: `rotate(${minuteAngle}deg)` }}
        />
        {/* Pin */}
        <circle cx="50" cy="50" r="2.4" fill="#B8915A" />
      </g>
    </svg>
  );
}

// ─── Vase + plant (white pot, green leaves) ───
function PottedPlant({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 60 80"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        overflow: 'visible',
        transformOrigin: '30px 80px',
        transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'rotate(1.5deg)' : 'rotate(0deg)',
      }}
    >
      {/* Trailing leaves above pot */}
      <g
        style={{
          transformOrigin: '30px 50px',
          animation: hovered ? 'plantSway 2.4s ease-in-out infinite' : 'none',
        }}
      >
        <path d="M30 48 C 22 36, 14 30, 12 18" stroke="#5A7340" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="11" cy="18" rx="4" ry="6" fill="#6E8A4E" transform="rotate(-30 11 18)" />
        <ellipse cx="16" cy="26" rx="3.2" ry="5" fill="#7A9655" transform="rotate(-25 16 26)" />
        <path d="M30 48 C 38 38, 46 30, 50 22" stroke="#5A7340" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="22" rx="3.6" ry="5.5" fill="#6E8A4E" transform="rotate(35 50 22)" />
        <ellipse cx="44" cy="30" rx="3" ry="4.6" fill="#7A9655" transform="rotate(28 44 30)" />
        <path d="M30 48 C 30 38, 30 30, 30 22" stroke="#5A7340" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="30" cy="20" rx="3.6" ry="6" fill="#6E8A4E" />
      </g>
      {/* Pot */}
      <path d="M16 50 L 14 78 L 46 78 L 44 50 Z" fill="#F5F0E8" stroke="#1A1715" strokeWidth="0.8" />
      <line x1="14" y1="54" x2="46" y2="54" stroke="rgba(0,0,0,0.10)" strokeWidth="0.5" />
    </svg>
  );
}

// ─── Anemone in narrow vase ───
function Anemone({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 50 90"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        overflow: 'visible',
      }}
    >
      {/* Vase */}
      <path d="M14 60 L 12 88 L 38 88 L 36 60 Z" fill="#F5F0E8" stroke="#1A1715" strokeWidth="0.8" />
      <ellipse cx="25" cy="60" rx="11" ry="2" fill="#FAF7F2" stroke="#1A1715" strokeWidth="0.6" />
      {/* Stem (sways at hover) */}
      <g
        style={{
          transformOrigin: '25px 60px',
          animation: hovered ? 'anemoneSway 1.8s ease-in-out infinite' : 'none',
        }}
      >
        <line x1="25" y1="60" x2="25" y2="22" stroke="#3F5828" strokeWidth="1.4" strokeLinecap="round" />
        {/* Flower head */}
        <g transform="translate(25 18)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-9"
              rx="4.5"
              ry="7.5"
              fill="#C32232"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="3" fill="#1A1715" />
          <circle cx="0" cy="0" r="1.4" fill="#5A4630" />
        </g>
      </g>
    </svg>
  );
}

// ─── Beret (red wool with crown stem) ───
function Beret({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 80 50"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        overflow: 'visible',
        transformOrigin: '40px 50px',
        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'rotate(-7deg) translateY(-1px)' : 'rotate(-2deg)',
      }}
    >
      {/* Crown stem */}
      <line x1="40" y1="6" x2="40" y2="14" stroke="#1A1715" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="40" cy="5" r="1.5" fill="#1A1715" />
      {/* Beret body — soft ellipse */}
      <ellipse cx="40" cy="28" rx="34" ry="16" fill="#9B2A2A" />
      <ellipse cx="40" cy="28" rx="34" ry="16" fill="url(#beretShade)" opacity="0.45" />
      {/* Headband */}
      <ellipse cx="40" cy="40" rx="20" ry="4" fill="#1A1715" />
      <ellipse cx="40" cy="38.5" rx="20" ry="3.6" fill="#7A1F1F" />
      <defs>
        <radialGradient id="beretShade" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#9B2A2A" stopOpacity="0" />
          <stop offset="100%" stopColor="#3A0F0F" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Basketball ───
function Basketball({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        overflow: 'visible',
        transformOrigin: '50px 100px',
        animation: hovered ? 'basketballBreath 1.6s ease-in-out infinite' : 'none',
      }}
    >
      {/* Ball with radial highlight */}
      <defs>
        <radialGradient id="ballHighlight" cx="0.35" cy="0.30" r="0.7">
          <stop offset="0%" stopColor="#F0A560" />
          <stop offset="55%" stopColor="#D9772C" />
          <stop offset="100%" stopColor="#9C4E14" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#ballHighlight)" />
      {/* Seams */}
      <line x1="6" y1="50" x2="94" y2="50" stroke="#1A1715" strokeWidth="1.6" />
      <line x1="50" y1="6" x2="50" y2="94" stroke="#1A1715" strokeWidth="1.6" />
      <path d="M14 18 C 30 38, 30 62, 14 82" stroke="#1A1715" strokeWidth="1.6" fill="none" />
      <path d="M86 18 C 70 38, 70 62, 86 82" stroke="#1A1715" strokeWidth="1.6" fill="none" />
      {/* Floor shadow */}
      <ellipse cx="50" cy="98" rx="36" ry="3" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ─── Brushes in wooden cup ───
function Brushes({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 60 110"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Brushes — slightly rotated, wiggle on hover */}
      <g
        style={{
          transformOrigin: '30px 60px',
          animation: hovered ? 'brushesWiggle 2s ease-in-out infinite' : 'none',
        }}
      >
        {[
          { x: 18, len: 50, color: '#9B2A2A', tilt: -6 },
          { x: 26, len: 58, color: '#1A1715', tilt: -2 },
          { x: 34, len: 54, color: '#B8915A', tilt: 4 },
          { x: 42, len: 48, color: '#5A7340', tilt: 8 },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x}, 65) rotate(${b.tilt})`}>
            {/* Wood handle */}
            <rect x="-2" y={-b.len} width="4" height={b.len - 12} fill="#A87B45" rx="1" />
            {/* Ferrule */}
            <rect x="-2.5" y={-b.len + (b.len - 18)} width="5" height="6" fill="#9C9C9C" />
            {/* Bristles */}
            <ellipse cx="0" cy={-b.len + 4} rx="3" ry="6" fill={b.color} />
          </g>
        ))}
      </g>
      {/* Cup */}
      <path d="M10 70 L 6 108 L 54 108 L 50 70 Z" fill="#A87B45" stroke="#1A1715" strokeWidth="0.6" />
      <ellipse cx="30" cy="70" rx="20.4" ry="3" fill="#8B5F2E" />
      <ellipse cx="30" cy="70" rx="20" ry="2.6" fill="#6E4A20" />
    </svg>
  );
}

// ─── Vinyl turntable (base + spinning disc + tonearm) ───
function VinylTurntable({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 160 80"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Wooden base */}
      <rect x="2" y="20" width="156" height="58" rx="3" fill="#5C3A1F" />
      <rect x="2" y="20" width="156" height="58" rx="3" fill="url(#wood)" opacity="0.7" />
      <line x1="2" y1="22" x2="158" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B4F2A" />
          <stop offset="100%" stopColor="#3E2614" />
        </linearGradient>
      </defs>
      {/* Disc — rotates while hovered */}
      <g
        style={{
          transformOrigin: '70px 50px',
          animation: hovered ? 'vinylSpin 2.8s linear infinite' : 'none',
        }}
      >
        <circle cx="70" cy="50" r="26" fill="#0A0A0A" />
        {/* Concentric grooves */}
        <circle cx="70" cy="50" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="70" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="70" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {/* Label */}
        <circle cx="70" cy="50" r="9" fill="#F5F0E8" />
        <circle cx="70" cy="50" r="9" fill="#B8915A" opacity="0.45" />
        <circle cx="70" cy="50" r="1" fill="#1A1715" />
      </g>
      {/* Tonearm */}
      <circle cx="138" cy="32" r="4" fill="#1A1715" />
      <line x1="138" y1="32" x2="92" y2="56" stroke="#2A2A2A" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="89" y="55" width="6" height="3" fill="#1A1715" rx="0.5" />
    </svg>
  );
}

// ─── Stacked books ───
function Books() {
  return (
    <svg
      viewBox="0 0 80 70"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Bottom big book — laying flat, blue */}
      <rect x="6" y="50" width="68" height="14" fill="#1F3A5F" />
      <rect x="6" y="50" width="68" height="2" fill="#2C4F7E" />
      <line x1="6" y1="60" x2="74" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
      {/* Middle book — cream */}
      <rect x="10" y="38" width="60" height="12" fill="#EFE9DD" />
      <rect x="10" y="38" width="60" height="2" fill="#F5F0E8" />
      <line x1="10" y1="46" x2="70" y2="46" stroke="rgba(0,0,0,0.10)" strokeWidth="0.4" />
      {/* Top book — terracotta */}
      <rect x="14" y="26" width="52" height="12" fill="#9B5239" />
      <rect x="14" y="26" width="52" height="2" fill="#B66B50" />
      <line x1="14" y1="34" x2="66" y2="34" stroke="rgba(0,0,0,0.10)" strokeWidth="0.4" />
      {/* Tiny standing book — brass spine */}
      <rect x="50" y="14" width="4" height="12" fill="#B8915A" />
      <rect x="54" y="14" width="3" height="12" fill="#F5F0E8" />
    </svg>
  );
}

// ─── Wooden shelf (the plank + 2 brackets) ───
function Shelf({ topPercent }: { topPercent: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: `${topPercent}%`,
        left: '4%',
        right: '4%',
        height: '14px',
        background: 'linear-gradient(180deg, #C99560 0%, #B07F4A 60%, #8E5F2C 100%)',
        boxShadow: '0 6px 14px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255,255,255,0.35)',
        borderRadius: '1px',
      }}
    >
      {/* Shelf grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 24px)',
          opacity: 0.5,
          mixBlendMode: 'multiply',
        }}
      />
      {/* Brackets */}
      {[18, 82].map((leftPct) => (
        <div
          key={leftPct}
          style={{
            position: 'absolute',
            top: '100%',
            left: `${leftPct}%`,
            width: '8px',
            height: '12px',
            background: '#1A1715',
            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
            transform: 'translateX(-50%)',
            borderRadius: '0 0 1px 1px',
          }}
        />
      ))}
    </div>
  );
}

// ─── The scene itself ───
export function ShelfScene({
  hoveredItem,
  setHoveredItem,
  vinylHovered,
  setVinylHovered,
  toggleItem,
  handleVinylClick,
  currentTime,
}: ShelfSceneProps) {
  const enter = (id: string) => () => setHoveredItem(id);
  const leave = () => setHoveredItem(null);

  return (
    <section className="px-8 py-12 relative overflow-hidden">
      {/* Wall — warm aged-paper cream, ties to the editorial palette */}
      <div className="absolute inset-0" style={{ background: '#F1ECE2' }} />

      <div className="max-w-[1080px] mx-auto relative">
        {/* Scene viewport — fixed aspect so positions are predictable */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: '1000 / 664',
            maxWidth: '880px',
            margin: '0 auto',
            background: '#FAF7F2',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04), 0 6px 30px rgba(0,0,0,0.06)',
            borderRadius: '4px',
          }}
        >
          {/* ── Wall structure ── */}
          {/* Top shelf */}
          <Shelf topPercent={48} />
          {/* Bottom shelf */}
          <Shelf topPercent={86} />

          {/* ── KOBE POSTER (real photo, framed) — top-left, leaning on top shelf ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              left: '8%',
              top: '8%',
              width: '24%',
              aspectRatio: '0.8',
              zIndex: 6,
              transition: 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1), filter 450ms ease',
              transform: hoveredItem === 'kobe' ? 'scale(1.035) translateY(-2px)' : 'none',
              filter:
                hoveredItem === 'kobe'
                  ? 'drop-shadow(0 12px 22px rgba(0,0,0,0.20)) drop-shadow(0 2px 4px rgba(0,0,0,0.10))'
                  : 'drop-shadow(0 4px 10px rgba(0,0,0,0.14)) drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
            }}
            onMouseEnter={enter('kobe')}
            onMouseLeave={leave}
            onClick={() => toggleItem('kobe')}
          >
            <HotspotPulse delay={0} />
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#1A1715',
                boxSizing: 'border-box',
                padding: '3%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#F5F0E8',
                  boxSizing: 'border-box',
                  padding: '6% 6% 13% 6%',
                  position: 'relative',
                }}
              >
                <img
                  src={kobePoster}
                  alt="Kobe Bryant"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '3%',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(9px, 1.1vw, 14px)',
                    lineHeight: 1,
                    color: '#1A1715',
                    letterSpacing: '0.04em',
                  }}
                >
                  Bryant
                </div>
              </div>
            </div>
            <Tooltip visible={hoveredItem === 'kobe'} position="above">
              <p style={{ margin: 0, fontWeight: 500 }}>
                "If you're afraid to fail, then you're probably going to fail."
              </p>
              <p
                style={{
                  margin: '4px 0 0',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 12,
                }}
              >
                — Kobe Bryant
              </p>
            </Tooltip>
          </div>

          {/* ── CLOCK (live analog) — top wall, centered ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              left: '46.5%',
              top: '8%',
              width: '12%',
              aspectRatio: '1',
              zIndex: 5,
            }}
            onMouseEnter={enter('clock')}
            onMouseLeave={leave}
            onClick={() => toggleItem('clock')}
          >
            <HotspotPulse delay={250} />
            <AnalogClock time={currentTime} hovered={hoveredItem === 'clock'} />
            <Tooltip visible={hoveredItem === 'clock'} position="below">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <img src={israelFlag} alt="" style={{ width: 14, height: 10 }} />
                <span style={{ fontWeight: 500 }}>{currentTime}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>· Tel Aviv</span>
              </span>
            </Tooltip>
          </div>

          {/* ── PLANT — top shelf, far right ── */}
          <div
            className="absolute"
            style={{
              right: '24%',
              top: '24%',
              width: '8%',
              aspectRatio: '0.75',
              zIndex: 5,
            }}
          >
            <PottedPlant hovered={false} />
          </div>

          {/* ── ANEMONE — top shelf, just left of the plant ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              right: '34%',
              top: '15%',
              width: '7%',
              aspectRatio: '0.55',
              zIndex: 6,
            }}
            onMouseEnter={enter('anemone')}
            onMouseLeave={leave}
            onClick={() => toggleItem('anemone')}
          >
            <HotspotPulse delay={500} />
            <Anemone hovered={hoveredItem === 'anemone'} />
            <Tooltip visible={hoveredItem === 'anemone'} position="above">
              Roots in the South — anemones every February.
            </Tooltip>
          </div>

          {/* ── BERET — top shelf, far right ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              right: '8%',
              top: '34%',
              width: '12%',
              aspectRatio: '1.7',
              zIndex: 6,
            }}
            onMouseEnter={enter('beret')}
            onMouseLeave={leave}
            onClick={() => toggleItem('beret')}
          >
            <HotspotPulse delay={750} />
            <Beret hovered={hoveredItem === 'beret'} />
            <Tooltip visible={hoveredItem === 'beret'} position="below">
              Currently serving as a paratrooper in the IDF.
            </Tooltip>
          </div>

          {/* ── BASKETBALL — bottom shelf, left ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              left: '8%',
              top: '64%',
              width: '13%',
              aspectRatio: '1',
              zIndex: 6,
            }}
            onMouseEnter={enter('basketball')}
            onMouseLeave={leave}
            onClick={() => toggleItem('basketball')}
          >
            <HotspotPulse delay={1000} />
            <Basketball hovered={hoveredItem === 'basketball'} />
            <Tooltip visible={hoveredItem === 'basketball'} position="above">
              My quiet place.
            </Tooltip>
          </div>

          {/* ── BRUSHES — bottom shelf, just right of basketball ── */}
          <div
            className="absolute cursor-pointer"
            style={{
              left: '23%',
              top: '57%',
              width: '7%',
              aspectRatio: '0.55',
              zIndex: 6,
            }}
            onMouseEnter={enter('brushes')}
            onMouseLeave={leave}
            onClick={() => toggleItem('brushes')}
          >
            <HotspotPulse delay={1250} />
            <Brushes hovered={hoveredItem === 'brushes'} />
            <Tooltip visible={hoveredItem === 'brushes'} position="above">
              Off screen — design starts on paper.
            </Tooltip>
          </div>

          {/* ── VINYL — bottom shelf, middle ── */}
          <a
            href="https://open.spotify.com/playlist/2pyz77T5IPR2T4vFkvrfC6?si=584ca899d4804da2"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute cursor-pointer"
            style={{
              left: '37%',
              top: '70%',
              width: '22%',
              aspectRatio: '2',
              zIndex: 6,
            }}
            onClick={(e) => {
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                if (!vinylHovered) {
                  e.preventDefault();
                  setVinylHovered(true);
                  return;
                }
              }
              handleVinylClick();
            }}
            onMouseEnter={() => {
              setVinylHovered(true);
              setHoveredItem('vinyl');
            }}
            onMouseLeave={() => {
              setVinylHovered(false);
              setHoveredItem(null);
            }}
          >
            <HotspotPulse delay={1500} />
            <VinylTurntable hovered={vinylHovered || hoveredItem === 'vinyl'} />
            <Tooltip visible={hoveredItem === 'vinyl'} position="above">
              Now playing — designer&rsquo;s playlist. Press play.
            </Tooltip>
          </a>

          {/* ── BOOKS — bottom shelf, right ── */}
          <div
            className="absolute"
            style={{
              right: '10%',
              top: '67%',
              width: '13%',
              aspectRatio: '1.15',
              zIndex: 5,
            }}
          >
            <Books />
          </div>

          {/* ── Shared keyframes ── */}
          <style>{`
            .hotspot-pulse {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 10px;
              height: 10px;
              margin: -5px 0 0 -5px;
              border-radius: 50%;
              background: rgba(184, 145, 90, 0.7);
              box-shadow: 0 0 0 0 rgba(184, 145, 90, 0.55);
              pointer-events: none;
              animation: hotspotPulse 1.4s ease-out 3 both;
              z-index: 8;
            }
            @keyframes hotspotPulse {
              0%   { transform: scale(0.5); opacity: 0; box-shadow: 0 0 0 0 rgba(184, 145, 90, 0.55); }
              15%  { opacity: 0.8; }
              100% { transform: scale(1); opacity: 0; box-shadow: 0 0 0 14px rgba(184, 145, 90, 0); }
            }
            @keyframes vinylSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes anemoneSway {
              0%, 100% { transform: rotate(0deg); }
              25%      { transform: rotate(-4deg); }
              75%      { transform: rotate(4deg); }
            }
            @keyframes plantSway {
              0%, 100% { transform: rotate(0deg); }
              50%      { transform: rotate(-2deg); }
            }
            @keyframes basketballBreath {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50%      { transform: scale(1.06) rotate(-2deg); }
            }
            @keyframes brushesWiggle {
              0%, 100% { transform: rotate(0deg); }
              50%      { transform: rotate(2deg); }
            }
            @keyframes tooltipSlideUp {
              from { opacity: 0; transform: translateX(-50%) translateY(6px); }
              to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes tooltipSlideDown {
              from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
              to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes tooltipSlideUpLeft {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .hotspot-pulse { display: none; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
