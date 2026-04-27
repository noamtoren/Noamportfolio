import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';
import { Footer } from '@/app/components/Footer';
import shelfImage from '../../assets/03d57eb367e80d93c04f4eeced97b1e07dd810c3.png';
import reichmanLogo from '../../assets/0eca1c1712117942a77aaf2eac0853d722a8d9db.png';
import sapirLogo from '../../assets/10465119e0965d66c2f44af33ec2c1346d923774.png';
import israelFlag from '../../assets/62542f660fa3bba0da99ce087f58a22bf4518361.png';

// TODO: replace with Spotify URL — current value is the existing playlist link.
const SPOTIFY_PLAYLIST_URL =
  'https://open.spotify.com/playlist/2pyz77T5IPR2T4vFkvrfC6?si=584ca899d4804da2';

type PointerSide = 'down' | 'up' | 'left' | 'right';

const POINTER_BY_SIDE: Record<PointerSide, CSSProperties> = {
  down: {
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    borderRight: '1px solid rgba(0, 0, 0, 0.10)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
  },
  up: {
    bottom: '100%',
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    borderTop: '1px solid rgba(0, 0, 0, 0.10)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.10)',
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    borderTop: '1px solid rgba(0, 0, 0, 0.10)',
    borderRight: '1px solid rgba(0, 0, 0, 0.10)',
  },
  left: {
    right: '100%',
    top: '50%',
    transform: 'translate(50%, -50%) rotate(45deg)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.10)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
  },
};

interface ShelfTooltipProps {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  position: CSSProperties;
  pointer: PointerSide;
}

