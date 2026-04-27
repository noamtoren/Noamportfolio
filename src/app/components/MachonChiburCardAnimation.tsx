import { useEffect, useState } from 'react';
import intakeQ5 from '../../assets/machon-intake-mid-q5-3x2.png';
import intakeQ6 from '../../assets/machon-intake-mid-q6-3x2.png';
import therapistSelection from '../../assets/machon-therapist-selection.png';

// Card-% positions on the cropped 3:2 intake PNG (1024×682).
// Radio dot column is at x≈67.5% (RTL right side of each option row).
// Option vertical centers (sampled from PNG): 45.2 / 52.5 / 59.8 / 67.2
const INTAKE = {
  optionsX: 67.5,
  optionYs: [45.2, 52.5, 59.8, 67.2] as const,
  // Cursor lands at the row's vertical center; click feedback toggles the dot
  optionA: { x: 49.8, y: 59.8 },  // Q5 picks option idx=2
  optionB: { x: 49.8, y: 45.2 },  // Q6 picks option idx=0
  cta:     { x: 66.2, y: 75.2 },
};
// Which option each click selects (0-indexed)
const Q5_SELECTED_IDX = 2;
const Q6_SELECTED_IDX = 0;

// Therapist-selection (full 790×1024 PNG, displayed scrolling vertically).
// Y-positions in the FULL image (% of image height):
//   Therapist 1 card center: y≈28%; "select" button at left (RTL primary) x≈14.9%
//   Footer starts around y≈80%; bottom edge y=100%
const THERAPIST = {
  card1Y: 28,
  selectButtonX: 14.9,
  // Right-to-left zoom pan over selected card (image-x %)
  zoomFromRightX: 88,
  zoomToLeftX:    18,
};

const ZOOM_THERAPIST = 1.85;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Phase =
  | 'idle'
  | 'q5ToOption' | 'q5ClickOption' | 'q5ToCta' | 'q5ClickCta'
  | 'q6Show' | 'q6ToOption' | 'q6ClickOption' | 'q6ToCta' | 'q6ClickCta'
  | 'loading'
  | 'selStart' | 'selScrollDown' | 'selScrollUp'
  | 'selFocusCard1' | 'selZoomIn' | 'selPanLeft' | 'selClickButton' | 'selZoomOut'
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
  selStart: 500,
  selScrollDown: 1300,
  selScrollUp: 1300,
  selFocusCard1: 700,
  selZoomIn: 750,
  selPanLeft: 2200,
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
  'selStart', 'selScrollDown', 'selScrollUp',
  'selFocusCard1', 'selZoomIn', 'selPanLeft', 'selClickButton', 'selZoomOut',
  'chatTherTyping1', 'chatTherMsg1',
  'chatUserTyping', 'chatUserMsg1',
  'chatTherTyping2', 'chatTherMsg2',
  'chatHold',
];

const USER_MSG = 'היי. זאת הפעם הראשונה שאני פונה.';

// Image-aspect math: therapist-selection 790×1024 (aspect 0.771).
// In a 3:2 container, scaled to fit width, image_height = container_w / 0.771.
// Container_height = container_w * 2/3.
// Ratio image/container heights = (1/0.771) / (2/3) = 1.945
const IMG_OVER_CONT = (1 / 0.771) / (2 / 3); // 1.945
const VISIBLE_IMG_PCT = 100 / IMG_OVER_CONT; // 51.4

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

function TherapistTypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="px-1.5 py-1 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="inline-flex items-center gap-[1px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rounded-full bg-[#5a5e57]"
              style={{
                width: '1.4px',
                height: '1.4px',
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

// Wipes the green selection border the PNG bakes into option 2 by drawing
// four thin white strips exactly over each edge of that option box.
// Border bounds in the cropped 1024×682 image:
//   x = 311–712 (30.4%–69.6%); y = 342–380 (50.1%–55.7%)
function Option2BorderWipe() {
  const stripeColor = 'white';
  const left = 30.0, right = 69.9, top = 49.7, bottom = 56.0;
  const w = right - left;       // 39.9%
  const h = bottom - top;        // 6.3%
  const stripe = 0.9;            // thickness
  return (
    <>
      {/* top */}
      <div className="absolute" style={{ left: `${left}%`, top: `${top}%`, width: `${w}%`, height: `${stripe}%`, background: stripeColor }} />
      {/* bottom */}
      <div className="absolute" style={{ left: `${left}%`, top: `${bottom - stripe}%`, width: `${w}%`, height: `${stripe}%`, background: stripeColor }} />
      {/* left (RTL: this is the right edge of the option in reading order) */}
      <div className="absolute" style={{ left: `${left}%`, top: `${top}%`, width: `${stripe}%`, height: `${h}%`, background: stripeColor }} />
      {/* right */}
      <div className="absolute" style={{ left: `${right - stripe}%`, top: `${top}%`, width: `${stripe}%`, height: `${h}%`, background: stripeColor }} />
    </>
  );
}

function RadioOverlay({ x, y, selected }: { x: number; y: number; selected: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: '1.5%',
        height: '2.3%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="w-full h-full rounded-full bg-white"
        style={{
          border: `0.6px solid ${selected ? '#3d6647' : '#cdd0c8'}`,
          boxSizing: 'border-box',
          padding: '20%',
          display: 'flex',
        }}
      >
        {selected && (
          <div className="w-full h-full rounded-full" style={{ backgroundColor: '#3d6647' }} />
        )}
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
        className={`max-w-[78%] px-2 py-1.5 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${
          isUser ? 'rounded-bl-none' : 'rounded-br-none'
        }`}
      >
        <p className="text-[5.5px] leading-[1.45] text-[#1a1a1a]">{text}</p>
        <p className={`text-[4px] mt-0.5 text-[#8a8d83] ${isUser ? 'text-right' : 'text-left'}`}>{timestamp}</p>
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
  const showTherTyping2 = phase === 'chatTherTyping2';

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

      {/* Encryption badge row */}
      <div className="flex-shrink-0 bg-[#f4f0e6] px-2 py-1 flex items-center gap-1.5 border-b border-black/[0.04]">
        <span className="px-1.5 py-0.5 rounded-[2px] bg-white text-[4.5px] text-[#1a1a1a] inline-flex items-center gap-1">
          <span className="w-[3px] h-[3px] rounded-full bg-[#3d6647]"></span>
          מוצפן קצה-לקצה
        </span>
        <span className="px-1.5 py-0.5 rounded-[2px] bg-white text-[4.5px] text-[#1a1a1a]">סיים שיחה</span>
      </div>

      {/* Body */}
      <div className="flex-1 px-2.5 py-2 flex flex-col gap-1.5 overflow-hidden">
        <p className="text-center text-[4.5px] text-[#8a8d83] mb-1">היום · שיחה ראשונה</p>

        {showTherTyping1 && <TherapistTypingBubble />}
        <MessageBubble
          visible={therMsg1Visible}
          side="therapist"
          text="שלום, נעים להכיר. אני יעל. ספרי לי קצת מה הביא אותך לכאן."
          timestamp="14:02"
        />

        <MessageBubble
          visible={userMsg1Visible}
          side="user"
          text={USER_MSG}
          timestamp="14:04"
        />

        {showTherTyping2 && <TherapistTypingBubble />}
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
  const [scrollPct, setScrollPct] = useState(0);
  const [panPct, setPanPct] = useState(0);
  const [q5Selected, setQ5Selected] = useState<number | null>(null);
  const [q6Selected, setQ6Selected] = useState<number | null>(null);

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
            setQ5Selected(null);
            setQ6Selected(null);
          } else if (p === 'q5ClickOption') {
            setQ5Selected(Q5_SELECTED_IDX);
          } else if (p === 'q6Show') {
            // New question — clear old selection
            setQ6Selected(null);
          } else if (p === 'q6ClickOption') {
            setQ6Selected(Q6_SELECTED_IDX);
          } else if (p === 'selScrollDown') {
            setScrollPct(8);
          } else if (p === 'selScrollUp') {
            setScrollPct(0);
          } else if (p === 'selPanLeft') {
            setPanPct(100);
          } else if (p === 'selZoomOut') {
            // Reset pan for next loop iteration
            setTimeout(() => setPanPct(0), PHASE_DURATIONS.selZoomOut);
          } else if (p === 'chatUserTyping') {
            typeUserMessage(PHASE_DURATIONS.chatUserTyping - 100);
          } else if (p === 'chatUserMsg1') {
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
  const showSel =
    phase === 'selStart' || phase === 'selScrollDown' || phase === 'selScrollUp' ||
    phase === 'selFocusCard1' || phase === 'selZoomIn' || phase === 'selPanLeft' ||
    phase === 'selClickButton' || phase === 'selZoomOut';
  const showChat = phase.startsWith('chat');

  // Camera zoom (only on therapist focus)
  const isZoomedSel = phase === 'selZoomIn' || phase === 'selPanLeft' || phase === 'selClickButton';
  const scale = isZoomedSel ? ZOOM_THERAPIST : 1;

  // Helper: convert image-y % (relative to full PNG height) to container-y %
  function imgYToCardY(imageY: number): number {
    return ((imageY - scrollPct) / VISIBLE_IMG_PCT) * 100;
  }

  // Pan: origin x interpolates from right to left as panPct goes 0→100
  const panX =
    THERAPIST.zoomFromRightX +
    (THERAPIST.zoomToLeftX - THERAPIST.zoomFromRightX) * (panPct / 100);
  const therOriginY = imgYToCardY(THERAPIST.card1Y);

  // Cursor target & visibility
  let cursorTarget: { x: number; y: number; isImage?: boolean } | null = null;
  if (phase === 'q5ToOption' || phase === 'q5ClickOption') cursorTarget = INTAKE.optionA;
  else if (phase === 'q5ToCta' || phase === 'q5ClickCta') cursorTarget = INTAKE.cta;
  else if (phase === 'q6ToOption' || phase === 'q6ClickOption') cursorTarget = INTAKE.optionB;
  else if (phase === 'q6ToCta' || phase === 'q6ClickCta') cursorTarget = INTAKE.cta;
  // Therapist exploration: cursor floats at viewport center (in container coords),
  // letting the page scroll under it.
  else if (phase === 'selStart' || phase === 'selScrollDown' || phase === 'selScrollUp') {
    cursorTarget = { x: 50, y: 50 }; // container coords (middle of viewport)
  }
  else if (phase === 'selFocusCard1' || phase === 'selZoomIn' || phase === 'selPanLeft') {
    cursorTarget = { x: panX, y: THERAPIST.card1Y, isImage: true };
  }
  else if (phase === 'selClickButton') {
    cursorTarget = { x: THERAPIST.selectButtonX, y: THERAPIST.card1Y, isImage: true };
  }

  const cursorVisible = cursorTarget !== null;
  const clickPulse = phase === 'q5ClickOption' || phase === 'q5ClickCta' ||
                     phase === 'q6ClickOption' || phase === 'q6ClickCta' ||
                     phase === 'selClickButton';

  let cursorPos: { left: string; top: string };
  if (phase === 'idle') {
    cursorPos = { left: '20%', top: '85%' };
  } else if (cursorTarget?.isImage) {
    cursorPos = { left: `${cursorTarget.x}%`, top: `${imgYToCardY(cursorTarget.y)}%` };
  } else if (cursorTarget) {
    cursorPos = { left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` };
  } else {
    cursorPos = { left: '70%', top: '70%' };
  }

  return (
    <div className="relative w-full h-full bg-[#f3efe6] overflow-hidden" dir="ltr">
      {/* Camera */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${panX}% ${therOriginY}%`,
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
          style={{ opacity: showQ5 ? 1 : 0, transition: 'opacity 320ms ease-out' }}
        />

        {/* Q5 — wipe pre-selected option 2 border, render dynamic radios */}
        {showQ5 && <Option2BorderWipe />}
        {showQ5 && INTAKE.optionYs.map((y, i) => (
          <RadioOverlay key={`q5-${i}`} x={INTAKE.optionsX} y={y} selected={q5Selected === i} />
        ))}

        {/* Q6 intake */}
        <img
          src={intakeQ6}
          alt="Machon Chibur — question 6"
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{ opacity: showQ6 ? 1 : 0, transition: 'opacity 320ms ease-out' }}
        />

        {/* Q6 — same wipe + radios */}
        {showQ6 && <Option2BorderWipe />}
        {showQ6 && INTAKE.optionYs.map((y, i) => (
          <RadioOverlay key={`q6-${i}`} x={INTAKE.optionsX} y={y} selected={q6Selected === i} />
        ))}

        {/* Q6 overlay — wipe out the original "המשך" + "אפשר לדלג" + "חזור" row
            and render a single full-width "סיים שאלון" button instead. */}
        {showQ6 && (
          <>
            {/* White wash over the entire button row to hide the original buttons */}
            <div
              className="absolute bg-white"
              style={{
                left: '30.5%',
                top: '72%',
                width: '42%',
                height: '7%',
              }}
            />
            {/* Replacement primary button */}
            <div
              className="absolute"
              style={{
                left: '46%',
                top: '73%',
                width: '21%',
                height: '5%',
                background: '#3d6647',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: '6px',
                color: 'white',
                fontWeight: 500,
                letterSpacing: '0.01em',
                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
              }}
            >
              סיים שאלון
            </div>
          </>
        )}

        {/* Loading screen */}
        <div
          className="absolute inset-0"
          style={{ opacity: showLoading ? 1 : 0, transition: 'opacity 380ms ease-out' }}
        >
          {showLoading && <LoadingScreen />}
        </div>

        {/* Therapist selection — full image scrolling vertically inside container */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: showSel ? 1 : 0, transition: 'opacity 380ms ease-out' }}
        >
          <img
            src={therapistSelection}
            alt="Machon Chibur — matched therapists"
            className="absolute inset-x-0 top-0 w-full select-none"
            draggable={false}
            style={{
              transform: `translateY(${-scrollPct * IMG_OVER_CONT}%)`,
              transition: `transform ${PHASE_DURATIONS.selScrollDown}ms cubic-bezier(0.45, 0, 0.55, 1)`,
              willChange: 'transform',
            }}
          />
        </div>

        {/* Chat screen */}
        <div
          className="absolute inset-0"
          style={{ opacity: showChat ? 1 : 0, transition: 'opacity 380ms ease-out' }}
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
