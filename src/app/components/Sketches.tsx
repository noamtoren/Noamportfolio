import { useState, useEffect, useRef } from 'react';
import { Footer } from '@/app/components/Footer';
import { Search } from 'lucide-react';

// Import all images from Figma
import imgProductDemo41 from "../../assets/ef7292e727ddf3625d8ba05b5a08271a4b72063e.png";
import img62639 from "../../assets/0b636203327e25b90277e746bfc700620c67501c.png";
import imgProductDemo61 from "../../assets/ad36effa6289a58ab66047110bd32725dad73f93.png";
import imgProductDemo81 from "../../assets/830186151ef07cdc246e219e528d13495cda70bd.png";
import imgProductDemo51 from "../../assets/50dce0a13c5dfbdbea42e3b6140cbca93fd6bebf.png";
import imgProductDemo91 from "../../assets/f4e91cc7832a156dc237af9011ed057abacd80b6.png";
import img4445 from "../../assets/a12ad2dd2bd2f498d23513e1a554fe2a6617c750.png";
import img62640 from "../../assets/6309514f13b228416409849673cf837baf1a4e22.png";
import img202506301420161 from "../../assets/ae0ab82474fb3c77e11eb3d91c7086696bc766b9.png";
import img202506301420291 from "../../assets/b10f90f4bc731b1f8fefb198efa0994417c58026.png";
import imgProductDemo71 from "../../assets/e190e8c0eff6cd1440a9e734fc8419f23f963ce5.png";
import img5556 from "../../assets/564ed6813df469948618023eab6bc5d3a595bf38.png";
import imgNewIphone from "../../assets/5c6d88ea01b09a90ea895fe370aad6d6916ff6ca.png";
import imgAvatar from "../../assets/2780e16db1a4a364d3d872737f7fe9563d7abb29.png";
import imgImage from "../../assets/9ca412fa840de131974162b09d68033e23a850b5.png";
import imgShalomItai from "../../assets/95f48903aba87a3e0a53b55bf6649fe1f317be60.png";
import imgProgressAnalytics from "../../assets/2cb7054d18780e63213a6fa94f06e185f63e7fec.png";
import imgProcessHistory from "../../assets/9f48da776c98b01005b50a4d39da112c1cbb60e6.png";
import imgNavLinks from "../../assets/6dada3ccecbcbefe565d79594340c9ad3e8d92d2.png";
import imgBlogCard from "../../assets/62f99cbba99dd732ec7f8436a1fcd198130acb13.png";

// Base design dimensions - FIXED VIEWPORT
const BASE_WIDTH = 1440;
const BASE_HEIGHT = 3700;

// Global positions tracker (in percentage from center)
const globalPositions: Record<string, { xPercent: number; yPercent: number }> = {};

