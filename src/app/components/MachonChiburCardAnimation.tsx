import { useEffect, useState } from 'react';
import intakeQ5 from '../../assets/machon-intake-mid-q5-3x2.png';
import intakeQ6 from '../../assets/machon-intake-mid-q6-3x2.png';
import therapistSelection from '../../assets/machon-therapist-selection.png';
import chatBg from '../../assets/machon-therapist-chat-3x2.png';

// Card-% positions sampled on the cropped 3:2 intake PNG (1024×682):
//   Card spans roughly x=30-72%; options at y=45-67%
//   Continue/Finish button center: (66.2%, 75.2%)
const INTAKE = {
  optionA: { x: 49.8, y: 60.1 },   // option 3
  optionB: { x: 49.8, y: 45.5 },   // option 1
  cta:     { x: 66.2, y: 75.2 },
};

// Therapist-selection (full 790×1024 PNG, displayed scrolling vertically).
// Approximate y-positions of the four therapist cards' "select" buttons,
// in % of the full image height:
//   Therapist 1 button: y≈28%
//   Therapist 2 button: y≈39%
//   Therapist 3 button: y≈52%
//   Therapist 4 button: y≈64%
// Card x-extent: ~5-95%; "select" button at left (RTL primary) ~10-25%; card
// content extends to right edge.
const THERAPIST = {
  // Cursor "exploration" sweep stops, in (image_x%, image_y%)
  explore1: { x: 70, y: 12 },   // top filter chips
  explore2: { x: 78, y: 28 },   // therapist 1 right side (name area)
  explore3: { x: 78, y: 39 },   // therapist 2 right side
  // Selected card: therapist 2
  selectedCardYPct: 39,
  // Right-to-left zoom pan over selected card
  zoomFromRight: { x: 88, y: 39 },
  zoomToLeft:    { x: 18, y: 39 },
  // Click: "לקבוע שיחה ראשונה" button on selected card (left side, RTL primary)
  selectButton: { x: 14.9, y: 39 },
};

const ZOOM_THERAPIST = 1.85;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Phase =
  | 'idle'
  // Q5: answer + continue (no zoom)
  | 'q5ToOption' | 'q5ClickOption' | 'q5ToCta' | 'q5ClickCta'
  // Q6: answer + finish (no zoom)
  | 'q6Show' | 'q6ToOption' | 'q6ClickOption' | 'q6ToCta' | 'q6ClickCta'
  // Loading transition
  | 'loading'
  // Therapist selection: explore → focus → zoom right→left → click
  | 'selExplore1' | 'selExplore2' | 'selExplore3'
  | 'selZoomIn' | 'selPanLeft' | 'selClickButton' | 'selZoomOut'
  // Chat: ping-pong with typing
  | 'chatTherTyping1' | 'chatTherMsg1'
  | 'chatUserTyping'  | 'chatUserMsg1'
  | 'chatTherTyping2' | 'chatTherMsg2'
  | 'chatHold';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 800,
  q5ToOption: 700,    q5ClickOption: 200,    q5ToCta: 600,    q5ClickCta: 200,
  q6Show: 600,
  q6ToOption: 700,    q6ClickOption: 200,    q6ToCta: 600,    q6ClickCta: 200,
  loading: 1400,
  selExplore1: 800,   selExplore2: 900,      selExplore3: 900,
  selZoomIn: 700,
  selPanLeft: 1500,
  selClickButton: 250,
  selZoomOut: 700,
  chatTherTyping1: 1000,
  chatTherMsg1: 900,
  chatUserTyping: 1300,
  chatUserMsg1: 700,
  chatTherTyping2: 1100,
  chatTherMsg2: 1000,
  chatHold: 1200,
};

const STEPS: Phase[] = [
  'idle',
  'q5ToOption', 'q5ClickOption', 'q5ToCta', 'q5ClickCta',
  'q6Show', 'q6ToOption', 'q6ClickOption', 'q6ToCta', 'q6ClickCta',
  'loading',
  'selExplore1', 'selExplore2', 'selExplore3',
  'selZoomIn', 'selPanLeft', 'selClickButton', 'selZoomOut',
  'chatTherTyping1', 'chatTherMsg1',
  'chatUserTyping', 'chatUserMsg1',
  'chatTherTyping2', 'chatTherMsg2',
  'chatHold',
];

const USER_MSG = 'היי. זאת הפעם הראשונה שאני פונה.';

function CursorIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="machonCursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M3 1.8 L19.2 14.8 L11.6 15.4 L8.2 23.4 L3 1.8 Z"
        fill="white"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#machonCursorShadow)"
      />
    </svg>
  );
}

