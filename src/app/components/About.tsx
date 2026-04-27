import { useState, useEffect } from 'react';
import { Footer } from '@/app/components/Footer';
import shelfImage from '../../assets/03d57eb367e80d93c04f4eeced97b1e07dd810c3.png';
import reichmanLogo from '../../assets/0eca1c1712117942a77aaf2eac0853d722a8d9db.png';
import sapirLogo from '../../assets/10465119e0965d66c2f44af33ec2c1346d923774.png';
import israelFlag from '../../assets/62542f660fa3bba0da99ce087f58a22bf4518361.png';

export function About() {
  const [currentTime, setCurrentTime] = useState('');
  const [vinylHovered, setVinylHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Update Israel time every second
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
    // If on mobile/touch, first tap toggles the hover state. Second tap (if already hovered) opens link.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (!vinylHovered) {
        setVinylHovered(true);
        return;
      }
    }
    window.open('https://open.spotify.com/playlist/2pyz77T5IPR2T4vFkvrfC6?si=584ca899d4804da2', '_blank');
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
            
            {/* Interactive Vinyl Turntable Overlay - Updated position for new layout */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '43%',
                top: '79%',
                width: '17%',
                height: '14%',
                zIndex: 10,
              }}
              onClick={handleVinylClick}
              onMouseEnter={() => setVinylHovered(true)}
              onMouseLeave={() => setVinylHovered(false)}
            >
              {/* Spotify Icon appears ABOVE the turntable on hover */}
              {vinylHovered && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 8,
                  }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      animation: 'spotifyFadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Dark Background Circle - matching other hovers */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'rgba(23, 23, 23, 0.92)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Spotify Logo - Green circle with BLACK lines */}
                      <svg 
                        width="36" 
                        height="36" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(29, 185, 84, 0.3))',
                        }}
                      >
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="11" 
                          fill="#1DB954"
                        />
                        <path 
                          d="M17.5 10.4c-3.8-2.3-10.1-2.5-13.7-1.4-.6.2-1.2-.2-1.4-.8-.2-.6.2-1.2.8-1.4 4.1-1.3 11-1 15.3 1.6.5.3.7 1 .4 1.5-.3.5-1 .7-1.4.5zm-.2 2.6c-.3.4-.8.6-1.2.3-3.2-2-8.1-2.6-11.9-1.4-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 4.3-1.3 9.8-.7 13.4 1.6.4.3.6.8.2 1.2zm-1.3 2.5c-.2.3-.6.5-1 .3-2.8-1.7-6.3-2.1-10.4-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 4.5-1.1 8.4-.6 11.5 1.3.4.2.5.6.3.9z" 
                          fill="#1a1a1a"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Elegant CTA Label - appears with delay from BELOW */}
              {vinylHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 7,
                    animation: 'ctaSlideUpFromBelow 300ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both',
                  }}
                >
                  <div
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(23, 23, 23, 0.88)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.85)',
                        margin: 0,
                        letterSpacing: '0.3px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Click to play music
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Live Time Display Overlay - positioned BELOW the clock */}
            <div
              className="absolute"
              style={{
                left: '49%',
                top: '31%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 5,
              }}
            >
              {/* Israel Flag */}
              <img
                src={israelFlag}
                alt="Israel Flag"
                style={{
                  width: '20px',
                  height: '15px',
                }}
              />
              
              {/* Live Time */}
              <span 
                style={{ 
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#5A6C7D',
                  letterSpacing: '0.3px',
                }}
              >
                {currentTime}
              </span>
            </div>

            {/* Refined Hover Interactions - Updated positions for new layout */}
            
            {/* Hotspot 1: Kobe Image - Top shelf LEFT side - opens UPWARD */}
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
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '10px 18px',
                    background: 'rgba(23, 23, 23, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'nowrap',
                    animation: 'tooltipSlideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '0.2px',
                    }}
                  >
                    "If you're afraid to fail, then you're probably going to fail."
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      marginTop: '4px',
                      letterSpacing: '0.2px',
                    }}
                  >
                    — Kobe Bryant
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 2: Red Beret - Top shelf, far RIGHT - tooltip opens BELOW */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '87%',
                top: '29%',
                width: '10%',
                height: '13%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('beret')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('beret')}
            >
              {hoveredItem === 'beret' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '11px 13px',
                    background: 'rgba(23, 23, 23, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    animation: 'tooltipSlideDown 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {/* Minimalist Parachute Icon - White version */}
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 32 32" 
                    fill="none"
                  >
                    <path 
                      d="M16 4 C8 4 4 10 4 14 L16 14 L28 14 C28 10 24 4 16 4 Z" 
                      fill="#ffffff" 
                      opacity="0.9"
                    />
                    <line 
                      x1="7" 
                      y1="14" 
                      x2="14" 
                      y2="26" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <line 
                      x1="16" 
                      y1="14" 
                      x2="16" 
                      y2="26" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <line 
                      x1="25" 
                      y1="14" 
                      x2="18" 
                      y2="26" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <circle 
                      cx="16" 
                      cy="27" 
                      r="2" 
                      fill="#ffffff"
                      opacity="0.9"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Hotspot 3: Anemone Flower (Red) - Top shelf RIGHT side */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '72%',
                top: '22%',
                width: '9%',
                height: '14%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('anemone')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('anemone')}
            >
              {hoveredItem === 'anemone' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '115%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '10px 18px',
                    background: 'rgba(23, 23, 23, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'nowrap',
                    animation: 'tooltipSlideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '0.2px',
                    }}
                  >
                    Roots in the South
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 4: Basketball - Bottom shelf LEFT */}
            <div
              className="absolute cursor-pointer"
              style={{
                left: '18%',
                top: '75%',
                width: '13%',
                height: '16%',
                zIndex: 6,
              }}
              onMouseEnter={() => setHoveredItem('basketball')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem('basketball')}
            >
              {hoveredItem === 'basketball' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '115%',
                    left: '-50%',
                    padding: '10px 18px',
                    background: 'rgba(23, 23, 23, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'nowrap',
                    animation: 'tooltipSlideUpLeft 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '0.2px',
                    }}
                  >
                    My quiet place.
                  </p>
                </div>
              )}
            </div>

            {/* Enhanced CSS Animations for Tooltips */}
            <style>{`
              @keyframes tooltipSlideUp {
                from {
                  opacity: 0;
                  transform: translateX(-50%) translateY(8px) scale(0.94);
                }
                to {
                  opacity: 1;
                  transform: translateX(-50%) translateY(0) scale(1);
                }
              }
              @keyframes tooltipSlideDown {
                from {
                  opacity: 0;
                  transform: translateX(-50%) translateY(-8px) scale(0.94);
                }
                to {
                  opacity: 1;
                  transform: translateX(-50%) translateY(0) scale(1);
                }
              }
              @keyframes tooltipSlideUpLeft {
                from {
                  opacity: 0;
                  transform: translateY(8px) scale(0.94);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes spotifyFadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.85);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
              @keyframes ctaSlideUpFromBelow {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Section 3: Professional Background */}
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
                {/* Institution Logo Placeholder */}
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#F5F5F5',
                  }}
                >
                  <img
                    src={reichmanLogo}
                    alt="Reichman University Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                <div>
                  <p className="text-base text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    B.A. in Communication
                  </p>
                  <p className="text-sm text-neutral-700 font-normal">
                    Reichman University
                  </p>
                  <p className="text-sm text-neutral-400 font-light mt-0.5">
                    Present
                  </p>
                </div>
              </div>

              {/* Sapir College */}
              <div className="flex gap-3">
                {/* Institution Logo Placeholder */}
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#F5F5F5',
                  }}
                >
                  <img
                    src={sapirLogo}
                    alt="Sapir College Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                <div>
                  <p className="text-base text-neutral-900 leading-relaxed mb-0.5 font-medium">
                    Data Analyst Certificate
                  </p>
                  <p className="text-sm text-neutral-700 font-normal">
                    Sapir College
                  </p>
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