function ShelfTooltip({ label, title, body, position, pointer }: ShelfTooltipProps) {
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 20, ...position }}>
      <div className="shelf-tooltip-anim" style={{ position: 'relative' }}>
        <div
          style={{
            background: 'var(--paper)',
            color: 'var(--ink)',
            border: '1px solid rgba(0, 0, 0, 0.10)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
            borderRadius: 6,
            padding: '10px 12px',
            width: 'max-content',
            maxWidth: 240,
            minWidth: 140,
            position: 'relative',
          }}
        >
          <p
            style={{
              fontSize: 9.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--brass)',
              margin: 0,
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.4,
              color: 'var(--ink)',
              margin: 0,
              marginBottom: body ? 4 : 0,
              fontWeight: 400,
            }}
          >
            {title}
          </p>
          {body && (
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'rgba(26, 23, 21, 0.65)', margin: 0 }}>
              {body}
            </div>
          )}
          {/* Pointer triangle (rotated square; paper-fill masks tooltip border at attachment) */}
          <div
            style={{
              position: 'absolute',
              width: 9,
              height: 9,
              background: 'var(--paper)',
              ...POINTER_BY_SIDE[pointer],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function About() {
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const israelTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jerusalem',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(israelTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleItem = (item: string) => {
    setHoveredItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className="absolute inset-0 overflow-auto pb-32 bg-white">
      {/* Section 1 — Header (Home pattern) + grounded body paragraph */}
      <section className="px-6 md:px-12 py-8 md:py-12 max-w-5xl mx-auto">
        <div className="mb-12">
          {/* Header — pixel-identical to Home */}
          <p className="text-[14px] leading-[1.6]">
            <span className="text-neutral-400">UI/UX Designer </span>
            <span className="text-neutral-900">Noam Toren</span>
          </p>
          <p className="text-[14px] leading-[1.6]">
            <span className="text-neutral-400">Open for </span>
            <span className="text-neutral-900">full-time &amp; freelance</span>
          </p>

          {/* Editorial headline — Playfair Display italic, masculine Italian-newspaper feel */}
          <h2
            className="text-[24px] md:text-[30px] leading-[1.1] tracking-tight mt-10 md:mt-12 mb-4 md:mb-5"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 500,
              color: '#1A1715',
            }}
          >
            Nice to meet you!
          </h2>

          {/* Body paragraph — same family as the Hero, slightly smaller than the original */}
          <p className="text-[15px] md:text-[16px] leading-relaxed text-neutral-700 font-light max-w-2xl">
            I&rsquo;m Noam Toren, a UX designer based in Tel Aviv. I build digital products end-to-end &mdash; from research and structure to interface and the small details that decide whether something feels right or off by half a degree. The work runs across early-stage startups, social-impact platforms, and a handful of solo ideas I keep returning to. I studied Communication at Reichman University and earned a Data Analyst certificate at Sapir College in the south, where the human side of design met the structured side of how you measure it. The wall behind me says the rest.
          </p>

          {/* Divider */}
          <div className="h-px bg-neutral-100 mt-10" />
        </div>
      </section>

      {/* Section 2 — Shelf scene (composition unchanged; tooltips refined) */}
      <section className="px-8 py-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#F8F8F8' }} />

        <div className="max-w-5xl mx-auto relative">
          <div
            className="relative w-full"
            style={{ aspectRatio: '1000 / 664', maxWidth: '800px', margin: '0 auto' }}
          >
            <img
              src={shelfImage}
              alt="Shelf scene"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />

            {/* Vinyl turntable — link to Spotify playlist */}
            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Designer's Playlist on Spotify"
              className="absolute cursor-pointer"
              style={{ left: '43%', top: '79%', width: '17%', height: '14%', zIndex: 10 }}
              onMouseEnter={() => setHoveredItem('vinyl')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem === 'vinyl' && (
                <ShelfTooltip
                  label="Now Playing"
                  title="Designer's playlist"
                  body={<>My playlist for designing. Press play.</>}
                  position={{ bottom: '120%', left: '50%', transform: 'translateX(-50%)' }}
                  pointer="down"
                />
              )}
            </a>

            {/* Clock — live Asia/Jerusalem time */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '46%', top: '5%', width: '13%', height: '20%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('clock')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('clock')}
            >
              {hoveredItem === 'clock' && (
                <ShelfTooltip
                  label="Local Time"
                  title={
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <img src={israelFlag} alt="" style={{ width: 14, height: 10 }} />
                      <span>{currentTime}</span>
                    </span>
                  }
                  body={<>Tel Aviv, Israel</>}
                  position={{ top: '120%', left: '50%', transform: 'translateX(-50%)' }}
                  pointer="up"
                />
              )}
            </div>

            {/* Kobe poster — top shelf, left */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '15%', top: '15%', width: '18%', height: '25%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('kobe')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('kobe')}
            >
              {hoveredItem === 'kobe' && (
                <ShelfTooltip
                  label="Inspiration"
                  title="Mamba Mentality"
                  body={
                    <>
                      The reason I fell in love with basketball.
                      <span
                        style={{
                          display: 'block',
                          marginTop: 6,
                          fontStyle: 'italic',
                          color: 'rgba(26, 23, 21, 0.55)',
                        }}
                      >
                        &ldquo;If you&rsquo;re afraid to fail, then you&rsquo;re probably going to fail.&rdquo;
                        <span style={{ display: 'block', marginTop: 2 }}>&mdash; Kobe Bryant</span>
                      </span>
                    </>
                  }
                  position={{ left: '110%', top: '15%' }}
                  pointer="left"
                />
              )}
            </div>

            {/* Anemone — top shelf, right area */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '70%', top: '22%', width: '8%', height: '14%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('anemone')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('anemone')}
            >
              {hoveredItem === 'anemone' && (
                <ShelfTooltip
                  label="Hometown"
                  title="Darom Adom"
                  body={
                    <>
                      I&rsquo;m from the Gaza envelope &mdash; every February the south turns red.
                    </>
                  }
                  position={{ top: '120%', left: '50%', transform: 'translateX(-50%)' }}
                  pointer="up"
                />
              )}
            </div>

            {/* Beret — top shelf, far right */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '87%', top: '32%', width: '10%', height: '13%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('beret')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('beret')}
            >
              {hoveredItem === 'beret' && (
                <ShelfTooltip
                  label="Service"
                  title="Currently serving as a paratrooper in the IDF."
                  position={{ right: '120%', top: '0%' }}
                  pointer="right"
                />
              )}
            </div>

            {/* Basketball — bottom shelf, left */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '14%', top: '70%', width: '13%', height: '20%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('basketball')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('basketball')}
            >
              {hoveredItem === 'basketball' && (
                <ShelfTooltip
                  label="On the Court"
                  title="Mostly watching, sometimes playing."
                  position={{ bottom: '120%', left: '50%', transform: 'translateX(-50%)' }}
                  pointer="down"
                />
              )}
            </div>

            {/* Brushes — bottom shelf, between basketball and vinyl */}
            <div
              className="absolute cursor-pointer"
              style={{ left: '28%', top: '60%', width: '10%', height: '28%', zIndex: 6 }}
              onMouseEnter={() => setHoveredItem('brushes')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('brushes')}
            >
              {hoveredItem === 'brushes' && (
                <ShelfTooltip
                  label="Off Screen"
                  title="I sketch and paint."
                  body={<>Design starts on paper.</>}
                  position={{ bottom: '110%', left: '50%', transform: 'translateX(-50%)' }}
                  pointer="down"
                />
              )}
            </div>

            <style>{`
              .shelf-tooltip-anim {
                animation: shelfTooltipIn 180ms cubic-bezier(0.4, 0, 0.2, 1) both;
              }
              @keyframes shelfTooltipIn {
                from { opacity: 0; transform: translateY(4px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes shelfTooltipFade {
                from { opacity: 0; }
                to   { opacity: 1; }
              }
              @media (prefers-reduced-motion: reduce) {
                .shelf-tooltip-anim {
                  animation: shelfTooltipFade 120ms ease-out both;
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Section 3 — Professional Background (original LinkedIn-style cards) */}
      <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-10 font-medium">
          Professional Background
        </h2>

        <div className="space-y-16">
          {/* Education */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-5 font-medium">
              Education
            </h3>
            <div className="space-y-8">
              {/* Reichman University */}
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F5F5F5' }}
                >
                  <img
                    src={reichmanLogo}
                    alt="Reichman University Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div>
                  <p className="text-base text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    B.A. in Communication
                  </p>
                  <p className="text-sm text-neutral-700 font-normal">Reichman University</p>
                  <p className="text-sm text-neutral-400 font-light mt-0.5">Present</p>
                </div>
              </div>

              {/* Sapir College */}
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F5F5F5' }}
                >
                  <img
                    src={sapirLogo}
                    alt="Sapir College Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div>
                  <p className="text-base text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    Data Analyst Certificate
                  </p>
                  <p className="text-sm text-neutral-700 font-normal">Sapir College</p>
                </div>
              </div>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-5 font-medium">
              Relevant Coursework
            </h3>
            <ul className="space-y-3.5 text-base text-neutral-700 font-light">
              <li>Advanced UX Design – Behavioral Aspects</li>
              <li>User Experience Design</li>
              <li>Interactive Product Design</li>
              <li>Cognitive Psychology in UX</li>
              <li>Human–Computer Interaction</li>
              <li>Advanced Topics in UX Psychology</li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-5 font-medium">
              Tools
            </h3>
            <ul className="space-y-3.5 text-base text-neutral-700 font-light">
              <li>Figma</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>User Flows</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
