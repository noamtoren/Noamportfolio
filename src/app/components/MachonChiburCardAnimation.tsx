import { useEffect, useState } from 'react';
import intakeMid from '../../assets/machon-intake-mid-3x2.png';
import therapistSelection from '../../assets/machon-therapist-selection-3x2.png';

// Pixel-sampled positions on the cropped 3:2 PNGs.
// intake-mid (1024×682):
//   Option 1 (top):     center y=310 → 45.5%
//   Option 3:           center y=410 → 60.1%
//   Continue button:    center (678, 513) → (66.2%, 75.2%)
//   Card x-center:      ≈ 49.8%
// therapist-selection (790×526):
//   First therapist "לקבוע שיחה ראשונה" button: center (118, 287) → (14.9%, 54.6%)
const TARGETS = {
  q1Option: { x: 49.8, y: 60.1 },   // option 3
  q2Option: { x: 49.8, y: 45.5 },   // option 1
  continueBtn: { x: 66.2, y: 75.2 },
  therapistBtn: { x: 14.9, y: 54.6 },
};

const ZOOM_CTA = 1.7;   // intake continue-button zoom
const ZOOM_THERAPIST = 1.9;  // therapist button zoom
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Phase =
  | 'idle'
  | 'q1ToOption' | 'q1Click' | 'q1ToCont' | 'q1ClickCont' | 'q1ZoomIn' | 'q1Pause' | 'q1ZoomOut'
  | 'q2ToOption' | 'q2Click' | 'q2ToCont' | 'q2ClickCont' | 'q2ZoomIn' | 'q2Pause' | 'q2ZoomOut'
  | 'loading'
  | 'selToBtn' | 'selClick' | 'selZoomIn' | 'selPause' | 'selZoomOut'
  | 'chat1Therapist' | 'chat2TypingUser' | 'chat3User'
  | 'chat4TypingTher' | 'chat5Therapist' | 'chatHold';

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 900,
  q1ToOption: 700,    q1Click: 200,    q1ToCont: 550,    q1ClickCont: 200,
  q1ZoomIn: 480,      q1Pause: 250,    q1ZoomOut: 480,
  q2ToOption: 650,    q2Click: 200,    q2ToCont: 550,    q2ClickCont: 200,
  q2ZoomIn: 480,      q2Pause: 250,    q2ZoomOut: 480,
  loading: 1300,
  selToBtn: 800,      selClick: 200,   selZoomIn: 600,   selPause: 350,    selZoomOut: 600,
  chat1Therapist: 950,
  chat2TypingUser: 1100,
  chat3User: 950,
  chat4TypingTher: 1100,
  chat5Therapist: 1200,
  chatHold: 1400,
};

