import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import intakeStartImg from '../../assets/machon-intake-start.png';
import intakeMiddleImg from '../../assets/machon-intake-mid.png';
import mainDashboardImg from '../../assets/machon-knowledge-home.png';
import knowYourRightsImg from '../../assets/machon-know-rights.png';
import resultsImg from '../../assets/machon-rights-map.png';
import emotionalToolsImg from '../../assets/machon-emotional-toolbox.png';
import expertSelectionImg from '../../assets/machon-therapist-selection.png';
import expertChatImg from '../../assets/machon-therapist-chat.png';
import recommendationImg from '../../assets/machon-recommendation.png';

interface MachonChiburCaseStudyProps {
  onBack: () => void;
  onSelectProject?: (id: string) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-normal text-[rgba(19,19,19,0.44)] mb-4">
      {children}
    </p>
  );
}

function PillarCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#ECEEF0] p-6 md:p-8 min-h-[300px] md:min-h-[360px] flex items-center justify-center">
      {children}
    </div>
  );
}

type PillarImage = { src: string; alt: string; label: string };

const PILLAR_IMAGE_WIDTHS: Record<number, number> = {
  1: 440,
  2: 340,
  3: 220,
  4: 160,
};

function PillarImages({ images }: { images: PillarImage[] }) {
  const width = PILLAR_IMAGE_WIDTHS[images.length] ?? 200;
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {images.map((img, i) => (
        <div key={i} style={{ width: `${width}px` }}>
          <p className="text-[11px] mb-1.5 leading-none text-[#1E1E1E]">
            {img.label}
          </p>
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            className="block w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}

function Pillar({
  label,
  heading,
  body,
  images,
}: {
  label: string;
  heading: string;
  body: string;
  images: PillarImage[];
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h3 className="text-[20px] font-semibold tracking-[-0.5px] text-[#131313] mb-3 leading-[1.3]">
        {heading}
      </h3>
      <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-8">
        {body}
      </p>
      <PillarCanvas>
        <PillarImages images={images} />
      </PillarCanvas>
    </div>
  );
}

export function MachonChiburCaseStudy({ onBack, onSelectProject }: MachonChiburCaseStudyProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      <div className="max-w-5xl mx-auto border-x border-neutral-100">
        {/* Top bar */}
        <div className="px-6 md:px-12 pt-6 md:pt-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-md bg-[#ECEEF0] hover:bg-neutral-200 px-4 py-2 text-[13px] text-[#131313] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Hero */}
        <div className="px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
          <h1 className="text-[36px] font-semibold leading-[1.5] tracking-[-1.5px] text-[#131313] mb-2">
            Machon Chibur
          </h1>
          <p className="text-[18px] font-normal text-[rgba(19,19,19,0.44)]">
            <span>Case Study</span>
            <span className="mx-2 text-[rgba(19,19,19,0.24)]">|</span>
            <span>2025</span>
          </p>
        </div>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Overview */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4 text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            <p>
              Machon Chibur is a therapeutic web platform built on Trauma-Informed Design principles. It creates an anonymous, private-clinic-style bridge to professional support for people experiencing "transparent violence" — emotional and economic abuse that falls outside what traditional emergency services are built to see.
            </p>
            <p>
              My role covered UX research, information architecture, and UI design — from field interviews through final interaction flows, shaping a product that feels more like a trusted clinic than an emergency service.
            </p>
            <p className="text-[rgba(19,19,19,0.6)]">
              Scope note: this was a graduation project at Reichman University, grounded in interviews with senior representatives at a veteran domestic-violence NGO.
            </p>
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Challenge */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Challenge</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Designing for people who won't call themselves victims.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Traditional abuse services are built for the emergency end — physical danger, urgent escape. But most people experiencing emotional and economic abuse sit in the middle of the distress scale: they know something is wrong, yet they don't identify as victims and won't walk into a shelter. Stigma, denial, and fear of exposure keep them silent. The product had to meet them with language that doesn't label and trust cues that feel clinical, not charitable.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Approach */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Approach</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            The barrier isn't access — it's identification.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Field interviews with senior staff at a veteran DV NGO, layered with academic review of trauma-informed design literature. The finding that reframed the brief: these users won't search "domestic abuse help," because they don't believe that phrase describes them. So the product doesn't open with a hotline or a claim — it opens with a question ("is this normal?") and lets the user take it from there. Every downstream decision (copy, pace, palette, information order) follows that principle.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-10 max-w-2xl">
            Three pillars that make the product work.
          </h2>

          <div className="space-y-16 md:space-y-20">
            {/* Pillar 1 */}
            <Pillar
              label="Pillar 01 — Anonymous Intake"
              heading="A questionnaire that acts like a conversation."
              body="A progressive-disclosure assessment built as an empathetic dialogue rather than a form. No account required. No data persistence until the user explicitly opts in. The user controls the pace, and every question is framed without labels or judgment."
              images={[
                { src: intakeStartImg, alt: 'Intake — welcome', label: 'Intake — Welcome' },
                { src: intakeMiddleImg, alt: 'Intake — in progress', label: 'Intake — Mid-Flow' },
                { src: recommendationImg, alt: 'Personalized recommendation after intake', label: 'Personalized Recommendation' },
              ]}
            />

            {/* Pillar 2 */}
            <Pillar
              label="Pillar 02 — Personalized Rights & Knowledge"
              heading="From 40-page PDF to personal map."
              body="A knowledge architecture that translates legal and welfare complexity into a single, personalized view — what applies to you, given what you told us. Users get a concise action map they can save anonymously, instead of hunting through dense rights documents."
              images={[
                { src: mainDashboardImg, alt: 'Knowledge center — home', label: 'Knowledge Center — Home' },
                { src: resultsImg, alt: 'Rights map — personalized results', label: 'Rights Map — Personalized' },
                { src: knowYourRightsImg, alt: 'Know your rights — deep dive', label: 'Know Your Rights' },
              ]}
            />

            {/* Pillar 3 */}
            <Pillar
              label="Pillar 03 — Graduated Trust Path"
              heading="Support that respects readiness."
              body="A three-step funnel: anonymous emotional toolbox → encrypted professional chat → matched therapist. Users progress at their own pace; each step is optional, reversible, and privacy-preserving — so committing to professional help never feels like a jump."
              images={[
                { src: emotionalToolsImg, alt: 'Emotional toolbox', label: 'Emotional Toolbox' },
                { src: expertSelectionImg, alt: 'Therapist selection', label: 'Therapist — Selection' },
                { src: expertChatImg, alt: 'Encrypted chat with therapist', label: 'Therapist — Encrypted Chat' },
              ]}
            />
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Outcome */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Outcome</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Solving the challenge.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Together, the three pillars turn a cold directory of services into a private, paced pathway — meeting users where they are, not where services assume they'd be.
          </p>

          <div className="mt-10 md:grid md:grid-cols-3">
            <div className="py-6 border-b md:py-0 md:pr-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">100%</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Anonymous by default — no account required to use intake, knowledge, or toolbox</p>
            </div>
            <div className="py-6 border-b md:py-0 md:px-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">~15m</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">From first question to a personalized rights map, instead of hours of self-research</p>
            </div>
            <div className="py-6 md:py-0 md:pl-8">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">3 tiers</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Of graduated trust before any identifying data is exchanged</p>
            </div>
          </div>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-4 leading-[1.5]">
            Figures reflect design projections from research, not measured production results.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Design System */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Design System</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            A calm, RTL-native system for sensitive content.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-12">
            Every visual decision is anchored in one rule: nothing on screen should raise the user's heart rate. Colors stay warm and matte, typography prioritises Hebrew readability, motion is restrained, and component behaviour preserves the user's sense of control at every step.
          </p>

          {/* Foundations grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Color */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-3">FOUNDATION · COLOR</p>
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Warm sage, never clinical.</h3>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                A sage-and-cream palette replaces the clinical white-and-blue of typical health products. Primary actions use a deep, matte green; emergency lives in a soft amber, not red — to inform without alarming.
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { hex: '#F9F7F3', label: 'ivory' },
                  { hex: '#FFFFFF', label: 'paper' },
                  { hex: '#3F6B4A', label: 'primary 700' },
                  { hex: '#B88A4E', label: 'amber' },
                  { hex: '#23201D', label: 'ink' },
                ].map((s) => (
                  <div key={s.hex} className="flex flex-col gap-1">
                    <div className="rounded-lg aspect-square border border-neutral-200" style={{ backgroundColor: s.hex }} />
                    <p className="text-[10px] text-[rgba(19,19,19,0.6)] leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-3">FOUNDATION · TYPOGRAPHY</p>
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Two Hebrew families, one voice.</h3>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                Frank Ruhl Libre carries display headings — its serif details give weight to the most personal moments. Heebo handles body text and UI: a humanist sans-serif tuned for long-form Hebrew at small sizes, AA+ contrast guaranteed.
              </p>
              <div className="space-y-2 text-right" dir="rtl">
                <p className="text-[28px] leading-none text-[#23201D]" style={{ fontFamily: 'serif' }}>זה רגיל?</p>
                <p className="text-[14px] leading-[1.6] text-[rgba(35,32,29,0.7)]">בוא נבדוק ביחד — בלי שם, בלי גיליון רשמי, בלי לחץ.</p>
                <p className="text-[11px] uppercase tracking-[1.4px] text-[rgba(35,32,29,0.5)] pt-1">Frank Ruhl Libre · Heebo</p>
              </div>
            </div>

            {/* RTL */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-3">FOUNDATION · RTL</p>
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Hebrew-first, not translated.</h3>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                Layouts flow right-to-left at the structural level: navigation, bullet indicators, progress bars, callouts. Numbers and Latin tokens stay LTR inside their Hebrew context — never letting a translation shortcut break the reading rhythm.
              </p>
              <div className="rounded-lg bg-[#F9F7F3] border border-[#E8E2D8] p-4 flex items-center justify-end gap-3" dir="rtl">
                <p className="text-[13px] text-[#3F6B4A] font-medium">בקצב שלך · אנונימי · ללא הרשמה</p>
                <span className="w-2.5 h-2.5 rounded-full bg-[#5E8A6A] block flex-shrink-0" />
              </div>
            </div>

            {/* Motion */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-3">FOUNDATION · MOTION</p>
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Slow enough to feel safe.</h3>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                Smart Animate at 400ms with ease-in-and-out for the main flow. Dissolve at 300ms for system states. No bounce, no flourish — transitions exist to confirm direction, not to perform.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[rgba(19,19,19,0.5)] font-mono">400ms</span>
                  <span className="text-[#131313]">Smart Animate · main flow</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[rgba(19,19,19,0.5)] font-mono">300ms</span>
                  <span className="text-[#131313]">Dissolve · system states</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[rgba(19,19,19,0.5)] font-mono">ease-in-and-out</span>
                  <span className="text-[#131313]">Easing · everywhere</span>
                </div>
              </div>
            </div>
          </div>

          {/* Component philosophy */}
          <div className="rounded-xl bg-[#F9F7F3] p-6 md:p-8 mb-8">
            <p className="text-[11px] font-medium text-[#3F6B4A] tracking-[1.4px] mb-3">COMPONENT PHILOSOPHY</p>
            <h3 className="text-[18px] font-semibold text-[#131313] mb-3 max-w-2xl">28 components, 13 component sets — every recurring element documented.</h3>
            <p className="text-[14px] leading-[1.65] text-[rgba(19,19,19,0.7)] max-w-2xl">
              Buttons (3 types × 4 states), inputs (5 states), choice buttons, callouts (4 tones including a purpose-built <em>reassure</em> for trauma-informed messaging), progress, chat bubbles, therapist cards with hover variants, and a dedicated <em>Emergency Support Card</em>. Component Library and Design System pages in the Figma file mirror what ships in screens — never theory, always sourced from real use.
            </p>
          </div>

          {/* Trauma-informed principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Voice without verdict',
                body: 'No "you have", no "you are diagnosed". Microcopy uses "what you marked may suggest" instead of "the system found".',
              },
              {
                title: 'Reversible by default',
                body: 'Every flow has an "exit fast" affordance. Modals offer "save and exit", "keep going", "change my answers" — not "cancel" / "OK".',
              },
              {
                title: 'Earned trust, never assumed',
                body: 'No phone, no email, no account at intake. Anonymity stated three times in the first 30 seconds; data persistence is opt-in only.',
              },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h4 className="text-[14px] font-semibold text-[#131313] mb-2">{p.title}</h4>
                <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        <CaseNavFooter currentId="machon-chibur" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
