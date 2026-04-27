import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';
import { Footer } from '@/app/components/Footer';
import shelfImage from '../../assets/03d57eb367e80d93c04f4eeced97b1e07dd810c3.png';
import reichmanLogo from '../../assets/0eca1c1712117942a77aaf2eac0853d722a8d9db.png';
import sapirLogo from '../../assets/10465119e0965d66c2f44af33ec2c1346d923774.png';
import israelFlag from '../../assets/62542f660fa3bba0da99ce087f58a22bf4518361.png';

const SPOTIFY_PLAYLIST_URL =
  'https://open.spotify.com/playlist/2pyz77T5IPR2T4vFkvrfC6?si=584ca899d4804da2';

type LeaderSide = 'top' | 'bottom' | 'left' | 'right';

interface MuseumLabelProps {
  label: string;
  title: string;
  body?: ReactNode;
  position: CSSProperties;
  leaderSide: LeaderSide;
  leaderLength?: number;
  align?: 'start' | 'center' | 'end';
}

function MuseumLabel({
  label,
  title,
  body,
  position,
  leaderSide,
  leaderLength = 18,
  align = 'center',
}: MuseumLabelProps) {
  const leaderColor = 'rgba(0, 0, 0, 0.18)';
  const leaderAxisOffset = align === 'start' ? '20%' : align === 'end' ? '80%' : '50%';
  let leaderStyle: CSSProperties;
  switch (leaderSide) {
    case 'top':
      leaderStyle = { position: 'absolute', left: leaderAxisOffset, bottom: '100%', width: 1, height: leaderLength, background: leaderColor };
      break;
    case 'bottom':
      leaderStyle = { position: 'absolute', left: leaderAxisOffset, top: '100%', width: 1, height: leaderLength, background: leaderColor };
      break;
    case 'left':
      leaderStyle = { position: 'absolute', top: leaderAxisOffset, right: '100%', width: leaderLength, height: 1, background: leaderColor };
      break;
    case 'right':
      leaderStyle = { position: 'absolute', top: leaderAxisOffset, left: '100%', width: leaderLength, height: 1, background: leaderColor };
      break;
  }
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 20, ...position }}>
      <div style={{ animation: 'museumLabelIn 200ms cubic-bezier(0.4, 0, 0.2, 1) both', position: 'relative' }}>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            padding: '12px 14px',
            width: 'max-content',
            maxWidth: 230,
            minWidth: 150,
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <p
            style={{
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--brass)',
              margin: 0,
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            {label}
          </p>
          <h4
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 18,
              lineHeight: 1.15,
              color: 'var(--ink)',
              margin: 0,
              marginBottom: body ? 6 : 0,
              fontWeight: 400,
            }}
          >
            {title}
          </h4>
          {body && (
            <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ink-muted)', margin: 0 }}>
              {body}
            </div>
          )}
        </div>
        <div style={leaderStyle} />
      </div>
    </div>
  );
}

