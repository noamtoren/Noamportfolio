import { useState, useEffect, useRef } from 'react';

interface FloatingSectionTitleProps {
  title: string;
}

export function FloatingSectionTitle({ title }: FloatingSectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 100; // Start showing after scrolling down 100px in the section

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      // Show when scrolling down, hide when scrolling up
      if (scrollingDown && currentScrollY > scrollThreshold) {
        setIsVisible(true);
      } else if (!scrollingDown) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-8 z-10 py-6 flex justify-start pointer-events-none">
      <div 
        className={`
          px-4 py-1.5
          backdrop-blur-md 
          transition-all duration-500 ease-out
          ${isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2'
          }
        `}
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))',
        }}
      >
        <p className="text-xs font-semibold text-black tracking-widest uppercase">
          {title}
        </p>
      </div>
    </div>
  );
}