function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-[#f4f0e6] flex flex-col items-center justify-center" dir="rtl">
      <div
        className="w-7 h-7 rounded-full"
        style={{
          border: '2px solid rgba(61, 102, 71, 0.18)',
          borderTopColor: '#3d6647',
          animation: 'machonSpin 0.9s linear infinite',
        }}
      />
      <p className="mt-2 text-[7px] tracking-tight text-[#3d6647] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
        בונים את המפה האישית שלך…
      </p>
    </div>
  );
}

function TypingBubbleDots({ side }: { side: 'user' | 'therapist' }) {
  const isUser = side === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-2 py-1 rounded-md ${isUser ? 'bg-[#3d6647]' : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]'}`}>
        <span className="inline-flex items-center gap-[1.5px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2.4px] h-[2.4px] rounded-full ${isUser ? 'bg-white' : 'bg-[#5a5e57]'}`}
              style={{
                animation: 'machonTypingDot 1.1s ease-in-out infinite',
                animationDelay: `${i * 0.16}s`,
                display: 'block',
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function MessageBubble({
  visible,
  side,
  text,
  timestamp,
}: {
  visible: boolean;
  side: 'user' | 'therapist';
  text: string;
  timestamp: string;
}) {
  const isUser = side === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 280ms ease-out, transform 280ms ease-out',
      }}
    >
      <div
        className={`max-w-[78%] px-2 py-1.5 rounded-md ${
          isUser
            ? 'bg-[#3d6647] text-white rounded-bl-none'
            : 'bg-white text-[#1a1a1a] shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-br-none'
        }`}
      >
        <p className="text-[5.5px] leading-[1.45]">{text}</p>
        <p className={`text-[4px] mt-0.5 ${isUser ? 'text-white/70' : 'text-[#8a8d83]'}`}>{timestamp}</p>
      </div>
    </div>
  );
}

function ChatScreen({ phase, userTypedLen }: { phase: Phase; userTypedLen: number }) {
  const therMsg1Visible =
    phase === 'chatTherMsg1' || phase === 'chatUserTyping' ||
    phase === 'chatUserMsg1' || phase === 'chatTherTyping2' ||
    phase === 'chatTherMsg2' || phase === 'chatHold';
  const userMsg1Visible =
    phase === 'chatUserMsg1' || phase === 'chatTherTyping2' ||
    phase === 'chatTherMsg2' || phase === 'chatHold';
  const therMsg2Visible = phase === 'chatTherMsg2' || phase === 'chatHold';

  const showTherTyping1 = phase === 'chatTherTyping1';
  const showUserTyping  = phase === 'chatUserTyping';
  const showTherTyping2 = phase === 'chatTherTyping2';

  // Input shows the user's typing only during chatUserTyping
  const showTypedInInput = phase === 'chatUserTyping';
  const typedText = USER_MSG.slice(0, userTypedLen);

  return (
    <div className="absolute inset-0 bg-[#f4f0e6] flex flex-col" dir="rtl" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-2 py-1.5 flex items-center justify-between border-b border-black/[0.05]">
        <span className="text-[5px] tracking-[0.18em] font-semibold text-[#3d6647]">מכון חיבור</span>
        <div className="flex items-center gap-1.5">
          <div className="text-right leading-tight">
            <p className="text-[6.5px] font-semibold text-[#1a1a1a]">יעל ברדור</p>
            <p className="text-[4.5px] text-[#5a5e57]">מחוברת · עונה תוך ~2 דקות</p>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#e7d9c1] flex items-center justify-center text-[5px] font-semibold text-[#3d6647]">יב</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-2.5 py-2 flex flex-col gap-1.5 overflow-hidden">
        <p className="text-center text-[4.5px] text-[#8a8d83] mb-1">היום · שיחה ראשונה</p>

        {/* Therapist typing (before message 1) */}
        {showTherTyping1 && <TypingBubbleDots side="therapist" />}
        <MessageBubble
          visible={therMsg1Visible}
          side="therapist"
          text="שלום, נעים להכיר. אני יעל. ספרי לי קצת מה הביא אותך לכאן."
          timestamp="14:02"
        />

        {/* User message — appears AFTER user types in input */}
        <MessageBubble
          visible={userMsg1Visible}
          side="user"
          text={USER_MSG}
          timestamp="14:04"
        />

        {/* Therapist typing (before message 2) */}
        {showTherTyping2 && <TypingBubbleDots side="therapist" />}
        <MessageBubble
          visible={therMsg2Visible}
          side="therapist"
          text="בקצב שלך. כל מה שתרצי לשתף — זה המקום."
          timestamp="14:05"
        />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 bg-white px-2 py-1.5 flex items-center gap-1.5 border-t border-black/[0.05]">
        <div className="w-3.5 h-3.5 rounded-full bg-[#c79447] flex items-center justify-center">
          <svg width="6" height="6" viewBox="0 0 16 16" fill="none">
            <path d="M10 4 L4 8 L10 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="flex-1 text-[5.5px] leading-none flex items-center min-h-[5.5px] overflow-hidden whitespace-nowrap">
          {showTypedInInput && userTypedLen > 0 ? (
            <span className="text-[#1a1a1a]">
              {typedText}
              <span
                style={{
                  display: 'inline-block',
                  width: '0.7px',
                  height: '0.85em',
                  background: '#1a1a1a',
                  marginRight: '0.5px',
                  verticalAlign: 'middle',
                  animation: 'supplyNetCaret 0.85s steps(2) infinite',
                }}
              />
            </span>
          ) : (
            <span className="text-[#a1a59c]">כתוב הודעה… את/ה בוחר/ת אם ומתי לשלוח</span>
          )}
        </span>
      </div>
    </div>
  );
}

