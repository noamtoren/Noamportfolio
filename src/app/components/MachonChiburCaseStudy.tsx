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

          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mt-6">
            What emerged is a quiet, private space for the moment before someone is ready to ask for help out loud. Anonymity is the default &mdash; no account is required to read, browse, or take the intake &mdash; and identity is exchanged in graduated tiers as the user&rsquo;s confidence grows. The intake becomes a personal rights map within minutes; the knowledge base translates legal and emotional concepts into language that doesn&rsquo;t label the reader; and a matched professional waits at the end of the path, not at the start of it. The outcome is a clinical bridge with the warmth of a private clinic &mdash; clear enough to act on, sensitive enough to trust.
          </p>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-6 leading-[1.5]">
            Outcome reflects design projections from research, not measured production results.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Design System */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Design System</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            A documented system, not a moodboard.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-3">
            Foundations and components were built once, then mirrored on every screen — variables for color and spacing, text styles for the Hebrew type scale, and a Component Library where every recurring element ships with its variants and states. Nothing on a screen is a one-off.
          </p>
          <p className="text-[12px] font-normal leading-[1.6] tracking-[-0.2px] text-[rgba(19,19,19,0.5)] max-w-2xl mb-12">
            Scope note: this section documents only what lives inside the system — UI surfaces, components, type, semantic states. It is not a brand-imagery palette and does not cover photography or hero illustrations.
          </p>

          {/* FOUNDATIONS — Color, Typography, Spacing, Elevation */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">FOUNDATIONS</p>

          {/* Color */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#131313]">Color · 25 paint styles</h3>
              <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">UI tokens · bound to variables</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5 max-w-3xl">
              The system tokens that drive UI surfaces, text, lines, and semantic states — backgrounds, ink, primary/amber ramps. Each token is a Figma variable, so a theme swap is a one-click change. Primary green carries action; amber (not red) carries emergency, to inform without alarming.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { hex: '#F9F7F3', label: 'bg / ivory', code: 'bg.ivory' },
                { hex: '#FFFFFF', label: 'bg / paper', code: 'bg.paper' },
                { hex: '#EEEFE8', label: 'sage / 050', code: 'sage.050' },
                { hex: '#5E8A6A', label: 'sage / 500', code: 'sage.500' },
                { hex: '#3F6B4A', label: 'primary / 700', code: 'primary.700' },
                { hex: '#B88A4E', label: 'amber / muted', code: 'amber.muted' },
                { hex: '#23201D', label: 'ink / primary', code: 'ink.primary' },
              ].map((s) => (
                <div key={s.hex} className="flex flex-col gap-2">
                  <div className="rounded-lg aspect-square border border-neutral-200" style={{ backgroundColor: s.hex }} />
                  <div>
                    <p className="text-[11px] font-medium text-[#131313] leading-tight">{s.label}</p>
                    <p className="text-[10px] text-[rgba(19,19,19,0.5)] font-mono leading-tight">{s.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#131313]">Typography · 13 text styles</h3>
              <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">Frank Ruhl Libre · Heebo</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-6 max-w-3xl">
              Frank Ruhl Libre carries display moments — its serif details give weight to the most personal copy. Heebo handles UI and body text: a humanist sans tuned for long-form Hebrew at small sizes. All text styles are documented and reused.
            </p>
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-baseline gap-6 border-b border-neutral-100 pb-3">
                <span className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-mono w-24 flex-shrink-0 text-left">display / xl · 56</span>
                <span className="text-[40px] leading-none text-[#23201D]" style={{ fontFamily: 'serif' }}>זה רגיל?</span>
              </div>
              <div className="flex items-baseline gap-6 border-b border-neutral-100 pb-3">
                <span className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-mono w-24 flex-shrink-0 text-left">heading / lg · 32</span>
                <span className="text-[24px] leading-tight text-[#23201D]" style={{ fontFamily: 'serif' }}>בקצב שלך, בלי גיליון רשמי</span>
              </div>
              <div className="flex items-baseline gap-6 border-b border-neutral-100 pb-3">
                <span className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-mono w-24 flex-shrink-0 text-left">body / lg · 16</span>
                <span className="text-[16px] leading-[1.6] text-[#23201D]">שאלון קצר ואנונימי שנפתח בקצב שלך — בלי שם, בלי שמירת נתונים עד שאתה בוחר.</span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-mono w-24 flex-shrink-0 text-left">label / md · 13</span>
                <span className="text-[13px] leading-[1.5] text-[rgba(35,32,29,0.6)]">המשך · אפשר לדלג · חזור</span>
              </div>
            </div>
          </div>

          {/* Spacing + Elevation row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[16px] font-semibold text-[#131313]">Spacing · 8pt grid</h3>
                <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">10 tokens</span>
              </div>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                One spacing scale powers padding, gaps, and component widths. Same number means same breathing room across screens.
              </p>
              <div className="space-y-2">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[rgba(19,19,19,0.5)] w-10 text-right">{s}px</span>
                    <div className="h-3 bg-[#3F6B4A] rounded-sm" style={{ width: `${s * 1.5}px` }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[16px] font-semibold text-[#131313]">Elevation · 4 levels</h3>
                <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">Effect styles</span>
              </div>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5">
                Soft, warm shadows tinted toward ink — not pure black. Elevation maps to interaction state, not to visual hierarchy alone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'xs', use: 'Cards at rest', shadow: '0 1px 2px rgba(35,32,29,0.04)' },
                  { name: 'sm', use: 'Hover, popovers', shadow: '0 2px 6px rgba(35,32,29,0.06), 0 1px 2px rgba(35,32,29,0.03)' },
                  { name: 'md', use: 'Floating cards', shadow: '0 8px 24px -2px rgba(35,32,29,0.08), 0 2px 4px rgba(35,32,29,0.04)' },
                  { name: 'lg', use: 'Modals, dialogs', shadow: '0 16px 40px -4px rgba(35,32,29,0.10), 0 4px 8px rgba(35,32,29,0.05)' },
                ].map((e) => (
                  <div key={e.name} className="flex flex-col items-center gap-2 py-2">
                    <div className="w-full h-14 rounded-lg bg-white" style={{ boxShadow: e.shadow }} />
                    <p className="text-[11px] font-medium text-[#131313]">elevation / {e.name}</p>
                    <p className="text-[10px] text-[rgba(19,19,19,0.5)]">{e.use}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPONENTS */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">COMPONENTS · 28 total · 13 component sets</p>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-12">
            <h3 className="text-[16px] font-semibold text-[#131313] mb-4">Built once, reused everywhere.</h3>

            {/* Buttons row */}
            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Button · 3 × 4 states</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3">
                  <button className="px-4 h-9 rounded-full bg-[#3F6B4A] text-white text-[13px] font-medium">Primary</button>
                  <button className="px-4 h-9 rounded-full bg-white border border-[#3F6B4A] text-[#3F6B4A] text-[13px] font-medium">Secondary</button>
                  <button className="px-4 h-9 rounded-full text-[#3F6B4A] text-[13px] font-medium">Ghost</button>
                  <span className="text-[11px] text-[rgba(19,19,19,0.4)] mr-2">+ Hover · Focus · Disabled</span>
                </div>
              </div>
            </div>

            {/* Inputs row */}
            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Input · 5 states</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3">
                  {['Default', 'Focus', 'Filled', 'Error', 'Disabled'].map((s) => (
                    <span key={s} className="text-[11px] px-3 py-1 rounded-full bg-[#F9F7F3] border border-neutral-200 text-[#131313]">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Callouts row */}
            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Callout · 4 tones</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] px-3 py-1.5 rounded-md bg-[#EEEFE8] text-[#3F6B4A]">Info</span>
                  <span className="text-[11px] px-3 py-1.5 rounded-md bg-[#E5F1E8] text-[#3F6B4A]">Reassure</span>
                  <span className="text-[11px] px-3 py-1.5 rounded-md bg-[#FCEFD9] text-[#8A6535]">Warning</span>
                  <span className="text-[11px] px-3 py-1.5 rounded-md bg-[#F4DCC4] text-[#8A4F1F]">Emergency</span>
                </div>
              </div>
            </div>

            {/* Cards row */}
            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Cards · with hover variants</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3 text-[11px] text-[#131313]">
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Surface</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Tool</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Therapist</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Service</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Rights Item</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">FAQ Item</span>
                </div>
              </div>
            </div>

            {/* Specialty row */}
            <div className="py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Purpose-built</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3 text-[11px] text-[#131313]">
                  <span className="px-3 py-2 rounded-lg bg-[#FCEFD9] border border-[#E8C896] text-[#8A6535]">Emergency Support Card</span>
                  <span className="px-3 py-2 rounded-lg bg-[#E5F1E8] border border-[#C5DCC9] text-[#3F6B4A]">Reassure Callout</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Chat Bubble · 2 sides</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRINCIPLES */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">PRINCIPLES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Voice without verdict',
                body: 'No "you have", no "you are diagnosed". Microcopy uses "what you marked may suggest" instead of "the system found". Empathy is enforced at the component level, not left to the writer.',
              },
              {
                title: 'Reversible by default',
                body: 'Every flow has an "exit fast" affordance. Modals offer "save and exit", "keep going", "change my answers" — never "cancel" / "OK". The user is never one click from losing their place.',
              },
              {
                title: 'Earned trust, never assumed',
                body: 'No phone, no email, no account at intake. Anonymity stated three times in the first 30 seconds; data persistence is opt-in only. The system asks for trust the way a person would, not the way a form would.',
              },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h4 className="text-[14px] font-semibold text-[#131313] mb-2">{p.title}</h4>
                <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">{p.body}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-6 leading-[1.5]">
            Hebrew RTL, accessibility (WCAG AA+), and motion (Smart Animate · 400ms) are documented inside the Figma file's Design System page — guidelines that live next to the components they govern, kept out of this overview to preserve focus on what's part of the system itself.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        <CaseNavFooter currentId="machon-chibur" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