export function Sketches() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(BASE_WIDTH);
  const [isTouch, setIsTouch] = useState(false);

  // Minimum scale factor to prevent elements from becoming too small on mobile
  // 0.26 is iPhone SE size (too small). 0.55 ensures legible text and usable tap targets.
  const MIN_SCALE = 0.55;

  useEffect(() => {
    // Detect if device is touch-capable
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    setIsTouch(isTouchDevice);
    
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const viewportWidth = containerRef.current.offsetWidth;
        // If viewport is small (mobile), ensure a minimum canvas width
        // calculated based on our MIN_SCALE.
        // Example: if Viewport is 390px, but 1440 * 0.55 = 792px, use 792px.
        const minCanvasWidth = BASE_WIDTH * MIN_SCALE;
        const newWidth = Math.max(viewportWidth, minCanvasWidth);
        setContainerWidth(newWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      {/* EDIT MODE TOGGLE + LOG POSITIONS BUTTONS - REMOVED */}

      {/* Grid Paper Background - FIXED, doesn't scale */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundColor: '#FFFFFF',
        }}
      />

      {/* Main Container - Responsive Canvas */}
      <div className="w-full relative min-h-full" ref={containerRef}>
        <div 
          className="relative z-10 mx-auto overflow-hidden"
          style={{ 
            minHeight: `${BASE_HEIGHT}px`,
            width: `${containerWidth}px`,
            maxWidth: '1440px',
            // If on mobile (containerWidth > viewport), center it or let it scroll?
            // Default behavior of overflow-auto parent is start-aligned (left).
            // To center initially would require scroll manipulation, but left-aligned scroll is fine for sketches.
          }}
        >
        
        {/* Hero Text */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[280px] md:top-[320px] max-w-2xl text-center px-4">
          <h1 className="font-display text-xl md:text-2xl leading-relaxed font-normal mb-3 text-[#B8552E]">
            Welcome to my design sketches.
          </h1>
          <p className="font-['Inter'] text-sm text-neutral-500 leading-relaxed mb-2">
            Here you can find a variety of features and screens from different projects, alongside personal artwork — including some of my paintings.
          </p>
          <p className="font-['Inter'] text-xs text-[#A85C2E] leading-relaxed">
            {isTouch ? 'Long-press to drag and explore' : 'Click and drag to explore the designs'}
          </p>
        </div>

        {/* Search Bar - DRAGGABLE */}
        <DraggableCard
          id="search-bar"
          initialXPx={1036}
          initialYPx={2375}
          widthPx={500}
          heightPx={56}
          containerWidth={containerWidth}
          isTouch={isTouch}
        >
          <div className="w-full h-full bg-white border border-[rgba(69,69,69,0.2)] rounded-[16px] flex items-center px-[12px] gap-[8px] shadow-sm">
            <Search className="w-5 h-5 text-[rgba(109,109,109,0.74)]" />
            <span className="font-['Inter'] font-medium text-[16px] text-[rgba(109,109,109,0.74)]">
              What partnership starts here?
            </span>
          </div>
        </DraggableCard>

        {/* Navigation Links - DRAGGABLE */}
        <DraggableImage
          id="nav-links"
          image={imgNavLinks}
          initialXPx={12}
          initialYPx={572}
          widthPx={540}
          heightPx={100}
          rotation={0}
          borderRadius={8}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* HALF IPHONE IMAGE - STATIC DECORATION (NOT DRAGGABLE) - NEGATIVE OFFSET ALLOWED */}
        <div 
          className="absolute pointer-events-none"
          style={{
            left: `${(-70 / BASE_WIDTH) * containerWidth}px`,
            top: '-380px',
            width: `${(340 / BASE_WIDTH) * containerWidth}px`,
            height: `${(680 / BASE_WIDTH) * containerWidth}px`,
            zIndex: 5,
          }}
        >
          <div className="w-full h-full overflow-hidden rounded-[40px]">
            <img
              src={imgNewIphone}
              alt="iPhone home screen"
              className="w-full h-full object-cover select-none"
              draggable={false}
              style={{ 
                objectPosition: 'center center',
                imageRendering: '-webkit-optimize-contrast',
                filter: 'contrast(1.05) saturate(1.1) brightness(1.02)',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
              }}
            />
          </div>
        </div>

        {/* Blog Post Card */}
        <DraggableImage
          id="blog-card"
          image={imgBlogCard}
          initialXPx={1027}
          initialYPx={502}
          widthPx={320}
          heightPx={480}
          rotation={0}
          borderRadius={12}
          showBorder={true}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Analytics Dashboard */}
        <DraggableImage
          id="analytics"
          image={imgProgressAnalytics}
          initialXPx={750}
          initialYPx={1171}
          widthPx={900}
          heightPx={360}
          rotation={0}
          borderRadius={12}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Process History Table - NEGATIVE OFFSET */}
        <DraggableImage
          id="process-table"
          image={imgProcessHistory}
          initialXPx={-115}
          initialYPx={1720}
          widthPx={700}
          heightPx={420}
          rotation={0}
          borderRadius={20}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 4 */}
        <DraggableImage
          id="product-demo-4"
          image={imgProductDemo41}
          initialXPx={1058}
          initialYPx={3389}
          widthPx={447}
          heightPx={286}
          rotation={-1}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* 62639 */}
        <DraggableImage
          id="62639"
          image={img62639}
          initialXPx={387}
          initialYPx={827}
          widthPx={327}
          heightPx={200}
          rotation={2}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 6 */}
        <DraggableImage
          id="product-demo-6"
          image={imgProductDemo61}
          initialXPx={258}
          initialYPx={1399}
          widthPx={128}
          heightPx={128}
          rotation={-3}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 8 */}
        <DraggableImage
          id="product-demo-8"
          image={imgProductDemo81}
          initialXPx={639}
          initialYPx={3080}
          widthPx={230}
          heightPx={216}
          rotation={1}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 5 */}
        <DraggableImage
          id="product-demo-5"
          image={imgProductDemo51}
          initialXPx={992}
          initialYPx={2643}
          widthPx={303}
          heightPx={336}
          rotation={-2}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 9 - tall phone */}
        <DraggableImage
          id="product-demo-9"
          image={imgProductDemo91}
          initialXPx={1200}
          initialYPx={2455}
          widthPx={340}
          heightPx={700}
          rotation={3}
          borderRadius={56}
          isPhoneScreen={false}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Image 4 */}
        <DraggableImage
          id="img-4"
          image={img4445}
          initialXPx={-143}
          initialYPx={2168}
          widthPx={356}
          heightPx={289}
          rotation={3}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Image 6 */}
        <DraggableImage
          id="img-6"
          image={img62640}
          initialXPx={21}
          initialYPx={3313}
          widthPx={326}
          heightPx={314}
          rotation={-4}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Screenshot 1 - NEGATIVE OFFSET */}
        <DraggableImage
          id="screenshot-1"
          image={img202506301420161}
          initialXPx={1117}
          initialYPx={1776}
          widthPx={176}
          heightPx={361}
          rotation={4}
          borderRadius={20}
          isPhoneScreen={true}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Screenshot 2 */}
        <DraggableImage
          id="screenshot-2"
          image={img202506301420291}
          initialXPx={483}
          initialYPx={2312}
          widthPx={152}
          heightPx={311}
          rotation={-3}
          borderRadius={20}
          isPhoneScreen={true}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Product Demo 7 */}
        <DraggableImage
          id="product-demo-7"
          image={imgProductDemo71}
          initialXPx={885}
          initialYPx={31}
          widthPx={323}
          heightPx={242}
          rotation={1}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* Image 5 - NEGATIVE OFFSET */}
        <DraggableImage
          id="img-5"
          image={img5556}
          initialXPx={-50}
          initialYPx={997}
          widthPx={238}
          heightPx={308}
          rotation={-2}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        {/* iPhone Mockup "שלום איתי" - NEGATIVE OFFSET */}
        <DraggableImage
          id="shalom-itai"
          image={imgShalomItai}
          initialXPx={-147}
          initialYPx={2920}
          widthPx={295}
          heightPx={640}
          rotation={5}
          borderRadius={44}
          isPhoneScreen={false}
          containerWidth={containerWidth}
          isTouch={isTouch}
        />

        </div>
      </div>

      <Footer />
    </div>
  );
}