export function MachonChiburCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [userTypedLen, setUserTypedLen] = useState(0);
  // Therapist-selection scroll position (% of image, 0 = top, 50 = bottom-ish)
  const [scrollPct, setScrollPct] = useState(0);
  // Therapist zoom pan: 0 = right edge, 100 = left edge
  const [panPct, setPanPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });

    async function typeUserMessage(durationMs: number) {
      const charMs = durationMs / USER_MSG.length;
      for (let i = 1; i <= USER_MSG.length; i++) {
        if (cancelled) return;
        setUserTypedLen(i);
        await wait(charMs);
      }
    }

    async function run() {
      while (!cancelled) {
        for (const p of STEPS) {
          if (cancelled) return;
          setPhase(p);

          // Phase-specific side effects
          if (p === 'idle') {
            setUserTypedLen(0);
            setScrollPct(0);
            setPanPct(0);
          } else if (p === 'selExplore2') {
            setScrollPct(15);
          } else if (p === 'selExplore3') {
            setScrollPct(30);
          } else if (p === 'selPanLeft') {
            // Animate the pan from right to left during this phase
            setPanPct(100);
          } else if (p === 'chatUserTyping') {
            // Type the user message in parallel with the phase wait
            typeUserMessage(PHASE_DURATIONS.chatUserTyping - 100);
          } else if (p === 'chatUserMsg1') {
            // Reset typed length once message bubble appears
            setTimeout(() => setUserTypedLen(0), 120);
          }

          await wait(PHASE_DURATIONS[p]);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Which screen is on top
  const showQ5 = phase === 'idle' || phase === 'q5ToOption' || phase === 'q5ClickOption' || phase === 'q5ToCta' || phase === 'q5ClickCta';
  const showQ6 = phase === 'q6Show' || phase === 'q6ToOption' || phase === 'q6ClickOption' || phase === 'q6ToCta' || phase === 'q6ClickCta';
  const showLoading = phase === 'loading';
  const showSel = phase === 'selExplore1' || phase === 'selExplore2' || phase === 'selExplore3' ||
                  phase === 'selZoomIn' || phase === 'selPanLeft' || phase === 'selClickButton' || phase === 'selZoomOut';
  const showChat = phase.startsWith('chat');

  // Camera zoom + origin (only on therapist selection)
  const isZoomedSel = phase === 'selZoomIn' || phase === 'selPanLeft' || phase === 'selClickButton';
  const scale = isZoomedSel ? ZOOM_THERAPIST : 1;

  // Pan: origin x interpolates from right (88%) to left (18%) as panPct goes 0→100
  const panX = THERAPIST.zoomFromRight.x + (THERAPIST.zoomToLeft.x - THERAPIST.zoomFromRight.x) * (panPct / 100);
  const originX = panX;
  const originY = THERAPIST.selectedCardYPct;

  // Cursor target & visibility
  let cursorTarget: { x: number; y: number } | null = null;
  if (phase === 'q5ToOption' || phase === 'q5ClickOption') cursorTarget = INTAKE.optionA;
  else if (phase === 'q5ToCta' || phase === 'q5ClickCta') cursorTarget = INTAKE.cta;
  else if (phase === 'q6ToOption' || phase === 'q6ClickOption') cursorTarget = INTAKE.optionB;
  else if (phase === 'q6ToCta' || phase === 'q6ClickCta') cursorTarget = INTAKE.cta;
  else if (phase === 'selExplore1') cursorTarget = THERAPIST.explore1;
  else if (phase === 'selExplore2') cursorTarget = THERAPIST.explore2;
  else if (phase === 'selExplore3') cursorTarget = THERAPIST.explore3;
  else if (phase === 'selZoomIn' || phase === 'selPanLeft') cursorTarget = { x: panX, y: THERAPIST.selectedCardYPct };
  else if (phase === 'selClickButton') cursorTarget = THERAPIST.selectButton;

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'q5ClickOption' || phase === 'q5ClickCta' ||
                     phase === 'q6ClickOption' || phase === 'q6ClickCta' ||
                     phase === 'selClickButton';

  // For therapist screens, cursor positions are in IMAGE-% but the image is
  // taller than the container (scrolled). Convert image-y to container-y based
  // on scrollPct.
  // Image rendered at container_w with natural height container_w/0.771 = 1.297*container_w.
  // Container height = 0.667*container_w. So image height = 1.945 * container_height.
  // Visible portion: image_y_visible = scrollPct% to scrollPct + 51.4% (approximately).
  // For cursor at image_y%, container_y = (image_y - scrollPct) / 51.4 * 100.
  const imageH_over_containerH = (1 / 0.771) / (2 / 3); // = 1.945
  const visibleImagePct = 100 / imageH_over_containerH; // = 51.4
  function imageYToCardY(imageY: number): number {
    return ((imageY - scrollPct) / visibleImagePct) * 100;
  }

  let cursorPos: { left: string; top: string };
  if (phase === 'idle') {
    cursorPos = { left: '20%', top: '85%' };
  } else if (cursorTarget && (phase.startsWith('sel'))) {
    cursorPos = { left: `${cursorTarget.x}%`, top: `${imageYToCardY(cursorTarget.y)}%` };
  } else if (cursorTarget) {
    cursorPos = { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` };
  } else {
    cursorPos = { left: '70%', top: '70%' };
  }

  // Therapist-selection origin Y, accounting for scroll
  const therOriginY = imageYToCardY(originY);

  return (
    <div className="relative w-full h-full bg-[#f3efe6] overflow-hidden" dir="ltr">
      {/* Camera (zoomed only during therapist focus) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${therOriginY}%`,
          transition: `transform ${PHASE_DURATIONS.selZoomIn}ms ${EASING}, transform-origin ${PHASE_DURATIONS.selPanLeft}ms ${EASING}`,
          willChange: 'transform, transform-origin',
        }}
      >
        {/* Q5 intake */}
        <img
          src={intakeQ5}
          alt="Machon Chibur — question 5"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showQ5 ? 1 : 0,
            transition: 'opacity 320ms ease-out',
          }}
        />

        {/* Q6 intake (with extended progress bar) */}
        <img
          src={intakeQ6}
          alt="Machon Chibur — question 6"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showQ6 ? 1 : 0,
            transition: 'opacity 320ms ease-out',
          }}
        />

        {/* Q6 button overlay — shows "סיים שאלון" instead of "המשך" */}
        {showQ6 && (
          <div
            className="absolute"
            style={{
              left: '60.5%',
              top: '73.5%',
              width: '13%',
              height: '4.5%',
              background: '#3d6647',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: '5.5px',
              color: 'white',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            סיים שאלון
          </div>
        )}

        {/* Loading screen */}
        <div
          className="absolute inset-0"
          style={{
            opacity: showLoading ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
        >
          {showLoading && <LoadingScreen />}
        </div>

        {/* Therapist selection (full image, scrolled) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: showSel ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
        >
          <img
            src={therapistSelection}
            alt="Machon Chibur — matched therapists"
            className="absolute inset-x-0 top-0 w-full select-none"
            draggable={false}
            style={{
              transform: `translateY(${-scrollPct * imageH_over_containerH / 100 * 100}%)`,
              transition: `transform ${PHASE_DURATIONS.selExplore2}ms ${EASING}`,
              willChange: 'transform',
            }}
          />
        </div>

        {/* Chat screen */}
        <div
          className="absolute inset-0"
          style={{
            opacity: showChat ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
        >
          {showChat && <ChatScreen phase={phase} userTypedLen={userTypedLen} />}
        </div>
      </div>

      {/* Cursor */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: cursorPos.top,
          left: cursorPos.left,
          transform: `translate(-2px, -2px) scale(${clickPulse ? 0.84 : 1})`,
          opacity: cursorVisible ? 1 : 0,
          transition: `top 700ms ${EASING}, left 700ms ${EASING}, transform 200ms ease-out, opacity 240ms ease-out`,
          willChange: 'transform, top, left',
        }}
      >
        <CursorIcon />
      </div>
    </div>
  );
}