export function About() {
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Live Asia/Jerusalem time. We tick every second so the visible minute is
  // always within ~1s of true wall-clock; the rendered string only changes
  // when the minute rolls over (hh:mm format).
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
      {/* Header — same pattern as Home hero */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-12 pt-8 md:pt-10">
        <p className="text-[14px] leading-[1.6]">
          <span className="text-neutral-400">UI/UX Designer </span>
          <span className="text-neutral-900">Noam Toren</span>
        </p>
        <p className="text-[14px] leading-[1.6]">
          <span className="text-neutral-400">Open for </span>
          <span className="text-neutral-900">full-time &amp; freelance</span>
        </p>
      </section>

      {/* I. ABOUT — editorial spread */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-12 mt-20 md:mt-28">
        {/* Chapter mark */}
        <p
          className="text-[11px] uppercase mb-6"
          style={{ color: 'var(--brass)', letterSpacing: '0.22em' }}
        >
          I. About
        </p>

        {/* Editorial headline */}
        <h2
          className="italic font-normal leading-[1.04] tracking-tight text-[44px] md:text-[68px] mb-5 md:mb-7"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--ink)' }}
        >
          On the Wall, a Life
        </h2>

        {/* Lede / standfirst */}
        <p
          className="italic text-[18px] md:text-[20px] leading-[1.45] max-w-[640px] mb-12 md:mb-16"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--ink-muted)' }}
        >
          A UX designer from Israel&rsquo;s south, building digital products with care &mdash; and quietly collecting the objects that shape him.
        </p>

        {/* Hairline */}
        <div className="h-px mb-12 md:mb-14" style={{ background: 'var(--rule)' }} />

        {/* Body — two-column magazine layout (desktop), single column (mobile) */}
        <div
          className="md:columns-2 md:gap-12 lg:gap-16 max-w-[960px] text-[16px] md:text-[16.5px] leading-[1.75]"
          style={{ color: 'var(--ink)' }}
        >
          <p className="mb-5">
            Noam Toren is a UX designer based in Tel Aviv, building digital products for early-stage startups, social-impact platforms, and a handful of stubborn solo ideas. The work runs end-to-end &mdash; research, structure, interface, and the small details that decide whether an interaction feels right or off by half a degree.
          </p>
          <p className="mb-5">
            He studied Communication at Reichman University and earned a Data Analyst certificate at Sapir College in the south, where the two halves of his practice settled into one: the human side of why people do what they do, and the structured side of how you measure it.
          </p>
          <p>
            The result is a designer who treats every screen as a piece of writing. And when he&rsquo;s not designing, the rest of him is on the wall.
          </p>
        </div>

        {/* Hairline */}
        <div className="h-px mt-16 md:mt-24" style={{ background: 'var(--rule)' }} />
      </section>

      {/* II. THE SHELVES — chapter header (tooltip restyle ships in commit 5) */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-12 mt-16 md:mt-20">
        <p
          className="text-[11px] uppercase mb-3"
          style={{ color: 'var(--brass)', letterSpacing: '0.22em' }}
        >
          II. The Shelves
        </p>
        <p
          className="italic text-[18px] md:text-[20px] leading-[1.45]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--ink-muted)' }}
        >
          A self-portrait in objects.
        </p>
      </section>

      {/* Section 2: Shelf Scene - Full Image */}
      <section className="px-8 py-12 relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: '#F8F8F8',
          }}
        />
        
        <div className="max-w-5xl mx-auto relative">
          {/* Main Shelf Image Container - Left Aligned */}
          <div 
            className="relative w-full"
            style={{
              aspectRatio: '1000 / 664',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {/* Background Shelf Image - Exact as is */}
            <img
              src={shelfImage}
              alt="Shelf scene"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            
            {/* Vinyl turntable — link to Spotify playlist */}
            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Designer's Playlist on Spotify"
              className="absolute cursor-pointer"
              style={{
                left: '43%',
                top: '79%',
                width: '17%',
                height: '14%',
                zIndex: 10,
              }}
              onMouseEnter={() => setHoveredItem('vinyl')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem === 'vinyl' && (
                <MuseumLabel
                  label="Now Playing"
                  title="Designer's Playlist"
                  body={<>What I listen to while I design. Press play.</>}
                  position={{ bottom: '115%', left: '50%', transform: 'translateX(-50%)' }}
                  leaderSide="bottom"
                />
              )}
            </a>

            {/* Clock — live Asia/Jerusalem time */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '46%',
                top: '5%',
                width: '13%',
                height: '20%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('clock')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('clock')}
            >
              {hoveredItem === 'clock' && (
                <MuseumLabel
                  label="Local Time"
                  title="Tel Aviv, Israel"
                  body={
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <img src={israelFlag} alt="" style={{ width: 14, height: 10 }} />
                      <span style={{ color: 'var(--ink)' }}>{currentTime}</span>
                    </span>
                  }
                  position={{ top: '115%', left: '50%', transform: 'translateX(-50%)' }}
                  leaderSide="top"
                />
              )}
            </div>

            {/* Kobe poster — top shelf, left */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '15%',
                top: '15%',
                width: '18%',
                height: '25%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('kobe')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('kobe')}
            >
              {hoveredItem === 'kobe' && (
                <MuseumLabel
                  label="Inspiration"
                  title="Mamba Mentality"
                  body={
                    <>
                      He&rsquo;s the reason I fell in love with basketball.
                      <span style={{ display: 'block', marginTop: 6, fontStyle: 'italic', color: 'var(--ink-muted)' }}>
                        &ldquo;If you&rsquo;re afraid to fail, then you&rsquo;re probably going to fail.&rdquo;
                        <span style={{ display: 'block', marginTop: 2 }}>&mdash; Kobe Bryant</span>
                      </span>
                    </>
                  }
                  position={{ left: '108%', top: '20%' }}
                  leaderSide="left"
                />
              )}
            </div>

            {/* Anemone — top shelf, right area */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '70%',
                top: '22%',
                width: '8%',
                height: '14%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('anemone')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('anemone')}
            >
              {hoveredItem === 'anemone' && (
                <MuseumLabel
                  label="Hometown"
                  title="Darom Adom"
                  body={
                    <>I&rsquo;m from the Gaza envelope. Every February the south turns red with anemones &mdash; that&rsquo;s home.</>
                  }
                  position={{ top: '115%', left: '50%', transform: 'translateX(-50%)' }}
                  leaderSide="top"
                />
              )}
            </div>

            {/* Beret — top shelf, far right */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '87%',
                top: '32%',
                width: '10%',
                height: '13%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('beret')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('beret')}
            >
              {hoveredItem === 'beret' && (
                <MuseumLabel
                  label="Service"
                  title="Paratroopers"
                  body={<>Currently serving as a paratrooper in the IDF.</>}
                  position={{ right: '115%', top: '0%' }}
                  leaderSide="right"
                />
              )}
            </div>

            {/* Basketball — bottom shelf, left */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '14%',
                top: '70%',
                width: '13%',
                height: '20%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('basketball')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('basketball')}
            >
              {hoveredItem === 'basketball' && (
                <MuseumLabel
                  label="On the Court"
                  title="Still Playing"
                  body={<>Mostly watching, sometimes shooting. Always learning from the game.</>}
                  position={{ bottom: '115%', left: '50%', transform: 'translateX(-50%)' }}
                  leaderSide="bottom"
                />
              )}
            </div>

            {/* Brushes — bottom shelf, between basketball and vinyl */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '28%',
                top: '60%',
                width: '10%',
                height: '28%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('brushes')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('brushes')}
            >
              {hoveredItem === 'brushes' && (
                <MuseumLabel
                  label="Off Screen"
                  title="Hands On"
                  body={<>I sketch, paint, and make things by hand. Design starts on paper.</>}
                  position={{ bottom: '108%', left: '50%', transform: 'translateX(-50%)' }}
                  leaderSide="bottom"
                />
              )}
            </div>

            {/* Museum-label entrance: fade + 4px translate, 200ms ease-out */}
            <style>{`
              @keyframes museumLabelIn {
                from { opacity: 0; transform: translateY(4px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @media (prefers-reduced-motion: reduce) {
                @keyframes museumLabelIn {
                  from { opacity: 0; }
                  to   { opacity: 1; }
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* III. INDEX — magazine masthead */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-12 mt-20 md:mt-28">
        {/* Chapter mark */}
        <p
          className="text-[11px] uppercase mb-3"
          style={{ color: 'var(--brass)', letterSpacing: '0.22em' }}
        >
          III. Index
        </p>

        {/* Subtitle */}
        <p
          className="italic text-[18px] md:text-[20px] leading-[1.45] mb-12 md:mb-14"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--ink-muted)' }}
        >
          Studies, tools, and footnotes.
        </p>

        {/* Hairline */}
        <div className="h-px mb-10 md:mb-12" style={{ background: 'var(--rule)' }} />

        {/* 3-column grid (desktop) — stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {/* Education */}
          <div>
            <h3
              className="text-[12px] uppercase mb-2"
              style={{ color: 'var(--brass)', letterSpacing: '0.2em', fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Education
            </h3>
            <ul>
              <li
                className="flex gap-4 py-4"
                style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
              >
                <span
                  className="italic text-[13px] mt-0.5 shrink-0"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--brass)', opacity: 0.7 }}
                >
                  i.
                </span>
                <div className="flex-1">
                  <p className="text-[15px] leading-[1.5]" style={{ color: 'var(--ink)' }}>
                    B.A. in Communication
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src={reichmanLogo}
                      alt="Reichman University"
                      className="w-4 h-4 object-contain"
                      style={{ filter: 'grayscale(0.65)', opacity: 0.7 }}
                    />
                    <p className="text-[13px] leading-[1.5]" style={{ color: 'var(--ink-muted)' }}>
                      Reichman University &middot; Present
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="flex gap-4 py-4"
                style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}
              >
                <span
                  className="italic text-[13px] mt-0.5 shrink-0"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--brass)', opacity: 0.7 }}
                >
                  ii.
                </span>
                <div className="flex-1">
                  <p className="text-[15px] leading-[1.5]" style={{ color: 'var(--ink)' }}>
                    Data Analyst Certificate
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src={sapirLogo}
                      alt="Sapir College"
                      className="w-4 h-4 object-contain"
                      style={{ filter: 'grayscale(0.65)', opacity: 0.7 }}
                    />
                    <p className="text-[13px] leading-[1.5]" style={{ color: 'var(--ink-muted)' }}>
                      Sapir College
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Coursework */}
          <div>
            <h3
              className="text-[12px] uppercase mb-2"
              style={{ color: 'var(--brass)', letterSpacing: '0.2em', fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Coursework
            </h3>
            <ul>
              {[
                'Advanced UX Design – Behavioral Aspects',
                'User Experience Design',
                'Interactive Product Design',
                'Cognitive Psychology in UX',
                'Human–Computer Interaction',
                'Advanced Topics in UX Psychology',
              ].map((item, idx, arr) => {
                const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi'][idx];
                const isLast = idx === arr.length - 1;
                return (
                  <li
                    key={item}
                    className="flex gap-4 py-3"
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      ...(isLast ? { borderBottom: '1px solid rgba(0, 0, 0, 0.06)' } : {}),
                    }}
                  >
                    <span
                      className="italic text-[13px] mt-0.5 shrink-0 w-6"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--brass)', opacity: 0.7 }}
                    >
                      {roman}.
                    </span>
                    <p className="text-[15px] leading-[1.55]" style={{ color: 'var(--ink)' }}>
                      {item}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3
              className="text-[12px] uppercase mb-2"
              style={{ color: 'var(--brass)', letterSpacing: '0.2em', fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Tools
            </h3>
            <ul>
              {['Figma', 'Wireframing', 'Prototyping', 'User Flows'].map((item, idx, arr) => {
                const roman = ['i', 'ii', 'iii', 'iv'][idx];
                const isLast = idx === arr.length - 1;
                return (
                  <li
                    key={item}
                    className="flex gap-4 py-3"
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      ...(isLast ? { borderBottom: '1px solid rgba(0, 0, 0, 0.06)' } : {}),
                    }}
                  >
                    <span
                      className="italic text-[13px] mt-0.5 shrink-0 w-6"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--brass)', opacity: 0.7 }}
                    >
                      {roman}.
                    </span>
                    <p className="text-[15px] leading-[1.55]" style={{ color: 'var(--ink)' }}>
                      {item}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}