// Draggable Image Component with device-specific interactions
interface DraggableImageProps {
  id: string;
  image: string;
  initialXPx: number;
  initialYPx: number;
  widthPx: number;
  heightPx: number;
  rotation: number;
  borderRadius?: number;
  isPhoneScreen?: boolean;
  containerWidth: number;
  isTouch: boolean;
  showBorder?: boolean; // NEW: Optional border for card-like elements
}

function DraggableImage({ 
  id, 
  image, 
  initialXPx, 
  initialYPx, 
  widthPx, 
  heightPx, 
  rotation,
  borderRadius = 0,
  isPhoneScreen = false,
  containerWidth,
  isTouch,
  showBorder = false,
}: DraggableImageProps) {
  // Convert px to percentage from center - STATE 0
  const initialXPercent = ((initialXPx - BASE_WIDTH / 2) / BASE_WIDTH) * 100;
  const initialYPercent = (initialYPx / BASE_HEIGHT) * 100;

  const [positionPercent, setPositionPercent] = useState({ x: initialXPercent, y: initialYPercent });
  const [isDragging, setIsDragging] = useState(false);
  const [isLifted, setIsLifted] = useState(false); // Visual feedback for long-press
  const [isHovered, setIsHovered] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Calculate actual pixel position based on container width - CENTER CONSTRAINTS
  const scaleFactor = containerWidth / BASE_WIDTH;
  const actualWidth = widthPx * scaleFactor;
  const actualHeight = heightPx * scaleFactor;
  const actualX = (positionPercent.x / 100) * containerWidth + containerWidth / 2;
  const actualY = (positionPercent.y / 100) * BASE_HEIGHT;

  // DEVICE-SPECIFIC HANDLERS

  // DESKTOP (Mouse) - Immediate drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouch) return; // Ignore on touch devices
    
    e.preventDefault();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setIsLifted(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouch && isDragging) {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / BASE_HEIGHT) * 100;

      const newXPercent = positionPercent.x + deltaXPercent;
      const newYPercent = positionPercent.y + deltaYPercent;

      setPositionPercent({ x: newXPercent, y: newYPercent });
      globalPositions[id] = { xPercent: newXPercent, yPercent: newYPercent };

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    if (!isTouch) {
      setIsDragging(false);
      setIsLifted(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      setIsHovered(false);
      // Don't stop dragging on mouse leave to allow continuous drag
    }
  };

  // MOBILE/TABLET (Touch) - Long press to drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTouch) return; // Ignore on desktop
    
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };

    // Start long-press timer (500ms)
    longPressTimer.current = setTimeout(() => {
      setIsLifted(true);
      setIsDragging(true);
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouch) return;

    // If not lifted yet, cancel long-press (user is scrolling)
    if (!isLifted && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      return;
    }

    // If lifted, prevent scroll and move element
    if (isDragging && isLifted) {
      e.preventDefault();
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartPos.current.x;
      const deltaY = touch.clientY - dragStartPos.current.y;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / BASE_HEIGHT) * 100;

      const newXPercent = positionPercent.x + deltaXPercent;
      const newYPercent = positionPercent.y + deltaYPercent;

      setPositionPercent({ x: newXPercent, y: newYPercent });
      globalPositions[id] = { xPercent: newXPercent, yPercent: newYPercent };

      dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = () => {
    if (!isTouch) return;
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsDragging(false);
    setIsLifted(false);
  };

  // Phone screens: tilted by default, straighten on hover (desktop only)
  // Other elements: straight by default, tilt on hover (desktop only)
  const currentRotation = isPhoneScreen 
    ? (isHovered && !isTouch ? 0 : rotation)
    : (isHovered && !isTouch ? rotation : 0);

  // VISUAL FEEDBACK: Scale up 5% and add shadow when lifted
  const liftedStyle = isLifted ? {
    transform: `rotate(${currentRotation}deg)`,
    filter: 'none',
  } : {
    transform: `rotate(${currentRotation}deg)`,
    filter: 'none',
  };

  return (
    <div
      className={`absolute select-none ${!isTouch ? 'cursor-grab active:cursor-grabbing' : ''} group`}
      style={{
        left: `${actualX}px`,
        top: `${actualY}px`,
        width: `${actualWidth}px`,
        height: `${actualHeight}px`,
        ...liftedStyle,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease',
        zIndex: isLifted ? 999 : 10, // BRING TO FRONT when lifted
        touchAction: isLifted ? 'none' : 'auto', // Prevent scroll when dragging
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: `${borderRadius * scaleFactor}px`,
          ...(showBorder && {
            borderLeft: `${Math.max(1, scaleFactor * 1.5)}px solid rgba(0, 0, 0, 0.08)`,
            borderTop: `${Math.max(1, scaleFactor * 1.5)}px solid rgba(0, 0, 0, 0.08)`,
            borderBottom: `${Math.max(1, scaleFactor * 1.5)}px solid rgba(0, 0, 0, 0.08)`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
          }),
        }}
      >
        <img
          src={image}
          alt={id}
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
          style={{
            clipPath: `inset(0 round ${borderRadius * scaleFactor}px)`,
          }}
        />
        
        {/* Drag Indicator on Hover (Desktop only) */}
        {isHovered && !isTouch && !isDragging && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L8 0L11 3M5 13L8 16L11 13M3 5L0 8L3 11M13 5L16 8L13 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* Long-press progress indicator (Mobile only) */}
        {isTouch && !isLifted && (
          <div className="absolute inset-0 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

// Draggable Card Component with device-specific interactions
interface DraggableCardProps {
  id: string;
  initialXPx: number;
  initialYPx: number;
  widthPx: number;
  heightPx: number;
  children: React.ReactNode;
  containerWidth: number;
  isTouch: boolean;
}

function DraggableCard({ 
  id, 
  initialXPx, 
  initialYPx, 
  widthPx, 
  heightPx,
  children,
  containerWidth,
  isTouch,
}: DraggableCardProps) {
  // Convert px to percentage from center - STATE 0
  const initialXPercent = ((initialXPx - BASE_WIDTH / 2) / BASE_WIDTH) * 100;
  const initialYPercent = (initialYPx / BASE_HEIGHT) * 100;

  const [positionPercent, setPositionPercent] = useState({ x: initialXPercent, y: initialYPercent });
  const [isDragging, setIsDragging] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Calculate actual pixel position - CENTER CONSTRAINTS
  const scaleFactor = containerWidth / BASE_WIDTH;
  const actualWidth = widthPx * scaleFactor;
  const actualHeight = heightPx * scaleFactor;
  const actualX = (positionPercent.x / 100) * containerWidth + containerWidth / 2;
  const actualY = (positionPercent.y / 100) * BASE_HEIGHT;

  // DESKTOP (Mouse) - Immediate drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouch) return;
    
    e.preventDefault();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setIsLifted(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouch && isDragging) {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / BASE_HEIGHT) * 100;

      const newXPercent = positionPercent.x + deltaXPercent;
      const newYPercent = positionPercent.y + deltaYPercent;

      setPositionPercent({ x: newXPercent, y: newYPercent });
      globalPositions[id] = { xPercent: newXPercent, yPercent: newYPercent };

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    if (!isTouch) {
      setIsDragging(false);
      setIsLifted(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      // Don't stop dragging
    }
  };

  // MOBILE/TABLET (Touch) - Long press to drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTouch) return;
    
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };

    longPressTimer.current = setTimeout(() => {
      setIsLifted(true);
      setIsDragging(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouch) return;

    if (!isLifted && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      return;
    }

    if (isDragging && isLifted) {
      e.preventDefault();
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartPos.current.x;
      const deltaY = touch.clientY - dragStartPos.current.y;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / BASE_HEIGHT) * 100;

      const newXPercent = positionPercent.x + deltaXPercent;
      const newYPercent = positionPercent.y + deltaYPercent;

      setPositionPercent({ x: newXPercent, y: newYPercent });
      globalPositions[id] = { xPercent: newXPercent, yPercent: newYPercent };

      dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = () => {
    if (!isTouch) return;
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsDragging(false);
    setIsLifted(false);
  };

  // VISUAL FEEDBACK
  const liftedStyle = isLifted ? {
    transform: 'scale(1)',
    filter: 'none',
  } : {
    transform: 'scale(1)',
    filter: 'none',
  };

  return (
    <div
      className={`absolute select-none ${!isTouch ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        left: `${actualX}px`,
        top: `${actualY}px`,
        width: `${actualWidth}px`,
        height: `${actualHeight}px`,
        ...liftedStyle,
        transition: isDragging ? 'none' : 'transform 0.2s ease, filter 0.2s ease',
        zIndex: isLifted ? 999 : 20, // BRING TO FRONT when lifted
        touchAction: isLifted ? 'none' : 'auto',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}