const STEPS: Phase[] = [
  'idle',
  'q1ToOption', 'q1Click', 'q1ToCont', 'q1ClickCont', 'q1ZoomIn', 'q1Pause', 'q1ZoomOut',
  'q2ToOption', 'q2Click', 'q2ToCont', 'q2ClickCont', 'q2ZoomIn', 'q2Pause', 'q2ZoomOut',
  'loading',
  'selToBtn', 'selClick', 'selZoomIn', 'selPause', 'selZoomOut',
  'chat1Therapist', 'chat2TypingUser', 'chat3User', 'chat4TypingTher', 'chat5Therapist', 'chatHold',
];

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

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-[1.2px]" aria-label="typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[2.2px] h-[2.2px] rounded-full bg-[#5a5e57]"
          style={{
            animation: 'machonTypingDot 1.1s ease-in-out infinite',
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </span>
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
      <p className="mt-3 text-[7px] tracking-tight text-[#3d6647] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
        בונים את המפה האישית שלך…
      </p>
    </div>
  );
}

type Bubble = { side: 'user' | 'therapist'; text: string };

const CHAT_BUBBLES: Bubble[] = [
  { side: 'therapist', text: 'שלום, נעים להכיר. אני יעל. ספרי לי קצת מה הביא אותך לכאן.' },
  { side: 'user',      text: 'היי. זאת הפעם הראשונה שאני פונה. לא בטוחה איך להתחיל.' },
  { side: 'therapist', text: 'בקצב שלך. כל מה שתרצי לשתף — זה המקום.' },
];

function ChatScreen({ phase }: { phase: Phase }) {
  // Visibility per bubble — ramp on the corresponding chat phase
  const showBubble1 =
    phase === 'chat1Therapist' || phase === 'chat2TypingUser' ||
    phase === 'chat3User' || phase === 'chat4TypingTher' ||
    phase === 'chat5Therapist' || phase === 'chatHold';
  const showBubble2 =
    phase === 'chat3User' || phase === 'chat4TypingTher' ||
    phase === 'chat5Therapist' || phase === 'chatHold';
  const showBubble3 =
    phase === 'chat5Therapist' || phase === 'chatHold';

  // Typing indicators
  const showUserTyping = phase === 'chat2TypingUser';
  const showTherTyping = phase === 'chat4TypingTher';

  return (
    <div className="absolute inset-0 bg-[#f4f0e6] flex flex-col" dir="rtl" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-2 py-1.5 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-1.5">
          <span className="text-[5px] tracking-[0.18em] font-semibold text-[#3d6647]">מכון חיבור</span>
        </div>
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

        <Bubble visible={showBubble1} side="therapist" text={CHAT_BUBBLES[0].text} timestamp="14:02" />

        {/* User typing indicator */}
        <div
          className="self-end flex items-center gap-1 px-2 py-1 rounded-md bg-[#3d6647] text-white"
          style={{
            opacity: showUserTyping ? 1 : 0,
            transform: showUserTyping ? 'translateY(0)' : 'translateY(2px)',
            transition: 'opacity 220ms ease-out, transform 220ms ease-out',
          }}
        >
          <span className="inline-flex items-center gap-[1.2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[2.2px] h-[2.2px] rounded-full bg-white"
                style={{
                  animation: 'machonTypingDot 1.1s ease-in-out infinite',
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </span>
        </div>

        <Bubble visible={showBubble2} side="user" text={CHAT_BUBBLES[1].text} timestamp="14:04" />

        {/* Therapist typing indicator */}
        <div
          className="self-start flex items-center gap-1 px-2 py-1 rounded-md bg-white"
          style={{
            opacity: showTherTyping ? 1 : 0,
            transform: showTherTyping ? 'translateY(0)' : 'translateY(2px)',
            transition: 'opacity 220ms ease-out, transform 220ms ease-out',
          }}
        >
          <TypingDots />
        </div>

        <Bubble visible={showBubble3} side="therapist" text={CHAT_BUBBLES[2].text} timestamp="14:05" />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 bg-white px-2 py-1.5 flex items-center gap-1.5 border-t border-black/[0.05]">
        <div className="w-3.5 h-3.5 rounded-full bg-[#c79447] flex items-center justify-center">
          <svg width="6" height="6" viewBox="0 0 16 16" fill="none">
            <path d="M10 4 L4 8 L10 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="flex-1 text-[5.5px] text-[#a1a59c] leading-none">כתוב הודעה… את/ה בוחר/ת אם ומתי לשלוח</span>
      </div>
    </div>
  );
}

function Bubble({
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
        className={`max-w-[78%] px-2 py-1.5 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
          isUser ? 'bg-[#3d6647] text-white rounded-bl-none' : 'bg-white text-[#1a1a1a] rounded-br-none'
        }`}
      >
        <p className="text-[5.5px] leading-[1.45]">{text}</p>
        <p className={`text-[4px] mt-0.5 ${isUser ? 'text-white/70' : 'text-[#8a8d83]'}`}>{timestamp}</p>
      </div>
    </div>
  );
}

export function MachonChiburCardAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');

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
        for (const p of STEPS) {
          if (cancelled) return;
          setPhase(p);
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
  const showIntake = phase.startsWith('idle') || phase.startsWith('q1') || phase.startsWith('q2');
  const showLoading = phase === 'loading';
  const showSelection = phase.startsWith('sel');
  const showChat = phase.startsWith('chat');

  // Camera zoom + origin
  const isZoomedQ1Cont = phase === 'q1ZoomIn' || phase === 'q1Pause';
  const isZoomedQ2Cont = phase === 'q2ZoomIn' || phase === 'q2Pause';
  const isZoomedSel = phase === 'selZoomIn' || phase === 'selPause';
  const scale = isZoomedQ1Cont || isZoomedQ2Cont ? ZOOM_CTA : isZoomedSel ? ZOOM_THERAPIST : 1;

  // Zoom origin: continue button during intake zooms; therapist button during selection
  const useTherOrigin =
    phase === 'selToBtn' || phase === 'selClick' ||
    phase === 'selZoomIn' || phase === 'selPause' || phase === 'selZoomOut';
  const originX = useTherOrigin ? TARGETS.therapistBtn.x : TARGETS.continueBtn.x;
  const originY = useTherOrigin ? TARGETS.therapistBtn.y : TARGETS.continueBtn.y;

  // Cursor target & visibility
  let cursorTarget: { x: number; y: number } | null = null;
  if (phase === 'q1ToOption' || phase === 'q1Click') cursorTarget = TARGETS.q1Option;
  else if (phase === 'q1ToCont' || phase === 'q1ClickCont' || phase === 'q1ZoomIn' || phase === 'q1Pause') cursorTarget = TARGETS.continueBtn;
  else if (phase === 'q2ToOption' || phase === 'q2Click') cursorTarget = TARGETS.q2Option;
  else if (phase === 'q2ToCont' || phase === 'q2ClickCont' || phase === 'q2ZoomIn' || phase === 'q2Pause') cursorTarget = TARGETS.continueBtn;
  else if (phase === 'selToBtn' || phase === 'selClick' || phase === 'selZoomIn' || phase === 'selPause') cursorTarget = TARGETS.therapistBtn;

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'q1Click' || phase === 'q1ClickCont' || phase === 'q2Click' || phase === 'q2ClickCont' || phase === 'selClick';

  const cursorPos = cursorTarget
    ? { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` }
    : { left: '70%', top: '70%' };

  return (
    <div className="relative w-full h-full bg-[#f3efe6] overflow-hidden" dir="ltr">
      {/* Camera — zooms toward CTA buttons during click moments */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${originY}%`,
          transition: `transform ${PHASE_DURATIONS.q1ZoomIn}ms ${EASING}`,
          willChange: 'transform',
        }}
      >
        {/* Intake screen (always at the bottom) */}
        <img
          src={intakeMid}
          alt="Machon Chibur — questionnaire"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
        />

        {/* Loading screen */}
        <div
          style={{
            opacity: showLoading ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
          className="absolute inset-0"
        >
          {showLoading && <LoadingScreen />}
        </div>

        {/* Therapist selection */}
        <img
          src={therapistSelection}
          alt="Machon Chibur — matched therapists"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            opacity: showSelection ? 1 : 0,
            transition: 'opacity 380ms ease-out',
          }}
        />

        {/* Chat screen */}
        <div
          style={{
            opacity: showChat ? 1 : 0,
            transition: 'opacity 420ms ease-out',
          }}
          className="absolute inset-0"
        >
          {showChat && <ChatScreen phase={phase} />}
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
