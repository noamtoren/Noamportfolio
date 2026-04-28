import { useState, useEffect } from 'react';
import { Footer } from '@/app/components/Footer';
import { ShelfScene } from '@/app/components/ShelfScene';
import reichmanLogo from '../../assets/0eca1c1712117942a77aaf2eac0853d722a8d9db.png';
import sapirLogo from '../../assets/10465119e0965d66c2f44af33ec2c1346d923774.png';

// TODO: replace with Spotify URL — current value is the existing playlist link.
const SPOTIFY_PLAYLIST_URL =
  'https://open.spotify.com/playlist/2pyz77T5IPR2T4vFkvrfC6?si=584ca899d4804da2';

export function About() {
  const [currentTime, setCurrentTime] = useState('');
  const [vinylHovered, setVinylHovered] = useState(false);
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

  const handleVinylClick = () => {
    // On touch devices, first tap shows the hover state; second tap opens the link.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (!vinylHovered) {
        setVinylHovered(true);
        return;
      }
    }
    window.open(SPOTIFY_PLAYLIST_URL, '_blank', 'noopener,noreferrer');
  };

  const toggleItem = (item: string) => {
    if (hoveredItem === item) {
      setHoveredItem(null);
    } else {
      setHoveredItem(item);
    }
  };

  return (
    <div className="absolute inset-0 overflow-auto pb-32 bg-white">
      {/* Section 1 — Header (Home pattern) + grounded body paragraph */}
      <section className="px-6 md:px-12 py-8 md:py-12 max-w-[1080px] mx-auto">
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

          {/* Editorial headline — DM Serif Display italic, dramatic editorial voice */}
          <h2
            className="text-[24px] md:text-[30px] leading-[1.1] tracking-tight mt-10 md:mt-12 mb-4 md:mb-5"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
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

      <ShelfScene
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        vinylHovered={vinylHovered}
        setVinylHovered={setVinylHovered}
        toggleItem={toggleItem}
        handleVinylClick={handleVinylClick}
        currentTime={currentTime}
      />

      {/* Section 3 — Professional Background (original LinkedIn-style cards) */}
      <section className="px-6 md:px-12 py-16 max-w-[1080px] mx-auto">
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
                  <p className="text-[14px] md:text-[15px] text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    B.A. in Communication
                  </p>
                  <p className="text-[13px] md:text-[14px] text-neutral-700 font-light leading-relaxed">Reichman University</p>
                  <p className="text-[12px] md:text-[13px] text-neutral-400 font-light mt-0.5 leading-relaxed">Present</p>
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
                  <p className="text-[14px] md:text-[15px] text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    Data Analyst Certificate
                  </p>
                  <p className="text-[13px] md:text-[14px] text-neutral-700 font-light leading-relaxed">Sapir College</p>
                </div>
              </div>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-5 font-medium">
              Relevant Coursework
            </h3>
            <ul className="space-y-3 text-[14px] md:text-[15px] text-neutral-700 font-light leading-relaxed">
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
            <ul className="space-y-3 text-[14px] md:text-[15px] text-neutral-700 font-light leading-relaxed">
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
